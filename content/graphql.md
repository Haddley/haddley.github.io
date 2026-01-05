---
title: "GraphQL"
description: "GraphQL is a query and manipulation language for APIs."
date: "2021-03-01"
categories: ["JavaScript"]
tags: "graphql"
slug: "graphql"
image: "/assets/images/graphql-logo.svg-1200x1200.png"
---



A [REST](/posts/restapiservice/) API client may need to make multiple calls to a REST Service to get all of the data it needs.

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


## server.js

```javascript
const express = require('express')
const expressGraphQL = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')

const cors=require('cors'); // optional

const app = express()

app.use(cors()) // optional

const authors = [
  { id: 1, name: 'Samer Buna' },
  { id: 2, name: 'Robin Wieruch' },
  { id: 3, name: 'Nader Dabit' },
  { id: 4, name: 'Sebastian Grebe' },
  { id: 5, name: 'Eve Porcello' },
  { id: 6, name: 'Alex Banks' }
]

const books = [
  { id: 1, isbn10: '161729568X', name: 'GraphQL in Action', authorIds: [1] },
  { id: 2, isbn10: '1730853935', name: 'The Road to GraphQL: Your journey to master pragmatic GraphQL in JavaScript with React.js and Node.js', authorIds: [2] },
  { id: 3, isbn10: '1492059897', name: 'Full Stack Serverless: Modern Application Development with React, AWS, and GraphQL', authorIds: [3] },
  { id: 4, isbn10: '1789134528', name: 'Hands-On Full-Stack Web Development with GraphQL and React', authorIds: [4] },
  { id: 5, isbn10: '1492030716', name: 'Learning GraphQL: Declarative Data Fetching for Modern Web Apps', authorIds: [5, 6] },
  { id: 6, isbn10: '1492051721', name: 'Learning React: Modern Patterns for Developing React Apps', authorIds: [5, 6] },
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represents a book written by an author',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    isbn10: { type: GraphQLNonNull(GraphQLString) },
    authorIds: { type: GraphQLNonNull(GraphQLList(GraphQLInt)) },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (book) => {
        return authors.filter(author => (book.authorIds.includes(author.id)))
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents an author of a book',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return books.filter(book => (book.authorIds.includes(author.id)))
      }
    }
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    book: {
      type: BookType,
      description: 'A Single Book',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => books.find(book => book.id === args.id)
    },
    books: {
      type: new GraphQLList(BookType),
      description: 'List of All Books',
      resolve: () => books
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of All Authors',
      resolve: () => authors
    },
    author: {
      type: AuthorType,
      description: 'A Single Author',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => authors.find(author => author.id === args.id)
    }
  })
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'Add a book',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        isbn10: { type: GraphQLNonNull(GraphQLString) },
        authorIds: { type: GraphQLNonNull(GraphQLList(GraphQLInt)) }
      },
      resolve: (parent, args) => {
        const book = { id: books.length + 1, name: args.name, isbn10: args.isbn10, authorIds: args.authorIds }
        books.push(book)
        return book
      }
    },
    addAuthor: {
      type: AuthorType,
      description: 'Add an author',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const author = { id: authors.length + 1, name: args.name }
        authors.push(author)
        return author
      }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}))
app.listen(5000, () => console.log('Server Running'))
```

## package.json

```javascript
{
  "name": "graphql-server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node server.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/haddleyoffice365/graphql-server.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/haddleyoffice365/graphql-server/issues"
  },
  "homepage": "https://github.com/haddleyoffice365/graphql-server#readme",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.16.4",
    "express-graphql": "^0.7.1",
    "graphql": "^14.1.1"
  }
}
```

## app.js

```javascript
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})

const query = gql`
query booksQuery {
  books {
    id,
    name,
    authors
    {
      name
    }
  }
}
`

function App() {

  return (

    <ApolloProvider client={client}>

      <div>

        <Query query={query}>
          {
            ({ loading, error, data }) => {
              if (loading) return <h4>Loading...</h4>
              if (error) console.log({ error })
              return data.books.map(book =>
                <>
                  <h3 key={book.id}>{book.name}</h3>
                  {book.authors.map(author =>
                    <h4>{author.name}</h4>)}
                </>
              )
            }
          }
        </Query>

      </div>

    </ApolloProvider>

  );
}

export default App;
```