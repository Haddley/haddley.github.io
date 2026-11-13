---
type: post
slug: firebase
title: "Firebase"
date: "2023-04-24"
builds_on: []
topics: [firebase-integration, real-time-database, push-notifications, web-hosting, performance-monitoring]
tools: [Firebase, Cloud Firestore, Cloud Storage, Firebase Hosting, Firebase Cloud Messaging, Visual Studio Code]
status: current
checked: "2026-11-05"
source_hash: "6f47be383f13"
generated_by: gemma4:12b
---

**Summary.** I built a web application that integrates various Firebase services to manage authentication, data storage, and notifications. The project demonstrates how to implement real-time features and performance monitoring for a chat application.

## What I did
- I cloned the codelab repository and configured the project in the Firebase console.
- I integrated Firebase Authentication, Cloud Firestore, and Cloud Storage into the application.
- I implemented Firebase Cloud Messaging to handle push notifications and device tokens.
- I deployed the final application files to Firebase Hosting using the Firebase CLI.

## Claims
- The application uses Cloud Firestore to manage structured data and receive instant updates.
  > "Cloud Firestore to save structured data on the cloud and get instant notification when data changes."
- I used the Firebase CLI to deploy the application files to the hosting service.
  > "I deployed the app files to Firebase Hosting using the Firebase CLI."
- The system uses a specific rules language to define security and access rights for Cloud Storage.
  > "Cloud Storage for Firebase uses a specific rules language to define access rights, security, and data validations."
- The application provides push notifications and browser popups through Cloud Messaging.
  > "Firebase Cloud Messaging to send push notifications and display browser popup notifications; and"
- I used the Performance Monitoring SDK to collect and analyze real-world data.
  > "You can use the Performance Monitoring SDK to collect real-world performance data from your app and then review and analyze that data in the Firebase console."
- The system generates a device token to target notifications to specific browsers.
  > "This device token is what we use to send a notification to a particular device or particular browser."

## Outcome
I built a functional chat application that utilizes the Firebase suite of tools for backend services. I successfully deployed the application to a live web environment.

## Caveats
The post does not detail the specific logic for the custom security rules used in the production environment.
