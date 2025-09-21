#!/usr/bin/env python3
"""
Enhanced Smart Post Classification System
A unified, intelligent auto-classification pipeline for blog posts with:
- Advanced content analysis
- Confidence scoring
- Multi-category support
- Quality assurance
- Build-time integration
"""

import os
import re
import json
from typing import Dict, List, Tuple, Set
from dataclasses import dataclass
from pathlib import Path

@dataclass
class ClassificationResult:
    """Results from post classification"""
    categories: List[str]
    confidence_scores: Dict[str, float]
    reasons: Dict[str, List[str]]
    warnings: List[str]

class SmartPostClassifier:
    """Intelligent post classification system"""
    
    def __init__(self):
        self.confidence_threshold = 5.0  # Minimum confidence for auto-assignment
        self.max_categories = 4  # Maximum categories per post
        self.min_confidence_for_single = 8.0  # Higher threshold for single strong category
        
        # Enhanced technology patterns with weighted scoring
        self.tech_patterns = {
            # Programming Languages & Frameworks
            '.NET': {
                'high_confidence': [
                    (r'\b\.net\b', 4.0),
                    (r'\basp\.net\b', 5.0),
                    (r'\bblazor\b', 5.0),
                    (r'\bc#\b', 4.0),
                    (r'\bcsharp\b', 4.0),
                    (r'\bentity\s+framework\b', 4.0),
                    (r'\bef\s+core\b', 4.0),
                    (r'\.csproj\b', 3.0),
                    (r'\.cs\b', 2.0)
                ],
                'medium_confidence': [
                    (r'\bmicrosoft\s+stack\b', 2.0),
                    (r'\bvisual\s+studio\b', 1.5),
                    (r'\bnuget\b', 2.0)
                ],
                'exclusions': ['java', 'python', 'node.js']  # Conflicting technologies
            },
            
            'Java': {
                'high_confidence': [
                    (r'\bjava\b(?!\s*script)', 4.0),
                    (r'\bspring\b', 4.0),
                    (r'\bspring\s+boot\b', 5.0),
                    (r'\bmaven\b', 3.0),
                    (r'\bgradle\b', 3.0),
                    (r'\.java\b', 3.0),
                    (r'\bandroid\b', 3.0),
                    (r'\bkotlin\b', 3.0)
                ],
                'medium_confidence': [
                    (r'\bjvm\b', 2.0),
                    (r'\beclipse\b', 1.5),
                    (r'\bintellij\b', 1.5)
                ],
                'exclusions': ['.net', 'python']
            },
            
            'JavaScript': {
                'high_confidence': [
                    (r'\bjavascript\b', 4.0),
                    (r'\bnode\.?js\b', 4.0),
                    (r'\bnpm\b', 3.0),
                    (r'\byarn\b', 3.0),
                    (r'\bexpress\b', 3.0),
                    (r'\.js\b', 2.0),
                    (r'\bes6\b', 3.0),
                    (r'\bes2015\b', 3.0)
                ],
                'medium_confidence': [
                    (r'\bwebpack\b', 2.0),
                    (r'\bbabel\b', 2.0),
                    (r'\bajax\b', 1.5)
                ]
            },
            
            'TypeScript': {
                'high_confidence': [
                    (r'\btypescript\b', 5.0),
                    (r'\.ts\b', 3.0),
                    (r'\btsc\b', 3.0),
                    (r'\btsconfig\b', 4.0)
                ],
                'medium_confidence': [
                    (r'\btype\s+annotations\b', 2.0),
                    (r'\binterface\b', 1.0)
                ]
            },
            
            'React': {
                'high_confidence': [
                    (r'\breact\b', 4.0),
                    (r'\bjsx\b', 4.0),
                    (r'\breact\s+component\b', 5.0),
                    (r'\busestate\b', 4.0),
                    (r'\buseeffect\b', 4.0),
                    (r'\bnext\.js\b', 3.0),
                    (r'\breact\s+native\b', 4.0)
                ],
                'medium_confidence': [
                    (r'\bcomponent\b', 1.0),
                    (r'\bprops\b', 1.5),
                    (r'\bstate\b', 0.5)
                ]
            },
            
            'Angular': {
                'high_confidence': [
                    (r'\bangular\b', 4.0),
                    (r'\bangular\s+\d+\b', 5.0),
                    (r'\bngmodule\b', 5.0),
                    (r'\bcomponent\s+decorator\b', 4.0),
                    (r'\bangular\s+cli\b', 4.0),
                    (r'\bng\s+serve\b', 4.0)
                ],
                'medium_confidence': [
                    (r'\btypescript\b', 1.0),
                    (r'\brxjs\b', 3.0)
                ]
            },
            
            'Python': {
                'high_confidence': [
                    (r'\bpython\b', 4.0),
                    (r'\bdjango\b', 4.0),
                    (r'\bflask\b', 4.0),
                    (r'\bpandas\b', 4.0),
                    (r'\bnumpy\b', 4.0),
                    (r'\bpip\b', 3.0),
                    (r'\.py\b', 2.0),
                    (r'\bjupyter\b', 3.0)
                ],
                'medium_confidence': [
                    (r'\bconda\b', 2.0),
                    (r'\bvirtualenv\b', 2.0)
                ]
            },
            
            'SQL': {
                'high_confidence': [
                    (r'\bsql\b(?!\s*(?:injection|lite))', 4.0),  # SQL but not SQLite specifically
                    (r'\bmysql\b', 4.0),
                    (r'\bpostgresql\b', 4.0),
                    (r'\bsql\s*server\b', 4.0),
                    (r'\bsqlite\b', 4.0),
                    (r'\bselect\s+\*?\s+from\b', 5.0),
                    (r'\binsert\s+into\b', 5.0),
                    (r'\bupdate\s+\w+\s+set\b', 5.0),
                    (r'\bcreate\s+table\b', 5.0),
                    (r'\bstored\s+procedure\b', 4.0),
                    (r'\brelational\s+database\b', 3.0),
                    (r'\bsql\s+query\b', 4.0),
                    (r'\bsql\s+statement\b', 4.0),
                    (r'\bjoin\s+(?:inner|left|right|outer)\b', 3.0),
                    (r'\bwhere\s+clause\b', 3.0),
                    (r'\border\s+by\b', 3.0),
                    (r'\bgroup\s+by\b', 3.0)
                ],
                'medium_confidence': [
                    (r'\bsql\s*database\b', 2.5),
                    (r'\bdatabase\s+(?:schema|design|query|management|administration)\b', 2.0),
                    (r'\bdata\s*base\s+(?:table|query|connection)\b', 2.0),
                    (r'\btable\s+(?:structure|design|schema|relationship)\b', 1.5)
                ],
                'exclusions': ['screen sharing', 'vnc', 'ssh', 'ai knowledge', 'knowledge base', 'context injection']
            },
            
            # Cloud & Infrastructure
            'Azure': {
                'high_confidence': [
                    (r'\bazure\b', 4.0),
                    (r'\bapp\s+service\b', 3.0),
                    (r'\bazure\s+functions\b', 5.0),
                    (r'\bcosmosdb\b', 5.0),
                    (r'\bazure\s+storage\b', 4.0),
                    (r'\bazure\s+devops\b', 4.0),
                    (r'\bmicrosoft\s+azure\b', 4.0)
                ],
                'medium_confidence': [
                    (r'\bcloud\b', 1.0),
                    (r'\bmicrosoft\s+cloud\b', 2.0)
                ]
            },
            
            'AWS': {
                'high_confidence': [
                    (r'\baws\b', 4.0),
                    (r'\bamazon\s+web\s+services\b', 5.0),
                    (r'\bec2\b', 4.0),
                    (r'\blambda\b', 3.0),
                    (r'\bs3\b', 3.0),
                    (r'\beks\b', 4.0),
                    (r'\becs\b', 4.0),
                    (r'\bfargate\b', 4.0)
                ],
                'medium_confidence': [
                    (r'\bcloud\b', 1.0),
                    (r'\bamazon\b', 1.5)
                ]
            },
            
            'DevOps': {
                'high_confidence': [
                    (r'\bdevops\b', 5.0),
                    (r'\bci/cd\b', 5.0),
                    (r'\bdocker\b', 4.0),
                    (r'\bkubernetes\b', 4.0),
                    (r'\bterraform\b', 4.0),
                    (r'\bjenkins\b', 4.0),
                    (r'\bgithub\s+actions\b', 4.0),
                    (r'\bdeployment\b', 2.0)
                ],
                'medium_confidence': [
                    (r'\bcontainer\b', 2.0),
                    (r'\bmicroservices\b', 2.0)
                ]
            },
            
            # Microsoft Ecosystem
            'Microsoft Dynamics': {
                'high_confidence': [
                    (r'\bdynamics\s*365\b', 5.0),
                    (r'\bmicrosoft\s+dynamics\b', 5.0),
                    (r'\bdynamics\s+crm\b', 5.0),
                    (r'\bd365\b', 4.0)
                ],
                'medium_confidence': [
                    (r'\bcrm\b', 1.5),
                    (r'\berp\b', 1.5)
                ]
            },
            
            'Business Central': {
                'high_confidence': [
                    (r'\bbusiness\s+central\b', 5.0),
                    (r'\bbusinesscentral\b', 5.0),
                    (r'\bdynamics\s+365\s+business\s+central\b', 5.0),
                    (r'\bal\s+code\b', 5.0),
                    (r'\bal\s+language\b', 5.0),
                    (r'\bcodeunit\b', 5.0),
                    (r'\bpage\s+extension\b', 5.0),
                    (r'\btable\s+extension\b', 5.0),
                    (r'\bnavision\b', 4.0)
                ],
                'medium_confidence': [
                    (r'\.al\b', 3.0),
                    (r'app\.json\b', 2.0)
                ],
                'requires_parent': 'Microsoft Dynamics'  # Always include parent
            },
            
            'Microsoft 365': {
                'high_confidence': [
                    (r'\bmicrosoft\s+365\b', 5.0),
                    (r'\boffice\s+365\b', 4.0),
                    (r'\bsharepoint\b', 4.0),
                    (r'\bteams\b', 3.0),
                    (r'\bmicrosoft\s+graph\b', 5.0),
                    (r'\bm365\b', 4.0)
                ],
                'medium_confidence': [
                    (r'\boffice\b', 1.0),
                    (r'\bmicrosoft\s+office\b', 2.0)
                ]
            },
            
            'Power Platform': {
                'high_confidence': [
                    (r'\bpower\s+apps\b', 5.0),
                    (r'\bpower\s+automate\b', 5.0),
                    (r'\bpower\s+bi\b', 5.0),
                    (r'\bdataverse\b', 5.0),
                    (r'\bcanvas\s+app\b', 4.0),
                    (r'\bmodel\s+driven\b', 4.0)
                ],
                'medium_confidence': [
                    (r'\bflow\b', 1.0),
                    (r'\bmicrosoft\s+flow\b', 3.0)
                ]
            },
            
            # AI & Data
            'AI': {
                'high_confidence': [
                    (r'\bartificial\s+intelligence\b', 5.0),
                    (r'\bmachine\s+learning\b', 5.0),
                    (r'\bdeep\s+learning\b', 5.0),
                    (r'\bneural\s+network\b', 5.0),
                    (r'\bnlp\b', 4.0),
                    (r'\bchatgpt\b', 4.0),
                    (r'\bopenai\b', 4.0),
                    (r'\bllm\b', 4.0),
                    (r'\blangchain\b', 4.0),
                    (r'\btensorflow\b', 5.0),
                    (r'\bpytorch\b', 5.0)
                ],
                'medium_confidence': [
                    (r'\bmodel\b', 1.0),
                    (r'\btraining\b', 1.0),
                    (r'\balgorithm\b', 1.5)
                ]
            }
        }
        
        # Filename pattern bonuses
        self.filename_patterns = {
            'Business Central': [
                r'^businesscentral',
                r'^bc[_-]',
                r'^dynamics.*central'
            ],
            'Angular': [
                r'^angular',
                r'^ng[_-]'
            ],
            'React': [
                r'^react',
                r'^nextjs'
            ],
            'Azure': [
                r'^azure',
                r'^az[_-]'
            ],
            'SQL': [
                r'^sql',
                r'^mysql',
                r'^postgresql'
            ]
        }

    def analyze_content(self, title: str, description: str, tags: List[str], 
                       content: str, filename: str) -> ClassificationResult:
        """Comprehensive content analysis for classification"""
        
        # Combine all text for analysis
        all_text = f"{title} {description} {' '.join(tags)} {content}".lower()
        
        category_scores = {}
        classification_reasons = {}
        warnings = []
        
        # 1. Technology pattern matching
        for category, patterns in self.tech_patterns.items():
            score = 0.0
            reasons = []
            
            # High confidence patterns
            for pattern, weight in patterns.get('high_confidence', []):
                matches = len(re.findall(pattern, all_text, re.IGNORECASE))
                if matches > 0:
                    score += matches * weight
                    reasons.append(f"Found '{pattern}' {matches} time(s) (weight: {weight})")
            
            # Medium confidence patterns
            for pattern, weight in patterns.get('medium_confidence', []):
                matches = len(re.findall(pattern, all_text, re.IGNORECASE))
                if matches > 0:
                    score += matches * weight
                    reasons.append(f"Found '{pattern}' {matches} time(s) (weight: {weight})")
            
            # Filename bonus
            for pattern in self.filename_patterns.get(category, []):
                if re.match(pattern, filename, re.IGNORECASE):
                    score += 3.0
                    reasons.append(f"Filename matches pattern '{pattern}' (+3.0)")
            
            # Title exact match bonus
            if category.lower() in title.lower():
                score += 5.0
                reasons.append(f"Category name in title (+5.0)")
            
            # Check exclusions for this category
            exclusions = patterns.get('exclusions', [])
            for exclusion in exclusions:
                if re.search(exclusion, all_text, re.IGNORECASE):
                    score *= 0.1  # Drastically reduce score if exclusion found
                    reasons.append(f"EXCLUSION FOUND: '{exclusion}' - score reduced by 90%")
            
            if score > 0:
                category_scores[category] = score
                classification_reasons[category] = reasons
        
        # 2. Quality checks and warnings
        self._add_quality_warnings(category_scores, warnings)
        
        # 3. Apply business rules
        final_categories = self._apply_business_rules(category_scores, warnings)
        
        return ClassificationResult(
            categories=final_categories,
            confidence_scores=category_scores,
            reasons=classification_reasons,
            warnings=warnings
        )
    
    def _add_quality_warnings(self, scores: Dict[str, float], warnings: List[str]):
        """Add quality assurance warnings"""
        
        # Check for conflicting technologies
        conflicts = [
            (['.NET', 'Java'], "Both .NET and Java detected - unusual combination"),
            (['.NET', 'Python'], "Both .NET and Python detected - verify this is correct"),
            (['Business Central'], "Business Central posts should also include Microsoft Dynamics")
        ]
        
        for conflict_categories, warning in conflicts:
            if len([cat for cat in conflict_categories if cat in scores]) > 1:
                warnings.append(warning)
        
        # Check for missing obvious categories
        if 'SQL' in scores and 'SQL' not in scores:
            if any(term in str(scores) for term in ['database', 'query', 'table']):
                warnings.append("Database-related content detected but no SQL category assigned")
    
    def _apply_business_rules(self, scores: Dict[str, float], warnings: List[str]) -> List[str]:
        """Apply business rules to determine final categories"""
        
        final_categories = []
        
        # Sort by confidence score
        sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        
        for category, score in sorted_scores:
            # Apply confidence threshold
            if score < self.confidence_threshold:
                continue
            
            # Check if we've reached max categories
            if len(final_categories) >= self.max_categories:
                break
            
            # Special rules for hierarchical categories
            if category == 'Business Central':
                # Always include Microsoft Dynamics as parent
                if 'Microsoft Dynamics' not in final_categories:
                    final_categories.append('Microsoft Dynamics')
                final_categories.append(category)
            else:
                final_categories.append(category)
        
        # Ensure we don't exceed max categories
        final_categories = final_categories[:self.max_categories]
        
        return final_categories

    def classify_post_from_file(self, slug: str, title: str, description: str, 
                               tags: List[str]) -> ClassificationResult:
        """Classify a post by reading its markdown file"""
        
        content_file = f"/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/content/{slug}.md"
        
        # Read markdown content if it exists
        content = ""
        if os.path.exists(content_file):
            try:
                with open(content_file, 'r', encoding='utf-8') as f:
                    file_content = f.read()
                    # Extract just the body content (after frontmatter)
                    if '---' in file_content:
                        parts = file_content.split('---', 2)
                        if len(parts) >= 3:
                            content = parts[2].strip()
                        else:
                            content = file_content
                    else:
                        content = file_content
            except Exception as e:
                print(f"Warning: Could not read content file for {slug}: {e}")
        
        return self.analyze_content(title, description, tags, content, slug)

