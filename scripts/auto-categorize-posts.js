/**
 * Auto-Categorize Posts Script
 * 
 * This script automatically assigns categories to markdown posts based on:
 * 1. Keywords in title, description, and content
 * 2. Existing tags
 * 3. File naming patterns
 * 
 * Usage:
 *   node scripts/auto-categorize-posts.js [--dry-run] [--file=filename.md]
 * 
 * Options:
 *   --dry-run    Show what would be changed without modifying files
 *   --file       Process only a specific file
 *   --validate   Only validate categories, don't suggest new ones
 */

const fs = require('fs');
const path = require('path');

// Define valid categories (should match src/lib/categories.ts)
const VALID_CATEGORIES = {
  '.NET': {
    keywords: ['asp.net', 'aspnet', 'blazor', 'c#', 'csharp', 'visual basic', 'vb.net', 'winforms', '.net core', 'asp.net core'],
    titleKeywords: ['dotnet', '.net', 'asp.net', 'blazor', 'c#'],
    aliases: ['net', 'aspnet', 'blazor']
  },
  'Python': {
    keywords: ['python', 'django', 'flask', 'pandas', 'numpy', 'jupyter', 'notebook'],
    titleKeywords: ['python', 'jupyter'],
    aliases: ['py']
  },
  'Java': {
    keywords: ['java', 'spring', 'spring boot', 'j2ee', 'kotlin', 'maven', 'gradle'],
    titleKeywords: ['java', 'spring'],
    aliases: ['spring']
  },
  'SQL': {
    keywords: ['sql', 'mysql', 'postgresql', 'sqlserver', 'sqlite', 'sql server', 'database'],
    titleKeywords: ['sql', 'mysql', 'database'],
    aliases: ['mysql', 'postgresql', 'database']
  },
  'JavaScript': {
    keywords: ['javascript', 'node.js', 'nodejs', 'npm', 'electron', 'js', 'es6'],
    titleKeywords: ['javascript', 'node.js', 'npm'],
    aliases: ['js', 'nodejs', 'node']
  },
  'React': {
    keywords: ['react', 'reactjs', 'jsx', 'react native'],
    titleKeywords: ['react'],
    aliases: ['reactjs']
  },
  'Angular': {
    keywords: ['angular', 'angularjs', 'ng', 'ngrx', 'rxjs'],
    titleKeywords: ['angular', 'ngrx'],
    aliases: ['angularjs']
  },
  'TypeScript': {
    keywords: ['typescript', 'ts', 'tsx'],
    titleKeywords: ['typescript'],
    aliases: ['ts']
  },
  'PHP': {
    keywords: ['php', 'laravel', 'symfony', 'wordpress'],
    titleKeywords: ['php', 'laravel'],
    aliases: []
  },
  'Azure': {
    keywords: ['azure', 'azure ai', 'azure openai', 'azure functions', 'azure devops', 'azure storage', 'azure active directory'],
    titleKeywords: ['azure'],
    aliases: ['azureai', 'azureopenai']
  },
  'AWS': {
    keywords: ['aws', 'amazon web services', 'ec2', 'lambda', 'eks', 'ecs', 'fargate', 'api gateway'],
    titleKeywords: ['aws', 'amazon eks', 'amazon ecs', 'amazon fargate'],
    aliases: ['amazon']
  },
  'AI': {
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'openai', 'chatgpt', 'gpt', 'llm', 'neural', 'deep learning', 'tensorflow', 'pytorch', 'copilot', 'prompt', 'model context protocol', 'mcp'],
    titleKeywords: ['ai', 'machine learning', 'chatgpt', 'openai', 'llm', 'copilot'],
    aliases: ['machine learning', 'ml']
  },
  'Power Platform': {
    keywords: ['power platform', 'power apps', 'power automate', 'power bi', 'powerapps', 'powerautomate', 'dataverse', 'canvas app', 'model driven', 'power pages', 'powerpages', 'portal', 'basic form', 'list component'],
    titleKeywords: ['power apps', 'power automate', 'power platform', 'power pages', 'dataverse'],
    aliases: ['power-apps', 'powerapps', 'power-pages']
  },
  'Microsoft Dynamics': {
    keywords: ['dynamics', 'dynamics 365', 'dynamics365', 'crm', 'erp', 'microsoft dynamics'],
    titleKeywords: ['dynamics', 'dynamics 365'],
    aliases: ['dynamics365']
  },
  'Business Central': {
    // Very specific keywords focused on BC development only - avoid generic business terms
    keywords: ['al language', 'al code', 'al-go', 'codeunit', 'page extension', 'table extension', 'al extension', 'navision', 'bc extension', 'business central api', 'bc api'],
    titleKeywords: ['business central', 'bc (part', 'navision'],
    aliases: ['bc'],
    requireTitle: true  // Only suggest if title mentions it
  },
  'Microsoft 365': {
    keywords: ['microsoft 365', 'office 365', 'office365', 'sharepoint', 'teams', 'onedrive', 'outlook', 'graph', 'microsoft graph', 'syntex'],
    titleKeywords: ['microsoft 365', 'office 365', 'sharepoint', 'teams', 'syntex'],
    aliases: ['office365', 'sharepoint', 'teams']
  },
  'DevOps': {
    keywords: ['devops', 'ci/cd', 'continuous integration', 'deployment', 'docker', 'kubernetes', 'github actions', 'azure devops'],
    titleKeywords: ['devops', 'docker', 'kubernetes'],
    aliases: ['ci-cd', 'docker', 'kubernetes']
  },
  'IOT': {
    keywords: ['iot', 'internet of things', 'raspberry pi', 'arduino', 'sensors', 'edge', 'gingerbread house', 'raspi-config'],
    titleKeywords: ['iot', 'raspberry pi', 'internet of things', 'gingerbread'],
    aliases: ['raspberry-pi']
  },
  'Mobile': {
    keywords: ['mobile', 'ios', 'android', 'app', 'xcode', 'swift'],
    titleKeywords: ['mobile', 'ios', 'android', 'xcode'],
    aliases: ['ios', 'android']
  }
};

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const validateOnly = args.includes('--validate');
const specificFile = args.find(arg => arg.startsWith('--file='))?.split('=')[1];

