---
title: "Hands-on-Lab 2.2"
description: "Migrate master data to a new company"
date: "2023-11-22"
categories: ["Business Central"]
tags: "business-central, data-migration, master-data, hands-on-lab"
hidden: false
slug: "hands-on-lab2.2"
image: "/assets/images/hands-on-lab2.2/dynamics365-color.svg"
---



**Hands-on-Lab 2.2: Migrate master data to a new company**

"After completing the basic configuration, you can now start by uploading the company’s business data, such as customers, vendors, items and the chart of accounts.

In order to prepare the migration of this data, you will configure some configuration packages and provide these excel-files to Contoso’s super users, to complete the information.

You will start with the vendor list, including contact information. To make sure the users know how to complete the required information, you prepare the following example."

:::brain-power Before you read on
You have to get a list of vendors into a new company, and the people who know the vendors are not Business Central experts. What would you give them to fill in, and what would you need to check before you load it?
:::

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-22-at-12.37.32-pm-1543x473.png)
*I used the search button to navigate to the Configuration Packages page*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-22-at-12.37.49-pm-1541x810.png)
*I clicked the + New button*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-22-at-12.41.24-pm-1546x812.png)
*A dialog opened with a new Configuration Package*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-22-at-12.42.22-pm-1542x808.png)
*I entered a code, a name and clicked on the three dots button in the Table ID column*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-22-at-12.42.38-pm-1541x810.png)
*I selected the Vendor Table*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-22-at-12.42.49-pm-1544x809.png)
*I clicked on the Table tab*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-22-at-12.44.35-pm-1544x810.png)
*I clicked on the Fields button*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-22-at-12.44.51-pm-1543x809.png)
*I clicked the No button*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-22-at-12.45.23-pm-1543x808.png)
*I clicked the Clear included button*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-22-at-12.46.02-pm-1545x811.png)
*I noted that only the No. field was still selected*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-22-at-12.47.32-pm-1545x811.png)
*I clicked on the checkboxes to select the Name, Address, City, Phone No., Currency Code, Language Code, Country/Region Code and Post Code fields*

:::no-dumb-questions
**Q: What is a configuration package?**

A: A definition of which tables and fields to export to Excel and import back. I created one for the Vendor table, so that the people who know the vendors could fill in a workbook.

**Q: Why did I clear the included fields first?**

A: By default more fields are included than I wanted. I cleared them, noted that only No. was left, and then ticked just the fields that the lab asks for.
:::

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-22-at-12.48.16-pm-1543x808.png)
*I clicked the Export to Excel button*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-22-at-12.48.26-pm-1544x811.png)
*I clicked Yes*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-22-at-12.49.32-pm-1543x812.png)
*I opened the Configuration Package (the Excel Workbook)*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-24-at-3.07.41-pm-1836x827.png)
*I added the vendor details*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-23-at-12.25.53-pm-1536x803.png)
*I used the search button to access the Currencies page*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-23-at-12.26.05-pm-1536x804.png)
*I clicked the + New button*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-23-at-3.16.55-pm-1536x808.png)
*I added GBP details*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-23-at-3.19.38-pm-1536x803.png)
*I set the Realized Gains and Realized Losses accounts*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-23-at-3.19.53-pm-1536x804.png)
*I confirmed that the GBP Currency had been added*

:::pencil Why add the currency and region first?
Before importing the workbook, I added a GBP currency, with its realized gains and losses accounts, and a country or region for the Island of Sodor. Why would I do this before the import and not after?

:::answer
The vendor rows in the workbook refer to a currency code and a country or region. I expect the import to fail or report errors for rows that name values that do not exist yet, so I created them first. The package review at the end shows the number of errors.
:::
:::

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-23-at-3.21.17-pm-1536x808.png)
*I used the search button to access the Counties/Regions page*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-23-at-3.24.11-pm-1536x804.png)
*I added details for the (fictional) Island of Sodor*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-23-at-3.55.23-pm-1536x803.png)
*I used search to navigate back to the Configuration Packages page and selected the Import from Excel button*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-23-at-3.55.34-pm-1536x807.png)
*I selected the updated Excel Workbook*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-23-at-3.56.21-pm-1536x806.png)
*I clicked the Import button*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-23-at-3.56.58-pm-1536x806.png)
*I scrolled to the right to review the number of tables, rows and errors. I clicked the Apply Package button*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-23-at-3.57.11-pm-1536x807.png)
*A dialog confirmed that 9 records were inserted*

:::watch-it Review the errors before you apply the package
After the import, I scrolled right to look at the number of tables, rows and errors before I clicked Apply Package. Applying is what inserts the records, so look for errors first. In my run, 9 records were inserted.
:::

:::test-drive Try it yourself
1. Create a configuration package for the Vendor table with only a few fields.
2. Export it to Excel, add some vendors, and import the workbook.
3. Check the rows and errors, apply the package, and open the Vendors page.
:::

:::bullet-points Recap
- A configuration package exports chosen fields to Excel and imports them back.
- I added the currency and the country or region that the vendors needed before the import.
- The package showed rows and errors before I applied it, and 9 records were inserted.
:::

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-23-at-3.57.24-pm-1536x807.png)
*I clicked on the Vendors link to navigate to the Vendors page*

![](assets/images/hands-on-lab2.2/screen-shot-2023-11-23-at-3.57.38-pm-1536x804.png)
*I reviewed the inserted Vendor records*
## References

- [Hands-on-Lab 2.2: Migrate master data to a new company](https://microsoftlearning.github.io/MB-800-Business-Central-Functional-Consultant/Instructions/Labs/LAB%5BMB-800%5D_M02_Lab02_Migrate_Master_data.html)
