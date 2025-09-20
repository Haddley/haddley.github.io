---
title: "Microsoft Purview"
description: "A comprehensive guide covering microsoft purview"
date: "2025-09-20"
category: "Development"
image: "/assets/images/purview.png"
tags: ["ai"]
---

# Microsoft Purview

Microsoft Purview Manage compliance across Microsoft 365 This file is licensed under the Creative Commons Attribution 4.0 International license. Retention policy with adaptive scope I used Microsoft Purview to create a retention policy that applies to all SharePoint sites named "Short term...". First I created a new SharePoint Site (Site Collection) called "Short term". I selected the "Team Site" template I named the Site "Short term" I specified myself as the Site (Group) owner I added Lidia Holloway as a SharePoint Site member I selected the finish button I added a new word document to the Documents Document Library in the Short term SharePoint Site I entered some example text The Document.docx document was saved to the Documents Document Library (on July 27th 2022) Data lifecycle management I selected the data lifecycle management menu item, created the adaptive scope and then created the retention policy I navigated to the Microsoft Purview home page. I selected the Data lifecycle management menu item. I selected the Adaptive scopes menu item I clicked the + Create scope button I named the adaptive scope "Short term" I selected the SharePoint sites radio button option I entered an adaptive scope property. I reviewed the adaptive scope details The adaptive scope was created I created a new retention policy I named the retention policy "Delete after a day" I selected the Adaptive radio button option I selected the "Short term" adaptive scope I created eariler I reviewed the configuration and clicked the next button I configured the retention policy to delete items one day after they were last updated I reviewed the configuration and read the warning that "Items that are currently older than 1 days [sic] will be permanently deleted after you turn on this policy" The retention policy was successfully created Initially the policy had no effect on contents of the "Documents" Document Library in the "Short term" SharePoint Site. I returned to the SharePoint Site a week later... Document.docx has been deleted Document.docx was moved to the SharePoint Recycle bin (on August 1st 2022).
