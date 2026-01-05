---
title: "React and ASP.NET Core"
description: "An ASP.NET Core backend and a React frontend."
date: "2023-03-22"
categories: ["React",".NET"]
tags: ""
slug: "reactandasp.net"
image: "/assets/images/logo512-512x512.png"
---



Visual Studio includes ASP.NET Core Single Page Application (SPA) templates that support Angular and React.

I review the React template here.


## ChatGPT

**I want to create a ASP.NET Core React project**

To create an ASP.NET Core React project, follow these steps:

Open Visual Studio and click on "Create a new project."
Select "ASP.NET Core Web Application" and click "Next."
Name your project and choose a location to save it. Then click "Create."
In the next screen, choose "React.js" for the front-end framework and select the latest version of .NET Core. Then click "Create."
Visual Studio will create a new project with the necessary files and folders for a React application inside an ASP.NET Core project.
You can now start developing your application by modifying the files in the "ClientApp" folder, which contains the React application. You can also modify the ASP.NET Core server-side code in the other folders and files.

Note: If you prefer to use the command line, you can create a new ASP.NET Core React project using the following command:

**$ dotnet new react -n ProjectName**

![](/assets/images/reactandasp.net/screen-shot-2023-03-22-at-9.16.36-am-1440x880.png)
*I used Visual Studio 2022 for Mac*

![](/assets/images/reactandasp.net/screen-shot-2023-03-22-at-9.17.11-am-1802x1272.png)
*I selected the React.js template*

![](/assets/images/reactandasp.net/screen-shot-2023-03-22-at-9.17.53-am-1796x1278.png)
*I selected the (cross platform) ASP.NET Core 6 framework*

![](/assets/images/reactandasp.net/screen-shot-2023-03-22-at-9.18.39-am-1798x1274.png)
*I provided a solution/project name*

![](/assets/images/reactandasp.net/screen-shot-2023-03-22-at-9.20.23-am-1836x1459.png)
*The template includes client and server-side code*

![](/assets/images/reactandasp.net/screen-shot-2023-03-22-at-9.21.30-am-1836x988.png)
*I ran the project.*

![](/assets/images/reactandasp.net/screen-shot-2023-03-22-at-9.46.26-am-1836x1148.png)
*I reviewed the Program.cs file. The template includes a local user database. I registered as a user.*

![](/assets/images/reactandasp.net/screen-shot-2023-03-22-at-10.03.23-am-1836x1050.png)
*I used sqlitebrowser to update the EmailConfirmed column in the AspNetUsers table so that I could login.*

![](/assets/images/reactandasp.net/screen-shot-2023-03-22-at-10.06.39-am-1836x1003.png)
*I was able to login*

![](/assets/images/reactandasp.net/screen-shot-2023-03-22-at-10.20.17-am-1836x868.png)
*The React App component returns the Layout component and a child component that depends on the url (Route)*

![](/assets/images/reactandasp.net/screen-shot-2023-03-22-at-10.25.27-am-1836x779.png)
*The Layout component includes a Navigation menu.*

![](/assets/images/reactandasp.net/screen-shot-2023-03-22-at-10.22.51-am-1836x779.png)
*The Fetch data route has requireAuth set to true.*

![](/assets/images/reactandasp.net/screen-shot-2023-03-22-at-10.32.50-am-1836x822.png)
*The Navigation Menu component include a reference to a Logon component*


## Update

As an experiment I updated the React code so the "Fetch data" menu item is only shown when the user is logged in.

![](/assets/images/reactandasp.net/screen-shot-2023-03-22-at-11.04.02-am-1531x869.png)
*Fetch data menu item is not rendered if user is not logged in.*

![](/assets/images/reactandasp.net/screen-shot-2023-03-22-at-11.28.23-am-1531x573.png)
*isAuthenticated and userName values are passed as properties*

![](/assets/images/reactandasp.net/screen-shot-2023-03-22-at-11.19.03-am-1531x875.png)
*Fetch data menu item is rendered if user is logged in.*

![](/assets/images/reactandasp.net/screen-shot-2023-03-22-at-11.19.50-am-1531x871.png)
*Fetch data is dependent on protected web service.*

![](/assets/images/reactandasp.net/screen-shot-2023-03-22-at-11.26.38-am-1531x867.png)
*Network tab shows the call*

![](/assets/images/reactandasp.net/screen-shot-2023-03-22-at-11.34.09-am-1531x585.png)
*Weather Forecast Controller*
## References

- [Tutorial: Create an ASP.NET Core app with React in Visual Studio](https://learn.microsoft.com/en-us/visualstudio/javascript/tutorial-asp-net-core-with-react?view=vs-2022)