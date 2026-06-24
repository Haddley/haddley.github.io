---
title: "HubSpot Quote Template"
description: "How I customised a HubSpot quote template by creating a child theme, cloning the line_items_table module, and adding custom line item columns with red-highlighted subheading rows."
date: "2025-09-20"
categories: ["Angular","TypeScript"]
image: "/assets/images/hubspotquotetemplate/hero.png"
tags: "hubspot, quote-template, crm"
hidden: false
slug: "hubspotquotetemplate"
---



I customised a HubSpot quote template to display a custom line items table with Item name, Start Date, Term, and Quantity columns instead of the default Products & Services layout. To do this I created a child theme from the cms-quotes-theme, cloned the line_items_table module and basic.html template into it, and edited the module CSS to highlight line item subheading rows in red. I then configured a new Basic Updated quote template that uses the customised child theme and verified the output against a real deal.

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-8.37.21am-2136x988.png)
*I clicked on the Settings button (the gear icon)*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-8.38.01am-2136x990.png)
*I selected the Data Management|Objects|Quotes menu item*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-8.38.16am-2136x702.png)
*I clicked the Quote template tab*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-8.39.15am-2136x770.png)
*I clicked the Customize quote template button*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-8.39.55am-2136x587.png)
*I selected the CMS Quotes Theme | Basic | Choose button*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-8.40.24am-2136x232.png)
*I clicked the pencil button*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-8.40.53am-2136x148.png)
*I updated the template name to Basic Updated and clicked the Save button*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-8.41.17am-2136x825.png)
*The Basic Updated quote template was added to the quote template list*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-8.41.25am-2136x820.png)
*I clicked the Actions | Edit list item*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-8.42.22am-2136x1104.png)
*I selected the Line items table menu item*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-8.43.32am-2136x937.png)
*I updated the Line item columns*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-8.44.27am-2136x838.png)
*I added an Item column*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-8.45.32am-2136x830.png)
*The Item column was added as the last item in the column list*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-8.45.45am-2136x921.png)
*I used drag and drop to move Item column to the top of the column list*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-1.22.56pm-2136x859.png)
*I added the Start Date and Term columns and removed the Products & Services and Price columns*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-8.49.45am-2136x1024.png)
*I selected the Commerce | Quotes menu item*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-8.50.02am-2136x362.png)
*I clicked the Create Quote button*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-8.50.38am-2136x881.png)
*I selected a deal and clicked next until I was able to select the new Quote template*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-1.29.00pm-2136x358.png)
*Notice that the Item, Start Date, Term and Quantity columns are displayed*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-1.54.39pm-2136x1107.png)
*I clicked the Edit CMS template button*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-3.53.52pm-2136x1026.png)
*I navigated to the line_items_table module in the cms-quotes-theme and clicked the Create child theme button.*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-3.55.40pm-1558x1110.png)
*I named the child theme "cms-quotes-theme updated" and clicked Create child theme*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-3.56.16pm-1262x1244.png)
*I expanded Advanced options and reviewed the CSS and JS file names*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-3.56.54pm-1406x1042.png)
*The child theme was created successfully*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-3.57.37pm-2136x1020.png)
*I reviewed the base.html template in the child theme*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-3.59.53pm-2136x1022.png)
*I right-clicked the line_items_table module and selected Clone to child theme*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-4.00.17pm-1368x612.png)
*I selected cms-quotes-theme updated and clicked Okay*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-5.12.44pm-1584x984.png)
*I reviewed the cloned line_items_table module's HTML, CSS, and JS files*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-5.17.52pm-2136x796.png)
*I opened the line_items_table module in the cms-quotes-theme updated child theme*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-6.32.10pm-1491x770.png)
*I previewed the line_items_table module — no Line item columns were configured yet*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-5.17.03pm-2136x1275.png)
*I previewed the updated line_items_table showing the Item name, Start Date, Term and Quantity columns*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-6.51.42pm-2136x1122.png)
*I reviewed the Quotes Setup page in HubSpot settings*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-6.52.32pm-2136x1123.png)
*I reviewed the Quote templates tab showing the default and customised templates*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.05.55pm-2136x1209.png)
*I selected a quote template to customise*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.06.33pm-2136x1207.png)
*I reviewed the Modern quote template Content tab*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.07.23pm-2136x1206.png)
*I reviewed the Modern quote template Settings tab*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.08.01pm-2136x490.png)
*I opened the modern.html template in the CMS Design Manager*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.08.44pm-1578x1320.png)
*I entered the child theme name "cms-quotes-theme updated" with CSS and JS file names set to "child updated"*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.09.15pm-1262x1060.png)
*The child theme was created successfully*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.10.10pm-2136x767.png)
*I reviewed the theme.json file in the cms-quotes-theme updated child theme*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.11.20pm-2136x1053.png)
*I right-clicked the line_items_table module in the cms-quotes-theme and selected Clone to child theme*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.11.46pm-1282x604.png)
*I selected cms-quotes-theme updated and clicked Okay*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.13.17pm-2136x735.png)
*I edited the line_items_table module HTML in the cms-quotes-theme updated child theme*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.13.56pm-2136x867.png)
*I previewed the line_items_table module — the table showed no Line item columns yet*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.15.32pm-2136x1088.png)
*I previewed the line_items_table module with the Item name, Start Date, Term, and Quantity columns configured*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.16.32pm-2136x1274.png)
*I clicked Choose on the Basic template from the cms-quotes-theme updated child theme*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.17.06pm-2136x241.png)
*I opened the Basic quote template editor*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.17.29pm-2136x406.png)
*I renamed the template to Basic Updated*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.18.42pm-2136x1088.png)
*I reviewed the Line items table in the Basic Updated template showing the default Products & Services, Quantity, and Price columns*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.19.22pm-2136x923.png)
*I configured the line items table with Item name, Start Date, Term, and Quantity columns*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.20.30pm-1472x636.png)
*I added an Item name column and confirmed it appeared in the table preview*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.21.59pm-2136x912.png)
*I reviewed the Quote templates tab in HubSpot settings*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.22.28pm-1471x82.png)
*I navigated to the Quotes page and clicked Create quote*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.23.19pm-2136x790.png)
*I selected the Basic Updated template from the Quote template dropdown*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.23.57pm-1464x334.png)
*I reviewed the quote at the Review step — the Custom Line Items Table showed the Item name, Start Date, Term, and Quantity columns*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.25.40pm-2136x892.png)
*I added CSS classes to the line_items_table module to highlight subheading rows with a red background colour*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.26.57pm-2136x968.png)
*I reviewed the quote and confirmed the Production and BAU subheading rows were highlighted in red*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.30.10pm-2136x1080.png)
*I added a Quantity & Total column to the line items table in the Basic Updated template*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.31.14pm-2136x992.png)
*I reviewed the final line items table configuration with Item name, Start Date, Term, and Quantity columns*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-14-at-7.59.38pm-2136x1014.png)
*I reviewed the quote showing the custom line items table with real deal data and the Payment Schedule*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-15-at-10.59.10am-2136x990.png)
*I right-clicked the basic.html template in the cms-quotes-theme and selected Clone to child theme*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-15-at-10.59.58am-1268x568.png)
*I selected cms-quotes-theme updated and clicked Okay*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-15-at-11.01.41am-2136x990.png)
*I reviewed the cloned basic.html template in the cms-quotes-theme updated child theme*

![](assets/images/hubspotquotetemplate/screenshot-2024-10-15-at-11.04.29am-2136x1147.png)
*I reviewed the final quote showing the customised line items table with Development, Production, and BAU line item groups highlighted in red*

---

*Hero image uses the [HubSpot logo](https://commons.wikimedia.org/wiki/File:HubSpot_Logo.svg) from Wikimedia Commons, which is in the public domain as a simple text logo.*
