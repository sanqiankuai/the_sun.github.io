# Self-hosting on a VPS

This site can be deployed as a static Astro build on a Linux VPS.

## Layout

- Repo checkout: `/srv/www/liuqi-site/repo`
- Active site symlink: `/srv/www/liuqi-site/current`
- Default low-disk mode: `current -> repo/dist`
- Optional release-copy mode: `/srv/www/liuqi-site/releases/<timestamp>`

## Build and deploy on the server

```bash
cd /srv/www/liuqi-site/repo
bash scripts/deploy-static.sh
```

The default `inplace` strategy is intended for small VPS disks. To keep timestamped releases instead, run with `DEPLOY_STRATEGY=release-copy`.

## GitHub Actions secrets

- `VPS_HOST`: server IP or hostname
- `VPS_USER`: deploy username
- `VPS_SSH_KEY`: private SSH key for the deploy user
- `VPS_PORT`: optional, defaults to `22`

## nginx

The sample config is in `deploy/nginx/liuqi.vip.conf`.

## HTTPS

After DNS points to the server, issue a certificate with Certbot and enable the HTTPS server block.