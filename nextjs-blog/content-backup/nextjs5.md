---
title: "Next.js (Part 5)"
description: "A comprehensive guide covering next.js (part 5)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/nextjs5.png"
tags: ["typescript","git"]
---

# Next.js (Part 5)

Next.js (Part 5) next-pwa and ionic This file is licensed under the Creative Commons Attribution-Share Alike 4.0 International license. next-pwa next-pwa adds Progressive Web Application (PWA) features to Nextjs shadowwalker provides examples apps based on next-pwa A Nextjs project that includes the ionic web components can be created by running the command: % npx create-next-app --example with-ionic-typescript --use-npm haddley-nextjs-ionic-pwa The steps below demonstrate how next-pwa can be added to a with-ionic-typescript project example with-ionic-typescript npm run build copies the svg folder to public update next.config.js to include next-pwa (remove the svg copy) next.config.js update gitignore so that generated files are ignored .gitignore add an offline page _offline.js add a manifest.json file (so that app can be installed) manifest.json include the icons referenced in the manifest.json include a Nextjs _document.js file that includes a reference to the manifest.json file _document.js {/* TIP: set viewport head meta tag in _app.js, otherwise it will show a warning */} {/* */}
