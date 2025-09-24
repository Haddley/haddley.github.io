#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const filePath = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/content/copilotstudiobctools.md';

async function fixImageReferences() {
  try {
    console.log('🔧 Fixing image references in copilotstudiobctools.md...');
    
    let content = await fs.readFile(filePath, 'utf8');
    
    // Define the image mappings
    const imageMappings = [
      {
        old: '/Screenshot%202025-09-24%20at%204.56.34%20PM.png',
        new: '/screenshot-2025-09-24-at-4.56.34-pm.png'
      },
      {
        old: '/Screenshot%202025-09-24%20at%204.56.56%20PM.png',
        new: '/screenshot-2025-09-24-at-4.56.56-pm.png'
      },
      {
        old: '/Screenshot%202025-09-24%20at%204.57.38%20PM.png',
        new: '/screenshot-2025-09-24-at-4.57.38-pm.png'
      },
      {
        old: '/Screenshot%202025-09-24%20at%205.17.33%20PM.png',
        new: '/screenshot-2025-09-24-at-5.17.33-pm.png'
      },
      {
        old: '/Screenshot%202025-09-24%20at%205.17.47%20PM.png',
        new: '/screenshot-2025-09-24-at-5.17.47-pm.png'
      },
      {
        old: '/Screenshot%202025-09-24%20at%205.18.14%20PM.png',
        new: '/screenshot-2025-09-24-at-5.18.14-pm.png'
      },
      {
        old: '/Screenshot%202025-09-24%20at%205.18.34%20PM.png',
        new: '/screenshot-2025-09-24-at-5.18.34-pm.png'
      },
      {
        old: '/Screenshot%202025-09-24%20at%205.21.23%20PM.png',
        new: '/screenshot-2025-09-24-at-5.21.23-pm.png'
      },
      {
        old: '/Screenshot%202025-09-24%20at%206.19.08%20PM.png',
        new: '/screenshot-2025-09-24-at-6.19.08-pm.png'
      },
      {
        old: '/Screenshot%202025-09-24%20at%206.22.19%20PM.png',
        new: '/screenshot-2025-09-24-at-6.22.19-pm.png'
      },
      {
        old: '/Screenshot%202025-09-24%20at%206.27.25%20PM.png',
        new: '/screenshot-2025-09-24-at-6.27.25-pm.png'
      },
      {
        old: '/Screenshot%202025-09-24%20at%206.26.05%20PM.png',
        new: '/screenshot-2025-09-24-at-6.26.05-pm.png'
      }
    ];
    
    // Replace all image references
    for (const mapping of imageMappings) {
      const oldPath = `/assets/images/copilotstudiobctools${mapping.old}`;
      const newPath = `/assets/images/copilotstudiobctools${mapping.new}`;
      content = content.replace(new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
    }
    
    // Write the updated content back to the file
    await fs.writeFile(filePath, content, 'utf8');
    
    console.log('✅ Successfully updated all image references!');
    
  } catch (error) {
    console.error('❌ Error fixing image references:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  fixImageReferences();
}

module.exports = fixImageReferences;