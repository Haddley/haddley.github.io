#!/usr/bin/env python3

import sys
import os
import re
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def debug_java_patterns():
    print("🔍 Debug Java Pattern Matching")
    print("=" * 50)
    
    # Read the spring-boot-5 post
    with open('nextjs-blog/content/spring-boot-5.md', 'r') as f:
        content = f.read()
    
    # Extract title and description from frontmatter
    lines = content.split('\n')
    title = ""
    description = ""
    for line in lines:
        if line.startswith('title:'):
            title = line.split(':', 1)[1].strip().strip('"')
        elif line.startswith('description:'):
            description = line.split(':', 1)[1].strip().strip('"')
    
    # Combine all text for analysis (same as classifier does)
    all_text = f"{title} {description} java spring ai ml git {content}".lower()
    
    # Test Java patterns specifically
    java_patterns = [
        (r'\bjava\b(?!\s*script)(?!\s*Script)', 4.0, "java keyword"),
        (r'\bspring\b(?!\s*js)(?!\s*-boot\s+javascript)', 4.0, "spring keyword"),
        (r'\bspring\s+boot\b', 5.0, "spring boot"),
        (r'\bmaven\b', 3.0, "maven"),
        (r'\bgradle\b', 3.0, "gradle"),
        (r'\.java\b(?!script)', 3.0, ".java files"),
        (r'\bandroid\b(?!\s*js)', 3.0, "android"),
        (r'\bkotlin\b', 3.0, "kotlin"),
        (r'\bjava\s+development\b', 4.0, "java development"),
        (r'\bjava\s+application\b', 4.0, "java application")
    ]
    
    total_score = 0
    for pattern, weight, description in java_patterns:
        matches = re.findall(pattern, all_text, re.IGNORECASE)
        score = len(matches) * weight
        total_score += score
        if matches:
            print(f"✅ {description}: {len(matches)} matches × {weight} = {score}")
            if len(matches) <= 5:  # Show first few matches
                print(f"   Matches: {matches[:5]}")
        else:
            print(f"❌ {description}: 0 matches")
    
    print(f"\n📊 Total Java Score: {total_score}")
    print(f"🎯 Confidence Threshold: 5.0")
    print(f"Result: {'PASS' if total_score >= 5.0 else 'FAIL'}")

if __name__ == "__main__":
    debug_java_patterns()