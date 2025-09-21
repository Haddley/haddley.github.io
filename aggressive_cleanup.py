#!/usr/bin/env python3
"""
Aggressive cleanup of remaining false positives.
"""

import re

def aggressive_cleanup():
    """Aggressively fix remaining false positives"""
    
    posts_file = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    
    with open(posts_file, 'r') as f:
        content = f.read()
    
    # Define specific fixes for posts that are clearly misclassified
    specific_fixes = [
        # macscreensharing - Mac VNC/SSH setup, not Microsoft 365
        {
            'slug': 'macscreensharing',
            'correct_categories': '[]',
            'reason': 'Mac screen sharing/VNC/SSH setup - not Microsoft technology'
        },
        
        # phpsetup - PHP programming language setup, not Microsoft technologies
        {
            'slug': 'phpsetup', 
            'correct_categories': '["PHP"]',
            'reason': 'PHP setup - programming language, not Microsoft technologies'
        },
        
        # ollamadeepsekr1applemacbookinstall - AI model, not Microsoft Dynamics/Business Central
        {
            'slug': 'ollamadeepsekr1applemacbookinstall',
            'correct_categories': '["AI"]', 
            'reason': 'AI model installation - not Microsoft Dynamics/Business Central'
        }
    ]
    
    changes_made = 0
    
    for fix in specific_fixes:
        # Find the post block
        slug_pattern = rf"(slug: '{re.escape(fix['slug'])}'.*?categories: )\[[^\]]*\]"
        
        match = re.search(slug_pattern, content, re.DOTALL)
        if match:
            old_part = match.group(0)
            new_part = match.group(1) + fix['correct_categories']
            
            content = content.replace(old_part, new_part)
            changes_made += 1
            print(f"✅ Fixed {fix['slug']}: {fix['reason']}")
            print(f"   New categories: {fix['correct_categories']}")
        else:
            print(f"❌ Could not find {fix['slug']}")
    
    # Add PHP category if it doesn't exist
    if '"PHP"' not in content and 'phpsetup' in content:
        # We need to add PHP to the categories list if it doesn't exist
        print("ℹ️  PHP category may need to be added to categories.ts")
    
    if changes_made > 0:
        with open(posts_file, 'w') as f:
            f.write(content)
        
        print(f"\n🎉 Applied {changes_made} aggressive fixes!")
        return True
    else:
        print("\n⚠️  No changes were made")
        return False

def check_categories_file():
    """Check if we need to add new categories"""
    categories_file = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/categories.ts'
    
    try:
        with open(categories_file, 'r') as f:
            content = f.read()
        
        if '"PHP"' not in content:
            print("⚠️  PHP category not found in categories.ts - should be added")
            return False
        else:
            print("✅ PHP category exists in categories.ts")
            return True
    except FileNotFoundError:
        print("❌ categories.ts file not found")
        return False

if __name__ == "__main__":
    print("🚀 Aggressive false positive cleanup...")
    aggressive_cleanup()
    check_categories_file()