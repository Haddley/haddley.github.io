const fs = require('fs');
const path = require('path');

// Function to extract basic content from HTML files
function extractContentFromHTML(htmlContent, fileName) {
  // Extract title from the HTML
  const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : fileName.replace('.html', '');
  
  // Simple approach: extract all text content between body tags
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  const bodyContent = bodyMatch ? bodyMatch[1] : htmlContent;
  
  // Clean up the content
  let content = bodyContent
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '') // Remove scripts
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '') // Remove styles
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '') // Remove navigation
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '') // Remove header
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '') // Remove footer
    .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '') // Remove sidebar
    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
    .replace(/<[^>]*>/g, ' ') // Remove remaining HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  
  // Split into paragraphs and clean up
  const paragraphs = content.split(/\s{2,}/)
    .filter(p => p.trim().length > 20) // Filter out very short paragraphs
    .map(p => p.trim())
    .slice(0, 10); // Limit to first 10 paragraphs
  
  return { title, content: paragraphs.join('\n\n') };
}

// Function to determine category from filename
function getCategoryFromFilename(filename) {
  const name = filename.toLowerCase();
  if (name.includes('azure')) return 'Azure';
  if (name.includes('angular')) return 'Web Development';
  if (name.includes('business') || name.includes('central')) return 'Business Central';
  if (name.includes('machine') || name.includes('learning') || name.includes('ai')) return 'AI/ML';
  if (name.includes('dotnet') || name.includes('.net')) return 'Development';
  if (name.includes('spring') || name.includes('java')) return 'Java';
  if (name.includes('docker') || name.includes('kubernetes')) return 'DevOps';
  return 'Development';
}

// Function to extract tags from content
function extractTags(title, content) {
  const tags = new Set();
  const text = (title + ' ' + content).toLowerCase();
  
  // Common technology tags
  const techTags = [
    'angular', 'react', 'vue', 'javascript', 'typescript', 'nodejs',
    'azure', 'aws', 'docker', 'kubernetes', 'devops',
    'dotnet', 'c#', 'java', 'spring', 'python',
    'mysql', 'postgresql', 'sql', 'database',
    'ai', 'ml', 'machine learning',
    'business central', 'dynamics', 'power platform',
    'git', 'github', 'testing'
  ];
  
  techTags.forEach(tag => {
    if (text.includes(tag)) {
      tags.add(tag);
    }
  });
  
  return Array.from(tags).slice(0, 5); // Limit to 5 tags
}

// Main conversion function
function convertHtmlToMarkdown(htmlFilePath) {
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  const fileName = path.basename(htmlFilePath);
  const { title, content } = extractContentFromHTML(htmlContent, fileName);
  
  const category = getCategoryFromFilename(fileName);
  const tags = extractTags(title, content);
  
  // Generate slug from filename
  const slug = fileName.replace('.html', '').toLowerCase();
  
  // Create markdown content
  const markdown = `---
title: "${title}"
description: "A comprehensive guide covering ${title.toLowerCase()}"
date: "${new Date().toISOString().split('T')[0]}"
category: "${category}"
image: "/assets/images/${slug}.png"
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
    console.log('Usage: node convert-html.js <html-file>');
    process.exit(1);
  }
  
  try {
    const markdown = convertHtmlToMarkdown(htmlFile);
    console.log(markdown);
  } catch (error) {
    console.error('Error converting HTML to markdown:', error);
    process.exit(1);
  }
}

module.exports = { convertHtmlToMarkdown };