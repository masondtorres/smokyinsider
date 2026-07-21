# SmokyInsider.com

Production-ready first version of the Smoky Mountains trip-planning utility.

**Core promise:** Explore the Smokies. Save what fits. Build a trip that actually works.

## Stack

- Next.js 16.2 (App Router)
- TypeScript
- React 19
- CSS design tokens (no heavy UI library)
- Browser localStorage for My Plan

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

```bash
npm run build
npm start
```

## Product notes

- My Plan is the product. Save → organize by day → see warnings.
- Cards carry best-for, skip-if, time, parking-tag, and verification fields.
- Sample data is marked `isSample: true`. Replace before treating as live facts.
- No CMS, no database, no auth in v1.
- Legal pages are drafts for human review.
- Independent site. Not affiliated with NPS.

## Environment

Copy `.env.example` to `.env.local` and fill verification / analytics IDs when ready.

## Deployment

Connect the GitHub repo to Vercel. Set the domain smokyinsider.com. Preview deployments are automatic on push.

## License / ownership

All rights reserved. House of Torres Publishers / project owner to confirm final publisher identity.
