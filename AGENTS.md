# AGENTS.md

Astro 6.x static site/blog deployed to Netlify.

## Commands

```bash
npm run dev      # Local dev server at localhost:4321
npm run build    # Build to ./dist/
npm run preview  # Preview build locally
```

## Requirements

- Node.js >= 22.12.0

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
date: 'Apr 14 2026'   # required
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

- Auto-deploys to Netlify on push to main
- Site: https://liuqi.vip

## Gotchas

- Use `post.id` (not `post.slug`) when generating article links
- Limit ~50 images (~100MB) per git push to avoid timeout