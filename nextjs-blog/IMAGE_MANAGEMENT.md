# Image Management System

This project implements an automated build script approach to avoid image duplication between the root `/assets/images/` directory and the Next.js `/nextjs-blog/public/assets/images/` directory.

## How It Works

### Architecture
- **Source of Truth**: All images are stored in `/assets/images/` (root level)
- **Build-Time Sync**: Images are automatically copied to `/nextjs-blog/public/assets/images/` during build
- **Single Management**: You only need to manage images in the root `/assets/` directory

### Build Process
1. **prebuild**: Runs `sync-images.js` script automatically before every build
2. **sync-images.js**: Copies all images from root `/assets/images/` to `/nextjs-blog/public/assets/images/`
3. **build**: Next.js builds with the freshly synced images

## Scripts

### Available Commands
- `npm run sync-images` - Manually sync images (useful for development)
- `npm run build` - Full build with automatic image sync
- `npm run dev` - Development server (images need to be synced first)

### Script Details

#### sync-images.js
```javascript
// Automatically:
// 1. Removes existing public/assets/images directory
// 2. Copies all images from root /assets/images/
// 3. Preserves directory structure
// 4. Reports sync statistics
```

## Usage

### Development Workflow
1. Add new images to `/assets/images/[category]/`
2. Reference images in markdown: `![alt](/assets/images/category/image.png)`
3. Run `npm run sync-images` to sync for development
4. Or run `npm run build` which syncs automatically

### Deployment
- GitHub Pages: `npm run build` automatically syncs before building
- Manual deployment: Sync is included in build process
- No manual file management needed

## Benefits

✅ **Single Source of Truth**: All images managed in `/assets/images/`
✅ **No Manual Duplication**: Automated sync prevents manual copying
✅ **Build Integration**: Sync happens automatically during build
✅ **GitHub Pages Compatible**: Works with static site generation
✅ **Development Friendly**: Manual sync available for dev workflow
✅ **Clean Deployments**: Always uses latest images
✅ **Preserves Structure**: Directory organization maintained

## File Structure

```
haddley.github.io/
├── assets/images/                    # Source of truth (10,000+ images)
│   ├── copilotstudiobctools/
│   ├── businesscentral/
│   └── [other categories]/
├── nextjs-blog/
│   ├── scripts/sync-images.js        # Sync automation script
│   ├── public/assets/images/         # Synced destination (build-time)
│   └── content/                      # Markdown files with image refs
```

## Troubleshooting

### Images Not Loading in Development
Run: `npm run sync-images`

### Images Not Loading After Build
Check that `prebuild` script ran successfully in build logs

### Large Build Times
The sync copies ~10,000 images. This is normal for full builds.
Consider adding `.gitignore` for `nextjs-blog/public/assets/images/` to avoid committing synced files.

## Configuration

### Package.json Scripts
```json
{
  "prebuild": "node scripts/sync-images.js",
  "build": "next build",
  "sync-images": "node scripts/sync-images.js"
}
```

### Dependencies
- `fs-extra`: Advanced file operations for robust copying
- Built-in Node.js modules for path handling

## Git Strategy

### Option 1: Commit Synced Files (Current)
- Synced images committed to repository
- Larger repo size but ensures consistency

### Option 2: Ignore Synced Files (Recommended)
Add to `.gitignore`:
```
nextjs-blog/public/assets/images/
```
- Smaller repo size
- Sync happens during build/deployment
- Requires CI/CD to run sync script

## Migration Notes

This system was implemented to solve image duplication between:
- Legacy root `/assets/images/` (1000+ historical images)
- Next.js `/nextjs-blog/public/assets/images/` (new blog structure)

The build script approach ensures compatibility with GitHub Pages static site generation while maintaining a single source of truth for all images.