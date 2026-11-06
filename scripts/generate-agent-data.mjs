/**
 * Generates public/agent-data.json from content/*.md frontmatter.
 * Run via: node scripts/generate-agent-data.mjs
 * Also runs automatically as part of the prebuild step.
 */
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, '../content');
const OUTPUT_FILE = join(__dirname, '../public/agent-data.json');
const POSTS_DIR = join(__dirname, '../public/agent-posts');

// Cap content at ~6000 chars so it fits comfortably inside the model context
const CONTENT_CAP = 6000;

async function run() {
  await mkdir(POSTS_DIR, { recursive: true });

  const files = await readdir(CONTENT_DIR);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  const posts = [];
  const partBySlug = new Map();
  for (const file of mdFiles) {
    const raw = await readFile(join(CONTENT_DIR, file), 'utf-8');
    const { data, content } = matter(raw);
    if (data.visible === false || data.hidden === true || data.hidden === 'true') continue;

    const slug = data.slug || file.replace(/\.md$/, '');
    const title = data.part ? `${data.title || ''} (Part ${data.part})` : (data.title || '');
    partBySlug.set(slug, typeof data.part === 'number' ? data.part : 0);

    posts.push({
      slug,
      title,
      description: data.description || '',
      date: data.date || '',
      categories: Array.isArray(data.categories) ? data.categories : [],
      tags: typeof data.tags === 'string' ? data.tags : '',
    });

    // Write individual post file with markdown body for the get_post_content tool
    const body = content.trim();
    const postData = {
      slug,
      title,
      date: data.date || '',
      categories: Array.isArray(data.categories) ? data.categories : [],
      tags: typeof data.tags === 'string' ? data.tags : '',
      content: body.length > CONTENT_CAP ? body.slice(0, CONTENT_CAP) + '\n…(truncated)' : body,
    };
    await writeFile(join(POSTS_DIR, `${slug}.json`), JSON.stringify(postData));
  }

  posts.sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    // Same-date tiebreak (e.g. a whole series published in one sitting): higher
    // part number is the more recently written post, so it sorts first.
    return partBySlug.get(b.slug) - partBySlug.get(a.slug);
  });

  await writeFile(OUTPUT_FILE, JSON.stringify({ posts, generatedAt: new Date().toISOString() }, null, 2));
  console.log(`agent-data.json: ${posts.length} posts written`);
  console.log(`agent-posts/: ${posts.length} individual post files written to ${POSTS_DIR}`);
  await writeWikiData(new Set(posts.map(p => p.slug)));
}

/**
 * Generates public/agent-wiki.json from wiki/posts/*.md and wiki/concepts/*.md, for the agent's
 * search_wiki and get_topic tools. No timestamp, so the file only changes when the wiki does.
 */
async function writeWikiData(visibleSlugs) {
  const WIKI = join(__dirname, '../wiki');
  const section = (content, name) => (content.split(new RegExp(`^## ${name}\\s*$`, 'm'))[1] ?? '').split(/^## /m)[0];
  const bullets = text => text.split('\n').filter(l => l.startsWith('- ')).map(l => l.slice(2).trim());
  // "- claim" lines followed by quote lines -> [{ text, quotes: [{ quote, slug? }] }]
  const claims = text => {
    const out = [];
    for (const line of text.split('\n')) {
      if (line.startsWith('- ')) out.push({ text: line.slice(2).trim(), quotes: [] });
      const q = line.match(/^\s*> "(.+?)"(?: — ([a-z0-9-]+))?\s*$/);
      if (q && out.length) out[out.length - 1].quotes.push(q[2] ? { quote: q[1], slug: q[2] } : { quote: q[1] });
    }
    return out;
  };
  const summaryOf = content => (content.match(/\*\*Summary\.\*\*\s*(.+)/) ?? [])[1]?.trim() ?? '';
  const read = async dir => {
    try { return (await readdir(join(WIKI, dir))).filter(f => f.endsWith('.md')).sort().map(f => join(WIKI, dir, f)); } catch { return []; }
  };

  const posts = [];
  for (const file of await read('posts')) {
    const { data, content } = matter(await readFile(file, 'utf-8'));
    if (!visibleSlugs.has(data.slug)) continue;
    posts.push({
      slug: data.slug, title: data.title, date: String(data.date).slice(0, 10), part: data.part ?? null,
      builds_on: data.builds_on ?? [], topics: data.topics ?? [], tools: data.tools ?? [], status: data.status ?? 'current',
      summary: summaryOf(content), claims: claims(section(content, 'Claims')).map(c => ({ text: c.text, quote: c.quotes[0]?.quote ?? '' })),
      outcome: section(content, 'Outcome').trim(), caveats: section(content, 'Caveats').trim(),
    });
  }
  const topics = [];
  for (const file of await read('concepts')) {
    const { data, content } = matter(await readFile(file, 'utf-8'));
    topics.push({
      slug: data.slug, title: data.title, description: data.description ?? '', posts: (data.posts ?? []).filter(x => visibleSlugs.has(x)),
      summary: summaryOf(content), idea: bullets(section(content, 'The idea')),
      claims: claims(section(content, 'Claims')).map(c => ({ text: c.text, quote: c.quotes[0]?.quote ?? '', slug: c.quotes[0]?.slug ?? '' })),
      differences: claims(section(content, 'Where the posts differ')).map(d => ({ text: d.text, quotes: d.quotes })),
      conclusion: (section(content, 'What I concluded') || '').trim(),
    });
  }
  await writeFile(join(__dirname, '../public/agent-wiki.json'), JSON.stringify({ posts, topics }));
  console.log(`agent-wiki.json: ${posts.length} post pages, ${topics.length} topic pages written`);
}

run().catch(err => { console.error(err); process.exit(1); });
