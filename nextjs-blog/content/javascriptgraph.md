---
title: "JavaScript and Microsoft Graph"
description: "A comprehensive guide covering javascript and microsoft graph"
date: "2025-09-20"
category: "JavaScript"
image: "/assets/images/javascriptgraph/hero.png"
tags: ["javascript","azure","ai","ml"]
---

![](/assets/images/javascriptgraph/office-365-icon-500x500.png)
*Microsoft_Office_logo by Microsoft is licensed under CC*


## A console application that calls the Microsoft Graph API

This post is based on Microsoft's "[Build JavaScript apps with Microsoft Graph](https://docs.microsoft.com/en-nz/graph/tutorials/javascript?tabs=aad)" tutorial.

The node console application I created here uses OAuth for identity management.

An OAuth application requires an "identity provider". 

In this case the identity provider is [Azure Active Directory](azure-active-directory.html#top).

![](/assets/images/javascriptgraph/screen-shot-2022-05-27-at-2.21.09-pm-1836x1288.png)
*I navigated to Azure Portal and selected Azure Active Directory*

![](/assets/images/javascriptgraph/screen-shot-2022-05-27-at-2.21.40-pm-1836x1278.png)
*I selected the "App registrations" link*

![](/assets/images/javascriptgraph/screen-shot-2022-05-27-at-2.22.04-pm-1836x1285.png)
*I selected the "New registration" link*

![](/assets/images/javascriptgraph/screen-shot-2022-05-27-at-2.23.43-pm-1836x1285.png)
*I entered the name of the console application and selected "Register"*

![](/assets/images/javascriptgraph/screen-shot-2022-05-27-at-2.24.32-pm-1836x1276.png)
*I made a note of the "Application (client) ID" and the "Directory (tenant) ID"*

![](/assets/images/javascriptgraph/screen-shot-2022-05-27-at-2.29.06-pm-1836x969.png)
*I created a minimal node project*

![](/assets/images/javascriptgraph/screen-shot-2022-05-27-at-2.30.07-pm-1836x95.png)
*I added @azure/identity, @microsoft/microsoft-graph-client, isomorphic-fetch and readline-sync dependencies*

![](/assets/images/javascriptgraph/screen-shot-2022-05-27-at-2.33.22-pm-1836x968.png)
*I created an appSettings.js file including the "Application (client) ID" and the "Directory (tenant) ID" values provided in the Application registration page. I included the required Microsoft Graph permissions (the "graphUserScopes").*

![](/assets/images/javascriptgraph/screen-shot-2022-05-27-at-2.42.00-pm-1836x968.png)
*I ran the console application*


## Key moves

The index.js code contains the console application user interface. This is where the user selects an option.

The graphHelper.js file contains the most interesting code. 

The graphHelper code creates a TokenCredentialAuthenticationProvider object and uses that to create a _userClient (client) object.

The client object is then used to make calls as shown in the [Graph Explorer](MicrosoftGraph.html) "Code snippets" tab.

![](/assets/images/javascriptgraph/screen-shot-2022-05-28-at-11.08.04-am-1208x572.png)
*GetUserSnippet from the application*

![](/assets/images/javascriptgraph/screen-shot-2022-05-27-at-2.47.11-pm-1836x943.png)
*Graph Explorer Code snippet*


## Full code

The final code is included below.


## index.js

```text
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// <ProgramSnippet>
const readline = require('readline-sync');

const settings = require('./appSettings');
const graphHelper = require('./graphHelper');

async function main() {
  console.log('JavaScript Graph Tutorial');

  let choice = 0;

  // Initialize Graph
  initializeGraph(settings);

  // Greet the user by name
  await greetUserAsync();

  const choices = [
    'Display access token',
    'List my inbox',
    'Send mail',
    'List users (requires app-only)',
    'Make a Graph call'
  ];

  while (choice != -1) {
    choice = readline.keyInSelect(choices, 'Select an option', { cancel: 'Exit' });

    switch (choice) {
      case -1:
        // Exit
        console.log('Goodbye...');
        break;
      case 0:
        // Display access token
        await displayAccessTokenAsync();
        break;
      case 1:
        // List emails from user's inbox
        await listInboxAsync();
        break;
      case 2:
        // Send an email message
        await sendMailAsync();
        break;
      case 3:
        // List users
        await listUsersAsync();
        break;
      case 4:
        // Run any Graph code
        await makeGraphCallAsync();
        break;
      default:
        console.log('Invalid choice! Please try again.');
    }
  }
}

main();
// </ProgramSnippet>

// <InitializeGraphSnippet>
function initializeGraph(settings) {
  graphHelper.initializeGraphForUserAuth(settings, (info) => {
    // Display the device code message to
    // the user. This tells them
    // where to go to sign in and provides the
    // code to use.
    console.log(info.message);
  });
}
// </InitializeGraphSnippet>

// <GreetUserSnippet>
async function greetUserAsync() {
  try {
    const user = await graphHelper.getUserAsync();
    console.log(`Hello, ${user?.displayName}!`);
    // For Work/school accounts, email is in mail property
    // Personal accounts, email is in userPrincipalName
    console.log(`Email: ${user?.mail ?? user?.userPrincipalName ?? ''}`);
  } catch (err) {
    console.log(`Error getting user: ${err}`);
  }
}
// </GreetUserSnippet>

// <DisplayAccessTokenSnippet>
async function displayAccessTokenAsync() {
  try {
    const userToken = await graphHelper.getUserTokenAsync();
    console.log(`User token: ${userToken}`);
  } catch (err) {
    console.log(`Error getting user access token: ${err}`);
  }
}
// </DisplayAccessTokenSnippet>

// <ListInboxSnippet>
async function listInboxAsync() {
  try {
    const messagePage = await graphHelper.getInboxAsync();
    const messages = messagePage.value;

    // Output each message's details
    for (const message of messages) {
      console.log(`Message: ${message.subject ?? 'NO SUBJECT'}`);
      console.log(`  From: ${message.from?.emailAddress?.name ?? 'UNKNOWN'}`);
      console.log(`  Status: ${message.isRead ? 'Read' : 'Unread'}`);
      console.log(`  Received: ${message.receivedDateTime}`);
    }

    // If @odata.nextLink is not undefined, there are more messages
    // available on the server
    const moreAvailable = messagePage['@odata.nextLink'] != undefined;
    console.log(`\nMore messages available? ${moreAvailable}`);
  } catch (err) {
    console.log(`Error getting user's inbox: ${err}`);
  }
}
// </ListInboxSnippet>

