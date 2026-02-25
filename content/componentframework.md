---
title: "Component Framework"
description: "Component Framework"
date: "2022-08-14"
categories: ["Power Platform","React"]
tags: "pcf, component-framework, power-apps, typescript"
hidden: false
slug: "componentframework"
image: "/assets/images/componentframework/office-365-icon-500x500.png"
---



I created code components for model-driven and canvas apps.

Developers can use Power Apps component framework to create, import, and add code [components](/posts/customcomponents) to model-driven and canvas apps. Certain APIs are not available.

![](/assets/images/componentframework/screen-shot-2022-08-17-at-10.08.36-pm-1536x758.png)
*I navigated to the Admin center*

![](/assets/images/componentframework/screen-shot-2022-08-17-at-10.09.25-pm-1536x648.png)
*I selected the p8lf environment*

![](/assets/images/componentframework/screen-shot-2022-08-17-at-10.11.44-pm-1536x651.png)
*I searched for settings*

![](/assets/images/componentframework/screen-shot-2022-08-17-at-10.12.15-pm-1536x649.png)
*I turned on Power Apps component framework*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-6.37.50-am-1536x754.png)
*I noted the Web API endpoint URL*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-6.45.35-am-1536x786.png)
*I installed the Power Platform Tools Visual Studio Extension*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-6.46.03-am-1536x788.png)
*Power Platform Tools was installed*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-6.54.01-am-1536x789.png)
*The framework was not found*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-7.07.37-am-1240x880.png)
*I installed the x64 version of the framework*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-7.08.30-am-1536x915.png)
*I ran pac (help)*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-7.12.38-am-1388x210.png)
*I ran pac pcf init --namespace haddley --name virtualcontrol --template field --framework react*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-7.16.01-am-1536x964.png)
*I ran pac auth create --url https://org6bf9e824.api.crm.dynamics.com*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-7.16.43-am-1536x237.png)
*Authentication was successful*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-7.59.42-am-1536x933.png)
*I ran npm run start (after running npm i -g webpack and npm link webpack)*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-7.24.21-am-1536x651.png)
*The component was running in the test environment*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.02.05-am-1536x955.png)
*I ran pac pcf push --publisher-prefix nlh*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.02.50-am-1536x449.png)
*The component was pushed to the Power Apps environment*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.03.10-am-1536x572.png)
*I reviewed the contents of the solution*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.06.25-am-1536x757.png)
*I created a test solution*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.06.59-am-1536x648.png)
*I created a new model-driven app*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.07.34-am-1536x647.png)
*I named the model-driven app*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.08.06-am-1536x651.png)
*I added a page*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.08.30-am-1536x716.png)
*I selected Table based view and form*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.08.56-am-1536x717.png)
*I selected the "Account" entity/table*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.09.28-am-1536x716.png)
*I switched to classic*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.20.53-am-1536x715.png)
*I edited the Information form for this entity*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.24.28-am-1536x938.png)
*I added a code component for Web, Mobile and Tablet displays*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.24.42-am-1536x937.png)
*The default Single-line text control would not be used*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.26.15-am-1536x713.png)
*I reviewed the new Account form using the code control*
