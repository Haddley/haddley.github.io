#!/usr/bin/env python3

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from smart_classifier import SmartPostClassifier

def test_mcpserver_classification():
    print("🧪 Testing mcpserver Classification")
    print("=" * 50)
    
    # Read the mcpserver post
    with open('nextjs-blog/content/mcpserver.md', 'r') as f:
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
    
    classifier = SmartPostClassifier()
    
    # Test classification
    result = classifier.analyze_content(
        title=title,
        description=description,
        tags=[],  # We'll parse tags from content if needed
        content=content,
        filename="mcpserver.md"
    )
    
    detected_categories = result.categories
    confidence_scores = result.confidence_scores
    warnings = result.warnings
    
    print(f"Title: {title}")
    print(f"Description: {description}")
    print(f"Detected categories: {detected_categories}")
    print(f"Confidence scores: {confidence_scores}")
    print(f"Warnings: {warnings}")
    
    # Check expectations
    expected_to_contain = ['TypeScript']
    also_expected = ['AI']  # Based on tags in frontmatter
    
    for category in expected_to_contain:
        if category in detected_categories:
            print(f"✅ CORRECT: Classified as {category}")
        else:
            print(f"❌ INCORRECT: Should be classified as {category}")
            if category in confidence_scores:
                print(f"   {category} confidence: {confidence_scores[category]}")
    
    for category in also_expected:
        if category in detected_categories:
            print(f"✅ CORRECT: Also classified as {category}")
        else:
            print(f"⚠️  NOTE: Could also be classified as {category}")

if __name__ == "__main__":
    test_mcpserver_classification()