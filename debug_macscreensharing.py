#!/usr/bin/env python3
"""
Debug macscreensharing Classification - Find out why it's being classified as SQL
"""

import sys
sys.path.append('/Users/neilhaddley/Documents/GitHub/haddley.github.io')
from smart_classifier import SmartPostClassifier

def debug_macscreensharing():
    """Debug why macscreensharing is being classified as SQL"""
    
    classifier = SmartPostClassifier()
    
    # Test the macscreensharing post
    result = classifier.classify_post_from_file(
        'macscreensharing',
        'Apple macOS',
        'Screen Sharing VNC and SSH',
        ['blog']
    )
    
    print("🔍 Debugging macscreensharing Classification")
    print("=" * 60)
    print(f"Title: Apple macOS")
    print(f"Description: Screen Sharing VNC and SSH")
    print(f"Tags: ['blog']")
    print()
    print(f"🎯 Suggested Categories: {result.categories}")
    print(f"📊 All Confidence Scores:")
    
    for category, score in sorted(result.confidence_scores.items(), key=lambda x: x[1], reverse=True):
        print(f"   {category}: {score:.1f}")
    
    if 'SQL' in result.confidence_scores:
        print(f"\n❌ SQL Classification Details (Score: {result.confidence_scores['SQL']:.1f}):")
        if 'SQL' in result.reasons:
            for reason in result.reasons['SQL']:
                print(f"   - {reason}")
    
    print(f"\n⚠️  Warnings: {result.warnings}")
    
    # Also test with actual content from the file
    try:
        with open('/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/content/macscreensharing.md', 'r') as f:
            content = f.read()
        
        print(f"\n🔍 Testing with full content...")
        
        result_with_content = classifier.analyze_content(
            'Apple macOS',
            'Screen Sharing VNC and SSH', 
            ['blog'],
            content,
            'macscreensharing.md'
        )
        
        print(f"📊 With Content - Categories: {result_with_content.categories}")
        if 'SQL' in result_with_content.confidence_scores:
            print(f"❌ SQL Score with content: {result_with_content.confidence_scores['SQL']:.1f}")
            if 'SQL' in result_with_content.reasons:
                print("SQL Reasons with content:")
                for reason in result_with_content.reasons['SQL']:
                    print(f"   - {reason}")
        
    except Exception as e:
        print(f"Error reading content: {e}")

if __name__ == "__main__":
    debug_macscreensharing()