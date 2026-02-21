---
title: ".NET Core (Part 3)"
description: "Creating a Blazor App that calls Microsoft Graph."
date: "2025-09-20"
categories: [".NET"]
image: "/assets/images/dotnet-core-part3/net-logo.svg"
tags: ["dotnet"]
slug: "dotnet-core-part3"
---


## Microsoft Graph

[Microsoft Graph](MicrosoftGraph.html) is a REST API that can be used to access: Microsoft 365, Azure Active Directory, Windows and Dynamics 365.

Microsoft Graph explorer is a developer tool that lets you learn about Microsoft Graph APIs.

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-10.20.07-am-1836x1069.png)
*Microsoft Graph Explorer*


## Blazor Server app

I wanted to create a Blazor Server app that would allow users to sign in using their M365/Azure Active Directory credentials.

I wanted the Blazor Server app to display the logged in user's name and their photograph.

I created an Azure application (app) registration.

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-10.29.54-am-1836x373.png)
*Azure Active Directory*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-10.30.45-am-1836x250.png)
*New registration*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-10.32.09-am-1836x667.png)
*Single tenant*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-10.33.46-am-1836x1018.png)
*redirect uri set to localhost...*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-10.34.43-am-1836x462.png)
*App registration created*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-10.37.11-am-1836x977.png)
*Update Authentication*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-10.38.08-am-1836x767.png)
*Add a client secret*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-10.38.43-am-1836x350.png)
*Secret will be valid for 180 days*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-10.38.57-am-1836x332.png)
*Copy the value*


## Blazor Server

Blazor is a web framework for building Razor components.

Razor components run server-side in ASP.NET Core.

(Razor components run client-side in the browser using WebAssembly)

A blazor server application can be generated using the dotnet command line tool.

**$ dotnet new blazorserver -o <project name>**

In this case I wanted to create a blazor server application that would authenticate users using Azure Active Directory (the App registration created above) and call Microsoft Graph to access the user's profile and the user's profile photograph.

**$CONTENT$nbsp;dotnet new blazorserver --auth SingleOrg --calls-graph -o haddley-blazor-graph --client-id "5df669b6-f661-473c-9f5d-100f792d16c7" --tenant-id "2788913d-04ad-47a2-ac42-4b02caa6a4be" --domain "p8lf.onmicrosoft.com" -f net7.0**

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-10.45.37-am-1664x496.png)
*dotnet new blazorserver ...*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-10.51.13-am-1836x948.png)
*dotnet run (navigate to localhost)*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-10.51.33-am-1836x942.png)
*The generated Blazor Server app (includes integration with Azure Active Directory and Microsoft Graph)*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-10.53.09-am-1836x1072.png)
*I copied the ClientSecret to appsettings.json*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-10.59.15-am-1836x1065.png)
*I am now able to login to the Blazor Server app using Azure Active Directory credentials*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-10.59.43-am-1836x1063.png)
*I provided the password*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-11.00.13-am-1836x1072.png)
*I skipped Multi factor authentication (for now)*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-11.00.24-am-1836x1066.png)
*Do I want to stay signed in?*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-11.00.39-am-1836x1067.png)
*I navigate to the Show profile page*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-11.01.51-am-1836x1073.png)
*/showprofile page*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-11.02.06-am-1836x567.png)
*Key move is call to injected GraphServiceClient (to access Microsoft Graph)*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-11.04.37-am-1836x998.png)
*I updated navigation...*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-11.05.55-am-1836x391.png)
*... to include a link to a /showphoto page*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-11.09.35-am-1836x737.png)
*The /showphoto page will need to make a "my photo" call to Microsoft Graph*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-11.43.49-am-1836x1023.png)
*I copied the "Me.Photo.Content" expression/path to the new /showphoto page.*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-11.44.08-am-1836x990.png)
*Show photo page running*


## Program.cs

Notice that the Blazor Server project includes a Program.cs file with contents similar what you would expect to see in a Model-View-Controller project.

A Blazor Server project and a Model-View-Controller project are both ASP.NET Core projects and it is possible to mix and match.

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-12.48.33-pm-1836x1077.png)
*Program.cs (part 1)*

![](/assets/images/dotnet-core-part3/screen-shot-2023-03-17-at-12.48.44-pm-1836x1040.png)
*Program.cs (part 2)*


## ShowPhoto.razor

```text
@page "/showphoto"

@using Microsoft.Identity.Web
@using Microsoft.Graph
@inject Microsoft.Graph.GraphServiceClient GraphServiceClient
@inject MicrosoftIdentityConsentAndConditionalAccessHandler ConsentHandler

<h1>My Photo</h1>

<p>This component demonstrates fetching data from a service.</p>

@if (imgDataURL == null)
{
    <p><em>Loading...</em></p>
}
else
{
    <img src=@imgDataURL />
}

@code {
    String? imgDataURL;

    protected override async Task OnInitializedAsync()
    {
        try
        {
            Stream photo = await GraphServiceClient.Me.Photo.Content.Request().GetAsync();

            if (photo != null)
            {
                MemoryStream ms = new MemoryStream();
                photo.CopyTo(ms);
                byte[] buffer = ms.ToArray();
                string result = Convert.ToBase64String(buffer);
                imgDataURL = string.Format("data:image/png;base64,{0}", result);
            }
            else
            {
                imgDataURL = "";
            }
        }
        catch (Exception ex)
        {
            ConsentHandler.HandleException(ex);
        }
    }
}
```

## Program.cs

```text
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.UI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Mvc.Authorization;
using Graph = Microsoft.Graph;
using haddley_blazor_graph.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var initialScopes = builder.Configuration["DownstreamApi:Scopes"]?.Split(' ');

builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(builder.Configuration.GetSection("AzureAd"))
        .EnableTokenAcquisitionToCallDownstreamApi(initialScopes)
            .AddMicrosoftGraph(builder.Configuration.GetSection("DownstreamApi"))
            .AddInMemoryTokenCaches();
builder.Services.AddControllersWithViews()
    .AddMicrosoftIdentityUI();

builder.Services.AddAuthorization(options =>
{
    // By default, all incoming requests will be authorized according to the default policy
    options.FallbackPolicy = options.DefaultPolicy;
});

builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor()
    .AddMicrosoftIdentityConsentHandler();
builder.Services.AddSingleton<WeatherForecastService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.MapControllers();
app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
```
## References

- [Create a Blazor Server app that uses the Microsoft identity platform for authentication](https://learn.microsoft.com/en-us/azure/active-directory/develop/tutorial-blazor-server)

