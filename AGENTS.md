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
heroImage: '/images/gallery/xxx.jpg'  # optional
updatedDate: 'Apr 15 2026'            # optional
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

## Images

- Store in `public/images/`
- Gallery images: `public/images/gallery/`
- Avatar: `public/images/avatar.jpg`
- Reference with `/images/...` paths (no `public` in path)

## Deployment

- Production host: https://liuqi.vip
- Server path: `/srv/www/liuqi-site/repo`
- Active site symlink: `/srv/www/liuqi-site/current`
- Auto-deploys from GitHub Actions on push to `main`
- Deployment workflow: `.github/workflows/deploy.yml`
- Server deploy script: `scripts/deploy-static.sh`

## Gotchas

- Use `post.id` (not `post.slug`) when generating article links
- Limit ~50 images (~100MB) per git push to avoid timeout
- VPS root disk is small, so deployment uses the low-disk `inplace` strategy by default