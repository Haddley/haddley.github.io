/**
 * Checks the blog wiki against the posts. Run via: node scripts/wiki-audit.mjs
 *
 * For every page in wiki/posts/ (and wiki/concepts/, where each quote names its post: > "text" — slug):
 *   - the file name, `slug` and the post's own slug agree, and the post exists in content/
 *   - `title` and `date` match the post's frontmatter
 *   - every slug in `builds_on` is a real post
 *   - every quote (a line starting with `> "`) appears word for word in the post body
 *     (whitespace, curly quotes and markdown emphasis are ignored)
 *   - every claim (a line starting with `- `) under "## Claims" has a quote
 * Also lists pages whose post changed since the page was generated (source_hash differs). That is a
 * reminder to run `npm run wiki`, not a failure.
 * Exits 1 if anything fails.
 */
import { readdir, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import matter from 'gray-matter';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(root, 'content');
const WIKI = join(root, 'wiki', 'posts');

const normalise = s => s
  .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')   // markdown links and images keep only their text
  .replace(/[‘’]/g, "'")
  .replace(/[“”]/g, '"')
  .replace(/[*`_]/g, '')
  .replace(/\s+/g, ' ')
  .trim();

const posts = new Map();
for (const file of (await readdir(CONTENT)).filter(f => f.endsWith('.md'))) {
  const raw = await readFile(join(CONTENT, file), 'utf-8');
  const { data, content } = matter(raw);
  posts.set(data.slug || file.replace(/\.md$/, ''), { data, body: normalise(content), hash: createHash('sha1').update(raw).digest('hex').slice(0, 12) });
}

let failures = 0;
const stale = [];
let quotes = 0;
const fail = (page, msg) => { failures++; console.log(`FAIL ${page}: ${msg}`); };

// Shared quote check. `allowed` is the set of posts a quote may come from; on post pages it is
// just that post, on concept pages the quote names its post: > "text" — slug
function checkBody(page, content, allowed, named) {
  const lines = content.split('\n');
  let inClaims = false;
  let lastClaim = null;
  const closeClaim = () => { if (lastClaim && !lastClaim.quoted) fail(page, `claim has no quote: ${lastClaim.text.slice(0, 70)}`); lastClaim = null; };
  for (const line of lines) {
    if (line.startsWith('## ')) { closeClaim(); inClaims = line.trim() === '## Claims'; continue; }
    const quote = named ? line.match(/^\s*> "(.+)" — ([a-z0-9-]+)\s*$/) : line.match(/^\s*> "(.+)"\s*$/);
    if (quote) {
      quotes++;
      if (lastClaim) lastClaim.quoted = true;
      const slug = named ? quote[2] : allowed[0];
      if (!allowed.includes(slug) || !posts.has(slug)) { fail(page, `quote names "${slug}", which is not one of this page's posts`); continue; }
      if (!posts.get(slug).body.includes(normalise(quote[1]))) fail(page, `quote not found in ${slug}: "${quote[1].slice(0, 80)}"`);
    } else if (named && /^\s*> /.test(line)) {
      fail(page, `quote without a source post: ${line.trim().slice(0, 70)}`);
    } else if (inClaims && line.startsWith('- ')) {
      closeClaim();
      lastClaim = { text: line.slice(2), quoted: false };
    }
  }
  closeClaim();
}

let postFiles = [];
try { postFiles = (await readdir(WIKI)).filter(f => f.endsWith('.md')); } catch { console.log('no wiki/posts folder yet; nothing to audit'); }
for (const file of postFiles) {
  const page = file.replace(/\.md$/, '');
  const { data, content } = matter(await readFile(join(WIKI, file), 'utf-8'));
  const post = posts.get(page);
  if (data.slug !== page) fail(page, `slug "${data.slug}" does not match the file name`);
  if (!post) { fail(page, 'no post with this slug in content/'); continue; }
  if (data.title !== (post.data.title || '') && !String(data.title).startsWith(post.data.title)) fail(page, `title "${data.title}" does not match the post`);
  if (String(data.date).slice(0, 10) !== String(post.data.date).slice(0, 10)) fail(page, `date ${data.date} does not match the post (${post.data.date})`);
  if (data.source_hash && data.source_hash !== post.hash) stale.push(page);
  for (const slug of data.builds_on ?? []) if (!posts.has(slug)) fail(page, `builds_on "${slug}" is not a post`);
  checkBody(page, content, [page], false);
}

const CONCEPTS = join(root, 'wiki', 'concepts');
let conceptFiles = [];
try { conceptFiles = (await readdir(CONCEPTS)).filter(f => f.endsWith('.md')); } catch { /* no concept pages yet */ }
for (const file of conceptFiles) {
  const page = `concepts/${file.replace(/\.md$/, '')}`;
  const { data, content } = matter(await readFile(join(CONCEPTS, file), 'utf-8'));
  if (data.slug !== file.replace(/\.md$/, '')) fail(page, `slug "${data.slug}" does not match the file name`);
  const members = data.posts ?? [];
  if (!members.length) fail(page, 'no posts listed');
  for (const slug of members) if (!posts.has(slug)) fail(page, `posts: "${slug}" is not a post`);
  checkBody(page, content, members, true);
}

if (stale.length) console.log(`${stale.length} page(s) are older than their post (run npm run wiki): ${stale.slice(0, 20).join(', ')}${stale.length > 20 ? ', ...' : ''}`);
console.log(failures ? `${failures} failure(s)` : `wiki audit passed: ${quotes} quotes checked`);
process.exit(failures ? 1 : 0);
