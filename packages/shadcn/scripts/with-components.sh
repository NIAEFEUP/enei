#!/bin/sh

set -e

if [ -z "$1" ]; then
  echo "Please provide a registry name"
  exit 1
fi

cd "$(dirname "$0")/.."

registry="$1"
shift

cp "components.$registry.json" components.json
trap 'rm components.json' EXIT

eval "$@"
