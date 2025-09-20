---
title: "VB.NET WinForms and ASP.NET Core API"
description: "A comprehensive guide covering vb.net winforms and asp.net core api"
date: "2025-09-20"
category: "Development"
image: "/assets/images/net-logo.svg"
tags: ["dotnet","ai","asp.net"]
---

# VB.NET WinForms and ASP.NET Core API

## VB.NET WinForms Development

![](/assets/images/vbnetwinforms/net-logo.svg)
*Microsoft Dotnet Logo by Microsoft Corporation is licensed under Creative Commons CC0 1.0 Universal Public Domain Dedication*


## ChatGPT

**How do I create a VB.NET Forms app connected to an ASP.NET Core API?**

To create a VB.NET Forms app connected to an ASP.NET Core API, you can follow these general steps:

Create an ASP.NET Core API project:
You can create an ASP.NET Core Web API project using Visual Studio 2019 or newer. Choose the ASP.NET Core Web Application template and select the API project type.
Define your API endpoints:
Define your endpoints in the API project, and make sure they return the data your VB.NET Forms app will use. You can use various methods to create endpoints, such as MVC controllers or routing.
Build and run the API project:
Build and run your API project to ensure it's working correctly. You can use tools like Postman or curl to test the endpoints and verify that they return the expected data.
Create a VB.NET Forms app:
Create a new VB.NET Forms app project in Visual Studio. Add any necessary controls to the form, such as text boxes or buttons, that will interact with the API.
Add a reference to the API project:
Add a reference to the API project in your VB.NET Forms app project. You can do this by right-clicking on the project in the Solution Explorer and selecting "Add Reference."
Make API calls from your VB.NET Forms app:
Use the HttpClient class in your VB.NET Forms app to make requests to the API. You can use methods such as GetAsync or PostAsync to retrieve or send data to the API.
Process the API responses in your VB.NET Forms app:
Handle the responses from the API in your VB.NET Forms app. You can deserialize JSON responses into objects using libraries such as Newtonsoft.Json. You can then use these objects to populate the controls on your form.
These are just general steps, and the specific implementation may vary depending on your requirements.

![](/assets/images/vbnetwinforms/capture20230127-001-1011x676.png)
*I created a new project/solution*

![](/assets/images/vbnetwinforms/capture20230127-002-1011x676.png)
*I selected the ASP.NET Core Web API template (with swagger)*

![](/assets/images/vbnetwinforms/capture20230127-003-1013x671.png)
*I named the Web Application*

![](/assets/images/vbnetwinforms/capture20230127-004-1012x674.png)
*I selected the .NET Core Framework version*

![](/assets/images/vbnetwinforms/capture20230127-005-1368x730.png)
*I tested the API*

![](/assets/images/vbnetwinforms/capture20230127-006-1045x572.png)
*Using Swagger User Interface*

![](/assets/images/vbnetwinforms/capture20230127-007-741x590.png)
*I added a second project*

![](/assets/images/vbnetwinforms/captureaa-05-1011x676.png)
*I selected the VB.NET Windows Forms App template*

![](/assets/images/vbnetwinforms/captureaa-06-1011x672.png)
*I gave the WinForms app a name*

![](/assets/images/vbnetwinforms/captureaa-07-1012x674.png)
*I selected a .NET Core version*

![](/assets/images/vbnetwinforms/captureaa-08-828x653.png)
*I added a reference from the VB.NET WinForms app to the ASP.NET app (providing the VB.NET application with a understanding of the WeatherForecast type)*

![](/assets/images/vbnetwinforms/20230128-783x541.png)
*I selected the API project*

![](/assets/images/vbnetwinforms/capture20230127-008-1036x703.png)
*I started the API project (dotnet run)*

![](/assets/images/vbnetwinforms/capture20230127-009-1369x729.png)
*I added a button and two labels to the VB.NET WinForm screen and VB.NET code to call the API.*
