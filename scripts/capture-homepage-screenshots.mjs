#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const ROOT = process.cwd();
const BASE_URL = process.env.HOMEPAGE_URL || "http://127.0.0.1:3000";
const OUTPUT_DIR = path.join(ROOT, "artifacts", "homepage-screenshots");

const viewports = [
  { name: "mobile-360x800", width: 360, height: 800 },
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "mobile-412x915", width: 412, height: 915 },
  { name: "tablet-768x1024", width: 768, height: 1024 },
  { name: "tablet-landscape-1024x768", width: 1024, height: 768 },
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "desktop-1920x1080", width: 1920, height: 1080 },
];

await mkdir(OUTPUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
    });

    const consoleErrors = [];
    const pageErrors = [];

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));

    const response = await page.goto(BASE_URL, {
      waitUntil: "networkidle",
      timeout: 60_000,
    });

    if (!response?.ok()) {
      throw new Error(`${viewport.name}: homepage returned HTTP ${response?.status() ?? "unknown"}.`);
    }

    await page.evaluate(async () => {
      await document.fonts.ready;
    });

    const heading = await page.locator("h1").innerText();
    if (heading.trim() !== "Plan your Smokies trip without the guesswork.") {
      throw new Error(`${viewport.name}: unexpected H1: ${heading}`);
    }

    const imageAudit = await page.locator("img").evaluateAll((images) =>
      images.map((image) => ({
        src: image.getAttribute("src"),
        alt: image.getAttribute("alt"),
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
      })),
    );

    if (imageAudit.length !== 17) {
      throw new Error(`${viewport.name}: expected 17 homepage images, found ${imageAudit.length}.`);
    }

    const brokenImages = imageAudit.filter(
      (image) => !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0,
    );
    if (brokenImages.length > 0) {
      throw new Error(`${viewport.name}: broken images: ${JSON.stringify(brokenImages)}`);
    }

    const missingAlt = imageAudit.filter((image) => !image.alt?.trim());
    if (missingAlt.length > 0) {
      throw new Error(`${viewport.name}: ${missingAlt.length} image(s) are missing alt text.`);
    }

    const screenshotPath = path.join(OUTPUT_DIR, `${viewport.name}.png`);
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
      animations: "disabled",
    });

    results.push({
      ...viewport,
      screenshot: path.relative(ROOT, screenshotPath),
      image_count: imageAudit.length,
      console_errors: consoleErrors,
      page_errors: pageErrors,
    });

    if (consoleErrors.length > 0 || pageErrors.length > 0) {
      throw new Error(
        `${viewport.name}: browser errors detected. Console: ${JSON.stringify(consoleErrors)} Page: ${JSON.stringify(pageErrors)}`,
      );
    }

    await page.close();
    console.log(`Captured ${viewport.name}.`);
  }
} finally {
  await browser.close();
}

await writeFile(
  path.join(OUTPUT_DIR, "audit.json"),
  `${JSON.stringify(
    {
      captured_at: new Date().toISOString(),
      base_url: BASE_URL,
      result: "pass",
      viewports: results,
    },
    null,
    2,
  )}\n`,
);

console.log(`Captured and audited ${results.length} responsive homepage screenshots.`);
