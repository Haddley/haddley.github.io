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

/** Abbreviations people type, and the words they stand for. A word is satisfied by itself or by all of its expansion. */
export const ALIASES: Record<string, string[]> = {
  bc: ['business', 'central'],
  mcp: ['model', 'context', 'protocol'],
  llm: ['large', 'language', 'model'],
  rag: ['retrieval', 'augmented', 'generation'],
  d365: ['dynamics', '365'],
  k8s: ['kubernetes'],
  js: ['javascript'],
  ts: ['typescript'],
  ml: ['machine', 'learning'],
};

/** The words of a search term: lower case, without punctuation or a possessive 's, so "Business Central's" gives business, central. */
export function tokenize(term: string): string[] {
  return term
    .toLowerCase()
    .replace(/['\u2019]s\b/g, '')
    .split(/[^a-z0-9+#.]+/)
    .map(w => w.replace(/^\.+|\.+$/g, ''))
    .filter(Boolean);
}

/** Topics whose name or slug contains the term, or whose name is made of words that are all in the term. */
export function matchTopics<T extends SearchTopic>(topics: T[], term: string): T[] {
  const q = term.trim().toLowerCase();
  if (!q) return [];
  const words = new Set(tokenize(term));
  return topics.filter(t => {
    const nameWords = tokenize(t.title);
    return t.title.toLowerCase().includes(q) || t.slug.includes(q) || (nameWords.length > 0 && nameWords.every(w => words.has(w)));
  });
}

/** Categories whose name or slug contains the term, that have it as an alias, or whose name is made of words that are all in the term (so "business central mcp" finds Business Central), with their post counts. */
export function matchCategories<C extends SearchCategory>(categories: C[], posts: SearchPost[], term: string): (C & { count: number })[] {
  const q = term.trim().toLowerCase();
  if (!q) return [];
  const words = new Set(tokenize(term));
  return categories
    .filter(c => {
      const nameWords = tokenize(c.name);
      return c.name.toLowerCase().includes(q) || c.slug.includes(q) || c.aliases?.some(a => a.toLowerCase() === q) ||
        (nameWords.length > 0 && nameWords.every(w => words.has(w)));
    })
    .map(c => ({ ...c, count: posts.filter(p => p.categories?.includes(c.name)).length }))
    .filter(c => c.count > 0);
}

/** How much a match in each field counts towards ranking. */
const WEIGHT = { title: 5, tags: 3, categories: 3, topic: 2, description: 2 } as const;

/** Where one word is found in a post, as the best weight (0 when it is not found at all). */
function bestWeight(post: SearchPost, word: string, inTopic: boolean): number {
  const has = (text: string) => text.toLowerCase().includes(word);
  let best = 0;
  if (has(post.title)) best = Math.max(best, WEIGHT.title);
  if (post.tags.some(has)) best = Math.max(best, WEIGHT.tags);
  if (post.categories?.some(has)) best = Math.max(best, WEIGHT.categories);
  if (inTopic) best = Math.max(best, WEIGHT.topic);
  if (has(post.description)) best = Math.max(best, WEIGHT.description);
  return best;
}

/** A word counts when it is found, or when every word of its abbreviation's meaning is found. */
function wordScore(post: SearchPost, word: string, inTopic: boolean): number {
  const direct = bestWeight(post, word, inTopic);
  const expansion = ALIASES[word];
  if (!expansion) return direct;
  const parts = expansion.map(w => bestWeight(post, w, inTopic));
  const viaAlias = parts.every(w => w > 0) ? Math.min(...parts) : 0;
  return Math.max(direct, viaAlias);
}

export interface PostSearchResult<P> {
  /** Posts in which every word of the term is found, best first. */
  exact: P[];
  /** When nothing matches every word: posts that match at least half of the words, most words and best matches first. */
  closest: P[];
}

/**
 * Searches by word, not by the whole phrase. Every word must be found somewhere in a post (title, tags, categories, description,
 * a topic it belongs to, or the extra slugs, such as wiki matches), so "business central mcp" finds a post in the Business
 * Central category that is tagged mcp. Results are ranked: a word in the title counts more than one in a tag or category, and
 * those more than one in the description. Ties keep the original order. A phrase found whole in the title or description
 * ranks higher still.
 */
export function searchPosts<P extends SearchPost>(posts: P[], term: string, matchedTopics: SearchTopic[], extraSlugs: Iterable<string> = []): PostSearchResult<P> {
  const words = tokenize(term);
  if (words.length === 0) return { exact: term.trim() ? [] : posts, closest: [] };
  const extra = new Set(extraSlugs);
  // A post in a matched topic satisfies the words that the topic's own name contains, and no others.
  const topicHas = (post: SearchPost, w: string) =>
    matchedTopics.some(t => t.posts.includes(post.slug) && (t.title.toLowerCase().includes(w) || t.slug.includes(w)));
  const phrase = term.trim().toLowerCase();
  type Hit = { post: P; index: number; found: number; score: number };
  const hits: Hit[] = posts.map((post, index) => {
    let found = 0, score = 0;
    for (const w of words) {
      let wScore = wordScore(post, w, topicHas(post, w));
      if (wScore === 0 && extra.has(post.slug)) wScore = 1;
      if (wScore > 0) { found++; score += wScore; }
    }
    if (phrase.includes(' ')) {
      if (post.title.toLowerCase().includes(phrase)) score += 6;
      else if (post.description.toLowerCase().includes(phrase)) score += 3;
    }
    return { post, index, found, score };
  });
  const byRank = (a: Hit, b: Hit) => b.found - a.found || b.score - a.score || a.index - b.index;
  const exact = hits.filter(h => h.found === words.length).sort(byRank).map(h => h.post);
  if (exact.length > 0) return { exact, closest: [] };
  const half = Math.ceil(words.length / 2);
  const closest = hits.filter(h => h.found >= half).sort(byRank).slice(0, 12).map(h => h.post);
  return { exact, closest };
}

/** Posts that match every word of the term, best first. See searchPosts. */
export function matchPosts<P extends SearchPost>(posts: P[], term: string, matchedTopics: SearchTopic[], extraSlugs: Iterable<string> = []): P[] {
  return searchPosts(posts, term, matchedTopics, extraSlugs).exact;
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
