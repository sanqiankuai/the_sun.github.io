#!/usr/bin/env bash

set -euo pipefail

SITE_ROOT="${SITE_ROOT:-/srv/www/liuqi-site}"
REPO_DIR="${REPO_DIR:-$SITE_ROOT/repo}"
RELEASES_DIR="${RELEASES_DIR:-$SITE_ROOT/releases}"
CURRENT_LINK="${CURRENT_LINK:-$SITE_ROOT/current}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"

if [[ ! -d "$REPO_DIR" ]]; then
	echo "Repository directory not found: $REPO_DIR" >&2
	exit 1
fi

timestamp="$(date +%Y%m%d%H%M%S)"
release_dir="$RELEASES_DIR/$timestamp"

mkdir -p "$RELEASES_DIR"

cd "$REPO_DIR"

if [[ -f package-lock.json ]]; then
	npm ci
else
	npm install
fi

npm run build

mkdir -p "$release_dir"
rsync -a --delete dist/ "$release_dir/"
ln -sfn "$release_dir" "$CURRENT_LINK"

if [[ -n "${POST_DEPLOY_CMD:-}" ]]; then
	bash -lc "$POST_DEPLOY_CMD"
fi

if [[ "$KEEP_RELEASES" =~ ^[0-9]+$ ]] && (( KEEP_RELEASES > 0 )); then
	find "$RELEASES_DIR" -mindepth 1 -maxdepth 1 -type d | sort | head -n -"$KEEP_RELEASES" | xargs -r rm -rf
fi

echo "Deployment completed: $release_dir"