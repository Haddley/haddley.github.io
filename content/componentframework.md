---
title: "Component Framework"
description: "Component Framework"
date: "2022-08-14"
categories: ["Power Platform","JavaScript","React"]
tags: []
slug: "componentframework"
image: "/assets/images/office-365-icon-500x500.png"
---



Create code components for model-driven and canvas apps.

Developers can use Power Apps component framework to create, import, and add code [components](customcomponents.html) to model-driven and canvas apps. Certain APIs are not available.

![](/assets/images/componentframework/screen-shot-2022-08-17-at-10.08.36-pm-1536x758.png)
*Admin center*

![](/assets/images/componentframework/screen-shot-2022-08-17-at-10.09.25-pm-1536x648.png)
*p8lf environment*

![](/assets/images/componentframework/screen-shot-2022-08-17-at-10.11.44-pm-1536x651.png)
*Search*

![](/assets/images/componentframework/screen-shot-2022-08-17-at-10.12.15-pm-1536x649.png)
*Turn on Power Apps component framework*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-6.37.50-am-1536x754.png)
*Web API endpoint (use this URL below)*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-6.45.35-am-1536x786.png)
*Install Power Platform Tools Visual Studio Extension*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-6.46.03-am-1536x788.png)
*Power Platform Tools installed*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-6.54.01-am-1536x789.png)
*The framework was not found*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-7.07.37-am-1240x880.png)
*Install x64 version of the framework*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-7.08.30-am-1536x915.png)
*pac (help)*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-7.12.38-am-1388x210.png)
*pac pcf init --namespace haddley --name virtualcontrol --template field --framework react*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-7.16.01-am-1536x964.png)
*pac auth create –-url https://org6bf9e824.api.crm.dynamics.com(url value from Web API endpoint see above)*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-7.16.43-am-1536x237.png)
*Authentication successful*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-7.59.42-am-1536x933.png)
*npm run start(I had to run npm i -g webpack and npm link webpack first)*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-7.24.21-am-1536x651.png)
*Component running in test environment*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.02.05-am-1536x955.png)
*pac pcf push --publisher-prefix nlh*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.02.50-am-1536x449.png)
*Component has been pushed to Power Apps environment*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.03.10-am-1536x572.png)
*Contents of solution*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.06.25-am-1536x757.png)
*Create a test solution*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.06.59-am-1536x648.png)
*New model-drive app*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.07.34-am-1536x647.png)
*Name model driven app*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.08.06-am-1536x651.png)
*Add page*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.08.30-am-1536x716.png)
*Select Table based view and form*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.08.56-am-1536x717.png)
*Select "Account" entity/table*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.09.28-am-1536x716.png)
*Switch to classic*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.20.53-am-1536x715.png)
*Edit Information A form for this entity*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.24.28-am-1536x938.png)
*Add code component (use for Web, Mobile and Tablet displays)*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.24.42-am-1536x937.png)
*Default Single-line text control will never be used*

![](/assets/images/componentframework/screen-shot-2022-08-18-at-8.26.15-am-1536x713.png)
*New Account form using code control*