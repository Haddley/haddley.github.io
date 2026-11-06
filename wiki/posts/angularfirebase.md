---
type: post
slug: angularfirebase
title: "Angular Firebase"
date: "2023-04-25"
builds_on: [npm]
topics: [angular-integration, firebase-authentication, firestore-database, web-development]
tools: [Angular, Firebase, npm, Bootstrap, Firestore]
status: current
checked: "2026-11-05"
source_hash: "cd73ca8216a5"
generated_by: gemma4:12b
---

**Summary.** I explain how to integrate Firebase services into an Angular application. I demonstrate the process of setting up authentication, configuring the environment, and building core components.

## What I did
- I created and configured a Firebase project.
- I installed the necessary Angular and Firebase libraries.
- I configured the application modules and environment files.
- I built the login, register, and dashboard components.
- I implemented data storage and retrieval using Firestore.

## Claims
- I used the Firebase console to create the project.
  > "I created a Firebase project using https://console.firebase.google.com"
- I enabled the Email and Password authentication method.
  > "*I enabled Email/Password authentication*"
- I integrated the Firebase configuration into the environment files.
  > "I added firebaseConfig to environments.ts"
- I added the necessary providers and modules to the application module.
  > "*I added provideFirebaseApp, provideFirestore, provideAuth and ReactiveFormsModule to app.module.ts*"
- I used Bootstrap to style the user forms.
  > "I used Bootstrap for styling the forms."
- I used specific methods to save and retrieve messages from the collection.
  > "I used addDoc and query collection to save and retrieve messages."

## Outcome
I built a functional web application that uses Angular and Firebase for authentication and data management.

## Caveats
The post does not show the specific CSS styling details for the Bootstrap components.
