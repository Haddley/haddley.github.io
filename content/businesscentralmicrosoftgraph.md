---
title: "Business Central Microsoft Graph"
description: "Financials"
date: "2023-12-18"
categories: ["Microsoft Dynamics","Business Central"]
tags: ""
slug: "businesscentralmicrosoftgraph"
image: "/assets/images/businesscentralmicrosoftgraph/posts-meta.svg"
---




[Microsoft Graph](MicrosoftGraph.html) can be used to develop applications that securely access and integrate with the data stored in Microsoft Dynamics 365 Business Central.

Graph Explorer is a web-based tool provided by Microsoft that allows developers and users to interact with Microsoft Graph APIs (Application Programming Interfaces) without the need for writing code.

![](/assets/images/businesscentralmicrosoftgraph/screen-shot-2023-12-18-at-9.17.04-am-1836x929.png)
*I navigated to Business Central and reviewed the three companies listed.*

![](/assets/images/businesscentralmicrosoftgraph/screen-shot-2023-12-18-at-2.05.32-pm-1836x1025.png)
*In the Evaluation company the ATHENS Desk item had a unit price of $1,000.80*

![](/assets/images/businesscentralmicrosoftgraph/screen-shot-2023-12-18-at-9.17.44-am-1836x928.png)
*I navigated to https://developer.microsoft.com/en-us/graph/graph-explorer and clicked the login button*

![](/assets/images/businesscentralmicrosoftgraph/screen-shot-2023-12-18-at-9.17.59-am-1836x924.png)
*I logged in using the same credentials*

![](/assets/images/businesscentralmicrosoftgraph/screen-shot-2023-12-18-at-9.19.33-am-1836x865.png)
*I switched to the beta endpoint. Typeahead suggested financials*

![](/assets/images/businesscentralmicrosoftgraph/screen-shot-2023-12-18-at-9.20.42-am-1836x873.png)
*I added companies and made a GET request to https://graph.microsoft.com/beta/financials/companies.*

![](/assets/images/businesscentralmicrosoftgraph/screen-shot-2023-12-18-at-9.21.14-am-1836x872.png)
*I added the id of company Evaluation (shown above) to the request url. Typeahead provided a list of options.*

![](/assets/images/businesscentralmicrosoftgraph/screen-shot-2023-12-18-at-9.22.45-am-1836x871.png)
*I selected customers from the typeahead. I made a GET request to https://graph.../customers*

![](/assets/images/businesscentralmicrosoftgraph/screen-shot-2023-12-18-at-9.23.31-am-1836x871.png)
*I added the id of customer Adatum Corporation to the get request URL.*

![](/assets/images/businesscentralmicrosoftgraph/screen-shot-2023-12-18-at-9.28.20-am-1836x871.png)
*I updated the request URL to https://graph.../agedAccountsReceivable to return accounts receivable details*

![](/assets/images/businesscentralmicrosoftgraph/screen-shot-2023-12-18-at-9.23.53-am-1836x871.png)
*I updated the request URL to https://graph.../items*

![](/assets/images/businesscentralmicrosoftgraph/screen-shot-2023-12-18-at-9.25.08-am-1836x866.png)
*I added the ATHENS Desk item id to the URL*

![](/assets/images/businesscentralmicrosoftgraph/screen-shot-2023-12-18-at-9.36.18-am-1836x1090.png)
*Notice that at this point unit price for an ATHENS Desk was $1,000.80*

![](/assets/images/businesscentralmicrosoftgraph/screen-shot-2023-12-18-at-9.39.56-am-1836x1087.png)
*Notice that the eTag value was ...JzE50zY4N... a unique identifier associated with a specific version of a resource*

![](/assets/images/businesscentralmicrosoftgraph/screen-shot-2023-12-18-at-9.52.05-am-1836x1092.png)
*I created a Request body, updated the http verb to PATCH and added an If-Match header to the Request headers. The If-Match header was used to pass the latest eTag value. Notice that the Response returned confirms that the unit price has been updated to $1,000.90*

![](/assets/images/businesscentralmicrosoftgraph/screen-shot-2023-12-18-at-9.52.44-am-1836x1090.png)
*Notice that the Request body included the new unit price and that the Response eTag value was updated to ...JzE50zU5N..*

![](/assets/images/businesscentralmicrosoftgraph/screen-shot-2023-12-18-at-9.53.08-am-1836x1094.png)
*Executing the same PATCH request with the old eTag value results in an error.*