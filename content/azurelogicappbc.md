---
title: "Business Central Azure Logic App"
description: "Azure Logic App with Business Central Trigger"
date: "2025-12-12"
categories: ["Azure","Microsoft Dynamics","Business Central"]
image: "/assets/images/azurelogicappbc/posts-meta.svg"
tags: "logic-apps, business-central, integration"
hidden: false
slug: "azurelogicappbc"
---

# Business Central Azure Logic App

## Azure Logic App with Business Central Trigger

:::brain-power Before you read on
You want an email every time a customer is created in Business Central. Would you rather ask Business Central every few minutes whether anything is new, or have it tell you the moment something happens? What would each choice cost you?
:::

### **What is this combination?**
Azure Logic App with Business Central Trigger is a **cloud automation workflow** that connects Microsoft's **Azure Logic Apps** (no-code/low-code workflow automation) with **Dynamics 365 Business Central** (ERP system) through a trigger mechanism.

---

### **Key Components**

#### **1. Azure Logic App**
- A cloud service for creating **automated workflows**
- Connects different apps/services (SaaS, on-premises, Azure services)
- Uses **triggers** (when something happens) → **actions** (then do something)

#### **2. Business Central Trigger**
- The **starting point** of the workflow
- **Listens for specific events/changes** in Business Central
- Two main types:

---

### **Available Business Central Triggers**

#### **A. Polling Triggers** (Check regularly)
1. **When a record is created/modified**
   - Example: "When a Sales Order is created"
   - Checks Business Central at regular intervals (every 5 min, 1 hour, etc.)
   - Detects new/changed records since last check

2. **When an item is created/updated**
   - Works with Business Central entities: Customers, Items, Sales Orders, Purchase Orders, etc.

#### **B. Webhook Triggers** (Event-driven)
1. **When a Business Central notification arrives**
   - Business Central **pushes** notifications via webhooks
   - More real-time than polling
   - Requires Business Central to be configured for webhook notifications

---

### **Typical Use Cases & Workflows**

**Example 1: Sales Order Processing**
```mermaid
flowchart TD
    T["Trigger: When a Sales Order is created in BC"]
    T --> A1["Action 1: Send approval email to manager"]
    A1 --> A2["Action 2: Wait for approval response"]
    A2 --> A3["Action 3: If approved, create shipment in logistics system"]
    A3 --> A4["Action 4: Update BC with tracking info"]
```

**Example 2: Inventory Sync**
```mermaid
flowchart TD
    T["Trigger: When Item stock level changes in BC"]
    T --> A1["Action 1: Update e-commerce website inventory"]
    A1 --> A2["Action 2: Send low-stock alert to warehouse team"]
    A2 --> A3["Action 3: Create Purchase Order if below threshold"]
```

**Example 3: Customer Onboarding**
```mermaid
flowchart TD
    T["Trigger: When a new Customer is created in BC"]
    T --> A1["Action 1: Create account in CRM system"]
    A1 --> A2["Action 2: Send welcome email"]
    A2 --> A3["Action 3: Assign customer service rep"]
```

---

### **Configuration Requirements**

1. **Business Central Setup**
   - API enabled
   - User with appropriate permissions
   - Webhook setup (if using webhook triggers)

2. **Azure Components**
   - Logic App resource
   - Azure AD App Registration (for authentication)
   - Managed Identity/Service Principal

3. **Authentication Methods**
   - OAuth 2.0 with Azure AD
   - Service-to-service authentication

---

### **Limitations & Considerations**

✓ **API Limits**: Business Central has API call limits
✓ **Latency**: Polling triggers have delay (schedule-based)
✓ **Complex Logic**: Better for simpler workflows; complex logic might need custom code
✓ **Cost**: Logic Apps pricing based on executions

---

### **When to Use This Pattern**

✅ **Good for**:
- Simple to medium complexity integrations
- Quick automation without coding
- Event-driven processes across systems
- When you need to connect BC with other cloud services

❌ **Consider alternatives** (Power Automate, custom APIs) when:
- Very complex business logic needed
- High-volume transactions
- Real-time requirements (polling adds delay)
- Need on-premises system integration

---

### **Example Setup Steps**

1. **Create Logic App** in Azure Portal
2. **Add Business Central connector**
3. **Choose trigger** (e.g., "When a record is created")
4. **Configure connection** to your BC instance
5. **Select entity** (Customers, Items, etc.)
6. **Add subsequent actions** (email, update system, call API)
7. **Save and enable** the workflow

