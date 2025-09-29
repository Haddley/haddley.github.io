---
title: "Next.js (Part 5)"
description: "next-pwa and ionic"
date: "2022-01-13"
categories: ["TypeScript","React",".NET"]
tags: []
slug: "nextjs5"
image: "/assets/images/2560px-nextjs-logo.svg-1536x920.png"
---


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


## .gitignore

```text
**/public/workbox-*.js
**/public/sw.js
**/public/fallback-*.j
```

## _offline.js

```text
import Head from 'next/head'

export default () => (
  <>
    <Head>
      <title>next-pwa example</title>
    </Head>
    <h1>This is offline fallback page</h1>
    <h2>When offline, any page route will fallback to this page</h2>
  </>
)
```

## manifest.json

```text
{
    "name": "next-pwa",
    "short_name": "next-pwa",
    "display": "standalone",
    "orientation": "portrait",
    "theme_color": "#FFFFFF",
    "background_color": "#FFFFFF",
    "start_url": "/",
    "icons": [
      {
        "src": "/icons/android-chrome-192x192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any maskable"
      },
      {
        "src": "/icons/icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ]
  }
```

## _document.js

```text
import Document, { Html, Head, Main, NextScript } from 'next/document'

const APP_NAME = 'next-pwa example'
const APP_DESCRIPTION = 'This is an example of using next-pwa plugin'

export default class extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx)
  }

  render() {
    return (
      <Html lang='en' dir='ltr'>
        <Head>
          <meta name='application-name' content={APP_NAME} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content={APP_NAME} />
          <meta name='description' content={APP_DESCRIPTION} />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='theme-color' content='#FFFFFF' />
          {/* TIP: set viewport head meta tag in _app.js, otherwise it will show a warning */}
          {/* <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' /> */}
          
          <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='shortcut icon' href='/favicon.ico' />
          <style>{
            `
            html, body, #__next {
              height: 100%;
            }
            #__next {
              margin: 0 auto;
            }
            h1 {
              text-align: center;
            }
            `
          }</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
```