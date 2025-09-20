---
title: "Dynamics 365 Sales (Part 2)"
description: "A comprehensive guide covering dynamics 365 sales (part 2)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/dynamicssales2.png"
tags: ["ai","dynamics"]
---

# Dynamics 365 Sales (Part 2)

Microsoft Dynamics 365 Sales (Part 2) Updating the Lead to Opportunity Business Process Flow By Microsoft , Public Domain Updating the Lead to Opportunity Business Process Flow I used https://make.powerapps.com to customize the "Lead to Opportunity Sales Process" business process flow. I added the customizations to my Sales Customizations solution . I wanted to add the (existing) Opportunity table to my Sales Customizations solution I selected the Opportunity table and clicked the Next button I clicked Add to add the table I clicked the + New button to add a column to the existing Opportunity table I added Trial Start (Optional) I added Trial End (Optional) I wanted to add an existing Business Process Flow to my Sales Customizations solution I selected the "Lead to Opportunity Sales Process" business process flow and clicked the Add button I clicked the Edit button up edit the Business Process Flow I clicked the Add Stage button I updated the Display Name to "Trial" and clicked the Apply button I added a "Trial Start" Data Step I selected the Required option I clicked the Apply button I added a "Trial End" Data Step Again I selected the Required option and clicked the Apply button I clicked the Update button Validation was successful I opened an existing Lead and Clicked the Next Stage button to move from Qualify to Develop I created the (Lead) Opportunity I clicked the Next Stage button to move the Business Process Flow from Develop to Trial I clicked the Next Stage button again I entered Opportunity|Trail Start and Opportunity|Trial End values and clicked the Next Stage button The Business Process Flow moved to the Propose Stage References How to Customize Dynamics 365 Sales (CRM): Tutorial
