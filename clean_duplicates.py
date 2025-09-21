#!/usr/bin/env python3
"""
Clean Duplicate Categories - Remove duplicate categories from posts.ts
"""

import re
import os

def clean_duplicate_categories():
    """Remove duplicate categories from all posts in posts.ts"""
    
    posts_file = "/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts"
    
    # Create backup
    backup_file = f"{posts_file}.backup"
    with open(posts_file, 'r', encoding='utf-8') as src:
        with open(backup_file, 'w', encoding='utf-8') as dst:
            dst.write(src.read())
    print(f"✅ Created backup: {backup_file}")
    
    # Read file
    with open(posts_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find and fix duplicate categories
    def fix_categories(match):
        categories_str = match.group(1)
        
        # Extract individual categories
        category_matches = re.findall(r'"([^"]+)"', categories_str)
        
        # Remove duplicates while preserving order
        seen = set()
        unique_categories = []
        for cat in category_matches:
            if cat not in seen:
                seen.add(cat)
                unique_categories.append(cat)
        
        # Rebuild categories string
        new_categories_str = ', '.join([f'"{cat}"' for cat in unique_categories])
        
        return f'categories: [{new_categories_str}]'
    
    # Replace all categories arrays
    original_content = content
    content = re.sub(
        r'categories:\s*\[(.*?)\]',
        fix_categories,
        content,
        flags=re.DOTALL
    )
    
    # Count changes
    original_matches = re.findall(r'Microsoft Dynamics.*Microsoft Dynamics', original_content)
    new_matches = re.findall(r'Microsoft Dynamics.*Microsoft Dynamics', content)
    
    duplicates_removed = len(original_matches) - len(new_matches)
    
    # Write back
    with open(posts_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"🔧 Removed duplicate categories from {duplicates_removed} posts")
    print(f"✅ Fixed posts.ts - no more duplicate categories")
    print(f"📁 Backup available at: {backup_file}")

if __name__ == "__main__":
    print("🧹 Cleaning Duplicate Categories")
    print("=" * 40)
    clean_duplicate_categories()