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

/** Topic pages that share at least `minShared` posts with a category, most overlap first. */
export function getTopicsForCategory(postSlugs: string[], minShared = 2, limit = 4): (TopicRef & { shared: number })[] {
  const inCategory = new Set(postSlugs);
  return loadTopics()
    .map(t => ({ slug: t.slug, title: t.title, postCount: t.posts.length, shared: t.posts.filter(p => inCategory.has(p)).length }))
    .filter(t => t.shared >= minShared)
    .sort((a, b) => b.shared - a.shared || a.title.localeCompare(b.title))
    .slice(0, limit);
}

/** The posts a topic page draws on. */
export function getTopicPosts(slug: string): string[] {
  return loadTopics().find(t => t.slug === slug)?.posts ?? [];
}
