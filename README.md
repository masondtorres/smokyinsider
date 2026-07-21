# SmokyInsider Prototype

> **PROTOTYPE ONLY. DO NOT DEPLOY TO SMOKYINSIDER.COM.**
>
> The canonical production repository is `masondtorres/smokies-insider-guide`.
> The live Vercel project and domain must continue to deploy from that repository unless the project owner explicitly changes the source of truth.

This repository contains Grok's July 2026 first-version product experiment for the Smoky Mountains trip-planning utility.

Useful planner concepts from this prototype have been transferred into a protected integration branch in the canonical repository. This repository remains available as a reference and donor build only.

## Prototype stack

- Next.js 16.2
- TypeScript
- React 19
- CSS design tokens
- Browser localStorage for My Plan

## Prototype limitations

- Sample cards are marked `isSample: true`
- Legal pages are drafts
- Publisher and contact details were not confirmed in this build
- It has not replaced the established production route set, sitemap, canonicals or deployment controls
- It must not be connected to the smokyinsider.com production domain

## Canonical production source

Use:

```text
https://github.com/masondtorres/smokies-insider-guide
```

The canonical repository preserves the existing site content, production routes, `www` canonicals, Search Console continuity and Vercel deployment history.

## Local prototype use

```bash
npm install
npm run dev
npm run build
```

Open `http://localhost:3000` for local review only.
