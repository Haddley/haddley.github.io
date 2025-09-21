#!/usr/bin/env python3
"""
Simple and safe fix for Business Central category overlap.
Only remove Microsoft Dynamics from specific Business Central posts.
"""

import re

def fix_specific_posts():
    """Fix specific posts that should only be Business Central"""
    
    posts_path = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    
    # Read the file
    with open(posts_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Define posts that should be Business Central only (not general Microsoft Dynamics)
    bc_only_posts = [
        'businesscentraladmincenter',
        'businesscentralcanvasapps', 
        'businesscentralmicrosoftgraph',
        'businesscentralpowerautomateflow',
        'businesscentralvirtualtable',
        'al-go-pte',
        'rewardsextension',
        'mapextension',
        'addapurchaseorder',
        'addanitem',
        'vendorpostinggroup',
        'generalledger',
        'financialoperationspurchaseinvoice',
        'warehousemanagementputaway'
    ]
    
    changes_made = 0
    
    for post_slug in bc_only_posts:
        # Find the post entry
        post_pattern = rf"slug:\s*['\"]({post_slug})['\"],.*?categories:\s*\[(.*?)\]"
        
        match = re.search(post_pattern, content, re.DOTALL)
        if match:
            categories_section = match.group(2)
            
            # Check if it has both Microsoft Dynamics and needs Business Central
            if '"Microsoft Dynamics"' in categories_section:
                # Replace Microsoft Dynamics with Business Central in this specific post
                if '"Business Central"' not in categories_section:
                    # Replace Microsoft Dynamics with Business Central
                    new_categories = categories_section.replace('"Microsoft Dynamics"', '"Business Central"')
                    print(f"🔄 {post_slug}: Replaced 'Microsoft Dynamics' with 'Business Central'")
                else:
                    # Remove Microsoft Dynamics since Business Central is already there
                    # First split by commas to handle properly
                    items = [item.strip() for item in categories_section.split(',')]
                    items = [item for item in items if '"Microsoft Dynamics"' not in item]
                    new_categories = ', '.join(items)
                    print(f"🗑️ {post_slug}: Removed 'Microsoft Dynamics', kept 'Business Central'")
                
                # Replace in the content
                old_categories_section = f"categories: [{categories_section}]"
                new_categories_section = f"categories: [{new_categories}]"
                content = content.replace(old_categories_section, new_categories_section)
                changes_made += 1
    
    # Write back to file
    if changes_made > 0:
        with open(posts_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"\n✅ Made {changes_made} fixes and updated posts.ts")
    else:
        print("\n📝 No changes needed")

if __name__ == "__main__":
    print("🔧 Fixing specific Business Central category overlaps...")
    fix_specific_posts()
    print("🎉 Done!")