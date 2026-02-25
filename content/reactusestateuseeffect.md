---
title: "React useState and useEffect"
description: "Create a React app using the useState and useEffect hook."
date: "2021-02-08"
categories: ["React"]
tags: "react, usestate, useeffect, hooks"
slug: "reactusestateuseeffect"
image: "/assets/images/reactusestateuseeffect/logo512-512x512.png"
---



## React Hooks

I used React Hooks to manage state and side effects in React function components. The key hooks I used were:

**useState** — manages component state, useful for tracking values like checked/unchecked or data fetched from an API.
**useEffect** — replaces componentDidMount, componentDidUpdate, and componentWillUnmount. I used it to fetch data before rendering.
**useContext** — makes global state accessible to any component without passing props down manually.
**useReducer** — preferable to useState for complex state logic; provides an alternative to Redux.


## Fetching data from an API

I used useState and useEffect to call an API from a React functional component.


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