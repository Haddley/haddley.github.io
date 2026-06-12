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

export const CATEGORIES = [
  '.NET', 'Python', 'Java', 'SQL', 'JavaScript', 'React', 'Angular', 'TypeScript',
  'PHP', 'Azure', 'AWS', 'AI', 'Power Platform', 'Microsoft Dynamics', 'Business Central',
  'Microsoft 365', 'DevOps', 'Mobile', 'IOT', 'Maps', '3D printing', 'macOS', 'Firebase', '3D',
];

export function searchPosts(query: string, posts: PostMeta[]): PostMeta[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  return posts
    .filter(p => {
      const haystack = [p.title, p.description, p.tags, ...p.categories].join(' ').toLowerCase();
      return terms.every(term => haystack.includes(term));
    })
    .slice(0, 10);
}

export function getCategoryUrl(name: string): string {
  return `/posts/category/${categoryNameToSlug(name)}/`;
}

export function getPostsByCategory(category: string, posts: PostMeta[]): PostMeta[] {
  const c = category.toLowerCase();
  return posts
    .filter(p => p.categories.some(cat => cat.toLowerCase() === c))
    .slice(0, 15);
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
      description: 'Get all posts in a specific category. Returns up to 15 posts, each with a relative url field ready to use as a Markdown link.',
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
      description: 'Fetch the full markdown content of a specific blog post by its slug. Use this when the user asks about the details or content of a particular post.',
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
      description: 'Search the web for current information, documentation, or technical context beyond what is on the blog. Use this when the user asks about topics not covered by blog posts, or needs up-to-date information.',
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
