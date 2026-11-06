import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface TopicRef {
  slug: string;
  title: string;
  postCount: number;   // how many posts the topic page draws on
}

const TOPICS_DIR = path.join(process.cwd(), 'wiki', 'concepts');
let cache: { slug: string; title: string; description: string; posts: string[] }[] | null = null;

function loadTopics() {
  if (cache) return cache;
  cache = [];
  if (!fs.existsSync(TOPICS_DIR)) return cache;
  for (const file of fs.readdirSync(TOPICS_DIR).filter(f => f.endsWith('.md'))) {
    const { data } = matter(fs.readFileSync(path.join(TOPICS_DIR, file), 'utf8'));
    cache.push({
      slug: file.replace(/\.md$/, ''),
      title: String(data.title ?? file.replace(/\.md$/, '')),
      description: String(data.description ?? ''),
      posts: Array.isArray(data.posts) ? data.posts.map(String) : [],
    });
  }
  return cache;
}

/** The topic pages (wiki/concepts/) that draw on this post, in a stable order. */
export function getTopicsForPost(slug: string): TopicRef[] {
  return loadTopics()
    .filter(t => t.posts.includes(slug))
    .map(({ slug, title, posts }) => ({ slug, title, postCount: posts.length }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export interface TopicSummary {
  slug: string;
  title: string;
  posts: string[];
}

/** Every topic page with the posts it draws on, for the search box on the posts page. */
export function getAllTopics(): TopicSummary[] {
  return loadTopics().map(({ slug, title, posts }) => ({ slug, title, posts }));
}
