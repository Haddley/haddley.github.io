#!/usr/bin/env python3
"""
Comprehensive classification checker for all blog posts.
This script analyzes all posts and identifies potential misclassifications.
"""

import re
import os
from collections import defaultdict

def read_frontmatter_and_content(file_path):
    """Read frontmatter and content from markdown file"""
    try:
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
    except:
        return None, ""

def analyze_content_patterns(frontmatter_text, body, filename):
    """Analyze content to suggest appropriate categories"""
    
    # Combine all text for analysis
    all_text = f"{frontmatter_text} {body[:2000]}".lower()
    
    suggested_categories = set()
    confidence_scores = {}
    
    # Technology patterns with confidence scoring
    patterns = {
        # Programming Languages
        'JavaScript': [
            (r'\bjavascript\b', 3),
            (r'\bnode\.?js\b', 3),
            (r'\breact\b', 2),
            (r'\bangular\b', 2),
            (r'\bvue\b', 2),
            (r'\bnpm\b', 2),
            (r'\byarn\b', 2),
            (r'\.js\b', 1),
            (r'\bexpress\b', 2)
        ],
        'TypeScript': [
            (r'\btypescript\b', 3),
            (r'\.ts\b', 2),
            (r'\btsc\b', 2)
        ],
        'Python': [
            (r'\bpython\b', 3),
            (r'\bdjango\b', 3),
            (r'\bflask\b', 3),
            (r'\bpandas\b', 3),
            (r'\bnumpy\b', 3),
            (r'\bpip\b', 2),
            (r'\.py\b', 2)
        ],
        'C#': [
            (r'\bc#\b', 3),
            (r'\bcsharp\b', 3),
            (r'\b\.net\b', 2),
            (r'\basp\.net\b', 3),
            (r'\bblazor\b', 3)
        ],
        'Java': [
            (r'\bjava\b(?!\s*script)', 3),
            (r'\bspring\b', 3),
            (r'\bandroid\b', 2),
            (r'\bkotlin\b', 2)
        ],
        
        # Microsoft Technologies
        'Microsoft Dynamics': [
            (r'\bdynamics\s*365\b', 3),
            (r'\bmicrosoft\s*dynamics\b', 3),
            (r'\bcrm\b', 1),
            (r'\berp\b', 1)
        ],
        'Business Central': [
            (r'\bbusiness\s*central\b', 3),
            (r'\bbusinesscentral\b', 3),
            (r'\bbc\s*extension\b', 3),
            (r'\bal\s*code\b', 3),
            (r'\bal\s*language\b', 3),
            (r'\bnavision\b', 3),
            (r'\bpage\s*extension\b', 3),
            (r'\btable\s*extension\b', 3),
            (r'\bcodeunit\b', 3),
            (r'app\.json', 2),
            (r'launch\.json.*bc', 2)
        ],
        'Microsoft 365': [
            (r'\bmicrosoft\s*365\b', 3),
            (r'\boffice\s*365\b', 3),
            (r'\bsharepoint\b', 3),
            (r'\bteams\b', 2),
            (r'\bmicrosoft\s*graph\b', 3),
            (r'\bm365\b', 3)
        ],
        'Power Platform': [
            (r'\bpower\s*apps\b', 3),
            (r'\bpower\s*automate\b', 3),
            (r'\bpower\s*bi\b', 3),
            (r'\bdataverse\b', 3),
            (r'\bcanvas\s*app\b', 2),
            (r'\bmodel\s*driven\b', 2)
        ],
        
        # Other Technologies
        'AI': [
            (r'\bartificial\s*intelligence\b', 3),
            (r'\bmachine\s*learning\b', 3),
            (r'\bdeep\s*learning\b', 3),
            (r'\bneural\s*network\b', 3),
            (r'\bnlp\b', 3),
            (r'\bchatgpt\b', 3),
            (r'\bopen\s*ai\b', 3),
            (r'\bsentiment\s*analysis\b', 3),
            (r'\blangchain\b', 3),
            (r'\bllm\b', 2)
        ],
        'Azure': [
            (r'\bazure\b', 3),
            (r'\bapp\s*service\b', 2),
            (r'\bfunctions\b', 1),
            (r'\bcosmosdb\b', 3),
            (r'\bstorage\s*account\b', 2)
        ],
        'DevOps': [
            (r'\bdevops\b', 3),
            (r'\bci/cd\b', 3),
            (r'\bdocker\b', 3),
            (r'\bkubernetes\b', 3),
            (r'\bterraform\b', 3),
            (r'\bjenkins\b', 3),
            (r'\bgithub\s*actions\b', 3)
        ],
        'Cloud': [
            (r'\baws\b', 3),
            (r'\bserverless\b', 3),
            (r'\bmicroservices\b', 3),
            (r'\bcloud\s*computing\b', 3)
        ],
        'IOT': [
            (r'\biot\b', 3),
            (r'\braspberry\s*pi\b', 3),
            (r'\barduino\b', 3),
            (r'\bsensor\b', 2)
        ]
    }
    
    # Check filename patterns
    if filename.startswith('businesscentral'):
        suggested_categories.add('Business Central')
        confidence_scores['Business Central'] = 5
    
    # Analyze content
    for category, category_patterns in patterns.items():
        total_score = 0
        for pattern, weight in category_patterns:
            matches = len(re.findall(pattern, all_text, re.IGNORECASE))
            total_score += matches * weight
        
        if total_score > 0:
            suggested_categories.add(category)
            confidence_scores[category] = total_score
    
    return suggested_categories, confidence_scores

