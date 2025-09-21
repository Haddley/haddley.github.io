#!/usr/bin/env python3
"""
Fix classification issues identified in the analysis.
Priority: 
1. Add categories to uncategorized posts
2. Fix over-categorization by reducing to most relevant categories
"""

import re
import os

def read_markdown_content(file_path):
    """Read markdown file content"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except:
        return ""

def suggest_categories_for_post(slug, content):
    """Suggest appropriate categories based on content analysis"""
    content_lower = content.lower()
    
    # Technology-specific patterns with priority
    suggestions = []
    
    # High confidence patterns
    if re.search(r'\bangular\b', content_lower):
        suggestions.extend(['JavaScript', 'Angular'])
    elif re.search(r'\breact\b', content_lower):
        suggestions.extend(['JavaScript', 'React'])
    elif re.search(r'\bvue\b', content_lower):
        suggestions.extend(['JavaScript'])
    
    if re.search(r'\bpython\b|\.py\b', content_lower):
        suggestions.append('Python')
    
    if re.search(r'\bc#\b|\.net\b|asp\.net\b|blazor\b', content_lower):
        suggestions.extend(['.NET'])
    
    if re.search(r'\bjava\b(?!\s*script)|spring\b', content_lower):
        suggestions.append('Java')
    
    if re.search(r'\btypescript\b|\.ts\b', content_lower):
        suggestions.append('TypeScript')
    
    # Microsoft technologies
    if re.search(r'\bazure\b', content_lower):
        suggestions.append('Azure')
    
    if re.search(r'\bpower\s*apps\b|power\s*automate\b|dataverse\b', content_lower):
        suggestions.append('Power Platform')
    
    if re.search(r'\bsharepoint\b|teams\b|office\s*365\b|microsoft\s*365\b', content_lower):
        suggestions.append('Microsoft 365')
    
    # AI/ML
    if re.search(r'\bai\b|artificial\s*intelligence\b|machine\s*learning\b|chatgpt\b|nlp\b', content_lower):
        suggestions.append('AI')
    
    # DevOps/Cloud
    if re.search(r'\bdocker\b|kubernetes\b|ci/cd\b|devops\b', content_lower):
        suggestions.append('DevOps')
    
    if re.search(r'\baws\b|cloud\b|serverless\b', content_lower):
        suggestions.append('Cloud')
    
    # IoT
    if re.search(r'\biot\b|raspberry\s*pi\b|arduino\b|3d\s*print', content_lower):
        suggestions.append('IOT')
    
    # Mobile
    if re.search(r'\bandroid\b|ios\b|mobile\b|ionic\b', content_lower):
        suggestions.append('Mobile')
    
    # Remove duplicates while preserving order
    seen = set()
    unique_suggestions = []
    for item in suggestions:
        if item not in seen:
            seen.add(item)
            unique_suggestions.append(item)
    
    # Limit to top 3 most relevant categories
    return unique_suggestions[:3] if unique_suggestions else ['AI']  # Default fallback

def fix_uncategorized_posts():
    """Add categories to posts that have none"""
    
    posts_path = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    content_dir = "/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/content"
    
    with open(posts_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Posts that need categorization
    uncategorized_posts = [
        'macscreensharing', 'phpsetup', 'llamacorp', 'colorization', 'stablediffusion',
        'applelaptop', '3dprinting2', '3dprinting1', 'ngrxentity', 'webxr', 'webvr',
        'npmcc', 'reactusestateuseeffect'
    ]
    
    changes_made = 0
    
    for slug in uncategorized_posts:
        # Read the markdown file to understand content
        md_path = os.path.join(content_dir, f"{slug}.md")
        if os.path.exists(md_path):
            md_content = read_markdown_content(md_path)
            suggested_cats = suggest_categories_for_post(slug, md_content)
            
            # Find the post entry and add categories
            pattern = rf'(slug:\s*[\'\"]{slug}[\'\"],[^}}]*?)(tags:)'
            match = re.search(pattern, content, re.DOTALL)
            
            if match:
                prefix = match.group(1)
                suffix = match.group(2)
                
                # Create categories array
                categories_str = ', '.join([f'"{cat}"' for cat in suggested_cats])
                new_section = f"{prefix}categories: [{categories_str}],\n    {suffix}"
                
                old_section = match.group(0)
                content = content.replace(old_section, new_section)
                
                print(f"✅ Added categories to {slug}: {suggested_cats}")
                changes_made += 1
    
    if changes_made > 0:
        with open(posts_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"\n🎉 Successfully categorized {changes_made} posts")
    
    return changes_made

def reduce_over_categorization():
    """Reduce categories for over-categorized posts"""
    
    posts_path = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    
    with open(posts_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Posts with too many categories - prioritize most relevant
    over_categorized_fixes = {
        'cloudflow': ['Power Platform', 'Business Central', 'Microsoft Dynamics'],
        'hands-on-lab3.1': ['Business Central', 'Microsoft Dynamics', 'Microsoft 365'],
        'angularfirebase': ['JavaScript', 'Angular', 'Cloud'],
        'angularandasp.net': ['.NET', 'JavaScript', 'Angular'],
        'ngrxdevtools': ['JavaScript', 'Angular', 'DevOps'],
        'leaflet': ['JavaScript', 'Azure'],
        'ionic': ['JavaScript', 'Mobile'],
        'nextjs1': ['JavaScript', 'React'],
        'sails1': ['JavaScript', 'Cloud'],
        'customconnectorsappregistrations': ['Power Platform', 'Microsoft 365', 'Azure'],
        'powerappswithrest': ['Power Platform', 'Microsoft 365'],
        'teamstoolkitspfx': ['Microsoft 365', 'JavaScript', 'React'],
        'devopsstartergithubactions': ['DevOps', 'Azure'],
        'azure-active-directory2': ['Azure', 'JavaScript'],
        'dotnet core part1': ['.NET', 'JavaScript'],
        'sharepointwebpart2': ['Microsoft 365', 'JavaScript'],
        'apigateway': ['Cloud', 'Azure', '.NET'],
        'restapiservice': ['.NET', 'JavaScript']
    }
    
    changes_made = 0
    
    for slug, new_categories in over_categorized_fixes.items():
        # Find and replace categories
        pattern = rf'(slug:\s*[\'\"]{slug}[\'\"],[^}}]*?categories:\s*\[)([^\]]*?)(\])'
        match = re.search(pattern, content, re.DOTALL)
        
        if match:
            prefix = match.group(1)
            suffix = match.group(3)
            
            # Create new categories string
            categories_str = ', '.join([f'"{cat}"' for cat in new_categories])
            new_section = f"{prefix}{categories_str}{suffix}"
            
            old_section = match.group(0)
            content = content.replace(old_section, new_section)
            
            print(f"🔧 Reduced categories for {slug}: {new_categories}")
            changes_made += 1
    
    if changes_made > 0:
        with open(posts_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"\n🎉 Successfully reduced categories for {changes_made} posts")
    
    return changes_made

if __name__ == "__main__":
    print("🔧 Fixing Classification Issues")
    print("=" * 40)
    
    print("\n1️⃣ Adding categories to uncategorized posts...")
    uncategorized_fixes = fix_uncategorized_posts()
    
    print(f"\n2️⃣ Reducing over-categorization...")
    over_cat_fixes = reduce_over_categorization()
    
    total_fixes = uncategorized_fixes + over_cat_fixes
    print(f"\n🏁 Total fixes applied: {total_fixes}")
    
    if total_fixes > 0:
        print("\n📋 Recommendations:")
        print("  • Run a build test to ensure no syntax errors")
        print("  • Review category pages to verify correct grouping")
        print("  • Consider running the classification checker again to verify improvements")