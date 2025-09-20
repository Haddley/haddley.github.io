#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const contentDir = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/content';

function fixCodeBlocks(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const fixedLines = [];
  let inCodeBlock = false;
  let codeBlockStart = -1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('```')) {
      if (!inCodeBlock) {
        // Starting a code block
        inCodeBlock = true;
        codeBlockStart = i;
        fixedLines.push(line);
      } else {
        // Ending a code block
        inCodeBlock = false;
        
        // Check if this was an empty code block
        if (i === codeBlockStart + 1) {
          // Empty code block - remove both start and end
          console.log(`Removing empty code block in ${path.basename(filePath)} at lines ${codeBlockStart + 1}-${i + 1}`);
          fixedLines.pop(); // Remove the opening ```
          // Don't add the closing ```
        } else {
          fixedLines.push(line);
        }
      }
    } else {
      fixedLines.push(line);
    }
  }
  
  const fixedContent = fixedLines.join('\n');
  
  if (fixedContent !== content) {
    fs.writeFileSync(filePath, fixedContent);
    console.log(`Fixed code blocks in ${path.basename(filePath)}`);
    return true;
  }
  
  return false;
}

function fixAllCodeBlocks() {
  const files = fs.readdirSync(contentDir);
  let filesFixed = 0;
  
  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(contentDir, file);
      if (fixCodeBlocks(filePath)) {
        filesFixed++;
      }
    }
  }
  
  console.log(`\nFixed ${filesFixed} files total.`);
}

fixAllCodeBlocks();