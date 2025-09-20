import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost } from './posts';

const postsDirectory = path.join(process.cwd(), 'content');

export async function getMarkdownPost(id: string) {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();
    
    // Combine the data with the id, contentHtml and raw content
    return {
      id,
      contentHtml,
      content: matterResult.content, // Raw markdown content
      ...matterResult.data
    };
  } catch (error) {
    console.error(`Error reading markdown file for ${id}:`, error);
    return null;
  }
}

export function getAllMarkdownPostIds(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(name => name.endsWith('.md'))
      .map(name => name.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading content directory:', error);
    return [];
  }
}

export async function getAllMarkdownPosts(): Promise<BlogPost[]> {
  const postIds = getAllMarkdownPostIds();
  const posts: BlogPost[] = [];
  
  for (const id of postIds) {
    try {
      const fullPath = path.join(postsDirectory, `${id}.md`);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      
      posts.push({
        slug: id,
        title: matterResult.data.title || '',
        description: matterResult.data.description || '',
        date: matterResult.data.date || '',
        category: matterResult.data.category || '',
        image: matterResult.data.image,
        tags: matterResult.data.tags || []
      });
    } catch (error) {
      console.error(`Error processing ${id}:`, error);
    }
  }
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}