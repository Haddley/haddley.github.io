#!/usr/bin/env python3
"""
Detailed analysis of specific classification issues
"""

import re
import os

def get_detailed_issues():
    """Get detailed breakdown of classification issues"""
    
    posts_path = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    content_dir = "/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/content"
    
    with open(posts_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("🔍 Detailed Classification Issues Analysis")
    print("=" * 50)
    
    # 1. Find posts with no categories
    print("\n1️⃣ UNCATEGORIZED POSTS:")
    uncategorized = []
    post_entries = re.findall(r'{\s*slug:\s*[\'\"](.*?)[\'\"],.*?(?:categories:\s*\[(.*?)\]|tags:)', content, re.DOTALL)
    
    for match in post_entries:
        slug = match[0]
        categories_section = match[1] if len(match) > 1 else ""
        
        # Check if categories exist and are not empty
        if not categories_section or not re.search(r'["\'].*?["\']', categories_section):
            uncategorized.append(slug)
            
            # Check if file exists to suggest categories
            file_path = os.path.join(content_dir, f"{slug}.md")
            if os.path.exists(file_path):
                print(f"   📄 {slug} - File exists, needs categorization")
            else:
                print(f"   ❓ {slug} - File missing")
    
    print(f"   Total uncategorized: {len(uncategorized)}")
    
    # 2. Find over-categorized posts
    print("\n2️⃣ OVER-CATEGORIZED POSTS (5+ categories):")
    over_categorized = []
    
    for match in post_entries:
        slug = match[0]
        categories_section = match[1] if len(match) > 1 else ""
        
        if categories_section:
            categories = re.findall(r'["\']([^"\']*)["\']', categories_section)
            if len(categories) >= 5:
                over_categorized.append((slug, categories))
                print(f"   📦 {slug} ({len(categories)}): {categories}")
    
    print(f"   Total over-categorized: {len(over_categorized)}")
    
    # 3. Find Business Central hierarchy issues
    print("\n3️⃣ BUSINESS CENTRAL HIERARCHY ISSUES:")
    hierarchy_issues = []
    
    for match in post_entries:
        slug = match[0]
        categories_section = match[1] if len(match) > 1 else ""
        
        if categories_section:
            categories = re.findall(r'["\']([^"\']*)["\']', categories_section)
            
            # Business Central should also have Microsoft Dynamics
            if 'Business Central' in categories and 'Microsoft Dynamics' not in categories:
                hierarchy_issues.append(slug)
                print(f"   🔗 {slug}: Has 'Business Central' but missing 'Microsoft Dynamics'")
    
    print(f"   Total hierarchy issues: {len(hierarchy_issues)}")
    
    # 4. Find potential technology mismatches
    print("\n4️⃣ POTENTIAL TECHNOLOGY MISMATCHES:")
    
    # Check AI posts that might have unnecessary categories
    ai_posts_with_dynamics = []
    for match in post_entries:
        slug = match[0]
        categories_section = match[1] if len(match) > 1 else ""
        
        if categories_section:
            categories = re.findall(r'["\']([^"\']*)["\']', categories_section)
            
            # AI posts with Microsoft Dynamics but no Business Central
            if 'AI' in categories and 'Microsoft Dynamics' in categories and 'Business Central' not in categories:
                # Check if it's actually AI-focused
                file_path = os.path.join(content_dir, f"{slug}.md")
                if os.path.exists(file_path):
                    with open(file_path, 'r') as f:
                        file_content = f.read().lower()
                        if any(term in file_content for term in ['chatgpt', 'nlp', 'machine learning', 'artificial intelligence', 'neural network']):
                            ai_posts_with_dynamics.append(slug)
                            print(f"   🤖 {slug}: AI-focused but has Microsoft Dynamics")
    
    print(f"   Total AI/Dynamics mismatches: {len(ai_posts_with_dynamics)}")
    
    # 5. Summary recommendations
    print("\n5️⃣ SUMMARY & RECOMMENDATIONS:")
    print(f"   • {len(uncategorized)} posts need categories assigned")
    print(f"   • {len(over_categorized)} posts may be over-categorized (consider reducing)")
    print(f"   • {len(hierarchy_issues)} posts have Business Central hierarchy issues")
    print(f"   • {len(ai_posts_with_dynamics)} AI posts may have incorrect Dynamics classification")
    
    total_issues = len(uncategorized) + len(over_categorized) + len(hierarchy_issues) + len(ai_posts_with_dynamics)
    print(f"\n📊 Total issues to address: {total_issues}")
    
    return {
        'uncategorized': uncategorized,
        'over_categorized': over_categorized,
        'hierarchy_issues': hierarchy_issues,
        'ai_dynamics_mismatches': ai_posts_with_dynamics
    }

if __name__ == "__main__":
    issues = get_detailed_issues()