#!/usr/bin/env python3

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from smart_classifier import SmartPostClassifier

def test_pwa_classification():
    print("🧪 Testing PWA Classification")
    print("=" * 50)
    
    classifier = SmartPostClassifier()
    
    # Test without the manual "java" tag to see what it should be classified as
    result = classifier.classify_post_from_file(
        slug="pwa",
        title="Progressive Web Application", 
        description="A comprehensive guide covering progressive web application",
        tags=["javascript", "azure", "ai", "ml"]  # Removed "java" tag
    )
    
    print(f"Title: Progressive Web Application")
    print(f"Categories: {result.categories}")
    print(f"Confidence Scores: {result.confidence_scores}")
    print(f"Warnings: {result.warnings}")
    
    # Check if Java is correctly excluded
    if 'Java' in result.categories:
        print(f"❌ PROBLEM: Java incorrectly classified")
        print(f"   Java confidence: {result.confidence_scores.get('Java', 'N/A')}")
    else:
        print("✅ GOOD: Java correctly NOT classified")
    
    # Check what it should be classified as
    expected = ['JavaScript', 'Azure']  # PWA is typically JavaScript + cloud platform
    for cat in expected:
        if cat in result.categories:
            print(f"✅ CORRECT: {cat} correctly classified (confidence: {result.confidence_scores.get(cat, 'N/A')})")
        else:
            print(f"❌ MISSING: {cat} should be classified")
            if cat in result.confidence_scores:
                print(f"   {cat} confidence: {result.confidence_scores[cat]}")

def test_javascriptgraph_classification():
    print("\n🧪 Testing JavaScript Graph Classification")
    print("=" * 50)
    
    classifier = SmartPostClassifier()
    
    # Test without the manual "java" references
    result = classifier.classify_post_from_file(
        slug="javascriptgraph",
        title="JavaScript and Microsoft Graph", 
        description="A comprehensive guide covering javascript and microsoft graph",
        tags=["javascript", "azure", "ai", "ml"]  # Removed "java" tag
    )
    
    print(f"Title: JavaScript and Microsoft Graph")
    print(f"Categories: {result.categories}")
    print(f"Confidence Scores: {result.confidence_scores}")
    print(f"Warnings: {result.warnings}")
    
    # Check if Java is correctly excluded
    if 'Java' in result.categories:
        print(f"❌ PROBLEM: Java incorrectly classified")
        print(f"   Java confidence: {result.confidence_scores.get('Java', 'N/A')}")
    else:
        print("✅ GOOD: Java correctly NOT classified")
    
    # Check what it should be classified as
    expected = ['JavaScript', 'Microsoft 365']  # JavaScript + Microsoft Graph
    for cat in expected:
        if cat in result.categories:
            print(f"✅ CORRECT: {cat} correctly classified (confidence: {result.confidence_scores.get(cat, 'N/A')})")
        else:
            print(f"❌ MISSING: {cat} should be classified")
            if cat in result.confidence_scores:
                print(f"   {cat} confidence: {result.confidence_scores[cat]}")

if __name__ == "__main__":
    test_pwa_classification()
    test_javascriptgraph_classification()