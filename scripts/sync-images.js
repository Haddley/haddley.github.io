#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, '../content/assets');
const targetDir = path.join(__dirname, '../public/assets');

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

// Run if called directly
if (require.main === module) {
  syncImages();
}

module.exports = syncImages;