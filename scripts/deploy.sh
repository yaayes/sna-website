#!/usr/bin/env bash
# deploy.sh — called by GitHub Actions to deploy to a server
# Usage: APP_PATH=/home/forge/sna.inmindweb.fr bash deploy.sh
set -euo pipefail

APP_PATH="${APP_PATH:?APP_PATH is required}"

echo "▶ Deploying to $APP_PATH"

cd "$APP_PATH"

echo "▶ Pulling latest code..."
git pull origin main

echo "▶ Installing Composer dependencies..."
composer install --no-dev --no-interaction --optimize-autoloader --quiet

echo "▶ Running migrations..."
php artisan migrate --force

echo "▶ Clearing & caching config/routes/views..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

echo "▶ Installing npm dependencies..."
npm ci --prefer-offline --quiet

echo "▶ Building frontend assets..."
npm run build

echo "▶ Restarting queue workers..."
php artisan queue:restart

echo "▶ Reloading PHP-FPM..."
sudo systemctl reload php8.4-fpm

echo "✅ Deployment complete."
