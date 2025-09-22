#!/usr/bin/env python3
"""
Reset all posts to have empty categories and tags arrays.
This will clear all automated classifications and manual tags.
"""

import re
import os

def reset_all_posts():
    """Reset all posts to have empty categories and tags"""
    
    posts_file = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    
    # Create backup first
    backup_file = posts_file + '.backup-reset'
    
    with open(posts_file, 'r') as f:
        content = f.read()
    
    # Save backup
    with open(backup_file, 'w') as f:
        f.write(content)
    
    print(f"✅ Created backup: {backup_file}")
    
    # Reset all categories arrays to empty
    content = re.sub(
        r'categories: \[[^\]]*\]',
        'categories: []',
        content
    )
    
    # Reset all tags arrays to empty
    content = re.sub(
        r'tags: \[[^\]]*\]',
        'tags: []',
        content
    )
    
    # Write the updated content
    with open(posts_file, 'w') as f:
        f.write(content)
    
    # Count the number of posts affected
    post_count = len(re.findall(r'slug:', content))
    
    print(f"🎯 Reset {post_count} posts:")
    print("   - All categories set to: []")
    print("   - All tags set to: []")
    print(f"✅ Updated: {posts_file}")
    
    return True

def verify_reset():
    """Verify that all posts have been reset"""
    posts_file = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    
    with open(posts_file, 'r') as f:
        content = f.read()
    
    # Check for any non-empty categories
    non_empty_categories = re.findall(r'categories: \[([^\]]+)\]', content)
    non_empty_categories = [cat for cat in non_empty_categories if cat.strip()]
    
    # Check for any non-empty tags
    non_empty_tags = re.findall(r'tags: \[([^\]]+)\]', content)
    non_empty_tags = [tag for tag in non_empty_tags if tag.strip()]
    
    print(f"\n🔍 Verification Results:")
    print(f"   Non-empty categories found: {len(non_empty_categories)}")
    print(f"   Non-empty tags found: {len(non_empty_tags)}")
    
    if non_empty_categories:
        print("   ⚠️  Some categories were not cleared:")
        for cat in non_empty_categories[:5]:  # Show first 5
            print(f"      - [{cat}]")
    
    if non_empty_tags:
        print("   ⚠️  Some tags were not cleared:")
        for tag in non_empty_tags[:5]:  # Show first 5
            print(f"      - [{tag}]")
    
    if not non_empty_categories and not non_empty_tags:
        print("   ✅ All posts successfully reset to empty arrays!")
    
    return len(non_empty_categories) == 0 and len(non_empty_tags) == 0

if __name__ == "__main__":
    print("🧹 Resetting all posts to empty categories and tags...")
    print("⚠️  This will clear ALL automated classifications and manual tags!")
    
    reset_all_posts()
    verify_reset()
    
    print("\n📝 Next steps:")
    print("   1. Review the changes in posts.ts")
    print("   2. Run 'npm run build' to test")
    print("   3. If satisfied, commit the changes")
    print("   4. You can restore from backup if needed")