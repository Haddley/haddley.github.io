---
title: "Power Apps, Custom Connectors and API Management"
description: "Power Apps, Custom Connectors and API Management"
date: "2025-09-20"
category: "Development"
image: "/assets/images/api-management/hero.png"
tags: ["azure","ai"]
---

# Power Apps, Custom Connectors and API Management

## Power Apps, Custom Connectors and API Management

![](/assets/images/api-management/office-365-icon-500x500.png)
*Microsoft_Office_logo by Microsoft is licensed under CC*


## Azure API Management Service

The API Management Service controls how api services are exposed to employees by applying authentication, authorization, and usage limits.

![](/assets/images/api-management/screen-shot-2021-08-01-at-6.03.37-pm-1554x1140.png)
*Navigate to Azure API Management services page*

![](/assets/images/api-management/screen-shot-2021-08-01-at-7.19.56-pm-1516x1412.png)
*Create haddley-api*

![](/assets/images/api-management/screen-shot-2021-08-01-at-7.20.41-pm-1518x1412.png)
*haddley-api will be created*

![](/assets/images/api-management/screen-shot-2021-08-01-at-7.22.37-pm-1794x962.png)
*haddley-api deployment in progress*

![](/assets/images/api-management/screen-shot-2021-08-01-at-8.21.56-pm-1796x954.png)
*haddley-api deployment complete*

![](/assets/images/api-management/screen-shot-2021-08-01-at-8.22.22-pm-1796x962.png)
*haddley-api overview*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.14.22-pm-1628x768.png)
*Existing Web Service API (no authentication)*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.14.51-pm-1624x772.png)
*Existing API includes Swagger*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.15.06-pm-1626x768.png)
*Url to swagger.json definition*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.18.25-pm-1836x1089.png)
*Add API to API Management*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.19.01-pm-1128x766.png)
*Provide url to swagger.json*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.27.46-pm-1836x1089.png)
*Review API details*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.28.02-pm-1836x1088.png)
*Test /Book GET*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.28.18-pm-1836x1086.png)
*Test is successful*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.29.00-pm-1836x1088.png)
*Create Power Connector (for Power Apps)*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.45.40-pm-1836x1089.png)
*Provide connector name*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.46.25-pm-1836x1089.png)
*New custom connector has been added*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.46.49-pm-1836x1082.png)
*Edit the connector to review*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.47.03-pm-1836x1085.png)
*Notice that an API Key/Subscription is required*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.47.37-pm-1836x1079.png)
*+ New connection (based on the Custom Connector)*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.48.00-pm-1836x1089.png)
*A Subscription key has to be provided*

![](/assets/images/api-management/screen-shot-2021-08-03-at-12.33.42-am-1594x746.png)
*Using Chrome to call the API Management service without passing the Subscription key*

![](/assets/images/api-management/screen-shot-2021-08-03-at-12.31.47-am-1836x1047.png)
*Using Postman to call the API Management service without passing the Subscription key*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.49.47-pm-1836x1088.png)
*Notice that a Subscription key was provided in the API Management test page*

![](/assets/images/api-management/screen-shot-2021-08-03-at-12.32.01-am-1836x1143.png)
*Using Postman to call the API Management service providing the Subscription key*

![](/assets/images/api-management/screen-shot-2021-08-02-at-9.24.05-pm-1836x694.png)
*The same Subscription key value can be copied from the API Management Subscriptions page*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.50.07-pm-1836x1086.png)
*Enter the Subscription key*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.50.26-pm-1836x1083.png)
*The new connection has been created*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.50.47-pm-1836x1087.png)
*Create a test Power App*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.51.04-pm-1836x1087.png)
*Blank Power App*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.51.28-pm-1836x1084.png)
*Add a data source*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.51.51-pm-1836x1088.png)
*The connector has been added*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.52.27-pm-1836x1084.png)
*Add a button and configure the "OnSelect" handler*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.52.41-pm-1836x1084.png)
*OnSelect books will be retrieved and stored in a "colBooks" collection*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.53.09-pm-1836x1088.png)
*Preview the app*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.53.18-pm-1836x1090.png)
*Press the Button*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.53.44-pm-1836x1088.png)
*Navigate to Collections to review the result*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.54.29-pm-1836x1085.png)
*Add a gallery control and set items property to colBooks collection*

![](/assets/images/api-management/screen-shot-2021-08-02-at-8.54.54-pm-1836x1086.png)
*update the gallery control to display book titles and isbn (numbers)*

![](/assets/images/api-management/screen-shot-2021-08-02-at-9.00.16-pm-1836x1082.png)
*Add a new subscription*

![](/assets/images/api-management/screen-shot-2021-08-02-at-9.01.26-pm-1836x1086.png)
*Copy the subscription key*

![](/assets/images/api-management/screen-shot-2021-08-02-at-9.04.27-pm-1836x420.png)
*Edit the connection*

![](/assets/images/api-management/screen-shot-2021-08-02-at-9.04.37-pm-1836x1087.png)
*Update the subscription key*

## References

- [How to import APIs to Power Apps using Azure API Management](https://www.youtube.com/watch?v=06CRN18kH1k)

