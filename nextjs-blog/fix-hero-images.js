const fs = require('fs');
const path = require('path');

// Extract image mappings from posts.html
const postsHtml = fs.readFileSync('../posts.html', 'utf8');
const imageMatches = postsHtml.match(/href="([^"]*?)\.html"[^>]*><img src="([^"]*?)"/g);

const imageMap = {};
if (imageMatches) {
  imageMatches.forEach(match => {
    const hrefMatch = match.match(/href="([^"]*?)\.html"/);
    const srcMatch = match.match(/<img src="([^"]*?)"/);
    if (hrefMatch && srcMatch) {
      let fileName = hrefMatch[1];
      let imagePath = srcMatch[1];
      
      // Convert filename to slug format (lowercase, replace spaces with hyphens)
      const slug = fileName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9-]/g, '');
      
      imageMap[slug] = imagePath;
    }
  });
}

console.log('Found', Object.keys(imageMap).length, 'image mappings');

// Now update the markdown files
const contentDir = 'content';
const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));

let updatedCount = 0;

files.forEach(file => {
  const slug = file.replace('.md', '');
  const filePath = path.join(contentDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if this slug has an image mapping
  if (imageMap[slug]) {
    const imagePath = imageMap[slug];
    console.log(`Updating ${slug}: ${imagePath}`);
    
    // Update the frontmatter image field
    content = content.replace(
      /image:\s*"[^"]*"/,
      `image: "/${imagePath}"`
    );
    
    fs.writeFileSync(filePath, content);
    updatedCount++;
  }
});

console.log(`Updated ${updatedCount} files with real hero images`);
console.log('\nImage mapping:');
Object.entries(imageMap).forEach(([slug, image]) => {
  console.log(`${slug}: ${image}`);
});