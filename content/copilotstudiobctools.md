---
title: "Copilot Studio Agent Tools"
description: "Connected to Business Central"
date: "2025-09-24"
categories: ["Microsoft Dynamics","Business Central","Power Platform","AI"]
tags: "copilot-studio, business-central, agent-tools, ai-integration"
slug: "copilotstudiobctools"
image: "/assets/images/copilotstudiobctools/posts-meta.svg"
hidden: false
---



I created a Copilot Studio Agent that connected to Business Central using a Copilot Studio Tool.

:::brain-power Before you read on
You ask an agent "Who do we buy stuff from?" How would it know that this question is about vendors in Business Central, and what would it have to be able to do to answer?
:::

![](assets/images/copilotstudiobctools/screenshot-2025-09-24-at-4.55.54-pm.png)
*I created a new agent*

![](assets/images/copilotstudiobctools/screenshot-2025-09-24-at-4.56.34-pm.png)
*I named the agent "Business Central Tools Agent"*

![](assets/images/copilotstudiobctools/screenshot-2025-09-24-at-4.56.56-pm.png)
*I created a New Agent*

![](assets/images/copilotstudiobctools/screenshot-2025-09-24-at-4.57.38-pm.png)
*I clicked the Create button*

![](assets/images/copilotstudiobctools/screenshot-2025-09-24-at-5.17.33-pm.png)
*I clicked the Tools menu item*

![](assets/images/copilotstudiobctools/screenshot-2025-09-24-at-5.17.47-pm.png)
*I clicked the Add a tool button*

![](assets/images/copilotstudiobctools/screenshot-2025-09-24-at-5.18.14-pm.png)
*I searched for Business Central actions*

![](assets/images/copilotstudiobctools/screenshot-2025-09-24-at-5.18.34-pm.png)
*I selected the Find records (V3) action and clicked the Add and configure button*

![](assets/images/copilotstudiobctools/screenshot-2025-09-24-at-5.21.23-pm.png)
*I updated the tool name to "Find Vendor records (V3)". I updated the default description*

![](assets/images/copilotstudiobctools/screenshot-2025-09-24-at-6.19.08-pm.png)
*I specified the Environment, Company, API category and Table name (vendors)*

:::no-dumb-questions
**Q: What is a tool in Copilot Studio?**

A: An action that the agent can choose to call. I added two from the Business Central connector: Find records (V3), which I renamed Find Vendor records (V3), and Create record (V2), which I renamed Create Vendor record (V2).

**Q: Why did the tool names and descriptions matter?**

A: The agent decides which tool to use from its name and description, so I changed the defaults to say that they deal with vendors. When I asked "Who do we buy stuff from?", the agent used the find tool.
:::

![](assets/images/copilotstudiobctools/screenshot-2025-09-24-at-6.22.19-pm.png)
*I clicked Save and tested the tool "Who do we buy stuff from?". I clicked the Allow button*

![](assets/images/copilotstudiobctools/screenshot-2025-09-24-at-6.27.25-pm.png)
*The Business Central company had a single "Example Vendor"*

![](assets/images/copilotstudiobctools/screenshot-2025-09-24-at-6.26.05-pm.png)
*The Agent returned details of the Vendor*


![](assets/images/copilotstudiobctools/screenshot-2025-09-26-at-10.43.51-am.png)
*I added a second tool based on the Create record (V2) action*

![](assets/images/copilotstudiobctools/screenshot-2025-09-26-at-10.44.04-am.png)
*I clicked the Add and configure button*

![](assets/images/copilotstudiobctools/screenshot-2025-09-26-at-10.44.39-am.png)
*I updated the tool's name to 'Create Vendor record (V2)'*

![](assets/images/copilotstudiobctools/screenshot-2025-09-26-at-10.46.17-am.png)
*I selected the Environment, Company, API category and table name. I clicked the Add input button and selected displayName*

![](assets/images/copilotstudiobctools/screenshot-2025-09-26-at-10.51.14-am.png)
*I tried to use the new tool*

![](assets/images/copilotstudiobctools/screenshot-2025-09-26-at-10.51.44-am.png)
*An error message was returned*

![](assets/images/copilotstudiobctools/screenshot-2025-09-26-at-10.53.32-am.png)
*I added a number input*

:::watch-it The create tool failed until I gave it the missing input
My first attempt to use the Create Vendor record tool returned an error, and it worked once I added a number input as well as displayName. A tool that creates a record has to supply every field that the table requires, so read the error and check the inputs that the tool collects.
:::

![](assets/images/copilotstudiobctools/screenshot-2025-09-26-at-10.53.47-am.png)
*The new Vendor record was created*

![](assets/images/copilotstudiobctools/screenshot-2025-09-26-at-10.54.19-am.png)
*The new vendor was visible in Business Central*

:::pencil Which tool answers which question?
The agent has Find Vendor records (V3) and Create Vendor record (V2). Which tool should handle "Who do we buy stuff from?", and which should handle "Add a vendor called Contoso"? What would you check before you let the agent create records for real?

:::answer
The find tool answers the first question, and the create tool handles the second. Before I let an agent create records, I would use a sandbox company and check which inputs the tool collects, because the agent changes real data when it uses that tool.
:::
:::

:::test-drive Try it yourself
1. Add Find records (V3) as a tool, and ask the agent a question that the table answers.
2. Add Create record (V2) with the inputs that the table needs.
3. Ask the agent to add a record, and check Business Central for it.
:::

:::bullet-points Recap
- A Copilot Studio agent can use Business Central connector actions as tools.
- The tool's name and description help the agent to choose it.
- Find records answered a question about vendors, and Create record added one.
- A create tool must collect every required input, or it returns an error.
:::



## References

- [Copilot Studio in Action Create Records Anywhere, Effortlessly!](https://www.youtube.com/watch?v=oeTjP_AVqQ8)