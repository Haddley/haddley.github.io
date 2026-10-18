---
title: "Adding a Custom Topic to the Copilot in a Model-Driven App"
description: "The Copilot panel in a model-driven app is a Copilot Studio agent. I tested what it can and cannot do, then added a custom topic to fill one of the gaps."
date: "2026-06-01"
categories: ["Power Platform","AI"]
tags: "power-apps, dataverse, model-driven-app, copilot-studio, custom-topics"
slug: "powerapps9"
image: "/assets/images/powerapps9/posts-meta.svg"
hidden: false
---

Model-driven Power Apps include a built-in Copilot panel that lets users ask natural-language questions about their Dataverse data. What is less obvious is that the Copilot is actually a Copilot Studio agent running behind the scenes — which means you can open it in Copilot Studio and extend it with [custom topics](/posts/topics/). In this post I built a simple Contacts app to explore what the default Copilot can and cannot do, then added a custom topic to fill one of the gaps. I tested this in June 2026, and Copilot features change quickly, so your screens may look different.

I started by creating a new solution called "Contacts" to keep everything organised.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.08.27-PM.png)
*I created a new solution called Contacts*

Inside the solution I went to New > App > Model-driven app.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.08.55-PM.png)
*I selected Model-driven app from the New menu*

I named the app "Contacts" and clicked Create.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.09.10-PM.png)
*I named the model-driven app Contacts*

I clicked Add page and chose Dataverse table to pull in the Contact table.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.10.04-PM.png)
*I chose Dataverse table from the Add page options*

I searched for "contact" and selected the Contact table.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.10.27-PM.png)
*I selected the Contact table from the Dataverse table picker*

The editor showed a live preview of the app with the standard Dynamics 365 navigation.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.10.54-PM.png)
*The app preview showed the Contacts view inside the editor*

When I tried to navigate away, Power Apps asked me to save and publish first.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.11.02-PM.png)
*Power Apps asked me to save and publish before leaving*

After publishing, I opened the app and saw the My Active Contacts view — empty for now.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.12.06-PM.png)
*The published Contacts app showed an empty My Active Contacts view*

I opened the Copilot panel on the right, which immediately offered a set of suggested questions about the Contacts table.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.12.28-PM.png)
*The Copilot panel appeared with suggested questions about my data*

I asked "how many contacts?" and Copilot correctly reported there were none in the system.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.13.13-PM.png)
*Copilot confirmed there were no contacts in the system*

I then asked Copilot to add a contact named John Doe with phone number +1 604-555-1212. It could not create records directly, but it offered a link to the Contacts form to do it manually.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.14.29-PM.png)
*Copilot directed me to the Contacts form rather than creating a record itself*

I opened the New Contact form and entered John Doe's name and mobile number.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.16.22-PM.png)
*I filled in the New Contact form with John Doe's details*

I typed "What do we know about /" in the chat input and the Copilot panel listed John Doe as a known entity I could reference.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.18.51-PM.png)
*The Copilot panel showed John Doe as a referenceable record*

I selected the John Doe entry and the question resolved to "What do we know about John Doe".

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.19.09-PM.png)
*I selected the John Doe record to complete the question*

Copilot returned his full name and contact ID, but noted there were no further details on file.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.19.54-PM.png)
*Copilot returned John Doe's name and contact ID with nothing else available*

:::brain-power Before you read on
The Copilot panel answered questions about my contacts. What do you think it will say if I ask it something that has nothing to do with my Dataverse data, such as a general knowledge question? Will it answer from what the AI model already knows, or stay inside my tables?
:::

To test the boundaries of what Copilot knows, I asked "What is the Capital of France?" — a question with no answer in my Dataverse tables. I chose it because the answer is obvious to everyone, but cannot come from the Contacts table. Copilot correctly said it could not find relevant data in the Contacts tables.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.21.25-PM.png)
*Copilot correctly said it could not answer from the Contacts data*

This is where it gets interesting. I opened the Agents panel in the Power Apps editor and found the App assistant agent that drives the Copilot panel.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.21.54-PM.png)
*The Agents panel showed the App assistant agent*

The detail panel described what the agent can do and offered a link to edit it in Copilot Studio.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.22.27-PM.png)
*The agent details showed an Edit in Copilot Studio option*

