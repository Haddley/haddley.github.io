---
title: "Next.js (Part 3)"
description: "API routes and next-auth"
date: "2021-11-07"
categories: ["JavaScript","React"]
tags: []
slug: "nextjs3"
image: "/assets/images/2560px-nextjs-logo.svg-1536x920.png"
---


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


## articles.js and pagesapiarticlesindex.js

```text
// articles.js

export const articles = [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  }
]

// /pages/api/articles/index.js
import { articles } from '../../../articles'

const index = async (req, res) => {

    res.status(200).json(articles)

}

export default index
```

## pagesapiarticlesid.js

```text
// /pages/api/articles/[id].js
import {articles} from '../../../articles'

const article = async (req, res) => {

    const { query: { id } } = req

    const article = articles.find(a => a.id.toString() === id)

    if (!article) {
        res.status(404).json({ message: `article ${id} not found` })
    }

    res.status(200).json(article)

}

export default article
```

## pagesunprotected

```text
import { articles } from '../articles'

function index() {

    return (
        <div>
            <ul>
                {articles.map(article => (<li key={article.id}>{article.title}</li>))}
            </ul>
        </div>
    )
}

export default index
```

## .env

```text
//.env
NEXTAUTH_GITHUB_ID=e95a2816a93e7daabc6c
NEXTAUTH_GITHUB_SECRET=<secret>
```

## apiauth...nextauth.js

```text
// /api/auth/[...nextauth].js
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
    // @link https://next-auth.js.org/configuration/providers
    providers: [
        Providers.GitHub({
            clientId: process.env.NEXTAUTH_GITHUB_ID,
            clientSecret: process.env.NEXTAUTH_GITHUB_SECRET,            
        }),
        /*Providers.Google({
            clientId: process.env.NEXTAUTH_GOOGLE_ID,
            clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET,
        }),
        Providers.Facebook({
            clientId: process.env.NEXTAUTH_FACEBOOK_ID,
            clientSecret: process.env.NEXTAUTH_FACEBOOK_SECRET,
        }),*/
    ]
}

export default (req,res) => NextAuth(req,res,options)
```

## _app.js

```text
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Provider } from "next-auth/client";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const theme = {
    colors: {
        primary: '#0070f3',
    },
}

export default function App({ Component, pageProps }) {
    return (
        <>
            <Provider session={pageProps.session}>
                <GlobalStyle />
                <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </Provider>
        </>
    )
}
```

## pagesapiarticlesindex.js updated

```text
import { articles } from '../../../articles'
import { getSession } from 'next-auth/client'

const index = async (req, res) => {

    const session = await getSession({ req });
    if (session) {
        res.status(200).json(articles)
    } else {
        res.status(401).json({ message: `please log in` })
    }

}

export default index
```

## pagesapiarticlesid.js updated

```text
import { articles } from '../../../articles'
import { getSession } from 'next-auth/client'

const article = async (req, res) => {

    const session = await getSession({ req });
    if (session) {
        const { query: { id } } = req
        const article = articles.find(a => a.id.toString() === id)
        if (!article) {
            res.status(404).json({ message: `article ${id} not found` })
        }
        res.status(200).json(article)
    } else {
        res.status(401).json({ message: `please log in` })
    }

}

export default article
```

## pagesprotected.js

```text
import { getSession } from "next-auth/client"
import { articles } from '../articles'

function index({ session, articles }) {

    // If no session exists, display access denied message
    if (!session) { return (<div>You need to be logged on</div>) }

    return (
        <div>
            <ul>
                {articles.map(article => (<li key={article.id}>{article.title}</li>))}
            </ul>
        </div>
    )
}

export default index

export const getServerSideProps = async (context) => {

    const session = await getSession(context);

    // If no session exists, display access denied message
    if (!session) {
        return {
            props: {
                session
            }
        }
    }

    return {
        props: {
            session,
            articles
        }
    }
}
```

## pagesprotected.js

```text
import { useSession } from "next-auth/client"
import useSWR from 'swr'

function index() {
    
    const [ session, loading ] = useSession()

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return  (<div>You need to be logged on</div>) }


  const fetcher = (...args) => fetch(...args).then(res => res.json())

    const { data, error } = useSWR('/api/articles', fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    
    return (
        <div>
            <ul>
                {data.map(article => (<li key={article.id}>{article.title}</li>))}
            </ul>
        </div>
    )

}

export default index
```

## pagesindex.js

```text
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Home() {
  const [session, loading] = useSession()

  return (
    <>
      {!session && (<>
        Not signed in
        <br />
        <button onClick={signIn}>Sign In</button>
      </>)}
      {session && (<>
        Signed in as {session.user.email}
        <br />
        <button onClick={signOut}>Sign Out</button>
      </>)}
    </>
  )
}
```

## ...nextauth.js

```text
import NextAuth from "next-auth";
import { session } from "next-auth/client";
import Providers from "next-auth/providers";

const options = {
    // @link https://next-auth.js.org/configuration/providers
    providers: [
        Providers.GitHub({
            clientId: process.env.NEXTAUTH_GITHUB_ID,
            clientSecret: process.env.NEXTAUTH_GITHUB_SECRET,
        }),
        /*Providers.Google({
            clientId: process.env.NEXTAUTH_GOOGLE_ID,
            clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET,
        }),
        Providers.Facebook({
            clientId: process.env.NEXTAUTH_FACEBOOK_ID,
            clientSecret: process.env.NEXTAUTH_FACEBOOK_SECRET,
        }),*/
    ],
    database: process.env.DB_URL,
    session: {
        jwt: true
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            console.log("token", token)
            console.log("user", user)
            console.log("account", account)
            console.log("profile", profile)
            console.log("isNewUser", isNewUser)
            if (user && user.id) {
                token.id = user.id
            }
            if (account && account.provider) {
                token.provider = account.provider
            }
            return token
        },
        async session(session, token) {
            session.user.id = token.id
            session.user.provider = token.provider
            return session
        }
    }
}

export default (req, res) => NextAuth(req, res, options)
```

## .env

```text
NEXTAUTH_GITHUB_ID=e95a2816a93e7daabc6c
NEXTAUTH_GITHUB_SECRET=<secret>

DB_USER=<user>
DB_PASSWORD=<password>
DB_URL=mongodb+srv://$DB_USER:$DB_PASSWORD@cluster0.gdnd5.mongodb.net/nextauthDB?retryWrites=true&w=majority
JWT_SECRET=<secret>
NEXTAUTH_URL=http://localhost:3000
```