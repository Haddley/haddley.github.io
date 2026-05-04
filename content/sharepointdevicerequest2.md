---
title: "SharePoint"
description: "Device Request (Part 2)"
date: "2026-05-03"
categories: ["Microsoft 365"]
tags: "sharepoint, power-automate, power-apps"
slug: "sharepointdevicerequest2"
image: "/assets/images/powerautomate/office-365-icon-500x500.png"
---

In [Part 1](/posts/sharepointdevicerequest/) I built a Device Request list in SharePoint and customised its built-in form with Power Apps. That approach is straightforward, but it ties everything to the SharePoint list — the flow only fires when a list item is written, every submission is visible in the list view, and the form can only do what a customised list form supports.

Here I took a different approach: a standalone canvas app calls a Power Automate instant flow directly from its Submit button, and the finished app is embedded in the SharePoint page as a web part. This gives a few advantages. The flow is triggered immediately by the app rather than waiting on a SharePoint list write, so there is no intermediate storage and no list view for users to stumble into. The canvas app is a proper Power Apps screen, so validation, layout, and conditional logic are all straightforward to add. And because the app is embedded via the Power Apps web part, it appears inline on any SharePoint page without users needing to navigate to a list at all.

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-2.19.01-PM.png)
*I created a new Power Automate solution called "Device Request Solution" to contain the flow and canvas app*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-2.19.52-PM.png)
*I clicked New > Automation > Cloud flow and selected Instant to create a new instant cloud flow*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-2.20.31-PM.png)
*I named the flow "Submit Device Request" and chose "When Power Apps calls a flow (V2)" as the trigger*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-2.21.50-PM.png)
*The flow opened with the Power Apps (V2) trigger — I clicked "Add an input" to define the data the canvas app would pass in*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-2.22.39-PM.png)
*The input type picker appeared — I selected Text for the device description*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-2.23.55-PM.png)
*I named the first input "Title" with the placeholder "Enter device description", then clicked Add an input again to add a second field*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-2.24.25-PM.png)
*I added a second Number input named "Price" with the placeholder "Enter device price"*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-2.29.21-PM.png)
*I added a new step, searched for "get my profile", and selected "Get my profile (V2)" from Office 365 Users to retrieve the submitter's details*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-2.31.53-PM.png)
*I added another step and searched for "email" to find the Office 365 Outlook connector*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-2.32.54-PM.png)
*I searched for "send an" within Office 365 Outlook and selected "Send an email (V2)"*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-2.35.14-PM.png)
*I configured the email action with the user's Mail address from Get my profile as the recipient, the subject "Your device request has been submitted", and the body referencing the Title input*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-2.58.01-PM.png)
*Back in the flow, I searched for "respond" and selected "Respond to a Power App or flow" so the flow could return a result to the canvas app*


![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-2.58.23-PM.png)
*The "Respond to a Power App or flow" step was added as the last action in the flow*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-3.00.43-PM.png)
*The completed flow showed all four steps connected: Power Apps trigger, Get my profile, Send an email, and Respond to Power App*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-2.50.31-PM.png)
*I returned to the solution and clicked New > App > Canvas app to build the submission form*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-2.51.17-PM.png)
*I named the canvas app "Device Request App", selected Phone format, and clicked Create*


![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-3.11.43-PM.png)
*I selected the Submit button in Power Apps and entered the OnSelect formula to call the Submit Device Request flow, show a success notification, and reset the input fields*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-3.58.07-PM.png)
*The Submit button's OnSelect formula called the flow with the Title and Price inputs, displayed the success notification, and reset both text fields*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-3.26.01-PM.png)
*I opened the IT Staff SharePoint home page in edit mode and clicked the + button to add a new web part*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-3.26.22-PM.png)
*I searched for "Power" in the web part picker and selected Microsoft PowerApps (Preview)*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-3.26.51-PM.png)
*I published the Device Request App from Power Apps Studio so it could be embedded in SharePoint*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-3.28.18-PM.png)
*The app details page showed the web link and a mobile QR code for the Device Request App*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-3.29.44-PM.png)
*A permissions dialog appeared asking me to allow the Device Request App to access Office 365 data — I clicked Allow*




![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-3.56.25-PM.png)
*I entered "Laptop" and 2000 to test another submission from the SharePoint home page*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-3.56.54-PM.png)
*After clicking Submit, the form showed "Device request submitted successfully!" and the fields cleared automatically*



![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-3.31.18-PM.png)
*The Power Automate flow run history showed two successful runs of the Submit Device Request flow*

![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-3.31.38-PM.png)
*Each step in the flow completed successfully — the run finished in under a second*


![](assets/images/sharepointdevicerequest2/Screenshot-2026-05-04-at-4.17.07-PM.png)
*I checked Outlook and confirmed the second confirmation email had arrived — the flow sent the notification for both test submissions*

## References

- [Use Power Automate pane](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/working-with-flows)
