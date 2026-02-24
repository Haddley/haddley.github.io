---
title: "Power Apps, Custom Connectors and Application Registrations"
description: "Power Apps, Custom Connectors and Application Registrations"
date: "2021-08-09"
categories: ["Power Platform"]
tags: ""
hidden: false
slug: "customconnectorsappregistrations"
image: "/assets/images/customconnectorsappregistrations/office-365-icon-500x500.png"
---



## Creating a Custom Connector

To create a PowerApps Azure Active Directory Custom Connector I needed to provide:

**Client id
Client secret**; and
**Resource URL**

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-08-at-10.32.46-am-1836x1170.png)
*I reviewed the Custom Connector OAuth 2.0 Active Directory settings*


## The Custom Connector is the Client Application

In OAuth 2 an application accesses a resource on behalf of a user.

In OAuth 2 the application does **not** store the user's username and password.

When setting up a Power Apps Custom Connector that will allow a user to access an API Service the Client Application is the Custom Connector and the Resource (Application) is the API Service.

Only three values are needed to create a Power Apps Custom Connector.

The three values needed to create a Power Apps Custom Connector are: the **Client id **(the client application registration ID), the **Client secret **(password); and the **Resource URL **(the resource application registration ID)

Here I extended the [Vanilla JavaScript single-page application (SPA) using MSAL.js to authorize users for calling a protected web API on Azure AD](https://github.com/Azure-Samples/ms-identity-javascript-tutorial/tree/main/3-Authorization-II/1-call-api) tutorial to show how to configure a Power Apps Custom Connector using Azure application registrations.

![](/assets/images/customconnectorsappregistrations/topology-callapi-631x362.png)
*topology_callapi by Doğan Erişen is licensed under MIT License*


## A JavaScript tutorial using MSAL

The [Vanilla JavaScript single-page application (SPA) using MSAL.js to authorize users for calling a protected web API on Azure AD](https://github.com/Azure-Samples/ms-identity-javascript-tutorial/tree/main/3-Authorization-II/1-call-api) tutorial demonstrates how to configure Azure Application Registrations for an API and for a Single Page Web Application (SPA) that calls an Application Programming Interface Service (API).

I cloned the git repository using this command:

```bash
% git clone https://github.com/Azure-Samples/ms-identity-javascript-tutorial.git
```

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-08-at-11.41.51-am-1836x1739.png)
*esp8266*


## Resource application registration

Before updating the Application Programming Interface (API) Service I needed to create the **resource application registration**.

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-08-at-11.44.28-am-1704x396.png)
*I created the resource application registration*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-08-at-11.45.27-am-1704x1642.png)
*I provided the resource name*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-08-at-11.46.24-am-1062x294.png)
*I copied the "Application (client) ID" value*


## Resource URL

The "Application (client) ID" value from the resource application registration is the **Resource URL** value I needed later to create the custom connector.

**be70217c-6a30-4023-b667-d88bf222b94a**

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-08-at-12.09.35-pm-536x70.png)
*I clicked the "Expose an API" menu item*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-08-at-12.14.23-pm-1042x146.png)
*I clicked the Set link*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-08-at-12.14.33-pm-1194x318.png)
*I saved the generated Application ID URI (the URI api:// followed by the resource application client ID)*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-08-at-12.15.06-pm-1144x154.png)
*esp8266*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-08-at-12.15.46-pm-1144x286.png)
*I noted that the resource must provide at least one scope*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-08-at-12.17.38-pm-1702x1634.png)
*I added the "access_as_user" scope*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-08-at-12.18.10-pm-204x64.png)
*I updated the application registration manifest*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-08-at-12.18.33-pm-1708x1630.png)
*The application registration manifest provided a way to export and update application registration settings*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-08-at-12.21.33-pm-1046x142.png)
*The Directory (tenant) ID is a tenant wide setting*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-08-at-12.26.20-pm-1836x790.png)
*I updated the sample API code to include the tenantID and the clientID*


## Client application registration

If I was following the [Vanilla JavaScript single-page application (SPA) using MSAL.js to authorize users for calling a protected web API on Azure AD](https://github.com/Azure-Samples/ms-identity-javascript-tutorial/tree/main/3-Authorization-II/1-call-api) tutorial I would have created the client application registration for a Single Page Application (SPA) next.

Instead I created a client application registration for the Power Apps Custom Connector.

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.24.37-pm-1832x1444.png)
*I noticed that the redirect URL was set to https://global.consent.azure-apim.net/redirect*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.25.12-pm-1194x166.png)
*I copied the Application (client) ID*


## Client id

The "Application (client) ID" value from the **client application registration** is the **Client id** I needed to create the custom connector.

