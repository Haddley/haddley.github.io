# Next.js Blog Application

The source code for Neil Haddley's tech blog - a modern Next.js application with static site generation.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
nextjs-blog/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── posts/           # Blog posts routes
│   ├── components/          # Reusable components
│   └── lib/                 # Utilities and data
├── content/                 # Markdown blog posts (251 files)
├── public/                  # Static assets
├── docs/                    # Project documentation
└── next.config.ts          # Next.js configuration
```

## � Documentation

See `/docs` directory for detailed documentation:
- `CATEGORY_SYSTEM.md` - Blog categorization system
- `MIGRATION_SUMMARY.md` - Migration notes and decisions

## 🔧 Development

### Adding New Posts
1. Create a new `.md` file in `content/`
2. Add proper frontmatter
3. Content will be automatically categorized and deployed

### Content Structure
All blog posts are in the `content/` directory with frontmatter containing:
- title, description, date
- category (for navigation)
- image (hero image path)
- tags (for SEO)

## 🚀 Deployment

This application is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

The build process:
1. Next.js static export
2. GitHub Pages deployment
3. Available at https://haddley.github.io

---

For more details, see the main README in the repository root.

4. **Open your browser**:
   Visit [http://localhost:3000](http://localhost:3000)

## 📝 Adding New Blog Posts

### Method 1: Markdown Files (Recommended)

1. Create a new `.md` file in the `content/` directory
2. Add frontmatter with metadata:
   ```markdown
   ---
   title: "Your Post Title"
   description: "Brief description"
   date: "2024-01-15"
   category: "Category"
   image: "/assets/images/your-image.png"
   tags: ["tag1", "tag2"]
   ---
   
   # Your Content Here
   
   Write your blog post content in markdown...
   ```

### Method 2: Update Data File

1. Add a new entry to `src/lib/posts.ts` in the `blogPosts` array
2. The system will generate a placeholder page automatically

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

This generates a static export in the `out/` directory.

### GitHub Pages Deployment

1. **Update repository settings**:
   - Go to Settings > Pages
   - Set source to "Deploy from a branch"
   - Select the branch containing your built files

2. **Automated deployment** (recommended):
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'
             cache-dependency-path: nextjs-blog/package-lock.json
         
         - name: Install dependencies
           run: |
             cd nextjs-blog
             npm ci
         
         - name: Build
           run: |
             cd nextjs-blog
             npm run build
         
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./nextjs-blog/out
   ```

## 🎨 Customization

### Styling
- **Global styles**: Edit `src/app/globals.css`
- **Component styles**: Use Tailwind CSS classes
- **Custom components**: Add to `src/components/`

### Navigation
- **Menu items**: Update `src/components/Navigation.tsx`
- **Social links**: Modify the social icons section

### Content
- **Home page**: Edit `src/app/page.tsx`
- **About section**: Modify the hero section content
- **Blog data**: Update `src/lib/posts.ts`

## 🔧 Configuration

### Next.js Configuration
The `next.config.ts` is already configured for static export and GitHub Pages:

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/haddley.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/haddley.github.io/' : '',
};
```

### Environment Variables
Create `.env.local` for local development:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📦 Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **Gray Matter**: Markdown frontmatter parsing
- **Remark**: Markdown processing
- **ESLint**: Code linting and formatting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and TypeScript
