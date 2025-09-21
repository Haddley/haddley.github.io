#!/usr/bin/env python3
"""
Fix incorrect Microsoft Dynamics classification for pure AI/ML posts.

Remove "Microsoft Dynamics" from posts that are clearly AI/ML focused
and don't contain Business Central content.
"""

import re

def fix_ai_ml_misclassifications():
    """Remove Microsoft Dynamics from pure AI/ML posts"""
    
    posts_path = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    
    with open(posts_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Posts that are clearly AI/ML and should NOT have Microsoft Dynamics
    ai_ml_only_posts = [
        'sentencesimilarity',
        'sentimentanalysis', 
        'contextinjection',
        'langchain',
        # Add more as identified
    ]
    
    changes_made = 0
    
    for post_slug in ai_ml_only_posts:
        # Pattern to match the specific post and its categories
        pattern = rf'(slug:\s*[\'\"]{post_slug}[\'\"],[^}}]*categories:\s*\[)([^\]]*?)(\])'
        match = re.search(pattern, content, re.DOTALL)
        
        if match:
            prefix = match.group(1)
            categories_content = match.group(2)
            suffix = match.group(3)
            
            # Check if it has Microsoft Dynamics
            if '"Microsoft Dynamics"' in categories_content:
                # Parse existing categories
                categories_items = [item.strip() for item in categories_content.split(',') if item.strip()]
                
                # Remove Microsoft Dynamics
                filtered_items = [item for item in categories_items if '"Microsoft Dynamics"' not in item]
                
                # Ensure AI category is present
                has_ai = any('"AI"' in item for item in filtered_items)
                if not has_ai:
                    filtered_items.append('"AI"')
                
                new_categories = ', '.join(filtered_items)
                new_section = prefix + new_categories + suffix
                
                # Replace in content
                old_section = match.group(0)
                content = content.replace(old_section, new_section)
                
                print(f"✅ Fixed {post_slug}: Removed 'Microsoft Dynamics', kept/added 'AI'")
                changes_made += 1
    
    if changes_made > 0:
        with open(posts_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"\n🎉 Successfully fixed {changes_made} AI/ML posts")
        print("📋 These posts are now correctly classified as AI-only, not Microsoft Dynamics")
    else:
        print("\n📝 No changes needed")
    
    return changes_made

if __name__ == "__main__":
    print("🤖 Fixing AI/ML posts incorrectly classified as Microsoft Dynamics...")
    print("📝 Removing Microsoft Dynamics from pure AI/ML content\n")
    
    changes = fix_ai_ml_misclassifications()
    print(f"\n🏁 Completed with {changes} changes")