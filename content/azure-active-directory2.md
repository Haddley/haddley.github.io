---
title: "Azure Active Directory (Part 2)"
description: "Microsoft Azure Active Directory Authentication."
date: "2021-04-17"
categories: ["Azure"]
tags: ""
slug: "azure-active-directory2"
image: "/assets/images/azure-active-directory2/azurex70x75.svg"
---

## Single-page application with login

Quickstart projects make it easier to build applications that connect to Azure Active Directory, Microsoft Graph and other Azure resources.

Quickstart projects allow developers to create Web applications, Single page applications (SPAs), Mobile and desktop applications and Daemon applications. 

Here we create a "Haddley React Single Page App" that supports Azure Active Directory login

![](/assets/images/azure-active-directory2/topology-callgraph-700x403.png)
*topology_callgraph by Doğan Erişen is licensed under MIT License*

![](/assets/images/azure-active-directory2/screen-shot-2021-04-17-at-9.42.46-am-1836x1481.png)
*Name is Haddley React Single Page App*

![](/assets/images/azure-active-directory2/screen-shot-2021-04-17-at-10.27.44-am-1376x1060.png)
*Select "Single-page application (SPA)"*

![](/assets/images/azure-active-directory2/screen-shot-2021-04-17-at-9.43.42-am-1638x702.png)
*Select "React (preview)"*

![](/assets/images/azure-active-directory2/screen-shot-2021-04-17-at-9.44.44-am-1836x714.png)
*Allow the Quickstart to update the Redirect URI to "http://localhost:3000/"*

![](/assets/images/azure-active-directory2/screen-shot-2021-04-17-at-9.45.15-am-1836x952.png)
*Download the fully configured code sample*

![](/assets/images/azure-active-directory2/screen-shot-2021-04-17-at-9.45.53-am-1836x499.png)
*Open project using Visual Studio Code*

![](/assets/images/azure-active-directory2/screen-shot-2021-04-17-at-9.47.49-am-1836x1372.png)
*Open terminal and run "npm install" and then "npm start"*

![](/assets/images/azure-active-directory2/screen-shot-2021-04-17-at-9.49.20-am-1836x948.png)
*Select either "Sign in using Popup" or "Sign in using Redirect"*

![](/assets/images/azure-active-directory2/screen-shot-2021-04-17-at-9.49.49-am-962x498.png)
*Pick an account*

![](/assets/images/azure-active-directory2/screen-shot-2021-04-17-at-9.49.59-am-964x660.png)
*Enter the password*

![](/assets/images/azure-active-directory2/screen-shot-2021-04-17-at-9.50.15-am-966x1310.png)
*Accept*

![](/assets/images/azure-active-directory2/screen-shot-2021-04-17-at-9.50.35-am-1836x947.png)
*After pressing "Request Profile Information"*


## Vanilla JavaScript single-page application (SPA) using MSAL.js to authorize users for calling a protected web API on Azure AD

