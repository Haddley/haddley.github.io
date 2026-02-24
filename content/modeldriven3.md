---
title: "Model Driven Apps (Part 3)"
description: "JavaScript to update a Business Process Flow Stage"
date: "2023-10-08"
categories: ["Power Platform"]
tags: ""
slug: "modeldriven3"
image: "/assets/images/modeldriven3/office-365-icon-500x500.png"
---


I used JavaScript to extend a model driven app. I configured the app to call JavaScript functions on form events — OnLoad, OnChange, OnSave — and from button clicks. The functions validated input, showed and hid form sections, updated business process flow stages, and created new records.

See also: [Power Apps Component Framework](/posts/componentFramework)

I used `Xrm.Page.data.process.moveNext()` and `Xrm.Page.data.process.movePrevious()` to update a Business Process Flow stage from the browser console.

![](/assets/images/modeldriven3/screenshot-2023-10-06-at-1.01.56-pm-2136x1053.png)
*const process = Xrm.Page.data.process*

![](/assets/images/modeldriven3/screenshot-2023-10-06-at-1.02.31-pm-2136x1049.png)
*process.moveNext()*

![](/assets/images/modeldriven3/screenshot-2023-10-06-at-1.03.50-pm-2136x1051.png)
*process.moveNext()*

![](/assets/images/modeldriven3/screenshot-2023-10-06-at-1.09.42-pm-2136x1011.png)
*process.movePrevious()*


## JavaScript to Show or Hide a Tab

I used `Xrm.Page.data.ui.tabs.get("<tab name>").setVisible(false)` and `.setVisible(true)` to hide or show a tab.

![](/assets/images/modeldriven3/screenshot-2023-10-06-at-1.48.25-pm-2136x770.png)
*Xrm.Page.ui.tabs.get('{f3ca5bbd-8896-40c1-9cb2-bc5a744ac9f7}').setVisible(true)*

![](/assets/images/modeldriven3/screenshot-2023-10-06-at-1.53.15-pm-2136x596.png)
*Xrm.Page.ui.tabs.get('{f3ca5bbd-8896-40c1-9cb2-bc5a744ac9f7}').setVisible(false)*


## JavaScript to Read and Update Field/Control/Attribute Values

I used `Xrm.Page.getAttribute('nh_businessneed').getValue()` and `.setValue('Hello')` to read and update a field value.

![](/assets/images/modeldriven3/screenshot-2023-10-06-at-2.40.25-pm-2136x729.png)
*Xrm.Page.data.entity.attributes._collection to view attribute namesXrm.Page.getAttribute('nh_businessneed').getValue()*

![](/assets/images/modeldriven3/screenshot-2023-10-06-at-2.41.43-pm-2136x764.png)
*Xrm.Page.getAttribute('nh_businessneed').setValue('Hello')*


## JavaScript to clone a record

![](/assets/images/modeldriven3/screenshot-2023-10-08-at-7.39.02-pm-2136x647.png)
*Clone the current Project table record*


## Configuring a model driven app to call a JavaScript function

I added a Clone button to a model driven app's form command bar and used JavaScript to implement the record copying functionality

Notice that [in the Modern Command Designer](https://venkatasubbaraopolisetty.com/2022/12/31/back-to-basics-69-usage-of-parameters-from-modern-command-designer-in-dynamics-crm/) the execution context is not passed to a JavaScript handler function as a parameter.

![](/assets/images/modeldriven3/screenshot-2023-10-09-at-11.46.53-am-1471x582.png)
*The Clone function receives the primaryControl as a parameter*

![](/assets/images/modeldriven3/screenshot-2023-10-09-at-11.48.07-am-1471x760.png)
*I uploaded the JavaScript file as a Web resource*

![](/assets/images/modeldriven3/screenshot-2023-10-09-at-11.50.04-am-1471x569.png)
*I published the Web resource after each update*

![](/assets/images/modeldriven3/screenshot-2023-10-09-at-11.50.42-am-1471x759.png)
*I added a Clone button*

![](/assets/images/modeldriven3/screenshot-2023-10-09-at-12.20.39-pm-2136x1079.png)
*I clicked the clone command and generated a new record*