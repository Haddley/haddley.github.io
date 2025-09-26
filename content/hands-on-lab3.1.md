---
title: "Hands-on-Lab 3.1"
description: "Set Up Finance Management"
date: "2025-09-20"
category: "Business Central"
image: "/assets/images/hands-on-lab3.1/hero.png"
tags: ["ai","business central","dynamics","git"]
---

![](/assets/images/hands-on-lab3.1/dynamics365-color.svg)
*By Microsoft, Public Domain*


**Hands-on-Lab 3.1: Set Up Finance Management**

"When setting up the company you were misinformed about Contoso’s fiscal year. Although they want to use Microsoft Dynamics 365 Business Central as of January 1st 2024, their new fiscal year does not start until July 1st 2024.

You will have to correct this mistake and prepare the accounting periods for the entire fiscal year..

After setting up the correct accounting periods, you will complete some general accounting setup.

Contoso is located in the United States and will record their accounting data in US dollar, thereby respecting the currencies 2 digit decimals for displaying invoice amounts and amounts. Unit-prices however, can be shown with 2 up to 5 digit decimals.

Analysis of recorded accounting data will be mainly focused on the sales transactions, using the created dimensions. Contoso’s accounting manager would like to analyze these sales transactions directly from the chart of accounts, to make sure all the detailed information is at hand. Later they will set up some more general reports. 

He would also like to track costs by department where, for now, the main focus is on easily entering this information. The specific reporting details will be determined later on.

Once the company’s users will start to record sales and purchase transactions, the accounting manager wants to make sure they are only processed within the current accounting period. Make sure the company is set for the first transactions for January 2022, but also allow your own user to process the opening balance on December 31st 2021."

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-10.57.19-am-1836x535.png)
*I used search to navigate to the Accounting Periods page*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-11.41.59-am-1836x944.png)
*I selected the 7/1/2024 row*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-11.42.42-am-1836x948.png)
*I clicked the Edit List button*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-11.43.18-am-1836x948.png)
*I selected the New Fiscal Year checkbox*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-11.45.09-am-1836x948.png)
*I clicked the Create Year.. button, specified 7/1/2024 as the Starting Date and clicked OK*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-11.46.37-am-1836x840.png)
*I deselected the New Fiscal Year on the 1/1/2025 row*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-11.48.05-am-1836x843.png)
*I used search to navigate to the Currencies page*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-11.48.31-am-1836x841.png)
*I clicked the + New button*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-11.52.43-am-1836x917.png)
*I added USD. I selected 40330 as the Realized Gains Account.*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-11.53.09-am-1836x922.png)
*I selected 40330 as the Realized Losses Account.*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-11.53.20-am-1836x919.png)
*I clicked the left arrow button*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-11.53.57-am-1836x821.png)
*I used search to navigate to the General Ledger Setup page*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-11.55.31-am-1836x917.png)
*I checked that the local currency code (LCY Code) was set to USD. I checked the Amount Rounding and Unit-Amount Decimal settings*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-11.56.49-am-1836x917.png)
*I clicked the Home | Change Global Dimensions button*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-11.57.00-am-1836x918.png)
*The Global Dimension 1 Code and Global Dimension 2 Code settings were not set*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-11.57.18-am-1836x916.png)
*I set the Global Dimension 1 Code to SALESPERSON_NEWLIST*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-11.57.37-am-1836x916.png)
*I set the Global Dimension 1 Code to CUSTOMERGROUP*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-11.58.12-am-1836x366.png)
*esp8266*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-11.58.21-am-1836x913.png)
*I clicked the Sequential | Start button*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-12.14.02-pm-1836x810.png)
*I used search to navigate to the General Ledger Setup page*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-12.15.13-pm-1836x810.png)
*I scrolled down to the Dimensions tab and wanted to set Shortcut Dimension 3 to Department (but the Department dimension was missing)*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-12.22.16-pm-1836x729.png)
*I used search to navigate to the Dimensions page*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-12.23.24-pm-1836x810.png)
*I used the + New button to add the DEPARTMENT dimension*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-12.23.37-pm-1836x806.png)
*I selected the DEPARTMENT dimension and clicked the Dimension | Dimension Values button*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-12.25.18-pm-1836x704.png)
*I added the Contoso departments*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-12.26.11-pm-1836x687.png)
*I used search to return to the General Ledger Setup page*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-12.26.35-pm-1836x806.png)
*I scrolled down to the Dimensions tab and updated the Shortcut Dimension 3 setting to DEPARTMENT*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-12.27.03-pm-1836x809.png)
*Shortcut Dimension 3 was updated*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-12.28.43-pm-1836x810.png)
*I scrolled up to the General tab. I updated the Allow Posting From setting*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-12.29.13-pm-1836x806.png)
*I updated the Allow Posting To setting.*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-12.30.24-pm-1836x809.png)
*I used search to navigate to the User Setup page*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-12.30.40-pm-1836x809.png)
*I selected my User ID*

![](/assets/images/hands-on-lab3.1/screen-shot-2023-12-04-at-12.37.45-pm-1836x812.png)
*I added an Allow Posting From value*
## References

- [Hands-on-Lab 3.1: Set up dimensions](https://microsoftlearning.github.io/MB-800-Business-Central-Functional-Consultant/Instructions/Labs/LAB%5BMB-800%5D_M03_Lab01_Set_up_Finance.html)