I clicked through to Copilot Studio, which opened the Copilot in Power Apps - Contacts agent with a live test panel on the right.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.23.41-PM.png)
*Copilot Studio showed the agent overview with a live test panel*

:::no-dumb-questions
**Q: So the Copilot panel in my app is a Copilot Studio agent?**

A: Yes. The Agents panel in the Power Apps editor listed it as the App assistant agent, and the Edit in Copilot Studio link opened it as "Copilot in Power Apps - Contacts". Anything you can add to a Copilot Studio agent, such as a [custom topic](/posts/topics/), you can add to the Copilot in your app.

**Q: Why did it say it could not answer the Capital of France question?**

A: Out of the box, it answered only from the Contacts data in my app. A custom topic is one way to give it an answer it would not otherwise give.

**Q: Do I have to write the trigger phrases myself?**

A: Not here. I used "Add from description with Copilot", gave it a topic name and the answer I wanted, and Copilot Studio generated the trigger phrases and the message node for me.
:::

I went to the Topics tab and clicked Add a topic, then selected "Add from description with Copilot" to let Copilot build the topic for me.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.23.54-PM.png)
*I selected Add from description with Copilot*

I entered the topic name as "What is the Capital of France" and the intended response as "The Capital of France is Paris".

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.25.02-PM.png)
*I entered the topic name and the answer I wanted Copilot to give*

Copilot Studio generated a topic canvas with trigger phrases and a message node containing the answer — no manual canvas editing needed.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.25.52-PM.png)
*Copilot Studio built the topic canvas automatically*

I clicked Publish and confirmed in the dialog that appeared.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.26.09-PM.png)
*I clicked Publish to push the new topic to the agent*

The topic showed a published timestamp, confirming it was live.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.26.54-PM.png)
*The topic showed it was published on 6/1/26*

Back in Power Apps, the Agents panel confirmed the agent had been published with an updated timestamp.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.30.55-PM.png)
*The Agents panel showed the agent was last published on 6/1/2026*

I asked the same question again in the Copilot panel — this time it answered correctly.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-5.32.32-PM.png)
*Copilot answered "The capital of France is Paris" using the new custom topic*

Back in the solution I used Add existing to bring the customised agent into the Contacts solution, selecting it from the list.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-6.21.16-PM.png)
*I selected the Copilot in Power Apps - Contacts agent to add to the solution*

The agent now appeared under the Agents section of the solution, marked as customised and owned by me.

![](assets/images/powerapps9/Screenshot-2026-06-01-at-6.21.34-PM.png)
*The customised agent was listed in the solution ready to be shipped with it*

:::watch-it The customised agent is not in your solution until you add it
Customising the agent in Copilot Studio did not add it to my Contacts solution. I had to use Add existing to bring it in. If you skip that step and move the solution to another environment, the app goes without your custom topics.
:::

:::pencil Design a topic for your own app
Think of one question your users ask that the built-in Copilot cannot answer from your tables, such as a policy, an opening time or a contact number. Write the topic name and the answer you would give "Add from description with Copilot".

:::answer
For a Contacts app, an example is a topic named "Who do I call for help with this app?", with the answer "Contact the service desk on extension 1234". Copilot Studio turns the name into trigger phrases and the answer into a message node, as it did for the Capital of France topic. Publish the topic, then ask the question in the app to check it works.
:::
:::

:::bullet-points In short
- The Copilot panel in a model-driven app is a Copilot Studio agent, listed in the Power Apps editor as the App assistant agent.
- Out of the box, it answered questions about my Contacts data, but it did not create records and it did not answer a general knowledge question.
- In Copilot Studio, "Add from description with Copilot" built a custom topic from a name and an answer, with no manual canvas editing.
- After publishing, the Copilot in my app answered the new question.
- I used Add existing to put the customised agent into the solution, so that it travels with the app.
:::

## References

- [Copilot Studio Topics](/posts/topics/)

- [Introducing Model Driven Power Apps Copilot: Ask Your Data Anything!](https://www.youtube.com/watch?v=GIzSaDE-nQ0)

- [Add Copilot for app users in model-driven apps](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/add-ai-copilot)

- [Customize Copilot for Model Driven APP](https://www.youtube.com/watch?v=P7h3PnJgWAg)