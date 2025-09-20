const fs = require('fs');
const path = require('path');

// Focused grammar rules for obvious corrections
const grammarRules = [
  // Basic capitalization - sentence starters
  { pattern: /(\. |\? |\! |^)i /g, replacement: '$1I ' },
  
  // Common contractions with proper apostrophes
  { pattern: /\bdont\b/g, replacement: "don't" },
  { pattern: /\bwont\b/g, replacement: "won't" },
  { pattern: /\bcant\b/g, replacement: "can't" },
  { pattern: /\bcouldnt\b/g, replacement: "couldn't" },
  { pattern: /\bwouldnt\b/g, replacement: "wouldn't" },
  { pattern: /\bshouldnt\b/g, replacement: "shouldn't" },
  { pattern: /\bdoesnt\b/g, replacement: "doesn't" },
  { pattern: /\bhasnt\b/g, replacement: "hasn't" },
  { pattern: /\bhavent\b/g, replacement: "haven't" },
  { pattern: /\bwasnt\b/g, replacement: "wasn't" },
  { pattern: /\bwerent\b/g, replacement: "weren't" },
  { pattern: /\bisnt\b/g, replacement: "isn't" },
  { pattern: /\barent\b/g, replacement: "aren't" },
  { pattern: /\bim\b/g, replacement: "I'm" },
  { pattern: /\bive\b/g, replacement: "I've" },
  { pattern: /\bill\b/g, replacement: "I'll" },
  { pattern: /\bid\b/g, replacement: "I'd" },
  { pattern: /\bits\s/g, replacement: "it's " }, // it's vs its
  
  // Common spelling mistakes
  { pattern: /\bteh\b/g, replacement: 'the' },
  { pattern: /\baccomodate\b/gi, replacement: 'accommodate' },
  { pattern: /\bdefintely\b/gi, replacement: 'definitely' },
  { pattern: /\brecieve\b/gi, replacement: 'receive' },
  { pattern: /\brecieved\b/gi, replacement: 'received' },
  { pattern: /\boccured\b/gi, replacement: 'occurred' },
  { pattern: /\bseperate\b/gi, replacement: 'separate' },
  { pattern: /\bneccessary\b/gi, replacement: 'necessary' },
  { pattern: /\benvironment\b/gi, replacement: 'environment' },
  { pattern: /\bdevelopement\b/gi, replacement: 'development' },
  { pattern: /\bmanagment\b/gi, replacement: 'management' },
  
  // Clean up multiple spaces
  { pattern: /\s{2,}/g, replacement: ' ' },
  
  // Fix spacing around punctuation
  { pattern: /\s+\./g, replacement: '.' },
  { pattern: /\s+,/g, replacement: ',' },
  { pattern: /\s+!/g, replacement: '!' },
  { pattern: /\s+\?/g, replacement: '?' },
  { pattern: /\s+:/g, replacement: ':' },
  { pattern: /\s+;/g, replacement: ';' },
];

function isInCodeBlock(content, position) {
  // Check if position is inside a code block
  const beforeContent = content.substring(0, position);
  const codeBlocks = beforeContent.match(/```/g);
  return codeBlocks && codeBlocks.length % 2 === 1;
}

function isInInlineCode(content, position) {
  // Check if position is inside inline code (between backticks)
  const beforeContent = content.substring(0, position);
  const afterContent = content.substring(position);
  const beforeTicks = (beforeContent.match(/`/g) || []).length;
  const afterTicks = (afterContent.match(/`/g) || []).length;
  
  // If odd number of backticks before, we're inside code
  return beforeTicks % 2 === 1;
}

function isInUrl(content, position) {
  // Check if we're inside a URL
  const start = Math.max(0, position - 30);
  const end = Math.min(content.length, position + 30);
  const context = content.substring(start, end);
  return /https?:\/\//.test(context) || /www\./.test(context);
}

function correctGrammar(content) {
  let corrected = content;
  
  for (const rule of grammarRules) {
    corrected = corrected.replace(rule.pattern, (match, ...args) => {
      const matchPosition = args[args.length - 2]; // Second to last arg is the position
      
      // Skip if we're in a code block, inline code, or URL
      if (isInCodeBlock(corrected, matchPosition) || 
          isInInlineCode(corrected, matchPosition) || 
          isInUrl(corrected, matchPosition)) {
        return match;
      }
      
      return rule.replacement;
    });
  }
  
  return corrected;
}

function processMarkdownFile(filePath) {
  try {
    console.log(`Processing: ${path.basename(filePath)}`);
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Split into frontmatter and content
    const parts = content.split('---');
    if (parts.length < 3) {
      console.log(`  Skipping - no frontmatter found`);
      return false;
    }
    
    const frontmatter = parts[1];
    const markdownContent = parts.slice(2).join('---');
    
    // Apply grammar corrections only to markdown content
    const correctedContent = correctGrammar(markdownContent);
    
    // Reconstruct the file
    const newContent = `---${frontmatter}---${correctedContent}`;
    
    // Only write if content changed
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`  ✓ Grammar corrections applied`);
      return true;
    } else {
      console.log(`  ✓ No grammar issues found`);
      return false;
    }
    
  } catch (error) {
    console.error(`  Error: ${error.message}`);
    return false;
  }
}

function processDirectory(dirPath) {
  console.log('Starting grammar checking...\n');
  
  const files = fs.readdirSync(dirPath);
  let processedCount = 0;
  let correctedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile() && file.endsWith('.md')) {
      const wasChanged = processMarkdownFile(filePath);
      if (wasChanged) {
        correctedCount++;
      }
      processedCount++;
    }
  }
  
  console.log(`\n=== Grammar Check Results ===`);
  console.log(`Files processed: ${processedCount}`);
  console.log(`Files corrected: ${correctedCount}`);
  console.log(`Files unchanged: ${processedCount - correctedCount}`);
  console.log('Grammar checking complete!');
}

// Run the script
const contentDir = path.join(__dirname, 'content');
if (fs.existsSync(contentDir)) {
  processDirectory(contentDir);
} else {
  console.error('Content directory not found');
}