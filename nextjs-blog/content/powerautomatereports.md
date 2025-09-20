---
title: "Microsoft Power Automate Reports"
description: "A comprehensive guide covering microsoft power automate reports"
date: "2025-09-20"
category: "Development"
image: "/assets/images/office-365-icon-500x500.png"
tags: ["cloud","ai","dynamics"]
---

# Microsoft Power Automate Reports

## Microsoft Power Automate Reports

![](/assets/images/powerautomatereports/office-365-icon-500x500.png)
*This file is licensed under the Creative Commons Attribution 4.0 International license.*


## Microsoft Power Automate Reports

Creating a Flow that emails a Report as a PDF file

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-11.14.34am-2136x1112.png)
*I created a Flows solution*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-11.15.05am-2136x751.png)
*I added a new Cloud flow*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-1.56.13pm-2136x975.png)
*The user will be asked to provide a Report Name and an Email address. The Success variable is set to false.*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-1.57.43pm-2136x1114.png)
*I used the List rows action...*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-1.58.46pm-2136x674.png)
*... to fetch a row from the Reports table*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-2.00.23pm-2136x998.png)
*I filtered the results to the Report with the user provided name*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-2.00.57pm-2136x1003.png)
*I added an HTTP action*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-2.01.24pm-2136x1036.png)
*I selected the Invoke an HTTP request action*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-10.24.22am-2136x1096.png)
*I entered the report's base resource url twice (my unique https://XXX.crm.dynamics.com url)*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-2.05.34pm-2136x953.png)
*A connection was created and I entered the HTTP reuqest details/CRMReports/rsviewer/reportviewer.aspxContent-Type: application/x-www-form-urlencodedid={report id}*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-2.06.44pm-2136x994.png)
*The flow designer automagically added the Apply to each action*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-2.08.07pm-2136x888.png)
*I added three Compose actions*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-2.11.01pm-2136x1104.png)
*Together the three Compose actions establish the pdf download urladd(indexOf(outputs('Invoke_an_HTTP_request')?['body'],'"PdfDownloadUrl":"'), 18)sub(indexOf(outputs('Invoke_an_HTTP_request')?['body'],'","PdfPreviewUrl"'),outputs('Compose'))replace(substring(outputs('Invoke_an_HTTP_request')?['body'],outputs('Compose'),outputs('Compose_2')),'\u0026','&')*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-2.12.38pm-2136x1033.png)
*I added a Do until action*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-2.13.11pm-2136x1022.png)
*I added a Do until action to ensure that the flow would retry the HTTP GET and Email actions until the Success variable was set to true*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-2.14.08pm-2136x1110.png)
*I added three scope actions*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-2.14.30pm-2136x1112.png)
*The third scope action was configured to catch errors.*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-2.14.59pm-2136x1003.png)
*I added the happy path logic to the second scope*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-2.15.43pm-2136x1017.png)
*I attempt to fetch the report as a PDF file*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-2.16.16pm-2136x1104.png)
*I attempt to send the pdf file as an email attachment*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-2.18.44pm-2136x1059.png)
*I set the body of the email, the body of the email attachment, the email to and the email subject.*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-2.22.19pm-2136x1085.png)
*If no errors are generated I set the value of the Success variable*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-2.24.29pm-2136x1110.png)
*If no errors are generated I set the value of the Success variable to true*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-2.25.40pm-2070x1374.png)
*When I run the flow this email is received*

![](/assets/images/powerautomatereports/screenshot-2024-07-19-at-2.25.49pm-2060x1358.png)
*The email has this PDF file attachment*
