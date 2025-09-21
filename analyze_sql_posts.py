#!/usr/bin/env python3

import re
import sys
import os

def extract_posts_data():
    """Extract posts data from TypeScript file"""
    posts_file = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    
    with open(posts_file, 'r') as f:
        content = f.read()
    
    # Extract posts array using regex
    posts_match = re.search(r'export const posts: BlogPost\[\] = (\[.*?\]);', content, re.DOTALL)
    if not posts_match:
        print("Could not find posts array in TypeScript file")
        return []
    
    posts_str = posts_match.group(1)
    
    # Parse the TypeScript array manually
    posts = []
    current_post = {}
    in_post = False
    brace_count = 0
    
    lines = posts_str.split('\n')
    for line in lines:
        stripped = line.strip()
        
        if stripped.startswith('{'):
            in_post = True
            brace_count += stripped.count('{') - stripped.count('}')
            current_post = {}
        elif in_post:
            brace_count += stripped.count('{') - stripped.count('}')
            
            # Extract fields
            if ':' in stripped:
                if stripped.startswith('slug:'):
                    slug_match = re.search(r"slug:\s*['\"]([^'\"]+)['\"]", stripped)
                    if slug_match:
                        current_post['slug'] = slug_match.group(1)
                        
                elif stripped.startswith('title:'):
                    title_match = re.search(r"title:\s*['\"]([^'\"]+)['\"]", stripped)
                    if title_match:
                        current_post['title'] = title_match.group(1)
                        
                elif stripped.startswith('categories:'):
                    # Extract categories array
                    categories_match = re.search(r"categories:\s*\[(.*?)\]", stripped)
                    if categories_match:
                        categories_str = categories_match.group(1)
                        categories = [cat.strip().strip('\'"') for cat in categories_str.split(',') if cat.strip()]
                        current_post['categories'] = categories
            
            if brace_count == 0 and in_post:
                in_post = False
                if current_post:
                    posts.append(current_post)
                current_post = {}
    
    return posts

def analyze_sql_posts():
    """Analyze posts classified as SQL"""
    posts = extract_posts_data()
    
    sql_posts = [p for p in posts if 'SQL' in p.get('categories', [])]
    
    print(f"Found {len(sql_posts)} posts with SQL category:\n")
    
    # Read actual content to analyze if classification is correct
    for post in sql_posts:
        slug = post['slug']
        title = post['title']
        categories = post.get('categories', [])
        
        print(f"📄 {slug}")
        print(f"   Title: {title}")
        print(f"   Categories: {categories}")
        
        # Try to read the actual markdown content
        content_file = f'/Users/neilhaddley/Documents/GitHub/haddley.github.io/{slug}.md'
        if os.path.exists(content_file):
            with open(content_file, 'r') as f:
                content = f.read()[:500]  # First 500 chars
                
            # Look for actual SQL/database content
            sql_indicators = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE TABLE', 'ALTER TABLE', 
                            'JOIN', 'WHERE', 'GROUP BY', 'ORDER BY', 'database', 'query', 'schema']
            
            found_indicators = [ind for ind in sql_indicators if ind.lower() in content.lower()]
            
            if found_indicators:
                print(f"   ✅ SQL indicators found: {found_indicators[:3]}")
            else:
                print(f"   ❌ No clear SQL content found")
                # Show snippet to help identify false positive
                print(f"   Content preview: {content[:150]}...")
        else:
            print(f"   ⚠️  Content file not found: {content_file}")
        
        print()

if __name__ == "__main__":
    analyze_sql_posts()