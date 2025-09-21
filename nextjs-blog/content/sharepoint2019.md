---
title: "SharePoint 2019"
description: "A comprehensive guide covering sharepoint 2019"
date: "2025-09-20"
category: "Development"
image: "/assets/images/sharepoint2019/hero.png"
tags: ["azure","sql","database","ai"]
---

# SharePoint 2019

## SharePoint hosted in Azure

![](/assets/images/sharepoint2019/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png)
*Microsoft Office SharePoint (2018–present) by Microsoft Corporation is licensed under CC*


## Azure Portal

I logged into Azure Portal

I selected 'SharePoint Server 2019 Trial' in Marketplace

I added Active Directory role

I added SQL Server

I ran the SharePoint Configuration Wizard

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.29.53-pm-1836x1074.png)
*Azure Portal*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.30.34-pm-1836x435.png)
*I entered 'SharePoint' into search*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.31.05-pm-1836x721.png)
*I used 'see all' link to view the SharePoint related Marketplace items*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.31.23-pm-1836x627.png)
*I selected the 'SharePoint Server Trial' card*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.31.36-pm-1836x597.png)
*I selected the 'SharePoint Server 2019 Trial' item*


## Active Directory and SQL Server

The SharePoint Server 2019 Trial overview explains that: 

"You can set-up Active Directory and SQL Server required for your SharePoint farm by provisioning additional virtual machines".

