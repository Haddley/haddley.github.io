const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content');
const publicImagesDir = path.join(__dirname, 'public', 'assets', 'images');

// Default hero image path (we'll use this as a fallback)
const defaultHeroImage = path.join(publicImagesDir, 'default-hero.png');

function extractHeroImagePath(frontmatter) {
  const imageMatch = frontmatter.match(/image:\s*"([^"]+)"/);
  return imageMatch ? imageMatch[1] : null;
}

function createDefaultHeroImage() {
  // Create a simple 1200x600 colored rectangle as default hero
  // For now, we'll just copy an existing image if available
  const existingImages = [];
  
  // Find any existing hero image to use as template
  function findExistingHero(dir) {
    try {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const itemPath = path.join(dir, item);
        if (fs.statSync(itemPath).isDirectory()) {
          findExistingHero(itemPath);
        } else if (item === 'hero.png' || item.includes('screen-shot')) {
          existingImages.push(itemPath);
        }
      }
    } catch (e) {
      // Directory doesn't exist, skip
    }
  }
  
  findExistingHero(publicImagesDir);
  
  if (existingImages.length > 0 && !fs.existsSync(defaultHeroImage)) {
    // Copy the first found image as default
    fs.copyFileSync(existingImages[0], defaultHeroImage);
    console.log('Created default hero image from:', existingImages[0]);
  }
}

function processMarkdownFiles() {
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
  
  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\n(.*?)\n---/s);
    if (!frontmatterMatch) continue;
    
    const frontmatter = frontmatterMatch[1];
    const heroImagePath = extractHeroImagePath(frontmatter);
    
    if (heroImagePath) {
      // Convert to filesystem path
      const localImagePath = path.join(__dirname, 'public', heroImagePath);
      
      if (!fs.existsSync(localImagePath)) {
        console.log(`Missing hero image for ${file}: ${heroImagePath}`);
        
        // Get the directory name from the image path
        const imageDir = path.dirname(localImagePath);
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(imageDir)) {
          fs.mkdirSync(imageDir, { recursive: true });
          console.log(`Created directory: ${imageDir}`);
        }
        
        // Copy default hero image
        if (fs.existsSync(defaultHeroImage)) {
          fs.copyFileSync(defaultHeroImage, localImagePath);
          console.log(`Created hero image: ${localImagePath}`);
        } else {
          console.log(`Default hero image not found: ${defaultHeroImage}`);
        }
      }
    }
  }
}

// Main execution
createDefaultHeroImage();
processMarkdownFiles();

console.log('Hero image fixing complete!');