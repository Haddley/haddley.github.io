#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '..', 'content');
const outputFile = path.join(__dirname, '..', 'combined-reference.md');

// Read all markdown files
const markdownFiles = fs.readdirSync(contentDir)
  .filter(file => file.endsWith('.md'))
  .sort();

console.log(`Found ${markdownFiles.length} markdown files`);

// Start the combined file
let combinedContent = `# Complete Markdown Reference\n\n`;
combinedContent += `This file combines all markdown files from the content directory for reference purposes.\n`;
combinedContent += `Generated on: ${new Date().toISOString()}\n`;
combinedContent += `Total files: ${markdownFiles.length}\n\n`;

// Add table of contents
combinedContent += `## Table of Contents\n\n`;
markdownFiles.forEach((file, index) => {
  const fileName = path.basename(file, '.md');
  combinedContent += `${index + 1}. [${fileName}](#${fileName.toLowerCase().replace(/[^a-z0-9]/g, '-')})\n`;
});
combinedContent += `\n---\n\n`;

// Process each file
markdownFiles.forEach((file, index) => {
  const filePath = path.join(contentDir, file);
  const fileName = path.basename(file, '.md');
  
  console.log(`Processing ${index + 1}/${markdownFiles.length}: ${file}`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Add file header
    combinedContent += `## ${fileName}\n\n`;
    combinedContent += `**Source file:** \`${file}\`\n\n`;
    
    // Add the file content
    combinedContent += content;
    
    // Add separator
    combinedContent += `\n\n---\n\n`;
    
  } catch (error) {
    console.error(`Error reading ${file}:`, error.message);
    combinedContent += `**Error reading file:** ${error.message}\n\n---\n\n`;
  }
});

// Write the combined file
try {
  fs.writeFileSync(outputFile, combinedContent, 'utf8');
  console.log(`✅ Successfully created combined reference file: ${outputFile}`);
  console.log(`📊 Total size: ${Math.round(combinedContent.length / 1024)} KB`);
} catch (error) {
  console.error('❌ Error writing combined file:', error.message);
  process.exit(1);
}