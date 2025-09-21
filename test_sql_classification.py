#!/usr/bin/env python3
"""
SQL Classification Test - Check specific posts for SQL misclassification
"""

import sys
sys.path.append('/Users/neilhaddley/Documents/GitHub/haddley.github.io')
from smart_classifier import SmartPostClassifier

def test_sql_classification():
    """Test specific posts that were misclassified as SQL"""
    
    classifier = SmartPostClassifier()
    
    # Test cases - posts that should NOT be classified as SQL
    problematic_posts = [
        {
            'slug': 'macscreensharing',
            'title': 'Apple macOS',
            'description': 'Screen Sharing VNC and SSH',
            'tags': ['blog'],
            'expected_sql': False,
            'reason': 'About Mac screen sharing, not databases'
        },
        {
            'slug': 'contextinjection', 
            'title': 'Natural Language Processing (Part 3)',
            'description': 'LangChain',
            'tags': ['database', 'ai'],
            'expected_sql': False,
            'reason': 'AI/ML context injection, not SQL databases'
        },
        {
            'slug': 'microsoftdynamics365appforoutlook',
            'title': 'Microsoft Dynamics 365 App for Outlook',
            'description': 'Complete guide to integrating Dynamics 365 with Outlook',
            'tags': ['dynamics', 'outlook', 'power platform', 'integration'],
            'expected_sql': False,
            'reason': 'About Dynamics/Outlook integration, not SQL'
        }
    ]
    
    # Test cases - posts that SHOULD be classified as SQL
    valid_sql_posts = [
        {
            'slug': 'mysql',
            'title': 'MySQL',
            'description': 'MySQL database tutorial with CREATE TABLE and SELECT queries',
            'tags': ['database', 'sql', 'mysql'],
            'expected_sql': True,
            'reason': 'Actually about MySQL and SQL queries'
        },
        {
            'slug': 'mssqlserver',
            'title': 'Microsoft SQL Server',
            'description': 'SQL Server database management and query optimization',
            'tags': ['sql', 'database', 'mssql'],
            'expected_sql': True,
            'reason': 'Actually about SQL Server databases'
        }
    ]
    
    print("🧪 Testing SQL Classification Accuracy")
    print("=" * 60)
    
    all_tests_passed = True
    
    # Test problematic posts (should NOT be SQL)
    print("\n❌ Posts that should NOT be classified as SQL:")
    for post in problematic_posts:
        result = classifier.classify_post_from_file(
            post['slug'], post['title'], post['description'], post['tags']
        )
        
        is_sql_classified = 'SQL' in result.categories
        should_not_be_sql = not post['expected_sql']
        test_passed = is_sql_classified == post['expected_sql']
        
        status = "✅ PASS" if test_passed else "❌ FAIL"
        
        print(f"\n  {status} {post['title']} ({post['slug']})")
        print(f"    Expected SQL: {post['expected_sql']}, Got SQL: {is_sql_classified}")
        print(f"    Reason: {post['reason']}")
        print(f"    Categories: {result.categories}")
        
        if 'SQL' in result.confidence_scores:
            print(f"    SQL Confidence: {result.confidence_scores['SQL']:.1f}")
            if 'SQL' in result.reasons:
                print(f"    SQL Reasons: {result.reasons['SQL'][:2]}")
        
        if not test_passed:
            all_tests_passed = False
    
    # Test valid SQL posts (SHOULD be SQL)
    print("\n✅ Posts that SHOULD be classified as SQL:")
    for post in valid_sql_posts:
        result = classifier.classify_post_from_file(
            post['slug'], post['title'], post['description'], post['tags']
        )
        
        is_sql_classified = 'SQL' in result.categories
        test_passed = is_sql_classified == post['expected_sql']
        
        status = "✅ PASS" if test_passed else "❌ FAIL"
        
        print(f"\n  {status} {post['title']} ({post['slug']})")
        print(f"    Expected SQL: {post['expected_sql']}, Got SQL: {is_sql_classified}")
        print(f"    Reason: {post['reason']}")
        print(f"    Categories: {result.categories}")
        
        if 'SQL' in result.confidence_scores:
            print(f"    SQL Confidence: {result.confidence_scores['SQL']:.1f}")
        
        if not test_passed:
            all_tests_passed = False
    
    print(f"\n📊 Test Results:")
    print(f"   Overall: {'✅ ALL TESTS PASSED' if all_tests_passed else '❌ SOME TESTS FAILED'}")
    
    return all_tests_passed

if __name__ == "__main__":
    test_sql_classification()