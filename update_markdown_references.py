#!/usr/bin/env python3
"""
Update all existing markdown files with References sections
"""

import json
import os
from pathlib import Path

def add_references_to_markdown(markdown_path, references):
    """Add References section to a markdown file"""
    try:
        # Read the current content
        with open(markdown_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if References section already exists
        if '## References' in content:
            print(f"  References section already exists, skipping")
            return False
        
        # Generate the References section
        references_section = "\n## References\n\n"
        for ref in references:
            references_section += f"- [{ref['title']}]({ref['url']})\n"
        references_section += "\n"
        
        # Add References section at the end
        updated_content = content.rstrip() + references_section
        
        # Write back to file
        with open(markdown_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        print(f"  Added {len(references)} references")
        return True
    
    except Exception as e:
        print(f"  Error updating {markdown_path}: {e}")
        return False

def main():
    # Load the extraction results
    results_file = 'references_extraction_results.json'
    if not os.path.exists(results_file):
        print(f"Results file not found: {results_file}")
        print("Please run extract_all_references.py first")
        return
    
    with open(results_file, 'r', encoding='utf-8') as f:
        results = json.load(f)
    
    # Filter for existing markdown files
    existing_files = {k: v for k, v in results.items() if v['markdown_exists']}
    
    print(f"Found {len(existing_files)} markdown files to update")
    print(f"Total references to add: {sum(len(v['references']) for v in existing_files.values())}")
    
    # Process each file
    updated_count = 0
    skipped_count = 0
    
    for html_file, data in existing_files.items():
        markdown_path = data['markdown_path']
        references = data['references']
        
        print(f"\nProcessing: {data['markdown_file']}")
        print(f"  HTML source: {html_file}")
        print(f"  References: {len(references)}")
        
        if add_references_to_markdown(markdown_path, references):
            updated_count += 1
        else:
            skipped_count += 1
    
    print(f"\n=== UPDATE SUMMARY ===")
    print(f"Files updated: {updated_count}")
    print(f"Files skipped (already had References): {skipped_count}")
    print(f"Total files processed: {len(existing_files)}")
    
    # Show some example references that were added
    if updated_count > 0:
        print(f"\nSample references added:")
        for html_file, data in list(existing_files.items())[:5]:
            if data['references']:
                print(f"  {data['markdown_file']}:")
                for ref in data['references'][:2]:  # Show first 2 refs
                    print(f"    - {ref['title'][:50]}...")

if __name__ == "__main__":
    main()