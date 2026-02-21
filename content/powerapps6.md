---
title: "A Custom Connector for Microsoft Graph"
description: "Calling the Microsoft Graph API from a Canvas App"
date: "2022-07-04"
categories: ["Power Platform"]
tags: ""
slug: "powerapps6"
image: "/assets/images/powerapps6/office-365-icon-500x500.png"
---


I started by creating a "Microsoft Graph" application registration in Azure Active Directory

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-3.40.29-pm-1836x1351.png)
*Azure Active Directory - I created an application registration*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-3.41.31-pm-1836x930.png)
*I copied the Application (client) ID to be used later.*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-3.42.08-pm-1836x1037.png)
*I created a new client secret*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-3.43.08-pm-1836x832.png)
*I set the client secret to expire in 2 years*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-3.43.41-pm-1836x830.png)
*I copied the Client Secret's Value to be used later.*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-3.44.38-pm-1836x991.png)
*I selected the "API permissions" link*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-3.45.22-pm-1836x1107.png)
*I selected the "Add a permission" link*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-3.45.43-pm-1836x1220.png)
*I selected the "Microsoft Graph" button*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-3.51.26-pm-1836x1150.png)
*I selected the "Calendars.Read" and the "Calendars.Read.Shared" permissions (scopes)*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-3.51.44-pm-1836x1070.png)
*I clicked the "Grant admin consent for ..." link*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-3.52.00-pm-1836x542.png)
*I granted consent*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-3.53.02-pm-1836x1112.png)
*I navigated to the Custom Connectors tab and clicked the "+ New custom connector" link*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-3.53.24-pm-1836x1108.png)
*I provided a connector name*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-3.54.48-pm-1836x1110.png)
*I provided general information and navigated to the Security step*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-3.56.43-pm-1836x1105.png)
*I selected "OAuth 2.0"*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-3.58.27-pm-1836x1110.png)
*I selected Azure Active Directory. I entered the Application (client) id and Client secret values I copied earlier.*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-3.59.50-pm-1836x1104.png)
*I copied the generated "Redirect URL".*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.10.03-pm-1836x736.png)
*I returned to the Application Registration and added the Redirect URL (URI)*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.10.17-pm-1836x835.png)
*I clicked the "+ Add a platform" link*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.10.26-pm-1836x625.png)
*I selected the Web button*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.11.00-pm-1836x1109.png)
*I entered the (copied) Redirect URL and clicked the configure button*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.00.15-pm-1836x829.png)
*I returned to the Power Apps page and clicked the "+ New Action" link*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.01.23-pm-1836x1040.png)
*I entered general details for the operation*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.01.42-pm-1836x500.png)
*I copied the Microsoft Graph request URL from the Graph Explorer web application.*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.02.24-pm-1836x878.png)
*I copied the request URL to the new connector action*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.02.52-pm-1836x1171.png)
*I copied the sample (JSON) response from the Graph Explorer web application (notice that the array of Calendar Events is returned as the "value").*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.03.13-pm-1836x1114.png)
*I copied the sample (JSON) response to the new connector action*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.04.03-pm-1836x1105.png)
*I saw that Validation succeeded and navigated to the Code (Preview) step*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.04.17-pm-1836x1108.png)
*I reviewed the Code Details page then saved the Connector.*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.05.43-pm-1836x490.png)
*I used the Created button to save the new Connector*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.14.22-pm-1836x1108.png)
*I selected the AllEventsInMyCalendar and clicked the "Test operation" button*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.14.38-pm-1836x1112.png)
*The response looked good.*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.15.44-pm-1836x225.png)
*I created a new Canvas app using the "+ New app" link*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.16.04-pm-1836x1034.png)
*I provided an App name*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.16.49-pm-1836x1106.png)
*I added the new connector to the Canvas app*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.55.47-pm-1836x228.png)
*Screen1's OnVisible property is set to "Collect(Calendar, (MicrosoftGraphConnector.AllEventsInMyCalendar().value)"*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.56.15-pm-1836x930.png)
*Running the Canvas app creates a Calendar collection (of Events).*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.56.38-pm-1836x229.png)
*A Gallery is added to the Screen1. The Items property of the Gallery is set to the Calendar collection.*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.57.01-pm-1836x392.png)
*The item template is updated setting Title to the Event item's "subject"*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.57.12-pm-1441x305.png)
*The item template is updated setting Subtitle to "All Day" if the Event item's isAllDay field is true.*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.57.22-pm-1444x306.png)
*The item template is updated setting Body to the Event item's "start.datetime"*

![](/assets/images/powerapps6/screen-shot-2022-07-04-at-4.57.37-pm-1836x931.png)
*The Calendar application is complete*


## Adding UserByEmail

Finally I added a UserByEmail action to the Connector

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-7.03.25-am-1536x755.png)
*User by email request requires User.Read.All permissions (scope)*

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-6.59.41-am-1536x774.png)
*Update existing Application Registration adding a permission*

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-7.05.14-am-1536x754.png)
*Adding the "User.Read.All" permission*

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-7.05.33-am-1536x320.png)
*Updated permissions - Granting admin consent*

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-7.07.19-am-1536x754.png)
*Edit the Custom Connection*

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-7.07.32-am-1536x219.png)
*Add new action*

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-7.08.35-am-1536x755.png)
*I entered general details*

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-7.09.12-am-1536x751.png)
*I entered the request details (notice that a value for {user-mail} will need to be provided when the action is invoked)*

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-7.10.02-am-1536x753.png)
*I copied a sample response from Graph Explorer to the Custom Connector*

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-7.10.19-am-1536x749.png)
*The Custom Connector displays details of the response body provided to it*

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-7.11.03-am-1536x751.png)
*I updated the Custom Connector and navigated to the Test step*

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-7.11.30-am-1536x754.png)
*I provided a value for the "user-email" parameters and clicked the Test operation button*

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-7.11.44-am-1536x754.png)
*The action returned a result*

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-7.12.51-am-1536x795.png)
*I created a "Profiles" canvas app*

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-7.13.30-am-1536x753.png)
*I added a reference to the updated Custom Connector*

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-7.14.14-am-1536x752.png)
*The reference is displayed in the Data tab*

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-7.16.18-am-1536x751.png)
*I added a Text input and a Text label*

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-7.18.02-am-1536x750.png)
*I updated the Text input's OnSelect handler to Set the value of "UserProfile" to the result of a call to the new UserByEmail action*

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-7.22.25-am-1536x520.png)
*I updated the Text label to display the jobTitle property of the UserProfile*

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-7.24.26-am-1536x752.png)
*I ran the Profiles app and entered an email address*

![](/assets/images/powerapps6/screen-shot-2022-07-05-at-7.23.57-am-1536x754.png)
*The user's job title was displayed*