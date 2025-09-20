const fs = require('fs');
const path = require('path');

// Grammar correction rules
const grammarRules = [
  // Basic capitalization fixes
  { pattern: /\bi\s/g, replacement: 'I ' },
  { pattern: /\bi'm\b/gi, replacement: 'I\'m' },
  { pattern: /\bi've\b/gi, replacement: 'I\'ve' },
  { pattern: /\bi'll\b/gi, replacement: 'I\'ll' },
  { pattern: /\bi'd\b/gi, replacement: 'I\'d' },
  
  // Apostrophe fixes
  { pattern: /its'/g, replacement: 'its' }, // "its'" -> "its" (possessive)
  { pattern: /it's/g, replacement: 'it\'s' }, // Ensure proper apostrophe
  { pattern: /don't/g, replacement: 'don\'t' },
  { pattern: /won't/g, replacement: 'won\'t' },
  { pattern: /can't/g, replacement: 'can\'t' },
  { pattern: /couldn't/g, replacement: 'couldn\'t' },
  { pattern: /wouldn't/g, replacement: 'wouldn\'t' },
  { pattern: /shouldn't/g, replacement: 'shouldn\'t' },
  { pattern: /doesn't/g, replacement: 'doesn\'t' },
  { pattern: /hasn't/g, replacement: 'hasn\'t' },
  { pattern: /haven't/g, replacement: 'haven\'t' },
  { pattern: /wasn't/g, replacement: 'wasn\'t' },
  { pattern: /weren't/g, replacement: 'weren\'t' },
  { pattern: /isn't/g, replacement: 'isn\'t' },
  { pattern: /aren't/g, replacement: 'aren\'t' },
  
  // Common typos and grammar fixes
  { pattern: /\bteh\b/gi, replacement: 'the' },
  { pattern: /\bfrom\s+from\b/gi, replacement: 'from' }, // Remove duplicate "from"
  { pattern: /\bthe\s+the\b/gi, replacement: 'the' }, // Remove duplicate "the"
  { pattern: /\band\s+and\b/gi, replacement: 'and' }, // Remove duplicate "and"
  { pattern: /\bto\s+to\b/gi, replacement: 'to' }, // Remove duplicate "to"
  { pattern: /\bof\s+of\b/gi, replacement: 'of' }, // Remove duplicate "of"
  { pattern: /\bin\s+in\b/gi, replacement: 'in' }, // Remove duplicate "in"
  { pattern: /\bon\s+on\b/gi, replacement: 'on' }, // Remove duplicate "on"
  { pattern: /\bat\s+at\b/gi, replacement: 'at' }, // Remove duplicate "at"
  
  // Space fixes
  { pattern: /\s+\./g, replacement: '.' }, // Remove space before period
  { pattern: /\s+,/g, replacement: ',' }, // Remove space before comma
  { pattern: /\s+:/g, replacement: ':' }, // Remove space before colon
  { pattern: /\s+;/g, replacement: ';' }, // Remove space before semicolon
  { pattern: /\s+!/g, replacement: '!' }, // Remove space before exclamation
  { pattern: /\s+\?/g, replacement: '?' }, // Remove space before question mark
  
  // Double space fixes
  { pattern: /\s{2,}/g, replacement: ' ' }, // Multiple spaces to single space
  
  // Sentence case after periods
  { pattern: /\.\s+([a-z])/g, replacement: (match, p1) => '. ' + p1.toUpperCase() },
  
  // Common technical writing fixes
  { pattern: /\bweb site\b/gi, replacement: 'website' },
  { pattern: /\be-mail\b/gi, replacement: 'email' },
  { pattern: /\blog in\b/gi, replacement: 'log in' }, // verb form
  { pattern: /\blogin\b/gi, replacement: 'login' }, // noun form when appropriate
  { pattern: /\bsetup\b/gi, replacement: 'setup' }, // noun
  { pattern: /\bset up\b/gi, replacement: 'set up' }, // verb
  
  // Technology-specific corrections
  { pattern: /\bjavascript\b/gi, replacement: 'JavaScript' },
  { pattern: /\btypescript\b/gi, replacement: 'TypeScript' },
  { pattern: /\bmicrosoft\b/gi, replacement: 'Microsoft' },
  { pattern: /\bazure\b/gi, replacement: 'Azure' },
  { pattern: /\bgithub\b/gi, replacement: 'GitHub' },
  { pattern: /\bgit hub\b/gi, replacement: 'GitHub' },
  { pattern: /\bnode\.js\b/gi, replacement: 'Node.js' },
  { pattern: /\breact\.js\b/gi, replacement: 'React.js' },
  { pattern: /\bangular\.js\b/gi, replacement: 'Angular.js' },
  { pattern: /\bvs code\b/gi, replacement: 'VS Code' },
  { pattern: /\bvisual studio code\b/gi, replacement: 'Visual Studio Code' },
];

// Articles and prepositions that should often be lowercase in titles
const titleCaseExceptions = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'];

function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt, index) => {
    // Always capitalize first word and words that aren't in exceptions
    if (index === 0 || !titleCaseExceptions.includes(txt.toLowerCase())) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
    return txt.toLowerCase();
  });
}

function correctGrammar(content) {
  let corrected = content;
  
  // Apply grammar rules
  for (const rule of grammarRules) {
    corrected = corrected.replace(rule.pattern, rule.replacement);
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
    
    // Correct grammar in the markdown content (not frontmatter)
    const correctedContent = correctGrammar(markdownContent);
    
    // Reconstruct the file
    const newContent = `---${frontmatter}---${correctedContent}`;
    
    // Only write if content changed
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
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile() && file.endsWith('.md')) {
      processMarkdownFile(filePath);
      processedCount++;
    }
  }
  
  console.log(`\nProcessed ${processedCount} markdown files.`);
}

// Run the script
const contentDir = path.join(__dirname, 'content');
if (fs.existsSync(contentDir)) {
  console.log('Starting grammar correction for blog posts...\n');
  processDirectory(contentDir);
  console.log('\nGrammar correction complete!');
} else {
  console.error('Content directory not found');
}