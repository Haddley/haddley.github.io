const fs = require('fs');
const path = require('path');

// Read all markdown files
const contentDir = path.join(__dirname, 'content');
const postsFile = path.join(__dirname, 'src/lib/posts.ts');

console.log('🔍 Extracting first images from markdown files...');

// Function to extract first image from markdown content
function extractFirstImage(markdownContent) {
  // Split content by lines and look for image patterns
  const lines = markdownContent.split('\n');
  
  for (const line of lines) {
    // Look for markdown image syntax: ![alt](path)
    const imageMatch = line.match(/!\[.*?\]\(([^)]+)\)/);
    if (imageMatch) {
      const imagePath = imageMatch[1];
      // Check if it's a valid image extension
      if (imagePath.match(/\.(jpg|jpeg|png|svg|gif|webp)$/i)) {
        return imagePath;
      }
    }
  }
  
  return null;
}

// Function to extract frontmatter and content
function parseMarkdown(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (match) {
    const frontmatter = match[1];
    const content = match[2];
    
    // Extract slug from frontmatter or derive from filename
    const titleMatch = frontmatter.match(/title:\s*["'](.+?)["']/);
    const title = titleMatch ? titleMatch[1] : '';
    
    return { frontmatter, content, title };
  }
  
  return { frontmatter: '', content, title: '' };
}

// Read all markdown files and extract first images
const markdownFiles = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
const imageMap = new Map();

for (const file of markdownFiles) {
  const filePath = path.join(contentDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const { content: markdownContent, title } = parseMarkdown(content);
  
  const firstImage = extractFirstImage(markdownContent);
  const slug = path.basename(file, '.md');
  
  if (firstImage) {
    imageMap.set(slug, firstImage);
    console.log(`📸 ${slug}: ${firstImage}`);
  } else {
    console.log(`❌ ${slug}: No images found`);
  }
}

console.log(`\n✅ Found first images for ${imageMap.size} posts`);

// Now update the posts.ts file
console.log('\n📝 Updating posts.ts file...');

let postsContent = fs.readFileSync(postsFile, 'utf-8');

// Update each post entry with the first image from content
let updatedCount = 0;

for (const [slug, imagePath] of imageMap) {
  // Look for the post entry and update its image field
  const postPattern = new RegExp(
    `(\\{[^}]*slug:\\s*['"]${slug}['"][^}]*image:\\s*['"])([^'"]*?)(['"][^}]*\\})`,
    'g'
  );
  
  const newContent = postsContent.replace(postPattern, (match, before, currentImage, after) => {
    console.log(`🔄 Updating ${slug}: ${currentImage} → ${imagePath}`);
    updatedCount++;
    return before + imagePath + after;
  });
  
  if (newContent !== postsContent) {
    postsContent = newContent;
  }
}

// Write the updated content back to posts.ts
fs.writeFileSync(postsFile, postsContent);

console.log(`\n🎯 Updated ${updatedCount} post images in posts.ts`);
console.log('📊 Posts page will now display the first image from each post content!');