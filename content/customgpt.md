---
title: "OpenAI"
description: "What are Custom GPTs?"
date: "2025-10-03"
categories: ["AI"]
tags: ""
slug: "customgpt"
image: "/assets/images/customgpt/chatgpt-logo.svg"
---

In November 2023 OpenAI introduced "GPTs" - custom versions of ChatGPT that I could create for specific purposes without needing to code.

To get started, I needed a ChatGPT Plus subscription.

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.00.46 AM.png)
*I explored the prebuilt GPTs available*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.04.16 AM.png)
*I chose the recommended plan for Plus subscribers*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.05.44 AM.png)
*I entered my credit card details to upgrade*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.07.28 AM.png)
*I confirmed I can cancel at any time*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.08.16 AM.png)
*I clicked "Not now" to skip additional setup*

## How I Created My Research GPT

Here's how I built my custom GPT using the GPT Builder. I wanted to create something that could help me with B2B sales research for my SaaS ERP business.

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%209.51.06 AM.png)
*I selected the GPTs menu and clicked Create*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.08.53 AM.png)
*I clicked the Configure tab to start customizing*

## How I Crafted Effective Instructions

I spent a lot of time on the "Instructions" section in the Configure tab - this is crucial for getting high-quality results. For my company research GPT, I included directives like:

"Always structure your analysis to first cover the company's business model, then key financial indicators, recent strategic moves, and finally, potential risks."
"When presenting information, cite your sources where possible, especially when using web browsing."
"Ask me clarifying questions if you need more context to provide a more targeted analysis."

## My GPT Instructions

**Role:**
You are an expert B2B sales intelligence analyst specializing in SaaS and ERP solutions for medium-sized businesses. Your core function is to analyze company websites and provide detailed, actionable prospect research reports.

**Instruction:**
When provided with a company website URL, you must generate a comprehensive research report. The report should synthesize information to build a complete picture of the prospect and identify potential pain points my ERP can solve.

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

**Specifics (My Context):**
- **My Product:** I sell a Software-as-a-Service (SaaS) Enterprise Resource Planning (ERP) product.
- **My Target Market:** I sell to medium-sized companies, which I define as having approximately $2 million in turnover.
- **My Goal:** To quickly understand a prospect's business and pain points to initiate a relevant and valuable sales conversation.

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.13.49 AM.png)
*I added the detailed set of instructions*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.18.34 AM.png)
*I entered a name and description for my GPT*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.19.17 AM.png)
*I selected "Anyone with the link" for sharing*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.19.42 AM.png)
*I copied the shareable link: https://chatgpt.com/g/g-68def7e5ca1081919fc1558d8fb84e6b-saas-erp-prospect-analyst*

## Will I Be Charged When Someone Uses My Custom GPT?

I was curious about the costs. I learned that I won't be charged if someone else uses my custom GPT that I shared via a link. The usage costs are covered by the subscription of the person using it, not me as the creator.

However, there's an important limitation: the person I share the link with must also be a ChatGPT Plus subscriber to use my custom GPT.

## What I Learned About Sharing Custom GPTs

Here's what I discovered about sharing and using custom GPTs:

| Aspect | What I Found |
| :--- | :--- |
| **Who Pays for Usage?** | The **user** accessing the GPT. I'm not charged for others' use. |
| **Who Can Use a Shared GPT?** | Only users with an active **ChatGPT Plus** subscription. |
| **Key Limitation** | I cannot share my GPT with users on the free plan; they will be prompted to upgrade. |

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.23.40 AM.png)
*I used the link to navigate to my custom GPT*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.23.58 AM.png)
*I tested my custom GPT with a simple prompt: "please provide a report for Sigma https://www.sigma-alimentos.com/en/"*

## My GPTs Conversation Starters

I added these conversation starters to make my GPT easier to use. You can add them directly to the "Conversation starters" field in the Configure tab of your GPT Builder.

1. **Core Analysis & Reporting**

"Analyze the company at [paste URL] and provide a full prospect report."

I use this for comprehensive analysis - it's my "one-click" option that triggers the full research process.

"Summarize the business model and key operations for [Company Name]."

This gives me a quicker overview when I just need high-level understanding.

2. **Identifying Pain Points & Opportunities**

"Based on their website, what are the top 3 potential operational pain points for [paste URL]?"

This helps me get direct insights for sales conversations.

"What signs of growth or scaling challenges can you infer from [paste URL]?"

This connects the prospect's situation to the value of my scalable SaaS ERP.

3. **Stakeholder Mapping & Outreach Strategy**

"Who are the likely decision-makers for an ERP at [paste URL]? Map the stakeholders."

This focuses on the crucial "who" of the sales process.

"Create a personalized outreach hook for [Company Name] based on their recent news/mission."

This generates personalized content for my first outreach.

4. **Technical & Qualification Check**

"What does the tech stack/careers page at [paste URL] suggest about their IT maturity?"

This helps me gauge integration difficulty and technical priorities.

💡 **How I Added Them to My GPT**

I went to the GPT Builder and selected my "SaaS ERP Prospect Analyst" GPT.
I clicked on the Configure tab.
I scrolled down to the Conversation starters section.
I pasted the most useful starters from my list.
I clicked Save.

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%208.59.29 AM.png)
*I added a few conversation starters*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%2010.00.04 AM.png)
*I used the link to access my custom GPT and selected a conversation starter*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%2010.01.11 AM.png)
*I entered a prospect website address (URL)*

![](/assets/images/customgpt/Screenshot%202025-10-03%20at%2010.01.58 AM.png)
*I reviewed the generated report*

## Alternative Paths for Broader Sharing

If you need to share your custom GPT with users who don't have ChatGPT Plus, the built-in sharing won't work. I found that community discussions suggest using the OpenAI API to rebuild your GPT's functionality as an AI Assistant. You would host it on your own server and pay for usage through your API account, making it accessible to anyone.

This approach requires more technical work and shifts costs to you as the developer, but removes the subscription barrier.

## References

- [Does publicly sharing a GPTs incur additional charges?](https://community.openai.com/t/does-publicly-sharing-a-gpts-incur-additional-charges/492150)
