const fs = require('fs');
const path = require('path');

// Function to get the best hero image for each post
function getBestHeroImage(postSlug, availableImages) {
  // Priority order for selecting hero images
  const priorityPatterns = [
    /final.*result/i,           // Final result images
    /completed/i,               // Completed images  
    /result/i,                  // Result images
    /hero\.(jpg|jpeg|png|svg)$/i, // Dedicated hero images
    /logo/i,                    // Logo images
    /main/i,                    // Main images
    /cover/i,                   // Cover images
    /thumbnail/i,               // Thumbnail images
    /screen.*shot.*1/i,         // First screenshot
    /img.*1/i,                  // First image
    /\.(jpg|jpeg|png|svg)$/i    // Any image file
  ];

  for (const pattern of priorityPatterns) {
    const match = availableImages.find(img => pattern.test(img));
    if (match) {
      return `/assets/images/${postSlug}/${match}`;
    }
  }

  // Fallback to first image
  const imageFiles = availableImages.filter(img => /\.(jpg|jpeg|png|svg)$/i.test(img));
  if (imageFiles.length > 0) {
    return `/assets/images/${postSlug}/${imageFiles[0]}`;
  }

  return null;
}

// Get all content files
const contentDir = './content';
const assetsDir = './public/assets/images';
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));

let updatedCount = 0;

files.forEach(file => {
  const postSlug = file.replace('.md', '');
  const imageDirPath = path.join(assetsDir, postSlug);
  
  // Check if there's a specific image directory for this post
  if (fs.existsSync(imageDirPath)) {
    const availableImages = fs.readdirSync(imageDirPath);
    const bestHeroImage = getBestHeroImage(postSlug, availableImages);
    
    if (bestHeroImage) {
      const filePath = path.join(contentDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Update the image field in frontmatter
      const updatedContent = content.replace(
        /^image:\s*['"]?[^'"]*['"]?$/m,
        `image: "${bestHeroImage}"`
      );
      
      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent);
        console.log(`✅ Updated ${file} with hero image: ${bestHeroImage}`);
        updatedCount++;
      } else {
        console.log(`⚪ ${file} already has: ${bestHeroImage}`);
      }
    } else {
      console.log(`❌ No suitable hero image found for ${file}`);
    }
  } else {
    console.log(`⚪ No image directory found for ${postSlug}`);
  }
});

console.log(`\n📊 Updated ${updatedCount} posts with better hero images.`);

// Show some examples of what was updated
console.log('\n🎯 Examples of updated hero images:');
const exampleFiles = ['3dprinting1.md', 'angular.md', 'threejs.md'].filter(f => 
  fs.existsSync(path.join(contentDir, f))
);

exampleFiles.forEach(file => {
  const content = fs.readFileSync(path.join(contentDir, file), 'utf8');
  const imageMatch = content.match(/^image:\s*['"]?([^'"]*)['"]?$/m);
  if (imageMatch) {
    console.log(`  ${file}: ${imageMatch[1]}`);
  }
});