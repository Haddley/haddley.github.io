import fs from 'fs';
import path from 'path';

let counts: Map<string, number> | null = null;
let postCategories: Map<string, string[]> | null = null;

/** How many visible posts are in each category, read once from the generated agent-data.json. */
export function getCategoryCount(category: string): number {
  load();
  return counts!.get(category) ?? 0;
}

/** The categories of one post, from the generated agent-data.json. */
export function getPostCategories(slug: string): string[] {
  load();
  return postCategories!.get(slug) ?? [];
}

function load() {
  if (counts && postCategories) return;
  counts = new Map();
  postCategories = new Map();
  try {
    const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'agent-data.json'), 'utf8')) as { posts: { slug: string; categories: string[] }[] };
    for (const post of data.posts) {
      postCategories.set(post.slug, [...new Set(post.categories)]);
      for (const c of new Set(post.categories)) counts.set(c, (counts.get(c) ?? 0) + 1);
    }
  } catch {
    // No data file yet: tooltips fall back to wording without a count and no chips are shown.
  }
}
