---
title: "ShareGate"
description: "ShareGate Migration (Part 1)"
date: "2026-04-30"
categories: ["Microsoft 365"]
tags: "sharepoint, azure, on-premises, online, migration"
slug: "shareGate"
image: "/assets/images/sharepoint2019/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png"
---

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.08.48-PM.png)
*I opened the Azure portal and clicked Create a resource*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.10.18-PM.png)
*I searched for "sharepoint" in the Marketplace and found several SharePoint Server options*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.10.43-PM.png)
*I started creating a virtual machine and entered a new resource group name "haddley-sharepoint-rg"*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.11.18-PM.png)
*I named the VM "haddley-sharepoint-vm" and selected the SharePoint Server Subscription Edition Trial image*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.11.49-PM.png)
*I set the administrator username to "neil", configured a password, and allowed RDP on port 3389*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.12.27-PM.png)
*I reviewed the Networking tab and left the default virtual network and subnet settings*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.13.14-PM.png)
*Validation passed — the VM would cost $0.2000 USD/hr, and I clicked Create*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.14.56-PM.png)
*The deployment completed successfully*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.15.19-PM.png)
*I navigated to Connect on the VM and downloaded the RDP file*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.16.21-PM.png)
*macOS prompted me to enter credentials to connect to the VM via RDP*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.25.42-PM.png)
*I was connected to the Windows Server desktop inside the VM*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.26.30-PM.png)
*Server Manager Dashboard was open, ready for configuration*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.27.09-PM.png)
*I opened the Add Roles and Features Wizard and clicked past the Before You Begin page*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.27.30-PM.png)
*I selected Role-based or feature-based installation*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.27.55-PM.png)
*The wizard detected the haddley-sharepo server in the pool and I selected it*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.28.20-PM.png)
*A prompt appeared asking me to add the features required for Active Directory Domain Services — I clicked Add Features*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.28.58-PM.png)
*I reviewed the additional features to be installed alongside AD DS*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.29.20-PM.png)
*I read through the Active Directory Domain Services information page*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.29.54-PM.png)
*I confirmed the installation selections and clicked Install*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.30.25-PM.png)
*The installation progress screen showed AD DS and related features being installed*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.30.48-PM.png)
*Server Manager showed feature installation in progress in the notifications area*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.33.32-PM.png)
*The feature installation succeeded on haddley-sharepo*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.34.09-PM.png)
*I opened the Start menu and saw the Microsoft SharePoint Products folder alongside the Windows Server tools*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.36.11-PM.png)
*Server Manager showed a post-deployment notification prompting me to promote the server to a domain controller*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.38.19-PM.png)
*I opened the AD DS Configuration Wizard and added a new forest with the root domain name "sharepoint.haddley.com"*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.38.52-PM.png)
*I set the forest and domain functional levels to Windows Server 2016 and entered the DSRM password*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.39.09-PM.png)
*The DNS Options page showed a warning that a delegation could not be created, which I acknowledged*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.39.30-PM.png)
*The NetBIOS domain name was automatically set to "SHAREPOINT"*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.39.51-PM.png)
*I left the default paths for the AD DS database, log files, and SYSVOL folder*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.40.05-PM.png)
*I reviewed all the AD DS configuration options before proceeding*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.40.29-PM.png)
*All prerequisite checks passed and I clicked Install*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.41.19-PM.png)
*The server was successfully configured as a domain controller and I was signed out for a reboot*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.49.06-PM.png)
*After the reboot, Server Manager showed the AD DS and DNS roles had been added successfully*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.50.49-PM.png)
*I searched for "sql server developer edition" in the browser inside the VM*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.53.33-PM.png)
*I navigated to the SQL Server downloads page on microsoft.com*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.53.59-PM.png)
*The SQL Server 2025 Standard Developer Edition installer downloaded to the Downloads folder*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.54.19-PM.png)
*I ran the installer and selected the Basic installation type*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.54.35-PM.png)
*I accepted the Microsoft SQL Server licence terms*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.54.46-PM.png)
*I left the default install location at C:\Program Files\Microsoft SQL Server*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.55.00-PM.png)
*SQL Server 2025 was downloading the install package at around 290 Mbps*

![](assets/images/shareGate/Screenshot-2026-04-30-at-5.57.11-PM.png)
*The installer was running the SQL Server engine installation*

![](assets/images/shareGate/Screenshot-2026-04-30-at-6.01.29-PM.png)
*SQL Server 2025 installation completed successfully*

![](assets/images/shareGate/Screenshot-2026-04-30-at-6.02.29-PM.png)
*I clicked Connect Now to verify the installation via SQLCMD*

![](assets/images/shareGate/Screenshot-2026-04-30-at-6.02.43-PM.png)
*SQLCMD confirmed SQL Server 2025 RTM (17.0.1000.7) was running on the server*

![](assets/images/shareGate/Screenshot-2026-04-30-at-6.03.19-PM.png)
*I opened the Start menu and found the SharePoint Products Configuration Wizard under Microsoft SharePoint Products*

