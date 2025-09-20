#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const htmlDir = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/backup-20250921';
const mdDir = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/content';

// Language mapping from HTML classes to proper language identifiers
const languageMap = {
  'language-javascript': 'javascript',
  'language-yaml': 'yaml',
  'language-json': 'json',
  'language-python': 'python',
  'language-csharp': 'csharp',
  'language-bash': 'bash',
  'language-sql': 'sql',
  'language-html': 'html',
  'language-css': 'css',
  'language-typescript': 'typescript'
};

function extractCodeFromHTML(htmlContent) {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  
  const codeBlocks = [];
  const preElements = document.querySelectorAll('pre[class*="language-"]');
  
  preElements.forEach((pre, index) => {
    const codeElement = pre.querySelector('code');
    if (codeElement) {
      // Extract code from HTML comments
      const htmlContent = codeElement.innerHTML;
      const commentMatch = htmlContent.match(/<!--\s*([\s\S]*?)\s*-->/);
      
      if (commentMatch) {
        const code = commentMatch[1].trim();
        
        // Get language from class
        const className = pre.className;
        const languageClass = Object.keys(languageMap).find(cls => className.includes(cls));
        const language = languageClass ? languageMap[languageClass] : 'text';
        
        // Get title from previous h5 element
        const title = pre.closest('blockquote')?.querySelector('h5')?.textContent?.trim() || `Code Block ${index + 1}`;
        
        codeBlocks.push({
          title,
          language,
          code,
          index
        });
      }
    }
  });
  
  return codeBlocks;
}

function compareHtmlAndMarkdown(htmlFile, mdFile) {
  const htmlPath = path.join(htmlDir, htmlFile);
  const mdPath = path.join(mdDir, mdFile);
  
  if (!fs.existsSync(htmlPath) || !fs.existsSync(mdPath)) {
    return null;
  }
  
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  const mdContent = fs.readFileSync(mdPath, 'utf8');
  
  const htmlCodeBlocks = extractCodeFromHTML(htmlContent);
  
  // Count existing code blocks in markdown
  const mdCodeBlocks = (mdContent.match(/```[\s\S]*?```/g) || []).length;
  
  return {
    htmlFile,
    mdFile,
    htmlCodeBlocks: htmlCodeBlocks.length,
    mdCodeBlocks,
    codeBlocks: htmlCodeBlocks,
    needsUpdate: htmlCodeBlocks.length > mdCodeBlocks
  };
}

function findMissingCodeBlocks() {
  const htmlFiles = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));
  const results = [];
  
  for (const htmlFile of htmlFiles) {
    const baseName = path.basename(htmlFile, '.html');
    const mdFile = baseName + '.md';
    
    const comparison = compareHtmlAndMarkdown(htmlFile, mdFile);
    if (comparison && comparison.needsUpdate) {
      results.push(comparison);
    }
  }
  
  return results;
}

// Find files that need code blocks added
const missingCodeBlocks = findMissingCodeBlocks();

console.log('Files with missing code blocks:');
console.log('=================================');

missingCodeBlocks.forEach(result => {
  console.log(`\n${result.mdFile}:`);
  console.log(`  HTML has ${result.htmlCodeBlocks} code blocks`);
  console.log(`  Markdown has ${result.mdCodeBlocks} code blocks`);
  console.log(`  Missing: ${result.htmlCodeBlocks - result.mdCodeBlocks} code blocks`);
  
  if (result.codeBlocks.length > 0) {
    console.log('  Code blocks found:');
    result.codeBlocks.forEach((block, i) => {
      console.log(`    ${i + 1}. ${block.title} (${block.language})`);
      console.log(`       ${block.code.substring(0, 50)}...`);
    });
  }
});

console.log(`\nTotal files needing updates: ${missingCodeBlocks.length}`);

module.exports = { findMissingCodeBlocks, extractCodeFromHTML };