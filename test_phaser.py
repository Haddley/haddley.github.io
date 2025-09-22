#!/usr/bin/env python3

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from smart_classifier import SmartPostClassifier

def test_phaser_classification():
    print("🧪 Testing phaser Classification")
    print("=" * 50)
    
    classifier = SmartPostClassifier()
    
    # Test classify_post_from_file method with the actual file
    result = classifier.classify_post_from_file(
        slug="phaser",
        title="Phaser", 
        description="A comprehensive guide covering phaser",
        tags=["ai", "ml", "git", "github"]
    )
    
    print(f"Title: Phaser")
    print(f"Categories: {result.categories}")
    print(f"Confidence Scores: {result.confidence_scores}")
    print(f"Warnings: {result.warnings}")
    
    # Check if TypeScript is incorrectly included
    if 'TypeScript' in result.categories:
        print(f"❌ PROBLEM: TypeScript incorrectly classified")
        print(f"   TypeScript confidence: {result.confidence_scores.get('TypeScript', 'N/A')}")
        
        # Let's look for what might be triggering TypeScript classification
        if 'TypeScript' in result.confidence_scores:
            ts_score = result.confidence_scores['TypeScript']
            print(f"   This is likely due to TypeScript patterns matching Phaser content")
    else:
        print("✅ GOOD: TypeScript correctly NOT classified")
    
    # Check what categories it should be
    expected = ['JavaScript']  # Phaser is a JavaScript game framework
    for cat in expected:
        if cat in result.categories:
            print(f"✅ CORRECT: {cat} correctly classified (confidence: {result.confidence_scores.get(cat, 'N/A')})")
        else:
            print(f"❌ MISSING: {cat} should be classified")
            if cat in result.confidence_scores:
                print(f"   {cat} confidence: {result.confidence_scores[cat]}")

if __name__ == "__main__":
    test_phaser_classification()