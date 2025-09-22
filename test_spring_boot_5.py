#!/usr/bin/env python3

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from smart_classifier import SmartPostClassifier

def test_spring_boot_5_classification():
    print("🧪 Testing spring-boot-5 Classification")
    print("=" * 50)
    
    classifier = SmartPostClassifier()
    
    # Test classify_post_from_file method with the actual file
    result = classifier.classify_post_from_file(
        slug="spring-boot-5",
        title="Java Spring Boot (Part 5)", 
        description="A comprehensive guide covering java spring boot (part 5)",
        tags=["java", "spring", "ai", "ml", "git"]
    )
    
    print(f"Title: Java Spring Boot (Part 5)")
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
            print(f"   This is likely due to TypeScript patterns matching Java content")
    else:
        print("✅ GOOD: TypeScript correctly NOT classified")
    
    # Check if expected categories are present
    expected = ['Java']
    for cat in expected:
        if cat in result.categories:
            print(f"✅ CORRECT: {cat} correctly classified (confidence: {result.confidence_scores.get(cat, 'N/A')})")
        else:
            print(f"❌ MISSING: {cat} should be classified")
            if cat in result.confidence_scores:
                print(f"   {cat} confidence: {result.confidence_scores[cat]}")

if __name__ == "__main__":
    test_spring_boot_5_classification()