#!/bin/bash

# Define the pre-commit hook file path
HOOKS_DIR=".git/hooks"
PRE_COMMIT_FILE="$HOOKS_DIR/pre-commit"

# Create the hooks directory if it doesn't exist
mkdir -p $HOOKS_DIR

# Write the pre-commit hook script
cat <<'EOF' > $PRE_COMMIT_FILE
#!/bin/bash

# Navigate to the subfolder
PROJECT_DIR="website"
cd $PROJECT_DIR || exit 1

# Run formatting and stage changes
echo "Running Prettier formatting..."
pnpm run format
if [ $? -ne 0 ]; then
  echo "Prettier formatting failed. Aborting commit."
  exit 1
fi

# Stage any changes made by the formatter
echo "Staging changes made by Prettier..."
git add .

# Run linting with auto-fix and stage changes
echo "Running ESLint with auto-fix..."
pnpm run lint --fix
if [ $? -ne 0 ]; then
  echo "ESLint check failed. Aborting commit."
  exit 1
fi

# Stage any changes made by the linter
echo "Staging changes made by ESLint..."
git add .

echo "All checks passed. Proceeding with commit."
EOF

# Make the hook executable
chmod +x $PRE_COMMIT_FILE

echo "Pre-commit hook installed successfully."

