#!/usr/bin/env python3
"""
Targeted cleanup of obvious false positives identified by comprehensive analysis.
"""

import re
import os

def fix_obvious_false_positives():
    """Fix the most obvious false positive classifications"""
    
    posts_file = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    
    with open(posts_file, 'r') as f:
        content = f.read()
    
    # Define obvious false positive fixes
    fixes = [
        # macscreensharing - Apple macOS screen sharing, not TypeScript/AI/Angular
        {
            'slug': 'macscreensharing',
            'old_categories': '["TypeScript", "AI", "Angular"]',
            'new_categories': '[]',
            'reason': 'Apple macOS screen sharing post - not related to TypeScript, AI, or Angular'
        },
        
        # ollamadeepsekr1applemacbookinstall - AI model installation, not IOT/Mobile
        {
            'slug': 'ollamadeepsekr1applemacbookinstall', 
            'old_categories': '["AI"]',
            'new_categories': '["AI"]',
            'reason': 'Keep AI, this is about AI model installation'
        },
        
        # phpsetup - PHP setup, not AI
        {
            'slug': 'phpsetup',
            'old_categories': '["AI"]', 
            'new_categories': '[]',
            'reason': 'PHP setup post - not related to AI'
        },
        
        # MCP server posts - should be about development, not Business Central
        {
            'slug': 'mcpserver2',
            'old_categories': '["JavaScript", "Microsoft Dynamics", "Business Central", "TypeScript"]',
            'new_categories': '["JavaScript", "TypeScript"]',
            'reason': 'Model Context Protocol development - remove irrelevant Business Central/Dynamics'
        }
    ]
    
    changes_made = 0
    
    for fix in fixes:
        # Skip if this is just a verification entry
        if fix['old_categories'] == fix['new_categories']:
            continue
            
        # Find and replace the categories
        old_line = f"categories: {fix['old_categories']}"
        new_line = f"categories: {fix['new_categories']}"
        
        if old_line in content:
            content = content.replace(old_line, new_line)
            changes_made += 1
            print(f"✅ Fixed {fix['slug']}: {fix['reason']}")
            print(f"   {fix['old_categories']} → {fix['new_categories']}")
        else:
            print(f"⚠️  Could not find exact match for {fix['slug']}")
    
    # Additional pattern-based fixes for clear misclassifications
    pattern_fixes = [
        # Remove AI from posts that are clearly not AI-related
        {
            'pattern': r'(slug: \'php.*?\'.*?categories: \[)([^\]]*"AI"[^\]]*)\]',
            'replacement': lambda m: m.group(1) + re.sub(r'"AI",?\s*', '', m.group(2)).replace(', ]', ']').replace('[, ', '[') + ']',
            'description': 'Remove AI from PHP-related posts'
        }
    ]
    
    for pattern_fix in pattern_fixes:
        matches = list(re.finditer(pattern_fix['pattern'], content, re.DOTALL))
        for match in matches:
            old_text = match.group(0)
            new_text = pattern_fix['replacement'](match)
            if old_text != new_text:
                content = content.replace(old_text, new_text)
                changes_made += 1
                print(f"✅ Applied pattern fix: {pattern_fix['description']}")
    
    if changes_made > 0:
        with open(posts_file, 'w') as f:
            f.write(content)
        
        print(f"\n🎉 Applied {changes_made} false positive fixes!")
        return True
    else:
        print("\n⚠️  No changes were made")
        return False

def verify_specific_posts():
    """Verify specific posts that were identified as problematic"""
    
    problematic_posts = [
        'macscreensharing',
        'phpsetup', 
        'mcpserver2',
        'ollamadeepsekr1applemacbookinstall'
    ]
    
    posts_file = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    
    with open(posts_file, 'r') as f:
        content = f.read()
    
    print("\n🔍 Verifying problematic posts:")
    
    for slug in problematic_posts:
        # Find the post and its categories
        pattern = rf"slug: '{re.escape(slug)}'.*?categories: (\[[^\]]+\])"
        match = re.search(pattern, content, re.DOTALL)
        
        if match:
            categories = match.group(1)
            print(f"   {slug}: {categories}")
        else:
            print(f"   {slug}: NOT FOUND")

if __name__ == "__main__":
    print("🧹 Fixing obvious false positives...")
    fix_obvious_false_positives()
    verify_specific_posts()