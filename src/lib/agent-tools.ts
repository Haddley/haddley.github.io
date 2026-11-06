import { categoryNameToSlug } from './categories';

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  categories: string[];
  tags: string;
}

export interface AgentData {
  posts: PostMeta[];
  generatedAt: string;
}

export interface WikiPost {
  slug: string;
  title: string;
  date: string;
  part: number | null;
  builds_on: string[];
  topics: string[];
  tools: string[];
  status: string;
  summary: string;
  claims: { text: string; quote: string }[];
  outcome: string;
  caveats: string;
}

export interface WikiTopic {
  slug: string;
  title: string;
  description: string;
  posts: string[];
  summary: string;
  idea: string[];
  claims: { text: string; quote: string; slug: string }[];
  differences: { text: string; quotes: { quote: string; slug: string }[] }[];
  conclusion: string;
}

export interface WikiData {
  posts: WikiPost[];
  topics: WikiTopic[];
}

export const CATEGORIES = [
  '.NET', 'Python', 'Java', 'SQL', 'JavaScript', 'React', 'Angular', 'TypeScript',
  'PHP', 'Azure', 'AWS', 'AI', 'Power Platform', 'Microsoft Dynamics', 'Business Central',
  'Microsoft 365', 'DevOps', 'Mobile', 'IOT', 'Maps', '3D printing', 'macOS', 'Firebase', '3D',
];

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'in', 'on', 'of', 'to', 'for', 'with', 'about',
  'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did',
  'any', 'all', 'me', 'my', 'i', 'can', 'could', 'will', 'would', 'should',
  'related', 'posts', 'blog', 'find', 'show', 'list', 'get', 'what', 'which',
]);

export function searchPosts(query: string, posts: PostMeta[]): PostMeta[] {
  const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 0 && !STOP_WORDS.has(t));
  if (terms.length === 0) return [];
  return posts
    .filter(p => {
      const haystack = [p.title, p.description, p.tags, ...p.categories].join(' ').toLowerCase();
      return terms.every(term => new RegExp(`\\b${term}\\b`).test(haystack));
    })
    .slice(0, 10);
}

