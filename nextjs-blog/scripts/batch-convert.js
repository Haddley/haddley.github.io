const fs = require('fs');
const path = require('path');
const { convertHtmlToMarkdown } = require('./convert-html.js');

// Path to your HTML files
const htmlDir = '/Users/neilhaddley/Documents/GitHub/haddley.github.io';
const contentDir = path.join(__dirname, '../content');

// Ensure content directory exists
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// Function to convert all HTML files
function convertAllHtmlFiles() {
  // Get all HTML files
  const files = fs.readdirSync(htmlDir)
    .filter(file => file.endsWith('.html'))
    .filter(file => !file.startsWith('index')); // Skip index.html as it's already converted
  
  console.log(`Found ${files.length} HTML files to convert:`);
  files.forEach(file => console.log(`  - ${file}`));
  
  let successCount = 0;
  let errorCount = 0;
  
  files.forEach(file => {
    try {
      const htmlPath = path.join(htmlDir, file);
      const markdownContent = convertHtmlToMarkdown(htmlPath);
      
      // Generate output filename
      const slug = file.replace('.html', '').toLowerCase();
      const outputPath = path.join(contentDir, `${slug}.md`);
      
      // Write markdown file
      fs.writeFileSync(outputPath, markdownContent);
      console.log(`✅ Converted: ${file} -> ${slug}.md`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Error converting ${file}:`, error.message);
      errorCount++;
    }
  });
  
  console.log(`\nConversion complete:`);
  console.log(`  ✅ Successfully converted: ${successCount} files`);
  console.log(`  ❌ Errors: ${errorCount} files`);
  
  // Update the posts data file
  updatePostsData();
}

// Function to update the posts data based on converted files
function updatePostsData() {
  const postsPath = path.join(__dirname, '../src/lib/posts.ts');
  
  // Read all markdown files
  const markdownFiles = fs.readdirSync(contentDir)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const titleMatch = frontmatter.match(/title: "(.*)"/);
        const categoryMatch = frontmatter.match(/category: "(.*)"/);
        const dateMatch = frontmatter.match(/date: "(.*)"/);
        const tagsMatch = frontmatter.match(/tags: (\[.*\])/);
        
        return {
          slug: file.replace('.md', ''),
          title: titleMatch ? titleMatch[1].replace(/'/g, "\\'") : 'Untitled',
          category: categoryMatch ? categoryMatch[1] : 'Development',
          date: dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0],
          tags: tagsMatch ? JSON.parse(tagsMatch[1]) : []
        };
      }
      return null;
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Generate new posts.ts content
  const postsContent = `export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
}

export const blogPosts: BlogPost[] = [
${markdownFiles.map(post => `  {
    slug: '${post.slug}',
    title: '${post.title}',
    description: 'A comprehensive guide covering ${post.title.toLowerCase()}',
    date: '${post.date}',
    category: '${post.category}',
    tags: ${JSON.stringify(post.tags)},
    image: '/assets/images/${post.slug}.png'
  }`).join(',\n')}
];

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getCategories(): string[] {
  const categories = [...new Set(blogPosts.map(post => post.category))];
  return categories.sort();
}
`;
  
  fs.writeFileSync(postsPath, postsContent);
  console.log(`✅ Updated posts data with ${markdownFiles.length} posts`);
}

// Run the conversion
if (require.main === module) {
  convertAllHtmlFiles();
}

module.exports = { convertAllHtmlFiles };