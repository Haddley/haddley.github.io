---
title: "Next.js (Part 3)"
description: "A comprehensive guide covering next.js (part 3)"
date: "2025-09-20"
category: "Web Development"
image: "/assets/images/2560px-nextjs-logo.svg-1536x920.png"
tags: ["aws","database","ai","git","github"]
---

# Next.js (Part 3)

## API routes and next-auth

![AWS](/assets/images/nextjs3/2560px-nextjs-logo.svg-1536x920.png)
*This file is licensed under the Creative Commons Attribution-Share Alike 4.0 International license.*


## Get Request

API routes let you create an API endpoint inside a Next.js app.

To create an API endpoint inside a Next.js app add a file (or folder) to the /pages/api directory

![](/assets/images/nextjs3/screen-shot-2021-11-07-at-11.01.17-am-1646x784.png)
*Get Request*


## Dynamic API routes

API routes can be dynamic, just like regular Next.js pages

![](/assets/images/nextjs3/screen-shot-2021-11-07-at-11.01.28-am-1648x790.png)
*Dynamic API Route*


## Unprotected pages

User login is not required to access all of the pages.

![](/assets/images/nextjs3/screen-shot-2021-11-10-at-7.59.37-am-1830x918.png)
*Unprotected page*


## next-auth

next-auth can be used to prevent unauthorized access to protected api methods and protected pages.

$npm install next-auth


## GitHub Id and GitHub Secret

Here I used [GitHub](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) as an authentication provider.

![](/assets/images/nextjs3/screen-shot-2021-11-08-at-12.52.06-pm-1536x1078.png)
*GitHub Developer Settings*

![](/assets/images/nextjs3/screen-shot-2021-11-08-at-12.54.01-pm-1536x1080.png)
*Register a new OAuth application*

![](/assets/images/nextjs3/screen-shot-2021-11-08-at-12.55.08-pm-1536x1078.png)
*Note the Client ID and Client Secret*


## .env

Maintain the Client ID and Client Secret values in an .env file


## [...nextauth]

Add a [...nextauth] api method


## _app.js

Add a 'next-auth/client' Provider to _app.js

![](/assets/images/nextjs3/screen-shot-2021-11-08-at-6.52.44-pm-1436x1152.png)
*Provider*


## Add code to prevent unauthorized access

Ensure that a valid session exists before returning articles or article details (using a REST API call or a web page request)

![](/assets/images/nextjs3/screen-shot-2021-11-08-at-7.05.14-pm-1536x801.png)
*/api/articles is now protected*

![](/assets/images/nextjs3/screen-shot-2021-11-08-at-7.10.18-pm-1536x803.png)
*/api/articles/4 is now protected*

![](/assets/images/nextjs3/screen-shot-2021-11-08-at-7.52.40-pm-1536x808.png)
*page /protected is now protected (server-side)*

![](/assets/images/nextjs3/screen-shot-2021-11-09-at-2.35.03-pm-1830x922.png)
*page /protected is now protected (client-side)*


## Adding login and logout to home page

Adding "Sign In" and "Sign Out" to home page.

![](/assets/images/nextjs3/screen-shot-2021-11-08-at-7.15.04-pm-1536x803.png)
*Sign in*

![](/assets/images/nextjs3/screen-shot-2021-11-08-at-7.15.15-pm-1536x801.png)
*Sign in with GitHub provider*

![](/assets/images/nextjs3/screen-shot-2021-11-08-at-7.15.26-pm-1536x803.png)
*Signed in*

![](/assets/images/nextjs3/screen-shot-2021-11-08-at-7.15.44-pm-1536x802.png)
*authorized*

![](/assets/images/nextjs3/screen-shot-2021-11-08-at-7.15.55-pm-1536x804.png)
*authorized*

![](/assets/images/nextjs3/screen-shot-2021-11-10-at-8.26.00-am-1826x922.png)
*authorized*


## next-auth database (optional)

Specifying a database is optional if you don't need to persist user data or support email sign in. If you don't specify a database then JSON Web Tokens will be enabled for session storage and used to store session data.

To specify a database update the [...nextauth].js file (and a few environment variables).

![](/assets/images/nextjs3/screen-shot-2021-11-11-at-6.59.22-am-1836x1204.png)
*accounts*

![](/assets/images/nextjs3/screen-shot-2021-11-11-at-7.02.27-am-1836x1196.png)
*users*

![](/assets/images/nextjs3/screen-shot-2021-11-11-at-10.12.00-am-1836x986.png)
*session (with user id and provider)*

![](/assets/images/nextjs3/screen-shot-2021-11-11-at-6.17.31-pm-1734x1146.png)
*pages*