def get_current_posts_data():
    """Parse current posts.ts file to get current classifications"""
    posts_path = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    
    with open(posts_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract all blog post entries
    post_pattern = r'{\s*slug:\s*[\'\"](.*?)[\'\"],.*?categories:\s*\[(.*?)\]'
    posts_data = {}
    
    matches = re.findall(post_pattern, content, re.DOTALL)
    for slug, categories_str in matches:
        categories = []
        if categories_str.strip():
            # Extract categories from the array string
            cat_matches = re.findall(r'["\']([^"\']*)["\']', categories_str)
            categories = cat_matches
        posts_data[slug] = categories
    
    return posts_data

def check_all_classifications():
    """Check all post classifications and report issues"""
    
    print("🔍 Comprehensive Post Classification Check")
    print("=" * 50)
    
    content_dir = "/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/content"
    current_posts = get_current_posts_data()
    
    issues = []
    recommendations = []
    summary = defaultdict(int)
    
    # Check each markdown file
    for filename in sorted(os.listdir(content_dir)):
        if not filename.endswith('.md'):
            continue
            
        slug = filename[:-3]
        file_path = os.path.join(content_dir, filename)
        
        frontmatter_text, body = read_frontmatter_and_content(file_path)
        if not frontmatter_text:
            continue
        
        # Get current categories
        current_categories = current_posts.get(slug, [])
        
        # Analyze content for suggested categories
        suggested_categories, confidence_scores = analyze_content_patterns(frontmatter_text, body, filename)
        
        # Compare current vs suggested
        current_set = set(current_categories)
        suggested_set = suggested_categories
        
        # Check for potential issues
        if not current_categories:
            issues.append(f"❌ {slug}: No categories assigned")
            summary['uncategorized'] += 1
        
        # Check for obvious mismatches
        high_confidence_suggestions = {cat for cat, score in confidence_scores.items() if score >= 3}
        
        if high_confidence_suggestions and not high_confidence_suggestions.intersection(current_set):
            missing_cats = list(high_confidence_suggestions - current_set)
            if missing_cats:
                recommendations.append(f"💡 {slug}: Consider adding {missing_cats} (confidence: {[confidence_scores[cat] for cat in missing_cats]})")
        
        # Check for potential over-classification
        if len(current_categories) > 4:
            issues.append(f"⚠️ {slug}: Many categories ({len(current_categories)}): {current_categories}")
            summary['over_categorized'] += 1
        
        # Category-specific checks
        if 'Business Central' in current_categories and 'Microsoft Dynamics' not in current_categories:
            issues.append(f"🔗 {slug}: Has Business Central but missing Microsoft Dynamics (hierarchical issue)")
            summary['hierarchy_issues'] += 1
        
        # Update summary
        for cat in current_categories:
            summary[f'category_{cat}'] += 1
    
    # Report findings
    print(f"\n📊 Summary:")
    print(f"Total posts analyzed: {len([f for f in os.listdir(content_dir) if f.endswith('.md')])}")
    print(f"Posts in current classification: {len(current_posts)}")
    
    if summary['uncategorized']:
        print(f"Uncategorized posts: {summary['uncategorized']}")
    if summary['over_categorized']:
        print(f"Over-categorized posts: {summary['over_categorized']}")
    if summary['hierarchy_issues']:
        print(f"Hierarchy issues: {summary['hierarchy_issues']}")
    
    print(f"\n📈 Category Distribution:")
    for key, count in sorted(summary.items()):
        if key.startswith('category_'):
            category = key.replace('category_', '')
            print(f"  {category}: {count} posts")
    
    if issues:
        print(f"\n❌ Issues Found ({len(issues)}):")
        for issue in issues[:10]:  # Show first 10
            print(f"  {issue}")
        if len(issues) > 10:
            print(f"  ... and {len(issues) - 10} more")
    
    if recommendations:
        print(f"\n💡 Recommendations ({len(recommendations)}):")
        for rec in recommendations[:10]:  # Show first 10
            print(f"  {rec}")
        if len(recommendations) > 10:
            print(f"  ... and {len(recommendations) - 10} more")
    
    if not issues and not recommendations:
        print("\n✅ All posts appear to be properly classified!")
    
    return issues, recommendations

if __name__ == "__main__":
    check_all_classifications()