// <SendMailSnippet>
async function sendMailAsync() {
  try {
    // Send mail to the signed-in user
    // Get the user for their email address
    const user = await graphHelper.getUserAsync();
    const userEmail = user?.mail ?? user?.userPrincipalName;

    if (!userEmail) {
      console.log('Couldn\'t get your email address, canceling...');
      return;
    }

    await graphHelper.sendMailAsync('Testing Microsoft Graph',
      'Hello world!', userEmail);
    console.log('Mail sent.');
  } catch (err) {
    console.log(`Error sending mail: ${err}`);
  }
}
// </SendMailSnippet>

// <ListUsersSnippet>
async function listUsersAsync() {
  try {
    const userPage = await graphHelper.getUsersAsync();
    const users = userPage.value;

    // Output each user's details
    for (const user of users) {
      console.log(`User: ${user.displayName ?? 'NO NAME'}`);
      console.log(`  ID: ${user.id}`);
      console.log(`  Email: ${user.mail ?? 'NO EMAIL'}`);
    }

    // If @odata.nextLink is not undefined, there are more users
    // available on the server
    const moreAvailable = userPage['@odata.nextLink'] != undefined;
    console.log(`\nMore users available? ${moreAvailable}`);
  } catch (err) {
    console.log(`Error getting users: ${err}`);
  }
}
// </ListUsersSnippet>

// <MakeGraphCallSnippet>
async function makeGraphCallAsync() {
  try {
    await graphHelper.makeGraphCallAsync();
  } catch (err) {
    console.log(`Error making Graph call: ${err}`);
  }
}
// </MakeGraphCallSnippet>
```

## graphHelper.js

```text
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// <UserAuthConfigSnippet>
require('isomorphic-fetch');
const azure = require('@azure/identity');
const graph = require('@microsoft/microsoft-graph-client');
const authProviders =
  require('@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials');

let _settings = undefined;
let _deviceCodeCredential = undefined;
let _userClient = undefined;

function initializeGraphForUserAuth(settings, deviceCodePrompt) {
  // Ensure settings isn't null
  if (!settings) {
    throw new Error('Settings cannot be undefined');
  }

  _settings = settings;

  _deviceCodeCredential = new azure.DeviceCodeCredential({
    clientId: settings.clientId,
    tenantId: settings.authTenant,
    userPromptCallback: deviceCodePrompt
  });

  const authProvider = new authProviders.TokenCredentialAuthenticationProvider(
    _deviceCodeCredential, {
      scopes: settings.graphUserScopes
    });

  _userClient = graph.Client.initWithMiddleware({
    authProvider: authProvider
  });
}
module.exports.initializeGraphForUserAuth = initializeGraphForUserAuth;
// </UserAuthConfigSnippet>

