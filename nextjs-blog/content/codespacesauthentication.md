---
title: "Codespaces and Authentication"
description: "A comprehensive guide covering codespaces and authentication"
date: "2025-09-20"
category: "Development"
image: "/assets/images/codespacesauthentication/hero.png"
tags: ["react","azure","git","github"]
---

![](/assets/images/codespacesauthentication/logo512-512x512.png)
*React-icon by Facebook does not meet the threshold of originality needed for copyright protection*


I used GitHub Codespaces to create a React app, I published the React App using Azure Static Web Sites and GitHub Actions. I used a staticwebapp.config.json file to enable user login and Authentication.

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.28.25-am-1836x627.png)
*I navigated to GitHub and clicked on the Codespaces link*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.28.54-am-1836x1057.png)
*I clicked on the React|Use this template button*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.30.00-am-1836x1126.png)
*Codespaces opened and "npm start" was executed*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.30.39-am-1836x1119.png)
*I ran "npm run build" (noticing that generated files were saved to the /build folder).*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.32.02-am-1836x1052.png)
*I published the react project as a new GitHub repository*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.32.28-am-1836x1123.png)
*The repository was named Haddley/codespaces-react*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.34.16-am-1836x989.png)
*I navigated to https://portal.azure.com*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.34.38-am-1836x497.png)
*I clicked on the "Static Web Apps" link*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.34.55-am-1836x985.png)
*I clicked the + Create link*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.36.33-am-1836x988.png)
*I created a new resource group*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.36.54-am-1836x988.png)
*I selected the free plan (for hobby and personal projects). I left the Source as GitHub (the default)*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.37.38-am-1836x983.png)
*I selected the codespaces-react repository. I selected the React project presets (with output location "build")*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.38.06-am-1836x1051.png)
*I clicked the Create button*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.38.49-am-1836x686.png)
*I navigated to the web site https://gentle-field-0fe462e10.5.azurestaticapps.net*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.39.02-am-1836x1120.png)
*A placeholder page was displayed*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.39.49-am-1836x803.png)
*I navigated to the GitHub repository*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.39.59-am-1836x909.png)
*I clicked on the Actions tab*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.40.25-am-1836x1124.png)
*An automatic build was already running*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.40.45-am-1836x889.png)
*I navigated to the codespace and selected the "Stop codespace" option*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.41.11-am-1836x815.png)
*The automatic build was successful*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.41.27-am-1836x1124.png)
*The React application was deployed to Azure*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.42.49-am-1836x407.png)
*I navigated to the Static Web Application's Azure Active Directory login page https://gentle-field-0fe462e10.5.azurestaticapps.net/.auth/login/aad*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.43.06-am-1836x1120.png)
*I logged in using my Azure Active Directory credentials*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.44.49-am-1836x1124.png)
*I clicked the Accept button*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.45.05-am-1836x1120.png)
*I clicked the Grant Consent button*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.45.16-am-1836x1117.png)
*I was returned to the React app home page*


## Adding a NavBar and staticwebapp.config.json

I added React Router a NavBar and a staticwebapp.config.json file.

![](/assets/images/codespacesauthentication/screenshot-2024-03-07-at-6.00.12-pm-1836x1000.png)
*Updated project folder structure*

![](/assets/images/codespacesauthentication/screenshot-2024-03-07-at-6.08.42-pm-2136x1105.png)
*Home page*

![](/assets/images/codespacesauthentication/screenshot-2024-03-07-at-6.08.55-pm-2136x1104.png)
*About page*

![](/assets/images/codespacesauthentication/screenshot-2024-03-07-at-6.09.25-pm-2136x1107.png)
*Secret page*


## staticwebapp.config.json

```text
{
    "navigationFallback": {
        "rewrite": "/index.html",
        "exclude": [
            "/images/*.{png,jpg,gif}",
            "/css/*"
        ]
    },
    "routes": [
        {
            "route": "/secret*",
            "allowedRoles": [
                "authenticated"
            ]
        }
    ],
    "responseOverrides": {
        "401": {
            "statusCode": 302,
            "redirect": "/.auth/login/aad"
        }
    }
}
```

## updated JavaScript

```text
App.js

import Navbar from "./Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Secret from "./pages/Secret"
import { Route, Routes } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"

function App() {

  const [clientPrincipal, setClientPrincipal] = useState(null);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;

      // set state with the result
      setClientPrincipal(clientPrincipal);

      console.log(clientPrincipal);

      return clientPrincipal;
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);;

  }, [])


  return (
    <>
      <Navbar clientPrincipal={clientPrincipal} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/secret" element={<Secret />} />
        </Routes>
      </div>
    </>
  )
}

export default App

App.css

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

.container {
  margin: 1rem;
  text-align: center;
}

.nav {
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 2rem;
  padding: 0 1rem;
}

.site-title {
  font-size: 2rem;
}

.nav ul {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  gap: 1rem;
}

.nav a {
  color: inherit;
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
  padding: .25rem;
}

.nav li.active {
  background-color: #555;
}

.nav li:hover {
  background-color: #777;
}

Navbar.js

import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar({ clientPrincipal }) {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Site Name
      </Link>
      <ul>
        <CustomLink to="/about">About</CustomLink>
        <a href="/secret">Secret</a>
        {!clientPrincipal ? (<a href="/.auth/login/aad">Login</a>) : (<a href="/.auth/logout">{clientPrincipal.userDetails} Logout</a>)}
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

About.js

export default function About() {
    return <h1>About</h1>
  }
  
Home.js

export default function Home() {
    return <h1>Home</h1>
  }
  
Secret.js

export default function Secret() {
    return <h1>Secret</h1>
  }
  
index.js

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./App.css"
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

