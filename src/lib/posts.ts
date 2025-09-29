import { getAllMarkdownPosts } from "./markdown";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  categories?: string[]; // Automated multi-category classification
  tags: string[];
  image: string;
  hidden?: boolean;
}

// Avoid top-level await so bundlers won't try to include server-only fs
// Use a lazy async loader and a small in-memory cache
let postsCache: BlogPost[] | null = null;

async function fetchAllPosts(): Promise<BlogPost[]> {
  if (postsCache) return postsCache;
  const mdPosts = await getAllMarkdownPosts();
  const mapped: BlogPost[] = mdPosts.map(post => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    categories: post.categories,
    tags: post.tags,
    image: post.image,
    hidden: post.hidden
  }));
  postsCache = mapped;
  return mapped;
}

export function clearPostsCache(): void {
  postsCache = null;
}

// Static blogPosts array removed; now using dynamic loading from markdown frontmatter

export async function getBlogPosts(): Promise<BlogPost[]> {
  return await fetchAllPosts();
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return await fetchAllPosts();
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await fetchAllPosts();
  return posts.find(post => post.slug === slug);
}

export async function getPostById(slug: string): Promise<BlogPost | undefined> {
  const posts = await fetchAllPosts();
  return posts.find(post => post.slug === slug);
}

export async function getVisibleBlogPosts(): Promise<BlogPost[]> {
  const posts = await fetchAllPosts();
  return posts.filter(post => !post.hidden);
}

// Functions for automated multi-category classification
export async function getAutomatedCategories(): Promise<string[]> {
  const posts = await fetchAllPosts();
  const allCategories = posts
    .filter(post => post.categories && post.categories.length > 0)
    .flatMap(post => post.categories || []);
  const categories = [...new Set(allCategories)];
  return categories.sort();
}

export async function getVisibleAutomatedCategories(): Promise<string[]> {
  const visiblePosts = await getVisibleBlogPosts();
  const allCategories = visiblePosts
    .filter(post => post.categories && post.categories.length > 0)
    .flatMap(post => post.categories || []);
  const categories = [...new Set(allCategories)];
  return categories.sort();
}

export async function getBlogPostsByAutomatedCategory(category: string): Promise<BlogPost[]> {
  const posts = await fetchAllPosts();
  return posts.filter(post => 
    post.categories && post.categories.includes(category)
  );
}

export async function getVisibleBlogPostsByAutomatedCategory(category: string): Promise<BlogPost[]> {
  const posts = await fetchAllPosts();
  return posts.filter(post => 
    post.categories && 
    post.categories.includes(category) && 
    !post.hidden
  );
}

// Helper function to get all categories for a post
export function getAllCategoriesForPost(post: BlogPost): string[] {
  return post.categories || [];
}

// Function to search posts by any category (automated only)
export async function getBlogPostsByAnyCategory(category: string): Promise<BlogPost[]> {
  const posts = await fetchAllPosts();
  return posts.filter(post => 
    post.categories && post.categories.includes(category)
  );
}

export async function getVisibleBlogPostsByAnyCategory(category: string): Promise<BlogPost[]> {
  const posts = await fetchAllPosts();
  return posts.filter(post => 
    !post.hidden && 
    post.categories && 
    post.categories.includes(category)
  );
}
