#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const MANIFEST_PATH = path.join(ROOT, "data", "homepage-assets.json");
const LOCK_PATH = path.join(ROOT, "data", "homepage-assets.lock.json");
const DOC_PATH = path.join(ROOT, "docs", "homepage-visual-asset-manifest.md");
const VERIFY_ONLY = process.argv.includes("--verify-only");
const ALLOWED_STATUSES = new Set(["verified", "public-domain", "licensed"]);
const MAX_BYTES = 30 * 1024 * 1024;
const USER_AGENT =
  "SmokyInsiderAssetBot/1.0 (+https://smokyinsider.com; rights-verified homepage asset acquisition)";

function fail(message) {
  throw new Error(message);
}

function sniffMime(buffer) {
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return "image/png";
  }

  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }

  return "application/octet-stream";
}

function readDimensions(buffer, mime) {
  if (mime === "image/png") {
    if (buffer.length < 24) fail("PNG is too short to contain dimensions.");
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  }

  if (mime === "image/jpeg") {
    let offset = 2;

    while (offset < buffer.length) {
      while (offset < buffer.length && buffer[offset] !== 0xff) offset += 1;
      while (offset < buffer.length && buffer[offset] === 0xff) offset += 1;
      if (offset >= buffer.length) break;

      const marker = buffer[offset];
      offset += 1;

      if (marker === 0xd8 || marker === 0xd9) continue;
      if (offset + 2 > buffer.length) break;

      const segmentLength = buffer.readUInt16BE(offset);
      if (segmentLength < 2 || offset + segmentLength > buffer.length) break;

      const isStartOfFrame =
        (marker >= 0xc0 && marker <= 0xc3) ||
        (marker >= 0xc5 && marker <= 0xc7) ||
        (marker >= 0xc9 && marker <= 0xcb) ||
        (marker >= 0xcd && marker <= 0xcf);

      if (isStartOfFrame) {
        if (offset + 7 > buffer.length) break;
        return {
          height: buffer.readUInt16BE(offset + 3),
          width: buffer.readUInt16BE(offset + 5),
        };
      }

      offset += segmentLength;
    }

    fail("JPEG dimensions could not be read.");
  }

  fail(`Unsupported image MIME type: ${mime}`);
}

async function fetchWithRetry(url, attempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        headers: {
          Accept: "image/jpeg,image/png,image/*;q=0.8",
          "User-Agent": USER_AGENT,
        },
        signal: AbortSignal.timeout(60_000),
      });

      if (!response.ok) {
        fail(`HTTP ${response.status} ${response.statusText}`);
      }

      const declaredLength = Number(response.headers.get("content-length") || 0);
      if (declaredLength > MAX_BYTES) {
        fail(`Declared file size ${declaredLength} exceeds ${MAX_BYTES} bytes.`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (buffer.length === 0) fail("Downloaded file is empty.");
      if (buffer.length > MAX_BYTES) {
        fail(`Downloaded file size ${buffer.length} exceeds ${MAX_BYTES} bytes.`);
      }

      return {
        buffer,
        finalUrl: response.url,
        responseMime: (response.headers.get("content-type") || "").split(";")[0].trim(),
      };
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
      }
    }
  }

  throw lastError;
}

function validateAssetRecord(asset) {
  const required = [
    "id",
    "file",
    "role",
    "title",
    "alt",
    "source_page",
    "download_url",
    "credit",
    "creator",
    "license",
    "license_url",
    "rights_basis",
    "expected_width",
    "expected_height",
    "expected_mime",
    "status",
  ];

  for (const field of required) {
    if (asset[field] === undefined || asset[field] === null || asset[field] === "") {
      fail(`${asset.id || "unknown asset"} is missing required field "${field}".`);
    }
  }

  if (!ALLOWED_STATUSES.has(asset.status)) {
    fail(`${asset.id} has blocked status "${asset.status}".`);
  }

  if (!asset.file.startsWith("public/images/homepage/")) {
    fail(`${asset.id} must write inside public/images/homepage/.`);
  }

  if (!asset.source_page.startsWith("https://") || !asset.download_url.startsWith("https://")) {
    fail(`${asset.id} must use HTTPS source and download URLs.`);
  }
}

