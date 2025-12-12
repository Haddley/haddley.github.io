import { getAllMarkdownPosts } from "./markdown";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  categories?: string[]; // Automated multi-category classification
  tags: string[];
  image: string;
  hidden?: boolean;
}
/*
export const blogPosts: BlogPost[] = [

  
    {
    slug: 'copilotstudiobctools',
    title: 'Copilot Studio Agent Tools',
    description: 'Connected to Business Central',
    date: '2025-09-24',
    categories: ["Microsoft Dynamics", "Business Central", "Power Platform", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'mcpserver2',
    title: 'Model Context Protocol (Part 2)',
    description: 'Business Central',
    date: '2025-09-21',
    categories: ["Microsoft Dynamics", "Business Central", "TypeScript", "DevOps"],
    tags: [],
    image: '/assets/images/mcpserver2/mcp-1024x1024.png',
    hidden: true
  },
  {
    slug: 'microsoftdynamics365appforoutlook',
    title: 'Microsoft Dynamics 365 App for Outlook',
    description: 'References',
    date: '2025-09-20',
    categories: ["Microsoft Dynamics", "Power Platform"],
    tags: [],
    image: '/assets/images/microsoftdynamics365appforoutlook/office-365-icon-500x500.png',
    hidden: true
  },
  {
    slug: 'macscreensharing',
    title: 'Mac Screen Sharing',
    description: 'Screen Sharing VNC',
    date: '2025-08-18',
    categories: [],
    tags: [],
    image: '/assets/images/apple-logo-black.svg'
  },
  {
    slug: 'mcpserver',
    title: 'Model Context Protocol (Part 1)',
    description: 'Typescript quick start',
    date: '2025-08-13',
    categories: ["TypeScript", "AI"],
    tags: [],
    image: '/assets/images/mcp-1024x1024.png'
  },
  {
    slug: 'syntexautofill',
    title: 'SharePoint Syntex ',
    description: 'Autofill columns',
    date: '2025-07-30',
    categories: ["Microsoft 365"],
    tags: [],
    image: '/assets/images/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png'
  },
  {
    slug: 'ollamadeepsekr1applemacbookinstall',
    title: 'DeepSeek R1',
    description: 'Running locally',
    date: '2025-05-24',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/254932576-0d0b44e2-8f4a-4e99-9b52-a5c1c741c8f7-844x844.png'
  },
  {
    slug: 'promptdialog3',
    title: 'Business Central (Part 29) PromptDialog 3',
    description: 'Prompt Dialog Markdown',
    date: '2024-05-24',
    categories: ["AI", "Microsoft Dynamics", "Business Central", "Azure"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'promptdialog2',
    title: 'Business Central (Part 28)',
    description: 'Prompt Dialog (Part 2)',
    date: '2024-05-24',
    categories: ["Microsoft Dynamics", "Business Central", "AI", "Azure"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'promptdialog',
    title: 'Business Central (Part 27)',
    description: 'Prompt Dialog (Part 1)',
    date: '2024-05-24',
    categories: ["Microsoft Dynamics", "Business Central", "AI", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'internetofthings3',
    title: 'Internet of Things (Part 3)',
    description: 'Arduino Nano 33 BLE Sense',
    date: '2025-03-01',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/iot-microchip.svg'
  },
  {
    slug: 'azureopenal',
    title: 'Azure AI service',
    description: 'Azure OpenAl',
    date: '2025-02-04',
    categories: ["Azure", "AI"],
    tags: [],
    image: '/assets/images/azurex70x75.svg'
  },
  {
    slug: 'businesscentralpart26integrationtable',
    title: 'Business Central (Part 26)',
    description: 'Integration Tables',
    date: '2024-12-22',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics", "Power Platform"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'powerapps23configurationmigrationtool',
    title: 'Power Apps (Part 23)',
    description: 'The Configuration Migration tool',
    date: '2025-01-01',
    categories: ["Power Platform"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'powerpages3',
    title: 'Power Pages (Part 3)',
    description: 'Customer Order Lines',
    date: '2024-12-20',
    categories: [],
    tags: [],
    image: '/assets/images/powerpages-scalable.svg'
  },
  {
    slug: 'powerpages2',
    title: 'Power Pages (Part 2)',
    description: 'View, create, and edit orders',
    date: '2024-12-20',
    categories: [],
    tags: [],
    image: '/assets/images/powerpages-scalable.svg'
  },
  {
    slug: 'businesscentralpart25integratingwithdataverseusingdataflows',
    title: 'Business Central (Part 25) Integrating with Dataverse using Dataflows',
    description: 'Integrating with Dataverse using Dataflows',
    date: '2024-12-01',
    categories: ["Power Platform", "Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'langflow1',
    title: 'Langflow (Part 1)',
    description: 'References',
    date: '2024-10-30',
    categories: ["Python", "AI"],
    tags: [],
    image: '/assets/images/85702467-200x200.png'
  },
  {
    slug: 'powerpages1',
    title: 'Power Pages (Part 1)',
    description: 'Sales Orders',
    date: '2024-10-26',
    categories: ["Microsoft Dynamics", "Business Central", "Power Platform", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/powerpages-scalable.svg'
  },
  {
    slug: 'promptflow6',
    title: 'Prompt Flow (Part 6)',
    description: 'Quick start',
    date: '2024-09-01',
    categories: ["AI", "Python"],
    tags: [],
    image: '/assets/images/logo.svg'
  },
  {
    slug: 'promptflow5',
    title: 'Prompt Flow (Part 5)',
    description: 'Quick start',
    date: '2024-09-01',
    categories: ["AI", "DevOps", "Python"],
    tags: [],
    image: '/assets/images/logo.svg'
  },
  {
    slug: 'langchainagents',
    title: 'LangChain Agents',
    description: 'Agents',
    date: '2024-08-25',
    categories: ["AI", "Python"],
    tags: [],
    image: '/assets/images/langchain.svg'
  },
  {
    slug: 'phpsetup',
    title: 'PHP Setup',
    description: 'Setup',
    date: '2024-08-25',
    categories: [],
    tags: [],
    image: '/assets/images/php-logo.svg'
  },
  {
    slug: 'dataverseadvancedreportssetup',
    title: 'Microsoft Dataverse Advanced Reports Setup',
    description: 'Microsoft Dataverse Advanced Reports Setup',
    date: '2024-08-10',
    categories: ["SQL", "Microsoft Dynamics", "Power Platform"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'powerautomatereports',
    title: 'Microsoft Power Automate Reports',
    description: 'A Flow that emails a Report',
    date: '2024-07-19',
    categories: ["Power Platform"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'dataversereports',
    title: 'Microsoft Dataverse Reports',
    description: 'Creating a Dataverse Report',
    date: '2024-07-19',
    categories: ["Power Platform"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'promptflow4',
    title: 'Prompt Flow (Part 4)',
    description: 'Planning',
    date: '2024-08-24',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/logo.svg'
  },
  {
    slug: 'promptflow3',
    title: 'Prompt Flow (Part 3)',
    description: 'Semantic Kernel',
    date: '2024-08-24',
    categories: ["AI", "Python"],
    tags: [],
    image: '/assets/images/logo.svg'
  },
  {
    slug: 'promptflow2',
    title: 'Prompt Flow (Part 2)',
    description: 'Docker',
    date: '2024-06-12',
    categories: ["DevOps", "AI", "Python"],
    tags: [],
    image: '/assets/images/logo.svg'
  },
  {
    slug: 'promptflow1',
    title: 'Prompt Flow (Part 1)',
    description: 'Setup',
    date: '2024-06-11',
    categories: ["AI", "Python", "DevOps", "Azure"],
    tags: [],
    image: '/assets/images/logo.svg'
  },
  {
    slug: 'customtvirtualtables',
    title: 'Custom Virtual Tables',
    description: 'Customer Content Virtual Tables',
    date: '2024-05-07',
    categories: ["Power Platform", "AI", "Microsoft Dynamics", "Business Central"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'blogcopilotstudio',
    title: 'Blog Copilot Studio',
    description: 'Blog Copilot',
    date: '2024-03-24',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics", "Power Platform"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'customcopilotstudio',
    title: 'Custom Copilot Studio',
    description: 'Customer Copilot',
    date: '2024-03-23',
    categories: ["Microsoft Dynamics", "Business Central", "Power Platform", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'configurecopilotsinglesignonforweb',
    title: 'Configure Copilot single sign-on for Web',
    description: 'Publish|Configure channels',
    date: '2024-03-16',
    categories: ["Power Platform", ".NET", "Microsoft 365"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'customizedefaultcanvas',
    title: 'Copilot Studio',
    description: 'Customize the look and feel of the bot default canvas',
    date: '2024-03-11',
    categories: [],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'copilotembedcode',
    title: 'Copilot Embed Code',
    description: 'An HTML page to host my Blog Copilot',
    date: '2024-03-11',
    categories: [],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'staticwebapp.config.json',
    title: 'staticwebapp.config.json',
    description: 'staticwebapp.config.json',
    date: '2024-03-10',
    categories: ["Azure"],
    tags: [],
    image: '/assets/images/azurex70x75.svg'
  },
  {
    slug: 'codespacesauthentication',
    title: 'Codespaces and Authentication',
    description: 'Adding a NavBar and staticwebapp.config.json',
    date: '2024-03-06',
    categories: ["React", "Azure", "DevOps"],
    tags: [],
    image: '/assets/images/logo512-512x512.png'
  },
  {
    slug: 'modeldrivenpurchaseorderlines',
    title: 'Model Driven Purchase Order Lines',
    description: 'manage Business Central Purchase Order Lines',
    date: '2024-03-03',
    categories: ["Microsoft Dynamics", "Business Central", "Power Platform"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'modeldrivenpurchaseorders',
    title: 'Model Driven Purchase Orders',
    description: 'Quick View',
    date: '2024-03-02',
    categories: ["Microsoft Dynamics", "Business Central", "Power Platform", "AI"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'cloudflow',
    title: 'Cloud Flow',
    description: 'A Topic that uses the Business Central Connector',
    date: '2024-02-26',
    categories: ["Power Platform", "Microsoft Dynamics", "Business Central", "Azure"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'topics',
    title: 'Copilot',
    description: 'Topics',
    date: '2024-02-25',
    categories: ["Power Platform", "Microsoft Dynamics", "Business Central"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'pluginactions',
    title: 'Plugin Actions',
    description: 'A comprehensive guide covering plugin actions',
    date: '2024-02-24',
    categories: ["Power Platform"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'addapurchaseorder',
    title: 'Add a Purchase Order',
    description: 'I used Patch to add a Business Central Purchase Order and to add Purchase Order Lines',
    date: '2024-02-21',
    categories: ["Microsoft Dynamics", "Business Central", "Power Platform"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'addanitem',
    title: 'Add an Item',
    description: 'I used Patch to add a Business Central Item',
    date: '2024-02-17',
    categories: ["Microsoft Dynamics", "Business Central", "Power Platform"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'azurereactstaticweb-app',
    title: 'Azure React Static Web App',
    description: 'Azure Static Web App',
    date: '2024-01-08',
    categories: ["React", "Azure", ".NET"],
    tags: [],
    image: '/assets/images/logo512-512x512.png'
  },
  {
    slug: 'businesscentralvirtualtable',
    title: 'Business Central Virtual Table',
    description: 'Microsoft Dynamics 365 Business Central Virtual Tables for Microsoft Dataverse',
    date: '2024-01-12',
    categories: ["Microsoft Dynamics", "Business Central", "Power Platform", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'createactionbasedonaflow',
    title: 'Create action based on a flow',
    description: 'Created from the Business Central user interface',
    date: '2024-01-04',
    categories: ["Power Platform", "Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'businesscentralpowerautomateflow',
    title: 'Business Central Power Automate Flow',
    description: 'Business Central includes a Microsoft Power Automate license',
    date: '2024-01-02',
    categories: ["Microsoft Dynamics", "Business Central", "Power Platform", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'gingerbreadhouse',
    title: 'Gingerbread House',
    description: 'holiday.py',
    date: '2023-12-26',
    categories: ["Python"],
    tags: [],
    image: '/assets/images/raspberry-pi-logo.svg'
  },
  {
    slug: 'businesscentralmicrosoftgraph',
    title: 'Business Central Microsoft Graph',
    description: 'Financials',
    date: '2023-12-18',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft 365", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'salesinvoice',
    title: 'Sales Invoice',
    description: 'How the Inventory, Sale, Tax and Receivables accounts are determined',
    date: '2023-12-14',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'purchaseinvoice',
    title: 'Purchase Invoice',
    description: 'Purchase Invoice',
    date: '2023-12-14',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'generalpostingsetup',
    title: 'General Posting Setup',
    description: 'Which accounts payable ledger account',
    date: '2023-12-14',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'customerpostinggroup',
    title: 'Customer Posting Group',
    description: 'Which accounts receivable account?',
    date: '2023-12-14',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'vendorpostinggroup',
    title: 'Vendor Posting Group',
    description: 'Sub-ledgers',
    date: '2023-12-12',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'generalledger',
    title: 'General Ledger',
    description: 'Purchase',
    date: '2023-12-11',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'hands-on-lab3.1',
    title: 'Hands-on-Lab 3.1',
    description: 'Set Up Finance Management',
    date: '2023-12-04',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'hands-on-lab2.3',
    title: 'Hands-on-Lab 2.3',
    description: 'Set up dimensions',
    date: '2023-12-04',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'hands-on-lab2.2',
    title: 'Hands-on-Lab 2.2',
    description: 'Migrate master data to a new company',
    date: '2023-11-22',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'hands-on-lab2.1',
    title: 'Hands-on-Lab 2.1',
    description: 'Create and configure a new company',
    date: '2023-11-22',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/hands-on-lab2.1/dynamics365-color.svg'
  },
  {
    slug: 'dynamicssales3',
    title: 'Dynamics 365 Sales (Part 3)',
    description: 'Adding a Warranty table',
    date: '2023-10-21',
    categories: ["Microsoft Dynamics", "Power Platform"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'dynamicssales2',
    title: 'Dynamics 365 Sales (Part 2)',
    description: 'The Lead to Opportunity Sales Process',
    date: '2023-10-21',
    categories: ["Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'dynamicssales1',
    title: 'Dynamics 365 Sales (Part 1)',
    description: ' the Account|Sales Insights form',
    date: '2023-10-21',
    categories: ["Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'modeldriven4',
    title: 'Model Driven Apps (Part 4)',
    description: 'Power FX',
    date: '2023-10-09',
    categories: ["Power Platform"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'modeldriven3',
    title: 'Model Driven Apps (Part 3)',
    description: 'JavaScript to update a Business Process Flow Stage',
    date: '2023-10-08',
    categories: ["JavaScript", "Power Platform", "AI"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'modeldriven2',
    title: 'Model Driven Apps (Part 2)',
    description: 'Environments',
    date: '2023-10-05',
    categories: ["Power Platform", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'modeldriven1',
    title: 'Model Driven Apps (Part 1)',
    description: 'Users',
    date: '2023-09-18',
    categories: ["Power Platform", "DevOps", "Microsoft 365"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'ashorthistory',
    title: 'A Short History of Microsoft Dynamics and Microsoft Dataverse',
    description: 'Microsoft Dynamics and Microsoft Dataverse',
    date: '2023-09-09',
    categories: ["Microsoft Dynamics", "Power Platform", "Microsoft 365", "Business Central"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'mapextension',
    title: 'Map Extension',
    description: 'Map Extension',
    date: '2023-09-01',
    categories: ["Microsoft Dynamics", "Business Central", "Maps", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'rewardsextension',
    title: 'Rewards Extension',
    description: 'Rewards Extension',
    date: '2023-08-30',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'al-go-pte',
    title: 'AL-Go-PTE',
    description: 'Extensions',
    date: '2023-08-26',
    categories: ["Microsoft Dynamics", "Business Central", "DevOps", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'financialoperationspurchaseinvoice',
    title: 'Financial Operations Purchase Invoice',
    description: 'Payment Journals',
    date: '2023-08-20',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'warehousemanagementputaway',
    title: 'Warehouse Management Put away',
    description: 'Warehouse Management - Put-away',
    date: '2023-08-19',
    categories: ["Microsoft Dynamics", "Business Central"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'businesscentraladmincenter',
    title: 'Business Central Admin Center',
    description: 'The Business Central Administration Center',
    date: '2023-08-18',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'businesscentralcanvasapps',
    title: 'Business Central Canvas Apps',
    description: 'Microsoft Dynamics 365 Business Central',
    date: '2023-08-14',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics", "Power Platform"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'dynamicstrialsignup',
    title: 'Dynamics Trial Signup',
    description: 'Microsoft Signup',
    date: '2023-08-14',
    categories: ["Microsoft Dynamics", "Business Central"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'spring-boot-6',
    title: 'Java Spring Boot (Part 6)',
    description: 'GitHub',
    date: '2023-10-31',
    categories: ["Java"],
    tags: [],
    image: '/assets/images/spring-framework-logo-70-no.svg'
  },
  {
    slug: 'spring-boot-5',
    title: 'Java Spring Boot (Part 5)',
    description: 'Spring for GraphQL',
    date: '2023-10-30',
    categories: ["Java", "React", "SQL", "AWS"],
    tags: [],
    image: '/assets/images/spring-framework-logo-70-no.svg'
  },
  {
    slug: 'spring-boot-4',
    title: 'Java Spring Boot (Part 4)',
    description: 'ModelAndView',
    date: '2023-10-29',
    categories: ["Java", "AI"],
    tags: [],
    image: '/assets/images/spring-framework-logo-70-no.svg'
  },
  {
    slug: 'spring-boot-3',
    title: 'Java Spring Boot (Part 3)',
    description: 'SpringdatajpaApplication.java',
    date: '2023-10-28',
    categories: ["Java", "Azure"],
    tags: [],
    image: '/assets/images/spring-framework-logo-70-no.svg'
  },
  {
    slug: 'spring-boot-2',
    title: 'Java Spring Boot (Part 2)',
    description: 'References',
    date: '2023-10-26',
    categories: ["Azure", "Java", "DevOps"],
    tags: [],
    image: '/assets/images/spring-framework-logo-70-no.svg'
  },
  {
    slug: 'promptengineering',
    title: 'Meta\'s Llama 2 (Part 2)',
    description: 'Prompt Engineering',
    date: '2023-08-08',
    categories: [],
    tags: [],
    image: '/assets/images/mediamodifier-design.png'
  },
  {
    slug: 'lmstudio',
    title: 'Meta\'s Llama 2 (Part 1)',
    description: 'LM Studio',
    date: '2023-08-05',
    categories: [],
    tags: [],
    image: '/assets/images/mediamodifier-design.png'
  },
  {
    slug: 'llamacorp',
    title: 'LlamaCpp',
    description: 'Accessing the llama.cpp model from Python',
    date: '2023-08-03',
    categories: ["AI", "Python"],
    tags: [],
    image: '/assets/images/jupyter.svg'
  },
  {
    slug: 'colorization',
    title: 'Colorization',
    description: 'colorization.ipynb',
    date: '2023-08-03',
    categories: ["Python", "AI"],
    tags: [],
    image: '/assets/images/jupyter.svg'
  },
  {
    slug: 'stablediffusion',
    title: 'Stable Diffusion',
    description: 'Stable Diffusion',
    date: '2023-08-01',
    categories: ["Python", "AI"],
    tags: [],
    image: '/assets/images/jupyter.svg'
  },
  {
    slug: 'applelaptop',
    title: 'Apple MacBook',
    description: 'Anaconda Setup',
    date: '2023-07-25',
    categories: ["Python", "AI"],
    tags: [],
    image: '/assets/images/jupyter.svg'
  },
  {
    slug: 'opencv',
    title: 'Object Detection',
    description: 'Object Detection',
    date: '2023-07-25',
    categories: ["AI", "Python"],
    tags: [],
    image: '/assets/images/raspberry-pi-logo.svg'
  },
  {
    slug: 'sh1106',
    title: 'Raspberry Pi SH1106',
    description: 'OLED display',
    date: '2023-07-24',
    categories: ["Python", "AI"],
    tags: [],
    image: '/assets/images/raspberry-pi-logo.svg'
  },
  {
    slug: 'pi2',
    title: 'Raspberry Pi GPIO',
    description: 'Raspberry Pi GPIO',
    date: '2023-07-22',
    categories: ["Python"],
    tags: [],
    image: '/assets/images/raspberry-pi-logo.svg'
  },
  {
    slug: 'pi1',
    title: 'Raspberry Pi Imager',
    description: 'Raspberry Pi Imager Advanced Options',
    date: '2023-07-22',
    categories: [],
    tags: [],
    image: '/assets/images/raspberry-pi-logo.svg'
  },
  {
    slug: 'langchain',
    title: 'LangChain (RAG)',
    description: 'Using LangChain to create a medical report application',
    date: '2023-07-21',
    categories: ["AI", "Python"],
    tags: [],
    image: '/assets/images/chatgpt-logo.svg'
  },
  {
    slug: 'contextinjection',
    title: 'Context Injection',
    description: 'Context Injection',
    date: '2023-07-19',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/chatgpt-logo.svg'
  },
  {
    slug: 'sentencesimilarity',
    title: 'Sentence Similarity',
    description: 'Sentence Similarity',
    date: '2023-07-19',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/chatgpt-logo.svg'
  },
  {
    slug: 'sentimentanalysis',
    title: 'Sentiment Analysis',
    description: 'Sentiment Analysis',
    date: '2023-07-19',
    categories: ["AI", "JavaScript"],
    tags: [],
    image: '/assets/images/chatgpt-logo.svg'
  },
  {
    slug: '3dprinting2',
    title: '3D Printing 2',
    description: 'Raspberry Pi 4 and Mini Breadboard mount',
    date: '2023-07-19',
    categories: [],
    tags: [],
    image: '/assets/images/wikipedia-globe-translucent-3d-printed-woodgrain-background-512x512.jpg'
  },
  {
    slug: '3dprinting1',
    title: '3D Printing 1',
    description: 'ELEGOO Mars 3 Pro 4K Resin 3D Printer',
    date: '2023-07-15',
    categories: [],
    tags: [],
    image: '/assets/images/wikipedia-globe-translucent-3d-printed-woodgrain-background-512x512.jpg'
  },
  {
    slug: 'vbnetconsolesqlserverunittests',
    title: 'VB.NET Console SQL Server Unit Tests',
    description: 'Test driven development',
    date: '2023-05-27',
    categories: ["SQL", "AI", ".NET"],
    tags: [],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'ticktacktoe',
    title: 'Multiplayer Tick-Tack-Toe',
    description: 'Creating a new firebase project',
    date: '2023-05-10',
    categories: ["AI", "React"],
    tags: [],
    image: '/assets/images/logo-lockup-firebase-vertical.svg'
  },
  {
    slug: 'angularphaser',
    title: 'Angular and Phaser',
    description: 'Using Phaser in an Angular Component',
    date: '2023-05-10',
    categories: ["Angular", "JavaScript", "React"],
    tags: [],
    image: '/assets/images/phaser-logo-1836x1530.png'
  },
  {
    slug: 'multiplayer',
    title: 'Multiplayer Game',
    description: 'Creating a new firebase project',
    date: '2023-05-09',
    categories: ["Maps", "DevOps"],
    tags: [],
    image: '/assets/images/logo-lockup-firebase-vertical.svg'
  },
  {
    slug: 'angularfirebase',
    title: 'Angular Firebase',
    description: 'Creating a new firebase project',
    date: '2023-04-25',
    categories: ["Angular", "TypeScript", "React", "JavaScript"],
    tags: [],
    image: '/assets/images/logo-lockup-firebase-vertical.svg'
  },
  {
    slug: 'firebase',
    title: 'Firebase',
    description: 'Firebase web codelab',
    date: '2023-04-24',
    categories: ["JavaScript", "Azure"],
    tags: [],
    image: '/assets/images/logo-lockup-firebase-vertical.svg'
  },
  {
    slug: 'xcode4',
    title: 'XCode C++ (Part 4)',
    description: 'Rotating the triangle',
    date: '2023-03-27',
    categories: [],
    tags: [],
    image: '/assets/images/xcode-14-icon-300x314.png'
  },
  {
    slug: 'vbnetwinforms',
    title: 'VB.NET WinForms and ASP.NET Core API',
    description: 'VB.NET WinForms Development',
    date: '2023-03-27',
    categories: [".NET"],
    tags: [],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'aspnetcoreunittests',
    title: 'ASP.NET Core Unit Tests',
    description: 'Test driven development',
    date: '2023-03-26',
    categories: [".NET"],
    tags: [],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'threetier',
    title: 'Blazor WASM API SQL Server Stored Procedure',
    description: 'Three Tiers',
    date: '2023-03-25',
    categories: [".NET", "SQL"],
    tags: [],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'blazorwasmandasp.net',
    title: 'Blazor WASM and ASP.NET Core',
    description: 'An ASP.NET Core backend and a Blazor Web Assembly frontend.',
    date: '2023-03-24',
    categories: [".NET"],
    tags: [],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'angularandasp.net',
    title: 'Angular and ASP.NET Core',
    description: 'An ASP.NET Core backend and an Angular frontend.',
    date: '2023-03-24',
    categories: [".NET", "Angular", "TypeScript", "React"],
    tags: [],
    image: '/assets/images/angular-full-color-logo.svg'
  },
  {
    slug: 'reactandasp.net',
    title: 'React and ASP.NET Core',
    description: 'An ASP.NET Core backend and a React frontend.',
    date: '2023-03-22',
    categories: ["React", ".NET"],
    tags: [],
    image: '/assets/images/logo512-512x512.png'
  },
  {
    slug: 'aspnet-core',
    title: 'ASP.NET Core',
    description: 'Create Razor Pages with ASP.NET Core.',
    date: '2023-03-21',
    categories: [".NET", "SQL"],
    tags: [],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'aspnet-5-cs',
    title: 'ASP.NET 5 C#',
    description: 'Generate Context and Entity Classes from an Existing Database',
    date: '2023-03-19',
    categories: [".NET", "AI"],
    tags: [],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'aspnet-5-visual-basic',
    title: 'ASP.NET 5 Visual Basic',
    description: 'Generate Context and Entity Classes from an Existing Database',
    date: '2023-03-18',
    categories: [".NET", "SQL", "DevOps", "Azure"],
    tags: [],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'dotnet-core-part2',
    title: '.NET Core (Part 2)',
    description: 'Creating a Blazor App that calls Microsoft Graph.',
    date: '2023-03-15',
    categories: [".NET", "Microsoft 365", "Azure", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'xcode3',
    title: 'XCode C++ (Part 3)',
    description: 'Building an OpenGL application using C++ and XCode',
    date: '2023-03-08',
    categories: [],
    tags: [],
    image: '/assets/images/xcode-14-icon-300x314.png'
  },
  {
    slug: 'xcode2',
    title: 'XCode C++ (Part 2)',
    description: 'OpenGL GLFW',
    date: '2023-03-08',
    categories: [],
    tags: [],
    image: '/assets/images/xcode-14-icon-300x314.png'
  },
  {
    slug: 'xcode1',
    title: 'XCode C++ (Part 1)',
    description: 'Hello, World!',
    date: '2023-03-08',
    categories: [],
    tags: [],
    image: '/assets/images/xcode-14-icon-300x314.png'
  },
  {
    slug: 'threejs',
    title: 'Three.js',
    description: 'A JavaScript-based WebGL engine',
    date: '2023-03-05',
    categories: ["JavaScript"],
    tags: [],
    image: '/assets/images/three.js-icon.svg'
  },
  {
    slug: 'ngrxentity',
    title: 'NGRX entity',
    description: 'json-server',
    date: '2023-02-18',
    categories: ["TypeScript", "React", "Angular", "JavaScript"],
    tags: [],
    image: '/assets/images/ngrx.svg'
  },
  {
    slug: 'ngrxdevtools',
    title: 'NGRX devtools',
    description: 'haddley-ngrx',
    date: '2023-01-25',
    categories: ["Angular"],
    tags: [],
    image: '/assets/images/ngrx.svg'
  },
  {
    slug: 'sharepoint2019',
    title: 'SharePoint 2019',
    description: 'Azure Portal',
    date: '2022-12-31',
    categories: ["Microsoft 365", "SQL", "Azure"],
    tags: [],
    image: '/assets/images/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png'
  },
  {
    slug: 'ngrx',
    title: 'NGRX',
    description: 'haddley-ngrx',
    date: '2022-11-27',
    categories: ["Angular", "React", "TypeScript", "JavaScript"],
    tags: [],
    image: '/assets/images/ngrx.svg'
  },
  {
    slug: 'componentframework',
    title: 'Component Framework',
    description: 'Component Framework',
    date: '2022-08-14',
    categories: ["Power Platform", "JavaScript", "React"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'azurestorage',
    title: 'Azure Storage',
    description: 'Microsoft\'s cloud storage solution',
    date: '2022-08-13',
    categories: ["Azure"],
    tags: [],
    image: '/assets/images/azurex70x75.svg'
  },
  {
    slug: 'purview',
    title: 'Microsoft Purview',
    description: 'Retention policy with adaptive scope',
    date: '2022-08-03',
    categories: ["Microsoft 365"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'powerapps6',
    title: 'A Custom Connector for Microsoft Graph',
    description: 'Calling the Microsoft Graph API from a Canvas App',
    date: '2022-07-04',
    categories: ["Microsoft 365", "Power Platform", "Azure"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'machinelearning9',
    title: 'Machine Learning (Part 9)',
    description: 'MNIST',
    date: '2022-06-17',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning8',
    title: 'Machine Learning (Part 8)',
    description: 'Stealing Baseball Signs',
    date: '2022-06-12',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning7',
    title: 'Machine Learning (Part 7)',
    description: 'Google Cloud Platform',
    date: '2022-06-11',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning6',
    title: 'Machine Learning (Part 6)',
    description: 'Splitting into training and test dataframes',
    date: '2022-06-11',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning5',
    title: 'Machine Learning (Part 5)',
    description: 'Excel',
    date: '2022-06-11',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning4',
    title: 'Machine Learning (Part 4)',
    description: 'Colab',
    date: '2022-06-08',
    categories: ["Python", "AI"],
    tags: [],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning3',
    title: 'Machine Learning (Part 3)',
    description: 'Creating models',
    date: '2022-06-05',
    categories: ["AI", "DevOps"],
    tags: [],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning2',
    title: 'Machine Learning (Part 2)',
    description: 'What apps can be written quickly?',
    date: '2022-06-05',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning1',
    title: 'Machine Learning (Part 1)',
    description: 'What is Machine Learning?',
    date: '2022-06-05',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'ateamstabsharepointwebpartforonedrive',
    title: 'A Teams App SharePoint Web Part for One Drive',
    description: 'The SharePoint Framework (SPFx) can be used to create SharePoint Web Parts and Teams Applications',
    date: '2022-05-29',
    categories: ["Microsoft 365", "React", "JavaScript", "TypeScript"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'javascriptgraph',
    title: 'JavaScript and Microsoft Graph',
    description: 'A console application that calls the Microsoft Graph API',
    date: '2022-05-28',
    categories: ["JavaScript", "Microsoft 365", "Azure"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'microsoftgraph',
    title: 'Microsoft Graph',
    description: 'Graph Explorer',
    date: '2022-05-26',
    categories: ["Microsoft 365", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'powerautomate',
    title: 'Power Automate',
    description: 'Automating Team Creation',
    date: '2022-05-04',
    categories: ["Microsoft 365", "Power Platform"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'webxr',
    title: 'WebXR',
    description: 'Create Augmented Reality Experiences.',
    date: '2022-04-22',
    categories: ["JavaScript"],
    tags: [],
    image: '/assets/images/34385910-400x400.png'
  },
  {
    slug: 'leaflet',
    title: 'Leaflet',
    description: 'An open-source JavaScript libraryfor mobile-friendly interactive maps',
    date: '2022-02-21',
    categories: ["Maps", "Azure"],
    tags: [],
    image: '/assets/images/leaflet-upic-200x200.png'
  },
  {
    slug: 'webcomponents',
    title: 'Web Components',
    description: 'A set of web technologies that allow users to create HTML elements.',
    date: '2022-02-10',
    categories: ["React"],
    tags: [],
    image: '/assets/images/web-components-logo.svg'
  },
  {
    slug: 'phaser',
    title: 'Phaser',
    description: '2D game framework used for making HTML5 games',
    date: '2022-01-23',
    categories: ["JavaScript", ".NET"],
    tags: [],
    image: '/assets/images/phaser-logo-1836x1530.png'
  },
  {
    slug: 'nextjs5',
    title: 'Next.js (Part 5)',
    description: 'next-pwa and ionic',
    date: '2022-01-13',
    categories: ["TypeScript", "React", ".NET"],
    tags: [],
    image: '/assets/images/2560px-nextjs-logo.svg-1536x920.png'
  },
  {
    slug: 'ionic',
    title: 'Ionic',
    description: 'Cross-platform apps.Powered by the Web.',
    date: '2021-12-22',
    categories: ["React", "TypeScript", "Azure", "DevOps"],
    tags: [],
    image: '/assets/images/logo-192x192.png'
  },
  {
    slug: 'mysql',
    title: 'MySQL',
    description: 'Connecting to MySQL from JavaScript',
    date: '2021-11-14',
    categories: ["SQL"],
    tags: [],
    image: '/assets/images/includes-mysql-5646x2872.png'
  },
  {
    slug: 'nextjs4',
    title: 'Next.js (Part 4)',
    description: 'Deploying to Azure',
    date: '2021-11-11',
    categories: ["Azure", "JavaScript", "React", ".NET"],
    tags: [],
    image: '/assets/images/2560px-nextjs-logo.svg-1536x920.png'
  },
  {
    slug: 'nextjs3',
    title: 'Next.js (Part 3)',
    description: 'API routes and next-auth',
    date: '2021-11-07',
    categories: ["JavaScript", "React"],
    tags: [],
    image: '/assets/images/2560px-nextjs-logo.svg-1536x920.png'
  },
  {
    slug: 'nextjs2',
    title: 'Next.js (Part 2)',
    description: 'getStaticProps, getServerSideProps, getStaticPaths and useSWR',
    date: '2021-11-06',
    categories: ["React"],
    tags: [],
    image: '/assets/images/2560px-nextjs-logo.svg-1536x920.png'
  },
  {
    slug: 'nextjs1',
    title: 'Next.js (Part 1)',
    description: 'The React Framework for Production',
    date: '2021-11-05',
    categories: ["JavaScript", "React"],
    tags: [],
    image: '/assets/images/2560px-nextjs-logo.svg-1536x920.png'
  },
  {
    slug: 'sails3',
    title: 'Sails (Part 3)',
    description: 'Sails and the Amazon Elastic Kubernetes Service',
    date: '2021-10-13',
    categories: ["DevOps", "AWS", "Azure", "JavaScript"],
    tags: [],
    image: '/assets/images/sailsjs-logo-515x193.png'
  },
  {
    slug: 'sails2',
    title: 'Sails (Part 2)',
    description: 'Sails and the Azure Cosmos DB API for MongoDB',
    date: '2021-10-12',
    categories: ["Azure", ".NET", "AI"],
    tags: [],
    image: '/assets/images/sailsjs-logo-515x193.png'
  },
  {
    slug: 'sails1',
    title: 'Sails (Part 1)',
    description: 'Azure DevOps and Sails.',
    date: '2021-10-12',
    categories: ["DevOps", "JavaScript", "Azure", "AI"],
    tags: [],
    image: '/assets/images/sailsjs-logo-515x193.png'
  },
  {
    slug: 'aspnetcoreawseks',
    title: 'Deploying a .NET Core Web API to Amazon EKS',
    description: 'Deploying a .NET Core Web API to Amazon Elastic Kubernetes Service (Amazon EKS)',
    date: '2021-08-16',
    categories: ["AWS", "DevOps", ".NET"],
    tags: [],
    image: '/assets/images/amazon-web-services-logo.svg'
  },
  {
    slug: 'amazoneks',
    title: 'Amazon Elastic Kubernetes Service',
    description: 'Deploying to Amazon EKS',
    date: '2021-08-12',
    categories: ["AWS", "DevOps"],
    tags: [],
    image: '/assets/images/amazon-web-services-logo.svg'
  },
  {
    slug: 'amazonecs',
    title: 'Amazon Elastic Container Service',
    description: 'Deploying to Amazon ECS',
    date: '2025-09-20',
    categories: ["AWS", "DevOps", "AI"],
    tags: [],
    image: '/assets/images/amazonecs/amazon-web-services-logo.svg'
  },
  {
    slug: 'amazonfargate',
    title: 'Amazon Fargate',
    description: 'Pay-as-you-go',
    date: '2025-09-20',
    categories: ["AWS", "DevOps"],
    tags: [],
    image: '/assets/images/amazonfargate/amazon-web-services-logo.svg'
  },
  {
    slug: 'customconnectorsappregistrations',
    title: 'Power Apps, Custom Connectors and Application Registrations',
    description: 'Power Apps, Custom Connectors and Application Registrations',
    date: '2021-08-09',
    categories: ["Azure", "JavaScript", "Power Platform"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'api-management',
    title: 'Power Apps, Custom Connectors and API Management',
    description: 'Power Apps, Custom Connectors and API Management',
    date: '2021-08-02',
    categories: ["Power Platform", "Azure"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'pwa',
    title: 'Progressive Web Application',
    description: 'Building a Progressive Web Application',
    date: '2021-07-24',
    categories: ["Azure"],
    tags: [],
    image: '/assets/images/progressive-web-apps-logo.svg'
  },
  {
    slug: 'powerappsapplication',
    title: 'A Power Apps Application',
    description: 'Power Apps Application.',
    date: '2021-07-13',
    categories: ["Power Platform", "React"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'customcomponents',
    title: 'Power Apps Custom Components',
    description: 'Create reusable Power Apps Components.',
    date: '2021-07-13',
    categories: ["Power Platform", "React"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'powerappswithrest',
    title: 'A Power Apps Custom Connector',
    description: 'Create a GitHub Repository',
    date: '2021-06-27',
    categories: ["Power Platform", ".NET", "Azure"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'teamstoolkitspfx',
    title: 'Teams Toolkit with SPFx',
    description: 'Get started with Microsoft Teams app development using SPFx.',
    date: '2021-05-30',
    categories: ["Microsoft 365", "Azure"],
    tags: [],
    image: '/assets/images/teams-hi-res-icon-2019.svg'
  },
  {
    slug: 'teamstoolkit',
    title: 'Teams Toolkit with Azure',
    description: 'Get started with Microsoft Teams app development using Azure.',
    date: '2021-05-29',
    categories: ["Microsoft 365", "Azure", "React", "SQL"],
    tags: [],
    image: '/assets/images/teams-hi-res-icon-2019.svg'
  },
  {
    slug: 'devopsstarterazuredevops',
    title: 'DevOps Starter Azure DevOps',
    description: 'Everything you need for developing, deploying, and monitoring your application.',
    date: '2021-04-26',
    categories: ["DevOps", "Azure", "JavaScript"],
    tags: [],
    image: '/assets/images/svgexport-22.svg'
  },
  {
    slug: 'devopsstartergithubactions',
    title: 'DevOps Starter GitHub actions',
    description: 'Everything you need for developing, deploying, and monitoring your application.',
    date: '2021-04-25',
    categories: ["JavaScript", "DevOps", "Azure"],
    tags: [],
    image: '/assets/images/svgexport-22.svg'
  },
  {
    slug: 'azure-active-directory2',
    title: 'Azure Active Directory (Part 2)',
    description: 'Microsoft Azure Active Directory Authentication.',
    date: '2021-04-17',
    categories: ["Azure", "JavaScript", "React", "Microsoft 365"],
    tags: [],
    image: '/assets/images/azurex70x75.svg'
  },
  {
    slug: 'dotnet-core-part1',
    title: '.NET Core (Part 1)',
    description: 'Creating a REST API Service using Microsoft cross-platform framework.',
    date: '2021-04-10',
    categories: [".NET", "DevOps"],
    tags: [],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'spring-boot',
    title: 'Java Spring Boot (Part 1)',
    description: 'Spring based Java Applications that you can just run.',
    date: '2021-04-06',
    categories: ["Java", "React"],
    tags: [],
    image: '/assets/images/spring-framework-logo-70-no.svg'
  },
  {
    slug: 'azure-active-directory',
    title: 'Azure Active Directory (Part 1)',
    description: 'Using Microsoft Identity to Authenticate Users.',
    date: '2021-03-29',
    categories: ["Azure", "JavaScript", "Microsoft 365"],
    tags: [],
    image: '/assets/images/azurex70x75.svg'
  },
  {
    slug: 'mssqlserver2',
    title: 'Microsoft SQL Server (Part 2)',
    description: 'T-SQL, Stored Procedures and Snapshot Isolation.',
    date: '2021-03-27',
    categories: ["SQL", "Java"],
    tags: [],
    image: '/assets/images/ads.svg'
  },
  {
    slug: 'mssqlserver',
    title: 'Microsoft SQL Server (Part 1)',
    description: 'Microsoft SQL Server 2019 Docker image.',
    date: '2021-03-14',
    categories: ["SQL", "Java", "DevOps"],
    tags: [],
    image: '/assets/images/ads.svg'
  },
  {
    slug: 'internetofthings2',
    title: 'Internet of Things (Part 2)',
    description: 'Node-RED can publish messages to a MQTT broker and subscribe to MQTT topics.',
    date: '2021-03-06',
    categories: ["AWS", "DevOps"],
    tags: [],
    image: '/assets/images/iot-microchip.svg'
  },
  {
    slug: 'internetofthings1',
    title: 'Internet of Things (Part 1)',
    description: 'ESP8266 is a low-cost Wi-Fi microchip, with a full TCP/IP stack and microcontroller capability.',
    date: '2021-03-03',
    categories: ["DevOps"],
    tags: [],
    image: '/assets/images/iot-microchip.svg'
  },
  {
    slug: 'webvr',
    title: 'WebVR',
    description: 'Create Virtual Reality Experiences.',
    date: '2021-03-02',
    categories: [],
    tags: [],
    image: '/assets/images/webvr-logo-square-512x512.png'
  },
  {
    slug: 'dockerbuildx',
    title: 'Docker Buildx',
    description: 'Build multi-platform Docker images.',
    date: '2021-03-01',
    categories: ["DevOps", "JavaScript"],
    tags: [],
    image: '/assets/images/method-draw-image.svg'
  },
  {
    slug: 'graphql',
    title: 'GraphQL',
    description: 'GraphQL is a query and manipulation language for APIs.',
    date: '2021-03-01',
    categories: ["JavaScript", "React"],
    tags: [],
    image: '/assets/images/graphql-logo.svg-1200x1200.png'
  },
  {
    slug: 'nuget',
    title: 'NuGet C#',
    description: 'Create, publish and consume a NuGet package using C#.',
    date: '2021-02-27',
    categories: [".NET", "DevOps"],
    tags: [],
    image: '/assets/images/logo-og-600x600.png'
  },
  {
    slug: 'npmcc',
    title: 'npm C++',
    description: 'Create and publish an npm module using C++.',
    date: '2021-02-26',
    categories: ["JavaScript", "DevOps"],
    tags: [],
    image: '/assets/images/6078720-200x200.png'
  },
  {
    slug: 'npm',
    title: 'npm JavaScript',
    description: 'Create and publish an npm module using JavaScript.',
    date: '2021-02-25',
    categories: ["JavaScript", "DevOps"],
    tags: [],
    image: '/assets/images/6078720-200x200.png'
  },
  {
    slug: 'm365commandlineinterface',
    title: 'Microsoft 365 command line interface',
    description: 'Manage Microsoft 365 tenants and SharePoint Framework projects',
    date: '2021-02-22',
    categories: ["Microsoft 365", "DevOps"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'sharepointsitedesignsandsitescripts',
    title: 'SharePoint site designs and site scripts',
    description: 'SharePoint users and administrators have long appreciated the opportunity to reuse SharePoint Site Templates.',
    date: '2021-02-15',
    categories: ["Microsoft 365"],
    tags: [],
    image: '/assets/images/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png'
  },
  {
    slug: 'sharepointwebpart2',
    title: 'SharePoint Web Part (Part 2)',
    description: 'How to create and publish a SharePoint Web Part',
    date: '2021-02-14',
    categories: ["React", "Microsoft 365", "TypeScript"],
    tags: [],
    image: '/assets/images/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png'
  },
  {
    slug: 'sharepointwebpart1',
    title: 'SharePoint Web Part (Part 1)',
    description: 'How to create and publish a SharePoint Web Part',
    date: '2021-02-11',
    categories: ["React", "Microsoft 365", "TypeScript"],
    tags: [],
    image: '/assets/images/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png'
  },
  {
    slug: 'apigateway',
    title: 'API Gateway',
    description: 'How to publish a collection of microservices using an API Gateway.',
    date: '2021-02-10',
    categories: ["DevOps", "React", "AWS", "Azure"],
    tags: [],
    image: '/assets/images/kubernetes-container-engine.svg'
  },
  {
    slug: 'reactusestateuseeffect',
    title: 'React useState and useEffect',
    description: 'Create a React app using the useState and useEffect hook.',
    date: '2021-02-08',
    categories: ["React"],
    tags: [],
    image: '/assets/images/logo512-512x512.png'
  },
  {
    slug: 'restapiservice',
    title: 'REST',
    description: 'Creating a REST API Service using Node and Express',
    date: '2021-02-06',
    categories: ["JavaScript", "DevOps"],
    tags: [],
    image: '/assets/images/fve-image.svg'
  },
  {
    slug: 'kubernetes',
    title: 'Kubernetes',
    description: 'Kubernetes is a platform for managing containerized workloads.',
    date: '2021-02-06',
    categories: ["DevOps"],
    tags: [],
    image: '/assets/images/kubernetes-container-engine.svg'
  },
  {
    slug: 'docker',
    title: 'Docker',
    description: 'Docker is an easy way to create, manage, and deliver applications.',
    date: '2021-02-06',
    categories: ["DevOps"],
    tags: [],
    image: '/assets/images/method-draw-image.svg'
  }

];
*/

