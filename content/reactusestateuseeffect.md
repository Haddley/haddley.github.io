---
title: "React useState and useEffect"
description: "Create a React app using the useState and useEffect hook."
date: "2021-02-08"
categories: ["React"]
tags: []
slug: "reactusestateuseeffect"
image: "/assets/images/logo512-512x512.png"
---



## React Hooks

The React team introduced React Hooks in 2018. 

React Hooks allow React function components to "hook into" React state and lifecycle features.

React Hooks include:

**useState **If you want to create a component that needs to know if it is currently "checked" or "unchecked" the useState hook will be useful to you. If you are writing a component that fetches data from an API useState will be useful to you.**useEffect **The useEffect hooks replaces the componentDidMount, componentDidUpdate and componentWillUnmount React class methods. If you are a functional component developer and your component needs to fetch data before it can be rendered the useEffect will be useful you.useContext Data is often passed from top level components to child components using props. The useContext hook makes it easy for any component to access global state.
**useReducer** The useReducer hook is preferable to the useState hook when more complex state logic is necessary. The useReducer hook provides an alternative to Redux.


## Fetching data from an API

The example below demonstrates how a React functional component can call an API


## useState and useEffect

```javascript
const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("/books")
      .then(result => {
        setData(() => result.data)
      })
      .catch(err => {
        console.log(err)
      })
  })
```