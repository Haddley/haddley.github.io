/**
 * Generates topic (concept) pages in wiki/concepts/ from wiki/topics.config.json and the post pages
 * in wiki/posts/. Run after scripts/wiki-generate.mjs:  node scripts/wiki-topics.mjs [--slug a,b] [--force]
 *
 * A topic's posts are the visible posts carrying any of its tags (newest 10). The model sees each
 * post's summary and numbered claims and picks claims by id, so every quote on a topic page is a
 * quote already audited on its post page, with the post named. Pages marked `manual: true` are
 * never overwritten. Env: OLLAMA_URL, WIKI_MODEL (default gemma4:12b).
 */
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import matter from 'gray-matter';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(root, 'content');
const POSTS = join(root, 'wiki', 'posts');
const OUT = join(root, 'wiki', 'concepts');
const OLLAMA_URL = process.env.OLLAMA_URL ?? 'http://127.0.0.1:11434';
const MODEL = process.env.WIKI_MODEL ?? 'gemma4:12b';
const MAX_POSTS = 10;

const args = process.argv.slice(2);
const only = args.includes('--slug') ? args[args.indexOf('--slug') + 1].split(',') : null;
const force = args.includes('--force');
const hash = text => createHash('sha1').update(text).digest('hex').slice(0, 12);

/** Read a post page into { summary, claims: [{ id, text, quote }] }. */
function parsePostPage(slug, raw) {
  const { data, content } = matter(raw);
  const summary = (content.match(/\*\*Summary\.\*\*\s*(.+)/) ?? [])[1] ?? '';
  const claimsText = (content.split(/^## Claims\s*$/m)[1] ?? '').split(/^## /m)[0];
  const claims = [];
  let current = null;
  for (const line of claimsText.split('\n')) {
    if (line.startsWith('- ')) { current = { text: line.slice(2).trim() }; }
    else if (current && /^\s*> "(.+)"\s*$/.test(line)) {
      claims.push({ id: `${slug}#${claims.length + 1}`, slug, text: current.text, quote: line.match(/^\s*> "(.+)"\s*$/)[1] });
      current = null;
    }
  }
  return { data, summary, claims };
}

const SCHEMA = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    idea: { type: 'array', items: { type: 'string' } },
    claims: { type: 'array', items: { type: 'object', properties: { claim: { type: 'string' }, id: { type: 'string' } }, required: ['claim', 'id'] } },
    differences: { type: 'array', items: { type: 'object', properties: { text: { type: 'string' }, ids: { type: 'array', items: { type: 'string' } } }, required: ['text', 'ids'] } },
    conclusion: { type: 'string' },
  },
  required: ['summary', 'idea', 'claims', 'differences', 'conclusion'],
};

async function ask(title, members, note = '') {
  const body = members.map(m => `## ${m.title} (${m.date})\n${m.summary}\n${m.claims.map(c => `[${c.id}] ${c.text}`).join('\n')}`).join('\n\n');
  const prompt = `You are writing a topic page for Neil Haddley's blog on the topic "${title}". It summarises what several of his posts say about the topic. Write in the first person as Neil, in plain active voice, with no contractions. Use ONLY the posts below.

${body}

Return JSON with:
- summary: 2 or 3 sentences on what the posts show about "${title}".
- idea: 3 to 5 short bullets that explain the topic as the posts present it.
- claims: 6 to 10 of the claims above that best show the topic across the posts, from at least 3 different posts if possible. Each has "claim" (the claim, lightly reworded if needed) and "id" (copied exactly from the square brackets above).
- differences: 0 to 3 places where posts disagree, changed their approach, or are out of date. Each has "text" (one sentence) and "ids" (1 or 2 claim ids that show it). Return an empty list if there are none.
- conclusion: 2 sentences on what the posts together conclude.
${note}`;
  const res = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, stream: false, format: SCHEMA, think: false, options: { temperature: 0.1, num_ctx: 16384 }, messages: [{ role: 'user', content: prompt }] }),
  });
  if (!res.ok) throw new Error(`Ollama ${res.status}`);
  return JSON.parse((await res.json()).message.content);
}

// ---- main ---------------------------------------------------------------------------------------------------
await mkdir(OUT, { recursive: true });
const config = JSON.parse(await readFile(join(root, 'wiki', 'topics.config.json'), 'utf-8'));

