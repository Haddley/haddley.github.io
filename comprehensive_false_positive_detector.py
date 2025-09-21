#!/usr/bin/env python3
"""
Comprehensive False Positive Detection across all categories.
This script analyzes all posts and identifies likely misclassifications.
"""

import re
import os
from collections import defaultdict, Counter

def extract_posts_data():
    """Extract all posts from the TypeScript file"""
    posts_file = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    
    with open(posts_file, 'r') as f:
        content = f.read()
    
    # Find all posts with regex
    post_pattern = r'\{\s*slug:\s*[\'"]([^\'"]+)[\'"]\s*,\s*title:\s*[\'"]([^\'"]+)[\'"]\s*,.*?categories:\s*(\[[^\]]+\])'
    
    posts = []
    for match in re.finditer(post_pattern, content, re.DOTALL):
        slug = match.group(1)
        title = match.group(2)
        categories_str = match.group(3)
        
        # Parse categories
        categories = []
        for cat_match in re.finditer(r'[\'"]([^\'"]+)[\'"]', categories_str):
            categories.append(cat_match.group(1))
        
        posts.append({
            'slug': slug,
            'title': title,
            'categories': categories
        })
    
    return posts

def analyze_content_keywords(slug):
    """Analyze content file for technology keywords"""
    content_file = f'/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/content/{slug}.md'
    
    if not os.path.exists(content_file):
        return []
    
    try:
        with open(content_file, 'r', encoding='utf-8') as f:
            content = f.read().lower()
        
        # Define technology keywords for each category
        tech_patterns = {
            'AI': ['artificial intelligence', 'machine learning', 'neural network', 'openai', 'chatgpt', 'copilot', 'ai model', 'tensorflow', 'pytorch'],
            'Azure': ['azure', 'microsoft cloud', 'az cli', 'azure portal', 'azure functions', 'azure app service'],
            'React': ['react', 'jsx', 'usestate', 'useeffect', 'react component', 'react hook', 'create-react-app'],
            'JavaScript': ['javascript', 'nodejs', 'npm install', 'const ', 'let ', 'function(', '=>', 'console.log'],
            'Java': ['java', 'spring boot', 'maven', 'gradle', '@component', '@service', 'public class', 'import java'],
            '.NET': ['dotnet', '.net', 'c#', 'visual studio', 'nuget', 'asp.net', 'entity framework', 'using system'],
            'Python': ['python', 'pip install', 'import ', 'def ', 'class ', 'if __name__', 'print('],
            'SQL': ['select ', 'insert ', 'update ', 'delete ', 'create table', 'alter table', 'join ', 'where ', 'sql server', 'mysql', 'postgresql'],
            'Docker': ['docker', 'dockerfile', 'docker run', 'docker build', 'container', 'docker-compose'],
            'AWS': ['aws', 'amazon web services', 'ec2', 's3', 'lambda', 'cloudformation', 'boto3'],
            'Microsoft Dynamics': ['dynamics 365', 'business central', 'crm', 'dynamics crm', 'power apps', 'dataverse'],
            'Power Platform': ['power apps', 'power automate', 'power bi', 'power pages', 'dataverse', 'canvas app'],
            'Microsoft 365': ['microsoft 365', 'office 365', 'sharepoint', 'teams', 'outlook', 'onedrive', 'excel'],
            'IOT': ['iot', 'internet of things', 'raspberry pi', 'arduino', 'sensor', 'embedded'],
            'Mobile': ['mobile', 'ios', 'android', 'xamarin', 'react native', 'flutter', 'swift', 'kotlin'],
            'DevOps': ['devops', 'ci/cd', 'github actions', 'azure devops', 'jenkins', 'kubernetes', 'helm']
        }
        
        found_patterns = {}
        for category, patterns in tech_patterns.items():
            matches = []
            for pattern in patterns:
                if pattern in content:
                    matches.append(pattern)
            if matches:
                found_patterns[category] = matches
        
        return found_patterns
        
    except Exception as e:
        print(f"Error reading {content_file}: {e}")
        return []

def find_false_positives():
    """Find posts with category mismatches"""
    posts = extract_posts_data()
    false_positives = []
    
    print(f"🔍 Analyzing {len(posts)} posts for false positive classifications...")
    
    for i, post in enumerate(posts):
        if i % 20 == 0:
            print(f"   Progress: {i}/{len(posts)} posts analyzed")
        
        slug = post['slug']
        title = post['title']
        categories = post['categories']
        
        # Analyze content
        content_keywords = analyze_content_keywords(slug)
        
        # Check for mismatches
        mismatches = []
        for category in categories:
            if category not in content_keywords:
                mismatches.append(category)
        
        # Only report if there are significant mismatches
        if mismatches and len(mismatches) >= len(categories) / 2:
            false_positives.append({
                'slug': slug,
                'title': title,
                'categories': categories,
                'mismatches': mismatches,
                'content_suggests': list(content_keywords.keys())
            })
    
    return false_positives

def generate_comprehensive_report():
    """Generate a comprehensive false positive report"""
    posts = extract_posts_data()
    
    print("📊 Generating comprehensive classification analysis...")
    
    # Count categories
    all_categories = []
    for post in posts:
        all_categories.extend(post['categories'])
    
    category_counts = Counter(all_categories)
    
    print(f"\n📈 Category Distribution:")
    for category, count in category_counts.most_common():
        print(f"   {category}: {count} posts")
    
    # Find false positives
    false_positives = find_false_positives()
    
    print(f"\n🚨 Potential False Positives Found: {len(false_positives)}")
    
    for fp in false_positives[:10]:  # Show top 10
        print(f"\n❌ {fp['slug']}")
        print(f"   Title: {fp['title']}")
        print(f"   Current: {fp['categories']}")
        print(f"   Mismatched: {fp['mismatches']}")
        print(f"   Content suggests: {fp['content_suggests']}")
    
    if len(false_positives) > 10:
        print(f"\n... and {len(false_positives) - 10} more potential false positives")
    
    return false_positives

if __name__ == "__main__":
    generate_comprehensive_report()