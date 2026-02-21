---
title: "Firebase"
description: "Firebase web codelab"
date: "2023-04-24"
categories: ["JavaScript","Firebase"]
tags: "firebase"
slug: "firebase"
image: "/assets/images/firebase/logo-lockup-firebase-vertical.svg"
---



The application I built uses these Firebase products for web apps:

Firebase Authentication to easily allow your users to sign into your app.
Cloud Firestore to save structured data on the cloud and get instant notification when data changes.
Cloud Storage for Firebase to save files in the cloud.
Firebase Hosting to host and serve your assets.
Firebase Cloud Messaging to send push notifications and display browser popup notifications; and
Firebase Performance Monitoring to collect user performance data for your app.

Instructions are available:

https://firebase.google.com/codelabs/firebase-web

I started by cloning the codelab-friendlychat-web repository

```bash
% git clone https://github.com/firebase/codelab-friendlychat-web
```


![](/assets/images/firebase/screen-shot-2023-04-24-at-9.26.33-pm-1836x1262.png)
*codelab-friendlychat-web*

![](/assets/images/firebase/screen-shot-2023-04-24-at-9.46.58-pm-1836x1050.png)
*I opened the project in Visual Studio Code*


## I created a Firebase project

https://console.firebase.google.com

![](/assets/images/firebase/screen-shot-2023-04-24-at-9.42.04-pm-1836x692.png)
*I provided a name for the project*

![](/assets/images/firebase/screen-shot-2023-04-24-at-9.42.31-pm-1836x1013.png)
*I disabled google analytics for this project*

![](/assets/images/firebase/screen-shot-2023-04-24-at-9.42.41-pm-1836x1018.png)
*I waited*

![](/assets/images/firebase/screen-shot-2023-04-24-at-9.48.14-pm-1836x712.png)
*The new project was ready*

![](/assets/images/firebase/screen-shot-2023-04-24-at-9.51.37-pm-1836x844.png)
*FriendlyChat project*

![](/assets/images/firebase/screen-shot-2023-04-24-at-9.54.01-pm-1836x911.png)
*Project ID is friendlychat-2ee95*


## Add a web app

I added a Firebase web app to the Firebase project

![](/assets/images/firebase/screen-shot-2023-04-24-at-9.59.48-pm-1416x596.png)
*Web*

![](/assets/images/firebase/screen-shot-2023-04-24-at-10.01.56-pm-1836x923.png)
*Register app*

![](/assets/images/firebase/screen-shot-2023-04-24-at-10.02.44-pm-1836x1008.png)
*Add Firebase SDK instructions*

![](/assets/images/firebase/screen-shot-2023-04-24-at-10.04.31-pm-1836x769.png)
*Copy this object*

![](/assets/images/firebase/screen-shot-2023-04-24-at-10.07.26-pm-1836x1049.png)
*Paste here*

![](/assets/images/firebase/screen-shot-2023-04-24-at-10.17.54-pm-1836x567.png)
*The Friendly Chat web app has been created*


## Enable Google sign-in for Firebase Authentication

To allow users to sign in to the web app with their Google accounts, I selected the Google sign-in method

![](/assets/images/firebase/screen-shot-2023-04-24-at-10.22.48-pm-1836x827.png)
*Google provider*

![](/assets/images/firebase/screen-shot-2023-04-24-at-10.25.18-pm-1836x1013.png)
*Enable Google Authentication*

![](/assets/images/firebase/screen-shot-2023-04-24-at-10.26.39-pm-1836x990.png)
*Provider Enabled*


## Enable Cloud Firestore

The web app uses Cloud Firestore to save chat messages and receive new chat messages.

![](/assets/images/firebase/screen-shot-2023-04-24-at-10.29.18-pm-1836x961.png)
*Start in test mode*

![](/assets/images/firebase/screen-shot-2023-04-24-at-10.30.35-pm-1640x1006.png)
*I selected location and clicked the Enable button*

![](/assets/images/firebase/screen-shot-2023-04-24-at-10.32.05-pm-1836x700.png)
*Firestore database has been created*


## Enable Cloud Storage

The web app uses Cloud Storage for Firebase to store, upload, and share pictures.

