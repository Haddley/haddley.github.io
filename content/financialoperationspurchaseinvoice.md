---
title: "Financial Operations Purchase Invoice"
description: "Payment Journals"
date: "2023-08-20"
categories: ["Microsoft Dynamics","Business Central"]
tags: ""
slug: "financialoperationspurchaseinvoice"
image: "/assets/images/dynamics365-color.svg"
---



Businesses that purchase items from Vendors need to provide payment.

Businesses should take advantage of payment terms and discounts for prompt payment.

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-7.48.12-pm-1836x434.png)
*I noticed that there were 13 Outstanding Vendor Invoices in the CRONUS USA, Inc. company accounts*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-7.49.21-pm-1836x280.png)
*I created a payment for the $14,895 Nod Publishers Invoice*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-7.49.47-pm-1836x644.png)
*I selected Payment Type "Computer Check"*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-7.50.31-pm-1836x332.png)
*I noticed that the Check Printed value was false (unselected)*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-7.50.48-pm-1836x320.png)
*As a test I tried to Post the payment*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-7.51.00-pm-1836x426.png)
*I confirmed Yes*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-7.51.37-pm-1836x205.png)
*Business Central generated an error. I had specified Computer Check but I had not printed a Check.*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-7.51.53-pm-1836x320.png)
*I selected the Check|Print Check... menu item*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-7.52.41-pm-1836x645.png)
*I selected the "Send to..." link*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-7.52.54-pm-1836x644.png)
*I selected the PDF Document option*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-7.53.12-pm-1836x57.png)
*Check.pdf has been downloaded*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-7.53.24-pm-1836x643.png)
*Business Central generated a one page pdf document (ready for me to print)*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-7.53.43-pm-1836x318.png)
*I selected Preview Posting*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-7.53.58-pm-1836x300.png)
*There were going to be two General Ledger Entries addedThere was going to be a Vendor Ledger Entry addedThere was going to be a Bank Account Ledger Entry addedThere were going to be three Detailed Vendor Ledger Entries added*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-7.54.16-pm-1836x280.png)
*A Credit entry was going to be added to the Checking Account (The value of the Asset would reduce)*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-7.54.29-pm-1836x280.png)
*A Debit entry was going to be added to the Accounts Payable Account (The size of the Liability would reduce)Notice that the name of the Vendor was added as a Description*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-7.54.48-pm-1836x261.png)
*A Debit entry was going to be added to the Nod Publishers Account in the Vendor Ledger*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-7.55.11-pm-1836x236.png)
*A Credit entry was going to be added to the CHECKING Account in the Bank Account Ledger*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-7.55.45-pm-1836x240.png)
*Three entries were going to be added to the Detailed Vendor Ledger*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-7.59.55-pm-1836x325.png)
*I selected the Post|Post menu item*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.00.06-pm-1836x447.png)
*I selected the Yes option*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.00.17-pm-1836x442.png)
*The journal lines were successfully posted*


## Suggest Vendor Payments

I used the Suggest Vendor Payments menu item to suggest payment lines. In normal operations suggested payment lines would include payments that will qualify for payment discounts.

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.07.38-pm-1836x121.png)
*Payment Journals*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.07.55-pm-1836x268.png)
*I selected the CASH batch (as a starting point)*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.08.11-pm-1836x333.png)
*I clicked the Suggest Vendor Payments link*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.08.40-pm-1836x645.png)
*I clicked the "Show more" link*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.09.24-pm-1836x645.png)
*I selected Bal. Account Type: Bank Account, Bal. Account No.: CHECKING, and Bank Payment Type: Computer Check*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.09.36-pm-1836x499.png)
*I clicked the OK link*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.10.03-pm-1836x444.png)
*As a test I tried to click the Post|Post link*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.10.22-pm-1836x196.png)
*Again Business Central generated an error. I had specified Computer Check but I had not printed the Checks.*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.10.43-pm-1836x402.png)
*I clicked the Check|Print Check... link*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.11.09-pm-1836x642.png)
*I selected the Send to... link*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.11.21-pm-1836x643.png)
*I selected the PDF Document option*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.11.51-pm-1836x644.png)
*The result was a 5 page pdf file. Each page included the check details and the corresponding Vendor invoice details*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.12.06-pm-1836x433.png)
*I selected Preview Posting*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.12.20-pm-1836x642.png)
*There were going to be ten General Ledger Entries addedThere were going to be five Vendor Ledger Entries addedThere was going to be five Bank Account Ledger Entries addedThere were going to be twenty two Detailed Vendor Ledger Entries added*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.12.46-pm-1836x462.png)
*Five Credit entries were going to be added to the Checking Account (The value of the Asset would reduce)*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.12.56-pm-1836x425.png)
*Five Debit entries were going to be added to the Accounts Payable Account (The size of the Liability would reduce)Notice that in each instance the name of the Vendor was added as a Description*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.13.31-pm-1836x381.png)
*Five Debit entries were going to be added to the Vendor Ledger (one for each of the five Vendor Accounts)*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.13.43-pm-1836x341.png)
*Five Credit entries were going to be added to the CHECKING Account in the Bank Account Ledger*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.13.57-pm-1836x644.png)
*Twenty two entries were going to be added to the Detailed Vendor Ledger*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.14.11-pm-1836x645.png)
*I selected the Post|Post menu item*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.14.20-pm-1836x642.png)
*I selected the Yes option*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.14.32-pm-1836x642.png)
*The journal lines were successfully posted*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.15.15-pm-1836x266.png)
*The Outstanding Vendor Invoices count was reduced to 0*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.15.36-pm-1836x645.png)
*I reviewed the bank accounts list*

![](/assets/images/financialoperationspurchaseinvoice/screen-shot-2023-08-21-at-8.15.59-pm-1836x290.png)
*At least $49,421.55 will need to be deposited in the CHECKING bank account before the Vendors receive the physical checks.*