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

export const blogPosts: BlogPost[] = [

  {
    slug: 'mcpserver2',
    title: 'Model Context Protocol (Part 2)',
    description: 'Business Central MCP Server Implementation',
    date: '2025-09-21',
    categories: ["Microsoft Dynamics", "Business Central", "TypeScript", "DevOps"],
    tags: [],
    image: '/assets/images/mcpserver2/mcp-1024x1024.png',
    hidden: true
  },
  {
    slug: 'microsoftdynamics365appforoutlook',
    title: 'Microsoft Dynamics 365 App for Outlook',
    description: 'Complete guide to integrating Dynamics 365 with Outlook using the App for Outlook',
    date: '2025-09-20',
    categories: ["Microsoft Dynamics", "Power Platform"],
    tags: [],
    image: '/assets/images/microsoftdynamics365appforoutlook/office-365-icon-500x500.png',
    hidden: true
  },
  {
    slug: 'macscreensharing',
    title: 'Apple macOS',
    description: 'Screen Sharing VNC and SSH',
    date: '2025-08-18',
    categories: [],
    tags: [],
    image: '/assets/images/apple-logo-black.svg'
  },
  {
    slug: 'mcpserver',
    title: 'Model Context Protocol (Part 1)',
    description: 'Typescript Quickstart',
    date: '2025-08-13',
    categories: ["TypeScript", "AI"],
    tags: [],
    image: '/assets/images/mcp-1024x1024.png'
  },
  {
    slug: 'syntexautofill',
    title: 'SharePoint',
    description: 'Syntex Autofill',
    date: '2025-07-30',
    categories: ["Microsoft 365"],
    tags: [],
    image: '/assets/images/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png'
  },
  {
    slug: 'ollamadeepsekr1applemacbookinstall',
    title: 'Ollama DeepSeek R1',
    description: 'Apple MacBook Install',
    date: '2025-05-24',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/254932576-0d0b44e2-8f4a-4e99-9b52-a5c1c741c8f7-844x844.png'
  },
  {
    slug: 'promptdialog3',
    title: 'Business Central (Part 29)',
    description: 'Prompt Dialog Markdown (Part 3)',
    date: '2024-05-24',
    categories: ["AI", "Microsoft Dynamics", "Business Central", "Azure"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'promptdialog2',
    title: 'Business Central (Part 28)',
    description: 'Prompt Dialog Azure Open AI (Part 2)',
    date: '2024-05-24',
    categories: ["Microsoft Dynamics", "Business Central", "AI", "Azure"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'promptdialog',
    title: 'Business Central (Part 27)',
    description: 'Prompt Dialog Introduction (Part 1)',
    date: '2024-05-24',
    categories: ["Microsoft Dynamics", "Business Central", "AI", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'internetofthings3',
    title: 'Internet of Things (Part 3)',
    description: 'Edge Impulse',
    date: '2025-03-01',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/iot-microchip.svg'
  },
  {
    slug: 'azureopenal',
    title: 'Azure AI Foundry',
    description: 'Azure OpenAI Service',
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
    description: 'Configuration Migration Tool (CMT)',
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
    description: 'Customer Orders',
    date: '2024-12-20',
    categories: [],
    tags: [],
    image: '/assets/images/powerpages-scalable.svg'
  },
  {
    slug: 'businesscentralpart25integratingwithdataverseusingdataflows',
    title: 'Business Central (Part 25)',
    description: 'Customer Orders',
    date: '2024-12-01',
    categories: ["Power Platform", "Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'langflow1',
    title: 'Langflow (Part 1)',
    description: 'OpenAI text to speech',
    date: '2024-10-30',
    categories: ["Python", "AI"],
    tags: [],
    image: '/assets/images/85702467-200x200.png'
  },
  {
    slug: 'powerpages1',
    title: 'Power Pages (Part 1)',
    description: 'A Business Central Customer Portal',
    date: '2024-10-26',
    categories: ["Microsoft Dynamics", "Business Central", "Power Platform", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/powerpages-scalable.svg'
  },
  {
    slug: 'promptflow6',
    title: 'Prompt flow (Part 6)',
    description: 'With Semantic Kernel and Planner',
    date: '2024-09-01',
    categories: ["AI", "Python"],
    tags: [],
    image: '/assets/images/logo.svg'
  },
  {
    slug: 'promptflow5',
    title: 'Prompt flow (Part 5)',
    description: 'With LangChain',
    date: '2024-09-01',
    categories: ["AI", "DevOps", "Python"],
    tags: [],
    image: '/assets/images/logo.svg'
  },
  {
    slug: 'langchainagents',
    title: 'LangChain',
    description: 'With LangChain',
    date: '2024-08-25',
    categories: ["AI", "Python"],
    tags: [],
    image: '/assets/images/langchain.svg'
  },
  {
    slug: 'phpsetup',
    title: 'PHP',
    description: 'Agents',
    date: '2024-08-25',
    categories: [],
    tags: [],
    image: '/assets/images/php-logo.svg'
  },
  {
    slug: 'dataverseadvancedreportssetup',
    title: 'Power Apps (Part 22)',
    description: 'Setup',
    date: '2024-08-10',
    categories: ["SQL", "Microsoft Dynamics", "Power Platform"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'powerautomatereports',
    title: 'Power Apps (Part 21)',
    description: 'Microsoft Power Automate Reports',
    date: '2024-07-19',
    categories: ["Power Platform"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'dataversereports',
    title: 'Power Apps (Part 20)',
    description: 'Microsoft Dataverse Reports',
    date: '2024-07-19',
    categories: ["Power Platform"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'promptflow4',
    title: 'Prompt flow (Part 4)',
    description: 'Planner',
    date: '2024-08-24',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/logo.svg'
  },
  {
    slug: 'promptflow3',
    title: 'Prompt flow (Part 3)',
    description: 'Planner',
    date: '2024-08-24',
    categories: ["AI", "Python"],
    tags: [],
    image: '/assets/images/logo.svg'
  },
  {
    slug: 'promptflow2',
    title: 'Prompt flow (Part 2)',
    description: 'Semantic Kernel',
    date: '2024-06-12',
    categories: ["DevOps", "AI", "Python"],
    tags: [],
    image: '/assets/images/logo.svg'
  },
  {
    slug: 'promptflow1',
    title: 'Prompt flow (Part 1)',
    description: 'Docker',
    date: '2024-06-11',
    categories: ["AI", "Python", "DevOps", "Azure"],
    tags: [],
    image: '/assets/images/logo.svg'
  },
  {
    slug: 'customtvirtualtables',
    title: 'Power Apps (Part 18)',
    description: 'Setup',
    date: '2024-05-07',
    categories: ["Power Platform", "AI", "Microsoft Dynamics", "Business Central"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'blogcopilotstudio',
    title: 'Dynamics 365 Business Central (Part 24)',
    description: 'A comprehensive guide covering blog copilot studio',
    date: '2024-03-24',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics", "Power Platform"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'customcopilotstudio',
    title: 'Dynamics 365 Business Central (Part 23)',
    description: 'A comprehensive guide covering custom copilot studio',
    date: '2024-03-23',
    categories: ["Microsoft Dynamics", "Business Central", "Power Platform", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'configurecopilotsinglesignonforweb',
    title: 'Power Apps (Part 17)',
    description: 'Configure Copilot single sign-on for Web',
    date: '2024-03-16',
    categories: ["Power Platform", ".NET", "Microsoft 365"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'customizedefaultcanvas',
    title: 'Power Apps (Part 16)',
    description: 'styleOptions',
    date: '2024-03-11',
    categories: [],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'copilotembedcode',
    title: 'Power Apps (Part 15)',
    description: 'Copilot Embed Code',
    date: '2024-03-11',
    categories: [],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'staticwebapp.config.json',
    title: 'Azure Active Directory (Part 3)',
    description: 'staticwebapp.config.json and environment variables',
    date: '2024-03-10',
    categories: ["Azure"],
    tags: [],
    image: '/assets/images/azurex70x75.svg'
  },
  {
    slug: 'codespacesauthentication',
    title: 'React (Part 4)',
    description: 'Codespaces and Authentication',
    date: '2024-03-06',
    categories: ["React", "Azure", "DevOps"],
    tags: [],
    image: '/assets/images/logo512-512x512.png'
  },
  {
    slug: 'modeldrivenpurchaseorderlines',
    title: 'Power Apps (Part 14)',
    description: 'Model Driven Purchase Order Lines',
    date: '2024-03-03',
    categories: ["Microsoft Dynamics", "Business Central", "Power Platform", "AI"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'modeldrivenpurchaseorders',
    title: 'Power Apps (Part 13)',
    description: 'Model Driven Purchase Orders',
    date: '2024-03-02',
    categories: ["Microsoft Dynamics", "Business Central", "Power Platform", "AI"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'cloudflow',
    title: 'Power Apps (Part 12)',
    description: 'Copilot Studio Topic with a Cloud Flow',
    date: '2024-02-26',
    categories: ["Power Platform", "Microsoft Dynamics", "Business Central", "Azure"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'topics',
    title: 'Power Apps (Part 11)',
    description: 'Copilot Studio Topic with a Connector',
    date: '2024-02-25',
    categories: ["Power Platform", "Microsoft Dynamics", "Business Central"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'pluginactions',
    title: 'Power Apps (Part 10)',
    description: 'Copilot Studio Plugin Actions',
    date: '2024-02-24',
    categories: ["Power Platform"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'addapurchaseorder',
    title: 'Power Apps (Part 9)',
    description: 'Adding a Purchase Order',
    date: '2024-02-21',
    categories: ["Microsoft Dynamics", "Business Central", "Power Platform"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'addanitem',
    title: 'Power Apps (Part 8)',
    description: 'Adding an Item',
    date: '2024-02-17',
    categories: ["Microsoft Dynamics", "Business Central", "Power Platform"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'azurereactstaticweb-app',
    title: 'React (Part 3)',
    description: 'Adding an Item',
    date: '2024-01-08',
    categories: ["React", "Azure", ".NET"],
    tags: [],
    image: '/assets/images/logo512-512x512.png'
  },
  {
    slug: 'businesscentralvirtualtable',
    title: 'Dynamics 365 Business Central (Part 22)',
    description: 'Business Central Virtual Table',
    date: '2024-01-12',
    categories: ["Microsoft Dynamics", "Business Central", "Power Platform", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'createactionbasedonaflow',
    title: 'Dynamics 365 Business Central (Part 21)',
    description: 'Create action based on a flow',
    date: '2024-01-04',
    categories: ["Power Platform", "Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'businesscentralpowerautomateflow',
    title: 'Dynamics 365 Business Central (Part 20)',
    description: 'Power Automate Flow',
    date: '2024-01-02',
    categories: ["Microsoft Dynamics", "Business Central", "Power Platform", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'gingerbreadhouse',
    title: 'Raspberry Pi (Part 5)',
    description: 'Gingerbread House',
    date: '2023-12-26',
    categories: ["Python"],
    tags: [],
    image: '/assets/images/raspberry-pi-logo.svg'
  },
  {
    slug: 'businesscentralmicrosoftgraph',
    title: 'Dynamics 365 Business Central (Part 19)',
    description: 'Microsoft Graph',
    date: '2023-12-18',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft 365", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'salesinvoice',
    title: 'Dynamics 365 Business Central (Part 18)',
    description: 'Sales Invoice',
    date: '2023-12-14',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'purchaseinvoice',
    title: 'Dynamics 365 Business Central (Part 17)',
    description: 'Sales Invoice',
    date: '2023-12-14',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'generalpostingsetup',
    title: 'Dynamics 365 Business Central (Part 16)',
    description: 'General Posting Setup',
    date: '2023-12-14',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'customerpostinggroup',
    title: 'Dynamics 365 Business Central (Part 15)',
    description: 'Customer Posting Group',
    date: '2023-12-14',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'vendorpostinggroup',
    title: 'Dynamics 365 Business Central (Part 14)',
    description: 'Vendor Posting Group',
    date: '2023-12-12',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'generalledger',
    title: 'Dynamics 365 Business Central (Part 13)',
    description: 'General Ledger',
    date: '2023-12-11',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'hands-on-lab3.1',
    title: 'Dynamics 365 Business Central (Part 12)',
    description: 'Hands-on-Lab 3.1',
    date: '2023-12-04',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'hands-on-lab2.3',
    title: 'Dynamics 365 Business Central (Part 11)',
    description: 'Hands-on-Lab 2.3',
    date: '2023-12-04',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'hands-on-lab2.2',
    title: 'Dynamics 365 Business Central (Part 10)',
    description: 'Hands-on-Lab 2.2',
    date: '2023-11-22',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'hands-on-lab2.1',
    title: 'Dynamics 365 Business Central (Part 9)',
    description: 'Hands-on-Lab 2.1',
    date: '2023-11-22',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/hands-on-lab2.1/dynamics365-color.svg'
  },
  {
    slug: 'dynamicssales3',
    title: 'Microsoft Dynamics 365 Sales (Part 3)',
    description: 'Adding a Warranty table',
    date: '2023-10-21',
    categories: ["Microsoft Dynamics", "Power Platform"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'dynamicssales2',
    title: 'Microsoft Dynamics 365 Sales (Part 2)',
    description: 'Updating the Lead to Opportunity Business Process Flow',
    date: '2023-10-21',
    categories: ["Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'dynamicssales1',
    title: 'Microsoft Dynamics 365 Sales (Part 1)',
    description: 'Updating the Sales Insights form',
    date: '2023-10-21',
    categories: ["Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'modeldriven4',
    title: 'Model Driven Apps (Part 4)',
    description: 'Model-driven apps Power FX',
    date: '2023-10-09',
    categories: ["Power Platform", "AI"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'modeldriven3',
    title: 'Model Driven Apps (Part 3)',
    description: 'Model-driven apps JavaScript Developer Guide',
    date: '2023-10-08',
    categories: ["JavaScript", "Power Platform", "AI"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'modeldriven2',
    title: 'Model Driven Apps (Part 2)',
    description: 'Business Process Flow',
    date: '2023-10-05',
    categories: ["Power Platform", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'modeldriven1',
    title: 'Model Driven Apps (Part 1)',
    description: 'Dataverse users, business units and security roles',
    date: '2023-09-18',
    categories: ["Power Platform", "DevOps", "Microsoft 365", "AI"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'ashorthistory',
    title: 'Microsoft Dynamics 365',
    description: 'A Short History of Microsoft Dynamics and Microsoft Dataverse',
    date: '2023-09-09',
    categories: ["Microsoft Dynamics", "Power Platform", "Microsoft 365", "Business Central"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'mapextension',
    title: 'Microsoft Dynamics 365 Business Central (Part 8)',
    description: 'Maps Extension',
    date: '2023-09-01',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'rewardsextension',
    title: 'Microsoft Dynamics 365 Business Central (Part 7)',
    description: 'Maps Extension',
    date: '2023-08-30',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'al-go-pte',
    title: 'Microsoft Dynamics 365 Business Central (Part 6)',
    description: 'AL-Go-PTE',
    date: '2023-08-26',
    categories: ["Microsoft Dynamics", "Business Central", "DevOps", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'financialoperationspurchaseinvoice',
    title: 'Microsoft Dynamics 365 Business Central (Part 5)',
    description: 'AL-Go-PTE',
    date: '2023-08-20',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'warehousemanagementputaway',
    title: 'Microsoft Dynamics 365 Business Central (Part 4)',
    description: 'Put-away',
    date: '2023-08-19',
    categories: ["Microsoft Dynamics", "Business Central"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'businesscentraladmincenter',
    title: 'Microsoft Dynamics 365 Business Central (Part 3)',
    description: 'Admin Center',
    date: '2023-08-18',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'businesscentralcanvasapps',
    title: 'Microsoft Dynamics 365 Business Central (Part 2)',
    description: 'Canvas Apps',
    date: '2023-08-14',
    categories: ["Microsoft Dynamics", "Business Central", "Microsoft Dynamics", "Power Platform"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'dynamicstrialsignup',
    title: 'Microsoft Dynamics 365 Business Central (Part 1)',
    description: 'Trial Signup',
    date: '2023-08-14',
    categories: ["Microsoft Dynamics", "Business Central"],
    tags: [],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'spring-boot-6',
    title: 'Java Spring Boot (Part 6)',
    description: 'OAuth2 Login',
    date: '2023-10-31',
    categories: ["Java"],
    tags: [],
    image: '/assets/images/spring-framework-logo-70-no.svg'
  },
  {
    slug: 'spring-boot-5',
    title: 'Java Spring Boot (Part 5)',
    description: 'OAuth2 Login',
    date: '2023-10-30',
    categories: ["Java", "React", "SQL", "AWS"],
    tags: [],
    image: '/assets/images/spring-framework-logo-70-no.svg'
  },
  {
    slug: 'spring-boot-4',
    title: 'Java Spring Boot (Part 4)',
    description: 'Spring ModelAndView',
    date: '2023-10-29',
    categories: ["Java", "AI"],
    tags: [],
    image: '/assets/images/spring-framework-logo-70-no.svg'
  },
  {
    slug: 'spring-boot-3',
    title: 'Java Spring Boot (Part 3)',
    description: 'Spring Data JPA',
    date: '2023-10-28',
    categories: ["Java", "Azure"],
    tags: [],
    image: '/assets/images/spring-framework-logo-70-no.svg'
  },
  {
    slug: 'spring-boot-2',
    title: 'Java Spring Boot (Part 2)',
    description: 'Deploying from GitHub to Azure',
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
    title: 'Jupyter (Part 4)',
    description: 'LM Studio',
    date: '2023-08-03',
    categories: ["AI", "Python"],
    tags: [],
    image: '/assets/images/jupyter.svg'
  },
  {
    slug: 'colorization',
    title: 'Jupyter (Part 3)',
    description: 'Colorization',
    date: '2023-08-03',
    categories: ["Python", "AI"],
    tags: [],
    image: '/assets/images/jupyter.svg'
  },
  {
    slug: 'stablediffusion',
    title: 'Jupyter (Part 2)',
    description: 'Colorization',
    date: '2023-08-01',
    categories: ["Python", "AI"],
    tags: [],
    image: '/assets/images/jupyter.svg'
  },
  {
    slug: 'applelaptop',
    title: 'Jupyter (Part 1)',
    description: 'Laptop Setup',
    date: '2023-07-25',
    categories: ["Python", "AI"],
    tags: [],
    image: '/assets/images/jupyter.svg'
  },
  {
    slug: 'opencv',
    title: 'Raspberry Pi (Part 4)',
    description: 'Laptop Setup',
    date: '2023-07-25',
    categories: ["AI", "Python"],
    tags: [],
    image: '/assets/images/raspberry-pi-logo.svg'
  },
  {
    slug: 'sh1106',
    title: 'Raspberry Pi (Part 3)',
    description: 'Object Detection',
    date: '2023-07-24',
    categories: ["Python", "AI"],
    tags: [],
    image: '/assets/images/raspberry-pi-logo.svg'
  },
  {
    slug: 'pi2',
    title: 'Raspberry Pi (Part 2)',
    description: 'OLED display',
    date: '2023-07-22',
    categories: ["Python"],
    tags: [],
    image: '/assets/images/raspberry-pi-logo.svg'
  },
  {
    slug: 'pi1',
    title: 'Raspberry Pi (Part 1)',
    description: 'Raspberry Pi GPIO',
    date: '2023-07-22',
    categories: [],
    tags: [],
    image: '/assets/images/raspberry-pi-logo.svg'
  },
  {
    slug: 'langchain',
    title: 'Natural Language Processing (Part 4)',
    description: 'LangChain',
    date: '2023-07-21',
    categories: ["AI", "Python"],
    tags: [],
    image: '/assets/images/chatgpt-logo.svg'
  },
  {
    slug: 'contextinjection',
    title: 'Natural Language Processing (Part 3)',
    description: 'LangChain',
    date: '2023-07-19',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/chatgpt-logo.svg'
  },
  {
    slug: 'sentencesimilarity',
    title: 'Natural Language Processing (Part 2)',
    description: 'A comprehensive guide covering sentencesimilarity',
    date: '2023-07-19',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/chatgpt-logo.svg'
  },
  {
    slug: 'sentimentanalysis',
    title: 'Natural Language Processing (Part 1)',
    description: 'A comprehensive guide covering sentimentanalysis',
    date: '2023-07-19',
    categories: ["AI", "JavaScript"],
    tags: [],
    image: '/assets/images/chatgpt-logo.svg'
  },
  {
    slug: '3dprinting2',
    title: '3D Printing (Part 2)',
    description: 'A comprehensive guide covering 3d printing2',
    date: '2023-07-19',
    categories: [],
    tags: [],
    image: '/assets/images/wikipedia-globe-translucent-3d-printed-woodgrain-background-512x512.jpg'
  },
  {
    slug: '3dprinting1',
    title: '3D Printing (Part 1)',
    description: 'A comprehensive guide covering 3d printing1',
    date: '2023-07-15',
    categories: [],
    tags: [],
    image: '/assets/images/wikipedia-globe-translucent-3d-printed-woodgrain-background-512x512.jpg'
  },
  {
    slug: 'vbnetconsolesqlserverunittests',
    title: 'VB.NET Console SQL Server Unit Tests',
    description: 'Vbnet console sql server unit tests',
    date: '2023-05-27',
    categories: ["SQL", "AI", ".NET"],
    tags: [],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'ticktacktoe',
    title: 'Firebase Realtime Database',
    description: 'Multiplayer Tick-Tack-Toe',
    date: '2023-05-10',
    categories: ["AI", "React"],
    tags: [],
    image: '/assets/images/logo-lockup-firebase-vertical.svg'
  },
  {
    slug: 'angularphaser',
    title: 'Angular and Phaser',
    description: 'Multiplayer Tick-Tack-Toe',
    date: '2023-05-10',
    categories: ["Angular", "JavaScript", "React"],
    tags: [],
    image: '/assets/images/phaser-logo-1836x1530.png'
  },
  {
    slug: 'multiplayer',
    title: 'Firebase Realtime Database',
    description: 'Multiplayer Game',
    date: '2023-05-09',
    categories: ["JavaScript", "DevOps"],
    tags: [],
    image: '/assets/images/logo-lockup-firebase-vertical.svg'
  },
  {
    slug: 'angularfirebase',
    title: 'Angular Firebase',
    description: 'An Angular Firebase App',
    date: '2023-04-25',
    categories: ["Angular", "TypeScript", "React", "JavaScript"],
    tags: [],
    image: '/assets/images/logo-lockup-firebase-vertical.svg'
  },
  {
    slug: 'firebase',
    title: 'Firebase',
    description: 'A Firebase App',
    date: '2023-04-24',
    categories: ["JavaScript", "Azure"],
    tags: [],
    image: '/assets/images/logo-lockup-firebase-vertical.svg'
  },
  {
    slug: 'xcode4',
    title: 'XCode C++ (Part 4)',
    description: 'GLM (OpenGL Mathematics)',
    date: '2023-03-27',
    categories: [],
    tags: [],
    image: '/assets/images/xcode-14-icon-300x314.png'
  },
  {
    slug: 'vbnetwinforms',
    title: 'VB.NET WinForms and ASP.NET Core API',
    description: 'A comprehensive guide covering vbnetwinforms',
    date: '2023-03-27',
    categories: [".NET"],
    tags: [],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'aspnetcoreunittests',
    title: 'ASP.NET Core Unit Tests',
    description: 'A comprehensive guide covering aspnetcoreunittests',
    date: '2023-03-26',
    categories: [".NET"],
    tags: [],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'threetier',
    title: 'Blazor WASM, ASP.NET Core and SQL Server',
    description: 'A comprehensive guide covering threetier',
    date: '2023-03-25',
    categories: [".NET", "SQL"],
    tags: [],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'blazorwasmandasp.net',
    title: 'Blazor WASM and ASP.NET Core',
    description: 'A comprehensive guide covering blazorwasmandasp.net',
    date: '2023-03-24',
    categories: [".NET"],
    tags: [],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'angularandasp.net',
    title: 'Angular and ASP.NET Core',
    description: 'A comprehensive guide covering angularandasp.net',
    date: '2023-03-24',
    categories: [".NET", "Angular", "TypeScript", "React"],
    tags: [],
    image: '/assets/images/angular-full-color-logo.svg'
  },
  {
    slug: 'reactandasp.net',
    title: 'React (Part 2)',
    description: 'A comprehensive guide covering reactandasp.net',
    date: '2023-03-22',
    categories: ["React", ".NET"],
    tags: [],
    image: '/assets/images/logo512-512x512.png'
  },
  {
    slug: 'aspnet-core',
    title: 'ASP.NET Core',
    description: 'A comprehensive guide covering asp.net core',
    date: '2023-03-21',
    categories: [".NET", "SQL"],
    tags: [],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'aspnet-5-cs',
    title: 'ASP.NET 5 C#',
    description: 'A comprehensive guide covering asp.net 5 cs',
    date: '2023-03-19',
    categories: [".NET", "AI"],
    tags: [],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'aspnet-5-visual-basic',
    title: 'ASP.NET 5 Visual Basic',
    description: 'A comprehensive guide covering asp.net 5 visual basic',
    date: '2023-03-18',
    categories: [".NET", "SQL", "DevOps", "Azure"],
    tags: [],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'dotnet-core-part2',
    title: '.NET Core (Part 2)',
    description: 'A comprehensive guide covering dotnet core part2',
    date: '2023-03-15',
    categories: [".NET", "Microsoft 365", "Azure", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'xcode3',
    title: 'XCode C++ (Part 3)',
    description: 'OpenGL GLEW',
    date: '2023-03-08',
    categories: [],
    tags: [],
    image: '/assets/images/xcode-14-icon-300x314.png'
  },
  {
    slug: 'xcode2',
    title: 'XCode C++ (Part 2)',
    description: 'OpenGL GLEW',
    date: '2023-03-08',
    categories: [],
    tags: [],
    image: '/assets/images/xcode-14-icon-300x314.png'
  },
  {
    slug: 'xcode1',
    title: 'XCode C++ (Part 1)',
    description: 'OpenGL GLFW',
    date: '2023-03-08',
    categories: [],
    tags: [],
    image: '/assets/images/xcode-14-icon-300x314.png'
  },
  {
    slug: 'threejs',
    title: 'Three.js',
    description: 'Hello, World!',
    date: '2023-03-05',
    categories: ["JavaScript"],
    tags: [],
    image: '/assets/images/three.js-icon.svg'
  },
  {
    slug: 'ngrxentity',
    title: 'NGRX entity',
    description: 'Managing record collections',
    date: '2023-02-18',
    categories: ["TypeScript", "React", "Angular", "JavaScript"],
    tags: [],
    image: '/assets/images/ngrx.svg'
  },
  {
    slug: 'ngrxdevtools',
    title: 'NGRX devtools',
    description: 'Troubleshooting NGRX applications',
    date: '2023-01-25',
    categories: ["Angular"],
    tags: [],
    image: '/assets/images/ngrx.svg'
  },
  {
    slug: 'sharepoint2019',
    title: 'SharePoint 2019 Trial',
    description: 'SharePoint hosted in Azure',
    date: '2022-12-31',
    categories: ["Microsoft 365", "SQL", "Azure"],
    tags: [],
    image: '/assets/images/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png'
  },
  {
    slug: 'ngrx',
    title: 'NGRX',
    description: 'A framework for building reactive applications in Angular',
    date: '2022-11-27',
    categories: ["Angular", "React", "TypeScript", "JavaScript"],
    tags: [],
    image: '/assets/images/ngrx.svg'
  },
  {
    slug: 'componentframework',
    title: 'Power Apps (Part 7)',
    description: 'Power Apps Component Framework',
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
    description: 'Manage compliance across Microsoft 365',
    date: '2022-08-03',
    categories: ["Microsoft 365"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'powerapps6',
    title: 'Power Apps (Part 6)',
    description: 'A Custom Connector for Microsoft Graph',
    date: '2022-07-04',
    categories: ["Microsoft 365", "Power Platform", "Azure"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'machinelearning9',
    title: 'Machine Learning (Part 9)',
    description: 'The MNIST database',
    date: '2022-06-17',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning8',
    title: 'Machine Learning (Part 8)',
    description: 'Baseball Signs',
    date: '2022-06-12',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning7',
    title: 'Machine Learning (Part 7)',
    description: 'AutoML Machine Learning Models',
    date: '2022-06-11',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning6',
    title: 'Machine Learning (Part 6)',
    description: 'Binary classification',
    date: '2022-06-11',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning5',
    title: 'Machine Learning (Part 5)',
    description: 'Linear Regression',
    date: '2022-06-11',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning4',
    title: 'Machine Learning (Part 4)',
    description: 'Notebooks',
    date: '2022-06-08',
    categories: ["Python", "AI"],
    tags: [],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning3',
    title: 'Machine Learning (Part 3)',
    description: 'Notebooks',
    date: '2022-06-05',
    categories: ["AI", "DevOps"],
    tags: [],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning2',
    title: 'Machine Learning (Part 2)',
    description: 'Low hanging fruit',
    date: '2022-06-05',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning1',
    title: 'Machine Learning (Part 1)',
    description: 'Science fair',
    date: '2022-06-05',
    categories: ["AI"],
    tags: [],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'ateamstabsharepointwebpartforonedrive',
    title: 'A Teams App SharePoint Web Part for One Drive',
    description: 'Using SPFx and the Graph Toolkit',
    date: '2022-05-29',
    categories: ["Microsoft 365", "React", "JavaScript", "TypeScript"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'javascriptgraph',
    title: 'JavaScript and Microsoft Graph',
    description: 'A Node App that accesses Microsoft 365',
    date: '2022-05-28',
    categories: ["JavaScript", "Microsoft 365", "Azure"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'microsoftgraph',
    title: 'Microsoft Graph',
    description: 'Explore Microsoft 365',
    date: '2022-05-26',
    categories: ["Microsoft 365", "Microsoft Dynamics"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'powerautomate',
    title: 'Power Automate',
    description: 'Automate tasks in Microsoft 365',
    date: '2022-05-04',
    categories: ["Microsoft 365", "Power Platform"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'webxr',
    title: 'WebXR',
    description: 'Create Augmented Reality Experiences',
    date: '2022-04-22',
    categories: ["JavaScript"],
    tags: [],
    image: '/assets/images/34385910-400x400.png'
  },
  {
    slug: 'leaflet',
    title: 'Leaflet',
    description: 'A comprehensive guide covering leaflet',
    date: '2022-02-21',
    categories: ["Azure"],
    tags: [],
    image: '/assets/images/leaflet-upic-200x200.png'
  },
  {
    slug: 'webcomponents',
    title: 'Web Components',
    description: 'A comprehensive guide covering webcomponents',
    date: '2022-02-10',
    categories: ["React"],
    tags: [],
    image: '/assets/images/web-components-logo.svg'
  },
  {
    slug: 'phaser',
    title: 'Phaser',
    description: 'A comprehensive guide covering phaser',
    date: '2022-01-23',
    categories: ["JavaScript", ".NET"],
    tags: [],
    image: '/assets/images/phaser-logo-1836x1530.png'
  },
  {
    slug: 'nextjs5',
    title: 'Next.js (Part 5)',
    description: 'A comprehensive guide covering nextjs5',
    date: '2022-01-13',
    categories: ["TypeScript", "React", ".NET"],
    tags: [],
    image: '/assets/images/2560px-nextjs-logo.svg-1536x920.png'
  },
  {
    slug: 'ionic',
    title: 'Ionic and PouchDB',
    description: 'A comprehensive guide covering ionic',
    date: '2021-12-22',
    categories: ["React", "TypeScript", "Azure", "DevOps"],
    tags: [],
    image: '/assets/images/logo-192x192.png'
  },
  {
    slug: 'mysql',
    title: 'MySQL',
    description: 'A comprehensive guide covering mysql',
    date: '2021-11-14',
    categories: ["SQL"],
    tags: [],
    image: '/assets/images/includes-mysql-5646x2872.png'
  },
  {
    slug: 'nextjs4',
    title: 'Next.js (Part 4)',
    description: 'A comprehensive guide covering nextjs4',
    date: '2021-11-11',
    categories: ["Azure", "JavaScript", "React", ".NET"],
    tags: [],
    image: '/assets/images/2560px-nextjs-logo.svg-1536x920.png'
  },
  {
    slug: 'nextjs3',
    title: 'Next.js (Part 3)',
    description: 'A comprehensive guide covering nextjs3',
    date: '2021-11-07',
    categories: ["JavaScript", "React"],
    tags: [],
    image: '/assets/images/2560px-nextjs-logo.svg-1536x920.png'
  },
  {
    slug: 'nextjs2',
    title: 'Next.js (Part 2)',
    description: 'A comprehensive guide covering nextjs2',
    date: '2021-11-06',
    categories: ["React"],
    tags: [],
    image: '/assets/images/2560px-nextjs-logo.svg-1536x920.png'
  },
  {
    slug: 'nextjs1',
    title: 'Next.js (Part 1)',
    description: 'A comprehensive guide covering nextjs1',
    date: '2021-11-05',
    categories: ["JavaScript", "React"],
    tags: [],
    image: '/assets/images/2560px-nextjs-logo.svg-1536x920.png'
  },
  {
    slug: 'sails3',
    title: 'Sails (Part 3)',
    description: 'A comprehensive guide covering sails3',
    date: '2021-10-13',
    categories: ["DevOps", "AWS", "Azure", "JavaScript"],
    tags: [],
    image: '/assets/images/sailsjs-logo-515x193.png'
  },
  {
    slug: 'sails2',
    title: 'Sails (Part 2)',
    description: 'A comprehensive guide covering sails2',
    date: '2021-10-12',
    categories: ["Azure", ".NET", "AI"],
    tags: [],
    image: '/assets/images/sailsjs-logo-515x193.png'
  },
  {
    slug: 'sails1',
    title: 'Sails (Part 1)',
    description: 'A comprehensive guide covering sails1',
    date: '2021-10-12',
    categories: ["DevOps", "JavaScript", "Azure", "AI"],
    tags: [],
    image: '/assets/images/sailsjs-logo-515x193.png'
  },
  {
    slug: 'aspnetcoreawseks',
    title: 'Amazon EKS (Part 2)',
    description: 'A comprehensive guide covering aspnetcoreawseks',
    date: '2021-08-16',
    categories: ["AWS", "DevOps", ".NET"],
    tags: [],
    image: '/assets/images/amazon-web-services-logo.svg'
  },
  {
    slug: 'amazoneks',
    title: 'Amazon EKS (Part 1)',
    description: 'A comprehensive guide covering  amazon e k s',
    date: '2021-08-12',
    categories: ["AWS", "DevOps"],
    tags: [],
    image: '/assets/images/amazon-web-services-logo.svg'
  },
  {
    slug: 'amazonecs',
    title: 'Amazon Elastic Container Service',
    description: 'A comprehensive guide covering amazon elastic container service',
    date: '2025-09-20',
    categories: ["AWS", "DevOps", "AI"],
    tags: [],
    image: '/assets/images/amazonecs/amazon-web-services-logo.svg'
  },
  {
    slug: 'amazonfargate',
    title: 'Amazon Fargate',
    description: 'A comprehensive guide covering amazon fargate',
    date: '2025-09-20',
    categories: ["AWS", "DevOps"],
    tags: [],
    image: '/assets/images/amazonfargate/amazon-web-services-logo.svg'
  },
  {
    slug: 'customconnectorsappregistrations',
    title: 'Power Apps (Part 5)',
    description: 'A comprehensive guide covering customconnectorsappregistrations',
    date: '2021-08-09',
    categories: ["Azure", "JavaScript", "Power Platform"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'api-management',
    title: 'Power Apps (Part 4)',
    description: 'A comprehensive guide covering  a p i  management',
    date: '2021-08-02',
    categories: ["Power Platform", "Azure"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'pwa',
    title: 'Progressive Web Application',
    description: 'A comprehensive guide covering pwa',
    date: '2021-07-24',
    categories: ["Azure"],
    tags: [],
    image: '/assets/images/progressive-web-apps-logo.svg'
  },
  {
    slug: 'powerappsapplication',
    title: 'Power Apps (Part 3)',
    description: 'A comprehensive guide covering powerappsapplication',
    date: '2021-07-13',
    categories: ["Power Platform", "React"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'customcomponents',
    title: 'Power Apps (Part 2)',
    description: 'A comprehensive guide covering customcomponents',
    date: '2021-07-13',
    categories: ["Power Platform", "React"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'powerappswithrest',
    title: 'Power Apps (Part 1)',
    description: 'A comprehensive guide covering powerappswithrest',
    date: '2021-06-27',
    categories: ["Power Platform", ".NET", "Azure"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'teamstoolkitspfx',
    title: 'Teams Toolkit with SPFx',
    description: 'A comprehensive guide covering teamstoolkitspfx',
    date: '2021-05-30',
    categories: ["Microsoft 365", "Azure"],
    tags: [],
    image: '/assets/images/teams-hi-res-icon-2019.svg'
  },
  {
    slug: 'teamstoolkit',
    title: 'Teams Toolkit with Azure',
    description: 'A comprehensive guide covering teamstoolkit',
    date: '2021-05-29',
    categories: ["Microsoft 365", "Azure", "React", "SQL"],
    tags: [],
    image: '/assets/images/teams-hi-res-icon-2019.svg'
  },
  {
    slug: 'devopsstarterazuredevops',
    title: 'DevOps Starter Azure DevOps',
    description: 'A comprehensive guide covering devopsstarterazuredevops',
    date: '2021-04-26',
    categories: ["DevOps", "Azure", "JavaScript"],
    tags: [],
    image: '/assets/images/svgexport-22.svg'
  },
  {
    slug: 'devopsstartergithubactions',
    title: 'DevOps Starter GitHub actions',
    description: 'A comprehensive guide covering devopsstartergithubactions',
    date: '2021-04-25',
    categories: ["JavaScript", "DevOps", "Azure"],
    tags: [],
    image: '/assets/images/svgexport-22.svg'
  },
  {
    slug: 'azure-active-directory2',
    title: 'Azure Active Directory (Part 2)',
    description: 'A comprehensive guide covering azure-active-directory2',
    date: '2021-04-17',
    categories: ["Azure", "JavaScript", "React", "Microsoft 365"],
    tags: [],
    image: '/assets/images/azurex70x75.svg'
  },
  {
    slug: 'dotnet-core-part1',
    title: '.NET Core (Part 1)',
    description: 'A comprehensive guide covering dotnet core part1',
    date: '2021-04-10',
    categories: ["React", "Java", "DevOps"],
    tags: [],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'spring-boot',
    title: 'Java Spring Boot (Part 1)',
    description: 'A comprehensive guide covering spring-boot',
    date: '2021-04-06',
    categories: ["Java", "React"],
    tags: [],
    image: '/assets/images/spring-framework-logo-70-no.svg'
  },
  {
    slug: 'azure-active-directory',
    title: 'Azure Active Directory (Part 1)',
    description: 'A comprehensive guide covering azure-active-directory',
    date: '2021-03-29',
    categories: ["Azure", "JavaScript", "Microsoft 365"],
    tags: [],
    image: '/assets/images/azurex70x75.svg'
  },
  {
    slug: 'mssqlserver2',
    title: 'Microsoft SQL Server (Part 2)',
    description: 'A comprehensive guide covering mssqlserver2',
    date: '2021-03-27',
    categories: ["SQL", "Java"],
    tags: [],
    image: '/assets/images/ads.svg'
  },
  {
    slug: 'mssqlserver',
    title: 'Microsoft SQL Server (Part 1)',
    description: 'A comprehensive guide covering mssqlserver',
    date: '2021-03-14',
    categories: ["SQL", "Java", "DevOps"],
    tags: [],
    image: '/assets/images/ads.svg'
  },
  {
    slug: 'internetofthings2',
    title: 'Internet of Things (Part 2)',
    description: 'A comprehensive guide covering internet of things2',
    date: '2021-03-06',
    categories: ["AWS", "DevOps"],
    tags: [],
    image: '/assets/images/iot-microchip.svg'
  },
  {
    slug: 'internetofthings1',
    title: 'Internet of Things (Part 1)',
    description: 'A comprehensive guide covering internet of things1',
    date: '2021-03-03',
    categories: ["DevOps", "Java"],
    tags: [],
    image: '/assets/images/iot-microchip.svg'
  },
  {
    slug: 'webvr',
    title: 'WebVR',
    description: 'A comprehensive guide covering  web v r',
    date: '2021-03-02',
    categories: [],
    tags: [],
    image: '/assets/images/webvr-logo-square-512x512.png'
  },
  {
    slug: 'dockerbuildx',
    title: 'Docker Buildx',
    description: 'A comprehensive guide covering dockerbuildx',
    date: '2021-03-01',
    categories: ["DevOps", "JavaScript"],
    tags: [],
    image: '/assets/images/method-draw-image.svg'
  },
  {
    slug: 'graphql',
    title: 'GraphQL',
    description: 'A comprehensive guide covering  graph q l',
    date: '2021-03-01',
    categories: ["JavaScript", "React"],
    tags: [],
    image: '/assets/images/graphql-logo.svg-1200x1200.png'
  },
  {
    slug: 'nuget',
    title: 'NuGet C#',
    description: 'A comprehensive guide covering nuget',
    date: '2021-02-27',
    categories: [".NET", "DevOps"],
    tags: [],
    image: '/assets/images/logo-og-600x600.png'
  },
  {
    slug: 'npmcc',
    title: 'npm C++',
    description: 'A comprehensive guide covering npm c c',
    date: '2021-02-26',
    categories: ["JavaScript", "DevOps"],
    tags: [],
    image: '/assets/images/6078720-200x200.png'
  },
  {
    slug: 'npm',
    title: 'npm JavaScript',
    description: 'A comprehensive guide covering npm',
    date: '2021-02-25',
    categories: ["JavaScript", "DevOps"],
    tags: [],
    image: '/assets/images/6078720-200x200.png'
  },
  {
    slug: 'm365commandlineinterface',
    title: 'A Command Line Interface for Microsoft 365',
    description: 'A comprehensive guide covering m365 command line interface',
    date: '2021-02-22',
    categories: ["Microsoft 365", "DevOps"],
    tags: [],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'sharepointsitedesignsandsitescripts',
    title: 'SharePoint site designs and site scripts',
    description: 'A comprehensive guide covering sharepointsitedesignsandsitescripts',
    date: '2021-02-15',
    categories: ["Microsoft 365"],
    tags: [],
    image: '/assets/images/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png'
  },
  {
    slug: 'sharepointwebpart2',
    title: 'SharePoint Web Part (Part 2)',
    description: 'A comprehensive guide covering sharepointwebpart2',
    date: '2021-02-14',
    categories: ["React", "Microsoft 365", "TypeScript"],
    tags: [],
    image: '/assets/images/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png'
  },
  {
    slug: 'sharepointwebpart1',
    title: 'SharePoint Web Part (Part 1)',
    description: 'A comprehensive guide covering sharepointwebpart1',
    date: '2021-02-11',
    categories: ["React", "Microsoft 365", "TypeScript"],
    tags: [],
    image: '/assets/images/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png'
  },
  {
    slug: 'apigateway',
    title: 'API Gateway',
    description: 'A comprehensive guide covering apigateway',
    date: '2021-02-10',
    categories: ["DevOps", "React", "AWS", "Azure"],
    tags: [],
    image: '/assets/images/kubernetes-container-engine.svg'
  },
  {
    slug: 'reactusestateuseeffect',
    title: 'React (Part 1)',
    description: 'A comprehensive guide covering reactusestateuseeffect',
    date: '2021-02-08',
    categories: ["React"],
    tags: [],
    image: '/assets/images/logo512-512x512.png'
  },
  {
    slug: 'restapiservice',
    title: 'REST',
    description: 'A comprehensive guide covering restapiservice',
    date: '2021-02-06',
    categories: ["JavaScript", "DevOps"],
    tags: [],
    image: '/assets/images/fve-image.svg'
  },
  {
    slug: 'kubernetes',
    title: 'Kubernetes',
    description: 'A comprehensive guide covering kubernetes',
    date: '2021-02-06',
    categories: ["DevOps"],
    tags: [],
    image: '/assets/images/kubernetes-container-engine.svg'
  },
  {
    slug: 'docker',
    title: 'Docker',
    description: 'A comprehensive guide covering docker',
    date: '2021-02-06',
    categories: ["DevOps"],
    tags: [],
    image: '/assets/images/method-draw-image.svg'
  }

];

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getAllPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getPostById(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getVisibleBlogPosts(): BlogPost[] {
  return blogPosts.filter(post => !post.hidden);
}

// Functions for automated multi-category classification
export function getAutomatedCategories(): string[] {
  const allCategories = blogPosts
    .filter(post => post.categories && post.categories.length > 0)
    .flatMap(post => post.categories || []);
  const categories = [...new Set(allCategories)];
  return categories.sort();
}

export function getVisibleAutomatedCategories(): string[] {
  const visiblePosts = getVisibleBlogPosts();
  const allCategories = visiblePosts
    .filter(post => post.categories && post.categories.length > 0)
    .flatMap(post => post.categories || []);
  const categories = [...new Set(allCategories)];
  return categories.sort();
}

export function getBlogPostsByAutomatedCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => 
    post.categories && post.categories.includes(category)
  );
}

export function getVisibleBlogPostsByAutomatedCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => 
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
export function getBlogPostsByAnyCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => 
    post.categories && post.categories.includes(category)
  );
}

export function getVisibleBlogPostsByAnyCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => 
    !post.hidden && 
    post.categories && 
    post.categories.includes(category)
  );
}
