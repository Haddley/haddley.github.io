export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
}

export const blogPosts: BlogPost[] = [





  {
    slug: 'macscreensharing',
    title: 'Apple macOS',
    description: 'Screen Sharing VNC and SSH',
    date: '2025-08-18',
    category: 'Development',
    tags: ["blog"],
    image: '/assets/images/apple-logo-black.svg'
  },
  {
    slug: 'mcpserver',
    title: 'Model Context Protocol (Part 1)',
    description: 'Typescript Quickstart',
    date: '2025-08-13',
    category: 'Web Development',
    tags: ["typescript","ai"],
    image: '/assets/images/mcp-1024x1024.png'
  },
  {
    slug: 'syntexautofill',
    title: 'SharePoint',
    description: 'Syntex Autofill',
    date: '2025-07-30',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png'
  },
  {
    slug: 'OllamaDeepSekR1AppleMacBookInstall',
    title: 'Ollama DeepSeek R1',
    description: 'Apple MacBook Install',
    date: '2025-05-24',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/254932576-0d0b44e2-8f4a-4e99-9b52-a5c1c741c8f7-844x844.png'
  },
  {
    slug: 'promptdialog3',
    title: 'Business Central (Part 29)',
    description: 'Prompt Dialog Markdown (Part 3)',
    date: '2024-05-24',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'promptdialog2',
    title: 'Business Central (Part 28)',
    description: 'Prompt Dialog Azure Open AI (Part 2)',
    date: '2024-05-24',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'promptdialog',
    title: 'Business Central (Part 27)',
    description: 'Prompt Dialog Introduction (Part 1)',
    date: '2024-05-24',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'internetOfThings3',
    title: 'Internet of Things (Part 3)',
    description: 'Edge Impulse',
    date: '2025-03-01',
    category: 'Mobile & IoT',
    tags: ["blog"],
    image: '/assets/images/iot-microchip.svg'
  },
  {
    slug: 'azureopenal',
    title: 'Azure AI Foundry',
    description: 'Azure OpenAI Service',
    date: '2025-02-04',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/azurex70x75.svg'
  },
  {
    slug: 'BusinessCentralPart26IntegrationTable',
    title: 'Business Central (Part 26)',
    description: 'Integration Tables',
    date: '2024-12-22',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'PowerApps23ConfigurationMigrationTool',
    title: 'Power Apps (Part 23)',
    description: 'Configuration Migration Tool (CMT)',
    date: '2025-01-01',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'powerPages3',
    title: 'Power Pages (Part 3)',
    description: 'Customer Order Lines',
    date: '2024-12-20',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/powerpages-scalable.svg'
  },
  {
    slug: 'powerPages2',
    title: 'Power Pages (Part 2)',
    description: 'Customer Orders',
    date: '2024-12-20',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/powerpages-scalable.svg'
  },
  {
    slug: 'BusinessCentralPart25IntegratingWithDataverseUsingDataflows',
    title: 'Business Central (Part 25)',
    description: 'Customer Orders',
    date: '2024-12-01',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'langflow1',
    title: 'Langflow (Part 1)',
    description: 'OpenAI text to speech',
    date: '2024-10-30',
    category: 'AI & Machine Learning',
    tags: ["python","ai"],
    image: '/assets/images/85702467-200x200.png'
  },
  {
    slug: 'powerPages1',
    title: 'Power Pages (Part 1)',
    description: 'A Business Central Customer Portal',
    date: '2024-10-26',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/powerpages-scalable.svg'
  },
  {
    slug: 'promptFlow6',
    title: 'Prompt flow (Part 6)',
    description: 'With Semantic Kernel and Planner',
    date: '2024-09-01',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/logo.svg'
  },
  {
    slug: 'promptFlow5',
    title: 'Prompt flow (Part 5)',
    description: 'With LangChain',
    date: '2024-09-01',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/logo.svg'
  },
  {
    slug: 'langchainagents',
    title: 'LangChain',
    description: 'With LangChain',
    date: '2024-08-25',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/langchain.svg'
  },
  {
    slug: 'phpsetup',
    title: 'PHP',
    description: 'Agents',
    date: '2024-08-25',
    category: 'Development Tools',
    tags: ["blog"],
    image: '/assets/images/php-logo.svg'
  },
  {
    slug: 'dataverseadvancedreportssetup',
    title: 'Power Apps (Part 22)',
    description: 'Setup',
    date: '2024-08-10',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'powerautomatereports',
    title: 'Power Apps (Part 21)',
    description: 'Microsoft Power Automate Reports',
    date: '2024-07-19',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'dataversereports',
    title: 'Power Apps (Part 20)',
    description: 'Microsoft Dataverse Reports',
    date: '2024-07-19',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'promptFlow4',
    title: 'Prompt flow (Part 4)',
    description: 'Planner',
    date: '2024-08-24',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/logo.svg'
  },
  {
    slug: 'promptFlow3',
    title: 'Prompt flow (Part 3)',
    description: 'Planner',
    date: '2024-08-24',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/logo.svg'
  },
  {
    slug: 'promptFlow2',
    title: 'Prompt flow (Part 2)',
    description: 'Semantic Kernel',
    date: '2024-06-12',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/logo.svg'
  },
  {
    slug: 'promptFlow1',
    title: 'Prompt flow (Part 1)',
    description: 'Docker',
    date: '2024-06-11',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/logo.svg'
  },
  {
    slug: 'customtvirtualtables',
    title: 'Power Apps (Part 18)',
    description: 'Setup',
    date: '2024-05-07',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'blogcopilotstudio',
    title: 'Dynamics 365 Business Central (Part 24)',
    description: 'A comprehensive guide covering blog copilot studio',
    date: '2024-03-24',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'customcopilotstudio',
    title: 'Dynamics 365 Business Central (Part 23)',
    description: 'A comprehensive guide covering custom copilot studio',
    date: '2024-03-23',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'configurecopilotsinglesignonforweb',
    title: 'Power Apps (Part 17)',
    description: 'Configure Copilot single sign-on for Web',
    date: '2024-03-16',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'customizedefaultcanvas',
    title: 'Power Apps (Part 16)',
    description: 'styleOptions',
    date: '2024-03-11',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'copilotembedcode',
    title: 'Power Apps (Part 15)',
    description: 'Copilot Embed Code',
    date: '2024-03-11',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'staticwebapp.config.json',
    title: 'Azure Active Directory (Part 3)',
    description: 'staticwebapp.config.json and environment variables',
    date: '2024-03-10',
    category: 'Cloud & DevOps',
    tags: ["azure","ai","ml","git","github"],
    image: '/assets/images/azurex70x75.svg'
  },
  {
    slug: 'codespacesauthentication',
    title: 'React (Part 4)',
    description: 'Codespaces and Authentication',
    date: '2024-03-06',
    category: 'Cloud & DevOps',
    tags: ["blog"],
    image: '/assets/images/logo512-512x512.png'
  },
  {
    slug: 'modeldrivenpurchaseorderlines',
    title: 'Power Apps (Part 14)',
    description: 'Model Driven Purchase Order Lines',
    date: '2024-03-03',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'modeldrivenpurchaseorders',
    title: 'Power Apps (Part 13)',
    description: 'Model Driven Purchase Orders',
    date: '2024-03-02',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'cloudflow',
    title: 'Power Apps (Part 12)',
    description: 'Copilot Studio Topic with a Cloud Flow',
    date: '2024-02-26',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'topics',
    title: 'Power Apps (Part 11)',
    description: 'Copilot Studio Topic with a Connector',
    date: '2024-02-25',
    category: 'AI & Machine Learning',
    tags: ["business central"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'pluginActions',
    title: 'Power Apps (Part 10)',
    description: 'Copilot Studio Plugin Actions',
    date: '2024-02-24',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'addAPurchaseOrder',
    title: 'Power Apps (Part 9)',
    description: 'Adding a Purchase Order',
    date: '2024-02-21',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'addAnItem',
    title: 'Power Apps (Part 8)',
    description: 'Adding an Item',
    date: '2024-02-17',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'azureReactStaticWeb App',
    title: 'React (Part 3)',
    description: 'Adding an Item',
    date: '2024-01-08',
    category: 'Cloud & DevOps',
    tags: ["blog"],
    image: '/assets/images/logo512-512x512.png'
  },
  {
    slug: 'businessCentralVirtualTable',
    title: 'Dynamics 365 Business Central (Part 22)',
    description: 'Business Central Virtual Table',
    date: '2024-01-12',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'createActionBasedOnAFlow',
    title: 'Dynamics 365 Business Central (Part 21)',
    description: 'Create action based on a flow',
    date: '2024-01-04',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'businessCentralPowerAutomateFlow',
    title: 'Dynamics 365 Business Central (Part 20)',
    description: 'Power Automate Flow',
    date: '2024-01-02',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'gingerbreadHouse',
    title: 'Raspberry Pi (Part 5)',
    description: 'Gingerbread House',
    date: '2023-12-26',
    category: 'Mobile & IoT',
    tags: ["blog"],
    image: '/assets/images/raspberry-pi-logo.svg'
  },
  {
    slug: 'businessCentralMicrosoftGraph',
    title: 'Dynamics 365 Business Central (Part 19)',
    description: 'Microsoft Graph',
    date: '2023-12-18',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'salesInvoice',
    title: 'Dynamics 365 Business Central (Part 18)',
    description: 'Sales Invoice',
    date: '2023-12-14',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'purchaseInvoice',
    title: 'Dynamics 365 Business Central (Part 17)',
    description: 'Sales Invoice',
    date: '2023-12-14',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'generalPostingSetup',
    title: 'Dynamics 365 Business Central (Part 16)',
    description: 'General Posting Setup',
    date: '2023-12-14',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'customerPostingGroup',
    title: 'Dynamics 365 Business Central (Part 15)',
    description: 'Customer Posting Group',
    date: '2023-12-14',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'vendorPostingGroup',
    title: 'Dynamics 365 Business Central (Part 14)',
    description: 'Vendor Posting Group',
    date: '2023-12-12',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/posts-meta.svg'
  },
  {
    slug: 'generalLedger',
    title: 'Dynamics 365 Business Central (Part 13)',
    description: 'General Ledger',
    date: '2023-12-11',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'hands-on-lab3.1',
    title: 'Dynamics 365 Business Central (Part 12)',
    description: 'Hands-on-Lab 3.1',
    date: '2023-12-04',
    category: 'Microsoft 365',
    tags: ["ai","business central","dynamics","git"],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'hands-on-lab2.3',
    title: 'Dynamics 365 Business Central (Part 11)',
    description: 'Hands-on-Lab 2.3',
    date: '2023-12-04',
    category: 'Microsoft 365',
    tags: ["ai","dynamics"],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'hands-on-lab2.2',
    title: 'Dynamics 365 Business Central (Part 10)',
    description: 'Hands-on-Lab 2.2',
    date: '2023-11-22',
    category: 'Microsoft 365',
    tags: ["ai","dynamics"],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'hands-on-lab2.1',
    title: 'Dynamics 365 Business Central (Part 9)',
    description: 'Hands-on-Lab 2.1',
    date: '2023-11-22',
    category: 'Microsoft 365',
    tags: ["database","ai","business central","dynamics"],
    image: '/assets/images/hands-on-lab2.1/hero.png'
  },
  {
    slug: 'dynamicsSales3',
    title: 'Microsoft Dynamics 365 Sales (Part 3)',
    description: 'Adding a Warranty table',
    date: '2023-10-21',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'dynamicsSales2',
    title: 'Microsoft Dynamics 365 Sales (Part 2)',
    description: 'Updating the Lead to Opportunity Business Process Flow',
    date: '2023-10-21',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'dynamicsSales1',
    title: 'Microsoft Dynamics 365 Sales (Part 1)',
    description: 'Updating the Sales Insights form',
    date: '2023-10-21',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'modelDriven4',
    title: 'Model Driven Apps (Part 4)',
    description: 'Model-driven apps Power FX',
    date: '2023-10-09',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'modelDriven3',
    title: 'Model Driven Apps (Part 3)',
    description: 'Model-driven apps JavaScript Developer Guide',
    date: '2023-10-08',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'modelDriven2',
    title: 'Model Driven Apps (Part 2)',
    description: 'Business Process Flow',
    date: '2023-10-05',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'modelDriven1',
    title: 'Model Driven Apps (Part 1)',
    description: 'Dataverse users, business units and security roles',
    date: '2023-09-18',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'aShortHistory',
    title: 'Microsoft Dynamics 365',
    description: 'A Short History of Microsoft Dynamics and Microsoft Dataverse',
    date: '2023-09-09',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'mapExtension',
    title: 'Microsoft Dynamics 365 Business Central (Part 8)',
    description: 'Maps Extension',
    date: '2023-09-01',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'rewardsExtension',
    title: 'Microsoft Dynamics 365 Business Central (Part 7)',
    description: 'Maps Extension',
    date: '2023-08-30',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'AL-Go-PTE',
    title: 'Microsoft Dynamics 365 Business Central (Part 6)',
    description: 'AL-Go-PTE',
    date: '2023-08-26',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'financialOperationsPurchaseInvoice',
    title: 'Microsoft Dynamics 365 Business Central (Part 5)',
    description: 'AL-Go-PTE',
    date: '2023-08-20',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'warehouseManagementPutAway',
    title: 'Microsoft Dynamics 365 Business Central (Part 4)',
    description: 'Put-away',
    date: '2023-08-19',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'businessCentralAdminCenter',
    title: 'Microsoft Dynamics 365 Business Central (Part 3)',
    description: 'Admin Center',
    date: '2023-08-18',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'businessCentralCanvasApps',
    title: 'Microsoft Dynamics 365 Business Central (Part 2)',
    description: 'Canvas Apps',
    date: '2023-08-14',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'dynamicsTrialSignup',
    title: 'Microsoft Dynamics 365 Business Central (Part 1)',
    description: 'Trial Signup',
    date: '2023-08-14',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/dynamics365-color.svg'
  },
  {
    slug: 'spring-boot-6',
    title: 'Java Spring Boot (Part 6)',
    description: 'OAuth2 Login',
    date: '2023-10-31',
    category: 'Java',
    tags: ["java","spring","ai","git","github"],
    image: '/assets/images/spring-framework-logo-70-no.svg'
  },
  {
    slug: 'spring-boot-5',
    title: 'Java Spring Boot (Part 5)',
    description: 'OAuth2 Login',
    date: '2023-10-30',
    category: 'Java',
    tags: ["java","spring","ai","ml","git"],
    image: '/assets/images/spring-framework-logo-70-no.svg'
  },
  {
    slug: 'spring-boot-4',
    title: 'Java Spring Boot (Part 4)',
    description: 'Spring ModelAndView',
    date: '2023-10-29',
    category: 'Java',
    tags: ["java","spring"],
    image: '/assets/images/spring-framework-logo-70-no.svg'
  },
  {
    slug: 'spring-boot-3',
    title: 'Java Spring Boot (Part 3)',
    description: 'Spring Data JPA',
    date: '2023-10-28',
    category: 'Java',
    tags: ["azure","java","spring","git","github"],
    image: '/assets/images/spring-framework-logo-70-no.svg'
  },
  {
    slug: 'spring-boot-2',
    title: 'Java Spring Boot (Part 2)',
    description: 'Deploying from GitHub to Azure',
    date: '2023-10-26',
    category: 'Java',
    tags: ["azure","java","spring","ai","git"],
    image: '/assets/images/spring-framework-logo-70-no.svg'
  },
  {
    slug: 'promptEngineering',
    title: 'Meta\'s Llama 2 (Part 2)',
    description: 'Prompt Engineering',
    date: '2023-08-08',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/mediamodifier-design.png'
  },
  {
    slug: 'LMStudio',
    title: 'Meta\'s Llama 2 (Part 1)',
    description: 'LM Studio',
    date: '2023-08-05',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/mediamodifier-design.png'
  },
  {
    slug: 'llamaCorp',
    title: 'Jupyter (Part 4)',
    description: 'LM Studio',
    date: '2023-08-03',
    category: 'Development',
    tags: ["blog"],
    image: '/assets/images/jupyter.svg'
  },
  {
    slug: 'colorization',
    title: 'Jupyter (Part 3)',
    description: 'Colorization',
    date: '2023-08-03',
    category: 'Development',
    tags: [],
    image: '/assets/images/jupyter.svg'
  },
  {
    slug: 'stableDiffusion',
    title: 'Jupyter (Part 2)',
    description: 'Colorization',
    date: '2023-08-01',
    category: 'Development',
    tags: ["blog"],
    image: '/assets/images/jupyter.svg'
  },
  {
    slug: 'appleLaptop',
    title: 'Jupyter (Part 1)',
    description: 'Laptop Setup',
    date: '2023-07-25',
    category: 'Development',
    tags: ["blog"],
    image: '/assets/images/jupyter.svg'
  },
  {
    slug: 'OpenCV',
    title: 'Raspberry Pi (Part 4)',
    description: 'Laptop Setup',
    date: '2023-07-25',
    category: 'Mobile & IoT',
    tags: ["blog"],
    image: '/assets/images/raspberry-pi-logo.svg'
  },
  {
    slug: 'SH1106',
    title: 'Raspberry Pi (Part 3)',
    description: 'Object Detection',
    date: '2023-07-24',
    category: 'Mobile & IoT',
    tags: ["blog"],
    image: '/assets/images/raspberry-pi-logo.svg'
  },
  {
    slug: 'pi2',
    title: 'Raspberry Pi (Part 2)',
    description: 'OLED display',
    date: '2023-07-22',
    category: 'Mobile & IoT',
    tags: ["python","ai"],
    image: '/assets/images/raspberry-pi-logo.svg'
  },
  {
    slug: 'pi1',
    title: 'Raspberry Pi (Part 1)',
    description: 'Raspberry Pi GPIO',
    date: '2023-07-22',
    category: 'Mobile & IoT',
    tags: [],
    image: '/assets/images/raspberry-pi-logo.svg'
  },
  {
    slug: 'langchain',
    title: 'Natural Language Processing (Part 4)',
    description: 'LangChain',
    date: '2023-07-21',
    category: 'AI/ML',
    tags: ["python","ai","ml","machine learning"],
    image: '/assets/images/chatgpt-logo.svg'
  },
  {
    slug: 'contextinjection',
    title: 'Natural Language Processing (Part 3)',
    description: 'LangChain',
    date: '2023-07-19',
    category: 'AI & Machine Learning',
    tags: ["database","ai"],
    image: '/assets/images/chatgpt-logo.svg'
  },
  {
    slug: 'sentencesimilarity',
    title: 'Natural Language Processing (Part 2)',
    description: 'A comprehensive guide covering sentencesimilarity',
    date: '2023-07-19',
    category: 'Development',
    tags: ["ai"],
    image: '/assets/images/chatgpt-logo.svg'
  },
  {
    slug: 'sentimentanalysis',
    title: 'Natural Language Processing (Part 1)',
    description: 'A comprehensive guide covering sentimentanalysis',
    date: '2023-07-19',
    category: 'Development',
    tags: ["ai","machine learning"],
    image: '/assets/images/chatgpt-logo.svg'
  },
  {
    slug: '3dPrinting2',
    title: '3D Printing (Part 2)',
    description: 'A comprehensive guide covering 3d printing2',
    date: '2023-07-19',
    category: 'Development',
    tags: ["blog"],
    image: '/assets/images/wikipedia-globe-translucent-3d-printed-woodgrain-background-512x512.jpg'
  },
  {
    slug: '3dPrinting1',
    title: '3D Printing (Part 1)',
    description: 'A comprehensive guide covering 3d printing1',
    date: '2023-07-15',
    category: 'Development',
    tags: ["blog"],
    image: '/assets/images/wikipedia-globe-translucent-3d-printed-woodgrain-background-512x512.jpg'
  },
  {
    slug: 'VBNETConsoleSQLServerUnitTests',
    title: 'VB.NET Console SQL Server Unit Tests',
    description: 'A comprehensive guide covering  v b n e t console s q l server unit tests',
    date: '2023-05-27',
    category: '.NET Development',
    tags: ["blog"],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'ticktacktoe',
    title: 'Firebase Realtime Database',
    description: 'Multiplayer Tick-Tack-Toe',
    date: '2023-05-10',
    category: 'Data & Analytics',
    tags: ["javascript","java","database","ai","ml"],
    image: '/assets/images/logo-lockup-firebase-vertical.svg'
  },
  {
    slug: 'angularphaser',
    title: 'Angular and Phaser',
    description: 'Multiplayer Tick-Tack-Toe',
    date: '2023-05-10',
    category: 'Web Development',
    tags: ["angular","ml"],
    image: '/assets/images/phaser-logo-1836x1530.png'
  },
  {
    slug: 'multiplayer',
    title: 'Firebase Realtime Database',
    description: 'Multiplayer Game',
    date: '2023-05-09',
    category: 'Data & Analytics',
    tags: ["javascript","java","database","ai","ml"],
    image: '/assets/images/logo-lockup-firebase-vertical.svg'
  },
  {
    slug: 'angularfirebase',
    title: 'Angular Firebase',
    description: 'An Angular Firebase App',
    date: '2023-04-25',
    category: 'Web Development',
    tags: ["angular","react","ai","ml"],
    image: '/assets/images/logo-lockup-firebase-vertical.svg'
  },
  {
    slug: 'firebase',
    title: 'Firebase',
    description: 'A Firebase App',
    date: '2023-04-24',
    category: 'Development',
    tags: ["cloud","database","ai","git","github"],
    image: '/assets/images/logo-lockup-firebase-vertical.svg'
  },
  {
    slug: 'xcode4',
    title: 'XCode C++ (Part 4)',
    description: 'GLM (OpenGL Mathematics)',
    date: '2023-03-27',
    category: 'Mobile & IoT',
    tags: ["ai","ml"],
    image: '/assets/images/xcode-14-icon-300x314.png'
  },
  {
    slug: 'vbnetwinforms',
    title: 'VB.NET WinForms and ASP.NET Core API',
    description: 'A comprehensive guide covering vbnetwinforms',
    date: '2023-03-27',
    category: '.NET Development',
    tags: ["dotnet","ai","asp.net"],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'aspnetcoreunittests',
    title: 'ASP.NET Core Unit Tests',
    description: 'A comprehensive guide covering aspnetcoreunittests',
    date: '2023-03-26',
    category: '.NET',
    tags: ["dotnet","ai","asp.net"],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'threetier',
    title: 'Blazor WASM, ASP.NET Core and SQL Server',
    description: 'A comprehensive guide covering threetier',
    date: '2023-03-25',
    category: '.NET Development',
    tags: ["dotnet","sql","database","ai","asp.net"],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'blazorwasmandasp.net',
    title: 'Blazor WASM and ASP.NET Core',
    description: 'A comprehensive guide covering blazorwasmandasp.net',
    date: '2023-03-24',
    category: '.NET',
    tags: ["dotnet","c#","database","ai","asp.net"],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'angularandasp.net',
    title: 'Angular and ASP.NET Core',
    description: 'A comprehensive guide covering angularandasp.net',
    date: '2023-03-24',
    category: 'Web Development',
    tags: ["angular","react","dotnet","database","ai"],
    image: '/assets/images/angular-full-color-logo.svg'
  },
  {
    slug: 'reactandasp.net',
    title: 'React (Part 2)',
    description: 'A comprehensive guide covering reactandasp.net',
    date: '2023-03-22',
    category: '.NET',
    tags: ["angular","react","dotnet","sql","database"],
    image: '/assets/images/logo512-512x512.png'
  },
  {
    slug: 'asp.net core',
    title: 'ASP.NET Core',
    description: 'A comprehensive guide covering asp.net core',
    date: '2023-03-21',
    category: '.NET',
    tags: ["dotnet","sql","database","ai","ml"],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'asp.net 5 cs',
    title: 'ASP.NET 5 C#',
    description: 'A comprehensive guide covering asp.net 5 cs',
    date: '2023-03-19',
    category: '.NET',
    tags: ["dotnet","c#","database","ai","ml"],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'asp.net 5 visual basic',
    title: 'ASP.NET 5 Visual Basic',
    description: 'A comprehensive guide covering asp.net 5 visual basic',
    date: '2023-03-18',
    category: '.NET',
    tags: ["azure","docker","dotnet","sql","database"],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'dotnet core part2',
    title: '.NET Core (Part 2)',
    description: 'A comprehensive guide covering dotnet core part2',
    date: '2023-03-15',
    category: '.NET',
    tags: ["azure","dotnet","ai","ml","dynamics"],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'xcode3',
    title: 'XCode C++ (Part 3)',
    description: 'OpenGL GLEW',
    date: '2023-03-08',
    category: 'Mobile & IoT',
    tags: ["ai"],
    image: '/assets/images/xcode-14-icon-300x314.png'
  },
  {
    slug: 'xcode2',
    title: 'XCode C++ (Part 2)',
    description: 'OpenGL GLEW',
    date: '2023-03-08',
    category: 'Mobile & IoT',
    tags: ["ai"],
    image: '/assets/images/xcode-14-icon-300x314.png'
  },
  {
    slug: 'xcode1',
    title: 'XCode C++ (Part 1)',
    description: 'OpenGL GLFW',
    date: '2023-03-08',
    category: 'Mobile & IoT',
    tags: ["ai"],
    image: '/assets/images/xcode-14-icon-300x314.png'
  },
  {
    slug: 'threejs',
    title: 'Three.js',
    description: 'Hello, World!',
    date: '2023-03-05',
    category: 'Web Development',
    tags: ["javascript","java","ai"],
    image: '/assets/images/three.js-icon.svg'
  },
  {
    slug: 'ngrxEntity',
    title: 'NGRX entity',
    description: 'Managing record collections',
    date: '2023-02-18',
    category: 'Development',
    tags: ["blog"],
    image: '/assets/images/ngrx.svg'
  },
  {
    slug: 'ngrxdevtools',
    title: 'NGRX devtools',
    description: 'Troubleshooting NGRX applications',
    date: '2023-01-25',
    category: 'Development',
    tags: ["angular","git","github"],
    image: '/assets/images/ngrx.svg'
  },
  {
    slug: 'sharepoint2019',
    title: 'SharePoint 2019 Trial',
    description: 'SharePoint hosted in Azure',
    date: '2022-12-31',
    category: 'Microsoft 365',
    tags: ["azure","sql","database","ai"],
    image: '/assets/images/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png'
  },
  {
    slug: 'ngrx',
    title: 'NGRX',
    description: 'A framework for building reactive applications in Angular',
    date: '2022-11-27',
    category: 'Web Development',
    tags: ["angular","react","typescript","ai","ml"],
    image: '/assets/images/ngrx.svg'
  },
  {
    slug: 'componentFramework',
    title: 'Power Apps (Part 7)',
    description: 'Power Apps Component Framework',
    date: '2022-08-14',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'azureStorage',
    title: 'Azure Storage',
    description: 'Microsoft\'s cloud storage solution',
    date: '2022-08-13',
    category: 'Cloud & DevOps',
    tags: ["blog"],
    image: '/assets/images/azurex70x75.svg'
  },
  {
    slug: 'purview',
    title: 'Microsoft Purview',
    description: 'Manage compliance across Microsoft 365',
    date: '2022-08-03',
    category: 'Microsoft 365',
    tags: ["ai"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'powerApps6',
    title: 'Power Apps (Part 6)',
    description: 'A Custom Connector for Microsoft Graph',
    date: '2022-07-04',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'machinelearning9',
    title: 'Machine Learning (Part 9)',
    description: 'The MNIST database',
    date: '2022-06-17',
    category: 'AI/ML',
    tags: ["database","ai","machine learning","git"],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning8',
    title: 'Machine Learning (Part 8)',
    description: 'Baseball Signs',
    date: '2022-06-12',
    category: 'AI/ML',
    tags: ["ai","ml","machine learning","git","github"],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning7',
    title: 'Machine Learning (Part 7)',
    description: 'AutoML Machine Learning Models',
    date: '2022-06-11',
    category: 'AI/ML',
    tags: ["cloud","ai","ml","machine learning"],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning6',
    title: 'Machine Learning (Part 6)',
    description: 'Binary classification',
    date: '2022-06-11',
    category: 'AI/ML',
    tags: ["ai","machine learning","testing"],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning5',
    title: 'Machine Learning (Part 5)',
    description: 'Linear Regression',
    date: '2022-06-11',
    category: 'AI/ML',
    tags: ["ai","machine learning","git","github"],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning4',
    title: 'Machine Learning (Part 4)',
    description: 'Notebooks',
    date: '2022-06-08',
    category: 'AI/ML',
    tags: ["python","ai","ml","machine learning","git"],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machinelearning3',
    title: 'Machine Learning (Part 3)',
    description: 'Notebooks',
    date: '2022-06-05',
    category: 'AI/ML',
    tags: ["ai","ml","machine learning"],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machineLearning2',
    title: 'Machine Learning (Part 2)',
    description: 'Low hanging fruit',
    date: '2022-06-05',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'machineLearning1',
    title: 'Machine Learning (Part 1)',
    description: 'Science fair',
    date: '2022-06-05',
    category: 'AI & Machine Learning',
    tags: ["blog"],
    image: '/assets/images/tensorflow-logo.svg'
  },
  {
    slug: 'ATeamsTabSharePointWebPartforOneDrive',
    title: 'A Teams App SharePoint Web Part for One Drive',
    description: 'Using SPFx and the Graph Toolkit',
    date: '2022-05-29',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'JavaScriptGraph',
    title: 'JavaScript and Microsoft Graph',
    description: 'A Node App that accesses Microsoft 365',
    date: '2022-05-28',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'MicrosoftGraph',
    title: 'Microsoft Graph',
    description: 'Explore Microsoft 365',
    date: '2022-05-26',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'PowerAutomate',
    title: 'Power Automate',
    description: 'Automate tasks in Microsoft 365',
    date: '2022-05-04',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'WebXR',
    title: 'WebXR',
    description: 'Create Augmented Reality Experiences',
    date: '2022-04-22',
    category: 'Web Development',
    tags: ["blog"],
    image: '/assets/images/34385910-400x400.png'
  },
  {
    slug: 'leaflet',
    title: 'Leaflet',
    description: 'A comprehensive guide covering leaflet',
    date: '2022-02-21',
    category: 'Web Development',
    tags: ["javascript","azure","java","ai","ml"],
    image: '/assets/images/leaflet-upic-200x200.png'
  },
  {
    slug: 'webcomponents',
    title: 'Web Components',
    description: 'A comprehensive guide covering webcomponents',
    date: '2022-02-10',
    category: 'Web Development',
    tags: ["angular","react","vue","javascript","java"],
    image: '/assets/images/web-components-logo.svg'
  },
  {
    slug: 'phaser',
    title: 'Phaser',
    description: 'A comprehensive guide covering phaser',
    date: '2022-01-23',
    category: 'Web Development',
    tags: ["ai","ml","git","github"],
    image: '/assets/images/phaser-logo-1836x1530.png'
  },
  {
    slug: 'nextjs5',
    title: 'Next.js (Part 5)',
    description: 'A comprehensive guide covering nextjs5',
    date: '2022-01-13',
    category: 'Web Development',
    tags: ["typescript","azure","aws","ai","ml"],
    image: '/assets/images/2560px-nextjs-logo.svg-1536x920.png'
  },
  {
    slug: 'ionic',
    title: 'Ionic and PouchDB',
    description: 'A comprehensive guide covering ionic',
    date: '2021-12-22',
    category: 'Web Development',
    tags: ["react","javascript","typescript","azure","aws"],
    image: '/assets/images/logo-192x192.png'
  },
  {
    slug: 'mysql',
    title: 'MySQL',
    description: 'A comprehensive guide covering mysql',
    date: '2021-11-14',
    category: 'Data & Analytics',
    tags: ["javascript","aws","java","mysql","sql"],
    image: '/assets/images/includes-mysql-5646x2872.png'
  },
  {
    slug: 'nextjs4',
    title: 'Next.js (Part 4)',
    description: 'A comprehensive guide covering nextjs4',
    date: '2021-11-11',
    category: 'Web Development',
    tags: ["azure","aws","git","github"],
    image: '/assets/images/2560px-nextjs-logo.svg-1536x920.png'
  },
  {
    slug: 'nextjs3',
    title: 'Next.js (Part 3)',
    description: 'A comprehensive guide covering nextjs3',
    date: '2021-11-07',
    category: 'Web Development',
    tags: ["aws","database","ai","git","github"],
    image: '/assets/images/2560px-nextjs-logo.svg-1536x920.png'
  },
  {
    slug: 'nextjs2',
    title: 'Next.js (Part 2)',
    description: 'A comprehensive guide covering nextjs2',
    date: '2021-11-06',
    category: 'Web Development',
    tags: ["javascript","aws","java","ai","ml"],
    image: '/assets/images/2560px-nextjs-logo.svg-1536x920.png'
  },
  {
    slug: 'nextjs1',
    title: 'Next.js (Part 1)',
    description: 'A comprehensive guide covering nextjs1',
    date: '2021-11-05',
    category: 'Web Development',
    tags: ["react","javascript","aws","java","git"],
    image: '/assets/images/2560px-nextjs-logo.svg-1536x920.png'
  },
  {
    slug: 'sails3',
    title: 'Sails (Part 3)',
    description: 'A comprehensive guide covering sails3',
    date: '2021-10-13',
    category: 'AI/ML',
    tags: ["aws","docker","kubernetes","ai","ml"],
    image: '/assets/images/sailsjs-logo-515x193.png'
  },
  {
    slug: 'sails2',
    title: 'Sails (Part 2)',
    description: 'A comprehensive guide covering sails2',
    date: '2021-10-12',
    category: 'AI/ML',
    tags: ["azure","aws","ai","git","github"],
    image: '/assets/images/sailsjs-logo-515x193.png'
  },
  {
    slug: 'sails1',
    title: 'Sails (Part 1)',
    description: 'A comprehensive guide covering sails1',
    date: '2021-10-12',
    category: 'AI/ML',
    tags: ["azure","aws","devops","database","ai"],
    image: '/assets/images/sailsjs-logo-515x193.png'
  },
  {
    slug: 'aspnetcoreawseks',
    title: 'Amazon EKS (Part 2)',
    description: 'A comprehensive guide covering aspnetcoreawseks',
    date: '2021-08-16',
    category: '.NET',
    tags: ["aws","docker","kubernetes","dotnet","ai"],
    image: '/assets/images/amazon-web-services-logo.svg'
  },
  {
    slug: 'AmazonEKS',
    title: 'Amazon EKS (Part 1)',
    description: 'A comprehensive guide covering  amazon e k s',
    date: '2021-08-12',
    category: 'Cloud & DevOps',
    tags: ["blog"],
    image: '/assets/images/amazon-web-services-logo.svg'
  },
  {
    slug: 'customconnectorsappregistrations',
    title: 'Power Apps (Part 5)',
    description: 'A comprehensive guide covering customconnectorsappregistrations',
    date: '2021-08-09',
    category: 'Microsoft 365',
    tags: ["javascript","azure","java","ai","git"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'API Management',
    title: 'Power Apps (Part 4)',
    description: 'A comprehensive guide covering  a p i  management',
    date: '2021-08-02',
    category: 'Microsoft 365',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'pwa',
    title: 'Progressive Web Application',
    description: 'A comprehensive guide covering pwa',
    date: '2021-07-24',
    category: 'Web Development',
    tags: ["javascript","azure","java","ai","ml"],
    image: '/assets/images/progressive-web-apps-logo.svg'
  },
  {
    slug: 'powerappsapplication',
    title: 'Power Apps (Part 3)',
    description: 'A comprehensive guide covering powerappsapplication',
    date: '2021-07-13',
    category: 'Microsoft 365',
    tags: ["database","ai"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'customcomponents',
    title: 'Power Apps (Part 2)',
    description: 'A comprehensive guide covering customcomponents',
    date: '2021-07-13',
    category: 'Microsoft 365',
    tags: ["ai"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'powerappswithrest',
    title: 'Power Apps (Part 1)',
    description: 'A comprehensive guide covering powerappswithrest',
    date: '2021-06-27',
    category: 'Microsoft 365',
    tags: ["azure","dotnet","git","github","asp.net"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'teamstoolkitspfx',
    title: 'Teams Toolkit with SPFx',
    description: 'A comprehensive guide covering teamstoolkitspfx',
    date: '2021-05-30',
    category: 'Development Tools',
    tags: ["azure","cloud","ai","git","github"],
    image: '/assets/images/teams-hi-res-icon-2019.svg'
  },
  {
    slug: 'teamstoolkit',
    title: 'Teams Toolkit with Azure',
    description: 'A comprehensive guide covering teamstoolkit',
    date: '2021-05-29',
    category: 'Cloud & DevOps',
    tags: ["react","azure","cloud","sql","database"],
    image: '/assets/images/teams-hi-res-icon-2019.svg'
  },
  {
    slug: 'devopsstarterazuredevops',
    title: 'DevOps Starter Azure DevOps',
    description: 'A comprehensive guide covering devopsstarterazuredevops',
    date: '2021-04-26',
    category: 'Azure',
    tags: ["azure","devops","ai","ml","git"],
    image: '/assets/images/svgexport-22.svg'
  },
  {
    slug: 'devopsstartergithubactions',
    title: 'DevOps Starter GitHub actions',
    description: 'A comprehensive guide covering devopsstartergithubactions',
    date: '2021-04-25',
    category: 'Cloud & DevOps',
    tags: ["azure","devops","ai","git","github"],
    image: '/assets/images/svgexport-22.svg'
  },
  {
    slug: 'azure-active-directory2',
    title: 'Azure Active Directory (Part 2)',
    description: 'A comprehensive guide covering azure-active-directory2',
    date: '2021-04-17',
    category: 'Azure',
    tags: ["angular","react","vue","javascript","azure"],
    image: '/assets/images/azurex70x75.svg'
  },
  {
    slug: 'dotnet core part1',
    title: '.NET Core (Part 1)',
    description: 'A comprehensive guide covering dotnet core part1',
    date: '2021-04-10',
    category: '.NET',
    tags: ["react","javascript","dotnet","java","ai"],
    image: '/assets/images/net-logo.svg'
  },
  {
    slug: 'spring-boot',
    title: 'Java Spring Boot (Part 1)',
    description: 'A comprehensive guide covering spring-boot',
    date: '2021-04-06',
    category: 'Java',
    tags: ["react","javascript","java","spring","ai"],
    image: '/assets/images/spring-framework-logo-70-no.svg'
  },
  {
    slug: 'azure-active-directory',
    title: 'Azure Active Directory (Part 1)',
    description: 'A comprehensive guide covering azure-active-directory',
    date: '2021-03-29',
    category: 'Azure',
    tags: ["azure","ai"],
    image: '/assets/images/azurex70x75.svg'
  },
  {
    slug: 'mssqlserver2',
    title: 'Microsoft SQL Server (Part 2)',
    description: 'A comprehensive guide covering mssqlserver2',
    date: '2021-03-27',
    category: '.NET Development',
    tags: ["javascript","dotnet","c#","java","sql"],
    image: '/assets/images/ads.svg'
  },
  {
    slug: 'mssqlserver',
    title: 'Microsoft SQL Server (Part 1)',
    description: 'A comprehensive guide covering mssqlserver',
    date: '2021-03-14',
    category: '.NET Development',
    tags: ["javascript","azure","docker","dotnet","c#"],
    image: '/assets/images/ads.svg'
  },
  {
    slug: 'internetOfThings2',
    title: 'Internet of Things (Part 2)',
    description: 'A comprehensive guide covering internet of things2',
    date: '2021-03-06',
    category: 'Mobile & IoT',
    tags: ["blog"],
    image: '/assets/images/iot-microchip.svg'
  },
  {
    slug: 'internetOfThings1',
    title: 'Internet of Things (Part 1)',
    description: 'A comprehensive guide covering internet of things1',
    date: '2021-03-03',
    category: 'Mobile & IoT',
    tags: ["blog"],
    image: '/assets/images/iot-microchip.svg'
  },
  {
    slug: 'WebVR',
    title: 'WebVR',
    description: 'A comprehensive guide covering  web v r',
    date: '2021-03-02',
    category: 'Web Development',
    tags: ["blog"],
    image: '/assets/images/webvr-logo-square-512x512.png'
  },
  {
    slug: 'dockerbuildx',
    title: 'Docker Buildx',
    description: 'A comprehensive guide covering dockerbuildx',
    date: '2021-03-01',
    category: 'DevOps',
    tags: ["cloud","docker","ai","testing"],
    image: '/assets/images/method-draw-image.svg'
  },
  {
    slug: 'GraphQL',
    title: 'GraphQL',
    description: 'A comprehensive guide covering  graph q l',
    date: '2021-03-01',
    category: 'Web Development',
    tags: ["blog"],
    image: '/assets/images/graphql-logo.svg-1200x1200.png'
  },
  {
    slug: 'nuget',
    title: 'NuGet C#',
    description: 'A comprehensive guide covering nuget',
    date: '2021-02-27',
    category: 'Web Development',
    tags: ["dotnet","c#","ai","git","github"],
    image: '/assets/images/logo-og-600x600.png'
  },
  {
    slug: 'npmCC',
    title: 'npm C++',
    description: 'A comprehensive guide covering npm c c',
    date: '2021-02-26',
    category: 'Web Development',
    tags: ["blog"],
    image: '/assets/images/6078720-200x200.png'
  },
  {
    slug: 'npm',
    title: 'npm JavaScript',
    description: 'A comprehensive guide covering npm',
    date: '2021-02-25',
    category: 'Web Development',
    tags: ["javascript","java","ai","git","github"],
    image: '/assets/images/6078720-200x200.png'
  },
  {
    slug: 'm365CommandLineInterface',
    title: 'A Command Line Interface for Microsoft 365',
    description: 'A comprehensive guide covering m365 command line interface',
    date: '2021-02-22',
    category: 'Development Tools',
    tags: ["blog"],
    image: '/assets/images/office-365-icon-500x500.png'
  },
  {
    slug: 'sharepointsitedesignsandsitescripts',
    title: 'SharePoint site designs and site scripts',
    description: 'A comprehensive guide covering sharepointsitedesignsandsitescripts',
    date: '2021-02-15',
    category: 'Microsoft 365',
    tags: ["ai"],
    image: '/assets/images/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png'
  },
  {
    slug: 'sharepointwebpart2',
    title: 'SharePoint Web Part (Part 2)',
    description: 'A comprehensive guide covering sharepointwebpart2',
    date: '2021-02-14',
    category: 'Microsoft 365',
    tags: ["react","javascript","java","ai","ml"],
    image: '/assets/images/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png'
  },
  {
    slug: 'sharepointwebpart1',
    title: 'SharePoint Web Part (Part 1)',
    description: 'A comprehensive guide covering sharepointwebpart1',
    date: '2021-02-11',
    category: 'Microsoft 365',
    tags: ["react","typescript","ai","ml","testing"],
    image: '/assets/images/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png'
  },
  {
    slug: 'apigateway',
    title: 'API Gateway',
    description: 'A comprehensive guide covering apigateway',
    date: '2021-02-10',
    category: 'Cloud & DevOps',
    tags: ["react","azure","aws","cloud","docker"],
    image: '/assets/images/kubernetes-container-engine.svg'
  },
  {
    slug: 'reactusestateuseeffect',
    title: 'React (Part 1)',
    description: 'A comprehensive guide covering reactusestateuseeffect',
    date: '2021-02-08',
    category: 'Web Development',
    tags: ["react"],
    image: '/assets/images/logo512-512x512.png'
  },
  {
    slug: 'restapiservice',
    title: 'REST',
    description: 'A comprehensive guide covering restapiservice',
    date: '2021-02-06',
    category: 'Development',
    tags: ["javascript","docker","java","ai"],
    image: '/assets/images/fve-image.svg'
  },
  {
    slug: 'kubernetes',
    title: 'Kubernetes',
    description: 'A comprehensive guide covering kubernetes',
    date: '2021-02-06',
    category: 'DevOps',
    tags: ["docker","kubernetes","ai","ml"],
    image: '/assets/images/kubernetes-container-engine.svg'
  },
  {
    slug: 'docker',
    title: 'Docker',
    description: 'A comprehensive guide covering docker',
    date: '2021-02-06',
    category: 'DevOps',
    tags: ["cloud","docker","ai","business central","testing"],
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

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getCategories(): string[] {
  const categories = [...new Set(blogPosts.map(post => post.category))];
  return categories.sort();
}