// Avoid top-level await so bundlers won't try to include server-only fs
// Use a lazy async loader and a small in-memory cache
let postsCache: BlogPost[] | null = null;

async function fetchAllPosts(): Promise<BlogPost[]> {
  if (postsCache) return postsCache;
  const mdPosts = await getAllMarkdownPosts();
  const mapped: BlogPost[] = mdPosts.map(post => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    categories: post.categories,
    tags: post.tags,
    image: post.image,
    hidden: post.hidden
  }));
  // console.log(`Fetched ${mapped.length} posts from markdown frontmatter`);
  // Sort posts by date in descending order
  mapped.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); 

  postsCache = mapped;
  return mapped;
}

export function clearPostsCache(): void {
  postsCache = null;
}

// Static blogPosts array removed; now using dynamic loading from markdown frontmatter

export async function getBlogPosts(): Promise<BlogPost[]> {
  return await fetchAllPosts();
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return await fetchAllPosts();
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await fetchAllPosts();
  return posts.find(post => post.slug === slug);
}

export async function getPostById(slug: string): Promise<BlogPost | undefined> {
  const posts = await fetchAllPosts();
  return posts.find(post => post.slug === slug);
}

export async function getVisibleBlogPosts(): Promise<BlogPost[]> {
  const posts = await fetchAllPosts();
  const visiblePosts = posts.filter(post => !post.hidden);
  return visiblePosts;
}