![](assets/images/shareGate/Screenshot-2026-04-30-at-6.03.43-PM.png)
*The SharePoint Products Configuration Wizard welcomed me and explained what it would need*

![](assets/images/shareGate/Screenshot-2026-04-30-at-6.03.58-PM.png)
*A warning appeared that IIS, SharePoint Administration Service, and SharePoint Timer Service may need to be restarted — I clicked Yes*

![](assets/images/shareGate/Screenshot-2026-04-30-at-6.04.43-PM.png)
*I chose to create a new server farm*

![](assets/images/shareGate/Screenshot-2026-04-30-at-6.07.09-PM.png)
*I specified the configuration database server as "haddley-sharepo" and set the database access account credentials*

![](assets/images/shareGate/Screenshot-2026-04-30-at-6.07.49-PM.png)
*I entered and confirmed the farm security passphrase*

![](assets/images/shareGate/Screenshot-2026-04-30-at-6.08.52-PM.png)
*I selected Single-Server Farm as the server role*

![](assets/images/shareGate/Screenshot-2026-04-30-at-6.09.15-PM.png)
*I configured the SharePoint Central Administration web application to use port 26923 with NTLM authentication*

![](assets/images/shareGate/Screenshot-2026-04-30-at-6.09.33-PM.png)
*I reviewed the complete configuration summary and clicked Next to apply it*

![](assets/images/shareGate/Screenshot-2026-04-30-at-6.09.53-PM.png)
*The wizard was configuring SharePoint Products, on task 3 of 10 — creating the configuration database*

![](assets/images/shareGate/Screenshot-2026-04-30-at-6.21.16-PM.png)
*The SharePoint Products configuration completed successfully and I clicked Finish*

![](assets/images/shareGate/Screenshot-2026-04-30-at-6.23.19-PM.png)
*The browser prompted me to sign in to the SharePoint Central Administration site on the SHAREPOINT domain*

![](assets/images/shareGate/Screenshot-2026-04-30-at-6.24.02-PM.png)
*The Initial Farm Configuration Wizard asked about telemetry participation — I selected No*

![](assets/images/shareGate/Screenshot-2026-04-30-at-6.25.51-PM.png)
*SharePoint Central Administration opened, asking how I wanted to configure the farm — I clicked Start the Wizard*

![](assets/images/shareGate/Screenshot-2026-04-30-at-6.26.27-PM.png)
*The Service Applications and Services page showed available services to configure for the farm*

![](assets/images/shareGate/Screenshot-2026-04-30-at-6.26.41-PM.png)
*SharePoint displayed "Working on it..." while provisioning the service applications*


![](assets/images/shareGate/Screenshot-2026-04-30-at-7.11.14-PM.png)
*I configured the first site collection, entering the title "Home" and selecting the Team site template*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.12.45-PM.png)
*The Farm Configuration Wizard completed, listing all provisioned service applications and confirming the site URL*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.12.55-PM.png)
*The wizard showed the Hybrid features section for SharePoint Server Subscription Edition — I clicked Finish*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.21.40-PM.png)
*The on-premises SharePoint "Home" team site loaded successfully at haddley-sharepo*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.22.13-PM.png)
*I searched for "sharegate download" in Bing inside the VM*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.22.33-PM.png)
*I navigated to the ShareGate download page and the ShareGate.26.4.6.msi installer started downloading*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.25.16-PM.png)
*I logged into ShareGate with my Microsoft 365 account neil@haddleyoffice365.onmicrosoft.com*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.29.35-PM.png)
*I was in the ShareGate workspace showing the Migrate and Protect products, with a 14-day free trial active*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.30.03-PM.png)
*The ShareGate Migrate Setup Wizard welcomed me and I clicked Next to begin*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.30.14-PM.png)
*I accepted the ShareGate Migrate end user licence agreement*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.30.24-PM.png)
*I selected to install ShareGate Migrate just for my user account*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.30.33-PM.png)
*I clicked Install on the Ready to Install screen*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.31.24-PM.png)
*ShareGate Migrate setup completed successfully and I clicked Finish to launch it*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.32.04-PM.png)
*ShareGate Migrate opened and prompted me to connect my first environment — it detected my SHAREPOINT\neil credentials*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.33.35-PM.png)
*I entered the on-premises site address https://haddley-sharepo/ and clicked Connect*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.33.47-PM.png)
*ShareGate Migrate showed "Connecting..." while establishing the connection*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.34.26-PM.png)
*ShareGate loaded the on-premises site and showed a "Let's get started" welcome popup — I clicked "I'm good, take me to the app"*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.34.41-PM.png)
*The Explore view showed the Haddley-sharepo SharePoint Subscription Edition connection was active*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.35.12-PM.png)
*A Microsoft sign-in page appeared so I could add my Microsoft 365 account as the migration destination*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.36.24-PM.png)
*I entered my password for neil@haddleyoffice365.onmicrosoft.com*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.36.37-PM.png)
*Microsoft asked "Stay signed in?" and I clicked Yes*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.37.02-PM.png)
*Microsoft 365 Copilot opened in the browser after signing in to the tenant*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.37.16-PM.png)
*SharePoint Online showed my tenant's sites including Communication, Ad Staff, and Child Site 1*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.38.36-PM.png)
*I confirmed the SharePoint Online sites were accessible from within the VM*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.39.31-PM.png)
*SharePoint Online site list confirmed the Microsoft 365 destination was ready*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.42.54-PM.png)
*I navigated to the on-premises SharePoint Documents library — it was empty*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.45.29-PM.png)
*I used the browser print function to save the Documents list as a PDF to create a test file to migrate*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.45.40-PM.png)
*I saved the printed PDF as "Home - Documents - All Documents" to the Downloads folder*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.46.02-PM.png)
*I uploaded the PDF to the on-premises SharePoint Documents library*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.46.16-PM.png)
*The PDF appeared in the on-premises Documents library*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.46.46-PM.png)
*ShareGate Migrate Explore view showed the document visible in the Haddley-sharepo Documents folder*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.46.57-PM.png)
*I selected the document in ShareGate and the action panel appeared on the right with migration and management options*

