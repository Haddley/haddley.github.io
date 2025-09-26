---
title: "Power Apps (Part 23)"
description: "The Configuration Migration tool"
date: "2025-09-20"
category: "Development"
image: "/assets/images/powerapps23configurationmigrationtool/hero.png"
tags: ["ai","ml","power platform"]
---

# Power Apps (Part 23)
## The Configuration Migration tool

![](/assets/images/powerapps23configurationmigrationtool/office-365-icon-500x500.png)
*This file is licensed under the Creative Commons Attribution 4.0 International license.*


The Configuration Migration tool is used to transport configuration and data from one environment to another.

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2024-12-28-183528-1366x724.png)
*Install the Power Platform Tools Visual Studio Code Extension*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2024-12-28-183601-1366x726.png)
*I clicked the Install button*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2024-12-28-184619-1366x730.png)
*I opened terminal, typed pac and clicked enter*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-133511-1365x360.png)
*In this example there are two Power Platform Environments.*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-134203-1366x725.png)
*I entered pac tool CMT and clicked the enter key*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-134453-1366x647.png)
*I created a Power Platform solution in the Developer Environment*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-134538-1366x522.png)
*I added a ToDo table*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-135049-1366x649.png)
*I updated the Name column of the ToDo list*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-135238-1366x649.png)
*I added a Description column*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-135347-1366x653.png)
*I added a Contact lookup column*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-135825-1366x652.png)
*I added John Doe as a Contact. I added Jane Doe as a Contact*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-135923-1365x345.png)
*Notice the unique Contact id values assigned to each Contact*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-140012-1366x567.png)
*There were no Contacts in the Sandbox solution*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-140137-1361x613.png)
*I navigated to the ToDo table in the Developer environment*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-140349-1366x646.png)
*I added a To do item for Jane.I added a To do item for John*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-164445-763x546.png)
*I returned to the Configuration Migration Tool selecting the Create schema option*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-164528-761x549.png)
*I selected the Display list of available organizations (Environments)*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-164753-766x207.png)
*I selected the Developer environment*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-192231-802x644.png)
*I selected the Content Migration Solution and the ToDo entity*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-165049-803x58.png)
*I clicked the Add Entity button*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-170421-803x642.png)
*I saved the generated schema file*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-170445-801x743.png)
*I clicked Yes to export the contents of the ToDo list*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-170600-762x625.png)
*I named the exported data file*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-170645-761x626.png)
*The data was saved*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-170708-763x626.png)
*The export completed*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-170749-760x549.png)
*I selected the Import data option*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-170823-765x556.png)
*I clicked the Login button*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-170858-764x294.png)
*I selected the Sandbox environment*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-170949-764x626.png)
*I selected the exported ToDo list data*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-171123-763x627.png)
*The import failed.*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-171914-1366x646.png)
*I exported the Content Migration solution from the Developer environment*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-172115-1361x181.png)
*I downloaded the exported solution*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-172240-1366x649.png)
*I imported the solution into the Sandbox environment*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-172404-1366x219.png)
*The solution was imported successfully*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-172521-764x627.png)
*I imported the ToDo data*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-172659-1362x650.png)
*The Contact lookup column was not populated*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-172758-765x550.png)
*I selected the Create schema option and clicked the Continue button*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-172822-765x547.png)
*I clicked the Login button*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-172948-802x644.png)
*I selected the Contact list, clicked the Add Entity button and then clicked the Save and Export button*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-173038-793x638.png)
*I saved the Contact table schema*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-173103-801x642.png)
*I exported the contents of the Contacts list*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-173155-763x622.png)
*The export file was created and I clicked the Exit button*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-173250-763x626.png)
*I imported the Contact data into the Sandbox environment*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-173325-763x625.png)
*The import was successful*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-173359-1366x655.png)
*I checked that the Contact records had been imported*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-173448-1366x593.png)
*Notice that the Contact lookup column was not populated*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-173551-764x623.png)
*I imported the ToDo list data again*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-173743-765x626.png)
*The import was successful*

![](/assets/images/powerapps23configurationmigrationtool/screenshot-2025-01-01-173905-1365x602.png)
*The ToDo content was imported successfully*

![](/assets/images/powerapps23configurationmigrationtool/476486061-1657400034846768-2157986925593245908-n-1019x412.png)
*Schema should be updated replacing createdon with overriddencreatedon*

![](/assets/images/powerapps23configurationmigrationtool/476486315-633631506115690-4193477270807083409-n-1023x411.png)
*The data.xml file should be updated to replace createdon with overriddencreatedonNotice that the created on field will only be set when the record is being imported for the first time*
