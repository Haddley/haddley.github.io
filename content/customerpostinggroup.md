---
title: "Customer Posting Group"
description: "Which accounts receivable account?"
date: "2023-12-14"
categories: ["Microsoft Dynamics","Business Central"]
tags: "customer-posting-group, accounts-receivable, general-ledger, business-central"
hidden: false
slug: "customerpostinggroup"
image: "/assets/images/customerpostinggroup/posts-meta.svg"
---



A Customer Posting Group is used to define which accounts receivable general ledger account to use when selling goods to a Customer.

Customer Posting Groups are maintained using the Customer Posting Groups page.

:::brain-power Before you read on
When a company sells to a customer, the amount owed has to land in a particular account in the books. Who or what should decide which account, and where would you want that choice stored?
:::

![](assets/images/customerpostinggroup/screenshot-2023-12-14-at-8.30.52-am-1836x800.png)
*I used search to navigate to the Customer page. I used + New to create a new Customer*

![](assets/images/customerpostinggroup/screenshot-2023-12-14-at-8.34.14-am-1836x801.png)
*I entered Customer details*

![](assets/images/customerpostinggroup/screenshot-2023-12-14-at-8.36.16-am-1836x805.png)
*I reviewed the Invoicing tab for the new Customer*

![](assets/images/customerpostinggroup/screenshot-2023-12-14-at-8.37.28-am-1836x808.png)
*I clicked the + New link*

![](assets/images/customerpostinggroup/screenshot-2023-12-14-at-8.40.51-am-1836x814.png)
*I added code DOMESTIC and set Receivables Account to 15110 (Account Receivable, Domestic)*

![](assets/images/customerpostinggroup/screenshot-2023-12-14-at-8.43.39-am-1836x806.png)
*I set the Customer Posting Group to DOMESTIC*

:::no-dumb-questions
**Q: What is a Customer Posting Group?**

A: A setting that says which accounts receivable general ledger account to use when I sell to a customer. I created one called DOMESTIC, with 15110 (Account Receivable, Domestic) as its Receivables Account, and assigned it to the new customer.

**Q: Why use Preview Posting?**

A: It shows what a posting would create without actually posting it. I could check the entries first, and I did not leave extra entries in the books.
:::

![](assets/images/customerpostinggroup/screenshot-2023-12-14-at-8.46.28-am-1836x808.png)
*I used search to navigate to the General Journal page*

![](assets/images/customerpostinggroup/screenshot-2023-12-14-at-8.57.33-am-1836x1021.png)
*I selected Customer Alpine Ski House*

![](assets/images/customerpostinggroup/screen-shot-2023-12-12-at-12.05.28-pm-1536x426.png)
*I clicked the Preview Posting button*

![](assets/images/customerpostinggroup/screenshot-2023-12-14-at-9.00.43-am-1836x590.png)
*The preview showed 8 General Ledger entries, 1 Customer Ledger entry and 1 Detailed Customer Ledger entry*

![](assets/images/customerpostinggroup/screenshot-2023-12-14-at-9.01.37-am-1836x1018.png)
*The first general ledger entry relates to General Ledger account 15110 Accounts Receivable, Domestic (per the DOMESTIC Customer Posting Group).*

:::pencil Which account is debited?
The customer has the DOMESTIC Customer Posting Group, and its Receivables Account is 15110. Before you look at the preview again, which general ledger account would you expect the receivable entry to use?

:::answer
Account 15110, Accounts Receivable, Domestic. The preview showed 8 general ledger entries, 1 customer ledger entry and 1 detailed customer ledger entry, and the first general ledger entry was on 15110, because the customer's posting group says so.
:::
:::

:::test-drive Try it yourself
1. Create a Customer Posting Group with a receivables account of your own.
2. Assign it to a new customer.
3. Open the General Journal, choose the customer, and use Preview Posting.
4. Check that the receivable entry uses your account.
:::

:::bullet-points Recap
- A Customer Posting Group decides which accounts receivable account a customer's sales use.
- I created DOMESTIC with account 15110 and assigned it to a new customer.
- Preview Posting showed the ledger entries without posting them.
:::
