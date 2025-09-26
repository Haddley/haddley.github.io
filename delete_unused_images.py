#!/usr/bin/env python3

import os
import re
import glob

def extract_image_references():
    """Extract all image references from markdown files."""
    content_dir = "/Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog/content"
    image_pattern = r'!\[.*?\]\(/assets/images/([^)]+)\)'
    used_images = set()
    
    # Find all markdown files
    md_files = glob.glob(os.path.join(content_dir, "*.md"))
    
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
    print("🗑️  Starting deletion of unused images...")
    
    # Extract used images from markdown files
    used_images = extract_image_references()
    print(f"📖 Found {len(used_images)} images referenced in blog posts")
    
    # Get available images
    available_images = get_available_images()
    print(f"📁 Found {len(available_images)} total images in assets directory")
    
    # Find unused images
    unused_images = available_images - used_images
    print(f"🎯 Identified {len(unused_images)} unused images for deletion")
    
    if not unused_images:
        print("🎉 No unused images found!")
        return
    
    deleted_count = 0
    deleted_size = 0
    errors = 0
    
    for img in unused_images:
        full_path = f"/Users/neilhaddley/Documents/GitHub/haddley.github.io/assets/images/{img}"
        try:
            if os.path.exists(full_path):
                file_size = os.path.getsize(full_path)
                os.remove(full_path)
                deleted_count += 1
                deleted_size += file_size
                
                # Progress indicator
                if deleted_count % 100 == 0:
                    print(f"🗑️  Deleted {deleted_count} files so far...")
        except Exception as e:
            errors += 1
            if errors <= 5:  # Only show first 5 errors to avoid spam
                print(f"❌ Error deleting {img}: {e}")
    
    print(f"\n✅ Deletion complete!")
    print(f"📁 Successfully deleted {deleted_count} unused images")
    print(f"💾 Freed up {deleted_size:,} bytes ({deleted_size/1024/1024:.2f} MB) of storage")
    
    if errors > 0:
        print(f"⚠️  Encountered {errors} errors during deletion")
    
    # Clean up empty directories
    print(f"\n🧹 Cleaning up empty directories...")
    images_dir = "/Users/neilhaddley/Documents/GitHub/haddley.github.io/assets/images"
    empty_dirs_removed = 0
    
    # Walk through directories and remove empty ones
    for root, dirs, files in os.walk(images_dir, topdown=False):
        for dir_name in dirs:
            dir_path = os.path.join(root, dir_name)
            try:
                if not os.listdir(dir_path):  # Directory is empty
                    os.rmdir(dir_path)
                    empty_dirs_removed += 1
                    print(f"📂 Removed empty directory: {os.path.relpath(dir_path, images_dir)}")
            except OSError:
                pass  # Directory not empty or other error
    
    if empty_dirs_removed > 0:
        print(f"📂 Removed {empty_dirs_removed} empty directories")
    else:
        print("📂 No empty directories to remove")

if __name__ == "__main__":
    main()