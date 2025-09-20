---
title: "Ionic"
description: "A comprehensive guide covering ionic"
date: "2025-09-20"
category: "Development"
image: "/assets/images/logo-192x192.png"
tags: ["react","javascript","typescript","azure","aws"]
---

# Ionic

## Cross-platform apps.Powered by the Web.

![AWS](/assets/images/ionic/ionic-logo-landscape.svg)
*This logo image consists only of simple geometric shapes or text. It does not meet the threshold of originality needed for copyright protection, and is therefore in the public domain.*


## Starting an app

$ npm install -g @ionic/cli

$ ionic start <name>

In this case we will create a todo [Progressive Web Application](pwa.html) (PWA)

$ ionic start haddley-todo

![](/assets/images/ionic/screen-shot-2021-12-22-at-3.01.48-pm-586x372.png)
*React*

![](/assets/images/ionic/screen-shot-2021-12-22-at-3.15.41-pm-585x370.png)
*blank*


## Running

$ cd <name>

$ ionic serve

![](/assets/images/ionic/screen-shot-2021-12-22-at-3.17.22-pm-588x374.png)
*ionic serve*

![](/assets/images/ionic/screen-shot-2021-12-22-at-3.21.33-pm-767x492.png)
*blank*


## Visual Studio Code

$ code .

![](/assets/images/ionic/screen-shot-2021-12-22-at-3.25.04-pm-1026x771.png)
*Visual Studio Code*


## IndexDB

Modern browsers support IndexDB.

The Localbase package makes it easier to work with IndexDB.

$ npm install localbase --save

![](/assets/images/ionic/screen-shot-2021-12-22-at-3.30.00-pm-1001x698.png)
*npm install localbase*


## localbase.d.ts

Localbases does not include typescript type definitions.

To workaround this issue create a localbase.d.ts file

![](/assets/images/ionic/screen-shot-2021-12-22-at-3.32.49-pm-323x75.png)
*localbase.d.ts*

![](/assets/images/ionic/screen-shot-2021-12-22-at-3.33.11-pm-1000x478.png)
*contents*


## todos.ts

Create a TypeScript file that defines the "Todo" interface and uses Localbase to fetch, create and update todo items.

![](/assets/images/ionic/screen-shot-2021-12-22-at-3.39.55-pm-1000x478.png)
*todos.ts*


## TodoListItem

A react component to display each todo item.

Created using Ionic Web Components {IonItem, IonCheckbox and IonLabel}

![](/assets/images/ionic/screen-shot-2021-12-22-at-3.44.26-pm-1322x711.png)
*TodoListItem*


## Home.tsx

The home page fetches todo items from browser's IndexDB using the getTodos() method defined in todos.ts.

The home page uses the setComplete(...) method to toggle the completed value.

The home page uses the addToDo(...) method to add a new todo item.

The home page uses Ionic Web Components to display a text box and a list of TodoListItems {IonButton, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle and IonToolbar}.

The IonRefresher Web Component allows a user to refresh the list by swiping the list from top to bottom.

![](/assets/images/ionic/screen-shot-2021-12-22-at-3.52.51-pm-1327x706.png)
*Home.tsx*

![](/assets/images/ionic/screen-shot-2021-12-22-at-4.01.53-pm-1718x607.png)
*Web Inspector (Safari)*


## pwa-asset-generator

The pwa-asset-generator can be used to generate a set of application icons from a single .jpg image

![](/assets/images/ionic/screen-shot-2021-12-22-at-4.22.35-pm-1324x711.png)
*pwa-asset-generator*


## index.html

Update public/index.html to include the links

![](/assets/images/ionic/screen-shot-2021-12-22-at-4.24.04-pm-1321x714.png)
*generated icons*


## manifest.json

The public/manifest.json file provides details of the web application.

Update the manifest.json file to reference the generated icons

![](/assets/images/ionic/screen-shot-2021-12-22-at-4.03.42-pm-1326x709.png)
*default manifest.json*


## updated manifest.json

Update the application name.

![](/assets/images/ionic/screen-shot-2021-12-22-at-4.28.44-pm-1322x709.png)
*Updated manifest.json*


## Service Worker

Service Worker allows the PWA to run offline.

Service Worker allows the PWA to upgrade while online.

![](/assets/images/ionic/screen-shot-2021-12-22-at-4.35.51-pm-1323x710.png)
*serviceWorkerRegistration.register(...)*


## build

$ ionic build

![](/assets/images/ionic/screen-shot-2021-12-22-at-4.38.55-pm-1324x712.png)
*ionic build*


## Deploy to Azure

Deploy to Static Website via Azure Storage...

![](/assets/images/ionic/screen-shot-2021-12-22-at-4.39.41-pm-1324x710.png)
*Deploy to Static Website...*

