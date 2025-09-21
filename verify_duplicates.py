#!/usr/bin/env python3
"""
Verify Duplicate Fix - Check if we successfully resolved the duplicate categories issue
"""

import re
import json

def check_duplicates():
    """Check for any remaining duplicate categories in posts"""
    
    posts_file = "/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts"
    
    with open(posts_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all categories arrays
    category_pattern = r'categories:\s*\[(.*?)\]'
    matches = re.findall(category_pattern, content, re.DOTALL)
    
    duplicates_found = 0
    posts_with_duplicates = []
    
    for i, categories_str in enumerate(matches):
        # Extract individual categories
        category_matches = re.findall(r'"([^"]+)"', categories_str)
        
        # Check for duplicates
        if len(category_matches) != len(set(category_matches)):
            duplicates_found += 1
            unique_cats = set(category_matches)
            duplicate_cats = [cat for cat in category_matches if category_matches.count(cat) > 1]
            posts_with_duplicates.append({
                'index': i,
                'categories': category_matches,
                'duplicates': list(set(duplicate_cats))
            })
    
    print("🔍 Duplicate Categories Check")
    print("=" * 40)
    print(f"📊 Total posts checked: {len(matches)}")
    print(f"🔄 Posts with duplicates: {duplicates_found}")
    
    if duplicates_found == 0:
        print("✅ SUCCESS: No duplicate categories found!")
        print("🎉 React key issue should be resolved")
    else:
        print("❌ ISSUE: Found posts with duplicate categories:")
        for post in posts_with_duplicates[:5]:  # Show first 5
            print(f"  Post {post['index']}: {post['duplicates']} (duplicated)")
        if len(posts_with_duplicates) > 5:
            print(f"  ... and {len(posts_with_duplicates) - 5} more")
    
    return duplicates_found == 0

if __name__ == "__main__":
    check_duplicates()