#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$APP_DIR"

echo "==> AnkiPeptide Deploy Script"
echo ""

# ── 1. Check prerequisites ──────────────────────────────────────
command -v docker >/dev/null 2>&1 || { echo "Error: docker is required"; exit 1; }
command -v node   >/dev/null 2>&1 || { echo "Error: node >= 18 is required"; exit 1; }
command -v npx    >/dev/null 2>&1 || { echo "Error: npx is required"; exit 1; }

# ── 2. Create .env if missing ───────────────────────────────────
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example"
  echo "  Edit ADMIN_PASSWORD and DATABASE_URL before proceeding!"
  echo ""
fi

# ── 3. Start PostgreSQL ─────────────────────────────────────────
if ! docker ps --format '{{.Names}}' | grep -q '^apeptide-db$'; then
  echo "Starting PostgreSQL container..."
  docker compose up -d postgres
  until docker exec apeptide-db pg_isready -U apeptide >/dev/null 2>&1; do
    sleep 2
  done
  echo "PostgreSQL is ready."
else
  echo "PostgreSQL already running."
fi

# ── 4. Install dependencies ─────────────────────────────────────
echo "Installing npm dependencies..."
npm install

# ── 5. Prisma setup ─────────────────────────────────────────────
echo "Setting up database..."
npx prisma generate
npx prisma db push --accept-data-loss 2>/dev/null || npx prisma db push

# ── 6. Seed data ────────────────────────────────────────────────
echo "Seeding initial data..."
npx tsx scripts/seed.ts

# ── 7. Build ────────────────────────────────────────────────────
echo "Building Next.js..."
npm run build

# ── 8. Start ────────────────────────────────────────────────────
echo ""
echo "==> Build complete!"
echo "==> Starting production server on http://localhost:3002"
echo "    Admin panel: http://localhost:3002/admin"
echo "    (press Ctrl+C to stop)"
echo ""
npm run start
