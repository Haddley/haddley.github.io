#!/usr/bin/env python3
"""
Test classification of sh1106 post
"""

import sys
import os
sys.path.append('/Users/neilhaddley/Documents/GitHub/haddley.github.io')

from smart_classifier import SmartPostClassifier

def test_sh1106_classification():
    print("🧪 Testing sh1106 Classification")
    print("=" * 50)
    
    # Read the sh1106 post
    with open('nextjs-blog/content/sh1106.md', 'r') as f:
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
        filename="sh1106.md"
    )
    
    detected_categories = result.categories
    confidence_scores = result.confidence_scores
    warnings = result.warnings

if __name__ == "__main__":
    test_sh1106_classification()