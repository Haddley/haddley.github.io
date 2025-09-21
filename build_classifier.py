#!/usr/bin/env python3
"""
Auto-Classification Build Integration
Automatically updates posts.ts with intelligent categorization during build process
"""

import os
import re
import json
import sys
from pathlib import Path

# Import our smart classifier
sys.path.append('/Users/neilhaddley/Documents/GitHub/haddley.github.io')
from smart_classifier import SmartPostClassifier, ClassificationResult

class BuildTimeClassifier:
    """Build-time integration for automatic post classification"""
    
    def __init__(self, posts_file_path: str):
        self.posts_file = posts_file_path
        self.classifier = SmartPostClassifier()
        self.backup_created = False
        
    def create_backup(self):
        """Create backup of posts.ts before modifications"""
        if not self.backup_created:
            backup_path = f"{self.posts_file}.backup"
            with open(self.posts_file, 'r', encoding='utf-8') as src:
                with open(backup_path, 'w', encoding='utf-8') as dst:
                    dst.write(src.read())
            print(f"✅ Created backup: {backup_path}")
            self.backup_created = True
    
    def extract_posts_data(self):
        """Extract all posts from posts.ts file"""
        with open(self.posts_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Enhanced regex to capture complete post objects
        post_pattern = r'{\s*slug:\s*[\'\"](.*?)[\'\"],[^}]*?title:\s*[\'\"](.*?)[\'\"],[^}]*?description:\s*[\'\"](.*?)[\'\"],[^}]*?categories:\s*\[(.*?)\],[^}]*?tags:\s*\[(.*?)\][^}]*?}'
        
        posts = []
        for match in re.finditer(post_pattern, content, re.DOTALL):
            slug = match.group(1)
            title = match.group(2)
            description = match.group(3)
            current_categories_str = match.group(4)
            tags_str = match.group(5)
            
            # Parse current categories
            current_categories = []
            if current_categories_str.strip():
                cat_matches = re.findall(r'[\'\"](.*?)[\'\""]', current_categories_str)
                current_categories = [cat.strip() for cat in cat_matches if cat.strip()]
            
            # Parse tags
            tags = []
            if tags_str.strip():
                tag_matches = re.findall(r'[\'\"](.*?)[\'\""]', tags_str)
                tags = [tag.strip() for tag in tag_matches if tag.strip()]
            
            posts.append({
                'slug': slug,
                'title': title,
                'description': description,
                'current_categories': current_categories,
                'tags': tags,
                'full_match': match.group(0),
                'start_pos': match.start(),
                'end_pos': match.end()
            })
        
        return posts, content
    
    def classify_all_posts(self, posts):
        """Classify all posts and return update recommendations"""
        updates = []
        
        print(f"🔍 Analyzing {len(posts)} posts for classification...")
        
        for i, post in enumerate(posts, 1):
            if i % 10 == 0:
                print(f"   Progress: {i}/{len(posts)} posts analyzed")
            
            # Classify the post
            result = self.classifier.classify_post_from_file(
                post['slug'], 
                post['title'], 
                post['description'], 
                post['tags']
            )
            
            # Compare with current categories
            current_cats = set(post['current_categories'])
            suggested_cats = set(result.categories)
            
            # Only suggest updates if there are meaningful changes
            if suggested_cats != current_cats and result.categories:
                # Calculate change score (how significant the change is)
                added = suggested_cats - current_cats
                removed = current_cats - suggested_cats
                change_score = len(added) + len(removed)
                
                # Get confidence score
                max_confidence = max(result.confidence_scores.values()) if result.confidence_scores else 0
                
                updates.append({
                    'post': post,
                    'result': result,
                    'current_categories': list(current_cats),
                    'suggested_categories': result.categories,
                    'added_categories': list(added),
                    'removed_categories': list(removed),
                    'change_score': change_score,
                    'max_confidence': max_confidence
                })
        
        return updates
    
    def apply_high_confidence_updates(self, updates, content, min_confidence=8.0):
        """Apply only high-confidence updates automatically"""
        
        high_confidence_updates = [
            u for u in updates 
            if u['max_confidence'] >= min_confidence
        ]
        
        print(f"\n🎯 Applying {len(high_confidence_updates)} high-confidence updates...")
        
        # Sort by position (reverse order to maintain positions)
        high_confidence_updates.sort(key=lambda x: x['post']['start_pos'], reverse=True)
        
        updated_content = content
        applied_count = 0
        
        for update in high_confidence_updates:
            post = update['post']
            new_categories = update['suggested_categories']
            
            # Create new categories string
            categories_str = ', '.join([f'"{cat}"' for cat in new_categories])
            
            # Find and replace the categories array in the post object
            old_object = post['full_match']
            
            # Replace categories array
            new_object = re.sub(
                r'categories:\s*\[.*?\]',
                f'categories: [{categories_str}]',
                old_object,
                flags=re.DOTALL
            )
            
            # Replace in content
            updated_content = updated_content.replace(old_object, new_object)
            applied_count += 1
            
            print(f"   ✅ {post['slug']}: {' → '.join([str(update['current_categories']), str(new_categories)])}")
        
        return updated_content, applied_count
    
    def generate_review_report(self, updates, output_file="classification_review.md"):
        """Generate a markdown report for manual review of classifications"""
        
        medium_confidence = [u for u in updates if 5.0 <= u['max_confidence'] < 8.0]
        low_confidence = [u for u in updates if u['max_confidence'] < 5.0]
        
        report = f"""# Post Classification Review Report
Generated: {os.path.basename(__file__)}

## Summary
- Total posts analyzed: {len(updates)} with suggested changes
- High confidence (auto-applied): {len([u for u in updates if u['max_confidence'] >= 8.0])}
- Medium confidence (review recommended): {len(medium_confidence)}
- Low confidence (manual review needed): {len(low_confidence)}

## Medium Confidence Changes (Review Recommended)
"""
        
        for update in medium_confidence:
            post = update['post']
            result = update['result']
            
            report += f"""
### {post['title']} (`{post['slug']}`)
- **Current:** {', '.join(update['current_categories']) or 'None'}
- **Suggested:** {', '.join(update['suggested_categories'])}
- **Confidence:** {update['max_confidence']:.1f}
- **Changes:** +{len(update['added_categories'])} / -{len(update['removed_categories'])}

**Reasoning:**
"""
            
            for category in result.categories:
                if category in result.reasons:
                    report += f"- **{category}:**\n"
                    for reason in result.reasons[category][:3]:
                        report += f"  - {reason}\n"
            
            if result.warnings:
                report += f"**Warnings:** {'; '.join(result.warnings)}\n"
        
        # Write report
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(report)
        
        print(f"📝 Generated review report: {output_file}")
    
    def run_classification(self, auto_apply=True, min_confidence=8.0):
        """Run the complete classification process"""
        
        print("🤖 Smart Post Classification - Build Integration")
        print("=" * 60)
        
        # Create backup
        self.create_backup()
        
        # Extract posts
        posts, content = self.extract_posts_data()
        print(f"📚 Found {len(posts)} posts to analyze")
        
        # Classify all posts
        updates = self.classify_all_posts(posts)
        
        if not updates:
            print("✅ No classification updates needed")
            return
        
        print(f"\n📊 Classification Analysis Complete:")
        print(f"   Posts with suggested changes: {len(updates)}")
        
        # Categorize by confidence
        high_conf = len([u for u in updates if u['max_confidence'] >= min_confidence])
        med_conf = len([u for u in updates if 5.0 <= u['max_confidence'] < min_confidence])
        low_conf = len([u for u in updates if u['max_confidence'] < 5.0])
        
        print(f"   High confidence (≥{min_confidence}): {high_conf}")
        print(f"   Medium confidence (5-{min_confidence}): {med_conf}")
        print(f"   Low confidence (<5): {low_conf}")
        
        if auto_apply and high_conf > 0:
            # Apply high-confidence updates
            updated_content, applied_count = self.apply_high_confidence_updates(
                updates, content, min_confidence
            )
            
            # Write updated file
            with open(self.posts_file, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            
            print(f"\n✅ Applied {applied_count} high-confidence classification updates")
        
        # Generate review report for remaining items
        if med_conf > 0 or low_conf > 0:
            self.generate_review_report(updates)
        
        print(f"\n🎉 Classification complete!")
        print(f"   Backup available at: {self.posts_file}.backup")

def main():
    """Main entry point for build integration"""
    posts_file = "/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts"
    
    # Check if posts file exists
    if not os.path.exists(posts_file):
        print(f"❌ Posts file not found: {posts_file}")
        sys.exit(1)
    
    # Run classification
    classifier = BuildTimeClassifier(posts_file)
    classifier.run_classification(auto_apply=True, min_confidence=8.0)

if __name__ == "__main__":
    main()