![](assets/images/shareGate/Screenshot-2026-04-30-at-7.47.19-PM.png)
*The action panel showed options including Download, Check in, Break inheritance, Edit, and Delete permanently*

![](assets/images/shareGate/Screenshot-2026-04-30-at-8.20.28-PM.png)
*I opened the Copy section in ShareGate Migrate and selected "Copy existing structure and content" to begin the migration*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.20.58-PM.png)
*I entered http://haddley-sharepo/ as the source site address with my SHAREPOINT\\neil credentials*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.22.34-PM.png)
*ShareGate connected to the on-premises site and listed the Home site collection as the source*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.23.47-PM.png)
*I entered https://haddleyoffice365.sharepoint.com/ as the destination and clicked Connect using Browser authentication*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.24.10-PM.png)
*A browser authentication window opened asking me to sign in with neil@haddleyoffice365.onmicrosoft.com*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.24.26-PM.png)
*I entered my password for the Microsoft 365 destination tenant*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.24.59-PM.png)
*Microsoft asked "Stay signed in?" and I clicked Yes*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.25.17-PM.png)
*ShareGate asked for consent to access the Haddleyoffice365 Microsoft 365 tenant — I clicked "Consent through Microsoft"*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.25.45-PM.png)
*Microsoft showed the list of permissions requested by the ShareGate Migrate app for my organisation*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.25.56-PM.png)
*I reviewed the full permissions list and clicked Accept to grant the ShareGate app access*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.26.15-PM.png)
*The browser prompted me to open ShareGate Migrate to complete the authentication callback — I clicked Open*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.27.31-PM.png)
*I opened SharePoint Online to create a destination site, choosing between Team site and Communication site*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.27.44-PM.png)
*I chose the Standard team template for the new SharePoint Online site*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.27.56-PM.png)
*I previewed the Standard team template showing its site capabilities and what would be included*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.28.26-PM.png)
*I named the new site "OnPremHome" and the site address was confirmed as available*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.28.39-PM.png)
*I set the site privacy to Public and left the language as English, then clicked Create site*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.28.56-PM.png)
*I confirmed Neil Haddley as a member and clicked Finish to provision the site*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.29.20-PM.png)
*The new OnPremHome team site loaded successfully in SharePoint Online*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.32.13-PM.png)
*Back in ShareGate I entered the OnPremHome site URL as the migration destination and clicked Connect*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.32.26-PM.png)
*Browser authentication opened again to sign in to the OnPremHome destination site*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.32.36-PM.png)
*I entered my password to authenticate to the OnPremHome destination site*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.33.08-PM.png)
*ShareGate confirmed the OnPremHome site was connected as the destination and I clicked Next*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.33.18-PM.png)
*The Copy structure view showed the on-premises Home site on the left and OnPremHome on the right with matching lists and libraries*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.33.44-PM.png)
*I selected the Documents library on both sides and clicked Start copy, dismissing the off-peak hours suggestion*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.33.57-PM.png)
*A warning appeared that this is a trial edition and some items may be randomly skipped — I clicked Continue*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.35.18-PM.png)
*The migration report showed the copy in progress with 4 items queued including the file, content, library and session*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.35.28-PM.png)
*The migration report showed "Copy completed!" with 3 successes and 1 warning*
![](assets/images/shareGate/Screenshot-2026-04-30-at-8.37.39-PM.png)
*The OnPremHome Documents library in SharePoint Online showed the migrated PDF had arrived successfully*


## References

- [ShareGate Training Videos and Ask the Expert Sessions](https://help.sharegate.com/en/articles/10236073-sharegate-training-videos-and-ask-the-expert-sessions)