const pages = new Map();
for (const file of (await readdir(POSTS)).filter(f => f.endsWith('.md'))) {
  const slug = file.replace(/\.md$/, '');
  const raw = await readFile(join(POSTS, file), 'utf-8');
  pages.set(slug, { ...parsePostPage(slug, raw), raw });
}
const tagsOf = new Map();
for (const file of (await readdir(CONTENT)).filter(f => f.endsWith('.md'))) {
  const { data } = matter(await readFile(join(CONTENT, file), 'utf-8'));
  tagsOf.set(data.slug || file.replace(/\.md$/, ''), String(data.tags ?? '').split(',').map(t => t.trim()).filter(Boolean));
}

for (const topic of config) {
  if (only && !only.includes(topic.slug)) continue;
  const file = join(OUT, `${topic.slug}.md`);
  if (existsSync(file) && matter(await readFile(file, 'utf-8')).data.manual) { console.log(`skip ${topic.slug}: manual page`); continue; }

  const members = [...pages.entries()]
    .filter(([slug, p]) => p.claims.length && (tagsOf.get(slug) ?? []).some(t => topic.tags.includes(t)))
    .map(([slug, p]) => ({ slug, title: p.data.title, date: String(p.data.date).slice(0, 10), summary: p.summary, claims: p.claims }))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, MAX_POSTS);
  if (members.length < 3) { console.log(`skip ${topic.slug}: only ${members.length} post pages so far`); continue; }

  const sourceHash = hash(members.map(m => pages.get(m.slug).raw).join('|') + topic.title);
  if (existsSync(file) && !force && matter(await readFile(file, 'utf-8')).data.source_hash === sourceHash) { console.log(`skip ${topic.slug}: unchanged`); continue; }

  const byId = new Map(members.flatMap(m => m.claims.map(c => [c.id, c])));
  let result = null, picked = [];
  const started = Date.now();
  for (let attempt = 0; attempt < 2 && picked.length < 4; attempt++) {
    try {
      result = await ask(topic.title, members, attempt ? '\nYour last answer used ids that do not exist. Copy ids exactly, including the # and number.' : '');
      const seen = new Set();
      picked = (result.claims ?? []).filter(c => byId.has(c.id) && !seen.has(c.id) && seen.add(c.id));
    } catch (err) { console.log(`  ${topic.slug}: ${err.message}`); }
  }
  if (picked.length < 4) { console.log(`FAILED ${topic.slug}: ${picked.length} valid claims`); continue; }

  const quoteLine = c => `  > "${byId.get(c.id ?? c).quote}" — ${byId.get(c.id ?? c).slug}`;
  const differences = (result.differences ?? []).map(d => ({ text: d.text, ids: (d.ids ?? []).filter(id => byId.has(id)).slice(0, 2) })).filter(d => d.text && d.ids.length);
  const description = result.summary.split(/(?<=\.)\s/)[0].trim();
  const page = [
    '---',
    'type: concept',
    `slug: ${topic.slug}`,
    `title: ${JSON.stringify(topic.title)}`,
    `description: ${JSON.stringify(description)}`,
    `posts: [${members.map(m => m.slug).join(', ')}]`,
    'status: current',
    `checked: ${JSON.stringify(new Date().toISOString().slice(0, 10))}`,
    `source_hash: "${sourceHash}"`,
    `generated_by: ${MODEL}`,
    '---',
    '',
    `**Summary.** ${result.summary.trim()}`,
    '',
    '## The idea',
    ...(result.idea ?? []).map(b => `- ${b.trim()}`),
    '',
    '## Claims',
    ...picked.flatMap(c => [`- ${c.claim.trim()}`, quoteLine(c)]),
    '',
    ...(differences.length ? ['## Where the posts differ', ...differences.flatMap(d => [`- ${d.text.trim()}`, ...d.ids.map(id => quoteLine(id))]), ''] : []),
    '## What I concluded',
    result.conclusion.trim(),
    '',
  ].join('\n');
  await writeFile(file, page);
  console.log(`ok ${topic.slug} (${members.length} posts, ${picked.length} claims, ${Math.round((Date.now() - started) / 1000)}s)`);
}
