#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, '../content/assets');
const rootAssetsDir = path.join(__dirname, '../assets');
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
    
    // Remove existing mp4 directory to avoid stale files
    const mp4Target = path.join(targetDir, 'mp4');
    if (await fs.pathExists(mp4Target)) {
      await fs.remove(mp4Target);
      console.log('🗑️  Removed existing mp4 directory');
    }
    
    // Copy all images from source to target
    if (await fs.pathExists(sourceDir)) {
      const sourceImages = path.join(sourceDir, 'images');
      await fs.copy(sourceImages, imagesTarget);
      console.log('✅ Successfully synced images');
      
      // Copy all mp4 files from source to target
      const sourceMp4 = path.join(sourceDir, 'mp4');
      if (await fs.pathExists(sourceMp4)) {
        await fs.copy(sourceMp4, mp4Target);
        console.log('✅ Successfully synced videos from content/assets');
      }
      
      // Also copy mp4 files from root assets directory
      const rootMp4 = path.join(rootAssetsDir, 'mp4');
      if (await fs.pathExists(rootMp4)) {
        await fs.copy(rootMp4, mp4Target, { overwrite: true });
        console.log('✅ Successfully synced videos from root assets');
      }
      
      // Count synced files
      const files = await fs.readdir(imagesTarget, { recursive: true });
      const imageFiles = files.filter(file => 
        /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(file)
      );
      console.log(`📁 Synced ${imageFiles.length} image files`);
      
      // Count synced video files
      if (await fs.pathExists(mp4Target)) {
        const videoFiles = await fs.readdir(mp4Target, { recursive: true });
        const mp4Files = videoFiles.filter(file => 
          /\.(mp4|webm|ogg|mov)$/i.test(file)
        );
        console.log(`🎥 Synced ${mp4Files.length} video files`);
      }
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