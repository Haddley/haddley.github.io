---
title: "Power Apps, Custom Connectors and API Management"
description: "Azure API Management Service"
date: "2021-08-02"
categories: ["Power Platform","Azure"]
tags: ""
hidden: false
slug: "api-management"
image: "/assets/images/api-management/office-365-icon-500x500.png"
---

I used the API Management Service to control how API services are exposed to employees by applying authentication, authorization, and usage limits.

![](/assets/images/api-management/screen-shot-2021-08-01-at-6.03.37-pm-1554x1140.png)
*I navigated to the Azure API Management services page*

![](/assets/images/api-management/screen-shot-2021-08-01-at-7.19.56-pm-1516x1412.png)
*I created haddley-api*

![](/assets/images/api-management/screen-shot-2021-08-01-at-7.20.41-pm-1518x1412.png)
*haddley-api was being created*

![](/assets/images/api-management/screen-shot-2021-08-01-at-7.22.37-pm-1794x962.png)
*haddley-api deployment was in progress*

![](/assets/images/api-management/screen-shot-2021-08-01-at-8.21.56-pm-1796x954.png)
*haddley-api deployment was complete*

![](/assets/images/api-management/screen-shot-2021-08-01-at-8.22.22-pm-1796x962.png)
*I reviewed the haddley-api overview*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.14.22-pm-1628x768.png)
*I identified an existing web service API (no authentication)*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.14.51-pm-1624x772.png)
*The existing API included Swagger*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.15.06-pm-1626x768.png)
*I noted the URL to the swagger.json definition*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.18.25-pm-1836x1089.png)
*I added the API to API Management*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.19.01-pm-1128x766.png)
*I provided the URL to swagger.json*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.27.46-pm-1836x1089.png)
*I reviewed the API details*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.28.02-pm-1836x1088.png)
*I tested /Book GET*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.28.18-pm-1836x1086.png)
*The test was successful*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.29.00-pm-1836x1088.png)
*I created a Power Connector (for Power Apps)*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.45.40-pm-1836x1089.png)
*I provided a connector name*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.46.25-pm-1836x1089.png)
*The new custom connector was added*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.46.49-pm-1836x1082.png)
*I edited the connector to review it*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.47.03-pm-1836x1085.png)
*I noticed that an API key/subscription was required*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.47.37-pm-1836x1079.png)
*I created a new connection based on the custom connector*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.48.00-pm-1836x1089.png)
*I was required to provide a subscription key*

![](/assets/images/api-management/screen-shot-2021-08-03-at-12.33.42-am-1594x746.png)
*I used Chrome to call the API Management service without the subscription key*

![](/assets/images/api-management/screen-shot-2021-08-03-at-12.31.47-am-1836x1047.png)
*I used Postman to call the API Management service without the subscription key*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.49.47-pm-1836x1088.png)
*I noticed the subscription key was provided in the API Management test page*

![](/assets/images/api-management/screen-shot-2021-08-03-at-12.32.01-am-1836x1143.png)
*I used Postman to call the API Management service with the subscription key*

![](/assets/images/api-management/screen-shot-2021-08-02-at-9.24.05-pm-1836x694.png)
*I copied the subscription key from the API Management Subscriptions page*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.50.07-pm-1836x1086.png)
*I entered the subscription key*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.50.26-pm-1836x1083.png)
*The new connection was created*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.50.47-pm-1836x1087.png)
*I created a test Power App*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.51.04-pm-1836x1087.png)
*I started with a blank Power App*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.51.28-pm-1836x1084.png)
*I added a data source*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.51.51-pm-1836x1088.png)
*The connector was added*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.52.27-pm-1836x1084.png)
*I added a button and configured the "OnSelect" handler*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.52.41-pm-1836x1084.png)
*On select, books were retrieved and stored in a "colBooks" collection*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.53.09-pm-1836x1088.png)
*I previewed the app*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.53.18-pm-1836x1090.png)
*I pressed the button*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.53.44-pm-1836x1088.png)
*I navigated to Collections to review the result*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.54.29-pm-1836x1085.png)
*I added a gallery control and set its items property to the colBooks collection*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.54.54-pm-1836x1086.png)
*I updated the gallery control to display book titles and ISBN numbers*

![](/assets/images/api-management/screen-shot-2021-08-02-at-9.00.16-pm-1836x1082.png)
*I added a new subscription*

![](/assets/images/api-management/screen-shot-2021-08-02-at-9.01.26-pm-1836x1086.png)
*I copied the subscription key*

![](/assets/images/api-management/screen-shot-2021-08-02-at-9.04.27-pm-1836x420.png)
*I edited the connection*

![](/assets/images/api-management/screen-shot-2021-08-02-at-9.04.37-pm-1836x1087.png)
*I updated the subscription key*

## References

- [How to import APIs to Power Apps using Azure API Management](https://www.youtube.com/watch?v=06CRN18kH1k)