// Functions for automated multi-category classification
export async function getAutomatedCategories(): Promise<string[]> {
  const posts = await fetchAllPosts();
  const allCategories = posts
    .filter(post => post.categories && post.categories.length > 0)
    .flatMap(post => post.categories || []);
  const categories = [...new Set(allCategories)];
  return categories.sort();
}

export async function getVisibleAutomatedCategories(): Promise<string[]> {
  const visiblePosts = await getVisibleBlogPosts();
  const allCategories = visiblePosts
    .filter(post => post.categories && post.categories.length > 0)
    .flatMap(post => post.categories || []);
  const categories = [...new Set(allCategories)];
  return categories.sort();
}

export async function getBlogPostsByAutomatedCategory(category: string): Promise<BlogPost[]> {
  const posts = await fetchAllPosts();
  return posts.filter(post => 
    post.categories && post.categories.includes(category)
  );
}

export async function getVisibleBlogPostsByAutomatedCategory(category: string): Promise<BlogPost[]> {
  const posts = await fetchAllPosts();
  return posts.filter(post => 
    post.categories && 
    post.categories.includes(category) && 
    !post.hidden
  );
}

// Helper function to get all categories for a post
export function getAllCategoriesForPost(post: BlogPost): string[] {
  return post.categories || [];
}

// Function to search posts by any category (automated only)
export async function getBlogPostsByAnyCategory(category: string): Promise<BlogPost[]> {
  const posts = await fetchAllPosts();
  return posts.filter(post => 
    post.categories && post.categories.includes(category)
  );
}

export async function getVisibleBlogPostsByAnyCategory(category: string): Promise<BlogPost[]> {
  const posts = await fetchAllPosts();
  return posts.filter(post => 
    !post.hidden && 
    post.categories && 
    post.categories.includes(category)
  );
}
