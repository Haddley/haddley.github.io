#!/usr/bin/env python3
"""
Comprehensive cleanup of SQL false positives based on content analysis.
"""

import re
import os

def clean_sql_false_positives():
    """Remove SQL category from posts that are clearly not SQL-related"""
    
    posts_file = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    
    # Read the current file
    with open(posts_file, 'r') as f:
        content = f.read()
    
    # Define the clear false positives to fix
    false_positives = [
        # XCode posts - these are about iOS/Mac development with C++
        'xcode1',
        'xcode3', 
        'xcode4',
        
        # Prompt Flow - AI/ML content, not SQL
        'promptflow4',
        
        # Spring Boot GraphQL - about GraphQL, not SQL
        'spring-boot-5',
        
        # Three-tier architecture - could be about databases but likely general architecture
        # 'threetier',  # Let's check this one first
        
        # SharePoint - likely about SharePoint lists, not SQL databases  
        'sharepoint2019',
        
        # Teams Toolkit - Microsoft Teams development, not SQL
        'teamstoolkit',
    ]
    
    changes_made = 0
    
    for slug in false_positives:
        # Find the post by slug
        slug_pattern = rf"slug: '{re.escape(slug)}'"
        
        # Find the post block
        post_match = re.search(rf"(.*{slug_pattern}.*?)(\n\s*}},?)", content, re.DOTALL)
        
        if post_match:
            post_block = post_match.group(1)
            
            # Find the categories line and remove SQL from it
            categories_match = re.search(r'categories: (\[.*?\])', post_block)
            
            if categories_match:
                old_categories = categories_match.group(1)
                
                # Parse the categories array
                try:
                    # Convert to Python list format
                    categories_str = old_categories.replace('[', '').replace(']', '').replace('"', '')
                    categories = [cat.strip() for cat in categories_str.split(',') if cat.strip()]
                    
                    # Remove SQL if present
                    if 'SQL' in categories:
                        categories.remove('SQL')
                        
                        # Create new categories string
                        if categories:
                            new_categories = '[' + ', '.join([f'"{cat}"' for cat in categories]) + ']'
                        else:
                            new_categories = '[]'
                        
                        # Replace in content
                        old_line = f"categories: {old_categories}"
                        new_line = f"categories: {new_categories}"
                        
                        if old_line in content:
                            content = content.replace(old_line, new_line)
                            changes_made += 1
                            print(f"✅ Removed SQL from {slug}: {old_categories} -> {new_categories}")
                        else:
                            print(f"⚠️  Could not find exact categories line for {slug}")
                    else:
                        print(f"ℹ️  {slug} does not have SQL category")
                        
                except Exception as e:
                    print(f"❌ Error processing {slug}: {e}")
            else:
                print(f"❌ Could not find categories for {slug}")
        else:
            print(f"❌ Could not find post {slug}")
    
    if changes_made > 0:
        # Write the updated content
        with open(posts_file, 'w') as f:
            f.write(content)
        
        print(f"\n🎉 Removed SQL from {changes_made} false positive posts!")
        print("✅ Posts.ts updated successfully")
    else:
        print("\n⚠️  No changes were made")

def check_remaining_sql_posts():
    """Check what SQL posts remain after cleanup"""
    posts_file = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    
    with open(posts_file, 'r') as f:
        content = f.read()
    
    # Find all remaining SQL posts
    sql_matches = []
    for match in re.finditer(r'slug: \'([^\']+)\'.*?categories: (\[[^\]]*SQL[^\]]*\])', content, re.DOTALL):
        slug = match.group(1)
        categories = match.group(2)
        sql_matches.append((slug, categories))
    
    print(f"\n📊 Remaining posts with SQL category: {len(sql_matches)}")
    for slug, categories in sql_matches:
        print(f"  - {slug}: {categories}")

if __name__ == "__main__":
    print("🧹 Cleaning SQL false positives...")
    clean_sql_false_positives()
    check_remaining_sql_posts()