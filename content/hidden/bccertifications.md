---
title: "Business Central Certifications"
description: "Exams MB-800 and MB-820, the Dynamics 365 Business Central Functional Consultant and Developer Associate certifications, and the MB-820T00 course, its twelve learning paths and its labs"
date: "2026-10-21"
categories: ["Business Central"]
tags: "certification, mb-820, mb-800, microsoft-learn, exam-prep"
hidden: true
slug: "bccertifications"
image: "/assets/images/bccertifications/posts-meta.svg"
---

I wanted to find out what Microsoft offers for someone who wants to prove Business Central skills. I found two exams, two certifications, two courses, twelve learning paths for the developer course, and a repository of labs. The names overlap, so this post sorts them out. I read the Microsoft Learn pages for each one in October 2026, and I give the page dates where Microsoft shows them.

:::brain-power Before you read on
A colleague who writes AL all day asks which Business Central exam to take. Another, who sets up companies, posting groups and dimensions but never opens VS Code, asks the same question. Should they take the same exam?
:::

## Five names for one goal

Microsoft uses the exam code for several different things. This table separates them.

| Name | What it is |
|---|---|
| **Certification** | The credential, with a badge. For developers it is *Microsoft Certified: Dynamics 365 Business Central Developer Associate*. |
| **Exam** | The proctored test that earns the certification. For developers it is **MB-820**. |
| **Study guide** | The list of skills the exam measures, with weightings. |
| **Course** | Training for the exam, built from learning paths. For developers it is **MB-820T00-A**. |
| **Learning path** | An ordered set of modules on one subject. A module is a set of short units, some of them videos. |

The functional consultant side follows the same pattern, with different names:

