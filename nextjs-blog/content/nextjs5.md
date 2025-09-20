---
title: "Next.js (Part 5)"
description: "A comprehensive guide covering next.js (part 5)"
date: "2025-09-20"
category: "Web Development"
image: "/assets/images/2560px-nextjs-logo.svg-1536x920.png"
tags: ["typescript","azure","aws","ai","ml"]
---

# Next.js (Part 5)

## next-pwa and ionic

![AWS](/assets/images/nextjs5/2560px-nextjs-logo.svg-1536x920.png)
*This file is licensed under the Creative Commons Attribution-Share Alike 4.0 International license.*


## next-pwa

next-pwa adds [Progressive Web Application](pwa.html) (PWA) features to Nextjs

shadowwalker provides examples apps based on [next-pwa](https://github.com/shadowwalker/next-pwa) 

A Nextjs project that includes the [ionic](ionic.html) web components can be created by running the command:

```bash
% npx create-next-app --example with-ionic-typescript --use-npm haddley-nextjs-ionic-pwa
```

The steps below demonstrate how next-pwa can be added to a with-ionic-typescript project

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-9.04.07-am-1836x919.png)
*example with-ionic-typescript*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-9.07.08-am-1836x924.png)
*npm run build copies the svg folder to public*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-9.13.21-am-1836x923.png)
*update next.config.js to include next-pwa (remove the svg copy)*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-9.14.10-am-1836x920.png)
*update gitignore so that generated files are ignored*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-9.14.56-am-1836x920.png)
*add an offline page*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-9.16.04-am-1836x923.png)
*add a manifest.json file (so that app can be installed)*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-9.19.45-am-1836x919.png)
*include the icons referenced in the manifest.json*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-9.24.12-am-1836x921.png)
*include a Nextjs _document.js file that includes a reference to the manifest.json file*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-2.34.43-pm-1836x1111.png)
*I needed to remove (unneeded) files from the svg folder...*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-9.34.17-am-1836x920.png)
*npm run build*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-9.34.35-am-1290x190.png)
*Create Azure Web App*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-9.34.45-am-1262x268.png)
*provide a name*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-9.34.58-am-1270x330.png)
*select a node version*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-9.35.08-am-1298x268.png)
*select a pricing tier*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-9.38.27-am-960x218.png)
*deploying...*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-2.39.13-pm-361x732.png)
*iPhone Simulator*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-2.39.30-pm-360x732.png)
*Accessing https://haddleynextjsionicpwa.azurewebsites.net using Safari*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-2.39.47-pm-357x730.png)
*Add to Home Screen*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-2.39.56-pm-357x733.png)
*Confirm application details*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-2.40.33-pm-358x734.png)
*Application on Home Screen*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-2.40.43-pm-360x736.png)
*Application running with an Internet connection*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-2.41.54-pm-359x735.png)
*Internet connection disabled*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-2.42.08-pm-357x735.png)
*Application running offline*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-2.43.18-pm-833x512.png)
*Accessing https://haddleynextjsionicpwa.azurewebsites.net using Chrome on a MacBook*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-2.43.28-pm-836x514.png)
*Installing application on MacBook*

![](/assets/images/nextjs5/screen-shot-2022-01-13-at-2.43.45-pm-759x605.png)
*Running application online or offline on MackBook*
