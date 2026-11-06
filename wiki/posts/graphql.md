---
type: post
slug: graphql
title: "GraphQL"
date: "2021-03-01"
builds_on: [restapiservice, apigateway]
topics: [graphql-api, data-fetching, schema-design, mutation-vs-query]
tools: [Node.js, Express, express-graphql, React, Apollo, GraphiQL]
status: current
checked: "2026-11-05"
source_hash: "47568a661bcb"
generated_by: gemma4:12b
---

**Summary.** I explain how to build a GraphQL server using Node and Express to solve the problem of making multiple requests for related data. I demonstrate how a single query can fetch nested information and how mutations can modify that data.

## What I did
- I built a GraphQL server using Node, Express, and the express-graphql library.
- I defined a schema with resolvers to handle data retrieval and mutations.
- I created a React client using Apollo to consume the GraphQL API.
- I compared the capabilities of GraphQL against OData for data fetching.

## Claims
- A GraphQL client can request all necessary data in a single call.
  > "A GraphQL API client may be able to request all of the data it needs in a single call."
- The schema defines the types and fields while the resolver provides the values.
  > "The schema lists the types and fields, and resolvers supply the values."
- GraphQL rejects a request before the resolver runs if a required field is missing.
  > "If one is missing, GraphQL rejects the request before the resolver runs."
- The server uses arrays to store data, so information is lost when the server restarts.
  > "Anything that a mutation adds is lost when the server restarts, so this is a way to learn GraphQL, not a way to store data."
- The CORS library is not needed if the client and server are published under one address via an API Gateway.
  > "When an API Gateway publishes the client and the server under one address, the browser sees a single origin, and the library is no longer needed."
- OData provides generic filtering for free using query options in the URL.
  > "OData answers the same need with query options in the URL, and gives clients generic filtering for free, as my OData post shows."

## Outcome
I built a functional GraphQL server and a React client to demonstrate how to fetch nested data in one request. I concluded that GraphQL and OData offer different ways to solve the same data retrieval problems.

## Caveats
The current project uses the express-graphql library which is no longer maintained.
