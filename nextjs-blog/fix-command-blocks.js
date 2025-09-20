#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const contentDir = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/content';

function fixCommandLineBlocks(content) {
  // Pattern to match command line sequences that should be in code blocks
  // Look for lines starting with % (shell commands)
  const lines = content.split('\n');
  const fixedLines = [];
  let inCodeBlock = false;
  let inCommandSequence = false;
  let commandLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Check if we're already in a code block
    if (trimmedLine.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      fixedLines.push(line);
      continue;
    }
    
    // If we're in a code block, just pass through
    if (inCodeBlock) {
      fixedLines.push(line);
      continue;
    }
    
    // Check for command line pattern (% command)
    if (trimmedLine.startsWith('% ') || (trimmedLine.startsWith('%') && trimmedLine.length > 1)) {
      if (!inCommandSequence) {
        // Start a new command sequence
        inCommandSequence = true;
        commandLines = [line];
      } else {
        commandLines.push(line);
      }
    } else if (inCommandSequence) {
      // We were in a command sequence but this line doesn't match
      // Check if this is an empty line or a continuation
      if (trimmedLine === '' && i + 1 < lines.length && 
          (lines[i + 1].trim().startsWith('% ') || lines[i + 1].trim().startsWith('%'))) {
        // Empty line between commands - include it
        commandLines.push(line);
      } else {
        // End of command sequence - wrap in code block
        if (commandLines.length > 0) {
          fixedLines.push('```bash');
          fixedLines.push(...commandLines);
          fixedLines.push('```');
          fixedLines.push('');
        }
        commandLines = [];
        inCommandSequence = false;
        fixedLines.push(line);
      }
    } else {
      fixedLines.push(line);
    }
  }
  
  // Handle any remaining command sequence at end of file
  if (inCommandSequence && commandLines.length > 0) {
    fixedLines.push('```bash');
    fixedLines.push(...commandLines);
    fixedLines.push('```');
  }
  
  return fixedLines.join('\n');
}

function fixCodeBlocksInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fixedContent = fixCommandLineBlocks(content);
  
  if (fixedContent !== content) {
    fs.writeFileSync(filePath, fixedContent);
    console.log(`Fixed command line blocks in ${path.basename(filePath)}`);
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
      if (fixCodeBlocksInFile(filePath)) {
        filesFixed++;
      }
    }
  }
  
  console.log(`\nFixed command line blocks in ${filesFixed} files total.`);
}

fixAllCodeBlocks();