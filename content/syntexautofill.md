---
title: "SharePoint Syntex "
description: "Autofill columns"
date: "2025-07-30"
categories: ["Microsoft 365","AI","Angular","TypeScript"]
tags: ""
slug: "syntexautofill"
image: "/assets/images/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png"
---



Syntex Autofill is an AI feature in SharePoint that automatically extracts or generates metadata from documents using natural language prompts, populating SharePoint columns without manual entry. Syntex Autofill transforms unstructured content into structured data.

I added a **Smoke?** Autofill column to a Document Library. The objective was to automatically label [patient medical reports](langchain.html).

![](/assets/images/syntexautofill/screenshot202025-07-3020at203.26.13e280afpm-2136x1125.png)
*I uploaded a patient medical report to a SharePoint Document Library. I clicked the + Add column button. I added a Smoke? column. I enabled the Autofill feature for this column. I added the Does the patient smoke? prompt.*

![](/assets/images/syntexautofill/screenshot202025-07-3020at203.26.51e280afpm-2136x1125.png)
*I clicked the Save button*

![](/assets/images/syntexautofill/screenshot202025-07-3020at203.27.14e280afpm-2136x1125.png)
*I started the Autofill processing*

![](/assets/images/syntexautofill/screenshot202025-07-3020at203.27.29e280afpm-2136x1123.png)
*I was told that my files were being processed*

![](/assets/images/syntexautofill/screenshot202025-07-3020at203.27.57e280afpm-2136x1112.png)
*I clicked the View autofill activity button*

![](/assets/images/syntexautofill/screenshot202025-07-3020at203.31.02e280afpm-2136x491.png)
*I uploaded 5 more medical report documents*

![](/assets/images/syntexautofill/screenshot202025-07-3020at203.31.30e280afpm-2136x1130.png)
*By default the Smoke? column was set to true*

![](/assets/images/syntexautofill/screenshot202025-07-3020at203.33.01e280afpm-2136x1122.png)
*After a few minutes the autofill process completed. The Smoke? column value had been updated.*

![](/assets/images/syntexautofill/screenshot202025-07-3020at203.34.09e280afpm-2136x952.png)
*Reviewing the hp2 document confirmed that the Smoke? column value had been set correctly.*