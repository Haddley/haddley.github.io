# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Sync images + build static export
npm run lint         # Run ESLint
npm run sync-images  # Copy content/assets/ to public/assets/
npm start            # Serve the built ./out directory
```

No test suite is configured.

## Architecture

This is a **Next.js 15 static site** (App Router, TypeScript) exported to `./out/` for GitHub Pages hosting.

**Content** lives in `/content/` as Markdown files (238+ posts). Each file uses YAML frontmatter:
```yaml
---
title: "..."
description: "..."
date: "YYYY-MM-DD"
categories: ["Azure", "AI"]
tags: "..."
slug: "post-slug"
image: "/assets/images/..."
---
```

The slug is derived from the filename by default; posts also support a `visible: false` flag to hide them.

**Routing:**
- `/` → `src/app/page.tsx` (home)
- `/posts` → `src/app/posts/page.tsx` (listing with search)
- `/posts/[slug]` → `src/app/posts/[slug]/page.tsx` (individual post, statically generated)
- `/posts/category/[slug]` → category-filtered listing
- `/categories` → categories overview

**Data layer** (`src/lib/`):
- `posts.ts` — loads and filters Markdown files from `/content/`
- `markdown.ts` — converts Markdown to HTML via remark
- `categories.ts` — defines the 22+ category taxonomy (slug, name, description, icon, color, aliases)

**Rendering:** `src/components/MobiriseContentRenderer.tsx` is the core content renderer. It parses Markdown into sections (headings, paragraphs, images, code blocks, tables, references) and renders them using the legacy Mobirise CSS design system (Bootstrap 5 + custom theme CSS from `/public/assets/`). Code blocks use `react-syntax-highlighter` with Prism.

**Images:** Each post's images must live in `content/assets/images/<slug>/` — a subfolder named after the post slug. Images are copied to `public/assets/` by the `sync-images` script (runs automatically before `build`). `public/assets/` is gitignored. Reference images as `/assets/images/<slug>/filename.ext` in frontmatter and Markdown body.

**Deployment:** Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `./out/` to GitHub Pages.

## Adding a New Post

Create a `.md` file in `/content/`. Use an existing post as a template for the frontmatter structure. Place any images in `content/assets/images/<slug>/` and reference them as `/assets/images/<slug>/filename.ext`. Run `npm run sync-images` if the post includes new images.

## Writing Style

When editing blog post content, use first-person active voice throughout — e.g. "I ran", "I clicked", "I selected". Avoid passive voice and third-person descriptions.

## Key Configuration

- `next.config.ts` — static export (`output: 'export'`), trailing slashes, unoptimized images
- `tailwind.config.ts` — scans `src/**`
- Path alias `@/*` maps to `./src/*`
