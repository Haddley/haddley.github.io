/**
 * Generates wiki pages for posts that have none. Run: node scripts/wiki-generate.mjs [--limit N] [--slug a,b] [--force]
 *
 * Quotes are extractive: the post body is split into numbered sentences and the model chooses
 * sentence numbers, so every quote is word for word by construction. The audit
 * (scripts/wiki-audit.mjs) is still the gate. Pages that already exist are left alone unless the
 * post changed (source_hash differs) or --force is given. Hand-written pages have no source_hash
 * and are never overwritten without --force.
 *
 * Env: OLLAMA_URL (default http://127.0.0.1:11434), WIKI_MODEL (default gemma4:12b).
 */
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import matter from 'gray-matter';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(root, 'content');
const OUT = join(root, 'wiki', 'posts');
const OLLAMA_URL = process.env.OLLAMA_URL ?? 'http://127.0.0.1:11434';
const MODEL = process.env.WIKI_MODEL ?? 'gemma4:12b';
const PROMPT_CHARS = 12000;

const args = process.argv.slice(2);
const flag = n => args.includes(`--${n}`);
const value = n => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : undefined; };
const limit = Number(value('limit') ?? Infinity);
const only = value('slug')?.split(',');
const force = flag('force');

const hash = text => createHash('sha1').update(text).digest('hex').slice(0, 12);
const clean = s => s.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1');

