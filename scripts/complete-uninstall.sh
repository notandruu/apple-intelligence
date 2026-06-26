#!/usr/bin/env bash

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "This script will stop Apple Intelligence, remove the installed app, and delete caches, databases, and preferences."
read -r -p "Continue with the full uninstall? [y/N]: " confirm
if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
  echo "Aborted."
  exit 0
fi

remove_target() {
  local target="$1"
  if [[ -e "$target" ]]; then
    echo "Removing $target"
    rm -rf "$target" 2>/dev/null || sudo rm -rf "$target"
  fi
}

echo "Stopping running Apple Intelligence/Electron processes..."
pkill -f "Apple Intelligence" 2>/dev/null || true
pkill -f "apple-intelligence" 2>/dev/null || true
pkill -f "Electron Helper.*Apple Intelligence" 2>/dev/null || true

echo "Removing /Applications/Apple Intelligence.app (requires admin)..."
remove_target "/Applications/Apple Intelligence.app"

echo "Purging Application Support data..."
remove_target "$HOME/Library/Application Support/Apple Intelligence"
remove_target "$HOME/Library/Application Support/apple-intelligence"
remove_target "$HOME/Library/Application Support/Apple Intelligence-dev"
remove_target "$HOME/Library/Application Support/com.apple-intelligence"
remove_target "$HOME/Library/Application Support/com.apple-intelligence.Apple Intelligence"

echo "Removing caches, logs, and saved state..."
remove_target "$HOME/Library/Caches/apple-intelligence"
remove_target "$HOME/Library/Caches/com.apple-intelligence.Apple Intelligence"
remove_target "$HOME/Library/Preferences/com.apple-intelligence.Apple Intelligence.plist"
remove_target "$HOME/Library/Preferences/com.apple-intelligence.helper.plist"
remove_target "$HOME/Library/Logs/Apple Intelligence"
remove_target "$HOME/Library/Saved Application State/com.apple-intelligence.Apple Intelligence.savedState"

echo "Cleaning temporary files..."
shopt -s nullglob
for tmp in /tmp/apple-intelligence*; do
  remove_target "$tmp"
done
for crash in "$HOME/Library/Application Support/CrashReporter"/Apple Intelligence_*; do
  remove_target "$crash"
done
shopt -u nullglob

read -r -p "Remove downloaded Whisper models and caches (~/.cache/whisper, ~/Library/Application Support/whisper)? [y/N]: " wipe_models
if [[ "$wipe_models" =~ ^[Yy]$ ]]; then
  remove_target "$HOME/.cache/whisper"
  remove_target "$HOME/Library/Application Support/whisper"
  remove_target "$HOME/Library/Application Support/Apple Intelligence/models"
fi

ENV_FILE="$PROJECT_ROOT/.env"
if [[ -f "$ENV_FILE" ]]; then
  read -r -p "Remove the local environment file at $ENV_FILE? [y/N]: " wipe_env
  if [[ "$wipe_env" =~ ^[Yy]$ ]]; then
    echo "Removing $ENV_FILE"
    rm -f "$ENV_FILE"
  fi
fi

cat <<'EOF'
macOS keeps microphone, screen recording, and accessibility approvals even after files are removed.
Reset them if you want a truly fresh start:
  tccutil reset Microphone com.apple-intelligence.app
  tccutil reset Accessibility com.apple-intelligence.app
  tccutil reset ScreenCapture com.apple-intelligence.app

Full uninstall complete. Reboot if you removed permissions, then reinstall or run npm scripts on a clean tree.
EOF
