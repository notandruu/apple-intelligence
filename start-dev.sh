#!/bin/bash
export PATH="/opt/homebrew/opt/node@24/bin:$PATH"
cd "$(dirname "$0")"

# Kill any stale processes
pkill -f "apple-intelligence/node_modules/electron" 2>/dev/null
pkill -f "vite" 2>/dev/null
sleep 1

# Start Vite renderer
npm run dev:renderer > /tmp/apple-intelligence-vite.log 2>&1 &
VITE_PID=$!
echo "Vite starting (PID $VITE_PID)..."

# Wait until Vite is accepting connections
until curl -s http://localhost:5183/ > /dev/null 2>&1; do
  sleep 0.3
done
echo "Vite ready."

# Start Electron (foreground so this script stays alive with the app)
NODE_ENV=development node scripts/run-electron.js --dev

# Cleanup when Electron exits
kill $VITE_PID 2>/dev/null
echo "Done."
