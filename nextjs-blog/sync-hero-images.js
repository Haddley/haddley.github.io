const fs = require('fs');
const path = require('path');

// Read all markdown files and extract their hero images
const contentDir = './content';
const postsFilePath = './src/lib/posts.ts';

// Read the current posts.ts file
let postsContent = fs.readFileSync(postsFilePath, 'utf8');

// Get all markdown files
const markdownFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));

let updatedCount = 0;

markdownFiles.forEach(file => {
  const slug = file.replace('.md', '');
  const filePath = path.join(contentDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract the image from frontmatter
  const imageMatch = content.match(/^image:\s*['"]?([^'"]*)['"]?$/m);
  
  if (imageMatch) {
    const imagePath = imageMatch[1];
    
    // Find and update the corresponding entry in posts.ts
    const slugPattern = new RegExp(`(\\s+slug:\\s*['"]${slug}['"][^}]+image:\\s*)['"][^'"]*['"]`, 'm');
    const match = postsContent.match(slugPattern);
    
    if (match) {
      const replacement = `${match[1]}'${imagePath}'`;
      postsContent = postsContent.replace(slugPattern, replacement);
      console.log(`✅ Updated ${slug}: ${imagePath}`);
      updatedCount++;
    } else {
      console.log(`❌ Could not find ${slug} in posts.ts`);
    }
  } else {
    console.log(`⚠️  No image found in ${file}`);
  }
});

// Write the updated content back to posts.ts
fs.writeFileSync(postsFilePath, postsContent);

console.log(`\n📊 Updated ${updatedCount} hero images in posts.ts`);
console.log('🎯 Posts page should now display the correct hero images!');