async function acquireOne(asset) {
  validateAssetRecord(asset);

  const absolutePath = path.join(ROOT, asset.file);
  await mkdir(path.dirname(absolutePath), { recursive: true });

  let buffer;
  let finalUrl = asset.download_url;
  let responseMime = "";

  if (VERIFY_ONLY) {
    buffer = await readFile(absolutePath);
  } else {
    const downloaded = await fetchWithRetry(asset.download_url);
    buffer = downloaded.buffer;
    finalUrl = downloaded.finalUrl;
    responseMime = downloaded.responseMime;
  }

  const sniffedMime = sniffMime(buffer);
  if (sniffedMime !== asset.expected_mime) {
    fail(
      `${asset.id} MIME mismatch. Expected ${asset.expected_mime}, received ${responseMime || "unknown"}, sniffed ${sniffedMime}.`,
    );
  }

  const dimensions = readDimensions(buffer, sniffedMime);
  if (
    dimensions.width !== asset.expected_width ||
    dimensions.height !== asset.expected_height
  ) {
    fail(
      `${asset.id} dimension mismatch. Expected ${asset.expected_width}x${asset.expected_height}, received ${dimensions.width}x${dimensions.height}.`,
    );
  }

  const sha256 = createHash("sha256").update(buffer).digest("hex");

  if (!VERIFY_ONLY) {
    const temporaryPath = `${absolutePath}.tmp`;
    await writeFile(temporaryPath, buffer);
    await rename(temporaryPath, absolutePath);
  }

  return {
    id: asset.id,
    file: asset.file,
    role: asset.role,
    title: asset.title,
    status: asset.status,
    source_page: asset.source_page,
    download_url: asset.download_url,
    final_url: finalUrl,
    credit: asset.credit,
    creator: asset.creator,
    license: asset.license,
    license_url: asset.license_url,
    rights_basis: asset.rights_basis,
    mime: sniffedMime,
    width: dimensions.width,
    height: dimensions.height,
    bytes: buffer.length,
    sha256,
    verified_on: new Date().toISOString(),
  };
}

function escapeCell(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

function buildMarkdown(manifest, lock) {
  const rows = lock.assets
    .map(
      (asset) =>
        `| ${escapeCell(asset.id)} | ${escapeCell(asset.role)} | ${escapeCell(asset.status)} | ${escapeCell(asset.credit)} | ${escapeCell(asset.license)} | ${asset.width}×${asset.height} | \`${asset.sha256}\` |`,
    )
    .join("\n");

  const records = manifest.assets
    .map((asset) => {
      const result = lock.assets.find((item) => item.id === asset.id);
      return `### ${asset.title}

- Final file: \`${asset.file}\`
- Homepage role: \`${asset.role}\`
- Status: \`${asset.status}\`
- Source page: ${asset.source_page}
- Download URL: ${asset.download_url}
- Credit: ${asset.credit}
- Creator: ${asset.creator}
- License: ${asset.license}
- License URL: ${asset.license_url}
- Rights basis: ${asset.rights_basis}
- Verified dimensions: ${result.width} × ${result.height}
- MIME: \`${result.mime}\`
- Bytes: ${result.bytes}
- SHA-256: \`${result.sha256}\`
- Alt text: ${asset.alt}`;
    })
    .join("\n\n");

  return `# Homepage Visual Asset Manifest

Verified: ${manifest.verified_on}

This file is generated from \`data/homepage-assets.json\` by \`scripts/fetch-homepage-assets.mjs\`. Do not add an image to the homepage unless it has a complete source record and an allowed status.

## Acquisition rules

- Allowed final labels: \`verified\`, \`public-domain\`, \`licensed\`
- Blocked labels: \`placeholder\`, \`rejected\`
- The downloader fails closed on HTTP errors, non-image responses, unexpected MIME types, changed dimensions, empty files or files larger than 30 MB.
- NPS records rely on the copyright language displayed on the exact image detail page. NPS-credited multimedia without a copyright symbol is public domain.
- Creative Commons records retain creator credit and license links. Display crops do not remove the underlying license.

## Verified inventory

| Asset | Role | Status | Credit | License | Dimensions | SHA-256 |
|---|---|---|---|---|---:|---|
${rows}

## Full records

${records}

## Rejected source

- **Bull Elk**, Great Smoky Mountains National Park downloadable gallery. Rejected because the image detail credits Twila Creech rather than NPS. The NPS page explicitly says third-party-credited media must not be presumed public domain.
`;
}

async function main() {
  const rawManifest = await readFile(MANIFEST_PATH, "utf8");
  const manifest = JSON.parse(rawManifest);

  if (!Array.isArray(manifest.assets) || manifest.assets.length !== 17) {
    fail(`Expected exactly 17 homepage assets, found ${manifest.assets?.length ?? 0}.`);
  }

  const ids = new Set();
  for (const asset of manifest.assets) {
    if (ids.has(asset.id)) fail(`Duplicate asset id: ${asset.id}`);
    ids.add(asset.id);
  }

  const results = [];
  for (const asset of manifest.assets) {
    process.stdout.write(`${VERIFY_ONLY ? "Verifying" : "Acquiring"} ${asset.id}... `);
    const result = await acquireOne(asset);
    results.push(result);
    process.stdout.write(`ok (${result.width}x${result.height}, ${result.bytes} bytes)\n`);
  }

  const lock = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    manifest_verified_on: manifest.verified_on,
    assets: results,
  };

  await mkdir(path.dirname(LOCK_PATH), { recursive: true });
  await mkdir(path.dirname(DOC_PATH), { recursive: true });
  await writeFile(LOCK_PATH, `${JSON.stringify(lock, null, 2)}\n`);
  await writeFile(DOC_PATH, buildMarkdown(manifest, lock));

  await Promise.all(
    manifest.assets.map((asset) =>
      rm(path.join(ROOT, `${asset.file}.tmp`), { force: true }).catch(() => undefined),
    ),
  );

  console.log(`Completed ${results.length} verified assets.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
