#!/bin/bash

# GitHub Pages Deployment Script for haddley.github.io
# This script deploys the Next.js blog to the root directory

echo "🚀 Starting GitHub Pages deployment..."

# Navigate to the Next.js blog directory
cd /Users/neilhaddley/Documents/GitHub/haddley.github.io/nextjs-blog

# Build the Next.js blog
echo "📦 Building Next.js blog..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Exiting."
    exit 1
fi

# Navigate back to root
cd ..

# Create backup directory for existing files (optional)
if [ ! -d "backup-$(date +%Y%m%d)" ]; then
    echo "📁 Creating backup of existing files..."
    mkdir "backup-$(date +%Y%m%d)"
    
    # Move important files to backup (exclude nextjs-blog directory)
    for file in *.html *.css *.js *.png *.jpg *.mp4 *.svg *.json *.xml; do
        if [ -f "$file" ]; then
            mv "$file" "backup-$(date +%Y%m%d)/"
        fi
    done
    
    # Also backup important directories but not nextjs-blog
    for dir in assets history fonts; do
        if [ -d "$dir" ] && [ "$dir" != "nextjs-blog" ]; then
            mv "$dir" "backup-$(date +%Y%m%d)/"
        fi
    done
fi

# Copy built Next.js blog to root
echo "📋 Copying built blog to root directory..."
cp -r nextjs-blog/out/* .

# Ensure we have a .gitignore that doesn't ignore the deployed files
echo "📝 Updating .gitignore..."
cat > .gitignore << EOF
# Node modules (only in nextjs-blog)
nextjs-blog/node_modules/
nextjs-blog/.next/

# Backup directories
backup-*/

# MacOS
.DS_Store

# Editor files
.vscode/
*.swp
*.swo

# Build artifacts that should be kept in root for GitHub Pages
# (commenting out these common ignores since we want them deployed)
# *.html
# *.css
# *.js
# assets/
EOF

echo "✅ Deployment complete!"
echo "📄 Files deployed to root directory for GitHub Pages"
echo "🌐 Your site will be available at: https://haddley.github.io"
echo ""
echo "Next steps:"
echo "1. Review the changes: git status"
echo "2. Commit the changes: git add . && git commit -m 'Deploy Next.js blog to GitHub Pages'"
echo "3. Push to GitHub: git push origin main"