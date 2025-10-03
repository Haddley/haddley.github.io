---
title: "OpenAI"
description: "What are Custom GPTs?"
date: "2025-10-03"
categories: ["AI","Python"]
tags: []
slug: "customgpt"
image: "/assets/images/chatgpt-logo.svg"
---


In November 2023, OpenAI introduced "GPTs". These are custom versions of ChatGPT that you can create for a specific purpose without needing to code.

Purpose: They allow you to tailor ChatGPT for a specific task, such as learning the rules of a board game, teaching math, or providing creative design help. You can upload your own files (like documents or databases) to give the GPT specialized knowledge.

Availability: The ability to create a GPT is available to subscribers of ChatGPT Plus and higher-tier plans.

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.00.46 AM.png)
*Prebuilt GPTs*


![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.04.16 AM.png)
*Recommended plan*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.05.44 AM.png)
*I entered my credit card details*


![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.07.28 AM.png)
*I can cancel at any time*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.08.16 AM.png)
*I clicked the Not now button*



## How to Create A Research GPT

Here is how I built a custom GPT using the GPT Builder:


![](/assets/images/customgpt/Screenshot%202025-10-03%20at%209.51.06 AM.png)
*I selected the GPTs | Explore menu item. I clicked Create button*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.08.53 AM.png)
*I clicked the Configure tab*





## Crafting Effective Instructions

The "Instructions" in the "Configure" tab are vital for getting high-quality research. For your company research GPT, consider including directives like:

"Always structure your analysis to first cover the company's business model, then key financial indicators, recent strategic moves, and finally, potential risks."
"When presenting information, cite your sources where possible, especially when using web browsing."
"Ask me clarifying questions if you need more context to provide a more targeted analysis."
I hope this guide helps you create a powerful tool for your prospecting work. Remember that the quality of the GPT's output depends heavily on the clarity of your instructions and prompts.

If you have a specific industry or company size in mind, I can offer more tailored suggestions for your research prompts.



## Instructions

**Role:**
You are an expert B2B sales intelligence analyst specializing in SaaS and ERP solutions for medium-sized businesses. Your core function is to analyze company websites and provide detailed, actionable prospect research reports.

**Instruction:**
When provided with a company website URL, you must generate a comprehensive research report. The report should synthesize information to build a complete picture of the prospect and identify potential pain points your ERP can solve.

**Key Research Areas & Report Outline:**
Your report MUST be structured using the following sections:
1.  **Company Overview:** Summarize the company's primary business, industry, and core operations.
2.  **Business Model & Potential Pain Points:** Infer how the company likely operates and identify challenges a growing medium-sized business might face (e.g., disjointed systems, manual data entry, inventory management, inefficient financial reporting).
3.  **Stakeholder Mapping:** Suggest the most relevant job titles (e.g., CFO, COO, Head of Operations, IT Director) that would be involved in an ERP purchase decision:cite[3].
4.  **Personalized Outreach Angle:** Develop a "hook" for sales outreach. This could be based on a recent company achievement, an inferred operational challenge, or their stated mission:cite[6].
5.  **ERP Value Proposition:** Clearly articulate how a SaaS ERP system could address the identified pain points, focusing on benefits like operational efficiency, data-driven decision-making, and scalability.

**Guardrails (Rules of Engagement):**
- **Tone:** Always maintain a professional and analytical tone.
- **Sourcing:** Clearly state when information is inferred from the website's messaging versus being explicitly stated.
- **Honesty:** If there is insufficient information on the website to make a reasonable inference for a section, state this clearly rather than guessing.
- **Format:** Present the final report in a clear, well-structured format with distinct headings for each section.

**Specifics (Your Context):**
- **My Product:** I sell a Software-as-a-Service (SaaS) Enterprise Resource Planning (ERP) product.
- **My Target Market:** I sell to medium-sized companies, which I define as having approximately $2 million in turnover.
- **My Goal:** To quickly understand a prospect's business and pain points to initiate a relevant and valuable sales conversation.



