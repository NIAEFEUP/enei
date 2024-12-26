#!/bin/bash

# Define the pre-commit hook file path
HOOKS_DIR=".git/hooks"
PRE_COMMIT_FILE="$HOOKS_DIR/pre-commit"

# Create the hooks directory if it doesn't exist
mkdir -p "$HOOKS_DIR"

# Write the pre-commit hook script
cat <<'EOF' > $PRE_COMMIT_FILE
#!/usr/bin/env bash

PROJECT_DIR="website"
cd "$PROJECT_DIR" || exit 1

echo "Creating an initial stash..."
git stash push -u --quiet

INITIAL_STASH_COUNT=$(git stash list | wc -l)

echo "Stashing staged changes..."
git stash push -S --quiet
STAGED_STASH_COUNT=$(git stash list | wc -l)

if [ "$STAGED_STASH_COUNT" -le "$INITIAL_STASH_COUNT" ]; then
  echo "No new stash entry for staged changes. Proceeding without staged stash."
  STAGED_CHANGES_STASHED=false
else
  STAGED_CHANGES_STASHED=true
fi

echo "Running ESLint with auto-fix..."
pnpm run lint --fix
if [ $? -ne 0 ]; then
  echo "ESLint check failed. Reverting to the initial state."
  if [ "$STAGED_CHANGES_STASHED" = true ]; then
    git stash pop --quiet  # Restore staged changes
  fi
  git stash pop --quiet  # Restore unstaged and untracked changes
  git stash pop --index --quiet  # Restore initial state
  exit 1
fi

echo "Staging changes made by ESLint..."
git add .

if [ "$STAGED_CHANGES_STASHED" = true ]; then
  echo "Restoring unstaged and untracked changes..."
  git stash pop stash@{0} --quiet
fi

echo "Restoring the initial state..."
git stash pop --index --quiet

echo "All checks passed. Proceeding with commit."
EOF

# Make the hook executable
chmod +x "$PRE_COMMIT_FILE"

echo "Pre-commit hook installed successfully."
