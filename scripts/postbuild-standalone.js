#!/usr/bin/env node
/**
 * Next.js `output: "standalone"` does NOT copy `public/` or `.next/static/`
 * into `.next/standalone/`. Both must be copied manually or the running server
 * returns 404 for every stylesheet and every image in public/.
 *
 * Wired as `postbuild`, so it runs automatically after `next build`.
 */
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const standalone = path.join(root, '.next', 'standalone');

if (!fs.existsSync(standalone)) {
  console.error('[postbuild] .next/standalone not found — nothing to do.');
  process.exit(0);
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`[postbuild] skip (missing): ${path.relative(root, src)}`);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true, dereference: true });
  console.log(`[postbuild] copied ${path.relative(root, src)} -> ${path.relative(root, dest)}`);
}

copyDir(path.join(root, 'public'), path.join(standalone, 'public'));
copyDir(path.join(root, '.next', 'static'), path.join(standalone, '.next', 'static'));

// Prisma / native deps in standalone need the real .so files present at runtime.
const prismaEngines = path.join(root, 'node_modules', '.prisma', 'client');
if (fs.existsSync(prismaEngines)) {
  copyDir(prismaEngines, path.join(standalone, 'node_modules', '.prisma', 'client'));
}

console.log('[postbuild] done.');