---
title: "Business Central Azure Logic App"
description: "Azure Logic App with Business Central Trigger"
date: "2025-12-12"
categories: ["Azure","Microsoft Dynamics","Business Central"]
image: "/assets/images/azurelogicappbc/posts-meta.svg"
tags: ["azure","business central","logic apps"]
slug: "azurelogicappbc"
---

# Business Central Azure Logic App

## Azure Logic App with Business Central Trigger

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
```
Trigger: When a Sales Order is created in BC
→ Action 1: Send approval email to manager
→ Action 2: Wait for approval response
→ Action 3: If approved, create shipment in logistics system
→ Action 4: Update BC with tracking info
```

**Example 2: Inventory Sync**
```
Trigger: When Item stock level changes in BC
→ Action 1: Update e-commerce website inventory
→ Action 2: Send low-stock alert to warehouse team
→ Action 3: Create Purchase Order if below threshold
```

**Example 3: Customer Onboarding**
```
Trigger: When a new Customer is created in BC
→ Action 1: Create account in CRM system
→ Action 2: Send welcome email
→ Action 3: Assign customer service rep
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



![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 184607.png)
*Create a resource*

![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 195158.png)
*Logic App Create*

![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 195507.png)
*Consumption*

![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 201534.png)
*Resource Group*

![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 201613.png)
*Logic App name*

![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 201706.png)
*Create*

![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 201736.png)
*Deployment is in progress*

![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 201802.png)
*logic app designer*

![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 201822.png)
*Add a trigger*

![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 201857.png)
*business central*

![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 201919.png)
*Create connection*

![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 202006.png)
*SANDBOX27*

![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 202030.png)
*CONUS USA, Inc.*

![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 202101.png)
*customers*

![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 202124.png)
*Save*

![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 202159.png)
*Send an email (V2)*

![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 202218.png)
*Sign in*


![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 202412.png)
*Send an email (V2)*

![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 202506.png)
*Customers +New*

![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 202527.png)
*Customer Company*

![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 202613.png)
*Example Customer*

![](/assets/images/azurelogicappbc/Screenshot 2025-12-12 202659.png)
*Email*

## References

- [Building Robust Integrations with Business Central Using Azure’s Integration Services](https://fredborg.org/?p=1447)