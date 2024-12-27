#!/bin/sh

set -e

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

# Preparation is complete

echo "ENEI Website workspace is ready!"
