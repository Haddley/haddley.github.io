---
title: "General Ledger"
description: "A comprehensive guide covering general ledger"
date: "2025-09-20"
category: "Development"
image: "/assets/images/dynamics365-color.svg"
tags: ["ai","business central","dynamics"]
---

# General Ledger

## General Ledger

![](/assets/images/generalledger/dynamics365-color.svg)
*By Microsoft, Public Domain*


## General Ledger

The General Ledger is fundamental to financial management and accounting within Microsoft Dynamics 365 Business Central.

Users update the General Ledger through the creation and posting of General Journal entries (or through the posting of documents using the document to journal to ledger pattern).

The General Ledger contains the balances of all accounts in the Chart of Accounts.

I created a Chart of Accounts from scratch and demonstrate how Journal entries can be used to record a Purchase transaction and a Sales transaction.

![](/assets/images/generalledger/screen-shot-2023-12-11-at-9.07.53-am-1279x735.png)
*I created a new company*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-9.08.10-am-1281x735.png)
*I added myself as a user*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-9.08.18-am-1279x733.png)
*I clicked the Finish button*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-9.28.24-am-1280x734.png)
*I navigated to the new company and clicked on the Chart of Accounts link*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-9.51.18-am-1283x297.png)
*I added an account (entity)*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-9.53.05-am-1277x735.png)
*I added a Balance Sheet Heading*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-9.53.23-am-1281x383.png)
*I clicked + New to add another entity*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-9.55.06-am-1279x733.png)
*I added an Assets Begin-Total*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-9.55.40-am-1281x364.png)
*I clicked + New to add another entity*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.01.34-am-1284x735.png)
*I added a Total Assets End-Total*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.01.56-am-1281x392.png)
*I clicked + New to add another entity*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.03.58-am-1281x736.png)
*I added a Liability Begin-Total*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.04.12-am-1281x363.png)
*I clicked + New to add another entity*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.05.55-am-1280x733.png)
*I added a Total Liabilities End-Total*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.06.16-am-1283x435.png)
*I clicked + New to add another entity*


## Purchase

When we purchase items we will need to record the value of the items (a new asset), the money we owe to the vendor (a new liability) and the sales tax that we will claim back from the authorities.

I created a Finished Goods asset account that I could post the purchase value to.
I created an Accounts Payable, Domestic account that I could post the vendor liability to.
I created a Taxes Liable account that I could post the sales tax amounts to.

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.10.32-am-1281x736.png)
*I created a Finished Goods asset account*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.11.48-am-1282x456.png)
*I clicked + New to add another entity*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.13.55-am-1280x736.png)
*I created a Goods for Resale account*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.14.12-am-1282x480.png)
*I clicked + New to add another entity*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.15.45-am-1279x734.png)
*I created an Accounts Payable, Domestic account*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.16.08-am-1281x513.png)
*I clicked + New to add another entity*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.18.31-am-1279x733.png)
*I created a Taxes Liable account*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.19.06-am-1281x544.png)
*I reviewed the updated Chart of Accounts*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.32.52-am-1282x735.png)
*I created a set of Journal entries to record the purchase of 10 black PARIS Guest Chairs (@ $250.30 each)*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.35.40-am-1281x455.png)
*I posted the Journal Lines*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.36.35-am-1282x733.png)
*I clicked Yes*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.37.00-am-1279x732.png)
*The lines were posted to the General Ledger*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.39.27-am-1283x510.png)
*I used search to navigate to the General Ledger Entries (Archive) page*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.38.36-am-1280x733.png)
*I reviewed the posted Journal entries*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.39.53-am-1281x371.png)
*I clicked on the Chart of Accounts link to navigate to the Chart of Accounts page*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-10.40.35-am-1280x735.png)
*I reviewed the updated Chart of Accounts balances (and totals)*


## Sale

When we sell items we will need to record the money our customer owes to us (a new asset), the revenue generated by the sale, the cost of the goods sold, and sales tax that we will be providing to the authorities

I created an Accounts Payable, Domestic account that I could post the vendor liability to.
I created a Resale of Goods account.
I created a Cost of Materials account.

![](/assets/images/generalledger/screen-shot-2023-12-11-at-11.11.20-am-1278x736.png)
*I created an Accounts Receivable, Domestic account*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-11.13.58-am-1282x735.png)
*I added an Income Statement Heading*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-11.24.41-am-1281x735.png)
*I added an Income Begin-Total*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-11.26.02-am-1281x737.png)
*I added an Total Income End-Total*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-11.27.49-am-1278x735.png)
*I added a Cost of Goods Sold Begin-Total*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-11.29.20-am-1279x738.png)
*I added a Total Cost of Goods Sold End-Total*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-11.30.52-am-1279x767.png)
*I reviewed the updated Chart of Accounts*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-11.31.59-am-1280x768.png)
*I added a Resale of Goods Income account*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-11.33.06-am-1279x767.png)
*I added a Cost of Materials account*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-11.34.42-am-1281x320.png)
*I used search to navigate to the General Journal page*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-11.52.35-am-1277x755.png)
*I created a set of Journal entries to record the sale of 10 black PARIS Guest Chairs (@ $300.00 each)*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-11.53.10-am-1281x756.png)
*I posted the Journal lines*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-11.54.45-am-1280x693.png)
*I used search to navigate to the General Ledger Entries (Archive)*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-11.55.26-am-1279x773.png)
*I reviewed the posted Journal Lines*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-11.56.40-am-1281x897.png)
*I reviewed the Chart of Account balances (and totals)*


## Revenue

Notice that after these two business transactions (one purchase and one sale):

The difference between Total Assets ($3,210) and Total Liabilities ($2,713) is **$497**; and
The difference between Total Income ($3,000) and Total Cost of Goods Sold ($2,503) is **$497**

![](/assets/images/generalledger/screen-shot-2023-12-11-at-12.16.16-pm-1282x897.png)
*I clicked the Indent Chart of Account button*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-12.16.31-pm-1280x897.png)
*I clicked the Yes button*

![](/assets/images/generalledger/screen-shot-2023-12-11-at-12.17.09-pm-1279x896.png)
*The accounts were indented*