const tokens = (text: string) => text.toLowerCase().split(/[^a-z0-9.+#]+/).filter(t => t.length > 1 && !STOP_WORDS.has(t));

/**
 * Search the wiki: post pages by title, topics, tools, summary and claims, and topic pages by title and
 * summary. Scores by how many query words match (title and topics count more); returns the best few,
 * each with the claims that matched and the quote behind them.
 */
export function searchWiki(query: string, wiki: WikiData) {
  const terms = tokens(query);
  if (!terms.length) return { topics: [], posts: [] };
  const score = (weighted: [string, number][], terms: string[]) =>
    terms.reduce((n, t) => n + weighted.reduce((m, [text, w]) => m + (text.toLowerCase().includes(t) ? w : 0), 0), 0);

  const topics = wiki.topics
    .map(t => ({ t, s: score([[t.title, 4], [t.description, 2], [t.summary, 1], [t.idea.join(' '), 1]], terms) }))
    .filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 3)
    .map(({ t }) => ({ topic: t.title, url: `/topics/${t.slug}/`, summary: t.summary, posts: t.posts.length }));

  const posts = wiki.posts
    .map(p => ({ p, s: score([[p.title, 4], [p.topics.join(' '), 3], [p.tools.join(' '), 3], [p.summary, 2], [p.claims.map(c => c.text).join(' '), 1]], terms) }))
    .filter(x => x.s > 0).sort((a, b) => b.s - a.s || b.p.date.localeCompare(a.p.date)).slice(0, 6)
    .map(({ p }) => ({
      slug: p.slug, url: `/posts/${p.slug}/`, title: p.title, date: p.date, status: p.status, summary: p.summary,
      claims: p.claims.filter(c => terms.some(t => (c.text + ' ' + c.quote).toLowerCase().includes(t))).slice(0, 2),
      builds_on: p.builds_on,
    }));
  return { topics, posts };
}

export function getTopic(nameOrSlug: string, wiki: WikiData) {
  const q = nameOrSlug.toLowerCase().replace(/^\/topics\//, '').replace(/\/$/, '').trim();
  const topic = wiki.topics.find(t => t.slug === q || t.title.toLowerCase() === q)
    ?? wiki.topics.find(t => t.slug.includes(q) || t.title.toLowerCase().includes(q));
  if (!topic) return null;
  const byslug = new Map(wiki.posts.map(p => [p.slug, p]));
  return {
    topic: topic.title, url: `/topics/${topic.slug}/`, summary: topic.summary, idea: topic.idea,
    claims: topic.claims.slice(0, 8).map(c => ({ claim: c.text, quote: c.quote, post: byslug.get(c.slug)?.title ?? c.slug, url: `/posts/${c.slug}/` })),
    differences: topic.differences.map(d => d.text), conclusion: topic.conclusion,
    posts: topic.posts.map(sl => ({ title: byslug.get(sl)?.title ?? sl, url: `/posts/${sl}/` })),
  };
}

/** Every topic page, with a one-line summary, for "what topics do you have?". */
export function listTopics(wiki: WikiData) {
  return wiki.topics
    .map(t => ({ topic: t.title, url: `/topics/${t.slug}/`, summary: t.summary.slice(0, 160), posts: t.posts.length }))
    .sort((a, b) => a.topic.localeCompare(b.topic));
}

export function getCategoryUrl(name: string): string {
  return `/categories/${categoryNameToSlug(name)}/`;
}

export function getPostsByCategory(category: string, posts: PostMeta[]): PostMeta[] {
  const c = category.toLowerCase();
  return posts
    .filter(p => p.categories.some(cat => cat.toLowerCase() === c));
}

export const TOOL_DEFINITIONS = [
  {
    type: 'function' as const,
    function: {
      name: 'search_posts',
      description: 'Search blog posts by keywords in title, description, or tags. Returns up to 10 matching posts, each with a relative url field ready to use as a Markdown link.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Keywords to search for' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_posts_by_category',
      description: 'Get all posts in a specific category, each with a relative url field ready to use as a Markdown link.',
      parameters: {
        type: 'object',
        properties: {
          category: { type: 'string', description: 'Category name, e.g. "Azure", "AI", "Python"' },
        },
        required: ['category'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'list_categories',
      description: 'List all blog categories with their post counts and relative urls, sorted by count. Each result has category, url, and count fields.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_post_content',
      description: 'Fetch the full markdown content of a specific blog post by its slug. Use ONLY when the user explicitly asks what a post contains or asks for a summary. Never call this to list or browse posts.',
      parameters: {
        type: 'object',
        properties: {
          slug: { type: 'string', description: 'The post slug (from search results or the current page URL)' },
        },
        required: ['slug'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'search_wiki',
      description: 'Search the blog wiki: short checked summaries of each post, with claims and quotes, plus topic pages that cover an idea across several posts. Use for "what did you conclude about X", "how does X work in your posts", or to find the best posts and topic pages on a subject. Returns topic pages and posts, each with a url ready to use as a Markdown link.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Keywords or a short question' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'list_topics',
      description: 'List every topic page on the blog (not categories), each with a one-line summary, its post count and a relative url ready to use as a Markdown link. Use when the user asks what topics exist or says "topics?".',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_topic',
      description: 'Get one topic page by name or slug, for example "ollama" or "rules-first-design": the summary, quoted claims with their posts, where the posts differ, and the conclusion. Use after search_wiki returns a topic, or when the user names a topic.',
      parameters: {
        type: 'object',
        properties: {
          topic: { type: 'string', description: 'Topic name or slug' },
        },
        required: ['topic'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'navigate_to_post',
      description: 'Navigate the browser to a specific blog post.',
      parameters: {
        type: 'object',
        properties: {
          slug: { type: 'string', description: 'The post slug (URL path segment)' },
        },
        required: ['slug'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'web_search',
      description: 'Search the web for information not covered by the blog. Use only as a last resort — after checking blog posts first — or when the user explicitly needs up-to-date external information.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'The search query' },
        },
        required: ['query'],
      },
    },
  },
];
