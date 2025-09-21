#!/usr/bin/env python3
"""
Apply the medium-confidence SQL classification fixes identified by the smart classifier.
"""

import re
import sys

def apply_sql_fixes():
    """Apply the recommended SQL category removals"""
    
    posts_file = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    
    # Read the current file
    with open(posts_file, 'r') as f:
        content = f.read()
    
    # Define the fixes to apply
    fixes = [
        {
            'slug': 'powerpages3',
            'old_categories': '["SQL", "Microsoft Dynamics", "Business Central"]',
            'new_categories': '["Microsoft Dynamics", "Business Central"]'
        },
        {
            'slug': 'powerpages2', 
            'old_categories': '["Microsoft Dynamics", "Microsoft 365", "Power Platform", "Business Central", "SQL"]',
            'new_categories': '["Microsoft Dynamics", "Power Platform", "Business Central"]'
        },
        {
            'slug': 'customizedefaultcanvas',
            'old_categories': '["Microsoft 365", "Power Platform"]',
            'new_categories': '["Power Platform"]'
        },
        {
            'slug': 'copilotembedcode',
            'old_categories': '["AI", "Power Platform"]',
            'new_categories': '["Power Platform"]'
        },
        {
            'slug': 'pluginactions',
            'old_categories': '["AI", "Power Platform", "SQL"]',
            'new_categories': '["Power Platform"]'
        }
    ]
    
    changes_made = 0
    
    for fix in fixes:
        # Find the post by slug and update its categories
        slug_pattern = rf"slug: '{re.escape(fix['slug'])}'"
        
        # Find the post block
        post_match = re.search(rf"(.*{slug_pattern}.*?)(\n\s*}},?)", content, re.DOTALL)
        
        if post_match:
            post_block = post_match.group(1)
            
            # Check if it has the old categories and replace them
            old_cats_escaped = re.escape(fix['old_categories'])
            if fix['old_categories'] in post_block:
                new_content = content.replace(
                    f"categories: {fix['old_categories']}", 
                    f"categories: {fix['new_categories']}"
                )
                
                if new_content != content:
                    content = new_content
                    changes_made += 1
                    print(f"✅ Fixed {fix['slug']}: removed SQL and redundant categories")
                else:
                    print(f"⚠️  No change made to {fix['slug']}")
            else:
                print(f"⚠️  Could not find expected categories for {fix['slug']}")
        else:
            print(f"❌ Could not find post {fix['slug']}")
    
    if changes_made > 0:
        # Write the updated content
        with open(posts_file, 'w') as f:
            f.write(content)
        
        print(f"\n🎉 Applied {changes_made} SQL classification fixes!")
        print("✅ Posts.ts updated successfully")
    else:
        print("\n⚠️  No changes were made")

if __name__ == "__main__":
    apply_sql_fixes()