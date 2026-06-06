// @vitest-environment node
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { categories } from '../../src/lib/categories';

const CONTENT_DIR = path.join(__dirname, '../../content');
const VALID_CATEGORY_NAMES = new Set(categories.map(c => c.name));

interface PostFrontmatter {
  title?: unknown;
  date?: unknown;
  slug?: unknown;
  categories?: unknown;
  tags?: unknown;
  visible?: unknown;
  hidden?: unknown;
}

function loadPosts(): Array<{ file: string; data: PostFrontmatter }> {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.md') && !f.startsWith('---DRAFT'))
    .map(file => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
      const { data } = matter(raw);
      return { file, data: data as PostFrontmatter };
    });
}

const posts = loadPosts();

describe('frontmatter — required fields', () => {
  it.each(posts)('$file has a title', ({ data }) => {
    expect(typeof data.title).toBe('string');
    expect((data.title as string).trim().length).toBeGreaterThan(0);
  });

  it.each(posts)('$file has a valid date (YYYY-MM-DD)', ({ data }) => {
    expect(data.date).toBeDefined();
    const d = String(data.date).trim();
    expect(d).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(Number.isNaN(Date.parse(d))).toBe(false);
  });
});

describe('frontmatter — categories', () => {
  it.each(posts)('$file has at least one category', ({ data }) => {
    expect(Array.isArray(data.categories)).toBe(true);
    expect((data.categories as unknown[]).length).toBeGreaterThan(0);
  });

  it.each(posts)('$file uses only valid category names', ({ data }) => {
    const cats = data.categories as string[];
    const invalid = cats.filter(c => !VALID_CATEGORY_NAMES.has(c));
    expect(invalid).toEqual([]);
  });
});

describe('frontmatter — tags', () => {
  it.each(posts)('$file tags field is a comma-separated string', ({ data }) => {
    expect(typeof data.tags).toBe('string');
  });

  it.each(posts)('$file has 3–6 tags', ({ data }) => {
    const tags = (data.tags as string).split(',').map(t => t.trim()).filter(Boolean);
    expect(tags.length).toBeGreaterThanOrEqual(3);
    expect(tags.length).toBeLessThanOrEqual(6);
  });

  it.each(posts)('$file tags are lowercase and hyphenated', ({ data }) => {
    const tags = (data.tags as string).split(',').map(t => t.trim()).filter(Boolean);
    const invalid = tags.filter(t => t !== t.toLowerCase() || /\s/.test(t));
    expect(invalid).toEqual([]);
  });

  it.each(posts)('$file tags do not duplicate a category name', ({ data }) => {
    const tags = (data.tags as string).split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
    const catNames = (data.categories as string[]).map(c => c.toLowerCase());
    const duplicates = tags.filter(t => catNames.includes(t));
    expect(duplicates).toEqual([]);
  });
});

describe('frontmatter — slugs', () => {
  it('no duplicate slugs across all posts', () => {
    const slugs = posts.map(({ file, data }) =>
      (data.slug as string | undefined) ?? path.basename(file, '.md')
    );
    const seen = new Set<string>();
    const dupes: string[] = [];
    for (const slug of slugs) {
      if (seen.has(slug)) dupes.push(slug);
      seen.add(slug);
    }
    expect(dupes).toEqual([]);
  });
});
