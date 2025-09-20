---
title: "Topics"
description: "A comprehensive guide covering topics"
date: "2025-09-20"
category: "Development"
image: "/assets/images/topics.png"
tags: ["business central"]
---

# Topics

Power Apps (Part 11) Copilot Studio Topic with a Connector This file is licensed under the Creative Commons Attribution 4.0 International license. Copilot Studio Topic with a Connector I created a Topic that used the Business Central Connector to retrieve the list of Companies created on my Production Business Server environment. There were three Companies in my PRODUCTION environment I created a new Copilot and asked it to provide a "list of companies" It replied "I'm sorry..." I created a new Topic|From blank I added the Phrases "list of companies" and "company list" I selected Call an action|Connector (preview) and selected the "List companies (V3)" action I clicked the Submit button The Connector action was added to the Topic I provided the Environment (String) PRODUCTION I Variable management|Set a variable value I set the variable name to Var1 and the value to GetCompaniesV3.value <<<<<< REPLACE WITH TEXT >>>>>>> I added Message to return the Var1 table to the user I created a second variable Var2. I set the value of Var2 to the list of Company DisplayNames separated by ", " I added Topic management|End current topic I entered "list of companies" into the Copilot. The Copilot returned the three company names.
