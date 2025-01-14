#!/bin/sh

set -e

if [ "$NODE_ENV" = "production" ]; then
  echo "Production environment detected. Skipping preparation."
  exit 0
fi

# Change current working directory to the root of the repository

cd "$(dirname "$0")"
cd ../..

# Install Husky hooks

echo "Installing husky hooks..."
husky website/.husky

# Change current working directory to the website directory

cd website

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
