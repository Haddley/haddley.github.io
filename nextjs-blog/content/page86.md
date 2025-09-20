---
title: "ASP.NET 5 Visual Basic"
description: "A comprehensive guide covering asp.net 5 visual basic"
date: "2025-09-20"
category: "Development"
image: "/assets/images/dynamics365salespart1"
tags: ["azure","docker","dotnet","sql","database"]
---

# ASP.NET 5 Visual Basic

## Generate Context and Entity Classes from an Existing Database

![](/assets/images/page86/net-logo.svg)
*Microsoft Dotnet Logo by Microsoft Corporation is licensed under Creative Commons CC0 1.0 Universal Public Domain Dedication*


## Active Server Pages

ASP Web Forms was released in 2003 (based on the Windows Server and the .NET Framework)
ASP.NET Model-View-Controller 5 was released in 2009 (based on Windows Server and .NET Framework and Supported in Visual Studio 2019)
ASP.NET Core Model-View-Controller was released in 2017 (based on cross platform .NET Core and Supported in Visual Studio 2022)

I used Visual Studio 2019 and ASP.NET MVC 5 to create a todo app.

![](/assets/images/page86/capture4-create-new-project-1026x677.png)
*I created a new project*

![](/assets/images/page86/capture5-configure-new-project-1022x677.png)
*I configured the new project*

![](/assets/images/page86/capture6-mvc-vb-1020x707.png)
*I created a Model-View-Controller web application*

![](/assets/images/page86/capture7-home-view-1353x729.png)
*I ran the template project (notice the "ASP.NET MVC gives" text in the index.vbhtml file and the web browser).*

![](/assets/images/page86/capture8-layout-1416x726.png)
*The _Layout.vbhtml file provides a common web page framework and navigation*

![](/assets/images/page86/capture9-controller-1382x667.png)
*Web requests are handled by Controller functions/methods. The controller function will typically return a view (the Web response). The About function sets a "Message" value and then returns a corresponding About view.*

![](/assets/images/page86/capture10-controller-passing-to-view-1405x638.png)
*Notice that the About view renders the "Message".*

![](/assets/images/page86/capture11-new-folder-842x501.png)
*I created a new HelloWorld folder in the Views folder.*

![](/assets/images/page86/capture12-new-view-2-993x492.png)
*I added a view page to the HelloWorld folder.*

![](/assets/images/page86/capture13-new-view-3-995x287.png)
*I named the new page "Index" making it the home page for the new folder.*

![](/assets/images/page86/capture14-new-view-4-1097x495.png)
*I selected the existing _Layout page*

![](/assets/images/page86/capture15-new-view-5-1387x306.png)
*I added a reference to a "Name" value.*

![](/assets/images/page86/capture16-new-controller-1-876x298.png)
*I added a new controller to the project*

![](/assets/images/page86/capture17-new-controller-2-1365x683.png)
*I created an empty controller.*

![](/assets/images/page86/capture18-new-controller-3-1114x350.png)
*I named the controller HelloWorldController (in line with the folder I had already created)*

![](/assets/images/page86/capture19-new-controller-4-1419x311.png)
*Visual Studio created an Index function that would handle requests for the HelloWorld page and return the Index view*

![](/assets/images/page86/capture20-new-controller-5-1364x615.png)
*I added the folder name HelloWorld to the url and got the result above*

![](/assets/images/page86/capture21-new-controller-6-1362x545.png)
*I updated the Controller function to set the "Name" value before returning the view. I refreshed the browser.*

![](/assets/images/page86/capture26-docker-sql-server-1157x622.png)
*docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Passw0rd123" -p 1433:1433 --name sql2019 -d mcr.microsoft.com/mssql/server:2019-latest*

![](/assets/images/page86/capture27-docker-sql-server-2-1157x623.png)
*I downloaded a SQL Server docker image*

![](/assets/images/page86/capture28-docker-sql-server-3-1154x620.png)
*I created a container based in the downloaded docker image*

![](/assets/images/page86/capture29-docker-sql-server-5-1364x230.png)
*I used Visual Studio to create a new database in the docker container's SQL Server*

