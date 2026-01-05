---
title: "Model Driven Apps (Part 2)"
description: "Environments"
date: "2023-10-05"
categories: ["Power Platform"]
tags: ""
slug: "modeldriven2"
image: "/assets/images/office-365-icon-500x500.png"
---



Business process flows help people complete their tasks. They offer an interface that guides individuals through the steps defined.

I created a **Project** table and a four step business process flow.


The random urls assigned to Power Platform Environments can be updated.

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-7.58.33-am-2136x1321.png)
*I reset my Developer environment and updated the url to https://haddley-develop.crm.dynamics.com.*


## Published Apps

When I navigate to [https://haddley-develop.crm.dynamics.com](https://haddley-develop.crm.dynamics.com) I see a list of Published Apps.

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-8.54.54-am-2136x1083.png)
*Published Apps*


## Projects

I created a Project table with these columns:

Business Need (required)
Project Description (recommended)
Estimated Cost $
Program {Asset Management, Corp. Website, CRM, Highway Improvement, Inventory}
Actual Cost $; and
Project Closeout

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.36.30-am-2136x1078.png)
*I selected my Development environment*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.37.25-am-2136x998.png)
*I started to create a Project Solution*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.37.45-am-2136x998.png)
*I added a Publisher*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.38.00-am-2136x999.png)
*I provided my email address*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.38.14-am-2136x997.png)
*I selected the *new* publisher and clicked the Create button*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.39.14-am-2136x999.png)
*I added a Table to the new solution*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.39.55-am-2136x997.png)
*I called my table Project*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.43.13-am-2136x998.png)
*I wanted to set a custom image for the new table*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.43.57-am-2136x1001.png)
*I downloaded an image (Project icons created by Freepik - Flaticon)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.44.40-am-2136x996.png)
*I clicked the "Creating a new activity" option - adding support for activities*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.46.46-am-2136x996.png)
*I updated the Primary name column to be an Autonumber column*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.47.13-am-2136x998.png)
*I set the Primary name column to be Optional, provided prefix "project", updated the number of digits to 6 and updated the seed value*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.45.34-am-2136x485.png)
*I clicked the + New column button to add a column to the Project table*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.47.46-am-2136x996.png)
*I added a Business Need column (required)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.51.02-am-2136x996.png)
*I added a Project Description column (recommended)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.51.45-am-2136x996.png)
*I added an Estimated Cost column (Currency $)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.53.47-am-2136x1000.png)
*I added a Program column (Choice)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.54.21-am-2136x999.png)
*I clicked the + New Choice button to create a global choice (set)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.57.19-am-2136x999.png)
*I entered the possible Program values*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.57.44-am-2136x997.png)
*I selected the *new* Program global choice (set)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.58.29-am-2136x998.png)
*I created an Actual Cost column (Currency $)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.59.04-am-2136x1000.png)
*I created a Project Closeout column (Text area)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.59.17-am-2136x999.png)
*I set the Project Closeout column's Maximum character count to 4000*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-11.59.47-am-2136x999.png)
*I updated the Project table's Main form*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.00.09-pm-2136x1001.png)
*I moved the Name and Owner columns to the Form Header*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.01.53-pm-2136x1001.png)
*I added the new columns to the General tab*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.02.26-pm-2136x1098.png)
*I added a Timeline control to display activity information (Meetings, Phone calls, etc. related to each Project)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.03.25-pm-2136x717.png)
*I created a new Model Driven App*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.03.38-pm-2136x923.png)
*I called the new app Projects*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.03.59-pm-2136x1023.png)
*I added a page to the app*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.04.25-pm-2136x1091.png)
*I selected the Project table*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.05.06-pm-2136x1096.png)
*I renamed the Group Label to Main*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.06.15-pm-2136x693.png)
*A Projects menu item has been added to the left hand navigation (using the custom icon)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.06.38-pm-2136x1053.png)
*I clicked the + New button to navigate to the form*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.07.06-pm-2136x1095.png)
*I created a Business process flow to provide some guidance to the user*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.07.52-pm-2136x1096.png)
*I called the new business process flow Project Flow*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.08.05-pm-2136x1095.png)
*A dialog was opened in the solution page*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.08.54-pm-2136x1056.png)
*The Business Process Flow editor was opened in another browser tab.I renamed the first step 01 - Initiation and clicked the Apply button.*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.09.18-pm-2136x1050.png)
*I updated the Data Step's Data Field (Column) to Business Need*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.11.11-pm-2136x1053.png)
*I clicked the Apply button*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.11.34-pm-2136x1053.png)
*Notice that the Step Name was automatically updated to match the selected Data Field (Column)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.11.46-pm-2136x1049.png)
*I clicked the Add Data Step menu item to add a Data Step*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.11.59-pm-2136x1049.png)
*I clicked the plus button under the existing Business Need data step*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.12.36-pm-2136x1106.png)
*I selected the Project Description Data field (Column)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.12.48-pm-2136x1103.png)
*I clicked the Apply button. Notice that I did not click the Required option (yet)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.13.10-pm-2136x736.png)
*I clicked the Add Stage menu item*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.13.22-pm-2136x731.png)
*I clicked the plus button to the right of the existing stage*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.13.56-pm-2136x1101.png)
*I updated new stage's display name to 02 - Planning. I clicked the Apply button.*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.14.21-pm-2136x1104.png)
*I updated the provided Data Step to use the Estimated Cost Data Field (Column)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.14.35-pm-2136x1100.png)
*I clicked the Apply button*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.14.50-pm-2136x786.png)
*The change was saved and the diagram was updated*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.15.06-pm-2136x883.png)
*I added another Data Step*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.15.31-pm-2136x1106.png)
*I set the Data Step to use the Program Data field (Column)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.15.43-pm-2136x1106.png)
*I did not check the Required box (yet). I clicked the Apply button to save the changes*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.16.06-pm-2136x649.png)
*I clicked the Add Stage menu item*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.16.29-pm-2136x738.png)
*I clicked the plus button to add a Stage*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.17.16-pm-2136x1105.png)
*I named the new stage 03 - Execution*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.17.35-pm-2136x861.png)
*I updated the existing Data Step to use the Actual Cost Data Field (Column)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.17.53-pm-2136x1099.png)
*I did not check the Required box (yet). I clicked the Apply button to save the changes*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.18.06-pm-2136x810.png)
*I clicked the Add Stage menu item*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.18.18-pm-2136x698.png)
*I clicked the plus button to add a Stage*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.18.39-pm-2136x1101.png)
*I named the new stage 04 - Close. I clicked the Apply button to save the changes*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.18.59-pm-2136x1103.png)
*I updated the existing Data Step to use the Project Closeout Data Field (Column)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.19.12-pm-2136x1100.png)
*I did not check the Required box. I clicked the Apply button to save the changes*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.19.36-pm-2136x248.png)
*I clicked the Activate menu item*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.19.49-pm-2136x778.png)
*I clicked the Activate button*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.20.02-pm-2136x832.png)
*I reviewed the dialog and closed the browser tab*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.20.28-pm-2136x737.png)
*I used the + Add required objects menu item*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.20.56-pm-2136x804.png)
*The + Add required objects menu item added the Project Flow table (used by the Business Process Flow to keep track)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.21.25-pm-2136x265.png)
*I clicked the Publish all customizations button*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.22.38-pm-2136x664.png)
*Clicked the Projects app to launch it*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.24.05-pm-2136x590.png)
*The app opened with url haddley-dev.crm.dynamics.com*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.24.24-pm-2136x735.png)
*Clicking in the business process flow I can see that Business Need and Project Descriptions are important to the first step.*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.25.29-pm-2136x794.png)
*I entered a Business Need value and clicked on the Business Process Flow again (notice the check mark)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.26.11-pm-2136x786.png)
*I entered a Project Description value and clicked Save to save the row (record)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.26.24-pm-2136x798.png)
*Once the record has been saved the Primary name is available and the Next Stage button is shown in the Business Process Process*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.27.28-pm-2136x896.png)
*I removed the Project Description value and clicked the Next Stage button.*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.28.23-pm-2136x778.png)
*I clicked the Next Stage button again*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.28.39-pm-2136x774.png)
*Then I clicked on the 02 - Planning Step and clicked the Set Active button to return the process to the 02 - Planning Step*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.29.31-pm-2136x1105.png)
*I updated the Business Process Flow setting Estimated Cost to Required*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.29.48-pm-2136x1108.png)
*I updated the Business Process Flow setting Program to Required*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.30.03-pm-2136x1111.png)
*I updated the Business Process Flow setting Actual Cost to Required*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.30.23-pm-2136x1106.png)
*I did not set Project Closeout to Required*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.30.35-pm-2136x271.png)
*I clicked the Update button*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.32.14-pm-2136x1106.png)
*I returned to the project-100000 record and clicked the Next Stage button*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.32.42-pm-2136x1102.png)
*I provided Estimated Cost and Program values and clicked the Next Stage button*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.32.54-pm-2136x1104.png)
*I clicked the Next Stage button*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.33.23-pm-2136x1104.png)
*I provided an Actual Cost value (in the business process flow box) and clicked the Next Stage button (again)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.33.37-pm-2136x1106.png)
*I did not click the Finish button (yet)*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.37.16-pm-2136x541.png)
*I added a new Contact Steak Holder*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.39.55-pm-2136x1108.png)
*I added a phone call activity to project-100000. The Timeline control displays details of the call.*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.40.10-pm-2136x1108.png)
*I clicked the Finish button*

![](/assets/images/modeldriven2/screenshot-2023-10-05-at-12.40.21-pm-2136x786.png)
*The Business Process Flow is complete*