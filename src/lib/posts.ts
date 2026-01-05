import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  image?: string;
  tags: string[];
  categories?: string[];
  visible?: boolean;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      description: data.description || '',
      content,
      image: data.image,
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ? data.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t) : []),
      categories: Array.isArray(data.categories) ? data.categories : [],
      visible: data.visible !== false && data.hidden !== true && data.hidden !== 'true'
    };
  } catch (err) {
    console.error('Error reading post:', err);
    return null;
  }
}

// Alias for compatibility
export const getPostById = getBlogPostBySlug;

export async function getVisibleBlogPosts(): Promise<BlogPost[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(async fileName => {
        const slug = fileName.replace(/\.md$/, '');
        return getBlogPostBySlug(slug);
      })
  );

  const visiblePosts = allPostsData
    .filter((post): post is BlogPost => post !== null && post.visible !== false)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return visiblePosts;
}

// Alias for compatibility
export const getAllPosts = getVisibleBlogPosts;

export async function getVisibleBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getVisibleBlogPosts();
  return allPosts.filter(post => 
    post.categories?.includes(category)
  );
}

// Keep old name for backward compatibility
export const getVisibleBlogPostsByAutomatedCategory = getVisibleBlogPostsByCategory;
export const getVisibleBlogPostsByAnyCategory = getVisibleBlogPostsByCategory;

export async function getAllCategories(): Promise<string[]> {
  const allPosts = await getVisibleBlogPosts();
  const categoriesSet = new Set<string>();
  
  allPosts.forEach(post => {
    post.categories?.forEach(cat => categoriesSet.add(cat));
  });
  
  return Array.from(categoriesSet).sort();
}

// Keep old name for backward compatibility
export const getVisibleAutomatedCategories = getAllCategories;

export async function generateStaticParams() {
  const posts = await getVisibleBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