![](/assets/images/firebase/screen-shot-2023-04-24-at-10.35.55-pm-1466x1008.png)
*old default*

![](/assets/images/firebase/screen-shot-2023-04-24-at-10.36.28-pm-1634x1104.png)
*Start in test mode*

![](/assets/images/firebase/screen-shot-2023-04-24-at-10.37.27-pm-1634x658.png)
*Location defaults to firestore location*

![](/assets/images/firebase/screen-shot-2023-04-24-at-10.39.33-pm-1836x588.png)
*Firestore storage has been created*


## Installing the Firebase command-line interface

npm install -g firebase-tools
firebase --version
firebase login

![](/assets/images/firebase/screen-shot-2023-04-24-at-10.42.42-pm-1354x86.png)
*firebase --version*

![](/assets/images/firebase/screen-shot-2023-04-24-at-10.11.51-pm-1352x602.png)
*firebase login*

![](/assets/images/firebase/screen-shot-2023-04-24-at-10.46.45-pm-1322x210.png)
*firebase use --add*


## Run the starter app locally

firebase serve --only hosting

![](/assets/images/firebase/screen-shot-2023-04-24-at-10.48.50-pm-1298x138.png)
*firebase serve --only hosting*

![](/assets/images/firebase/screen-shot-2023-04-24-at-10.49.41-pm-1836x1093.png)
*The web app User Interface*


## Import the Firebase SDK

I navigated to the web-start directory
I ran npm install to download the Firebase SDK
I ran npm run start to start Webpack.

![](/assets/images/firebase/screen-shot-2023-04-25-at-4.20.53-am-1836x831.png)
*/web-start/package.json*

![](/assets/images/firebase/screen-shot-2023-04-25-at-4.22.59-am-1836x869.png)
*/web-start/index.js*

![](/assets/images/firebase/screen-shot-2023-04-25-at-4.25.10-am-1360x426.png)
*npm i*

![](/assets/images/firebase/screen-shot-2023-04-25-at-4.25.40-am-1350x408.png)
*npm run start*


## Configure Firebase

I copied the config object snippet and added it to /web-start/src/firebase-config.js.

![](/assets/images/firebase/screen-shot-2023-04-25-at-4.28.16-am-1836x904.png)
*snippet*

![](/assets/images/firebase/screen-shot-2023-04-25-at-4.30.08-am-1836x706.png)
*firebase-config.js*

![](/assets/images/firebase/screen-shot-2023-04-25-at-4.31.57-am-1836x512.png)
*initializeApp*


## Authenticate users with Google Sign-In

In the app, when a user clicks the Sign in with Google button, the signIn function is triggered.

![](/assets/images/firebase/screen-shot-2023-04-25-at-4.34.43-am-1836x724.png)
*signIn() and signOut()*

![](/assets/images/firebase/screen-shot-2023-04-25-at-4.36.18-am-1836x277.png)
*initFirebaseAuth()*

![](/assets/images/firebase/screen-shot-2023-04-25-at-4.37.26-am-1836x638.png)
*authStateObserver(user)*

![](/assets/images/firebase/screen-shot-2023-04-25-at-4.38.56-am-1836x352.png)
*getProfilePicUrl() and getUserName()*

![](/assets/images/firebase/screen-shot-2023-04-25-at-4.40.16-am-1836x210.png)
*isUserSignedIn()*

![](/assets/images/firebase/screen-shot-2023-04-25-at-4.42.56-am-1836x462.png)
*firebase serve --only hostingTest sign-in*

![](/assets/images/firebase/screen-shot-2023-04-25-at-4.45.44-am-1548x830.png)
*messages*


## Add messages to Cloud Firestore

A user clicking the SEND button the app adds a message object to the Cloud Firestore. The add() method adds a new document with an automatically generated ID to the collection.

![](/assets/images/firebase/screen-shot-2023-04-25-at-4.49.02-am-1836x535.png)
*saveMessage()*

![](/assets/images/firebase/screen-shot-2023-04-25-at-4.50.05-am-1254x216.png)
*testing "SEND"*

![](/assets/images/firebase/screen-shot-2023-04-25-at-4.58.32-am-1836x976.png)
*addDoc(...)*