**59259fa1-c2e1-486d-a8e6-92209abf090c**

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.26.25-pm-532x68.png)
*The client application would be allowed to access the resource application registration (the API)*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.26.45-pm-1252x330.png)
*I clicked the + Add a permission link*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.27.02-pm-1596x428.png)
*I selected the "My APIs" tab*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.27.13-pm-1628x92.png)
*I selected the resource application registration (the API)*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.27.34-pm-1824x1444.png)
*I clicked the access_as_user checkbox*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.27.58-pm-1258x640.png)
*The access_as_user scope was added*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.29.09-pm-1830x506.png)
*I clicked the Authentication menu item and enabled "Access tokens"*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.29.47-pm-1832x528.png)
*I clicked on the Certificates & secrets menu item*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.30.13-pm-1832x1442.png)
*I added a client secret*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.30.27-pm-1830x586.png)
*I copied the "client secret" value*


## Client secret

The generated "Value" is the **Client secret** I needed to create the custom connector.

.ljDa4a7mFqn1tWj0wyPQ6X5L6B_3V.x~f

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.31.36-pm-1834x306.png)
*I created a new custom connector (from blank)*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.31.59-pm-672x460.png)
*I provided a name for the custom connector*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.33.43-pm-1836x1239.png)
*I entered the URL of the host API service and the base URL*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.33.59-pm-1482x626.png)
*I selected Authentication type OAuth 2.0*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.34.10-pm-1312x378.png)
*I selected "Azure Active Directory" as the Identity Provider*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.37.06-pm-1836x1233.png)
*I entered the Client id, Client secret and Resource URL*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.37.35-pm-560x192.png)
*The API published a single action*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.38.05-pm-1836x1234.png)
*I provided a name for each action*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.38.16-pm-1096x368.png)
*I clicked Import from sample to describe the action*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.39.13-pm-1836x1237.png)
*The /api/ path returns identity information*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.39.29-pm-1836x1234.png)
*The action request was described*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.39.37-pm-1054x444.png)
*I clicked the + Add default response link*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.40.20-pm-1836x1238.png)
*I provided an example API response*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.40.56-pm-1836x526.png)
*I clicked the tick to create the custom connector*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.41.39-pm-1836x1235.png)
*I clicked the + New connection link to create a new connection*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.41.50-pm-1836x556.png)
*I clicked Create*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.42.12-pm-1836x704.png)
*I provided my Azure Active Directory credentials*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.42.42-pm-1836x1242.png)
*I consented*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.43.15-pm-1836x592.png)
*The connection was created*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-8.06.57-pm-1836x1032.png)
*I tested the operation*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.43.39-pm-1836x1238.png)
*I created a PowerApp Canvas app*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.43.57-pm-788x444.png)
*I selected the data menu item and clicked the Add data button*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.44.18-pm-896x540.png)
*I selected the Identity connection*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.44.45-pm-1836x1235.png)
*I noticed that using the Identity Connection requires a Premium PowerApps license*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.45.42-pm-1836x642.png)
*I added a button to the app screen and used the ClearCollect operation to call the API*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.45.54-pm-1836x472.png)
*I ran the app*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.46.54-pm-1836x570.png)
*I switched to the Collections page to see the results of the API call*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-09-at-6.47.52-pm-1836x1026.png)
*I added the collection to a Vertical gallery control*


## Enterprise Applications

A service principal is created in each tenant where the application is used.

The service principle in each tenant references the globally unique application registration.

The service principal defines what the app can do in the specific tenant, who can access the app, and what resources the app can access.

The service principal objects are what you see when you select the Enterprise applications page.

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-10-at-10.44.26-am-1836x949.png)
*I reviewed the Service Principal Objects on the Enterprise applications page*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-10-at-10.44.49-am-1836x950.png)
*I reviewed the API's Enterprise Application configuration*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-10-at-10.46.54-am-1836x947.png)
*I reviewed the Custom Connector's Enterprise Application configuration*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-10-at-10.47.20-am-1836x946.png)
*I reviewed the Custom Connector's Permissions*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-10-at-11.32.02-am-1836x946.png)
*I reviewed the Permission Details*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-10-at-10.51.31-am-1836x948.png)
*I reviewed the Custom Connector's Users and Groups*

![](/assets/images/customconnectorsappregistrations/screen-shot-2021-08-10-at-11.01.26-am-1836x946.png)
*I reviewed the Custom Connector's Properties*

## References

- [Vanilla JavaScript single-page application (SPA) using MSAL.js to authorize users for calling a protected web API on Azure AD](https://github.com/Azure-Samples/ms-identity-javascript-tutorial/tree/main/3-Authorization-II/1-call-api)
- [Azure AD App Registrations, Enterprise Apps and Service Principals](https://www.youtube.com/watch?v=WVNvoiA_ktw)
