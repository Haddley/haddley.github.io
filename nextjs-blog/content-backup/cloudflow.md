---
title: "Cloud Flow"
description: "A comprehensive guide covering cloud flow"
date: "2025-09-20"
category: "Development"
image: "/assets/images/cloudflow.png"
tags: ["cloud","business central"]
---

# Cloud Flow

Power Apps (Part 12) Copilot Studio Topic with a Cloud Flow This file is licensed under the Creative Commons Attribution 4.0 International license. Copilot Studio Topic with a Cloud Flow I created a Topic that used the Business Central Connector to retrieve the list of "Evaluation" Company Customers. I used a Cloud Flow to workaround an issue. There were six customers setup in the "Evaluation" Company I clicked the + Create|Topic|From blank menu item I named the Topic "Customers" I added the phrases "list customers" and "customer list" I selected the Call an action|Basic actions|Create a flow menu item I renamed the flow "Customer Flow" I clicked the "Add an action" button I searched for "Business Central" actions I selected Environment "PRODUCTION" I selected Company "Evalutation" I selected API Category "v2.0" I selected table name "customers" I added an output I selected "Text" I clicked the fx button I selected the string() function I clicked the Dynamic content tab I selected "body/value" I clicked save and returned to the Topic I added a message to display the output of the cloud flow I copied part of the JSON I clicked the Variable management|Parse value menu item I selected the output of the Cloud Flow I selected the "From sample data" option I clicked the Get schema from sample JSON link I pasted in the JSON I had copied earlier (updating the double quote characters). I clicked the Edit schema link to review the result I created a new Variable to save the result (a table) I reviewed the Parse value action I created a new Message. I set the output to Concat(Topic.Var1,displayName,", ") I removed the original Message and tested the Topic by entering the phrase "list customers". The copilot provided the response I was hoping for.
