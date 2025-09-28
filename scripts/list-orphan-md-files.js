// list-orphan-md-files.js
// Usage: node scripts/list-orphan-md-files.js

const fs = require('fs');
const path = require('path');

// 1. Get all slugs from blogPosts array
const postsFile = path.join(__dirname, '../src/lib/posts.ts');
const postsSrc = fs.readFileSync(postsFile, 'utf8');
const slugRegex = /slug:\s*['"]([\w\-\.]+)['"]/g;
const slugs = new Set();
let match;
while ((match = slugRegex.exec(postsSrc)) !== null) {
  slugs.add(match[1].toLowerCase());
}

// 2. List all .md files in content/
const contentDir = path.join(__dirname, '../content');
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));

// 3. Compare filenames (without .md) to slugs
const orphans = files.filter(f => !slugs.has(f.replace(/\.md$/, '').toLowerCase()));

// 4. Output the orphan filenames
console.log('Orphan .md files (no matching blogPosts slug):');
orphans.forEach(f => console.log(f));
