#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, '../../assets');
const targetDir = path.join(__dirname, '../public/assets');

// Function to create web-safe filename
function createWebSafeFilename(filename) {
  return filename
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.-]/g, '');
}

async function syncImages() {
  try {
    console.log('🔄 Syncing images from root assets to Next.js public...');
    
    // Ensure target directory exists
    await fs.ensureDir(targetDir);
    
    // Remove existing images directory to avoid stale files
    const imagesTarget = path.join(targetDir, 'images');
    if (await fs.pathExists(imagesTarget)) {
      await fs.remove(imagesTarget);
      console.log('🗑️  Removed existing images directory');
    }
    
    // Copy all images from source to target
    if (await fs.pathExists(sourceDir)) {
      const sourceImages = path.join(sourceDir, 'images');
      await fs.copy(sourceImages, imagesTarget);
      console.log('✅ Successfully synced images');
      
      // Create web-safe filename versions for problematic files
      await createWebSafeVersions(imagesTarget);
      
      // Count synced files
      const files = await fs.readdir(imagesTarget, { recursive: true });
      const imageFiles = files.filter(file => 
        /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(file)
      );
      console.log(`📁 Synced ${imageFiles.length} image files`);
    } else {
      console.log('⚠️  Source assets directory not found');
    }
  } catch (error) {
    console.error('❌ Error syncing images:', error);
    process.exit(1);
  }
}

async function createWebSafeVersions(imagesDir) {
  console.log('🔧 Creating web-safe filename versions...');
  
  const walk = async (dir) => {
    const files = await fs.readdir(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);
      
      if (stat.isDirectory()) {
        await walk(filePath);
      } else if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(file)) {
        // Check if filename has spaces or needs web-safe version
        if (file.includes(' ') || file !== createWebSafeFilename(file)) {
          const webSafeFilename = createWebSafeFilename(file);
          const webSafeFilePath = path.join(dir, webSafeFilename);
          
          // Only create if it doesn't already exist
          if (!await fs.pathExists(webSafeFilePath)) {
            await fs.copy(filePath, webSafeFilePath);
            console.log(`🔗 Created web-safe version: ${webSafeFilename}`);
          }
        }
      }
    }
  };
  
  await walk(imagesDir);
}

// Run if called directly
if (require.main === module) {
  syncImages();
}

module.exports = syncImages;