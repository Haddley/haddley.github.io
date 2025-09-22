#!/usr/bin/env python3

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from smart_classifier import SmartPostClassifier

def direct_classification_test():
    print("🧪 Direct SH1106 Classification Test")
    print("=" * 50)
    
    classifier = SmartPostClassifier()
    
    # Test classify_post_from_file method with the actual file
    result = classifier.classify_post_from_file(
        slug="sh1106",
        title="Raspberry Pi SH1106", 
        description="A comprehensive guide covering raspberry pi sh1106",
        tags=["python", "ml", "machine learning"]
    )
    
    print(f"Title: {result.title if hasattr(result, 'title') else 'N/A'}")
    print(f"Categories: {result.categories}")
    print(f"Confidence Scores: {result.confidence_scores}")
    print(f"Warnings: {result.warnings}")
    
    # Check if TypeScript is incorrectly included
    if 'TypeScript' in result.categories:
        print("❌ FAIL: TypeScript still incorrectly classified")
        print(f"   TypeScript confidence: {result.confidence_scores.get('TypeScript', 'N/A')}")
    else:
        print("✅ PASS: TypeScript correctly NOT classified")
    
    # Check if expected categories are present
    expected = ['Python', 'AI']
    for cat in expected:
        if cat in result.categories:
            print(f"✅ PASS: {cat} correctly classified")
        else:
            print(f"❌ FAIL: {cat} missing from classification")

if __name__ == "__main__":
    direct_classification_test()