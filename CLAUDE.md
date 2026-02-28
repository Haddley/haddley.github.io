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

**Images:** Each post's images must live in `content/assets/images/<slug>/` — a subfolder named after the post slug. Images are copied to `public/assets/` by the `sync-images` script (runs automatically before `build`). `public/assets/` is gitignored.

- **Frontmatter `image:` field** — use root-relative: `/assets/images/<slug>/filename.ext`
- **Markdown body `![]()` tags** — use relative (no leading `/`): `assets/images/<slug>/filename.ext`

The renderer (`MobiriseContentRenderer.tsx`) normalises relative paths to root-relative at render time, so the live site works correctly. Using relative paths in the body also makes VS Code's Markdown preview resolve images correctly from the `content/` directory.

**Deployment:** Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `./out/` to GitHub Pages.

## Adding a New Post

Create a `.md` file in `/content/`. Use an existing post as a template for the frontmatter structure. Place any images in `content/assets/images/<slug>/` and reference them as `assets/images/<slug>/filename.ext` (relative, no leading `/`) in the Markdown body, and as `/assets/images/<slug>/filename.ext` (root-relative) in the frontmatter `image:` field. Run `npm run sync-images` if the post includes new images.

## Image Filenames

macOS screenshot filenames contain spaces and a narrow no-break space (`\u202f`) before "AM"/"PM". Before referencing new images in Markdown, rename them to replace all spaces and `\u202f` with hyphens using:

```python
import os
for f in os.listdir(folder):
    new = f.replace(' ', '-').replace('\u202f', '-')
    if new != f:
        os.rename(os.path.join(folder, f), os.path.join(folder, new))
```

Run this against both `content/assets/images/<slug>/` and `public/assets/images/<slug>/`.

If images are not yet in the content directory (e.g. still on the Desktop), move and rename in one step:

```python
import os, shutil
for f in os.listdir(src_folder):
    new = f.replace(' ', '-').replace('\u202f', '-')
    shutil.move(os.path.join(src_folder, f), os.path.join(dst_folder, new))
```

## Fixing Plain-Text Image References

When a post contains bare filenames instead of Markdown image syntax (e.g. `Screenshot 2026-03-01 at 9.22.58 AM.png` on its own line), the fix process is:

1. Check whether the files exist in `content/assets/images/<slug>/` — if not, find them (commonly on the Desktop) and move them there first.
2. Rename the files to replace spaces and `\u202f` with hyphens (see above).
3. View each image to determine an appropriate first-person caption.
4. Replace each bare filename with a proper `![]()` tag and italic caption:

```markdown
![](assets/images/<slug>/Screenshot-YYYY-MM-DD-at-H.MM.SS-AM.png)
*I clicked Yes to apply the change*
```

## Post Structure — PROMPT Blocks

When a post describes a Claude Code session, use a `PROMPT` fenced code block to show the prompt that was entered:

````markdown
```PROMPT
Describe the scene
```
````

Follow each prompt block with the screenshots showing what happened next.

## Internal Links

When linking to other posts within Markdown content, always use absolute root-relative paths — never relative `.html` file references. Relative links like `machineLearning1.html` resolve incorrectly against the current post's URL.

Use: `[Link text](/posts/<slug>/)`
Not: `[Link text](otherPost.html)`

## Writing Style

When editing blog post content, use first-person active voice throughout — e.g. "I ran", "I clicked", "I selected". Avoid passive voice and third-person descriptions.

## Categories

Categories are defined in `src/lib/categories.ts`. Each post frontmatter uses the category **name** (not slug) in the `categories` array. The current taxonomy (25 categories):

| Name | Slug |
|------|------|
| .NET | dotnet |
| Python | python |
| Java | java |
| SQL | sql |
| JavaScript | javascript |
| React | react |
| Angular | angular |
| TypeScript | typescript |
| PHP | php |
| Azure | azure |
| AWS | aws |
| AI | ai |
| Power Platform | power-platform |
| Microsoft Dynamics | microsoft-dynamics |
| Business Central | business-central |
| Microsoft 365 | microsoft-365 |
| DevOps | devops |
| Mobile | mobile |
| IOT | iot |
| Maps | maps |
| 3D printing | 3d-printing |
| macOS | macos |
| Firebase | firebase |
| Web 3D | web-3d |

**Rules:**
- Use the exact category name from the table above — names are matched exactly by `getCategoryByName()` in `src/lib/categories.ts`
- ML is not a standalone category — use `AI` and add `machine-learning` as a tag
- Docker is not a standalone category — use `DevOps` and add `docker` as a tag
- Do not invent new category names; update `src/lib/categories.ts` first if a new category is needed

## Tags

Tags are stored in the frontmatter `tags:` field as a **comma-separated string**:
```yaml
tags: "chatgpt, openai, prompt-engineering, llm"
```

The parser in `src/lib/posts.ts` splits on commas, so space-separated values without commas become a single tag.

**Rules:**
- Lowercase, hyphenated for multi-word terms: `machine-learning`, `al-language`, `azure-functions`
- 3–6 tags per post — more specific than categories, capturing tools, patterns, and named technologies
- Do not duplicate the category name as a tag (e.g. don't tag an AI post with `ai`)
- Tags are rendered as Bootstrap `badge bg-secondary` chips on post pages and in search results — no UI changes needed when adding tags

## Key Configuration

- `next.config.ts` — static export (`output: 'export'`), trailing slashes, unoptimized images
- `tailwind.config.ts` — scans `src/**`
- Path alias `@/*` maps to `./src/*`
