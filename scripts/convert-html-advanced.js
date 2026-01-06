const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Function to create image directory if it doesn't exist
function ensureImageDirectory(slug) {
  const imageDir = path.join(__dirname, `../public/assets/images/${slug}`);
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }
  return imageDir;
}

// Function to copy image files
function copyImage(srcPath, destDir, filename) {
  const srcFullPath = path.join('/Users/neilhaddley/Documents/GitHub/haddley.github.io', srcPath);
  const destFullPath = path.join(destDir, filename);
  
  try {
    if (fs.existsSync(srcFullPath)) {
      fs.copyFileSync(srcFullPath, destFullPath);
      return true;
    }
  } catch (error) {
    console.log(`Warning: Could not copy image ${srcPath}:`, error.message);
  }
  return false;
}

// Function to process HTML content with proper structure preservation
function convertHtmlToMarkdownAdvanced(htmlContent, fileName) {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  
  // Extract title
  const titleElement = document.querySelector('title');
  const title = titleElement ? titleElement.textContent.trim() : fileName.replace('.html', '');
  
  // Generate slug
  const slug = fileName.replace('.html', '').toLowerCase();
  const imageDir = ensureImageDirectory(slug);
  
  let markdownContent = '';
  let imageCounter = 1;
  
  // Find all content and image sections
  const sections = document.querySelectorAll('section[class*="content"], section[class*="image"]');
  
  sections.forEach((section) => {
    const sectionClass = section.className;
    
    if (sectionClass.includes('content')) {
      // Process content sections
      const subtitle = section.querySelector('.mbr-section-subtitle, h4');
      const textElement = section.querySelector('.mbr-text, p');
      
      if (subtitle && subtitle.textContent.trim()) {
        const subtitleText = subtitle.textContent.trim();
        markdownContent += `\n## ${subtitleText}\n\n`;
      }
      
      if (textElement) {
        let text = textElement.innerHTML;
        
        // Convert HTML formatting to markdown
        text = text
          .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
          .replace(/<em>(.*?)<\/em>/g, '*$1*')
          .replace(/<code>(.*?)<\/code>/g, '`$1`')
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<br><br>/gi, '\n\n')
          .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g, '[$2]($1)')
          .replace(/<[^>]*>/g, '') // Remove any remaining HTML tags
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");
        
        // Format code blocks (commands starting with %)
        text = text.replace(/\*\*(%[^*]+)\*\*/g, (match, command) => {
          return '\n```bash\n' + command.replace(/\*\*/g, '') + '\n```\n';
        });
        
        // Clean up extra whitespace
        text = text.replace(/\n{3,}/g, '\n\n').trim();
        
        if (text) {
          markdownContent += text + '\n\n';
        }
      }
    } else if (sectionClass.includes('image')) {
      // Process image sections
      const imgElement = section.querySelector('img');
      const captionElement = section.querySelector('.mbr-description, p');
      
      if (imgElement) {
        const imgSrc = imgElement.getAttribute('src');
        const imgAlt = imgElement.getAttribute('alt') || '';
        
        if (imgSrc && !imgSrc.startsWith('http')) {
          // Copy image to public directory
          const filename = path.basename(imgSrc);
          const newImagePath = `/assets/images/${slug}/${filename}`;
          
          if (copyImage(imgSrc, imageDir, filename)) {
            markdownContent += `![${imgAlt}](${newImagePath})\n`;
            
            if (captionElement && captionElement.textContent.trim()) {
              let caption = captionElement.textContent.trim();
              // Clean up caption text
              caption = caption.replace(/\s+/g, ' ').trim();
              if (caption) {
                markdownContent += `*${caption}*\n\n`;
              }
            } else {
              markdownContent += '\n';
            }
          }
        } else if (imgSrc && imgSrc.startsWith('http')) {
          // External image
          markdownContent += `![${imgAlt}](${imgSrc})\n`;
          if (captionElement && captionElement.textContent.trim()) {
            markdownContent += `*${captionElement.textContent.trim()}*\n\n`;
          } else {
            markdownContent += '\n';
          }
        }
      }
    }
  });
  
  return { title, content: markdownContent.trim(), slug };
}

// Function to determine category from filename
function getCategoryFromFilename(filename) {
  const name = filename.toLowerCase();
  if (name.includes('azure')) return 'Azure';
  if (name.includes('angular')) return 'Web Development';
  if (name.includes('business') || name.includes('central')) return 'Business Central';
  if (name.includes('machine') || name.includes('learning') || name.includes('ai')) return 'AI/ML';
  if (name.includes('dotnet') || name.includes('.net') || name.includes('asp')) return '.NET';
  if (name.includes('spring') || name.includes('java')) return 'Java';
  if (name.includes('docker') || name.includes('kubernetes')) return 'DevOps';
  if (name.includes('react') || name.includes('next')) return 'Web Development';
  if (name.includes('python') || name.includes('django')) return 'Python';
  return 'Development';
}

// Function to extract tags from content
function extractTags(title, content) {
  const tags = new Set();
  const text = (title + ' ' + content).toLowerCase();
  
  const techTags = [
    'angular', 'react', 'vue', 'javascript', 'typescript', 'nodejs',
    'azure', 'aws', 'docker', 'kubernetes', 'devops',
    'dotnet', 'c#', 'java', 'spring', 'python',
    'mysql', 'postgresql', 'sql', 'database',
    'ai', 'ml', 'machine learning',
    'business central', 'dynamics', 'power platform',
    'git', 'github', 'testing', 'asp.net', 'blazor'
  ];
  
  techTags.forEach(tag => {
    if (text.includes(tag)) {
      tags.add(tag);
    }
  });
  
  return Array.from(tags).slice(0, 5);
}

// Main conversion function
function convertHtmlToMarkdownWithImages(htmlFilePath) {
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  const fileName = path.basename(htmlFilePath);
  const { title, content, slug } = convertHtmlToMarkdownAdvanced(htmlContent, fileName);
  
  const category = getCategoryFromFilename(fileName);
  const tags = extractTags(title, content);
  
  // Create markdown with proper frontmatter
  const markdown = `---
title: "${title}"
description: "A comprehensive guide covering ${title.toLowerCase()}"
date: "${new Date().toISOString().split('T')[0]}"
category: "${category}"
image: "/assets/images/${slug}/hero.png"
tags: ${JSON.stringify(tags)}
---

# ${title}

${content}
`;
  
  return markdown;
}

// CLI usage
if (require.main === module) {
  const htmlFile = process.argv[2];
  if (!htmlFile) {
    console.log('Usage: node convert-html-advanced.js <html-file>');
    process.exit(1);
  }
  
  try {
    const markdown = convertHtmlToMarkdownWithImages(htmlFile);
    console.log(markdown);
  } catch (error) {
    console.error('Error converting HTML to markdown:', error);
    process.exit(1);
  }
}

module.exports = { convertHtmlToMarkdownWithImages };