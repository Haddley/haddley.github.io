---
title: "SharePoint"
description: "Device Request List (Part 1)"
date: "2026-05-02"
categories: ["Microsoft 365"]
tags: "sharepoint, powerautomate, powerapps"
slug: "sharepointdevicerequest"
image: "/assets/images/powerautomate/office-365-icon-500x500.png"
---

I built a Device Request list in SharePoint Online to let IT staff submit requests for new equipment. The list uses a custom Power Apps form that locks the Status field so only an approver can change it, keeping the Pending/Approved/Rejected workflow clean. A Power Automate flow then fires on every new submission and emails a confirmation back to the requester automatically.

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.00.17-PM.png)
*I opened the IT Staff SharePoint site and clicked New > List to create a new list*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.00.35-PM.png)
*The "How would you like to start?" dialog appeared — I chose to create a blank List*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.00.55-PM.png)
*I named the new list "Device Requests" and clicked Create*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.01.25-PM.png)
*The empty Device Requests list was created with just a Title column*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.03.02-PM.png)
*I clicked Add column and selected Currency as the column type*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.03.28-PM.png)
*I created an "Item Cost" column with the Currency type and saved it*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.03.59-PM.png)
*I created a "Status" column as a Choice type with options: Pending, Approved, and Rejected*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.05.01-PM.png)
*I set Pending as the default value for the Status column and saved*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.08.58-PM.png)
*I opened the Integrate menu and selected Power Apps to customise the list form*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.11.24-PM.png)
*Power Apps Studio opened with the Device Requests form*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.18.33-PM.png)
*I selected the Status field and set its DisplayMode to Disabled so users cannot edit the status when submitting a request*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.19.31-PM.png)
*I published the customised form back to SharePoint*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.21.28-PM.png)
*The Device Requests list was ready with the published form*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.22.05-PM.png)
*I clicked Add new item and the custom form opened — the Status field was greyed out as intended*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.22.19-PM.png)
*The "New Laptop" request appeared in the list with a cost of $2,000 and Status set to Pending*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.24.45-PM.png)
*I opened the Integrate menu and selected Workflows to add a Power Automate flow*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.25.09-PM.png)
*The Workflows panel opened showing available workflow templates*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.25.31-PM.png)
*I created a new workflow and selected SharePoint > "A list item is created" as the trigger*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.26.15-PM.png)
*The trigger was set to fire when Device Requests items are created — I chose to build the action in Power Automate for more options*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.26.25-PM.png)
*A dialog confirmed I'd be taken to Power Automate to build the full workflow*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.27.37-PM.png)
*Power Automate opened with a new flow named "Device Approval Flow" and the SharePoint trigger connectors visible*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.28.14-PM.png)
*I configured the trigger with the IT Staff site and Device Requests list*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.29.11-PM.png)
*I added a new step and searched for Outlook to add an email action*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.29.41-PM.png)
*I searched for "send" within Office 365 Outlook and selected "Send an email (V2)"*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.30.38-PM.png)
*The Send an email action expanded with the Dynamic content panel open, showing "Created By Email" as the recipient*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.32.33-PM.png)
*I completed the email action: To = Created By Email, Subject = "Your device request has been submitted", Body referencing the Title field*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.32.55-PM.png)
*Power Automate confirmed the flow was saved and ready to test*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.33.32-PM.png)
*I returned to the list and submitted a new request for a "New iPhone" at $1,500*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.33.44-PM.png)
*The list now showed both requests — New Laptop and New iPhone — each with Pending status*

![](assets/images/sharepointdevicerequest/Screenshot-2026-05-02-at-4.34.56-PM.png)
*The Power Automate flow triggered automatically and sent a confirmation email: "Thank you for submitting a request for New iPhone. Your request is now being reviewed."*

## References

- [Customize a form for a SharePoint list](https://learn.microsoft.com/en-us/sharepoint/dev/business-apps/power-apps/get-started/create-your-first-custom-form)
- [Send an email when a new item is created or modified in a SharePoint list](https://learn.microsoft.com/en-us/sharepoint/dev/business-apps/power-automate/get-started/create-your-first-flow)