[https://github.com/Azure-Samples/ms-identity-javascript-tutorial/tree/main/3-Authorization-II/1-call-api](https://github.com/Azure-Samples/ms-identity-javascript-tutorial/tree/main/3-Authorization-II/1-call-api)

![](/assets/images/azure-active-directory2/topology-callapi-631x362.png)
*topology_callapi by Doğan Erişen is licensed under MIT License*

![](/assets/images/azure-active-directory2/image-859x481.png)
*.\Configure.ps1*

![](/assets/images/azure-active-directory2/screen-shot-2021-04-17-at-4.31.02-pm-1836x989.png)
*update Manifest "accessTokenAcceptedVersion"*


## Configure and run the Client (SPA) and Service (API) apps

**Configure the service app to use your app registration**

Open the project in your IDE (like Visual Studio or Visual Studio Code) to configure the code.

In the steps below, "ClientID" is the same as "Application ID" or "AppId".
Open the config.js file.
Find the key clientID and replace the existing value with the application ID (clientId) of the ms-identity-javascript-tutorial-c3s1-api application copied from the Azure portal.
Find the key tenantID and replace the existing value with your Azure AD tenant ID.
Find the key audience and replace the existing value with the application ID (clientId) of the ms-identity-javascript-tutorial-c3s1-api application copied from the Azure portal.
Register the client app

**Configure the client app to use your app registration**

Open the project in your IDE (like Visual Studio or Visual Studio Code) to configure the code.

In the steps below, "ClientID" is the same as "Application ID" or "AppId".
Open the App\authConfig.js file. Then:

Find the key Enter_the_Application_Id_Here and replace the existing value with the application ID (clientId) of the ms-identity-javascript-c3s1-spa application copied from the Azure portal.
Find the key Enter_the_Cloud_Instance_Id_Here/Enter_the_Tenant_Info_Here and replace the existing value with https://login.microsoftonline.com/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX (where XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX is the Directory (tenant) ID - same value for all app registrations created in that Azure tenant).

Find the key Enter_the_Redirect_Uri_Here and replace the existing value with the base address of the ms-identity-javascript-tutorial-c3s1-spa application (by default http://localhost:3000).
After you configured your web API, open the App\apiConfig.js file. Then:

Find the key Enter_the_Web_Api_Uri_Here and replace the existing value with the coordinates of your web API (by default http://localhost:5000/api).

Find the key Enter_the_Web_Api_Scope_Here and replace the existing value with the scopes for your web API, like api://e767d418-b80b-4568-9754-557f40697fc5/access_as_user. You can copy this from the Expose an API blade of the web APIs registration.

![](/assets/images/azure-active-directory2/screen-shot-2021-04-17-at-4.53.33-pm-1644x1184.png)
*Click Sign-in*

![](/assets/images/azure-active-directory2/screen-shot-2021-04-17-at-4.53.56-pm-964x1310.png)
*Enter Azure/Office 365 credentials to login to*

![](/assets/images/azure-active-directory2/screen-shot-2021-04-17-at-4.54.17-pm-1640x1180.png)
*Press Call API to ask Single Page Application to call protected API*

![](/assets/images/azure-active-directory2/screen-shot-2021-04-17-at-4.54.36-pm-1640x1184.png)
*Result returned from protect API*


## Discussion

SPA is a single page application based on an html file and JavaScript (not React, Angular or Vue). As authPopup.js (or authRedirect.js) is loaded myMSALObj is set to a new msal.PublicClientApplication instance using msalConfig. further down in the same file "selectAccount();" is called. selectAccount calls the getAllAccounts method on the msal.PublicClientApplication instance. If at least one account is returned the welcomeUser function is called passing the username from the first account.

welcomeUser is defined in ui.js. welcomeUser uses document.getElementById and css classes to update the html page (showing if a user is logged in).

If the html signIn button is pressed the signIn function in authPopup.js (or authRedirect.js) is run. This calls the loginPopup (or loginRedirect) method on the msal.PublicClientApplication instance passing loginRequest (an object with a scopes property ... {scopes: ["openid", "api://ae580c57-2645-404d-a870-2a390db782ec/access_as_user"]} ). The handleResponse function is called if the user login succeeds. The handleResponse function sets a username variable and calls the welcomeUser function again (passing the value of that username variable).

If the html callApiButton button is pressed the passTokenToApi function is executed. The passTokenToApi function calls getTokenPopup (or getTokenRedirect) which uses myMSALObj.acquireTokenSilent and (possibly) the myMSALObj.acquireTokenPopup (or myMSALObj.acquireTokenRedirect) methods (here the constant tokenRequest is used { scopes: ["Mail.Read"] } although we do not go on to read mail...). 

Once the access_token has been acquired function callApi is called passing apiConfig.uri ("http://localhost:5000/api") and the response.accessToken. callApi appends an Authorization header with value accessToken and uses fetch to call the API. The response from the API call should include the logged in user's **name**.

API is a Node express app. The code starts by defining const app=express(). "morgan" (for debugging) and "passport" are added to the express instance. bearerStrategy is added to the passport reference. CORS is enabled using permissive headers.

Then the "/api" endpoint is exposed. The /api handler is only run if passport.authenticated (see the response received from Azure Active Directory requesting "access_as_user" permissions). req.authInfo provides authentication information. In the sample information from the req.authInfo property is returned as the result of the API call (including the logged in user's **name**).


## App.js

```text
import React, { useState } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { PageLayout } from "./components/PageLayout";
import { ProfileData } from "./components/ProfileData";
import { callMsGraph } from "./graph";
import Button from "react-bootstrap/Button";
import "./styles/App.css";

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        });
    }

    return (
        <>
            <h5 className="card-title">Welcome {accounts[0].name}</h5>
            {graphData ? 
                <ProfileData graphData={graphData} />
                :
                <Button variant="secondary" onClick={RequestProfileData}>Request Profile Information</Button>
            }
        </>
    );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {    
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5 className="card-title">Please sign-in to see your profile information.</h5>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    return (
        <PageLayout>
            <MainContent />
        </PageLayout>
    );
}
```