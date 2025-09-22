#!/usr/bin/env python3

import sys
import os
import re
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from smart_classifier import SmartPostClassifier

def debug_pwa_java_patterns():
    print("🔍 Debug PWA Java Classification")
    print("=" * 50)
    
    # Read the PWA post
    with open('nextjs-blog/content/pwa.md', 'r') as f:
        content = f.read()
    
    # Extract title and description from frontmatter, but ignore tags
    lines = content.split('\n')
    title = ""
    description = ""
    for line in lines:
        if line.startswith('title:'):
            title = line.split(':', 1)[1].strip().strip('"')
        elif line.startswith('description:'):
            description = line.split(':', 1)[1].strip().strip('"')
    
    # Combine text without the original tags
    clean_tags = ["javascript", "azure", "ai", "ml"]  # No "java"
    all_text = f"{title} {description} {' '.join(clean_tags)} {content}".lower()
    
    print(f"Title: {title}")
    print(f"Description: {description}")
    print(f"Clean tags: {clean_tags}")
    
    # Test Java patterns specifically
    java_patterns = [
        (r'\bjava\b(?!\s*script)(?!\s*Script)', 4.0, "java keyword (not javascript)"),
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
    triggered_patterns = []
    
    for pattern, weight, description in java_patterns:
        matches = re.findall(pattern, all_text, re.IGNORECASE)
        score = len(matches) * weight
        total_score += score
        if matches:
            triggered_patterns.append((description, len(matches), weight, score))
            print(f"✅ {description}: {len(matches)} matches × {weight} = {score}")
            if len(matches) <= 3:  # Show first few matches
                print(f"   Matches: {matches[:3]}")
        else:
            print(f"❌ {description}: 0 matches")
    
    print(f"\n📊 Total Java Score: {total_score}")
    print(f"🎯 Confidence Threshold: 5.0")
    print(f"Result: {'PASS' if total_score >= 5.0 else 'FAIL'}")
    
    if triggered_patterns:
        print(f"\n🎯 Triggered Patterns:")
        for desc, count, weight, score in triggered_patterns:
            print(f"   • {desc}: {count} × {weight} = {score}")

if __name__ == "__main__":
    debug_pwa_java_patterns()