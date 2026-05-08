#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
BACKEND="$ROOT/backend-main"

# ── env checks ────────────────────────────────────────────────────────────────
if [ ! -f "$BACKEND/.env" ]; then
  echo "Error: backend-main/.env missing. Copy backend-main/.env.example and fill in values."
  exit 1
fi

if [ ! -f "$ROOT/.env.local" ]; then
  echo "Error: .env.local missing. Create it with:"
  echo "  JWT_ACCESS_SECRET=<same as backend>"
  echo "  JWT_REFRESH_SECRET=<same as backend>"
  echo "  BACKEND_INTERNAL_URL=http://localhost:3001"
  exit 1
fi

# ── optional seed ─────────────────────────────────────────────────────────────
if [[ "${1:-}" == "--seed" ]]; then
  echo "Seeding demo users (password: demo123)..."
  (cd "$BACKEND" && npx ts-node src/seed.ts)
fi

# ── cleanup on exit ───────────────────────────────────────────────────────────
trap 'echo; echo "Stopping..."; kill $(jobs -p) 2>/dev/null; wait' INT TERM EXIT

# ── start services ────────────────────────────────────────────────────────────
echo "Starting NestJS  → http://localhost:3001"
(cd "$BACKEND" && npm run start:dev) &

echo "Starting Next.js → http://localhost:3000"
(cd "$ROOT" && npm run dev) &

wait
