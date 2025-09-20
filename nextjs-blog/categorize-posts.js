const fs = require('fs');

console.log('🏷️  Automatically categorizing blog posts based on content...');

// Read current posts.ts
const postsContent = fs.readFileSync('./src/lib/posts.ts', 'utf8');

// Define category mapping based on keywords in titles and descriptions
const categoryMappings = {
  'AI & Machine Learning': [
    'ai', 'machine learning', 'openai', 'azure ai', 'copilot', 'chatgpt', 'llm', 
    'prompt', 'tensorflow', 'langchain', 'ollama', 'lmstudio', 'deepseek',
    'sentiment analysis', 'context injection', 'sentence similarity', 'stable diffusion'
  ],
  'Microsoft 365': [
    'sharepoint', 'power apps', 'power automate', 'power pages', 'business central', 
    'dynamics', 'office 365', 'microsoft graph', 'copilot studio', 'dataverse',
    'model driven', 'canvas apps', 'virtual table', 'integration table', 'flow',
    'power platform', 'purview'
  ],
  'Cloud & DevOps': [
    'azure', 'aws', 'docker', 'kubernetes', 'devops', 'github actions', 'ci/cd',
    'container', 'fargate', 'eks', 'aks', 'api gateway', 'codespaces', 'deployment'
  ],
  'Web Development': [
    'react', 'angular', 'next.js', 'nextjs', 'javascript', 'typescript', 'node.js',
    'express', 'sails', 'ionic', 'pwa', 'web components', 'threejs', 'phaser',
    'leaflet', 'webxr', 'webvr', 'graphql', 'rest api', 'npm', 'nuget'
  ],
  'Mobile & IoT': [
    'ios', 'xcode', 'swift', 'raspberry pi', 'iot', 'internet of things', 'pi1', 'pi2',
    'microchip', 'opencv', 'sh1106', 'gingerbread house'
  ],
  '.NET Development': [
    'asp.net', '.net', 'blazor', 'c#', 'vb.net', 'visual basic', 'dotnet', 'core',
    'winforms', 'three tier', 'unit tests', 'sql server'
  ],
  'Data & Analytics': [
    'sql', 'mysql', 'database', 'mssql', 'reports', 'advanced reports', 'analytics',
    'data science', 'binary classification'
  ],
  'Development Tools': [
    'spring boot', 'java', 'php', 'teams toolkit', 'vs code', 'extension',
    'command line', 'api management', 'configuration migration'
  ]
};

// Parse existing posts
console.log('📊 Parsing existing posts...');
const existingPostsMatch = postsContent.match(/export const blogPosts: BlogPost\[\] = \[([\s\S]*?)\];/);
if (!existingPostsMatch) {
  throw new Error('Could not find blogPosts array');
}

// Extract posts data
const posts = [];
const postMatches = [...existingPostsMatch[1].matchAll(/\{[\s\S]*?\}(?=\s*[,\]])/g)];

postMatches.forEach(match => {
  const postText = match[0];
  const slugMatch = postText.match(/slug:\s*['"`]([^'"`]+)['"`]/);
  const titleMatch = postText.match(/title:\s*['"`]([^'"`]*)['"`]/);
  const descMatch = postText.match(/description:\s*['"`]([^'"`]*)['"`]/);
  
  if (slugMatch && titleMatch) {
    const slug = slugMatch[1];
    const title = titleMatch[1];
    const description = descMatch ? descMatch[1] : '';
    
    posts.push({ slug, title, description, originalText: postText });
  }
});

console.log(`📊 Found ${posts.length} posts to categorize`);

// Function to categorize a post
function categorizePost(post) {
  const searchText = `${post.title} ${post.description} ${post.slug}`.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categoryMappings)) {
    for (const keyword of keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }
  
  // Default category
  return 'Development';
}

// Categorize all posts
const categorizedPosts = posts.map(post => ({
  ...post,
  suggestedCategory: categorizePost(post)
}));

// Count posts per category
const categoryCounts = {};
categorizedPosts.forEach(post => {
  categoryCounts[post.suggestedCategory] = (categoryCounts[post.suggestedCategory] || 0) + 1;
});

console.log('\n📊 Categorization Results:');
Object.entries(categoryCounts)
  .sort(([,a], [,b]) => b - a)
  .forEach(([category, count]) => {
    console.log(`   ${category}: ${count} posts`);
  });

// Show examples from each category
console.log('\n🔍 Category Examples:');
Object.keys(categoryMappings).forEach(category => {
  const examples = categorizedPosts
    .filter(post => post.suggestedCategory === category)
    .slice(0, 3)
    .map(post => post.title);
  
  if (examples.length > 0) {
    console.log(`\n${category}:`);
    examples.forEach(title => console.log(`   • ${title}`));
  }
});

// Update the posts.ts file with new categories
console.log('\n🔄 Updating posts.ts with new categories...');
let updatedContent = existingPostsMatch[1];
let updatedCount = 0;

categorizedPosts.forEach(post => {
  const oldCategoryPattern = /category:\s*['"`]Development['"`]/;
  const newCategoryValue = `category: '${post.suggestedCategory}'`;
  
  // Find and replace the category in the original text
  if (post.originalText.includes("category: 'Development'")) {
    const updatedPostText = post.originalText.replace("category: 'Development'", newCategoryValue);
    updatedContent = updatedContent.replace(post.originalText, updatedPostText);
    updatedCount++;
  }
});

// Write the updated file
const beforeArray = postsContent.substring(0, postsContent.indexOf('export const blogPosts: BlogPost[] = [') + 'export const blogPosts: BlogPost[] = ['.length);
const afterArrayMatch = postsContent.match(/\];\s*(export function[\s\S]*)$/);
const afterArray = afterArrayMatch ? afterArrayMatch[1] : '';

const newContent = `${beforeArray}
${updatedContent}
];

${afterArray}`;

fs.writeFileSync('./src/lib/posts.ts', newContent);

console.log(`\n✅ Successfully updated ${updatedCount} post categories!`);
console.log('🎯 Posts are now properly categorized for better browsing');

// Save categorization data for reference
const categorizationData = {
  totalPosts: posts.length,
  updatedPosts: updatedCount,
  categoryDistribution: categoryCounts,
  categoryMappings,
  posts: categorizedPosts.map(p => ({
    slug: p.slug,
    title: p.title,
    category: p.suggestedCategory
  }))
};

fs.writeFileSync('categorization-results.json', JSON.stringify(categorizationData, null, 2));
console.log('\n📁 Categorization results saved to categorization-results.json');