#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const contentDir = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/content';

function analyzeCodeBlockIssues(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const issues = [];
  
  let inCodeBlock = false;
  let codeBlockLanguage = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Track code block state
    if (trimmedLine.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLanguage = trimmedLine.substring(3).trim();
      } else {
        inCodeBlock = false;
        codeBlockLanguage = '';
      }
      continue;
    }
    
    // Skip if we're already in a code block
    if (inCodeBlock) continue;
    
    // Check for various code patterns that should be in blocks
    
    // JavaScript/TypeScript imports
    if (trimmedLine.match(/^import\s+.*\s+from\s+['"].*['"];?\s*$/) ||
        trimmedLine.match(/^const\s+.*\s+=\s+require\(['"].*['"]\);?\s*$/)) {
      issues.push({
        line: i + 1,
        content: line,
        type: 'javascript_import',
        suggestion: 'Should be in ```javascript or ```typescript code block'
      });
    }
    
    // Python imports
    if (trimmedLine.match(/^(import\s+\w+|from\s+\w+.*import)/) && 
        !trimmedLine.includes('from the') && !trimmedLine.includes('import that')) {
      issues.push({
        line: i + 1,
        content: line,
        type: 'python_import',
        suggestion: 'Should be in ```python code block'
      });
    }
    
    // Function definitions
    if (trimmedLine.match(/^(def\s+\w+\(|function\s+\w+\(|const\s+\w+\s*=\s*\(|class\s+\w+)/) &&
        !trimmedLine.includes('function called') && !trimmedLine.includes('function that')) {
      issues.push({
        line: i + 1,
        content: line,
        type: 'function_definition',
        suggestion: 'Should be in appropriate language code block'
      });
    }
    
    // JSON-like objects
    if (trimmedLine.match(/^\s*[\{\[]/) && i + 1 < lines.length && 
        lines[i + 1].trim().match(/^\s*["']\w+["']\s*:/)) {
      issues.push({
        line: i + 1,
        content: line,
        type: 'json_object',
        suggestion: 'Should be in ```json code block'
      });
    }
    
    // XML/HTML tags
    if (trimmedLine.match(/^<[^>]+>/) && !trimmedLine.match(/^<.*>.*<\/.*>$/)) {
      issues.push({
        line: i + 1,
        content: line,
        type: 'xml_html',
        suggestion: 'Should be in ```xml or ```html code block'
      });
    }
    
    // SQL commands
    if (trimmedLine.match(/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\s+/i)) {
      issues.push({
        line: i + 1,
        content: line,
        type: 'sql_command',
        suggestion: 'Should be in ```sql code block'
      });
    }
    
    // CSS rules
    if (trimmedLine.match(/^[.#]?\w+[\w-]*\s*\{/) || 
        (trimmedLine.match(/^\w+[\w-]*\s*:/) && i + 1 < lines.length && 
         lines[i + 1].trim().match(/^\s*\w+[\w-]*\s*:/))) {
      issues.push({
        line: i + 1,
        content: line,
        type: 'css_rule',
        suggestion: 'Should be in ```css code block'
      });
    }
    
    // Command-line output (not commands starting with %)
    if (trimmedLine.match(/^[\w-]+@[\w-]+:/) || 
        trimmedLine.match(/^C:\\.*>/) ||
        trimmedLine.match(/^\$\s+/) ||
        (trimmedLine.match(/^npm\s+/) && !line.includes('npm install'))) {
      issues.push({
        line: i + 1,
        content: line,
        type: 'terminal_output',
        suggestion: 'Should be in ```bash or ```shell code block'
      });
    }
  }
  
  return issues;
}

function scanAllFiles() {
  const files = fs.readdirSync(contentDir);
  const fileIssues = {};
  
  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(contentDir, file);
      const issues = analyzeCodeBlockIssues(filePath);
      
      if (issues.length > 0) {
        fileIssues[file] = issues;
      }
    }
  }
  
  return fileIssues;
}

function printReport() {
  const allIssues = scanAllFiles();
  const fileCount = Object.keys(allIssues).length;
  
  console.log(`\n📊 Code Block Analysis Report`);
  console.log(`=====================================`);
  console.log(`Files analyzed: ${fs.readdirSync(contentDir).filter(f => f.endsWith('.md')).length}`);
  console.log(`Files with potential issues: ${fileCount}`);
  
  if (fileCount === 0) {
    console.log(`\n✅ No obvious code block issues found!`);
    return;
  }
  
  let totalIssues = 0;
  const issueTypes = {};
  
  Object.entries(allIssues).forEach(([filename, issues]) => {
    console.log(`\n📄 ${filename} (${issues.length} issue${issues.length > 1 ? 's' : ''})`);
    
    issues.forEach(issue => {
      console.log(`  Line ${issue.line}: ${issue.type}`);
      console.log(`    Content: ${issue.content.trim()}`);
      console.log(`    💡 ${issue.suggestion}`);
      
      totalIssues++;
      issueTypes[issue.type] = (issueTypes[issue.type] || 0) + 1;
    });
  });
  
  console.log(`\n📈 Issue Summary:`);
  console.log(`Total issues: ${totalIssues}`);
  Object.entries(issueTypes).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });
}

printReport();