In this case I wanted to install Active Directory, SQL Server and SharePoint on a single server.

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.32.31-pm-1836x972.png)
*I created a new Azure Resource Group 'sharepoint-rg'*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.33.08-pm-1836x967.png)
*I named the new virtual machine 'sharepoint-vm'*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.34.02-pm-1836x965.png)
*I specified an administrator user name 'sharepoint_admin'*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.34.55-pm-1836x965.png)
*I selected 'Review + Create'*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.35.12-pm-1836x972.png)
*I clicked Create*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.41.48-pm-1836x969.png)
*I navigated to the virtual machine and selected Connect*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.42.43-pm-1836x972.png)
*I selected 'Download RDP File' (Remote Desktop Protocol)*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.42.59-pm-1836x976.png)
*I opened the downloaded file with the Microsoft Remote Desktop application*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.43.38-pm-868x460.png)
*I provided the Administrator credentials*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.45.00-pm-1836x1149.png)
*SharePoint has been installed*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.47.38-pm-1836x1150.png)
*I clicked the 'Add roles and features' link*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.47.57-pm-1570x1120.png)
*I clicked next*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.48.12-pm-1566x1112.png)
*I left 'Role-based...' selected and clicked next*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.48.25-pm-1570x1116.png)
*I selected the local server*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.48.51-pm-1576x1114.png)
*I selected the 'Active Directory Domain Services' option and clicked next*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.49.11-pm-1566x1112.png)
*I reviewed the dependencies and clicked next*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.49.52-pm-1564x1112.png)
*I reviewed the features that would be installed and clicked next*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.50.03-pm-1572x1120.png)
*I reviewed the AD DS summary and clicked next*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.50.14-pm-1570x1114.png)
*I clicked install*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.50.29-pm-1564x1110.png)
*I clicked close*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-2.50.54-pm-1836x327.png)
*I reviewed the install progress*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-3.09.11-pm-1836x325.png)
*A saw that a restart was required*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-3.09.26-pm-1284x444.png)
*I restarted the server*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-3.14.44-pm-1836x331.png)
*I needed to promote the server to a domain controlled*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-3.15.01-pm-1514x1110.png)
*I started the Active Directory Domain Services Configuration Wizard*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-3.15.34-pm-1512x1116.png)
*I selected new forest and entered a root domain name 'sharepoint.haddley.com'*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-3.16.31-pm-1512x1114.png)
*I provided a DSRM password*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-3.16.52-pm-1512x1110.png)
*I ignored the DNS warning*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-3.17.17-pm-1512x1116.png)
*I reviewed the suggested NetBIOS domain name 'SHAREPOINT' and clicked next*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-3.17.37-pm-1518x1118.png)
*I reviewed the suggested folders and clicked next*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-3.17.51-pm-1514x1114.png)
*I reviewed the summary and clicked next*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-3.18.17-pm-1512x1112.png)
*I reviewed the warnings and clicked install*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-3.19.16-pm-1616x1112.png)
*The server restarted*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-3.20.45-pm-868x466.png)
*I logged into the virtual machine*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-3.42.51-pm-1386x996.png)
*I deselected the 'Google Update' services*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-3.44.35-pm-1836x1075.png)
*The were no errors in the Server Manager Dashboard*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-3.45.51-pm-1836x1341.png)
*I downloaded SQL Server Developer Edition from https://www.microsoft.com/en-us/sql-server/sql-server-downloads*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-3.46.10-pm-1684x1340.png)
*I installed SQL Server*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-3.58.19-pm-1684x1338.png)
*I installed the SSMS management application from https://aka.ms/ssmsfullsetup*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-4.07.11-pm-1372x1122.png)
*SSMS installed*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-4.07.25-pm-1836x956.png)
*I confirmed that the SQL Server command line application sqlcmd was working*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-4.08.12-pm-982x514.png)
*I started the SharePoint 2019 Products Configuration Wizard*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-4.08.38-pm-1230x1062.png)
*I clicked next*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-4.08.52-pm-1232x1060.png)
*I clicked Yes*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-4.09.05-pm-1226x1060.png)
*I selected 'Create a new farm' and clicked next*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-4.10.47-pm-1230x1058.png)
*I entered the local server's name as the database server and provided the administrator's credentials*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-4.11.11-pm-1228x1068.png)
*I provided a passphrase*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-4.11.23-pm-1228x1062.png)
*I selected the Single-Server Farm option and clicked next*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-4.11.37-pm-1236x1062.png)
*I accepted the suggested (random) administration site port number 9728*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-4.11.49-pm-1230x1058.png)
*I reviewed the settings and clicked next*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-4.11.59-pm-1234x1060.png)
*I waited for the wizard to run*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-4.25.34-pm-1226x1058.png)
*The configuration wizard finished*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-4.29.04-pm-1806x1188.png)
*I navigated to the Central Administration site*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-4.29.18-pm-1806x1178.png)
*I specified that all of the SharePoint Services should runas the same administrator account*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-4.29.52-pm-1802x1182.png)
*I waited*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-4.39.59-pm-1836x1349.png)
*I was able to access the Central Administration site*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-4.52.04-pm-1518x776.png)
*I created a 'Home' Site Collection*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-4.52.55-pm-1836x1325.png)
*I selected the 'Team Site' template*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-4.53.53-pm-1836x1321.png)
*I provided the administrator account name*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-5.35.17-pm-1836x1066.png)
*I was able to navigate to the Team Site*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-5.38.42-pm-872x758.png)
*I added Test 1 and Test 2 user accounts*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-5.39.17-pm-864x756.png)
*I provided a password*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-5.40.06-pm-1836x1062.png)
*I reviewed Team Site permissions*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-5.40.38-pm-1836x1071.png)
*I clicked the Share site button*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-5.40.53-pm-1836x1067.png)
*I shared the Team Site with the Test 1 and Test 2 users*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-5.41.16-pm-1836x1064.png)
*The Test 1 and Test 2 users are able to View and Edit items in the Team Site*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-5.41.44-pm-1836x919.png)
*The Site permission update was saved*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-5.44.16-pm-1836x771.png)
*I updated the virtual machine's public dns details*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-5.44.27-pm-1836x180.png)
*I saved the update*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-5.45.44-pm-1836x436.png)
*I navigated to the Team Site from my laptop using the dns address*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-5.46.08-pm-1836x452.png)
*I entered the administrator credentials*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-5.46.22-pm-1836x583.png)
*I was able to access the Team Site as the administrator*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-5.47.15-pm-1836x435.png)
*I switched to incognito mode and logged in as user Test 1*

![](/assets/images/sharepoint2019/screen-shot-2022-12-31-at-5.47.34-pm-1836x1073.png)
*I was able to access the Team Site as user Test 1*

![](/assets/images/sharepoint2019/screen-shot-2023-01-02-at-10.22.43-am-1836x1089.png)
*Cost analysis*
## References

- [SharePoint Server in Microsoft Azure](https://learn.microsoft.com/en-us/sharepoint/administration/sharepoint-server-in-microsoft-azure)

