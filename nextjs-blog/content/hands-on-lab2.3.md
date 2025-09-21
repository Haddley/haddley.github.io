---
title: "Hands-on-Lab 2.3"
description: "A comprehensive guide covering hands-on-lab 2.3"
date: "2025-09-20"
category: "Development"
image: "/assets/images/hands-on-lab2.3/hero.png"
tags: ["ai","dynamics"]
---

# Hands-on-Lab 2.3

## Hands-on-Lab 2.3

![](/assets/images/hands-on-lab2.3/dynamics365-color.svg)
*By Microsoft, Public Domain*


## Set up dimensions

**Hands-on-Lab 2.3: Set up dimensions**

"Contoso has expressed their requirements regarding reporting goals.
From the general ledger they would like to analyze their sales by sales person and customer group."

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.19.31-am-1836x948.png)
*I used search to navigate to the Dimensions page*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.20.02-am-1836x543.png)
*I clicked the + New button*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.21.07-am-1836x650.png)
*I entered the code SALESPERSON_NEWLIST and clicked the Dimensions | Dimension Values button*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.23.26-am-1836x747.png)
*I added values AH, BD, etc.*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.29.08-am-1836x651.png)
*I added a dimension with code CUSTOMERGROUP*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.29.35-am-1836x566.png)
*I selected the CUSTOMERGROUP dimension and clicked the Dimension | Account Type Default Dim button*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.30.00-am-1836x472.png)
*I clicked the ... button in the Table ID column*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.30.21-am-1836x871.png)
*I selected the Customer table*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.38.10-am-1836x417.png)
*I selected Code Mandatory in the Value Posting column*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.39.27-am-1836x430.png)
*I selected the SALESPERSON_NEWLIST dimension and clicked the Dimension | Account Type Default Dim button*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.40.06-am-1836x607.png)
*I selected the Salesperson/Purchaser table*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.40.32-am-1836x485.png)
*I selected Code Mandatory in the Value Posting column*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.42.18-am-1836x641.png)
*I used search to navigate to the Dimension Combinations page*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.44.47-am-1836x950.png)
*I clicked on the _ button in the cell in the CUSTOMERGROUP row and the SALESPERSON_NEWLIST column*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.44.59-am-1836x948.png)
*I selected Limited and clicked OK*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.45.32-am-1836x948.png)
*A Limited link is now displayed in the in the cell in the CUSTOMERGROUP row and the SALESPERSON_NEWLIST column and in the cell in the SALESPERSON_NEWLIST row and the CUSTOMERGROUP column*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.45.50-am-1836x947.png)
*I clicked the Limited link and clicked Yes*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.46.40-am-1836x948.png)
*At this point I realized that the CUSTOMERGROUP dimension had no values*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.55.55-am-1836x737.png)
*I added LARGE, MEDIUM and SMALL values to the CUSTOMERGROUP dimension*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-9.56.37-am-1836x947.png)
*I returned to the Dimension Value Combinations page*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-10.04.08-am-1836x945.png)
*I clicked the _ link in the cell in the row "AH" and column MEDIUM. I clicked the Blocked option and clicked OK*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-10.04.22-am-1836x948.png)
*I clicked the _ link in the cell in the row "AH" and column LARGE.*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-10.04.33-am-1836x950.png)
*I clicked the Blocked option and clicked OK*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-10.06.37-am-1836x949.png)
*I continued blocking combinations...*

![](/assets/images/hands-on-lab2.3/screen-shot-2023-12-04-at-10.07.24-am-1836x950.png)
*...until the blocked Dimension Value Combinations were all added*
## References

- [Hands-on-Lab 2.3: Set up dimensions](https://microsoftlearning.github.io/MB-800-Business-Central-Functional-Consultant/Instructions/Labs/LAB%5BMB-800%5D_M02_Lab03_Set_up_dimensions.html)

