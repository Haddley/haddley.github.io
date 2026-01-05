---
title: "Microsoft Purview"
description: "Retention policy with adaptive scope"
date: "2022-08-03"
categories: ["Microsoft 365"]
tags: ""
slug: "purview"
image: "/assets/images/office-365-icon-500x500.png"
---


I used Microsoft Purview to create a retention policy that applies to all SharePoint sites named "Short term...".

First I created a new SharePoint Site (Site Collection) called "Short term".

![](/assets/images/purview/screen-shot-2022-07-27-at-11.22.59-am-1020x514.png)
*I selected the "Team Site" template*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.23.55-am-1020x513.png)
*I named the Site "Short term"*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.24.27-am-1020x517.png)
*I specified myself as the Site (Group) owner*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.25.46-am-1020x511.png)
*I added Lidia Holloway as a SharePoint Site member*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.25.58-am-1020x517.png)
*I selected the finish button*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.26.26-am-1020x514.png)
*I added a new word document to the Documents Document Library in the Short term SharePoint Site*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.27.36-am-1020x514.png)
*I entered some example text*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.28.02-am-1020x516.png)
*The Document.docx document was saved to the Documents Document Library (on July 27th 2022)*


## Data lifecycle management

I selected the data lifecycle management menu item, created the adaptive scope and then created the retention policy

![](/assets/images/purview/screen-shot-2022-07-27-at-11.28.54-am-1020x516.png)
*I navigated to the Microsoft Purview home page. I selected the Data lifecycle management menu item.*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.32.09-am-1380x696.png)
*I selected the Adaptive scopes menu item*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.32.18-am-1380x698.png)
*I clicked the + Create scope button*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.33.09-am-1380x699.png)
*I named the adaptive scope "Short term"*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.33.21-am-1380x699.png)
*I selected the SharePoint sites radio button option*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.34.19-am-1380x693.png)
*I entered an adaptive scope property.*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.34.30-am-1380x694.png)
*I reviewed the adaptive scope details*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.34.46-am-1380x699.png)
*The adaptive scope was created*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.40.16-am-1836x922.png)
*I created a new retention policy*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.41.02-am-1836x926.png)
*I named the retention policy "Delete after a day"*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.41.11-am-1836x928.png)
*I selected the Adaptive radio button option*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.41.29-am-1836x928.png)
*I selected the "Short term" adaptive scope I created eariler*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.41.41-am-1836x930.png)
*I reviewed the configuration and clicked the next button*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.42.04-am-1836x927.png)
*I configured the retention policy to delete items one day after they were last updated*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.42.16-am-1836x924.png)
*I reviewed the configuration and read the warning that "Items that are currently older than 1 days [sic] will be permanently deleted after you turn on this policy"*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.42.28-am-1836x924.png)
*The retention policy was successfully created*

![](/assets/images/purview/screen-shot-2022-07-27-at-11.42.50-am-1836x924.png)
*Initially the policy had no effect on contents of the "Documents" Document Library in the "Short term" SharePoint Site.*

![](/assets/images/purview/time-font-awesome.svg)
*I returned to the SharePoint Site a week later...*

![](/assets/images/purview/screen-shot-2022-08-03-at-9.18.10-pm-1836x1005.png)
*Document.docx has been deleted*

![](/assets/images/purview/screen-shot-2022-08-03-at-9.18.43-pm-1836x1003.png)
*Document.docx was moved to the SharePoint Recycle bin (on August 1st 2022).*