// <GetUserTokenSnippet>
async function getUserTokenAsync() {
  // Ensure credential isn't undefined
  if (!_deviceCodeCredential) {
    throw new Error('Graph has not been initialized for user auth');
  }

  // Ensure scopes isn't undefined
  if (!_settings?.graphUserScopes) {
    throw new Error('Setting "scopes" cannot be undefined');
  }

  // Request token with given scopes
  const response = await _deviceCodeCredential.getToken(_settings?.graphUserScopes);
  return response.token;
}
module.exports.getUserTokenAsync = getUserTokenAsync;
// </GetUserTokenSnippet>

// <GetUserSnippet>
async function getUserAsync() {
  // Ensure client isn't undefined
  if (!_userClient) {
    throw new Error('Graph has not been initialized for user auth');
  }

  return _userClient.api('/me')
    // Only request specific properties
    .select(['displayName', 'mail', 'userPrincipalName'])
    .get();
}
module.exports.getUserAsync = getUserAsync;
// </GetUserSnippet>

// <GetInboxSnippet>
async function getInboxAsync() {
  // Ensure client isn't undefined
  if (!_userClient) {
    throw new Error('Graph has not been initialized for user auth');
  }

  return _userClient.api('/me/mailFolders/inbox/messages')
    .select(['from', 'isRead', 'receivedDateTime', 'subject'])
    .top(25)
    .orderby('receivedDateTime DESC')
    .get();
}
module.exports.getInboxAsync = getInboxAsync;
// </GetInboxSnippet>

// <SendMailSnippet>
async function sendMailAsync(subject, body, recipient) {
  // Ensure client isn't undefined
  if (!_userClient) {
    throw new Error('Graph has not been initialized for user auth');
  }

  // Create a new message
  const message = {
    subject: subject,
    body: {
      content: body,
      contentType: 'text'
    },
    toRecipients: [
      {
        emailAddress: {
          address: recipient
        }
      }
    ]
  };

  // Send the message
  return _userClient.api('me/sendMail')
    .post({
      message: message
    });
}
module.exports.sendMailAsync = sendMailAsync;
// </SendMailSnippet>

// <AppOnyAuthConfigSnippet>
let _clientSecretCredential = undefined;
let _appClient = undefined;

function ensureGraphForAppOnlyAuth() {
  // Ensure settings isn't null
  if (!_settings) {
    throw new Error('Settings cannot be undefined');
  }

  if (!_clientSecretCredential) {
    _clientSecretCredential = new azure.ClientSecretCredential(
      _settings.tenantId,
      _settings.clientId,
      _settings.clientSecret
    );
  }

  if (!_appClient) {
    const authProvider = new authProviders.TokenCredentialAuthenticationProvider(
      _clientSecretCredential, {
        scopes: [ 'https://graph.microsoft.com/.default' ]
      });

    _appClient = graph.Client.initWithMiddleware({
      authProvider: authProvider
    });
  }
}
// </AppOnyAuthConfigSnippet>

// <GetUsersSnippet>
async function getUsersAsync() {
  ensureGraphForAppOnlyAuth();

  return _appClient?.api('/users')
    .select(['displayName', 'id', 'mail'])
    .top(25)
    .orderby('displayName')
    .get();
}
module.exports.getUsersAsync = getUsersAsync;
// </GetUsersSnippet>

// <MakeGraphCallSnippet>
// This function serves as a playground for testing Graph snippets
// or other code
async function makeGraphCallAsync() {
  // INSERT YOUR CODE HERE
  // Note: if using _appClient, be sure to call ensureGraphForAppOnlyAuth
  // before using it.
  // ensureGraphForAppOnlyAuth();
}
module.exports.makeGraphCallAsync = makeGraphCallAsync;
// </MakeGraphCallSnippet>
```

## appSettings.js

```text
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

const settings = {
  'clientId': 'YOUR_CLIENT_ID_HERE',
  'clientSecret': 'YOUR_CLIENT_SECRET_HERE_IF_USING_APP_ONLY',
  'tenantId': 'YOUR_TENANT_ID_HERE_IF_USING_APP_ONLY',
  'authTenant': 'common',
  'graphUserScopes': [
    'user.read',
    'mail.read',
    'mail.send'
  ]
};

module.exports = settings;
```

