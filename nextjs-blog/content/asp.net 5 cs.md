---
title: "ASP.NET 5 C#"
description: "A comprehensive guide covering asp.net 5 c#"
date: "2025-09-20"
category: ".NET"
image: "/assets/images/asp.net 5 cs/hero.png"
tags: ["dotnet","c#","database","ai","ml"]
---

# ASP.NET 5 C#

## Generate Context and Entity Classes from an Existing Database

![](/assets/images/asp.net 5 cs/net-logo.svg)
*Microsoft Dotnet Logo by Microsoft Corporation is licensed under Creative Commons CC0 1.0 Universal Public Domain Dedication*


## Active Server Pages

ASP Web Forms was released in 2003 (based on the Windows Server and the .NET Framework)

ASP.NET Model-View-Controller 5 was released in 2009 (based on Windows Server and .NET Framework and Supported in Visual Studio 2019)

ASP.NET Core Model-View-Controller was released in 2017 (based on cross platform .NET Core and Supported in Visual Studio 2022)

I used Visual Studio 2019 and ASP.NET MVC 5 to create a todo app.

![](/assets/images/asp.net 5 cs/capturea1-create-a-new-project-1028x681.png)
*I created a new project*

![](/assets/images/asp.net 5 cs/capturea2-configure-your-new-project-1026x683.png)
*I configured the new project*

![](/assets/images/asp.net 5 cs/capturea3-mvc-1022x708.png)
*I created a Model-View-Controller web application*

![](/assets/images/asp.net 5 cs/capturea4-running-1380x729.png)
*I ran the template project (notice the "ASP.NET MVC gives" text in the index.cshtml file and the web browser).*

![](/assets/images/asp.net 5 cs/capturea5-layout-1366x729.png)
*The _Layout.cshtml file provides a common web page framework and navigation*

![](/assets/images/asp.net 5 cs/capturea5-layout-1366x729.png)
*Web requests are handled by Controller functions/methods. The controller function will typically return a view (the Web response). The About function sets a "Message" value and then returns a corresponding About view.*

![](/assets/images/asp.net 5 cs/capturea6-home-controller-1362x729.png)
*Notice that the About view renders the "Message".*

![](/assets/images/asp.net 5 cs/capturea8-view-page-with-layout-1361x731.png)
*I added a view page to the HelloWorld folder.*

![](/assets/images/asp.net 5 cs/capturea9-name-view-1366x357.png)
*I named the new page "Index" making it the home page for the new folder.*

![](/assets/images/asp.net 5 cs/capturea10-select-layout-1365x500.png)
*I selected the existing _Layout page*

![](/assets/images/asp.net 5 cs/capturea-11-viewbag-1365x177.png)
*I added a reference to a "Name" value.*

![](/assets/images/asp.net 5 cs/capturea-11-add-controller-1368x185.png)
*I added a new controller to the project*

![](/assets/images/asp.net 5 cs/capturea-12-empty-controller-1370x281.png)
*I created an empty controller.*

![](/assets/images/asp.net 5 cs/capturea-14-name-controller-1367x297.png)
*I named the controller HelloWorldController (in line with the folder I had already created)*

![](/assets/images/asp.net 5 cs/capturea-15-hello-world-no-viewbag-1362x639.png)
*I added the folder name HelloWorld to the url and got the result above*

![](/assets/images/asp.net 5 cs/capturea-16-with-view-bag-name-1360x638.png)
*I updated the Controller function to set the "Name" value before returning the view. I refreshed the browser.*

![](/assets/images/asp.net 5 cs/capturea-17-new-item-1367x333.png)
*I selected the Models folder and selected the Add | New Item... menu item*

![](/assets/images/asp.net 5 cs/capturea-18-ado.et-entity-data-model-1363x663.png)
*I entered the name ToDoContext and selected ADO.NET Entity Data Model*

![](/assets/images/asp.net 5 cs/capturea-19-code-first-rom-database-1364x614.png)
*I selected Code First from database*

![](/assets/images/asp.net 5 cs/capturea-20-new-data-connection-1367x529.png)
*New data connection*

![](/assets/images/asp.net 5 cs/capturea-21-test-connection-1360x706.png)
*Test connection succeeded*

![](/assets/images/asp.net 5 cs/capturea-22-choose-connection-1368x597.png)
*I asked Visual Studio to save the connection details in the Web.Config file (notice that the Web.Config file is never returned to a client browser)*

![](/assets/images/asp.net 5 cs/capturea-23-entity-data-model-wizard-1366x594.png)
*I selected the Tasks table*

![](/assets/images/asp.net 5 cs/capturea-24-task-class-generated-1365x418.png)
*The Task class is generated*

![](/assets/images/asp.net 5 cs/capturea-25-new-scaffolder-item-1366x301.png)
*I selected the Controller folder and selected the Add | New Scaffolded Item... menu item*

![](/assets/images/asp.net 5 cs/capturea-26-mvc-5-controller-with-views-using-entity-framework-1367x391.png)
*I selected the MVC 5 Controller with view, using Entity Framework option*

![](/assets/images/asp.net 5 cs/capturea-27-controller-name-1366x514.png)
*I entered the Model class name (Task) and the Data context class (ToDoContext).*

![](/assets/images/asp.net 5 cs/capturea-28-build-error-1366x280.png)
*Visual Studio added CRUD controller functions and views (Visual Studio was confused by class "Task").*

![](/assets/images/asp.net 5 cs/capturea-29-fix-ambiguity-1366x611.png)
*The controller functions includes Index. The TaskController.Index function will fetch all Tasks from the database and then display then using the corresponding Tasks/Index view (Models.Task class name fully qualified to avoid confusion).*

![](/assets/images/asp.net 5 cs/capturea-30-running-tasks-index-page-1366x640.png)
*The TaskController.Index function is executed when a user navigates to /Tasks (see above)*