| | Developer | Functional consultant |
|---|---|---|
| **Certification** | [Microsoft Certified: Dynamics 365 Business Central Developer Associate](https://learn.microsoft.com/en-us/credentials/certifications/d365-business-central-developer-associate/) | [Microsoft Certified: Dynamics 365 Business Central Functional Consultant Associate](https://learn.microsoft.com/en-us/credentials/certifications/d365-business-central-functional-consultant-associate/) |
| **Exam** | MB-820 | MB-800 |
| **Study guide** | [Study guide for Exam MB-820](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/mb-820) | [Study guide for Exam MB-800](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/mb-800) |
| **Course** | [MB-820T00-A: Develop solutions with Dynamics 365 Business Central](https://learn.microsoft.com/en-us/training/courses/mb-820t00) | [MB-800T00-A: Manage business solutions with Microsoft Dynamics 365 Business Central](https://learn.microsoft.com/en-us/training/courses/mb-800t00) |

:::no-dumb-questions
**Q: Is the certification different from the exam?**

A: The certification is what I earn, and the exam is what I pass to earn it. Each of these certifications lists a single exam, so passing MB-820 earns the Developer Associate certification, and passing MB-800 earns the Functional Consultant Associate certification.

**Q: Do I have to take the course?**

A: No. The course is one way to prepare. The exam is the same however I prepare for it.
:::

## What the two exams have in common

The certification pages and study guides give the same details for both:

- The exam lasts 100 minutes and is proctored, and it is scheduled through Pearson VUE.
- A score of 700 or greater is required to pass.
- I can retake a failed exam 24 hours after the first attempt. Later retakes wait longer, and Microsoft publishes the retake policy separately.
- The level is Intermediate.
- Associate certifications expire every 12 months. I renew by passing a free online assessment on Microsoft Learn.
- Microsoft strongly recommends registering with a personal Microsoft account. If I register with a work or school account, my exam records are lost, and cannot be recovered, when I leave that organization.
- Each has a practice assessment and an exam sandbox, so I can see the question types before I sit the exam.

The price depends on the country or region where the exam is proctored. For the United States, the price I saw was $165 USD.

## MB-820: the developer exam

The study guide says a Business Central developer designs, develops, tests and maintains solutions based on Business Central, builds apps that extend it, integrates it with other applications such as the Microsoft Power Platform, and troubleshoots and debugs it. The skills measured apply from 10 June 2025.

| Skill area | Weight | What the study guide lists |
|---|---|---|
| Describe Business Central | 10-15% | Architecture, the core solution and extensions approach, the base app and the system app, and bringing an app to AppSource |
| Install, develop, and deploy for Business Central | 10-15% | Installing the development environment, configuration files, multiple extensions in one workspace, debugging, deployment and maintenance |
| Develop by using AL objects | 35-40% | Tables, pages and Role Centers; reports; XMLports; codeunits, events and interfaces; entitlements and permission sets; queries |
| Develop by using AL | 15-20% | UI customization and onboarding, development standards, and the AL language itself |
| Work with development tools | 10-15% | Test codeunits and the Test Toolkit, and telemetry |
| Integrate Business Central with other applications | 10-15% | REST services, JSON, APIs, OData actions and Read Scale-Out |

Over a third of the exam is AL objects. That is where I would spend most of my study time.

## MB-800: the functional consultant exam

The study guide describes a candidate who implements Business Central: configures the core application, creates companies, migrates data and works with the implementation team. It also mentions Copilot capabilities, including built-in agents. The skills measured apply from 30 June 2026.

| Skill area | Weight | What the study guide lists |
|---|---|---|
| Set up Business Central | 20-25% | Companies, security, number series, dimensions, workflows, and enabling Copilot and agent capabilities |
| Configure financials | 30-35% | General ledger setup, chart of accounts, posting groups, journals and bank accounts, payables, receivables, fixed assets |
| Configure sales and purchasing | 10-15% | Inventory, master data, pricing and discounts |
| Perform Business Central operations | 30-35% | Everyday tasks, purchases, sales, financial documents, journals and payments, fixed asset and inventory transactions |

The study guide's change log says the 30 June 2026 update removed "Describe Business Central integrations with other products" and added "Process inventory transactions".

:::pencil Sharpen your pencil
For each task, which exam's study guide lists it: MB-800, MB-820, or both?

1. Set up number series
2. Implement interfaces
3. Set up dimensions and dimension values
4. Aggregate data in query objects
5. Create permission sets

:::answer
1. **MB-800.** "Set up number series" is under "Set up core functionality".
2. **MB-820.** "Implement interfaces" is under "Develop codeunits".
3. **MB-800.** "Set up dimensions" is a topic group under "Set up Business Central".
4. **MB-820.** "Aggregate data in query objects" is under "Create queries in Business Central".
5. **Both.** MB-800 lists "Create permissions and permission sets" under "Manage security", and MB-820 lists "Create and extend permission sets". The developer writes them as AL objects, and the consultant sets them up and assigns them.
:::
:::

## The course: MB-820T00-A

[Course MB-820T00-A](https://learn.microsoft.com/en-us/training/courses/mb-820t00) is called "Develop solutions with Dynamics 365 Business Central". The course page shows it as Advanced, for the Developer role, in English, with a duration of 5 days. Its related certification is the Developer Associate certification. The page offers self-directed learning. It does not show a "Search for a training provider" link, which the MB-800 course page does. Training partners such as [Learning Tree](https://www.learningtree.com/courses/dynamics-365-business-central-developer-training) and [Global Knowledge](https://www.globalknowledge.com/en-be/courses/microsoft/business_analysis/m-mb820) list it as a five-day class.

The course is made of twelve learning paths. By my count they hold 79 modules in total. The page lists them in this order:

| # | Learning path | Modules | Level on the path page |
|---|---|---|---|
| 1 | [Get started with Microsoft Dynamics 365 Business Central](https://learn.microsoft.com/en-us/training/paths/get-started-dynamics-365-business-central/) | 3 | Beginner |
| 2 | [Use application development best practices in Microsoft Dynamics 365 Business Central](https://learn.microsoft.com/en-us/training/paths/use-application-development-business-central/) | 7 | Intermediate |
| 3 | [Deploy and configure Microsoft Dynamics 365 Business Central](https://learn.microsoft.com/en-us/training/paths/deploy-configure-dynamics-365-business-central/) | 10 | Intermediate |
| 4 | [Discover the foundation of customizing Microsoft Dynamics 365 Business Central](https://learn.microsoft.com/en-us/training/paths/foundation-customize-business-central/) | 8 | Beginner and Intermediate |
| 5 | [Build reports for Microsoft Dynamics 365 Business Central](https://learn.microsoft.com/en-us/training/paths/build-reports/) | 11 | Intermediate |
| 6 | [Learn the application foundation with the AL programming language for Microsoft Dynamics 365 Business Central](https://learn.microsoft.com/en-us/training/paths/application-foundation-al-language/) | 10 | Beginner and Intermediate |
| 7 | [Learn about the data management foundation in Microsoft Dynamics 365 Business Central](https://learn.microsoft.com/en-us/training/paths/data-management-foundation-business-central/) | 3 | Intermediate |
| 8 | [Interface with Microsoft Dynamics 365 Business Central](https://learn.microsoft.com/en-us/training/paths/interface-with-business-central/) | 6 | Intermediate |
| 9 | [Tailor roles and design the UI for Microsoft Dynamics 365 Business Central](https://learn.microsoft.com/en-us/training/paths/tailor-roles-design-ui/) | 5 | Intermediate |
| 10 | [Work with essential development standards for Microsoft Dynamics 365 Business Central](https://learn.microsoft.com/en-us/training/paths/essential-development-standards/) | 4 | Intermediate |
| 11 | [Continuous integration with Azure DevOps for Microsoft Dynamics 365 Business Central](https://learn.microsoft.com/en-us/training/paths/continuous-integration/) | 7 | Intermediate |
| 12 | [Develop using Power Apps and Power Automate for Dynamics 365 Business Central](https://learn.microsoft.com/en-us/training/paths/power-apps-power-automate-business-central/) | 5 | Intermediate |

Some of what the paths cover:

- **Path 1** starts with setting up a free trial and an introduction to what Business Central does. One unit I opened was an 8-minute demonstration video of the purchase cycle.
- **Path 2** covers application types, AppSource validation, monetization, SaaSification, upgrades, performance monitoring and test automation.
- **Path 3** is administration: environments, companies, data migration, users and security, email, Outlook, Teams and workflows.
- **Path 4** is the first path with AL objects: the development environment, tables and table extensions, pages and page extensions, entitlements and permission sets, an introduction to Dataverse, and debugging and deploying an extension.
- **Path 5** is reports, from components and data models to layouts, request pages, triggers, multilingual reports, data analysis mode and report extensions.
- **Path 6** is the AL language: statements, built-in functions, errors, procedures, codeunits, events and triggers, interfaces, data manipulation and translations.
- **Path 7** covers file management, XMLports and queries.
- **Path 8** covers web services, APIs, REST, Azure Functions, control add-ins and barcode scanning.
- **Paths 9 to 12** cover Role Centers, assisted setup and notifications, table types and master data, Git, Docker, Azure Pipelines and Azure Boards, and the Power Platform.

The paths do not line up one to one with the six skill areas of the exam. I would use the study guide as the checklist and the paths as the reading.

The MB-800 course, [MB-800T00-A: Manage business solutions with Microsoft Dynamics 365 Business Central](https://learn.microsoft.com/en-us/training/courses/mb-800t00), is shorter. It is also 5 days, Intermediate, for the Functional Consultant role, and it has five learning paths. Their names refer to setting up Business Central, configuring financials, configuring sales and purchasing, processing sales and purchasing, and processing financial operations. Its page offers both self-directed learning and a link to search for a training provider.

:::watch-it The hosted labs are for the course, not for the exam
The [MB-820 labs](https://github.com/MicrosoftLearning/MB-820-Business-Central-Developer-Certification) belong to the instructor-led course. The repository README is a generic template addressed to trainers, and it says the lab files are for the course labs, which use a hosted environment. The labs are still public, and I can follow them on my own. They are not a substitute for the study guide, because there are only seven of them.
:::

## The MB-820 labs

The [Instructions/Labs folder](https://github.com/MicrosoftLearning/MB-820-Business-Central-Developer-Certification/tree/master/Instructions/Labs) of the repository has seven labs, numbered 0 to 6:

| Lab | Title |
|---|---|
| 0 | Setup your environment and software |
| 1 | Create an extension containing a table, table extension, pages, and page extension |
| 2 | Implement installation and upgrade code in an extension |
| 3 | Add a Rolecenter and Profile |
| 4 | Add a column and layout to a base report |
| 5 | Develop custom API pages and queries |
| 6 | Setup source control Git in an extension |

The folder also has a `Lab Solutions` folder with finished code for Labs 1 to 5 (the folders are named Vendor Rating, InstallationUpgradeCode, Rolecenter, Reporting and APIs) and a VS Code workspace file, `MB820 - Labs.code-workspace`. Lab 6, the Git lab, has no solution folder.

Lab 0 lists its prerequisites as a Business Central SaaS sandbox and Visual Studio Code with the AL Language extension. It also describes how to create a sandbox in the Business Central administration center, and it mentions a container-based sandbox as an alternative. That is the setup I follow in [Part 1 of my MB-820 series](/posts/mb820-1/), where the main trap was the environment name in `launch.json`.

## The MB-800 labs

The [MB-800 labs repository](https://github.com/MicrosoftLearning/MB-800-Business-Central-Functional-Consultant) is much bigger: 26 labs in its [Instructions/Labs folder](https://github.com/MicrosoftLearning/MB-800-Business-Central-Functional-Consultant/tree/master/Instructions/Labs), numbered 00 to 25, with some Excel and RapidStart files for the data migration labs. The [published lab site](https://microsoftlearning.github.io/MB-800-Business-Central-Functional-Consultant/) lists them under module headings, but several headings do not match their labs, so I group the labs by what they do:

| Labs | What they cover |
|---|---|
| 00 | Validate lab environment |
| 01 to 05 | Create and configure a new company, create and manage user profiles, perform actions with Copilot, migrate master data to a new company, set up and use a purchase approval workflow |
| 06 to 13 | Item costing, the chart of accounts and posting groups, accounts payable, general journals, cash management, dimensions, financial reporting and the accounting period |
| 14 to 17 | Purchasing, accounts receivable, inventory and sales |
| 18 to 22 | Basic tasks, processing purchases and sales, suggesting number series with Copilot, and configuring Copilot and agent capabilities |
| 23 to 25 | Finance operations, reconciling customer and vendor entries, and cash management and general journal entries |

These follow the MB-800 study guide closely, which fits an exam that is mostly configuration and everyday operations.

## Above and below the Associate level

Microsoft groups certifications into levels: Fundamentals, Associate and Expert. Both Business Central certifications are Associate certifications, and neither level next to them is Business Central specific.

| Level | Business Central certifications |
|---|---|
| **Expert** | None. The nearest is the Agentic AI Business Solutions Architect Expert (exam AB-100), which accepts MB-800 or MB-820 as a prerequisite |
| **Associate** | Functional Consultant Associate (MB-800) and Developer Associate (MB-820) |
| **Fundamentals** | None |

Microsoft's [certification poster](https://arch-center.azureedge.net/Credentials/Certification-Poster_en-us.pdf) shows the same picture on one page. It is marked as last updated in August, with a 2026 copyright. It arranges certifications in columns by area (Cloud and AI Platforms, AI Business Solutions, and Security) and in rows by level (Fundamentals, Role-based, Specialty and Business). Both Business Central certifications sit in the AI Business Solutions column, in the role-based row, next to the Dynamics 365 Finance, Supply Chain Management and Finance and Operations certifications. The Fundamentals row of that column shows only the Microsoft 365 Copilot and Agent Administration Fundamentals and the Power Platform Fundamentals, with no Dynamics 365 or Business Central entry. The Agentic AI Business Solutions Architect is the only architect shown for business applications, marked with a star for Expert and a lock for prerequisites.

The poster's Business row, which is for people in business roles, has two AI certifications: AI Business Professional (AB-730) and AI Transformation Leader (AB-731). I opened only the first. [Microsoft Certified: AI Business Professional](https://learn.microsoft.com/en-us/credentials/certifications/ai-business-professional/) is Beginner level, for Administrator and Business User roles, and its exam lasts 45 minutes. It is about using generative AI tools and Microsoft 365 Copilot without writing code. It has nothing to do with Business Central, so it is not a step towards MB-800 or MB-820.

**Below the Associate level.** Microsoft's Dynamics 365 Fundamentals certifications, MB-910 (CRM) and MB-920 (ERP), were retired on 31 December 2025. The ERP one covered Finance and Supply Chain Management, not Business Central. Microsoft says that fundamentals certifications that were already earned do not expire and stay on the transcript. So for Business Central, the Associate certification is where the path starts.

**Above the Associate level.** Microsoft's role guidance lists the Business Central Developer Associate under solution architects, but there is no Business Central architect exam. The certification that comes closest is [Microsoft Certified: Agentic AI Business Solutions Architect Expert](https://learn.microsoft.com/en-us/credentials/certifications/agentic-ai-business-solutions-architect/):

- The required exam is AB-100.
- The page says I must also earn at least one of the prerequisite Associate certifications it lists. The list includes MB-800 and MB-820, along with certifications such as the Power Platform Developer Associate and several Dynamics 365 consultant and AI certifications.
- It is about designing AI-powered and agentic solutions across Dynamics 365, the Power Platform, Copilot Studio and Foundry. It is not about the architecture of Business Central itself.
- The page says updates to AB-100 are coming on 16 November 2026.

The [AB-100 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ab-100) has three skill areas, as of 14 October 2026:

| Skill area | Weight |
|---|---|
| Plan AI-powered business solutions | 25-30% |
| Design AI-powered business solutions | 25-30% |
| Deploy AI-powered business solutions | 40-45% |

The largest area, deployment, covers monitoring and tuning agents, testing, the application lifecycle management (ALM) process for agents and models, and responsible AI, security and governance. Design includes Copilot Studio agents and agent extensibility with the Model Context Protocol. The guide names Dynamics 365 apps for finance and supply chain, for customer experience and service, Dynamics 365 Sales and Dynamics 365 Contact Center. I could not find Business Central named anywhere in it. The architect exam builds on an Associate certification, but it does not test Business Central.

For preparation, the [AB-100 exam page](https://learn.microsoft.com/en-us/credentials/certifications/exams/ab-100/) points to one course and one learning path:

- **[Course AB-100T00-A: Architecting agentic AI business solutions](https://learn.microsoft.com/en-us/training/courses/ab-100t00).** It is Advanced, for the Solution Architect role, and listed as 3 days. The course page says it is not a test-preparation course. It builds architectural judgment and is a recommended step before focused AB-100 study.
- **[Architect AI solutions for business productivity](https://learn.microsoft.com/en-us/training/paths/architect-agentic-ai-business-solutions/).** This is the learning path inside the course. It is Advanced, for the Solution Architect role, with 11 modules. Their titles follow the study guide's topic groups: analyze requirements, design the AI strategy, evaluate costs and benefits, design agents, design extensibility, orchestrate prebuilt agents, monitor and tune, test, design the ALM process, and design responsible AI, security and governance. It starts with an introduction module.

The exam page also says the English version of the exam was updated on 14 October 2026, and it shows no retirement date. The certification page says no learning paths or modules are available yet for the certification, which the exam page contradicts. I would trust the exam page, since it is the one that lists the path.

The older architect certifications are gone. MB-700 (Dynamics 365: Finance and Operations Apps Solution Architect Expert) and PL-600 (Power Platform Solution Architect Expert) were retired on 30 June 2026, according to Microsoft's retirement list. The role guidance page, which I read with an August 2026 date, still lists them. The retirement list is the more specific page, so I treated it as the current one.

## Where I would start

This is my view, not Microsoft's.

- **If I write AL,** I would take MB-820. I would read the study guide first, work through the labs, and use the learning paths for topics I have not met.
- **If I configure Business Central without writing code,** MB-800 is the match. The audience profile in its study guide describes exactly that work.
- **If I do both,** the two exams overlap on permission sets and a few other topics, but they test different knowledge. A developer who knows the business processes writes better extensions, and a consultant who knows what an extension can do designs better solutions.

:::bullet-points Recap
- **MB-820** earns the Developer Associate certification, and **MB-800** earns the Functional Consultant Associate certification.
- Both exams are 100 minutes and proctored, need a score of 700 or greater to pass, and lead to certifications that renew every 12 months.
- Over a third of MB-820 is AL objects, and roughly two thirds of MB-800 is financials and operations.
- There is no Fundamentals or Expert certification specific to Business Central. The Dynamics 365 Fundamentals certifications were retired on 31 December 2025, and the nearest Expert certification, Agentic AI Business Solutions Architect, accepts MB-800 or MB-820 as a prerequisite.
- **MB-820T00-A** is twelve learning paths and about 79 modules. The paths do not match the exam skill areas one to one.
- The MB-820 labs repository has seven labs, 0 to 6, and the MB-800 repository has 26, 00 to 25. Both were written for the instructor-led courses.
:::

:::watch-it Check the live pages before you book
Microsoft updates these pages, and the "Prepare for the exam" lists on the certification pages load dynamically, so I could not read them. The weightings, dates and prices in this post are from October 2026. I found no retirement notice for either exam on the certification pages, and a web search found none either, but I would look at the live MB-820 and MB-800 pages before scheduling.
:::

## References

- [Microsoft Certified: Dynamics 365 Business Central Developer Associate](https://learn.microsoft.com/en-us/credentials/certifications/d365-business-central-developer-associate/)
- [Microsoft Certified: Dynamics 365 Business Central Functional Consultant Associate](https://learn.microsoft.com/en-us/credentials/certifications/d365-business-central-functional-consultant-associate/)
- [Study guide for Exam MB-820](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/mb-820#skills-at-a-glance)
- [Study guide for Exam MB-800](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/mb-800)
- [Course MB-820T00-A: Develop solutions with Dynamics 365 Business Central](https://learn.microsoft.com/en-us/training/courses/mb-820t00)
- [Course MB-800T00-A: Manage business solutions with Microsoft Dynamics 365 Business Central](https://learn.microsoft.com/en-us/training/courses/mb-800t00)
- [MB-820 Business Central Developer Certification labs](https://github.com/MicrosoftLearning/MB-820-Business-Central-Developer-Certification)
- [MB-820 labs: Online Hosted Instructions](https://microsoftlearning.github.io/MB-820-Business-Central-Developer-Certification/)
- [MB-800 Business Central Functional Consultant labs](https://github.com/MicrosoftLearning/MB-800-Business-Central-Functional-Consultant)
- [MB-800 labs: published lab site](https://microsoftlearning.github.io/MB-800-Business-Central-Functional-Consultant/)
- [Microsoft Certified: Agentic AI Business Solutions Architect Expert](https://learn.microsoft.com/en-us/credentials/certifications/agentic-ai-business-solutions-architect/)
- [Exam AB-100: Agentic AI Business Solutions Architect Expert](https://learn.microsoft.com/en-us/credentials/certifications/exams/ab-100/)
- [Course AB-100T00-A: Architecting agentic AI business solutions](https://learn.microsoft.com/en-us/training/courses/ab-100t00)
- [Learning path: Architect AI solutions for business productivity](https://learn.microsoft.com/en-us/training/paths/architect-agentic-ai-business-solutions/)
- [Study guide for Exam AB-100: Agentic AI Business Solutions Architect](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ab-100)
- [Microsoft Certified: AI Business Professional](https://learn.microsoft.com/en-us/credentials/certifications/ai-business-professional/)
- [Microsoft certification poster (PDF)](https://arch-center.azureedge.net/Credentials/Certification-Poster_en-us.pdf)
- [Microsoft Credentials for Different Roles in Dynamics 365](https://learn.microsoft.com/en-us/dynamics365/guidance/roles/certifications)
- [Exam and assessment lab retirement](https://learn.microsoft.com/en-us/credentials/support/retired-certification-exams)
- [MB-820 Part 1: hello world in a Business Central sandbox](/posts/mb820-1/)
