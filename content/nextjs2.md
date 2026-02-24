---
title: "Next.js (Part 2)"
description: "getStaticProps, getServerSideProps, getStaticPaths and useSWR"
date: "2021-11-06"
categories: ["React"]
tags: ""
slug: "nextjs2"
image: "/assets/images/nextjs2/2560px-nextjs-logo.svg-1536x920.png"
---


## Pre-rendering

I explored Next.js's two forms of pre-rendering: Static Generation and Server-side Rendering. Static Generation generates HTML at build time; Server-side Rendering generates it on each request. I used both in the same app — different pages used different strategies.


## Static Generation (with data)

After exporting a page function, I also exported a `getStaticProps` function. It runs at build time to fetch data and pass it as props to the page.


## getStaticProps

I used `getStaticProps` to generate a page based on data returned by a web service call*.

* [You should not fetch an API Route from getStaticProps or getStaticPaths](https://nextjs.org/learn/basics/api-routes/api-routes-details). Instead, write your server-side code directly in getStaticProps or getStaticPaths (or call a helper function).

![](/assets/images/nextjs2/screen-shot-2021-11-06-at-6.18.26-pm-1486x906.png)
*getStaticProps*


## getServerSideProps

I used `getServerSideProps` at runtime to build a page in response to each request.

![](/assets/images/nextjs2/screen-shot-2021-11-06-at-6.26.46-pm-1492x908.png)
*getServerSideProps*


## getStaticPaths

I used `getStaticProps` and `getStaticPaths` together to generate multiple pages at build time.

![](/assets/images/nextjs2/screen-shot-2021-11-06-at-6.57.55-pm-1490x906.png)
*getStaticProps and getStaticPaths being used together*


## next export

I used `next export` to generate static HTML pages that I could upload to a static web server. I ran `npm run export` to produce the output.

![](/assets/images/nextjs2/screen-shot-2021-11-06-at-7.29.43-pm-1836x1051.png)
*npm run export*

![](/assets/images/nextjs2/screen-shot-2021-11-06-at-7.35.14-pm-1836x942.png)
*The out folder contained the generated pages*

![](/assets/images/nextjs2/screen-shot-2021-11-06-at-7.31.45-pm-1486x908.png)
*/out/articles/36*


## useSWR

After the server-side rendered parts of a page downloaded, I used `useSWR` to fetch data client-side and populate the remaining parts of the page. I installed it with `npm install swr`.


## Catch all routes

I used catch-all routes by adding three dots (`...`) inside the brackets. For example:

`pages/post/[...slug].js` matches `/post/a`, but also `/post/a/b`, `/post/a/b/c`, and so on.

`pages/fullname/[...slug]/index.js` matches `/fullname/neil`, but also `/fullname/neil/haddley`, `/fullname/neil/leonard/haddley`, and so on.

I used names other than `slug`, such as `[...param]`.

![](/assets/images/nextjs2/screen-shot-2021-11-07-at-9.14.45-am-1380x791.png)
*Client-side code*

![](/assets/images/nextjs2/screen-shot-2021-11-07-at-9.15.03-am-1380x785.png)
*Catch all routes*


## pagesarticlesindex.js

```text
function index({ articles }) {
    return (
        <div>
            <ul>
                {articles.map(article => (<li key={article.id}>{article.title}</li>))}
            </ul>
        </div>
    )
}

export default index

export const getStaticProps = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
    const articles = await res.json();

    return {
        props: {
            articles: articles
        }
    }
}
```

## pagesarticlesidindex.js

```text
function article({ article }) {

    return (
        <div>
            <h1>{article.title}</h1>
            This is article {article.id}
            <p>{article.body}</p>
        </div>
    )
}

export default article

export const getServerSideProps = async (context) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`)
    const article = await res.json()
    return {
        props: {
            article: article
        }
    }
}
```

## pagesarticlesidindex.js

```text
function article({ article }) {

    return (
        <div>
            <h1>{article.title}</h1>
            This is article {article.id}
            <p>{article.body}</p>
        </div>
    )
}

export default article

export const getStaticProps = async (context) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`)
    const article = await res.json()

    return {
        props: {
            article: article
        }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const articles = await res.json()
    const ids = articles.map(article => (article.id))
    const paths = ids.map(id => ({ params: { id: id.toString() } }))

    return {
        paths,
        fallback: false
    }
}
```

## pagesarticlesidindex.js

```yaml
import {useRouter} from 'next/router'
import useSWR from 'swr'

function article() {

    const router = useRouter()
    const {id} = router.query

    if (!id) return <div>waiting...</div>

    const fetcher = (...args) => fetch(...args).then(res => res.json())

    const { data, error } = useSWR(`https://jsonplaceholder.typicode.com/posts/${id}`, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    
    return (
        <div>
            <h1>{data.title}</h1>
            This is article {data.id}
            <p>{data.body}</p>
        </div>
    )
}

export default article
```

## pagesfullname...slugindex.js

```text
import {useRouter} from 'next/router'

function name() {

    const router = useRouter()
    const {slug} = router.query

    if (!slug) return <div>waiting...</div>

    return (
        <div>
            <h1>{slug.join(' ')}</h1>
        </div>
    )
}

export default name
```