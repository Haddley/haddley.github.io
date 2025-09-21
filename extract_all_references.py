#!/usr/bin/env python3
"""
Extract References sections from all HTML backup files and generate markdown additions
"""

import os
import re
import json
from pathlib import Path

def extract_references_from_html(html_file_path):
    """Extract References section from an HTML file"""
    try:
        with open(html_file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find the References section
        references_pattern = r'<h3[^>]*>.*?<strong>References</strong>.*?</h3>(.*?)</section>'
        match = re.search(references_pattern, content, re.DOTALL | re.IGNORECASE)
        
        if not match:
            return []
        
        references_section = match.group(1)
        
        # Extract individual reference links
        link_pattern = r'<a href="([^"]+)"[^>]*target="_blank"[^>]*>([^<]+)</a>'
        links = re.findall(link_pattern, references_section)
        
        references = []
        for url, title in links:
            # Clean up the title
            title = title.strip()
            if title and url.startswith('http'):
                references.append({
                    'url': url,
                    'title': title
                })
        
        return references
    
    except Exception as e:
        print(f"Error processing {html_file_path}: {e}")
        return []

def html_to_markdown_filename(html_filename):
    """Convert HTML filename to corresponding markdown filename"""
    # Remove .html extension and convert to lowercase with hyphens
    base_name = html_filename.replace('.html', '')
    
    # Handle special cases and convert camelCase to kebab-case
    name = re.sub(r'([a-z])([A-Z])', r'\1-\2', base_name).lower()
    
    # Handle special cases
    name_mappings = {
        'azureai1': 'azure-ai-part-1',
        'internetofthings2': 'internetofthings2',
        'microsoftdynamics365appforoutlook': 'microsoftdynamics365appforoutlook',
        'angular1': 'angular-part-1',
        'angularandasp.net': 'angular-and-aspnet',
        'asp.net5cs': 'aspnet-5-cs',
        'asp.net5visualbasic': 'aspnet-5-visual-basic',
        'asp.netcore': 'aspnet-core',
        'businesscentraladmincenter': 'business-central-admin-center',
        'businesscentralcanvasapps': 'business-central-canvas-apps'
    }
    
    if name in name_mappings:
        name = name_mappings[name]
    
    return f"{name}.md"

def generate_markdown_references(references):
    """Generate markdown References section"""
    if not references:
        return ""
    
    markdown = "\n## References\n\n"
    for ref in references:
        markdown += f"- [{ref['title']}]({ref['url']})\n"
    markdown += "\n"
    
    return markdown

def main():
    backup_dir = Path('/Users/neilhaddley/Documents/GitHub/haddley.github.io/backup-20250921')
    content_dir = Path('/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/content')
    
    if not backup_dir.exists():
        print(f"Backup directory not found: {backup_dir}")
        return
    
    if not content_dir.exists():
        print(f"Content directory not found: {content_dir}")
        return
    
    # Process all HTML files
    results = {}
    html_files = list(backup_dir.glob('*.html'))
    
    print(f"Processing {len(html_files)} HTML files...")
    
    for html_file in html_files:
        print(f"Processing: {html_file.name}")
        
        references = extract_references_from_html(html_file)
        if references:
            markdown_filename = html_to_markdown_filename(html_file.name)
            markdown_path = content_dir / markdown_filename
            
            results[html_file.name] = {
                'references': references,
                'markdown_file': markdown_filename,
                'markdown_exists': markdown_path.exists(),
                'markdown_path': str(markdown_path)
            }
            
            print(f"  Found {len(references)} references")
            for ref in references:
                print(f"    - {ref['title'][:60]}...")
        else:
            print(f"  No references found")
    
    # Save results to JSON file
    with open('references_extraction_results.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    # Generate summary
    total_html_with_refs = len(results)
    existing_markdown = sum(1 for r in results.values() if r['markdown_exists'])
    total_references = sum(len(r['references']) for r in results.values())
    
    print(f"\n=== EXTRACTION SUMMARY ===")
    print(f"HTML files with References: {total_html_with_refs}")
    print(f"Corresponding markdown files found: {existing_markdown}")
    print(f"Total references extracted: {total_references}")
    print(f"Results saved to: references_extraction_results.json")
    
    # Show files that need markdown creation
    missing_markdown = [r for r in results.values() if not r['markdown_exists']]
    if missing_markdown:
        print(f"\nMarkdown files that don't exist ({len(missing_markdown)}):")
        for r in missing_markdown[:10]:  # Show first 10
            print(f"  - {r['markdown_file']}")
        if len(missing_markdown) > 10:
            print(f"  ... and {len(missing_markdown) - 10} more")

if __name__ == "__main__":
    main()