/** Split a post body into numbered sentences, ignoring code, images, tables and callout markers. */
function sentencesOf(body) {
  const out = [];
  let section = '';
  let inCode = false;
  for (const raw of body.split('\n')) {
    const line = raw.trim();
    if (line.startsWith('```')) { inCode = !inCode; continue; }
    if (inCode || !line) continue;
    if (/^#{1,6}\s/.test(line)) { section = line.replace(/^#+\s*/, ''); continue; }
    if (/^(:::|!\[|\||<|---|\*[^*]|>\s*$)/.test(line) && !line.startsWith('*I ')) {
      if (line.startsWith(':::')) { const t = line.replace(/^:::\S*\s*/, ''); if (t) section = t; }
      continue;
    }
    const text = line.replace(/^([-*]|\d+\.)\s+/, '').replace(/^>\s*/, '');
    for (const sentence of text.split(/(?<=[.!?])\s+(?=[A-Z0-9`*"\[(])/)) {
      const s = sentence.trim();
      if (s.length >= 30 && s.length <= 420 && !/^\*?[A-Za-z0-9 ,'-]{0,40}\*?$/.test(s) && !s.includes('"')) out.push({ text: s, section });
    }
  }
  return out.map((s, i) => ({ ...s, id: i + 1 }));
}

/** Choose which sentences go in the prompt: all if they fit, else the opening of each section first. */
function promptSentences(all) {
  const size = list => list.reduce((n, s) => n + s.text.length + 8, 0);
  if (size(all) <= PROMPT_CHARS) return all;
  const picked = new Set();
  const bySection = new Map();
  for (const s of all) (bySection.get(s.section) ?? bySection.set(s.section, []).get(s.section)).push(s);
  for (let round = 0; round < 6 && size(all.filter(s => picked.has(s.id))) < PROMPT_CHARS; round++) {
    for (const list of bySection.values()) {
      const s = list[round];
      if (s && size(all.filter(x => picked.has(x.id))) + s.text.length < PROMPT_CHARS) picked.add(s.id);
    }
  }
  return all.filter(s => picked.has(s.id));
}

const SCHEMA = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    what_i_did: { type: 'array', items: { type: 'string' } },
    claims: { type: 'array', items: { type: 'object', properties: { claim: { type: 'string' }, sentence: { type: 'integer' } }, required: ['claim', 'sentence'] } },
    topics: { type: 'array', items: { type: 'string' } },
    tools: { type: 'array', items: { type: 'string' } },
    outcome: { type: 'string' },
    caveats: { type: 'string' },
  },
  required: ['summary', 'what_i_did', 'claims', 'topics', 'tools', 'outcome', 'caveats'],
};

async function ask(title, description, sentences, retryNote = '') {
  const numbered = sentences.map(s => `[${s.id}] ${s.text}`).join('\n');
  const prompt = `You are writing a wiki page for one of Neil Haddley's blog posts. Write in the first person as Neil ("I built..."), in plain active voice, with no contractions.

Post title: ${title}
Post description: ${description}

The post's sentences are numbered. Use ONLY these.

${numbered}

Return JSON with:
- summary: 2 or 3 sentences saying what the post is about and what it found.
- what_i_did: 3 to 5 short bullets, in order.
- claims: 4 to 8 claims a reader might ask about. Each has "claim" (your own plain statement of the point, one sentence) and "sentence" (the ONE number whose sentence best supports it). Do not repeat a sentence number. Prefer sentences that state a result, a number, a decision or a mistake.
- topics: 2 to 5 lowercase hyphenated concepts the post teaches.
- tools: up to 6 named tools, products or libraries used.
- outcome: 1 or 2 sentences on what I built or concluded.
- caveats: 1 sentence on what the post does not show or what is uncertain.
${retryNote}`;
  const res = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL, stream: false, format: SCHEMA, think: false,
      options: { temperature: 0.1, num_ctx: 16384 },
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`Ollama ${res.status}`);
  return JSON.parse((await res.json()).message.content);
}

const yaml = v => JSON.stringify(v);
// Items are double-quoted so names such as @azure/identity or `code` stay valid YAML.
const list = a => `[${a.map(x => JSON.stringify(String(x).replace(/[\[\]]/g, '').trim())).join(', ')}]`;
const slugify = t => String(t).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ---- main ---------------------------------------------------------------------------------------------------
await mkdir(OUT, { recursive: true });
const posts = new Map();
for (const file of (await readdir(CONTENT)).filter(f => f.endsWith('.md'))) {
  const raw = await readFile(join(CONTENT, file), 'utf-8');
  const { data, content } = matter(raw);
  if (data.visible === false || data.hidden === true || data.hidden === 'true') continue;
  posts.set(data.slug || file.replace(/\.md$/, ''), { data, content, raw });
}

let done = 0, skipped = 0, failed = 0;
const queue = [...posts.keys()].filter(s => !only || only.includes(s));
for (const slug of queue) {
  if (done >= limit) break;
  const { data, content, raw } = posts.get(slug);
  const file = join(OUT, `${slug}.md`);
  const sourceHash = hash(raw);
  if (existsSync(file) && !force) {
    const existing = matter(await readFile(file, 'utf-8')).data;
    if (!existing.source_hash || existing.source_hash === sourceHash) { skipped++; continue; }
  }
  const all = sentencesOf(content);
  if (all.length < 6) { console.log(`skip ${slug}: only ${all.length} usable sentences`); skipped++; continue; }
  const shown = promptSentences(all);
  const byId = new Map(all.map(s => [s.id, s]));
  const title = data.part ? `${data.title || slug} (Part ${data.part})` : (data.title || slug);

  let result = null;
  let claims = [];
  const started = Date.now();
  for (let attempt = 0; attempt < 2 && claims.length < 3; attempt++) {
    try {
      result = await ask(title, data.description || '', shown, attempt ? '\nYour last answer used invalid sentence numbers. Use only numbers that appear in square brackets above.' : '');
      const used = new Set();
      claims = (result.claims ?? []).filter(c => c?.claim && byId.has(c.sentence) && shown.some(s => s.id === c.sentence) && !used.has(c.sentence) && used.add(c.sentence));
    } catch (err) { console.log(`  ${slug}: ${err.message}`); }
  }
  if (claims.length < 3) { console.log(`FAILED ${slug}: ${claims.length} valid claims`); failed++; continue; }

  const linked = [...content.matchAll(/\(\/posts\/([a-z0-9-]+)\/?\)/g)].map(m => m[1]).filter(s => s !== slug && posts.has(s));
  const builds = [...new Set(linked)].filter(s => String(posts.get(s).data.date) <= String(data.date)).slice(0, 5);
  const topics = [...new Set((result.topics ?? []).map(slugify).filter(Boolean))].slice(0, 5);
  const page = [
    '---',
    'type: post',
    `slug: ${slug}`,
    `title: ${yaml(title)}`,
    `date: ${yaml(String(data.date).slice(0, 10))}`,
    ...(data.part ? [`part: ${data.part}`] : []),
    `builds_on: ${list(builds)}`,
    `topics: ${list(topics)}`,
    `tools: ${list((result.tools ?? []).slice(0, 6))}`,
    'status: current',
    `checked: ${yaml(new Date().toISOString().slice(0, 10))}`,
    `source_hash: "${sourceHash}"`,
    `generated_by: ${MODEL}`,
    '---',
    '',
    `**Summary.** ${result.summary.trim()}`,
    '',
    '## What I did',
    ...(result.what_i_did ?? []).map(b => `- ${b.trim()}`),
    '',
    '## Claims',
    ...claims.flatMap(c => [`- ${c.claim.trim()}`, `  > "${clean(byId.get(c.sentence).text)}"`]),
    '',
    '## Outcome',
    result.outcome.trim(),
    '',
    '## Caveats',
    result.caveats.trim(),
    '',
  ].join('\n');
  await writeFile(file, page);
  done++;
  console.log(`ok ${slug} (${claims.length} claims, ${Math.round((Date.now() - started) / 1000)}s)`);
}
console.log(`generated ${done}, skipped ${skipped}, failed ${failed}`);
