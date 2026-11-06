/**
 * Removes the unused Mobirise section rules from content/assets/mobirise/css/mbr-additional.css.
 *
 * Run:  node scripts/prune-mobirise-css.mjs [--dry]
 *
 * The file is a leftover export from the Mobirise site builder: one set of rules for every section the
 * builder ever made, each scoped to a `.cid-XXXX` class. The site uses only a handful of them, but the
 * browser parses all 45,000 rules on every page. This keeps every rule that does not mention a `.cid-`
 * class, and every rule that mentions one the site still uses (looked for in src/ and content/*.md).
 * It is safe to run again after a new Mobirise export; it only ever removes rules.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = join(root, 'content', 'assets', 'mobirise', 'css', 'mbr-additional.css');
const dry = process.argv.includes('--dry');

// ---- which cid-* classes does the site still use?
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}
const sources = [...walk(join(root, 'src')), ...readdirSync(join(root, 'content')).filter(f => f.endsWith('.md')).map(f => join(root, 'content', f))];
const used = new Set();
for (const p of sources) {
  let text;
  try { text = readFileSync(p, 'utf8'); } catch { continue; }
  for (const m of text.matchAll(/cid-[A-Za-z0-9]+/g)) used.add(m[0]);
}

// ---- a small CSS reader: comments out, then split into top-level blocks
const css = readFileSync(FILE, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

/** Splits text into top-level items: `prelude{body}` blocks and `;`-ended statements. */
function items(text) {
  const out = [];
  let depth = 0, start = 0, quote = '', paren = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quote) { if (c === '\\') i++; else if (c === quote) quote = ''; continue; }
    if (c === '"' || c === "'") { quote = c; continue; }
    if (c === '(') paren++;
    else if (c === ')') paren--;
    else if (c === '{' && paren === 0) depth++;
    else if (c === '}' && paren === 0) {
      depth--;
      if (depth === 0) { out.push(text.slice(start, i + 1).trim()); start = i + 1; }
    } else if (c === ';' && depth === 0 && paren === 0) { out.push(text.slice(start, i + 1).trim()); start = i + 1; }
  }
  const rest = text.slice(start).trim();
  if (rest) out.push(rest);
  return out.filter(Boolean);
}

/** Splits a selector list on its top-level commas. */
function selectors(prelude) {
  const out = [];
  let paren = 0, bracket = 0, quote = '', start = 0;
  for (let i = 0; i < prelude.length; i++) {
    const c = prelude[i];
    if (quote) { if (c === '\\') i++; else if (c === quote) quote = ''; continue; }
    if (c === '"' || c === "'") quote = c;
    else if (c === '(') paren++;
    else if (c === ')') paren--;
    else if (c === '[') bracket++;
    else if (c === ']') bracket--;
    else if (c === ',' && paren === 0 && bracket === 0) { out.push(prelude.slice(start, i).trim()); start = i + 1; }
  }
  out.push(prelude.slice(start).trim());
  return out.filter(Boolean);
}

const stats = { rules: 0, kept: 0, dropped: 0 };

function keepSelector(sel) {
  const ids = [...sel.matchAll(/\.(cid-[A-Za-z0-9]+)/g)].map(m => m[1]);
  return ids.length === 0 || ids.some(id => used.has(id));
}

function prune(text) {
  const out = [];
  for (const item of items(text)) {
    const brace = item.indexOf('{');
    if (brace === -1) { out.push(item); continue; }             // @charset, @import
    const prelude = item.slice(0, brace).trim();
    const body = item.slice(brace + 1, item.lastIndexOf('}'));
    if (/^@(media|supports|layer|container|document)\b/i.test(prelude)) {
      const inner = prune(body);
      if (inner.length) out.push(`${prelude}{${inner.join('')}}`);
    } else if (prelude.startsWith('@')) {
      out.push(item);                                           // @font-face, @keyframes, @page: keep as written
    } else {
      stats.rules++;
      const keep = selectors(prelude).filter(keepSelector);
      if (keep.length) { stats.kept++; out.push(`${keep.join(',')}{${body.trim()}}`); } else stats.dropped++;
    }
  }
  return out;
}

const result = prune(css).join('\n') + '\n';
const before = Buffer.byteLength(readFileSync(FILE, 'utf8'));
const after = Buffer.byteLength(result);
console.log(`cid-* classes the site uses: ${used.size}`);
console.log(`style rules: ${stats.rules} | kept ${stats.kept} | removed ${stats.dropped}`);
console.log(`size: ${(before / 1048576).toFixed(2)} MB -> ${(after / 1024).toFixed(0)} KB`);
if (dry) console.log('(dry run: nothing written)');
else { writeFileSync(FILE, result); console.log('written', FILE); }
