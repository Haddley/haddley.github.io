---
title: "Hands-on-Lab 2.3"
description: "Set up dimensions"
date: "2023-12-04"
categories: ["Business Central"]
tags: "business-central, dimensions, hands-on-lab, configuration"
hidden: false
slug: "hands-on-lab2.3"
image: "/assets/images/hands-on-lab2.3/dynamics365-color.svg"
---



**Hands-on-Lab 2.3: Set up dimensions**

"Contoso has expressed their requirements regarding reporting goals.
From the general ledger they would like to analyze their sales by sales person and customer group."

:::brain-power Before you read on
The company wants to analyze its sales by salesperson and by customer group. Where would those labels have to be recorded, and what would stop a user from forgetting them?
:::

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.19.31-am-1836x948.png)
*I used search to navigate to the Dimensions page*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.20.02-am-1836x543.png)
*I clicked the + New button*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.21.07-am-1836x650.png)
*I entered the code SALESPERSON_NEWLIST and clicked the Dimensions | Dimension Values button*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.23.26-am-1836x747.png)
*I added values AH, BD, etc.*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.29.08-am-1836x651.png)
*I added a dimension with code CUSTOMERGROUP*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.29.35-am-1836x566.png)
*I selected the CUSTOMERGROUP dimension and clicked the Dimension | Account Type Default Dim button*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.30.00-am-1836x472.png)
*I clicked the ... button in the Table ID column*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.30.21-am-1836x871.png)
*I selected the Customer table*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.38.10-am-1836x417.png)
*I selected Code Mandatory in the Value Posting column*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.39.27-am-1836x430.png)
*I selected the SALESPERSON_NEWLIST dimension and clicked the Dimension | Account Type Default Dim button*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.40.06-am-1836x607.png)
*I selected the Salesperson/Purchaser table*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.40.32-am-1836x485.png)
*I selected Code Mandatory in the Value Posting column*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.42.18-am-1836x641.png)
*I used search to navigate to the Dimension Combinations page*

:::no-dumb-questions
**Q: What is a dimension?**

A: A label that I attach to ledger entries so I can analyze them in more than one way. I created SALESPERSON_NEWLIST and CUSTOMERGROUP, so Contoso can report sales by salesperson and by customer group.

**Q: What does Code Mandatory do?**

A: I set it in the Value Posting column of the default dimension for the Customer table and for the Salesperson/Purchaser table. As I understand it, it means that a value must be entered whenever something is posted for those records.
:::

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.44.47-am-1836x950.png)
*I clicked on the _ button in the cell in the CUSTOMERGROUP row and the SALESPERSON_NEWLIST column*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.44.59-am-1836x948.png)
*I selected Limited and clicked OK*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.45.32-am-1836x948.png)
*I noted that a Limited link was now displayed in the cell in the CUSTOMERGROUP row and the SALESPERSON_NEWLIST column, and in the cell in the SALESPERSON_NEWLIST row and the CUSTOMERGROUP column*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.45.50-am-1836x947.png)
*I clicked the Limited link and clicked Yes*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.46.40-am-1836x948.png)
*At this point I realized that the CUSTOMERGROUP dimension had no values*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.55.55-am-1836x737.png)
*I added LARGE, MEDIUM and SMALL values to the CUSTOMERGROUP dimension*

:::pencil Why add values before blocking?
I set the SALESPERSON_NEWLIST and CUSTOMERGROUP combination to Limited, and then I noticed that CUSTOMERGROUP had no values. Why did I have to add LARGE, MEDIUM and SMALL before I could block combinations?

:::answer
A blocked combination pairs one dimension value with another, such as AH and MEDIUM. With no values in CUSTOMERGROUP, there was nothing to pair, so I added the values first and then returned to the Dimension Value Combinations page.
:::
:::

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.56.37-am-1836x947.png)
*I returned to the Dimension Value Combinations page*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-10.04.08-am-1836x945.png)
*I clicked the _ link in the cell in the row "AH" and column MEDIUM. I clicked the Blocked option and clicked OK*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-10.04.22-am-1836x948.png)
*I clicked the _ link in the cell in the row "AH" and column LARGE.*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-10.04.33-am-1836x950.png)
*I clicked the Blocked option and clicked OK*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-10.06.37-am-1836x949.png)
*I continued blocking combinations...*

![](assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-10.07.24-am-1836x950.png)
*...until the blocked Dimension Value Combinations were all added*

:::test-drive Try it yourself
1. Create two dimensions with values, and set their default dimension rules.
2. Set their combination to Limited, and block some value pairs.
3. Try to post with a blocked pair and see what Business Central says.
:::

:::bullet-points Recap
- Dimensions let me analyze ledger entries by salesperson and by customer group.
- Code Mandatory makes a dimension value required for a table.
- Setting a combination to Limited lets me block particular pairs of values.
- The values have to exist before they can be combined or blocked.
:::

## References

- [Hands-on-Lab 2.3: Set up dimensions](https://microsoftlearning.github.io/MB-800-Business-Central-Functional-Consultant/Instructions/Labs/LAB%5BMB-800%5D_M02_Lab03_Set_up_dimensions.html)