![](/assets/images/page86/capture30-docker-sql-server-6-1047x509.png)
*I entered the credentials*

![](/assets/images/page86/capture32-docker-sql-server-8-1025x729.png)
*To get another view of the database I opened Azure Data Studio*

![](/assets/images/page86/capture33-docker-sql-server-9-1023x729.png)
*I entered the address of the SQL Server and the credentials*

![](/assets/images/page86/capture34-docker-sql-server-10-1027x728.png)
*I selected the ToDo database*

![](/assets/images/page86/capture35-docker-sql-server-11-1026x423.png)
*I created a Tasks table (with an automatically assigned ID column, a description column and a done boolean column)*

![](/assets/images/page86/capture36-docker-sql-server-12-1359x471.png)
*I refreshed Data Connections in Visual Studio*

![](/assets/images/page86/capture37-docker-sql-server-14-808x240.png)
*I selected the Models folder and selected the Add | New Item... menu item*

![](/assets/images/page86/capture38-docker-sql-server-15-941x573.png)
*I entered the name ToDoContext and selected ADO.NET Entity Data Model*

![](/assets/images/page86/capture39-docker-sql-server-16-616x559.png)
*I selected Code First from database*

![](/assets/images/page86/capture40-docker-sql-server-17-612x560.png)
*I asked Visual Studio to save the connection details in the Web.Config file (notice that the Web.Config file is never returned to a client browser)*

![](/assets/images/page86/capture41-docker-sql-server-18-616x554.png)
*I selected the Tasks table*

![](/assets/images/page86/capture42-docker-sql-server-19-1365x331.png)
*The Task class is generated*

![](/assets/images/page86/capture43-docker-sql-server-20-880x242.png)
*I selected the Controller folder and selected the Add | New Scaffolded Item... menu item*

![](/assets/images/page86/capture44-docker-sql-server-21-952x658.png)
*I selected the MVC 5 Controller with view, using Entity Framework option*

![](/assets/images/page86/capture45-docker-sql-server-22-589x381.png)
*I entered the Model class name (Task) and the Data context class (ToDoContext).*

![](/assets/images/page86/capture46-docker-sql-server-23-1364x312.png)
*Visual Studio added CRUD controller functions and views.*

![](/assets/images/page86/capture47-docker-sql-server-24-1359x664.png)
*The controller functions includes Index. The TaskController.Index function will fetch all Tasks from the database and then display then using the corresponding Tasks/Index view*

![](/assets/images/page86/capture48-docker-sql-server-25-1363x729.png)
*The TaskController.Index function is executed when a user navigates to /Tasks (see above)*

![](/assets/images/page86/capture49-docker-sql-server-26-1040x622.png)
*Clicking on the Create New link navigates the user to the TaskController.Create function (returning the generated Create form)*

![](/assets/images/page86/capture49-docker-sql-server-26-1040x622.png)
*I entered the new task text "Feed the fish" and clicked the create Create button. This posted the contents of the form to another Controller function.*

![](/assets/images/page86/capture51-docker-sql-server-28-1038x616.png)
*The post handling function added the item to the database table and redirected the user back to the Index page.*

![](/assets/images/page86/capture52-docker-sql-server-29-1040x617.png)
*I used the generated Edit page to update the task.*

![](/assets/images/page86/capture53-docker-sql-server-30-1040x616.png)
*Once the database table row has been updated the use is (again) redirected to the Index page.*

![](/assets/images/page86/capture54-docker-sql-server-31-1039x616.png)
*I added a couple of extra task and marked the Feed the cat task as done.*

![](/assets/images/page86/capture55-docker-sql-server-32-997x722.png)
*I reviewed the database table using the Azure Data Studio application*

![](/assets/images/page86/capture56-docker-sql-server-33-1364x668.png)
*Above is an example of the Controller code*

![](/assets/images/page86/capture57-docker-sql-server-34-1365x668.png)
*Above is an example of the View code*

![](/assets/images/page86/capture58-docker-sql-server-35-1366x728.png)
*I pushed the project to GitHub*
