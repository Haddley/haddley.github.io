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
  part?: number;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const part: number | undefined = typeof data.part === 'number' ? data.part : (data.part ? parseInt(data.part, 10) : undefined);
    const baseTitle = data.title || '';

    return {
      slug,
      title: part ? `${baseTitle} (Part ${part})` : baseTitle,
      date: data.date || '',
      description: data.description || '',
      content,
      image: data.image,
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ? data.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t) : []),
      categories: Array.isArray(data.categories) ? data.categories : [],
      visible: data.visible !== false && data.hidden !== true && data.hidden !== 'true',
      part,
    };
  } catch (err) {
    console.error('Error reading post:', err);
    return null;
  }
}

// Strips the " (Part N)" suffix that getBlogPostBySlug appends, recovering the shared series name.
// Posts in the same series must share this base title exactly.
function seriesNameOf(post: BlogPost): string | null {
  if (!post.part) return null;
  return post.title.replace(new RegExp(`\\s*\\(Part ${post.part}\\)$`), '');
}

// Given a post, finds the series name and the previous/next posts in that series (by part number).
export async function getSeriesNavigation(post: BlogPost): Promise<{ name: string | null; previous: BlogPost | null; next: BlogPost | null }> {
  const name = seriesNameOf(post);
  if (!name) {
    return { name: null, previous: null, next: null };
  }

  const allPosts = await getVisibleBlogPosts();
  const seriesPosts = allPosts
    .filter(p => seriesNameOf(p) === name)
    .sort((a, b) => (a.part as number) - (b.part as number));

  const index = seriesPosts.findIndex(p => p.slug === post.slug);
  if (index === -1) {
    return { name, previous: null, next: null };
  }

  return {
    name,
    previous: index > 0 ? seriesPosts[index - 1] : null,
    next: index < seriesPosts.length - 1 ? seriesPosts[index + 1] : null,
  };
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
