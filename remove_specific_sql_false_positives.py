#!/usr/bin/env python3
"""
Remove SQL from specific posts that are clearly false positives.
"""

import re

def remove_sql_from_specific_posts():
    """Remove SQL from specific posts that are clearly not SQL-related"""
    
    posts_file = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    
    # Read the current file
    with open(posts_file, 'r') as f:
        content = f.read()
    
    # Posts that are clearly NOT about SQL based on content analysis
    false_positives = [
        'dotnet-core-part2',    # .NET Core + Microsoft Graph
        'xcode2',               # XCode C++ OpenGL
        'ticktacktoe',          # Tic Tac Toe game
        'threejs',              # Three.js 3D graphics
        'ngrx',                 # NgRx state management
        'nextjs4',              # Next.js framework
        'devopsstarterazuredevops',  # Azure DevOps
        'promptflow3',          # AI Prompt Flow
        'spring-boot-4',        # Spring Boot (likely GraphQL/REST)
        'powerautomatereports', # Power Automate
        'mcpserver2',           # MCP Server
    ]
    
    changes_made = 0
    original_content = content
    
    for slug in false_positives:
        # Find the post entry for this slug
        slug_pattern = rf"(\s*{{\s*slug: '{re.escape(slug)}',.*?categories: )(\[[^\]]*\])(.*?\}},?)"
        
        match = re.search(slug_pattern, content, re.DOTALL)
        if match:
            prefix = match.group(1) 
            categories_str = match.group(2)
            suffix = match.group(3)
            
            # Parse categories and remove SQL
            try:
                # Extract category names
                cat_content = categories_str.strip('[]')
                categories = [cat.strip().strip('"') for cat in cat_content.split(',') if cat.strip()]
                
                if 'SQL' in categories:
                    categories.remove('SQL')
                    
                    # Rebuild categories array
                    if categories:
                        new_categories = '[' + ', '.join([f'"{cat}"' for cat in categories]) + ']'
                    else:
                        new_categories = '[]'
                    
                    # Replace the entire match
                    old_match = match.group(0)
                    new_match = prefix + new_categories + suffix
                    content = content.replace(old_match, new_match)
                    changes_made += 1
                    print(f"✅ Removed SQL from {slug}")
                else:
                    print(f"ℹ️  {slug} does not have SQL category")
                    
            except Exception as e:
                print(f"❌ Error processing {slug}: {e}")
        else:
            print(f"❌ Could not find post {slug}")
    
    if changes_made > 0:
        with open(posts_file, 'w') as f:
            f.write(content)
        print(f"\n🎉 Removed SQL from {changes_made} false positive posts!")
    else:
        print("\n⚠️  No changes were made")

if __name__ == "__main__":
    remove_sql_from_specific_posts()