This integration enables **business process automation** by connecting Business Central events to hundreds of other services (Office 365, Salesforce, SQL, SAP, etc.) through Logic Apps' extensive connector library.



![](assets/images/azurelogicappbc/Screenshot-2025-12-12-184607.png)
*I clicked Create a resource*

![](assets/images/azurelogicappbc/Screenshot-2025-12-12-195158.png)
*I created a Logic App*

![](assets/images/azurelogicappbc/Screenshot-2025-12-12-195507.png)
*I selected Consumption*

![](assets/images/azurelogicappbc/Screenshot-2025-12-12-201534.png)
*I selected the Resource Group*

![](assets/images/azurelogicappbc/Screenshot-2025-12-12-201613.png)
*I entered the Logic App name*

![](assets/images/azurelogicappbc/Screenshot-2025-12-12-201706.png)
*I clicked Create*

![](assets/images/azurelogicappbc/Screenshot-2025-12-12-201736.png)
*The deployment was in progress*

![](assets/images/azurelogicappbc/Screenshot-2025-12-12-201802.png)
*I opened the Logic App designer*

![](assets/images/azurelogicappbc/Screenshot-2025-12-12-201822.png)
*I added a trigger*

![](assets/images/azurelogicappbc/Screenshot-2025-12-12-201857.png)
*I searched for business central*

![](assets/images/azurelogicappbc/Screenshot-2025-12-12-201919.png)
*I created a connection*

![](assets/images/azurelogicappbc/Screenshot-2025-12-12-202006.png)
*I selected SANDBOX27*

![](assets/images/azurelogicappbc/Screenshot-2025-12-12-202030.png)
*I selected CONUS USA, Inc.*

![](assets/images/azurelogicappbc/Screenshot-2025-12-12-202101.png)
*I selected customers*

:::no-dumb-questions
**Q: What is a trigger in a Logic App?**

A: The event that starts a workflow. A trigger is followed by actions, so the pattern is when something happens, then do something. In this post the trigger is a Business Central trigger, and the action is Send an email (V2).

**Q: What is the difference between a polling trigger and a webhook trigger?**

A: A polling trigger checks Business Central at regular intervals and picks up what is new or changed since the last check. A webhook trigger is told by Business Central when something happens, so it is closer to real time but needs Business Central to be set up for it.
:::

![](assets/images/azurelogicappbc/Screenshot-2025-12-12-202124.png)
*I clicked Save*

![](assets/images/azurelogicappbc/Screenshot-2025-12-12-202159.png)
*I added a Send an email (V2) action*

![](assets/images/azurelogicappbc/Screenshot-2025-12-12-202218.png)
*I signed in*


![](assets/images/azurelogicappbc/Screenshot-2025-12-12-202412.png)
*I configured Send an email (V2)*

![](assets/images/azurelogicappbc/Screenshot-2025-12-12-202506.png)
*I clicked Customers +New*

![](assets/images/azurelogicappbc/Screenshot-2025-12-12-202527.png)
*I selected Customer Company*

![](assets/images/azurelogicappbc/Screenshot-2025-12-12-202613.png)
*I created an example customer*

![](assets/images/azurelogicappbc/Screenshot-2025-12-12-202659.png)
*The email notification was sent*

:::pencil Choose a trigger
Your finance team wants a message within seconds of a large sales order being created, not up to an hour later. Using the explanation at the top of this post, which kind of trigger would you choose, and what would Business Central need?

:::answer
A webhook trigger, because Business Central pushes the notification, so it does not wait for the next poll. The explanation says that Business Central would need to be configured for webhook notifications. A polling trigger would still work, but it has a delay that depends on its schedule.
:::
:::

:::watch-it Polling has a delay, and Logic Apps cost per execution
The explanation at the top lists a few limits to keep in mind. A polling trigger notices a change only at its next check, Business Central has API call limits, and Logic Apps pricing depends on the number of executions. I used a Consumption plan, so check the charges before you leave a workflow running.
:::

:::test-drive Try it yourself
1. Create a Logic App on the Consumption plan, and add a Business Central trigger for customers.
2. Add a Send an email (V2) action.
3. Create a customer in a sandbox company, and watch the run history.
4. Compare the time of the change with the time of the email.
:::

:::bullet-points Recap
- A Logic App starts from a trigger and then runs actions.
- Business Central triggers either poll for changes or are notified by a webhook.
- I used a trigger on customers in a sandbox company, and a Send an email (V2) action.
- Polling adds a delay, so use a webhook when you need an answer quickly.
:::

## References

- [Building Robust Integrations with Business Central Using Azure’s Integration Services](https://fredborg.org/?p=1447)