# AGENTS.md

Astro 6.x static site/blog deployed to a self-hosted Debian VPS with nginx.

## Commands

```bash
npm run dev      # Local dev server at localhost:4321
npm run build    # Build to ./dist/
npm run preview  # Preview build locally
```

No lint or typecheck scripts are configured.

## Requirements

- Node.js >= 22.12.0

## Site Configuration

Edit `src/consts.ts` to change site title, description, and author name.

## Content Collections

**Blog posts** (`src/content/blog/*.md`):
```yaml
---
title: 'Title'
description: 'Description for SEO'
pubDate: 'Apr 14 2026'
heroImage: './260426-cover.png'  # optional, Astro image (local path relative to file)
cardImage: 'https://...'         # optional, plain URL string for card thumbnails
updatedDate: 'Apr 15 2026'       # optional
---
```

**Moments** (`src/content/moments/*.md`):
```yaml
---
title: 'Title'        # optional
date: 2026-04-14      # required
tags: ['tag1', 'tag2']          # optional
image: '/images/gallery/xxx.jpg' # optional
---
```

- Use `post.id` (not `post.slug`) when generating article links. The blog route is `[...slug].astro` where slug = post.id.
- Blog article body images go in `public/images/blog/`, referenced as `/images/blog/xxx.png`.

## Static Assets

- Store in `public/images/`
- Gallery images: `public/images/gallery/` with naming convention `YYYYMMDD_*.jpg` (date extracted from filename)
- Avatar: `public/images/avatar.jpg`
- Custom local font: `src/assets/fonts/` (Atkinson, exposed as `--font-atkinson` via Astro fonts API)
- Reference with `/images/...` paths (no `public` in path)

## Gallery

- `/gallery` is protected by a hardcoded password (`LQ0725`) with localStorage-based session persistence.
- Images are sorted by filename descending (newest first), grouped by year.

## Deployment

- Production host: https://liuqi.vip
- Server path: `/srv/www/liuqi-site/repo`
- Active site symlink: `/srv/www/liuqi-site/current`
- Auto-deploys from GitHub Actions on push to `main` via `appleboy/ssh-action`
- Deploy script: `scripts/deploy-static.sh` — runs `npm ci && npm run build`
- Default low-disk `inplace` strategy (symlinks `repo/dist` → `current`); set `DEPLOY_STRATEGY=release-copy` for timestamped releases
- Static files (css,js,jpg,etc.) get 30d immutable Cache-Control headers via nginx

## Gotchas

- Limit ~50 images (~100MB) per git push to avoid timeout
- VPS root disk is small, so deployment uses the low-disk `inplace` strategy by default
- Language is zh-CN; site has dark/light theme toggle with localStorage persistence
- Search endpoint is `GET /search.json` (generated at build time from `src/pages/search.json.ts`)
