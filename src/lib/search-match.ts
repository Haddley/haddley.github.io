export interface SearchPost {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  categories?: string[];
}

export interface SearchTopic {
  slug: string;
  title: string;
  posts: string[];
}

export interface SearchCategory {
  slug: string;
  name: string;
  aliases?: string[];
}

/** Topics whose name or slug contains the term. */
export function matchTopics<T extends SearchTopic>(topics: T[], term: string): T[] {
  const q = term.trim().toLowerCase();
  if (!q) return [];
  return topics.filter(t => t.title.toLowerCase().includes(q) || t.slug.includes(q));
}

/** Categories whose name or slug contains the term, or that have it as an alias, with their post counts. */
export function matchCategories<C extends SearchCategory>(categories: C[], posts: SearchPost[], term: string): (C & { count: number })[] {
  const q = term.trim().toLowerCase();
  if (!q) return [];
  return categories
    .filter(c => c.name.toLowerCase().includes(q) || c.slug.includes(q) || c.aliases?.some(a => a.toLowerCase() === q))
    .map(c => ({ ...c, count: posts.filter(p => p.categories?.includes(c.name)).length }))
    .filter(c => c.count > 0);
}

/** Posts matching by text, or belonging to a topic that matched. */
export function matchPosts<P extends SearchPost>(posts: P[], term: string, matchedTopics: SearchTopic[]): P[] {
  const q = term.trim().toLowerCase();
  const fromTopics = new Set(matchedTopics.flatMap(t => t.posts));
  return posts.filter(post =>
    post.title.toLowerCase().includes(q) ||
    post.description.toLowerCase().includes(q) ||
    post.tags.some(tag => tag.toLowerCase().includes(q)) ||
    post.categories?.some(cat => cat.toLowerCase().includes(q)) ||
    fromTopics.has(post.slug),
  );
}
