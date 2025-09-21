#!/usr/bin/env python3
"""
Debug script to understand why dockerbuildx was classified as Business Central
"""

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

def debug_dockerbuildx():
    """Debug the dockerbuildx classification"""
    
    content_dir = "/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/content"
    file_path = os.path.join(content_dir, "dockerbuildx.md")
    
    print("🔍 Debugging dockerbuildx.md classification...")
    
    frontmatter_text, body = read_frontmatter_and_content(file_path)
    
    print("📄 Frontmatter:")
    print(frontmatter_text)
    print("\n📝 Body (first 200 chars):")
    print(body[:200])
    
    # BC patterns from the original script
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
    
    # Check filename patterns
    filename = "dockerbuildx.md"
    if filename.startswith('businesscentral'):
        print("❌ Filename trigger: starts with 'businesscentral'")
        return
    
    # Check title and content
    title_match = re.search(r'title:\s*["\']?([^"\'\n]+)["\']?', frontmatter_text)
    title = title_match.group(1).lower() if title_match else ''
    
    tags_match = re.search(r'tags:\s*\[([^\]]+)\]', frontmatter_text)
    tags = tags_match.group(1).lower() if tags_match else ''
    
    print(f"\n🏷️ Title: '{title}'")
    print(f"🏷️ Tags: '{tags}'")
    
    # Check all text (first 1000 chars of body)
    all_text = f"{title} {tags} {body[:1000]}".lower()
    
    print("\n🔍 Testing BC patterns...")
    found_patterns = []
    
    for i, pattern in enumerate(bc_patterns):
        if re.search(pattern, all_text, re.IGNORECASE):
            match = re.search(pattern, all_text, re.IGNORECASE)
            start = max(0, match.start() - 20)
            end = min(len(all_text), match.end() + 20)
            context = all_text[start:end]
            found_patterns.append((i, pattern, context))
            print(f"✅ Pattern {i}: {pattern}")
            print(f"   Context: ...{context}...")
    
    if not found_patterns:
        print("❌ No BC patterns found - this should NOT be classified as Business Central!")
        print("🐛 This appears to be a bug in the classification process.")
    else:
        print(f"\n📊 Found {len(found_patterns)} matching patterns")
        
if __name__ == "__main__":
    debug_dockerbuildx()