import fs from 'fs';
import path from 'path';

let counts: Map<string, number> | null = null;

/** How many visible posts are in each category, read once from the generated agent-data.json. */
export function getCategoryCount(category: string): number {
  if (!counts) {
    counts = new Map();
    try {
      const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'agent-data.json'), 'utf8')) as { posts: { categories: string[] }[] };
      for (const post of data.posts) {
        for (const c of new Set(post.categories)) counts.set(c, (counts.get(c) ?? 0) + 1);
      }
    } catch {
      // No data file yet: the tooltip falls back to the wording without a count.
    }
  }
  return counts.get(category) ?? 0;
}