// Parse frontmatter from markdown
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;

  const frontmatter = {};
  const frontmatterText = match[1];
  const body = match[2];

  // Parse each line
  const lines = frontmatterText.split(/\r?\n/);
  let currentKey = null;
  let currentValue = [];

  for (const line of lines) {
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);
    if (keyMatch) {
      // Save previous key-value if exists
      if (currentKey) {
        frontmatter[currentKey] = currentValue.length > 1 ? currentValue : currentValue[0] || '';
      }
      currentKey = keyMatch[1];
      const value = keyMatch[2].trim();
      
      // Handle arrays
      if (value === '[]') {
        currentValue = [];
      } else if (value.startsWith('[')) {
        // Inline array like ["TypeScript","AI"]
        const arrayMatch = value.match(/\[(.*)\]/);
        if (arrayMatch) {
          currentValue = arrayMatch[1]
            .split(',')
            .map(v => v.trim().replace(/^["']|["']$/g, ''))
            .filter(v => v);
        } else {
          currentValue = [];
        }
      } else if (value.startsWith('"') || value.startsWith("'")) {
        currentValue = [value.replace(/^["']|["']$/g, '')];
      } else if (value) {
        currentValue = [value];
      } else {
        currentValue = [];
      }
    } else if (line.trim().startsWith('-')) {
      // Array item
      const item = line.trim().substring(1).trim().replace(/^["']|["']$/g, '');
      if (item) currentValue.push(item);
    }
  }

  // Save last key-value
  if (currentKey) {
    frontmatter[currentKey] = currentValue.length > 1 ? currentValue : currentValue[0] || '';
  }

  return { frontmatter, body };
}

// Convert frontmatter object back to text
function stringifyFrontmatter(frontmatter) {
  let result = '---\n';
  
  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        result += `${key}: []\n`;
      } else {
        // Use inline array format like the original files
        result += `${key}: [${value.map(v => `"${v}"`).join(',')}]\n`;
      }
    } else if (typeof value === 'string') {
      result += `${key}: "${value}"\n`;
    } else if (typeof value === 'boolean') {
      result += `${key}: ${value}\n`;
    } else {
      result += `${key}: ${value}\n`;
    }
  }
  
  result += '---\n';
  return result;
}

// Suggest categories based on content with prioritization
function suggestCategories(frontmatter, body, filename) {
  const suggestions = new Map(); // Use Map to track scores
  
  const title = (frontmatter.title || '').toLowerCase();
  const description = (frontmatter.description || '').toLowerCase();
  const bodyStart = body.substring(0, 2000).toLowerCase(); // First 2000 chars
  const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [frontmatter.tags].filter(Boolean);
  const filenameLC = filename.toLowerCase();

  // Check each category's keywords with weighted scoring
  for (const [category, config] of Object.entries(VALID_CATEGORIES)) {
    let score = 0;
    let hasTitleMatch = false;

    // Title matches are most important (weight: 10)
    for (const keyword of config.titleKeywords || config.keywords) {
      if (title.includes(keyword.toLowerCase())) {
        score += 10;
        hasTitleMatch = true;
        break;
      }
    }

    // Skip categories that require title match if no title match found
    if (config.requireTitle && !hasTitleMatch) {
      continue;
    }

    // Description matches (weight: 5)
    for (const keyword of config.keywords) {
      if (description.includes(keyword.toLowerCase())) {
        score += 5;
        break;
      }
    }

    // Filename matches (weight: 8)
    for (const keyword of config.keywords) {
      if (filenameLC.includes(keyword.toLowerCase())) {
        score += 8;
        break;
      }
    }

    // Body content matches (weight: 2) - less important to avoid false positives
    let bodyMatches = 0;
    for (const keyword of config.keywords) {
      const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const matches = (bodyStart.match(regex) || []).length;
      bodyMatches += matches;
    }
    if (bodyMatches > 0) {
      score += Math.min(bodyMatches * 2, 6); // Cap at 6 points from body
    }

    // Tag matches (weight: 3)
    for (const tag of tags) {
      for (const keyword of config.keywords) {
        if (tag.toLowerCase().includes(keyword.toLowerCase())) {
          score += 3;
          break;
        }
      }
    }

    if (score > 0) {
      suggestions.set(category, score);
    }
  }

  // Sort by score and return top categories (minimum score threshold: 8)
  const sorted = Array.from(suggestions.entries())
    .filter(([_, score]) => score >= 8)
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category);

  // Limit to top 3 categories to avoid over-classification
  return sorted.slice(0, 3);
}

// Validate existing categories
function validateCategories(categories) {
  if (!categories) return { valid: [], invalid: [] };
  
  const categoryArray = Array.isArray(categories) ? categories : [categories];
  const valid = [];
  const invalid = [];

  for (const cat of categoryArray) {
    if (VALID_CATEGORIES[cat]) {
      valid.push(cat);
    } else {
      // Check if it matches any alias
      let found = false;
      for (const [validCat, config] of Object.entries(VALID_CATEGORIES)) {
        if (config.aliases.includes(cat.toLowerCase())) {
          valid.push(validCat);
          found = true;
          break;
        }
      }
      if (!found) {
        invalid.push(cat);
      }
    }
  }

  return { valid: [...new Set(valid)], invalid };
}

// Process a single file
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = parseFrontmatter(content);
  
  if (!parsed) {
    console.log(`⚠️  ${path.basename(filePath)}: No frontmatter found`);
    return;
  }

  const { frontmatter, body } = parsed;
  const filename = path.basename(filePath, '.md');

  // Validate existing categories
  const { valid, invalid } = validateCategories(frontmatter.categories);

  // Suggest new categories
  const suggested = suggestCategories(frontmatter, body, filename);
  
  // Combine: keep valid, add suggested (avoid duplicates)
  const existingSet = new Set(valid);
  const newCategories = [...valid];
  
  for (const cat of suggested) {
    if (!existingSet.has(cat)) {
      newCategories.push(cat);
      existingSet.add(cat);
    }
  }

  // Check if there are changes
  const currentCategories = Array.isArray(frontmatter.categories) 
    ? frontmatter.categories 
    : frontmatter.categories ? [frontmatter.categories] : [];
  
  const hasChanges = invalid.length > 0 || 
                     newCategories.length !== currentCategories.length ||
                     !newCategories.every(cat => currentCategories.includes(cat));

  if (validateOnly) {
    if (invalid.length > 0) {
      console.log(`❌ ${path.basename(filePath)}:`);
      console.log(`   Invalid categories: ${invalid.join(', ')}`);
      console.log(`   Valid categories: ${valid.join(', ')}`);
    } else if (currentCategories.length === 0) {
      console.log(`⚠️  ${path.basename(filePath)}: No categories`);
    } else {
      console.log(`✅ ${path.basename(filePath)}: All categories valid`);
    }
    return;
  }

  if (hasChanges) {
    console.log(`\n📝 ${path.basename(filePath)}:`);
    console.log(`   Current: [${currentCategories.join(', ') || 'none'}]`);
    if (invalid.length > 0) {
      console.log(`   ❌ Invalid: [${invalid.join(', ')}]`);
    }
    console.log(`   ✨ Suggested: [${newCategories.join(', ')}]`);

    if (!isDryRun) {
      // Update the frontmatter
      frontmatter.categories = newCategories;
      const newContent = stringifyFrontmatter(frontmatter) + body;
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`   ✅ Updated!`);
    } else {
      console.log(`   [DRY RUN - no changes made]`);
    }
  } else {
    console.log(`✅ ${path.basename(filePath)}: Up to date [${currentCategories.join(', ')}]`);
  }
}

// Main execution
function main() {
  const contentDir = path.join(__dirname, '../content');
  
  console.log('🚀 Auto-Categorize Posts Script');
  console.log('================================\n');
  
  if (isDryRun) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
  }
  
  if (validateOnly) {
    console.log('✓ VALIDATE ONLY MODE - Only checking existing categories\n');
  }

  if (specificFile) {
    const filePath = path.join(contentDir, specificFile);
    if (fs.existsSync(filePath)) {
      processFile(filePath);
    } else {
      console.error(`❌ File not found: ${specificFile}`);
    }
  } else {
    const files = fs.readdirSync(contentDir)
      .filter(file => file.endsWith('.md'))
      .sort();

    console.log(`📁 Processing ${files.length} markdown files...\n`);

    for (const file of files) {
      processFile(path.join(contentDir, file));
    }
  }

  console.log('\n✨ Done!');
}

main();
