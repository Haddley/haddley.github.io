#!/usr/bin/env python3

import os
import re
import glob
from pathlib import Path

def extract_image_references():
    """Extract all image references from markdown files."""
    content_dir = "/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/content"
    image_pattern = r'!\[.*?\]\(/assets/images/([^)]+)\)'
    used_images = set()
    
    # Find all markdown files
    md_files = glob.glob(os.path.join(content_dir, "*.md"))
    
    print(f"Found {len(md_files)} markdown files to analyze")
    
    for md_file in md_files:
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
                matches = re.findall(image_pattern, content)
                for match in matches:
                    used_images.add(match)
        except Exception as e:
            print(f"Error reading {md_file}: {e}")
    
    return used_images

def get_available_images():
    """Get all image files available in the assets/images directory."""
    images_dir = "/Users/neilhaddley/Documents/GitHub/haddley.github.io/assets/images"
    available_images = set()
    
    # Common image extensions
    extensions = ['*.jpg', '*.jpeg', '*.png', '*.gif', '*.svg', '*.webp']
    
    for ext in extensions:
        pattern = os.path.join(images_dir, "**", ext)
        for img_path in glob.glob(pattern, recursive=True):
            # Get relative path from assets/images/
            rel_path = os.path.relpath(img_path, images_dir)
            available_images.add(rel_path)
    
    return available_images

def main():
    print("🔍 Analyzing image usage in blog posts...")
    
    # Extract used images from markdown files
    used_images = extract_image_references()
    print(f"📖 Found {len(used_images)} unique image references in markdown files")
    
    # Get available images
    available_images = get_available_images()
    print(f"📁 Found {len(available_images)} images in assets/images directory")
    
    # Find unused images
    unused_images = available_images - used_images
    print(f"🗑️  Found {len(unused_images)} unused images")
    
    if unused_images:
        print("\n🔍 UNUSED IMAGES:")
        for img in sorted(unused_images):
            full_path = f"/Users/neilhaddley/Documents/GitHub/haddley.github.io/assets/images/{img}"
            file_size = os.path.getsize(full_path) if os.path.exists(full_path) else 0
            print(f"  - {img} ({file_size:,} bytes)")
        
        # Calculate total size
        total_size = sum(
            os.path.getsize(f"/Users/neilhaddley/Documents/GitHub/haddley.github.io/assets/images/{img}")
            for img in unused_images 
            if os.path.exists(f"/Users/neilhaddley/Documents/GitHub/haddley.github.io/assets/images/{img}")
        )
        print(f"\n📊 Total size of unused images: {total_size:,} bytes ({total_size/1024/1024:.2f} MB)")
    
    # Find missing images (referenced but not found)
    missing_images = used_images - available_images
    if missing_images:
        print(f"\n⚠️  MISSING IMAGES (referenced but not found): {len(missing_images)}")
        for img in sorted(missing_images):
            print(f"  - {img}")
    
    # Save results to file
    with open("image_analysis_results.txt", "w") as f:
        f.write(f"Image Analysis Results\n")
        f.write(f"===================\n\n")
        f.write(f"Total markdown files analyzed: {len(glob.glob('/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/content/*.md'))}\n")
        f.write(f"Images referenced in markdown: {len(used_images)}\n")
        f.write(f"Images available in assets: {len(available_images)}\n")
        f.write(f"Unused images: {len(unused_images)}\n")
        f.write(f"Missing images: {len(missing_images)}\n\n")
        
        if unused_images:
            f.write("UNUSED IMAGES:\n")
            for img in sorted(unused_images):
                f.write(f"  {img}\n")
        
        if missing_images:
            f.write(f"\nMISSING IMAGES:\n")
            for img in sorted(missing_images):
                f.write(f"  {img}\n")
    
    return unused_images

if __name__ == "__main__":
    unused = main()
    print(f"\n✅ Analysis complete! Results saved to image_analysis_results.txt")
    
    if unused:
        response = input(f"\n❓ Would you like to delete the {len(unused)} unused images? (y/N): ")
        if response.lower() == 'y':
            deleted_count = 0
            deleted_size = 0
            
            for img in unused:
                full_path = f"/Users/neilhaddley/Documents/GitHub/haddley.github.io/assets/images/{img}"
                try:
                    if os.path.exists(full_path):
                        file_size = os.path.getsize(full_path)
                        os.remove(full_path)
                        deleted_count += 1
                        deleted_size += file_size
                        print(f"🗑️  Deleted: {img}")
                except Exception as e:
                    print(f"❌ Error deleting {img}: {e}")
            
            print(f"\n✅ Deleted {deleted_count} unused images, freed {deleted_size:,} bytes ({deleted_size/1024/1024:.2f} MB)")
        else:
            print("👍 No images were deleted.")
    else:
        print("🎉 No unused images found!")