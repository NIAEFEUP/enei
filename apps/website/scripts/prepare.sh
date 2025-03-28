#!/bin/sh

set -e

if [ -n "$SKIP_SCRIPTS" ]; then
  echo "Skipping preparation script..."
  exit 0
fi

# Generate tuyau types

echo "Ensuring .env file exists..."
if [ ! -f ".env" ]; then
  cp .env.example .env
  node ace generate:key
fi

echo "Generating Tuyau types..."
node ace tuyau:generate

# Prepend "// @ts-nocheck" to .adonsjs/api.ts
sed -i '1s/^/\/\/ @ts-nocheck\n/' .adonisjs/api.ts

# Preparation is complete

echo "ENEI Website workspace is ready!"
