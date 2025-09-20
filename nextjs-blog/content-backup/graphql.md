---
title: "GraphQL"
description: "A comprehensive guide covering graphql"
date: "2025-09-20"
category: "Development"
image: "/assets/images/graphql.png"
tags: ["react","docker","ai"]
---

# GraphQL

GraphQL GraphQL is a query and manipulation language for APIs. GraphQL Logo by Facebook is licensed under BSD GraphQL compared to REST A REST API client may need to make multiple calls to a REST Service to get all of the data it needs. A GraphQL API client may be able to request all of the data it needs in a single call. GraphQL supports reading data, mutating data, and subscribing to data (WebSockets). server.js We create a package.json file using the npm init command $ npm init -y We add the GraphQL dependencies using npm $ npm i express@4.16.4 express-graphql@0.7.1 graphql@14.1.1 cors@2.8.5 npm i server.js Once the dependencies have been added we can create a server.js file. server.js package.json Now we can update the package.json file and run the GraphQL service. "scripts": { "start": "node server.js" }, package.json npm start Use "npm start" to run the GraphQL server. $ npm start Reading books and related author details Reading data for a single author Mutating data. Adding an author Mutating data. Adding a book A GraphQL client app It is possible to use react and apollo to create a GraphQL client app. We create a package.json file using the npm init command $ npm init -y We add the GraphQL and Apollo dependencies using npm $ npm i apollo-boost@0.4.9 graphql@15.4.0 react@17.0.1 react-apollo@3.1.5 react-dom@17.0.1 react-scripts@4.0.1 The app.js code includes a GraphQL query, an ApolloProvider and a Query. app.js localhost:3000 API Gateway Notice that the Cross-Origin Resource Sharing (CORS) library reference in the GraphQL code above is not needed when the GraphQL server and the GraphQL client App are published using an API Gateway . Docker Hub
