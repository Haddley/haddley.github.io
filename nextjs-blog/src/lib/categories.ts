import { BlogPost, blogPosts } from './posts';

// Category Configuration
export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  aliases?: string[]; // Add aliases for alternative URLs
}

export const categories: Category[] = [
  {
    slug: 'ai-machine-learning',
    name: 'AI & Machine Learning',
    description: 'AI models, machine learning, ChatGPT, and intelligent applications',
    icon: '🤖',
    color: 'bg-purple-100 text-purple-800',
    aliases: ['aiml', 'ai', 'ml', 'machine-learning']
  },
  {
    slug: 'microsoft-365',
    name: 'Microsoft 365',
    description: 'Power Platform, SharePoint, Business Central, and Office 365',
    icon: '🏢',
    color: 'bg-blue-100 text-blue-800',
    aliases: ['m365', 'microsoft', 'office365', 'sharepoint', 'powerplatform']
  },
  {
    slug: 'web-development',
    name: 'Web Development',
    description: 'React, Angular, TypeScript, Next.js, and modern web technologies',
    icon: '🌐',
    color: 'bg-green-100 text-green-800',
    aliases: ['web', 'frontend', 'react', 'angular', 'javascript', 'typescript']
  },
  {
    slug: 'cloud-devops',
    name: 'Cloud & DevOps',
    description: 'Azure, AWS, Docker, Kubernetes, and cloud infrastructure',
    icon: '☁️',
    color: 'bg-sky-100 text-sky-800',
    aliases: ['cloud', 'devops', 'azure', 'aws', 'docker', 'kubernetes']
  },
  {
    slug: 'mobile-iot',
    name: 'Mobile & IoT',
    description: 'iOS development, Raspberry Pi, and Internet of Things projects',
    icon: '📱',
    color: 'bg-orange-100 text-orange-800',
    aliases: ['mobile', 'iot', 'ios', 'raspberry-pi', 'raspberrypi']
  },
  {
    slug: 'dotnet-development',
    name: '.NET Development',
    description: 'ASP.NET, Blazor, C#, VB.NET, and Microsoft development stack',
    icon: '⚡',
    color: 'bg-indigo-100 text-indigo-800',
    aliases: ['dotnet', 'net', 'csharp', 'aspnet', 'blazor', 'vb.net', 'vbnet']
  },
  {
    slug: 'data-analytics',
    name: 'Data & Analytics',
    description: 'Databases, SQL, data science, and analytics solutions',
    icon: '📊',
    color: 'bg-yellow-100 text-yellow-800',
    aliases: ['data', 'analytics', 'sql', 'database', 'datascience']
  },
  {
    slug: 'development-tools',
    name: 'Development Tools',
    description: 'IDEs, frameworks, build tools, and developer productivity',
    icon: '🛠️',
    color: 'bg-gray-100 text-gray-800',
    aliases: ['tools', 'ide', 'vscode', 'frameworks']
  },
  {
    slug: 'java',
    name: 'Java',
    description: 'Java development, Spring Boot, enterprise applications, and JVM technologies',
    icon: '☕',
    color: 'bg-orange-100 text-orange-800',
    aliases: ['spring', 'springboot', 'spring-boot', 'jvm', 'maven', 'gradle']
  },
  {
    slug: 'development',
    name: 'General Development',
    description: 'Programming concepts, tutorials, and general development topics',
    icon: '💻',
    color: 'bg-slate-100 text-slate-800',
    aliases: ['dev', 'programming', 'coding', 'general']
  }
];

// Category Helper Functions
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(category => 
    category.slug === slug || 
    (category.aliases && category.aliases.includes(slug))
  );
}

export function getCategoryByName(name: string): Category | undefined {
  return categories.find(cat => cat.name === name);
}

export function categoryNameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
}

export function categorySlugToName(slug: string): string {
  const category = getCategoryBySlug(slug);
  return category ? category.name : slug;
}

// Enhanced Post Functions with Categories
export function getPostsByCategory(categoryName: string): BlogPost[] {
  return blogPosts.filter(post => post.category === categoryName);
}

export function getCategoryStats() {
  const stats = categories.map(category => {
    const posts = getPostsByCategory(category.name);
    const latestPost = posts.length > 0 ? posts[0] : null;
    
    return {
      ...category,
      postCount: posts.length,
      latestPost: latestPost ? {
        title: latestPost.title,
        date: latestPost.date,
        slug: latestPost.slug
      } : null
    };
  }).filter(cat => cat.postCount > 0);
  
  return stats.sort((a, b) => b.postCount - a.postCount);
}

export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(post => 
      post.category === currentPost.category && 
      post.slug !== currentPost.slug
    )
    .slice(0, limit);
}

export function getFeaturedPostsByCategory(limit: number = 1): Array<{category: Category, posts: BlogPost[]}> {
  return categories
    .map(category => ({
      category,
      posts: getPostsByCategory(category.name).slice(0, limit)
    }))
    .filter(item => item.posts.length > 0);
}

export function searchPostsByCategory(query: string, categoryName?: string): BlogPost[] {
  let postsToSearch = blogPosts;
  
  if (categoryName) {
    postsToSearch = getPostsByCategory(categoryName);
  }
  
  const lowercaseQuery = query.toLowerCase();
  return postsToSearch.filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.description.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}