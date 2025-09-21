#!/usr/bin/env python3
"""
Add Microsoft Dynamics category to all Business Central posts.

This ensures Business Central posts appear in both:
- Business Central category (specific)
- Microsoft Dynamics category (broader category)

But Microsoft Dynamics posts without Business Central won't appear in Business Central category.
"""

import re

def add_dynamics_to_business_central_posts():
    """Add Microsoft Dynamics category to all posts that have Business Central category"""
    
    posts_path = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    
    with open(posts_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all posts with Business Central category
    # Pattern to match categories arrays containing "Business Central"
    pattern = r'(categories:\s*\[)([^\]]*"Business Central"[^\]]*?)(\])'
    
    changes_made = 0
    
    def replace_categories(match):
        nonlocal changes_made
        
        prefix = match.group(1)
        categories_content = match.group(2)
        suffix = match.group(3)
        
        # Check if Microsoft Dynamics is already included
        if '"Microsoft Dynamics"' not in categories_content:
            # Parse existing categories
            categories_items = [item.strip() for item in categories_content.split(',') if item.strip()]
            
            # Add Microsoft Dynamics to the beginning (so it appears first)
            categories_items.insert(0, '"Microsoft Dynamics"')
            
            # Rebuild categories string
            new_categories = ', '.join(categories_items)
            
            changes_made += 1
            
            # Extract slug for logging
            # Look backwards to find the slug
            before_match = content[:match.start()]
            slug_match = re.search(r"slug:\s*['\"]([^'\"]*)['\"](?:[^{]*?$)", before_match)
            slug = slug_match.group(1) if slug_match else "unknown"
            
            print(f"✅ {slug}: Added 'Microsoft Dynamics' to Business Central post")
            
            return prefix + new_categories + suffix
        else:
            # Already has both categories
            return match.group(0)
    
    # Apply the replacement
    new_content = re.sub(pattern, replace_categories, content)
    
    if changes_made > 0:
        # Write back to file
        with open(posts_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"\n🎉 Successfully added Microsoft Dynamics category to {changes_made} Business Central posts")
        print("📋 Now Business Central posts will appear in both categories:")
        print("   • Business Central category: Business Central specific content")
        print("   • Microsoft Dynamics category: All Dynamics 365 content including Business Central")
    else:
        print("\n📝 All Business Central posts already have Microsoft Dynamics category")
    
    return changes_made

if __name__ == "__main__":
    print("🔗 Adding Microsoft Dynamics category to Business Central posts...")
    print("📝 This ensures Business Central posts appear in both categories\n")
    
    changes = add_dynamics_to_business_central_posts()
    print(f"\n🏁 Completed with {changes} changes")