![](/assets/images/firebase/screen-shot-2023-04-25-at-5.01.18-am-1836x856.png)
*messages*


## Synchronize messages

To read messages in the app, I added listeners that trigger when data changes and then create a UI element that shows new messages.

![](/assets/images/firebase/screen-shot-2023-04-25-at-5.04.44-am-1836x590.png)
*loadMessages()*

![](/assets/images/firebase/screen-shot-2023-04-25-at-5.07.50-am-1304x498.png)
*loadMessages()*


## Save images to Cloud Storage

After selecting a file, the saveImageMessage function is called.

![](/assets/images/firebase/screen-shot-2023-04-25-at-7.25.20-am-1836x928.png)
*saveImageMessage*

![](/assets/images/firebase/screen-shot-2023-04-25-at-7.30.53-am-1636x1260.png)
*testing saveImageMessage*


## Add a Firebase Cloud Messaging service worker

The app will notify users when new messages are posted in the chat.

![](/assets/images/firebase/screen-shot-2023-04-25-at-7.51.40-am-1836x433.png)
*service worker*


## Get Firebase Cloud Messaging device tokens

When notifications have been enabled on a device or browser, you'll be given a device token. This device token is what we use to send a notification to a particular device or particular browser.

![](/assets/images/firebase/screen-shot-2023-04-25-at-7.54.56-am-1836x947.png)
*saveMessagingDeviceToken()*


## Request permissions to show notifications

When the user has not yet granted your app permission to show notifications, you won't be given a device token. In this case, we call the firebase.messaging().requestPermission() method, which will display a browser dialog asking for this permission ( in supported browsers).

![](/assets/images/firebase/screen-shot-2023-04-25-at-7.57.22-am-1836x518.png)
*requestPermission()*

![](/assets/images/firebase/screen-shot-2023-04-25-at-7.59.51-am-1636x544.png)
*Allow notifications*

![](/assets/images/firebase/screen-shot-2023-04-25-at-8.04.40-am-1632x658.png)
*device token*


## Send a notification to your device

Now that you have your device token, you can send a notification using the Cloud Messaging tab of the Firebase console.

![](/assets/images/firebase/screen-shot-2023-04-25-at-8.08.24-am-1836x1046.png)
*Testing*


## Database security rules

Cloud Firestore uses a specific rules language to define access rights, security, and data validations.

![](/assets/images/firebase/screen-shot-2023-04-25-at-8.17.23-am-1836x915.png)
*Updated Firestore rules*


## Storage security rules

Cloud Storage for Firebase uses a specific rules language to define access rights, security, and data validations.

![](/assets/images/firebase/screen-shot-2023-04-25-at-8.21.59-am-1836x729.png)
*Updated Storage rules*


## Collect performance data

You can use the Performance Monitoring SDK to collect real-world performance data from your app and then review and analyze that data in the Firebase console.

![](/assets/images/firebase/screen-shot-2023-04-25-at-8.25.36-am-1836x128.png)
*getPerformance()*


## Measure first input delay

First input delay starts when the user first interacts with an element on the page, like clicking a button or hyperlink. It stops immediately after the browser is able to respond to the input, meaning that the browser isn't busy loading or parsing your page's content.

![](/assets/images/firebase/screen-shot-2023-04-25-at-8.27.11-am-1836x290.png)
*First input delay*


## Deploy the app using Firebase Hosting

I deployed the app files to Firebase Hosting using the Firebase CLI. 

I needed to specify in the firebase.json file which local files should be deployed.

![](/assets/images/firebase/screen-shot-2023-04-25-at-8.35.12-am-1836x852.png)
*firebase.json*

![](/assets/images/firebase/screen-shot-2023-04-25-at-8.36.34-am-1440x560.png)
*firebase deploy --except functions*

![](/assets/images/firebase/screen-shot-2023-04-25-at-8.37.44-am-1638x1334.png)
*https://friendlychat-2ee95.web.app/*
## References

- [Firebase web codelab](https://firebase.google.com/codelabs/firebase-web)
- [Patterns for security with Firebase: per-user permissions for Cloud Firestore](https://medium.com/firebase-developers/patterns-for-security-with-firebase-per-user-permissions-for-cloud-firestore-be67ee8edc4a)