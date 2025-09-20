---
title: "Next.js (Part 1)"
description: "A comprehensive guide covering next.js (part 1)"
date: "2025-09-20"
category: "Web Development"
image: "/assets/images/2560px-nextjs-logo.svg-1536x920.png"
tags: ["react","javascript","aws","java","git"]
---

# Next.js (Part 1)

## The React Framework for Production

![AWS](/assets/images/nextjs1/2560px-nextjs-logo.svg-1536x920.png)
*This file is licensed under the Creative Commons Attribution-Share Alike 4.0 International license.*


## create-next-app

npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"

![](/assets/images/nextjs1/screen-shot-2021-11-05-at-6.06.36-pm-1140x742.png)
*npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"*

![](/assets/images/nextjs1/screen-shot-2021-11-05-at-6.07.13-pm-1138x744.png)
*npm run dev*

![](/assets/images/nextjs1/screen-shot-2021-11-05-at-6.07.50-pm-1746x1196.png)
*accessing nextjs-blog*

![](/assets/images/nextjs1/screen-shot-2021-11-05-at-6.09.08-pm-1142x740.png)
*npm run dev*

![](/assets/images/nextjs1/screen-shot-2021-11-05-at-6.11.11-pm-884x696.png)
*create the about page*

![](/assets/images/nextjs1/screen-shot-2021-11-05-at-6.11.35-pm-1108x380.png)
*React Functional Export Component (frce)*

![](/assets/images/nextjs1/screen-shot-2021-11-05-at-6.12.08-pm-994x532.png)
*notice that the React from 'react' import is not needed*

![](/assets/images/nextjs1/screen-shot-2021-11-05-at-6.12.46-pm-764x302.png)
*accessing the about page*


## Link component

The Link component is used to enable client-side navigation between pages.

Here I have used the Link component to improve performance of page navigation between the index and second-post pages in a posts folder.

In a production build Next.js automatically prefetches the code for linked pages in the background.

![](/assets/images/nextjs1/screen-shot-2021-11-05-at-6.16.50-pm-644x340.png)
*creating a posts folder*

![](/assets/images/nextjs1/screen-shot-2021-11-05-at-6.28.23-pm-1836x887.png)
*Network traffic when <a href=...> tag is used*

![](/assets/images/nextjs1/screen-shot-2021-11-05-at-6.28.41-pm-1836x884.png)
*Network traffic when Link component is used*


## public folder

Public files are added the project's public folder

![](/assets/images/nextjs1/screen-shot-2021-11-05-at-7.42.29-pm-1836x1133.png)
*profile.jpeg*

![](/assets/images/nextjs1/screen-shot-2021-11-05-at-7.43.26-pm-1836x884.png)
*accessing the profile.jpeg file*

![](/assets/images/nextjs1/screen-shot-2021-11-05-at-7.49.46-pm-1768x1064.png)
*a page with a next/image component*


## Metadata

The 'next/head' component can be used to set the <title> tag for a Next.js page.

![](/assets/images/nextjs1/screen-shot-2021-11-05-at-8.00.51-pm-1126x422.png)
*Page title is 'Posts'*


## CSS Modules

Next.js supports CSS Modules using the [name].module.css file naming convention.

![](/assets/images/nextjs1/screen-shot-2021-11-05-at-9.47.27-pm-1836x960.png)
*CSS Modules*

![](/assets/images/nextjs1/screen-shot-2021-11-05-at-9.52.59-pm-1766x1068.png)
*first-post page with CSS Modules component added*


## Styled Components

Styled Components is a CSS-in-JS tool that lets developers write CSS in JavaScript files.

I ran the following commands to install styled-components.

$ npm install styled-components
$ npm install --save-dev babel-plugin-styled-components

I added a .bablerc file with this content

{
    "presets": ["next/babel"],
    "plugins": [["styled-components", {"ssr":true}]]
}

Finally I copied the _document.js file from: [https://github.com/vercel/next.js/blob/canary/examples/with-styled-components/pages/_document.js](https://github.com/vercel/next.js/blob/canary/examples/with-styled-components/pages/_document.js) to the project's /pages folder

see also: [https://github.com/vercel/next.js/tree/canary/examples/with-styled-components](https://github.com/vercel/next.js/tree/canary/examples/with-styled-components)

![](/assets/images/nextjs1/screen-shot-2021-11-06-at-4.53.54-pm-1836x1057.png)
*Styled Components*

![](/assets/images/nextjs1/screen-shot-2021-11-06-at-11.52.18-am-1782x1076.png)
*second-post page with styled-component added*
