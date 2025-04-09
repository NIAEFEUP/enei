#!/bin/sh

set -e

if [ -n "$SKIP_SCRIPTS" ]; then
  echo "Skipping preparation script..."
  exit 0
fi

echo "Ensuring .env file exists..."
if [ ! -f ".env" ]; then
  cp .env.example .env
  node ace generate:key
fi

echo "Clearing vite cache..."
rm -rf node_modules/.vite node_modules/.vite-temp

echo "Generating Tuyau types..."
node ace tuyau:generate

# Preparation is complete

echo "ENEI Website workspace is ready!"
