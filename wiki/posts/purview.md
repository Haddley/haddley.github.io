---
type: post
slug: purview
title: "Microsoft Purview"
date: "2022-08-03"
builds_on: []
topics: [data-lifecycle-management, microsoft-purview, retention-policies, adaptive-scope]
tools: [Microsoft Purview, SharePoint]
status: current
checked: "2026-11-06"
source_hash: "83cd56038378"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to implement a retention policy using adaptive scope in Microsoft Purview. I show how to configure specific data lifecycle rules for SharePoint sites.

## What I did
- I configured a SharePoint site with specific owners and members.
- I uploaded a test document to the library.
- I created an adaptive scope and a retention policy in Microsoft Purview.
- I verified the deletion of the document after the retention period.

## Claims
- I used the Microsoft Purview portal to manage data lifecycle settings.
  > "*I navigated to the Microsoft Purview home page."
- I chose the SharePoint sites option when creating the scope.
  > "*I selected the SharePoint sites radio button option*"
- I defined the specific property for the adaptive scope.
  > "*I entered an adaptive scope property.*"
- I set the policy to delete items one day after the last update.
  > "*I configured the retention policy to delete items one day after they were last updated*"

## Outcome
I built a retention policy that automatically deletes documents based on an adaptive scope. I confirmed the policy works by checking the site after one week.

## Caveats
The post does not detail the specific internal logic of the adaptive property calculation.
