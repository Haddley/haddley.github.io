const fs = require('fs');
const path = require('path');

// Very conservative grammar rules - only obvious fixes
const grammarRules = [
  // Basic capitalization fixes
  { pattern: /\bi\s/g, replacement: 'I ' },
  { pattern: /\bi'm\b/gi, replacement: 'I\'m' },
  { pattern: /\bi've\b/gi, replacement: 'I\'ve' },
  { pattern: /\bi'll\b/gi, replacement: 'I\'ll' },
  { pattern: /\bi'd\b/gi, replacement: 'I\'d' },
  
  // Common typos - only clear mistakes
  { pattern: /\bteh\b/gi, replacement: 'the' },
  { pattern: /\baccomodate\b/gi, replacement: 'accommodate' },
  { pattern: /\bdefintely\b/gi, replacement: 'definitely' },
  { pattern: /\brecieve\b/gi, replacement: 'receive' },
  { pattern: /\boccured\b/gi, replacement: 'occurred' },
  { pattern: /\bseperate\b/gi, replacement: 'separate' },
  
  // Double space fixes (safe)
  { pattern: /\s{2,}/g, replacement: ' ' },
  
  // Fix obvious spacing issues around punctuation (very conservative)
  { pattern: /\s+\./g, replacement: '.' },
  { pattern: /\s+,/g, replacement: ',' },
  { pattern: /\s+!/g, replacement: '!' },
  { pattern: /\s+\?/g, replacement: '?' },
];

function isCodeBlock(content, position) {
  // Check if we're inside a code block
  const beforeContent = content.substring(0, position);
  const codeBlockMatches = beforeContent.match(/```/g);
  return codeBlockMatches && codeBlockMatches.length % 2 === 1;
}

function isUrl(content, position) {
  // Check if we're inside a URL
  const beforeContent = content.substring(Math.max(0, position - 20), position);
  const afterContent = content.substring(position, position + 20);
  const fullContext = beforeContent + afterContent;
  return fullContext.includes('http') || fullContext.includes('www.');
}

function correctGrammar(content) {
  let corrected = content;
  
  // Apply grammar rules very carefully
  for (const rule of grammarRules) {
    corrected = corrected.replace(rule.pattern, (match, offset) => {
      // Don't modify code blocks or URLs
      if (isCodeBlock(corrected, offset) || isUrl(corrected, offset)) {
        return match;
      }
      return rule.replacement;
    });
  }
  
  return corrected;
}

function processMarkdownFile(filePath) {
  try {
    console.log(`Processing: ${filePath}`);
    
    // Read the file
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Split into frontmatter and content
    const parts = content.split('---');
    if (parts.length < 3) {
      console.log(`Skipping ${filePath} - no frontmatter found`);
      return;
    }
    
    const frontmatter = parts[1];
    const markdownContent = parts.slice(2).join('---');
    
    // Only correct grammar in the markdown content (not frontmatter)
    const correctedContent = correctGrammar(markdownContent);
    
    // Reconstruct the file
    const newContent = `---${frontmatter}---${correctedContent}`;
    
    // Only write if content actually changed
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✓ Corrected: ${path.basename(filePath)}`);
    } else {
      console.log(`✓ No changes: ${path.basename(filePath)}`);
    }
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  let processedCount = 0;
  let correctedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile() && file.endsWith('.md')) {
      const originalContent = fs.readFileSync(filePath, 'utf8');
      processMarkdownFile(filePath);
      const newContent = fs.readFileSync(filePath, 'utf8');
      
      if (originalContent !== newContent) {
        correctedCount++;
      }
      processedCount++;
    }
  }
  
  console.log(`\nProcessed ${processedCount} markdown files.`);
  console.log(`Made corrections to ${correctedCount} files.`);
}

// Run the script
const contentDir = path.join(__dirname, 'content');
if (fs.existsSync(contentDir)) {
  console.log('Starting conservative grammar correction...\n');
  processDirectory(contentDir);
  console.log('\nConservative proofreading complete!');
} else {
  console.error('Content directory not found');
}