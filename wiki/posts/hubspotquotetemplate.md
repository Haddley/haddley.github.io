---
type: post
slug: hubspotquotetemplate
title: "Customising a HubSpot Quote Template with a Child Theme"
date: "2025-09-20"
builds_on: []
topics: [hubspot-quotes, child-themes, custom-css, module-cloning]
tools: [HubSpot, CMS Design Manager]
status: current
checked: "2026-11-05"
source_hash: "e2ba625e335b"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to customize a HubSpot quote template by creating a child theme and cloning specific modules. This process allows for the addition of custom line item columns and the application of custom CSS to highlight specific rows.

## What I did
- I created a child theme from the cms-quotes-theme to isolate my customizations.
- I cloned the line_items_table module and the basic.html template into the new child theme.
- I configured a new quote template to use the custom child theme and specific columns.
- I added CSS classes to highlight subheading rows in red.

## Claims
- I replaced the default Products and Services layout with a custom table.
  > "I customised a HubSpot quote template to display a custom line items table with Item name, Start Date, Term, and Quantity columns instead of the default Products & Services layout."
- I created a child theme to manage the custom modules.
  > "*I navigated to the line_items_table module in the cms-quotes-theme and clicked the Create child theme button.*"
- I added the Start Date and Term columns while removing the Price column.
  > "*I added the Start Date and Term columns and removed the Products & Services and Price columns*"
- I applied CSS to highlight the subheading rows in red.
  > "*I added CSS classes to the line_items_table module to highlight subheading rows with a red background colour*"
- I verified the final quote showed the correct data and highlighted rows.
  > "*I reviewed the final quote showing the customised line items table with Development, Production, and BAU line item groups highlighted in red*"

## Outcome
I built a customized quote template that displays a custom line items table with specific columns and red-highlighted subheading rows.

## Caveats
The post does not detail the specific CSS code used to create the red background.
