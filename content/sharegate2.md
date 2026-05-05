---
title: "ShareGate"
description: "ShareGate Migration (Part 2)"
date: "2026-05-01"
categories: ["Microsoft 365"]
tags: "sharepoint, azure, on-premises, online, migration"
slug: "shareGate2"
image: "/assets/images/sharepoint2019/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png"
---

In [Part 1](/posts/sharegate/) I installed ShareGate and connected it to both my on-premises SharePoint 2019 environment and a SharePoint Online tenant. In this post I go further — first building out a custom content type on the source site to give the migration something meaningful to carry across, then running ShareGate's pre-migration reports to understand the current state of the environment, and finally using the Copy feature to migrate the full site structure from on-premises to SharePoint Online.

The goal was to prove that ShareGate faithfully migrates not just files but the underlying metadata model — content types, site columns, library configuration, and permissions — so that documents arrive in SharePoint Online with their structure intact and ready to use.

![](assets/images/shareGate2/Screenshot-2026-05-02-at-1.54.00-PM.png)
*I opened the SharePoint 2019 site and navigated to Site contents from the Settings menu*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-1.54.35-PM.png)
*The Site Contents page showed the Documents and Form Templates libraries*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-1.54.57-PM.png)
*I opened Site Settings from the Settings gear*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-1.55.28-PM.png)
*I navigated to Site Content Types to view and manage the existing content types*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-1.57.14-PM.png)
*I created a new site content type called "Policy" with a description, parented to Document*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-1.57.30-PM.png)
*I set the group to "Custom Content Types" and clicked OK to save*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-1.58.05-PM.png)
*The Policy content type was created with Name and Title columns inherited from Document*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-1.58.22-PM.png)
*I could see the Policy content type settings and its inherited columns*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-1.59.00-PM.png)
*I created a new site column called "Effective Date" using the Date and Time type*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.00.00-PM.png)
*I configured the Effective Date column with a description, Date Only format, and Today's Date as the default value*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.00.27-PM.png)
*I set the column to update all inheriting content types and clicked OK*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.24.06-PM.png)
*The Policy content type now showed three columns: Name, Title, and Effective Date*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.25.06-PM.png)
*I opened the Documents library and selected Library settings from the Settings menu*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.26.09-PM.png)
*The Documents library settings page opened*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.26.28-PM.png)
*I opened Advanced settings and enabled content type management for the library*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.26.51-PM.png)
*The Documents settings page now showed a Content Types section with an option to add more*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.27.12-PM.png)
*I added the Policy content type to the library*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.27.45-PM.png)
*The Documents library now showed both Document and Policy content types available*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.29.30-PM.png)
*In the modern Documents library, the New button now offered Folder, Document, Policy, and Link options*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.31.10-PM.png)
*I created a new Policy document called "HR Policy" and filled in the Title and Effective Date fields*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.32.30-PM.png)
*I selected the HR Policy document and used the Add column menu to add the Effective Date column to the view*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.32.46-PM.png)
*I used the Edit view columns panel to make the Effective Date column visible in the library view*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.35.58-PM.png)
*I opened ShareGate and navigated to the Plan section to run pre-migration reports*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.36.45-PM.png)
*I selected SharePoint - 80 as the target for the permissions matrix report*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.37.54-PM.png)
*I configured the permissions matrix report options targeting all site collections in the web application*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.39.10-PM.png)
*The permissions matrix report showed the Home site's permissions for all users and groups*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.39.31-PM.png)
*I returned to the ShareGate Plan screen to run the site collection report*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.39.43-PM.png)
*I selected SharePoint - 80 as the target for the site collection report*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.39.57-PM.png)
*I configured the site collection report options targeting SharePoint - 80*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.40.39-PM.png)
*The site collection report showed the Home site with a context menu of available actions*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.40.58-PM.png)
*I exported the site collection report to an Excel file*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.41.11-PM.png)
*A confirmation dialog showed the report was successfully saved to Documents*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.41.41-PM.png)
*The ShareGate Tasks page showed the completed site collection and permissions reports alongside the previous copy task*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.43.41-PM.png)
*I switched to the Copy section and connected to the on-premises SharePoint source using Windows authentication*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.44.11-PM.png)
*ShareGate connected to the source and showed the Home site collection available to migrate*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.44.39-PM.png)
*I entered the SharePoint Online destination URL and chose Browser authentication to connect*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.44.57-PM.png)
*The Microsoft sign-in dialog appeared for browser authentication to SharePoint Online*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.45.06-PM.png)
*I entered my password to sign in to the SharePoint Online tenant*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.45.36-PM.png)
*I was prompted to stay signed in and clicked Yes*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.45.53-PM.png)
*ShareGate connected to the destination and showed the OnPremHome site collection ready to receive the migration*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.47.10-PM.png)
*The Copy structure screen showed a side-by-side comparison of content types, lists, and libraries between source and destination*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.48.50-PM.png)
*I configured the copy options to merge with OnPremHome in Automatic mode, keeping custom permissions, list content, workflows, and other settings*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.49.16-PM.png)
*ShareGate showed a trial warning that some items may be randomly skipped before the migration started*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.51.47-PM.png)
*The migration was in progress, copying the site collection structure to OnPremHome*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.57.10-PM.png)
*The migration report showed "Copy completed" with the full list of successfully migrated items*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-2.58.19-PM.png)
*I opened the OnPremHome site in SharePoint Online and saw the migrated HR Policy document with the Effective Date column*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-3.17.38-PM.png)
*I opened the Settings panel on the OnPremHome Documents library in SharePoint Online*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-3.18.00-PM.png)
*I navigated to Site contents on the OnPremHome site to verify the migrated structure*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-3.18.17-PM.png)
*I opened Site Settings and hovered over "Site content types" to check the content type was migrated*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-3.19.12-PM.png)
*The Content type gallery confirmed the Policy content type had been successfully migrated to SharePoint Online*

![](assets/images/shareGate2/Screenshot-2026-05-02-at-3.19.29-PM.png)
*The Policy content type in SharePoint Online showed all three site columns: Name, Title, and Effective Date*

![](assets/images/shareGate2/Screenshot-2026-05-05-at-1.59.36-PM.png)
*I reviewed Azure Cost Analysis dashboard with the SharePoint virtual machines accounting for the majority of the $21.79 accumulated cost*

## References

- [ShareGate Training Videos and Ask the Expert Sessions](https://help.sharegate.com/en/articles/10236073-sharegate-training-videos-and-ask-the-expert-sessions)