![](/assets/images/ionic/screen-shot-2021-12-22-at-4.40.36-pm-638x98.png)
*Create new Storage Account...*

![](/assets/images/ionic/screen-shot-2021-12-22-at-4.40.50-pm-623x92.png)
*haddleytodo*

![](/assets/images/ionic/screen-shot-2021-12-22-at-4.41.45-pm-472x58.png)
*Creating...*

![](/assets/images/ionic/screen-shot-2021-12-22-at-4.44.37-pm-465x182.png)
*Deployment complete*

![](/assets/images/ionic/screen-shot-2021-12-22-at-4.45.20-pm-894x523.png)
*Running in safari (from Azure)*

![](/assets/images/ionic/screen-shot-2021-12-22-at-4.48.42-pm-355x732.png)
*Running on iPhone Simulator (Safari)*

![](/assets/images/ionic/screen-shot-2021-12-22-at-4.49.00-pm-358x730.png)
*Add to Home Screen*

![](/assets/images/ionic/screen-shot-2021-12-22-at-4.49.09-pm-360x730.png)
*Add*

![](/assets/images/ionic/screen-shot-2021-12-22-at-4.49.18-pm-360x730.png)
*Icon on home screen*

![](/assets/images/ionic/screen-shot-2021-12-22-at-4.49.58-pm-363x732.png)
*Running (online)*

![](/assets/images/ionic/screen-shot-2021-12-22-at-5.06.21-pm-357x730.png)
*Updated version available*


## IonItemSliding

Add the IonItemSliding tag and the user is able to swipe an item from right to left to reveal a Delete option.

![](/assets/images/ionic/screen-shot-2021-12-23-at-1.00.16-pm-1310x778.png)
*IonItemSliding*

![](/assets/images/ionic/screen-shot-2021-12-23-at-1.00.42-pm-718x1446.png)
*Swipe list item right to left*


## PouchDB

[PouchDB](https://pouchdb.com) is an open-source JavaScript database inspired by Apache CouchDB that is designed to run well within the browser.

PouchDB was created to help web developers build applications that work as well offline as they do online.


## CouchDB

```bash
% docker run -p 5984:5984 -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=password -d couchdb

% curl localhost:5984
```

http://localhost:5984/_utils/

The code below demonstrates how the todo application was updated to use PouchDB and CouchDB.

![](/assets/images/ionic/screen-shot-2021-12-27-at-12.16.35-pm-1162x546.png)
*docker run ...*

![](/assets/images/ionic/screen-shot-2021-12-27-at-12.18.39-pm-587x276.png)
*curl localhost:5984*

![](/assets/images/ionic/screen-shot-2021-12-27-at-12.20.36-pm-1146x613.png)
*_utils*

![](/assets/images/ionic/screen-shot-2021-12-27-at-12.22.03-pm-1145x617.png)
*Enable CORS*

![](/assets/images/ionic/screen-shot-2021-12-27-at-2.10.40-pm-1352x718.png)
*No databases*

![](/assets/images/ionic/screen-shot-2021-12-27-at-2.10.59-pm-1354x722.png)
*Adding Task 1 using Safari*

![](/assets/images/ionic/screen-shot-2021-12-27-at-2.11.09-pm-1353x721.png)
*Task 1 has been added*

![](/assets/images/ionic/screen-shot-2021-12-27-at-2.11.21-pm-1352x721.png)
*Task 1 details have been replicated to the CouchDB server*

![](/assets/images/ionic/screen-shot-2021-12-27-at-2.11.34-pm-1355x719.png)
*All documents*

![](/assets/images/ionic/screen-shot-2021-12-27-at-2.11.44-pm-1354x720.png)
*Task 1 details*

![](/assets/images/ionic/screen-shot-2021-12-27-at-2.12.00-pm-1353x719.png)
*Task 1 has been replicated to Chrome*

![](/assets/images/ionic/screen-shot-2021-12-27-at-2.12.11-pm-1353x719.png)
*Task 1 has been updated using Chrome*

![](/assets/images/ionic/screen-shot-2021-12-27-at-2.13.40-pm-1355x718.png)
*Task 1 update has been replicated to Safari*

![](/assets/images/ionic/screen-shot-2021-12-27-at-2.16.12-pm-1272x721.png)
*CouchDB is stopped*

![](/assets/images/ionic/screen-shot-2021-12-27-at-2.17.25-pm-1570x898.png)
*Multiple changes made offline using Safari and Chrome*

![](/assets/images/ionic/screen-shot-2021-12-27-at-2.17.54-pm-1267x718.png)
*CouchDB server started*

![](/assets/images/ionic/screen-shot-2021-12-27-at-2.18.50-pm-1570x901.png)
*Multiple updates are replicated to/from Safari/Chrome*