![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.13.49 AM.png)
*I add the set of Instructions*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.18.34 AM.png)
*I entered a name and a description*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.19.17 AM.png)
*I selected the Anyone with the link sharing option*


![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.19.42 AM.png)
*I copied the link https://chatgpt.com/g/g-68def7e5ca1081919fc1558d8fb84e6b-saas-erp-prospect-analyst*

## Will I be charged when someone uses my custom GPT?

No, you will not be charged if someone else uses a custom GPT you created and shared via a link. The usage costs are covered by the subscription of the person using it, not the creator.

However, there is a key limitation you should be aware of: the person you share the link with must also be a ChatGPT Plus subscriber to use your custom GPT .

## What You Need to Know About Sharing Custom GPTs

The table below summarizes the key points about sharing and using custom GPTs:

| Aspect | Explanation |
| :--- | :--- |
| **Who Pays for Usage?** | The **user** accessing the GPT. The creator is not charged for others' use . |
| **Who Can Use a Shared GPT?** | Only users with an active **ChatGPT Plus** subscription . |
| **Key Limitation** | You cannot share your GPT with users on the free plan; they will be prompted to upgrade . |

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.23.40 AM.png)
*I used the link to navigate to the custom GPT*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.23.58 AM.png)
*I tested the custom GPT with a simple prompt: please provide a report for Sigma https://www.sigma-alimentos.com/en/*

You can add these directly to the "Conversation starters" field in the Configure tab of your GPT Builder.

1. Core Analysis & Reporting

"Analyze the company at [paste URL] and provide a full prospect report."

Why it's good: This is your "one-click" comprehensive analysis. It triggers the full research process you designed the GPT for.
"Summarize the business model and key operations for [Company Name]."

Why it's good: A quicker, more focused request for when you just need a high-level understanding before diving deeper.
2. Identifying Pain Points & Opportunities

"Based on their website, what are the top 3 potential operational pain points for [paste URL]?"

Why it's good: It forces the GPT to synthesize and prioritize, giving you direct ammunition for sales conversations.
"What signs of growth or scaling challenges can you infer from [paste URL]?"

Why it's good: This directly connects the prospect's situation to the core value of a scalable SaaS ERP.
3. Stakeholder Mapping & Outreach Strategy

"Who are the likely decision-makers for an ERP at [paste URL]? Map the stakeholders."

Why it's good: It focuses the GPT on the crucial "who" of the sales process, helping you tailor your outreach.
"Create a personalized outreach hook for [Company Name] based on their recent news/mission."

Why it's good: This generates actionable, personalized content for your first email or call, saving you time and increasing relevance.
4. Technical & Qualification Check

"What does the tech stack/careers page at [paste URL] suggest about their IT maturity?"

Why it's good: This is a more advanced starter that can help you gauge how easy or difficult an integration might be and what their technical priorities are.
💡 How to Add Them to Your GPT

Go to the GPT Builder and select your "SaaS ERP Prospect Analyst" GPT.
Click on the Configure tab.
Scroll down to the Conversation starters section.
Paste or type each of the starters you find most useful from the list above.
Click Save.

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.59.29 AM.png)
*I added a few Conversation starters*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%2010.00.04 AM.png)
*I used the link to access the custom GPT. I selected a conversation starter*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%2010.01.11 AM.png)
*I entered a prospect web site address (url)*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%2010.01.58 AM.png)
*I reviewed the report*

## Alternative Paths for Broader Sharing

If you need to share your custom GPT with users who do not have a ChatGPT Plus subscription, the current built-in sharing feature won't work. Community discussions point to a more technical solution :

Use the OpenAI API: You can rebuild your GPT's functionality as an AI Assistant using the OpenAI API. You would then host it on your own server or website and pay for usage through your API account, making it accessible to anyone .
This approach requires more technical effort and shifts the cost responsibility to you as the developer, but it removes the subscriber barrier for your audience.





























## References

- [Does publicly sharing a GPTs incur additional charges?](https://community.openai.com/t/does-publicly-sharing-a-gpts-incur-additional-charges/492150)
