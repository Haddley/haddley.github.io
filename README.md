# Neil Haddley's Tech Blog

[![Deploy Status](https://github.com/Haddley/haddley.github.io/workflows/Deploy%20Next.js%20Blog%20to%20GitHub%20Pages/badge.svg)](https://github.com/Haddley/haddley.github.io/actions)

🌐 **Live Site**: [https://haddley.github.io](https://haddley.github.io)

A modern, fast, and responsive tech blog built with Next.js 15.5.3, featuring 251+ technical articles on software development, cloud technologies, AI/ML, and more.

## 🚀 Features

- **251+ Technical Posts** - Comprehensive coverage of modern development topics
- **11 Categories** - Organized content spanning Azure, AI/ML, .NET, JavaScript, Java, and more
- **Static Site Generation** - Optimized for performance and SEO
- **Responsive Design** - Works beautifully on all devices
- **Automated Deployment** - GitHub Actions workflow for seamless updates
- **Category Navigation** - Easy browsing by technology and topic

## 📁 Project Structure

```
haddley.github.io/
├── nextjs-blog/              # Next.js source code
│   ├── src/                  # Application source
│   ├── content/              # Markdown blog posts (251 files)
│   ├── public/               # Static assets and images
│   └── docs/                 # Project documentation
├── assets/                   # Deployed static assets
├── posts/                    # Generated static blog pages
├── .github/                  # GitHub Actions workflows
└── [static files]            # Deployed blog content
```

## 🛠️ Technology Stack

- **Framework**: Next.js 15.5.3
- **Language**: TypeScript
- **Styling**: Bootstrap + Mobirise components
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Content**: Markdown with gray-matter frontmatter

## 📚 Content Categories

1. **Azure** - Cloud services, deployment, and architecture
2. **AI & Machine Learning** - Modern AI development and tools
3. **JavaScript** - Frontend frameworks and libraries
4. **ASP.NET** - Backend development with .NET
5. **Development Tools** - IDEs, DevOps, and productivity
6. **Java** - Spring Boot, enterprise development
7. **Web Development** - Frontend technologies and frameworks
8. **Microsoft 365** - Power Platform and productivity tools
9. **Mobile & IoT** - Mobile apps and connected devices
10. **Cloud & DevOps** - Infrastructure and deployment
11. **General** - Miscellaneous technical topics

## 🔧 Development

### Prerequisites
- Node.js 20+
- npm

### Local Development
```bash
cd nextjs-blog
npm install
npm run dev
```

Visit `http://localhost:3000` to see the blog locally.

### Building for Production
```bash
cd nextjs-blog
npm run build
```

### Deployment
Deployment is automatic via GitHub Actions when pushing to the `main` branch. The workflow:
1. Builds the Next.js application
2. Exports static files
3. Deploys to GitHub Pages

## 📝 Adding New Posts

1. Create a new `.md` file in `nextjs-blog/content/`
2. Add frontmatter with title, description, date, category, image, and tags
3. Write your content in Markdown
4. Commit and push - deployment is automatic!

Example frontmatter:
```yaml
---
title: "Your Post Title"
description: "Brief description of the post"
date: "2025-09-21"
category: "Development"
image: "/assets/images/your-post/hero.png"
tags: ["tag1", "tag2"]
---
```

## 🎨 Features & Customization

- **Grammar-checked content** - All posts have been processed for quality
- **Optimized images** - Hero images and proper fallbacks
- **SEO-friendly** - Meta tags, structured URLs, and static generation
- **Category aliases** - Multiple URL patterns for better discoverability
- **Responsive design** - Mobile-first approach with Bootstrap

## 📊 Performance

- **Static Generation** - Pre-rendered HTML for fast loading
- **Optimized Assets** - Compressed images and efficient bundling
- **CDN-friendly** - Perfect for GitHub Pages hosting
- **SEO Optimized** - Structured data and meta tags

## 🤝 Contributing

This is a personal blog, but feedback and suggestions are welcome! Feel free to:
- Report issues
- Suggest improvements
- Share feedback on posts

## 📄 License

This project is open source. Feel free to use the structure and setup for your own blog!

---

Built with ❤️ using Next.js and deployed on GitHub Pages