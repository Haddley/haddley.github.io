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
  for (const file of mdFiles) {
    const raw = await readFile(join(CONTENT_DIR, file), 'utf-8');
    const { data, content } = matter(raw);
    if (data.visible === false || data.hidden === true || data.hidden === 'true') continue;

    const slug = data.slug || file.replace(/\.md$/, '');

    posts.push({
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      categories: Array.isArray(data.categories) ? data.categories : [],
      tags: typeof data.tags === 'string' ? data.tags : '',
    });

    // Write individual post file with markdown body for the get_post_content tool
    const body = content.trim();
    const postData = {
      slug,
      title: data.title || '',
      date: data.date || '',
      categories: Array.isArray(data.categories) ? data.categories : [],
      tags: typeof data.tags === 'string' ? data.tags : '',
      content: body.length > CONTENT_CAP ? body.slice(0, CONTENT_CAP) + '\n…(truncated)' : body,
    };
    await writeFile(join(POSTS_DIR, `${slug}.json`), JSON.stringify(postData));
  }

  posts.sort((a, b) => (b.date > a.date ? 1 : -1));

  await writeFile(OUTPUT_FILE, JSON.stringify({ posts, generatedAt: new Date().toISOString() }, null, 2));
  console.log(`agent-data.json: ${posts.length} posts written`);
  console.log(`agent-posts/: ${posts.length} individual post files written to ${POSTS_DIR}`);
}

run().catch(err => { console.error(err); process.exit(1); });
