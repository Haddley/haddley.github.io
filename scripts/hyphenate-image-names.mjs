#!/usr/bin/env node
// One-off cleanup: rename post image files whose names contain spaces or the
// U+202F narrow no-break space (macOS screenshot names) to hyphenated names,
// and rewrite the matching references in content/*.md. Follows the convention
// documented in CLAUDE.md ("Image Filenames").
//
// Usage:
//   node scripts/hyphenate-image-names.mjs           # dry run, report only
//   node scripts/hyphenate-image-names.mjs --apply   # rename files + edit .md

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(ROOT, 'content');
const IMAGES = path.join(CONTENT, 'assets/images');
const APPLY = process.argv.includes('--apply');

const IMG_EXT = /\.(png|jpe?g|gif|webp|svg|heic)$/i;

function hyphenateBasename(name) {
  return name
    .normalize('NFC')
    .replace(/[\s  ]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/-(\.[A-Za-z0-9]+)$/, '$1');
}

function findOnDisk(dir, decodedName) {
  if (!fs.existsSync(dir)) return null;
  const want = decodedName.normalize('NFC');
  for (const entry of fs.readdirSync(dir)) {
    if (entry.normalize('NFC') === want) return path.join(dir, entry);
  }
  return null;
}

// Given a raw URL as it appears in the markdown, return
// { needsFix, newUrl, oldDisk, newDisk } or null if not an images asset.
function analyseUrl(rawUrl) {
  let url = rawUrl.trim().replace(/^<|>$/g, '');
  url = url.replace(/\s+["'][^"']*["']$/, '').trim();   // strip optional "title"
  const m = url.match(/^((?:\.\.\/)*\/?assets\/images\/)(.*)$/i);
  if (!m) return null;
  const [, prefix, rest] = m;
  const restDecoded = safeDecode(rest);
  const segs = restDecoded.split('/');
  const filename = segs.pop();
  if (!IMG_EXT.test(filename)) return null;
  const newFilename = hyphenateBasename(filename);
  if (newFilename === filename) return null;

  const dir = path.join(IMAGES, segs.join('/'));
  const oldDisk = findOnDisk(dir, filename);
  const newDisk = oldDisk ? path.join(path.dirname(oldDisk), newFilename) : null;
  const newUrl = prefix + [...segs, newFilename].join('/');
  return { newUrl, oldDisk, newDisk, missing: !oldDisk, dirRel: segs.join('/'), filename };
}

function safeDecode(s) {
  try { return decodeURIComponent(s); } catch { return s; }
}

const mdFiles = fs.readdirSync(CONTENT).filter(f => f.endsWith('.md'));
const plan = [];
const allRenames = new Map(); // oldDisk -> newDisk
let refCount = 0;

for (const file of mdFiles) {
  const abs = path.join(CONTENT, file);
  let src = fs.readFileSync(abs, 'utf8');
  const original = src;
  const localRenames = [];

  // 1. frontmatter image:
  src = src.replace(/^(image:\s*)(["']?)([^"'\n]+)(\2)(\s*)$/m, (full, k, q, val, q2, tail) => {
    const a = analyseUrl(val);
    if (!a) return full;
    refCount++;
    if (a.oldDisk && a.newDisk) allRenames.set(a.oldDisk, a.newDisk);
    else if (a.missing) console.warn(`  ! ${file} (frontmatter): file not found: ${a.dirRel}/${a.filename}`);
    return k + q + a.newUrl + q2 + tail;
  });

  // 2. body images  ![alt](url)
  src = src.replace(/(!\[[^\]]*\]\()([^)]+)(\))/g, (full, open, url, close) => {
    const a = analyseUrl(url);
    if (!a) return full;
    refCount++;
    if (a.oldDisk && a.newDisk) { allRenames.set(a.oldDisk, a.newDisk); localRenames.push([a.oldDisk, a.newDisk]); }
    else if (a.missing) console.warn(`  ! ${file}: file not found: ${a.dirRel}/${a.filename}`);
    return open + a.newUrl + close;
  });

  if (src !== original) plan.push({ file, abs, src, localRenames });
}

console.log(`\n${plan.length} post(s) affected — ${allRenames.size} unique file rename(s), ${refCount} reference rewrite(s)\n`);
for (const p of plan) {
  const dirs = new Set([...p.localRenames].map(([o]) => path.relative(ROOT, path.dirname(o))));
  console.log(`  ${p.file}  (${p.localRenames.length} refs, dirs: ${[...dirs].join(', ') || 'n/a'})`);
}

if (!APPLY) {
  console.log('\nDry run. Re-run with --apply to perform the changes.');
  process.exit(0);
}

let renamed = 0;
for (const [o, n] of allRenames) {
  if (o === n) continue;
  if (!fs.existsSync(o)) { console.warn(`  skip (gone): ${path.relative(ROOT, o)}`); continue; }
  if (fs.existsSync(n)) { console.warn(`  skip (target exists): ${path.relative(ROOT, n)}`); continue; }
  fs.renameSync(o, n);
  renamed++;
}
for (const p of plan) fs.writeFileSync(p.abs, p.src);
console.log(`\nApplied: ${renamed} files renamed, ${plan.length} markdown files updated.`);
console.log('Next: npm run sync-images  (then rebuild).');
