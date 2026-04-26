# sanqiankuai Blog

Personal blog built with Astro 6.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Content

- Blog posts: `src/content/blog/*.md`
- Moments: `src/content/moments/*.md`
- Static assets: `public/images/`

## Production deployment

- Production URL: `https://liuqi.vip`
- Web server: nginx on a Debian VPS
- Repo path on server: `/srv/www/liuqi-site/repo`
- Active site path: `/srv/www/liuqi-site/current`
- Auto deployment: GitHub Actions workflow in `.github/workflows/deploy.yml`
- Server deploy script: `scripts/deploy-static.sh`

## Notes

- The VPS has a small root disk, so deployments use the low-disk `inplace` strategy by default.
- HTTPS is managed by Certbot with nginx integration.
- See `SELF_HOSTING.md` for server-side deployment details.