def main():
    """Main classification function"""
    classifier = SmartPostClassifier()
    
    print("🤖 Enhanced Smart Post Classification System")
    print("=" * 60)
    
    # Read current posts
    posts_file = '/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/src/lib/posts.ts'
    
    with open(posts_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract posts for classification
    post_pattern = r'{\s*slug:\s*[\'\"](.*?)[\'\"]\s*,\s*title:\s*[\'\"](.*?)[\'\"]\s*,\s*description:\s*[\'\"](.*?)[\'\"]\s*,.*?tags:\s*\[(.*?)\]'
    
    posts = re.findall(post_pattern, content, re.DOTALL)
    
    print(f"Found {len(posts)} posts to analyze")
    print()
    
    classification_updates = []
    
    for slug, title, description, tags_str in posts[:10]:  # Limit to first 10 for demo
        # Parse tags
        tags = []
        if tags_str.strip():
            tag_matches = re.findall(r'[\'\"](.*?)[\'"\"]', tags_str)
            tags = [tag.strip() for tag in tag_matches if tag.strip()]
        
        # Classify the post
        result = classifier.classify_post_from_file(slug, title, description, tags)
        
        if result.categories:
            print(f"📝 {title}")
            print(f"   Slug: {slug}")
            print(f"   Suggested categories: {', '.join(result.categories)}")
            
            # Show confidence scores
            for category in result.categories:
                score = result.confidence_scores.get(category, 0)
                print(f"   - {category}: {score:.1f} confidence")
                
                # Show top reasons
                reasons = result.reasons.get(category, [])[:3]  # Top 3 reasons
                for reason in reasons:
                    print(f"     • {reason}")
            
            if result.warnings:
                print(f"   ⚠️  Warnings: {'; '.join(result.warnings)}")
            
            classification_updates.append({
                'slug': slug,
                'categories': result.categories,
                'confidence': max(result.confidence_scores.values()) if result.confidence_scores else 0
            })
            
            print()
    
    # Summary
    print("📊 Classification Summary:")
    print(f"   Posts analyzed: {len(posts[:10])}")
    print(f"   Posts with suggested categories: {len(classification_updates)}")
    
    if classification_updates:
        print("\n🎯 High Confidence Classifications:")
        high_confidence = [u for u in classification_updates if u['confidence'] >= 10.0]
        for update in high_confidence:
            print(f"   {update['slug']}: {', '.join(update['categories'])}")

if __name__ == "__main__":
    main()