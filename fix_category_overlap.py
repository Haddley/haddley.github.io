#!/usr/bin/env python3
"""
Fix Business Central vs Microsoft Dynamics category overlap.

This script:
1. Identifies posts that have both "Microsoft Dynamics" and "Business Central" categories
2. Removes "Microsoft Dynamics" from posts that are specifically about Business Central
3. Keeps "Microsoft Dynamics" only for posts about general Dynamics 365 that aren't BC-specific
"""

import re
import os

def read_posts_file():
    """Read the posts.ts file"""
    posts_path = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    
    with open(posts_path, 'r', encoding='utf-8') as f:
        return f.read()

def is_business_central_specific(post_text):
    """
    Determine if a post is specifically about Business Central
    vs general Dynamics 365 content
    """
    # Patterns that indicate Business Central specific content
    bc_specific_patterns = [
        r'\bAL\b.*\b(language|code|extension|app)\b',
        r'\bbusiness\s*central\b.*\b(extension|development|customization|admin|api)\b',
        r'\bBC\b.*\b(development|extension|app|admin)\b',
        r'\bdynamics\s*365\s*business\s*central\b',
        r'\bmicrosoft\s*dynamics\s*365\s*business\s*central\b',
        r'\bnavision\b',
        r'\btable\s*extension\b',
        r'\bpage\s*extension\b',
        r'\bcodeunit\b',
        r'\bxml\s*port\b',
        r'\breport\s*extension\b',
        r'\bapp\.json\b',
        r'\blaunch\.json\b.*\bal\b',
        r'\bmanifest\b.*\bal\b',
        r'\bbc\s*container\b',
        r'\bbusiness\s*central\s*admin\s*center\b',
        r'\bbc\s*sandbox\b',
        r'\bper\s*tenant\s*extension\b',
        r'\bPTE\b',
        r'\bapp\s*source\s*cop\b',
        r'\bcode\s*cop\b',
        r'\bui\s*cop\b'
    ]
    
    # Convert to lowercase for pattern matching
    post_lower = post_text.lower()
    
    # Check if post contains BC-specific patterns
    for pattern in bc_specific_patterns:
        if re.search(pattern, post_lower, re.IGNORECASE):
            return True
    
    return False

def fix_category_overlap(content):
    """
    Fix posts that have both Microsoft Dynamics and Business Central categories
    """
    
    # Find all blog post entries
    post_pattern = r'(\s*{\s*\n(?:(?!\s*},?\s*\n\s*{|\s*\];)[\s\S])*?\s*}),?'
    posts = re.findall(post_pattern, content)
    
    fixed_posts = []
    changes_made = 0
    
    for post in posts:
        # Check if post has both categories
        if ('"Microsoft Dynamics"' in post and '"Business Central"' in post):
            
            # Determine if this is BC-specific content
            if is_business_central_specific(post):
                # Remove Microsoft Dynamics, keep Business Central
                
                # Pattern to match categories array with both categories
                categories_pattern = r'categories:\s*\[(.*?)\]'
                categories_match = re.search(categories_pattern, post, re.DOTALL)
                
                if categories_match:
                    categories_content = categories_match.group(1)
                    
                    # Remove "Microsoft Dynamics" from the array
                    # Handle various formats: with/without spaces, different quote styles
                    # First, let's split the categories and filter out Microsoft Dynamics
                    import json
                    
                    # Extract individual category items
                    category_items = re.findall(r'["\'][^"\']*["\']', categories_content)
                    
                    # Filter out Microsoft Dynamics
                    filtered_items = [item for item in category_items if 'Microsoft Dynamics' not in item]
                    
                    # Join them back with proper comma separation
                    updated_categories = ', '.join(filtered_items)
                    
                    # Replace the categories in the post
                    updated_post = post.replace(
                        f'categories: [{categories_content}]',
                        f'categories: [{updated_categories}]'
                    )
                    
                    # Extract slug for logging
                    slug_match = re.search(r"slug:\s*['\"]([^'\"]*)['\"]", updated_post)
                    slug = slug_match.group(1) if slug_match else "unknown"
                    
                    print(f"🔧 Fixed {slug}: Removed 'Microsoft Dynamics', kept 'Business Central'")
                    changes_made += 1
                    
                    fixed_posts.append(updated_post)
                else:
                    fixed_posts.append(post)
            else:
                # Keep both categories for general Dynamics content
                fixed_posts.append(post)
        else:
            # No overlap, keep as is
            fixed_posts.append(post)
    
    print(f"\n📊 Summary: Made {changes_made} category fixes")
    
    return fixed_posts

def update_posts_file(content, fixed_posts):
    """Update the posts.ts file with fixed categories"""
    
    # Reconstruct the file
    # Find the array start
    array_start = content.find('export const blogPosts: BlogPost[] = [')
    array_end = content.rfind('];')
    
    if array_start == -1 or array_end == -1:
        print("❌ Could not find posts array boundaries")
        return False
    
    # Build new content
    header = content[:array_start + len('export const blogPosts: BlogPost[] = [')]
    footer = content[array_end:]
    
    # Join the fixed posts
    posts_content = ',\n'.join(fixed_posts)
    
    new_content = header + '\n' + posts_content + '\n' + footer
    
    # Write back to file
    posts_path = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    
    try:
        with open(posts_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("✅ Successfully updated posts.ts")
        return True
    except Exception as e:
        print(f"❌ Error writing file: {e}")
        return False

def main():
    print("🔍 Analyzing Business Central vs Microsoft Dynamics category overlap...")
    
    # Read current posts
    content = read_posts_file()
    
    # Fix category overlaps
    fixed_posts = fix_category_overlap(content)
    
    # Update the file
    if fixed_posts:
        success = update_posts_file(content, fixed_posts)
        if success:
            print("\n🎉 Category cleanup completed successfully!")
        else:
            print("\n❌ Failed to update posts file")
    else:
        print("\n📝 No changes needed")

if __name__ == "__main__":
    main()