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

/** Posts matching by text, belonging to a topic that matched, or named in `extraSlugs` (for example wiki matches). */
export function matchPosts<P extends SearchPost>(posts: P[], term: string, matchedTopics: SearchTopic[], extraSlugs: Iterable<string> = []): P[] {
  const q = term.trim().toLowerCase();
  const fromTopics = new Set([...matchedTopics.flatMap(t => t.posts), ...extraSlugs]);
  return posts.filter(post =>
    post.title.toLowerCase().includes(q) ||
    post.description.toLowerCase().includes(q) ||
    post.tags.some(tag => tag.toLowerCase().includes(q)) ||
    post.categories?.some(cat => cat.toLowerCase().includes(q)) ||
    fromTopics.has(post.slug),
  );
}

export interface WikiPostText {
  slug: string;
  summary: string;
  claims: { text: string }[];
}

/**
 * Posts whose wiki summary or claims mention the term, each with the sentence that matched, so a result
 * can say why it appeared. Terms shorter than `minLength` are ignored: they would match nearly everything.
 */
export function matchWiki(wikiPosts: WikiPostText[], term: string, minLength = 3): Map<string, string> {
  const q = term.trim().toLowerCase();
  const found = new Map<string, string>();
  if (q.length < minLength) return found;
  for (const post of wikiPosts) {
    const claim = post.claims.find(c => c.text.toLowerCase().includes(q));
    if (claim) { found.set(post.slug, claim.text); continue; }
    const sentence = post.summary.split(/(?<=[.!?])\s+/).find(x => x.toLowerCase().includes(q));
    if (sentence) found.set(post.slug, sentence);
  }
  return found;
}
