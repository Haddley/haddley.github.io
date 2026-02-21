---
title: "Cloud Flow"
description: "A Topic that uses the Business Central Connector"
date: "2024-02-26"
categories: ["Power Platform","Microsoft Dynamics","Business Central"]
tags: "topic"
slug: "cloudflow"
image: "/assets/images/cloudflow/office-365-icon-500x500.png"
---




I created a Topic that used the Business Central Connector to retrieve the list of "Evaluation" Company Customers. I used a Cloud Flow to workaround an issue.

![](/assets/images/cloudflow/screenshot-2024-02-26-at-11.41.15-am-1836x1146.png)
*There were six customers setup in the "Evaluation" Company*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.07.19-am-1836x949.png)
*I clicked the + Create|Topic|From blank menu item*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.08.17-am-1836x332.png)
*I named the Topic "Customers"*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.08.53-am-1836x865.png)
*I added the phrases "list customers" and "customer list"*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.09.15-am-1836x951.png)
*I selected the Call an action|Basic actions|Create a flow menu item*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.10.02-am-1836x198.png)
*I renamed the flow "Customer Flow"*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.10.43-am-1836x360.png)
*I clicked the "Add an action" button*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.11.19-am-1836x722.png)
*I searched for "Business Central" actions*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.13.23-am-1836x873.png)
*I selected Environment "PRODUCTION"*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.13.34-am-1836x857.png)
*I selected Company "Evalutation"*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.13.48-am-1836x1043.png)
*I selected API Category "v2.0"*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.14.25-am-1836x858.png)
*I selected table name "customers"*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.15.01-am-1836x400.png)
*I added an output*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.15.10-am-1836x502.png)
*I selected "Text"*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.23.44-am-1836x436.png)
*I clicked the fx button*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.23.56-am-1836x998.png)
*I selected the string() function*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.24.11-am-1836x990.png)
*I clicked the Dynamic content tab*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.24.21-am-1836x984.png)
*I selected "body/value"*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.24.31-am-1836x766.png)
*I clicked save and returned to the Topic*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.25.35-am-1836x1020.png)
*I added a message to display the output of the cloud flow*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.26.07-am-1836x1040.png)
*I copied part of the JSON*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.26.24-am-1836x1040.png)
*I clicked the Variable management|Parse value menu item*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.26.44-am-1836x1040.png)
*I selected the output of the Cloud Flow*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.26.58-am-1836x1042.png)
*I selected the "From sample data" option*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.27.12-am-1836x1029.png)
*I clicked the Get schema from sample JSON link*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.40.17-am-1836x1039.png)
*I pasted in the JSON I had copied earlier (updating the double quote characters).*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.40.31-am-1836x1037.png)
*I clicked the Edit schema link to review the result*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.40.49-am-1836x1040.png)
*I created a new Variable to save the result (a table)*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.41.04-am-1836x1040.png)
*I reviewed the Parse value action*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.41.51-am-1836x1037.png)
*I created a new Message.*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.42.06-am-1836x1040.png)
*I set the output to Concat(Topic.Var1,displayName,", ")*

![](/assets/images/cloudflow/screenshot-2024-02-26-at-9.43.07-am-1836x1038.png)
*I removed the original Message and tested the Topic by entering the phrase "list customers". The copilot provided the response I was hoping for.*