#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const REPORT_PATH = path.join(ROOT, "docs", "homepage-contrast-report.md");

function channelToLinear(channel) {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const value = hex.replace("#", "");
  const red = channelToLinear(Number.parseInt(value.slice(0, 2), 16));
  const green = channelToLinear(Number.parseInt(value.slice(2, 4), 16));
  const blue = channelToLinear(Number.parseInt(value.slice(4, 6), 16));
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(foreground, background) {
  const light = Math.max(luminance(foreground), luminance(background));
  const dark = Math.min(luminance(foreground), luminance(background));
  return (light + 0.05) / (dark + 0.05);
}

function compositeBlackOverWhite(alpha) {
  const channel = Math.round(255 * (1 - alpha));
  return `#${channel.toString(16).padStart(2, "0").repeat(3)}`;
}

const heroConservativeBackground = compositeBlackOverWhite(0.56);
const checks = [
  {
    use: "Primary body text",
    foreground: "#1a1a1a",
    background: "#f9f6f0",
    minimum: 4.5,
  },
  {
    use: "Muted card copy",
    foreground: "#5c5c5c",
    background: "#ffffff",
    minimum: 4.5,
  },
  {
    use: "Primary links",
    foreground: "#224534",
    background: "#ffffff",
    minimum: 4.5,
  },
  {
    use: "Value strip text",
    foreground: "#ffffff",
    background: "#224534",
    minimum: 4.5,
  },
  {
    use: "Value strip supporting text",
    foreground: "#e8dcc8",
    background: "#224534",
    minimum: 4.5,
  },
  {
    use: "Dark eyebrow text",
    foreground: "#8b4b3f",
    background: "#f9f6f0",
    minimum: 4.5,
  },
  {
    use: "Plan band text",
    foreground: "#ffffff",
    background: "#566775",
    minimum: 4.5,
  },
  {
    use: "Primary cream button",
    foreground: "#173226",
    background: "#e8dcc8",
    minimum: 4.5,
  },
  {
    use: "Primary cream button hover",
    foreground: "#10241b",
    background: "#f4ead9",
    minimum: 4.5,
  },
  {
    use: "Hero white text over minimum 56% black overlay on a white source pixel",
    foreground: "#ffffff",
    background: heroConservativeBackground,
    minimum: 4.5,
  },
].map((check) => ({
  ...check,
  ratio: contrast(check.foreground, check.background),
}));

const failed = checks.filter((check) => check.ratio < check.minimum);
const rows = checks
  .map(
    (check) =>
      `| ${check.use} | \`${check.foreground}\` | \`${check.background}\` | ${check.ratio.toFixed(2)}:1 | ${check.minimum.toFixed(1)}:1 | ${check.ratio >= check.minimum ? "Pass" : "Fail"} |`,
  )
  .join("\n");

const report = `# Homepage Contrast Report

Generated: ${new Date().toISOString()}

Method: WCAG 2 relative luminance and contrast-ratio calculation. Normal text is held to a minimum of 4.5:1. The hero check uses a conservative white source pixel beneath the weakest 56% black overlay used by the mobile hero. Actual text sits in darker portions of the overlay.

| Use | Foreground | Background | Measured ratio | Required | Result |
|---|---|---|---:|---:|---|
${rows}

Result: **${failed.length === 0 ? "PASS" : "FAIL"}**
`;

await mkdir(path.dirname(REPORT_PATH), { recursive: true });
await writeFile(REPORT_PATH, report);

if (failed.length > 0) {
  console.error(`${failed.length} contrast check(s) failed.`);
  process.exitCode = 1;
} else {
  console.log(`All ${checks.length} contrast checks passed.`);
}
