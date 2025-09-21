#!/usr/bin/env python3

import os
import re

def read_frontmatter_and_content(file_path):
    """Read frontmatter and content from markdown file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if not content.startswith('---'):
        return None, content
    
    end_marker = content.find('---', 3)
    if end_marker == -1:
        return None, content
    
    frontmatter_text = content[3:end_marker].strip()
    body = content[end_marker + 3:].strip()
    
    return frontmatter_text, body

def should_be_business_central(frontmatter_text, body, filename):
    """Determine if a post should be categorized as Business Central"""
    bc_patterns = [
        r'\bbusiness\s+central\b',
        r'\bbusinesscentral\b', 
        r'\bdynamics\s+365\s+business\s+central\b',
        r'\bdynamics365\s+bc\b',
        r'\bd365\s+bc\b',
        r'\bbc\s+extension\b',
        r'\bal\s+code\b',
        r'\bal\s+language\b',
        r'\bpage\s+extension\b',
        r'\btable\s+extension\b',
        r'\bcodeunit\b',
        r'\bxmlport\b',
        r'\breport\s+extension\b',
        r'\bpermission\s+set\b',
        r'\bentitlement\b',
        r'\bprofile\b.*\brole\s+center\b',
        r'\bnavision\b',
        r'\bnav\s+development\b',
        r'\bbc\s+saas\b',
        r'\bbc\s+on\s+premises\b',
        r'\.al\b',  # AL file extension
        r'app\.json',
        r'launch\.json.*bc',
    ]
    
    # Filename patterns - files starting with "businesscentral"
    if filename.startswith('businesscentral'):
        return True
    
    # Check title and content
    title_match = re.search(r'title:\s*["\']?([^"\'\n]+)["\']?', frontmatter_text)
    title = title_match.group(1).lower() if title_match else ''
    
    tags_match = re.search(r'tags:\s*\[([^\]]+)\]', frontmatter_text)
    tags = tags_match.group(1).lower() if tags_match else ''
    
    # Check all text (first 1000 chars of body to avoid too much processing)
    all_text = f"{title} {tags} {body[:1000]}".lower()
    
    for pattern in bc_patterns:
        if re.search(pattern, all_text, re.IGNORECASE):
            return True
    
    return False

def classify_posts():
    """Classify posts and return Business Central posts"""
    content_dir = "/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/content"
    
    business_central_posts = []
    
    for filename in os.listdir(content_dir):
        if filename.endswith('.md'):
            file_path = os.path.join(content_dir, filename)
            
            frontmatter_text, body = read_frontmatter_and_content(file_path)
            if not frontmatter_text:
                continue
            
            slug = filename[:-3]  # Remove .md extension
            
            if should_be_business_central(frontmatter_text, body, filename):
                business_central_posts.append(slug)
                print(f"🏛️ Business Central: {filename}")
    
    print(f"\n📊 Summary:")
    print(f"Business Central posts: {len(business_central_posts)}")
    
    return business_central_posts

def update_posts_ts():
    """Update the posts.ts file with Business Central category"""
    posts_file = "/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts"
    
    # Get classifications
    business_central_posts = classify_posts()
    
    print(f"Found {len(business_central_posts)} Business Central posts")
    
    # Read the current posts.ts file
    with open(posts_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Track updates
    updates = []
    
    # Update Business Central posts
    for slug in business_central_posts:
        # Find the post entry and update its categories
        pattern = rf'(\{{\s*slug:\s*["\']?{re.escape(slug)}["\']?.*?categories:\s*)\[([^\]]*)\]'
        match = re.search(pattern, content, re.DOTALL)
        if match:
            current_categories = match.group(2)
            # Parse current categories
            categories = [cat.strip().strip('"').strip("'") for cat in current_categories.split(',') if cat.strip()]
            # Add Business Central if not already present
            if 'Business Central' not in categories:
                categories.append('Business Central')
            # Update the content
            new_categories = ', '.join([f'"{cat}"' for cat in categories])
            new_content = match.group(1) + f'[{new_categories}]'
            content = content.replace(match.group(0), new_content)
            updates.append(f"✅ Updated {slug}: Added Business Central category")
    
    # Write the updated content back
    with open(posts_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"\n📝 Made {len(updates)} updates:")
    for update in updates[:15]:  # Show first 15 updates
        print(f"  {update}")
    if len(updates) > 15:
        print(f"  ... and {len(updates) - 15} more")
    
    return len(updates)

if __name__ == "__main__":
    update_posts_ts()