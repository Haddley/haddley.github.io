#!/usr/bin/env python3
"""
Manual fix for obvious Business Central-only posts that shouldn't be in Microsoft Dynamics category.
"""

def fix_business_central_specific_posts():
    """Remove Microsoft Dynamics from posts that are clearly Business Central specific"""
    
    posts_path = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    
    with open(posts_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Posts that should be Business Central ONLY (remove Microsoft Dynamics)
    bc_only_fixes = [
        # Business Central specific development/implementation posts
        ('mcpserver2', 'Business Central MCP Server Implementation'),
        ('blogcopilotstudio', 'Business Central Copilot Studio content'),
        ('customcopilotstudio', 'Custom Business Central Copilot'),
        ('customercopilotstudio', 'Customer Business Central Copilot'),
        ('businesscentralvirtualtable', 'Business Central Virtual Table'),
        ('businesscentralpowerautomateflow', 'Business Central Power Automate'),
        ('businesscentralmicrosoftgraph', 'Business Central Microsoft Graph'),
        ('businesscentralcanvasapps', 'Business Central Canvas Apps'),
        ('businesscentraladmincenter', 'Business Central Admin Center'),
        ('al-go-pte', 'AL-Go Per Tenant Extension'),
        ('rewardsextension', 'Business Central Extension Development'),
        ('mapextension', 'Business Central Map Extension'),
        ('addapurchaseorder', 'Business Central Purchase Order'),
        ('addanitem', 'Business Central Item Management'),
        ('vendorpostinggroup', 'Business Central Vendor Posting'),
        ('generalledger', 'Business Central General Ledger'),
        ('financialoperationspurchaseinvoice', 'Business Central Purchase Invoice'),
        ('warehousemanagementputaway', 'Business Central Warehouse Management'),
        # Integration posts that are BC specific
        ('createactionbasedonaflow', 'Business Central Flow Action'),
        ('hands-on-lab3.1', 'Business Central Hands-on Lab'),
        ('hands-on-lab2.1', 'Business Central Hands-on Lab'),
    ]
    
    changes_made = 0
    
    for slug, description in bc_only_fixes:
        # Pattern to match the specific post and its categories
        pattern = rf'(slug:\s*[\'\"]{slug}[\'\"],[^}}]*categories:\s*\[)([^\]]*?)(\])'
        match = re.search(pattern, content, re.DOTALL)
        
        if match:
            prefix = match.group(1)
            categories_content = match.group(2)
            suffix = match.group(3)
            
            # Check if it has Microsoft Dynamics
            if '"Microsoft Dynamics"' in categories_content:
                # Remove Microsoft Dynamics from categories
                categories_items = [item.strip() for item in categories_content.split(',')]
                filtered_items = [item for item in categories_items if '"Microsoft Dynamics"' not in item]
                
                # Make sure Business Central is included
                has_bc = any('"Business Central"' in item for item in filtered_items)
                if not has_bc:
                    filtered_items.append('"Business Central"')
                
                new_categories = ', '.join(filtered_items)
                new_section = prefix + new_categories + suffix
                
                # Replace in content
                old_section = match.group(0)
                content = content.replace(old_section, new_section)
                
                print(f"✅ Fixed {slug}: Removed 'Microsoft Dynamics', ensured 'Business Central'")
                changes_made += 1
    
    if changes_made > 0:
        with open(posts_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"\n🎉 Successfully fixed {changes_made} Business Central posts")
    else:
        print("\n📝 No changes needed")
    
    return changes_made

if __name__ == "__main__":
    import re
    print("🔧 Fixing Business Central category specificity...")
    changes = fix_business_central_specific_posts()
    print(f"🏁 Completed with {changes} changes")