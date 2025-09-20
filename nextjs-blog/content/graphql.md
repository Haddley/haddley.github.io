---
title: "GraphQL"
description: "A comprehensive guide covering graphql"
date: "2025-09-20"
category: "Development"
image: "/assets/images/graphql/hero.png"
tags: ["react","ai","ml"]
---

# GraphQL

## GraphQL is a query and manipulation language for APIs.

![GraphQL](/assets/images/graphql/graphql-logo.svg-1200x1200.png)
*GraphQL Logo by Facebook is licensed under BSD*


## GraphQL compared to REST

A [REST](restapiservice.html) API client may need to make multiple calls to a REST Service to get all of the data it needs.

A GraphQL API client may be able to request all of the data it needs in a single call.

GraphQL supports reading data, mutating data, and subscribing to data (WebSockets).


## server.js

We create a package.json file using the npm init command
**$ npm init -y**

We add the GraphQL dependencies using npm
**$ npm i express@4.16.4 express-graphql@0.7.1 graphql@14.1.1 cors@2.8.5**

![](/assets/images/graphql/screen-shot-2021-03-02-at-10.50.19-pm-1536x940.png)
*npm i*


## server.js

Once the dependencies have been added we can create a server.js file.


## package.json

Now we can update the package.json file and run the GraphQL service.

"scripts": {
  "start": "node server.js"
  },


## npm start

Use "npm start" to run the GraphQL server.

**$ npm start**

![](/assets/images/graphql/screen-shot-2021-03-02-at-10.55.09-pm-1536x778.png)
*Reading books and related author details*

![](/assets/images/graphql/screen-shot-2021-03-02-at-10.57.26-pm-1536x782.png)
*Reading data for a single author*

![](/assets/images/graphql/screen-shot-2021-03-02-at-11.00.26-pm-1536x780.png)
*Mutating data. Adding an author*

![](/assets/images/graphql/screen-shot-2021-03-02-at-11.03.34-pm-1536x785.png)
*Mutating data. Adding a book*


## A GraphQL client app

It is possible to use react and apollo to create a GraphQL client app.

We create a package.json file using the npm init command
**$ npm init -y**

We add the GraphQL and Apollo dependencies using npm
**$ npm i apollo-boost@0.4.9 graphql@15.4.0 react@17.0.1 react-apollo@3.1.5 react-dom@17.0.1 react-scripts@4.0.1**

The app.js code includes a GraphQL query, an ApolloProvider and a Query.

![](/assets/images/graphql/screen-shot-2021-03-02-at-11.52.18-pm-1536x884.png)
*localhost:3000*


## API Gateway

Notice that the Cross-Origin Resource Sharing (CORS) library reference in the GraphQL code above is not needed when the GraphQL server and the GraphQL client App are published using an [API Gateway](apigateway.html).
