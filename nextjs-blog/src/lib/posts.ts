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
    slug: '3dprinting1',
    title: '3D Printing 1',
    description: 'A comprehensive guide covering 3d printing 1',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai"],
    image: '/assets/images/3dprinting1/hero.png'
  },
  {
    slug: '3dprinting2',
    title: '3D Printing 2',
    description: 'A comprehensive guide covering 3d printing 2',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai"],
    image: '/assets/images/3dprinting2/hero.png'
  },
  {
    slug: 'addanitem',
    title: 'Add an Item',
    description: 'A comprehensive guide covering add an item',
    date: '2025-09-20',
    category: 'Development',
    tags: ["business central"],
    image: '/assets/images/addanitem/hero.png'
  },
  {
    slug: 'addapurchaseorder',
    title: 'Add a Purchase Order',
    description: 'A comprehensive guide covering add a purchase order',
    date: '2025-09-20',
    category: 'Development',
    tags: ["business central"],
    image: '/assets/images/addapurchaseorder/hero.png'
  },
  {
    slug: 'al-go-pte',
    title: 'AL-Go-PTE',
    description: 'A comprehensive guide covering al-go-pte',
    date: '2025-09-20',
    category: 'Development',
    tags: ["docker","devops","ai","business central","dynamics"],
    image: '/assets/images/al-go-pte/hero.png'
  },
  {
    slug: 'amazonecs',
    title: 'Amazon Elastic Container Service',
    description: 'A comprehensive guide covering amazon elastic container service',
    date: '2025-09-20',
    category: 'Development',
    tags: ["aws","cloud","docker","kubernetes","ai"],
    image: '/assets/images/amazonecs/hero.png'
  },
  {
    slug: 'amazoneks',
    title: 'Amazon Elastic Kubernetes Service (Amazon EKS)',
    description: 'A comprehensive guide covering amazon elastic kubernetes service (amazon eks)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["aws","cloud","docker","kubernetes","ai"],
    image: '/assets/images/amazoneks/hero.png'
  },
  {
    slug: 'amazonfargate',
    title: 'Amazon Fargate',
    description: 'A comprehensive guide covering amazon fargate',
    date: '2025-09-20',
    category: 'Development',
    tags: ["aws","cloud","docker","kubernetes","ai"],
    image: '/assets/images/amazonfargate/hero.png'
  },
  {
    slug: 'angular-new',
    title: 'Angular',
    description: 'A comprehensive guide covering angular',
    date: '2025-09-20',
    category: 'Web Development',
    tags: ["angular","ai","ml"],
    image: '/assets/images/angular-new/hero.png'
  },
  {
    slug: 'angular',
    title: 'Angular',
    description: 'A comprehensive guide covering angular',
    date: '2025-09-20',
    category: 'Web Development',
    tags: ["angular","ai","ml"],
    image: '/assets/images/angular/hero.png'
  },
  {
    slug: 'angular1',
    title: 'Angular (Part 1)',
    description: 'A comprehensive guide covering angular (part 1)',
    date: '2025-09-20',
    category: 'Web Development',
    tags: ["angular","typescript","ai","ml","testing"],
    image: '/assets/images/angular1/hero.png'
  },
  {
    slug: 'angularandasp.net',
    title: 'Angular and ASP.NET Core',
    description: 'A comprehensive guide covering angular and asp.net core',
    date: '2025-09-20',
    category: 'Web Development',
    tags: ["angular","react","dotnet","database","ai"],
    image: '/assets/images/angularandasp.net/hero.png'
  },
  {
    slug: 'angularfirebase',
    title: 'Angular Firebase',
    description: 'A comprehensive guide covering angular firebase',
    date: '2025-09-20',
    category: 'Web Development',
    tags: ["angular","react","ai","ml"],
    image: '/assets/images/angularfirebase/hero.png'
  },
  {
    slug: 'angularphaser',
    title: 'Angular and Phaser',
    description: 'A comprehensive guide covering angular and phaser',
    date: '2025-09-20',
    category: 'Web Development',
    tags: ["angular","ml"],
    image: '/assets/images/angularphaser/hero.png'
  },
  {
    slug: 'api management',
    title: 'Power Apps, Custom Connectors and API Management',
    description: 'A comprehensive guide covering power apps, custom connectors and api management',
    date: '2025-09-20',
    category: 'Development',
    tags: ["azure","ai"],
    image: '/assets/images/api management/hero.png'
  },
  {
    slug: 'apigateway',
    title: 'API Gateway',
    description: 'A comprehensive guide covering api gateway',
    date: '2025-09-20',
    category: 'Development',
    tags: ["react","azure","aws","cloud","docker"],
    image: '/assets/images/apigateway/hero.png'
  },
  {
    slug: 'applelaptop',
    title: 'Apple MacBook',
    description: 'A comprehensive guide covering apple macbook',
    date: '2025-09-20',
    category: 'Development',
    tags: ["python","ai","machine learning"],
    image: '/assets/images/applelaptop/hero.png'
  },
  {
    slug: 'applelogo',
    title: 'Apple Logo',
    description: 'A comprehensive guide covering apple logo',
    date: '2025-09-20',
    category: 'Development',
    tags: ["python","ai","machine learning"],
    image: '/assets/images/applelogo/hero.png'
  },
  {
    slug: 'ashorthistory',
    title: 'A Short History of Microsoft Dynamics and Microsoft Dataverse',
    description: 'A comprehensive guide covering a short history of microsoft dynamics and microsoft dataverse',
    date: '2025-09-20',
    category: 'Development',
    tags: ["azure","cloud","dotnet","ai","ml"],
    image: '/assets/images/ashorthistory/hero.png'
  },
  {
    slug: 'asp.net 5 cs',
    title: 'ASP.NET 5 C#',
    description: 'A comprehensive guide covering asp.net 5 c#',
    date: '2025-09-20',
    category: '.NET',
    tags: ["dotnet","c#","database","ai","ml"],
    image: '/assets/images/asp.net 5 cs/hero.png'
  },
  {
    slug: 'asp.net 5 visual basic',
    title: 'ASP.NET 5 Visual Basic',
    description: 'A comprehensive guide covering asp.net 5 visual basic',
    date: '2025-09-20',
    category: '.NET',
    tags: ["azure","docker","dotnet","sql","database"],
    image: '/assets/images/asp.net 5 visual basic/hero.png'
  },
  {
    slug: 'asp.net core',
    title: 'ASP.NET Core',
    description: 'A comprehensive guide covering asp.net core',
    date: '2025-09-20',
    category: '.NET',
    tags: ["dotnet","sql","database","ai","ml"],
    image: '/assets/images/asp.net core/hero.png'
  },
  {
    slug: 'aspnetcoreawseks',
    title: 'Deploying a .NET Core Web API to Amazon EKS',
    description: 'A comprehensive guide covering deploying a .net core web api to amazon eks',
    date: '2025-09-20',
    category: '.NET',
    tags: ["aws","docker","kubernetes","dotnet","ai"],
    image: '/assets/images/aspnetcoreawseks/hero.png'
  },
  {
    slug: 'aspnetcoreunittests',
    title: 'ASP.NET Core Unit Tests',
    description: 'A comprehensive guide covering asp.net core unit tests',
    date: '2025-09-20',
    category: '.NET',
    tags: ["dotnet","ai","asp.net"],
    image: '/assets/images/aspnetcoreunittests/hero.png'
  },
  {
    slug: 'ateamstabsharepointwebpartforonedrive',
    title: 'A Teams App SharePoint Web Part for One Drive',
    description: 'A comprehensive guide covering a teams app sharepoint web part for one drive',
    date: '2025-09-20',
    category: 'Development',
    tags: ["react","ml","git","github"],
    image: '/assets/images/ateamstabsharepointwebpartforonedrive/hero.png'
  },
  {
    slug: 'azure-active-directory',
    title: 'Azure Active Directory (Part 1)',
    description: 'A comprehensive guide covering azure active directory (part 1)',
    date: '2025-09-20',
    category: 'Azure',
    tags: ["azure","ai"],
    image: '/assets/images/azure-active-directory/hero.png'
  },
  {
    slug: 'azure-active-directory2',
    title: 'Azure Active Directory (Part 2)',
    description: 'A comprehensive guide covering azure active directory (part 2)',
    date: '2025-09-20',
    category: 'Azure',
    tags: ["angular","react","vue","javascript","azure"],
    image: '/assets/images/azure-active-directory2/hero.png'
  },
  {
    slug: 'azureai1-new',
    title: 'Azure AI (Part 1)',
    description: 'A comprehensive guide covering azure ai (part 1)',
    date: '2025-09-20',
    category: 'Azure',
    tags: ["azure","python","ai","git","github"],
    image: '/assets/images/azureai1-new/hero.png'
  },
  {
    slug: 'azureai1',
    title: 'Azure AI (Part 1)',
    description: 'A comprehensive guide covering azure ai (part 1)',
    date: '2025-09-20',
    category: 'Azure',
    tags: ["azure","python","ai","git","github"],
    image: '/assets/images/azureai1/hero.png'
  },
  {
    slug: 'azureopenal',
    title: 'Azure Al services Azure OpenAl',
    description: 'A comprehensive guide covering azure al services azure openal',
    date: '2025-09-20',
    category: 'Azure',
    tags: ["azure","ai"],
    image: '/assets/images/azureopenal/hero.png'
  },
  {
    slug: 'azurereactstaticweb app',
    title: 'Azure React Static Web App',
    description: 'A comprehensive guide covering azure react static web app',
    date: '2025-09-20',
    category: 'Azure',
    tags: ["react","azure","ai","git","github"],
    image: '/assets/images/azurereactstaticweb app/hero.png'
  },
  {
    slug: 'azurestorage',
    title: 'Azure Storage',
    description: 'A comprehensive guide covering azure storage',
    date: '2025-09-20',
    category: 'Azure',
    tags: ["azure","cloud","ai"],
    image: '/assets/images/azurestorage/hero.png'
  },
  {
    slug: 'blazorwasmandasp.net',
    title: 'Blazor WASM and ASP.NET Core',
    description: 'A comprehensive guide covering blazor wasm and asp.net core',
    date: '2025-09-20',
    category: '.NET',
    tags: ["dotnet","c#","database","ai","asp.net"],
    image: '/assets/images/blazorwasmandasp.net/hero.png'
  },
  {
    slug: 'blogcopilotstudio',
    title: 'Blog Copilot Studio',
    description: 'A comprehensive guide covering blog copilot studio',
    date: '2025-09-20',
    category: 'Development',
    tags: ["java","ai","business central","dynamics","git"],
    image: '/assets/images/blogcopilotstudio/hero.png'
  },
  {
    slug: 'businesscentraladmincenter',
    title: 'Business Central Admin Center',
    description: 'A comprehensive guide covering business central admin center',
    date: '2025-09-20',
    category: 'Business Central',
    tags: ["ai","business central","dynamics"],
    image: '/assets/images/businesscentraladmincenter/hero.png'
  },
  {
    slug: 'businesscentralcanvasapps',
    title: 'Business Central Canvas Apps',
    description: 'A comprehensive guide covering business central canvas apps',
    date: '2025-09-20',
    category: 'Business Central',
    tags: ["ai","business central","dynamics","power platform"],
    image: '/assets/images/businesscentralcanvasapps/hero.png'
  },
  {
    slug: 'businesscentralintegrationtables',
    title: 'Business Central (Part 25) Integration Tables',
    description: 'A comprehensive guide covering business central (part 25) integration tables',
    date: '2025-09-20',
    category: 'Business Central',
    tags: ["ai","business central","dynamics"],
    image: '/assets/images/businesscentralintegrationtables/hero.png'
  },
  {
    slug: 'businesscentralmicrosoftgraph',
    title: 'Business Central Microsoft Graph',
    description: 'A comprehensive guide covering business central microsoft graph',
    date: '2025-09-20',
    category: 'Business Central',
    tags: ["ai","ml","business central","dynamics"],
    image: '/assets/images/businesscentralmicrosoftgraph/hero.png'
  },
  {
    slug: 'businesscentralpart 27 extendingstandardapis',
    title: 'Business Central (Part 27) extending standard APIs',
    description: 'A comprehensive guide covering business central (part 27) extending standard apis',
    date: '2025-09-20',
    category: 'Business Central',
    tags: ["ai","business central","dynamics"],
    image: '/assets/images/businesscentralpart 27 extendingstandardapis/hero.png'
  },
  {
    slug: 'businesscentralpart 2extendingstandardapis',
    title: 'Business Central (Part 26) extending standard APIs',
    description: 'A comprehensive guide covering business central (part 26) extending standard apis',
    date: '2025-09-20',
    category: 'Business Central',
    tags: ["ai","business central","dynamics"],
    image: '/assets/images/businesscentralpart 2extendingstandardapis/hero.png'
  },
  {
    slug: 'businesscentralpart25integratingwithdataverseusingdataflows',
    title: 'Business Central (Part 25) Integrating with Dataverse using Dataflows',
    description: 'A comprehensive guide covering business central (part 25) integrating with dataverse using dataflows',
    date: '2025-09-20',
    category: 'Business Central',
    tags: ["ai","business central","dynamics","power platform"],
    image: '/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/hero.png'
  },
  {
    slug: 'businesscentralpart26integratingwithdataverseusingintegrationtables',
    title: 'Business Central (Part 26) Integrating with Dataverse using Integration Tables',
    description: 'A comprehensive guide covering business central (part 26) integrating with dataverse using integration tables',
    date: '2025-09-20',
    category: 'Business Central',
    tags: ["ai","business central","dynamics"],
    image: '/assets/images/businesscentralpart26integratingwithdataverseusingintegrationtables/hero.png'
  },
  {
    slug: 'businesscentralpart26integrationtable',
    title: 'Business Central (Part 26) Integration Tables',
    description: 'A comprehensive guide covering business central (part 26) integration tables',
    date: '2025-09-20',
    category: 'Business Central',
    tags: ["azure","cloud","ai","business central","dynamics"],
    image: '/assets/images/businesscentralpart26integrationtable/hero.png'
  },
  {
    slug: 'businesscentralpart26integrationtables',
    title: 'Business Central (Part 26) Integration Tables',
    description: 'A comprehensive guide covering business central (part 26) integration tables',
    date: '2025-09-20',
    category: 'Business Central',
    tags: ["ai","business central","dynamics"],
    image: '/assets/images/businesscentralpart26integrationtables/hero.png'
  },
  {
    slug: 'businesscentralpowerautomateflow',
    title: 'Business Central Power Automate Flow',
    description: 'A comprehensive guide covering business central power automate flow',
    date: '2025-09-20',
    category: 'Business Central',
    tags: ["cloud","ai","business central","dynamics"],
    image: '/assets/images/businesscentralpowerautomateflow/hero.png'
  },
  {
    slug: 'businesscentralvirtualtable',
    title: 'Business Central Virtual Table',
    description: 'A comprehensive guide covering business central virtual table',
    date: '2025-09-20',
    category: 'Business Central',
    tags: ["ai","business central","dynamics"],
    image: '/assets/images/businesscentralvirtualtable/hero.png'
  },
  {
    slug: 'cloudflow',
    title: 'Cloud Flow',
    description: 'A comprehensive guide covering cloud flow',
    date: '2025-09-20',
    category: 'Development',
    tags: ["cloud","business central"],
    image: '/assets/images/cloudflow/hero.png'
  },
  {
    slug: 'codespacesauthentication',
    title: 'Codespaces and Authentication',
    description: 'A comprehensive guide covering codespaces and authentication',
    date: '2025-09-20',
    category: 'Development',
    tags: ["react","azure","git","github"],
    image: '/assets/images/codespacesauthentication/hero.png'
  },
  {
    slug: 'colorization',
    title: 'Colorization',
    description: 'A comprehensive guide covering colorization',
    date: '2025-09-20',
    category: 'Development',
    tags: [],
    image: '/assets/images/colorization/hero.png'
  },
  {
    slug: 'componentframework',
    title: 'Component Framework',
    description: 'A comprehensive guide covering component framework',
    date: '2025-09-20',
    category: 'Development',
    tags: ["react","ai","ml","dynamics","power platform"],
    image: '/assets/images/componentframework/hero.png'
  },
  {
    slug: 'configurecopilotsinglesignonforweb',
    title: 'Configure Copilot single sign-on for Web',
    description: 'A comprehensive guide covering configure copilot single sign-on for web',
    date: '2025-09-20',
    category: 'Development',
    tags: ["azure","docker","ai","ml","git"],
    image: '/assets/images/configurecopilotsinglesignonforweb/hero.png'
  },
  {
    slug: 'configurecopilotwithauthentication',
    title: 'Configure Copilot with authentication',
    description: 'A comprehensive guide covering configure copilot with authentication',
    date: '2025-09-20',
    category: 'Development',
    tags: ["azure","docker","ai","ml","git"],
    image: '/assets/images/configurecopilotwithauthentication/hero.png'
  },
  {
    slug: 'contextinjection',
    title: 'Context Injection',
    description: 'A comprehensive guide covering context injection',
    date: '2025-09-20',
    category: 'Development',
    tags: ["database","ai"],
    image: '/assets/images/contextinjection/hero.png'
  },
  {
    slug: 'copilotembedcode',
    title: 'Copilot Embed Code',
    description: 'A comprehensive guide covering copilot embed code',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ml"],
    image: '/assets/images/copilotembedcode/hero.png'
  },
  {
    slug: 'createactionbasedonaflow',
    title: 'Create action based on a flow',
    description: 'A comprehensive guide covering create action based on a flow',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","business central","dynamics"],
    image: '/assets/images/createactionbasedonaflow/hero.png'
  },
  {
    slug: 'customcomponents',
    title: 'Power Apps Custom Components',
    description: 'A comprehensive guide covering power apps custom components',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai"],
    image: '/assets/images/customcomponents/hero.png'
  },
  {
    slug: 'customconnectorsappregistrations',
    title: 'Power Apps, Custom Connectors and Application Registrations',
    description: 'A comprehensive guide covering power apps, custom connectors and application registrations',
    date: '2025-09-20',
    category: 'Development',
    tags: ["javascript","azure","java","ai","git"],
    image: '/assets/images/customconnectorsappregistrations/hero.png'
  },
  {
    slug: 'customcopilotstudio',
    title: 'Custom Copilot Studio',
    description: 'A comprehensive guide covering custom copilot studio',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","business central","dynamics"],
    image: '/assets/images/customcopilotstudio/hero.png'
  },
  {
    slug: 'customercontentvirtualtables',
    title: 'Customer Content Virtual Tables',
    description: 'A comprehensive guide covering customer content virtual tables',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","business central","power platform"],
    image: '/assets/images/customercontentvirtualtables/hero.png'
  },
  {
    slug: 'customercopilotstudio',
    title: 'Customer Copilot Studio',
    description: 'A comprehensive guide covering customer copilot studio',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","business central","dynamics"],
    image: '/assets/images/customercopilotstudio/hero.png'
  },
  {
    slug: 'customerpostinggroup',
    title: 'Customer Posting Group',
    description: 'A comprehensive guide covering customer posting group',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","dynamics"],
    image: '/assets/images/customerpostinggroup/hero.png'
  },
  {
    slug: 'customizedefaultcanvas',
    title: 'Customize the look and feel of the bot\'s default canvas',
    description: 'A comprehensive guide covering customize the look and feel of the bot\'s default canvas',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ml"],
    image: '/assets/images/customizedefaultcanvas/hero.png'
  },
  {
    slug: 'customtvirtualtables',
    title: 'Custom Virtual Tables',
    description: 'A comprehensive guide covering custom virtual tables',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","business central","power platform"],
    image: '/assets/images/customtvirtualtables/hero.png'
  },
  {
    slug: 'dataverseadvancedreportssetup',
    title: 'Microsoft Dataverse Advanced Reports Setup',
    description: 'A comprehensive guide covering microsoft dataverse advanced reports setup',
    date: '2025-09-20',
    category: 'Development',
    tags: ["sql","ai","ml","dynamics"],
    image: '/assets/images/dataverseadvancedreportssetup/hero.png'
  },
  {
    slug: 'dataversefetchxml',
    title: 'Microsoft Dataverse FetchXML',
    description: 'A comprehensive guide covering microsoft dataverse fetchxml',
    date: '2025-09-20',
    category: 'Development',
    tags: ["sql","ml"],
    image: '/assets/images/dataversefetchxml/hero.png'
  },
  {
    slug: 'dataversereports',
    title: 'Microsoft Dataverse Reports',
    description: 'A comprehensive guide covering microsoft dataverse reports',
    date: '2025-09-20',
    category: 'Development',
    tags: [],
    image: '/assets/images/dataversereports/hero.png'
  },
  {
    slug: 'devopsstarterazuredevops',
    title: 'DevOps Starter Azure DevOps',
    description: 'A comprehensive guide covering devops starter azure devops',
    date: '2025-09-20',
    category: 'Azure',
    tags: ["azure","devops","ai","ml","git"],
    image: '/assets/images/devopsstarterazuredevops/hero.png'
  },
  {
    slug: 'devopsstartergithubactions',
    title: 'DevOps Starter GitHub actions',
    description: 'A comprehensive guide covering devops starter github actions',
    date: '2025-09-20',
    category: 'Development',
    tags: ["azure","devops","ai","git","github"],
    image: '/assets/images/devopsstartergithubactions/hero.png'
  },
  {
    slug: 'docker',
    title: 'Business Central (Part 27) PromptDialog',
    description: 'A comprehensive guide covering business central (part 27) promptdialog',
    date: '2025-09-20',
    category: 'DevOps',
    tags: ["cloud","docker","ai","business central","testing"],
    image: '/assets/images/docker/hero.png'
  },
  {
    slug: 'dockerbuildx',
    title: 'Docker Buildx',
    description: 'A comprehensive guide covering docker buildx',
    date: '2025-09-20',
    category: 'DevOps',
    tags: ["cloud","docker","ai","testing"],
    image: '/assets/images/dockerbuildx/hero.png'
  },
  {
    slug: 'dotnet core part1',
    title: '.NET Core (Part 1)',
    description: 'A comprehensive guide covering .net core (part 1)',
    date: '2025-09-20',
    category: '.NET',
    tags: ["react","javascript","dotnet","java","ai"],
    image: '/assets/images/dotnet core part1/hero.png'
  },
  {
    slug: 'dotnet core part2 deleted',
    title: '.NET Core (Part 2 deleted)',
    description: 'A comprehensive guide covering .net core (part 2 deleted)',
    date: '2025-09-20',
    category: '.NET',
    tags: ["dotnet","c#","ai","git","asp.net"],
    image: '/assets/images/dotnet core part2 deleted/hero.png'
  },
  {
    slug: 'dotnet core part2',
    title: '.NET Core (Part 2)',
    description: 'A comprehensive guide covering .net core (part 2)',
    date: '2025-09-20',
    category: '.NET',
    tags: ["azure","dotnet","ai","ml","dynamics"],
    image: '/assets/images/dotnet core part2/hero.png'
  },
  {
    slug: 'dotnet core part3',
    title: '.NET Core (Part 3)',
    description: 'A comprehensive guide covering .net core (part 3)',
    date: '2025-09-20',
    category: '.NET',
    tags: ["azure","dotnet","ai","ml","dynamics"],
    image: '/assets/images/dotnet core part3/hero.png'
  },
  {
    slug: 'dynamicssales1',
    title: 'Dynamics 365 Sales (Part 1)',
    description: 'A comprehensive guide covering dynamics 365 sales (part 1)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","ml","dynamics"],
    image: '/assets/images/dynamicssales1/hero.png'
  },
  {
    slug: 'dynamicssales2',
    title: 'Dynamics 365 Sales (Part 2)',
    description: 'A comprehensive guide covering dynamics 365 sales (part 2)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","ml","dynamics"],
    image: '/assets/images/dynamicssales2/hero.png'
  },
  {
    slug: 'dynamicssales3',
    title: 'Dynamics 365 Sales (Part 3)',
    description: 'A comprehensive guide covering dynamics 365 sales (part 3)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","ml","dynamics"],
    image: '/assets/images/dynamicssales3/hero.png'
  },
  {
    slug: 'dynamicssales4',
    title: 'Dynamics 365 Sales (Part 4)',
    description: 'A comprehensive guide covering dynamics 365 sales (part 4)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","dynamics"],
    image: '/assets/images/dynamicssales4/hero.png'
  },
  {
    slug: 'dynamicstrialsignup',
    title: 'Dynamics Trial Signup',
    description: 'A comprehensive guide covering dynamics trial signup',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","dynamics"],
    image: '/assets/images/dynamicstrialsignup/hero.png'
  },
  {
    slug: 'electron',
    title: 'Electron',
    description: 'A comprehensive guide covering electron',
    date: '2025-09-20',
    category: 'Development',
    tags: ["javascript","java","ai","ml","git"],
    image: '/assets/images/electron/hero.png'
  },
  {
    slug: 'financialoperationspurchaseinvoice',
    title: 'Financial Operations Purchase Invoice',
    description: 'A comprehensive guide covering financial operations purchase invoice',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","business central","dynamics"],
    image: '/assets/images/financialoperationspurchaseinvoice/hero.png'
  },
  {
    slug: 'finetuning',
    title: 'Fine Tuning',
    description: 'A comprehensive guide covering fine tuning',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai"],
    image: '/assets/images/finetuning/hero.png'
  },
  {
    slug: 'firebase',
    title: 'Firebase',
    description: 'A comprehensive guide covering firebase',
    date: '2025-09-20',
    category: 'Development',
    tags: ["cloud","database","ai","git","github"],
    image: '/assets/images/firebase/hero.png'
  },
  {
    slug: 'generalledger',
    title: 'General Ledger',
    description: 'A comprehensive guide covering general ledger',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","business central","dynamics"],
    image: '/assets/images/generalledger/hero.png'
  },
  {
    slug: 'generalpostingsetup',
    title: 'General Posting Setup',
    description: 'A comprehensive guide covering general posting setup',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","dynamics"],
    image: '/assets/images/generalpostingsetup/hero.png'
  },
  {
    slug: 'gingerbreadhouse',
    title: 'Gingerbread House',
    description: 'A comprehensive guide covering gingerbread house',
    date: '2025-09-20',
    category: 'Development',
    tags: ["python","ai"],
    image: '/assets/images/gingerbreadhouse/hero.png'
  },
  {
    slug: 'google08ffec2589f7c95c',
    title: 'google08ffec2589f7c95c',
    description: 'A comprehensive guide covering google08ffec2589f7c95c',
    date: '2025-09-20',
    category: 'Development',
    tags: [],
    image: '/assets/images/google08ffec2589f7c95c/hero.png'
  },
  {
    slug: 'google111fd44366657b80',
    title: 'google111fd44366657b80',
    description: 'A comprehensive guide covering google111fd44366657b80',
    date: '2025-09-20',
    category: 'Development',
    tags: [],
    image: '/assets/images/google111fd44366657b80/hero.png'
  },
  {
    slug: 'graphql',
    title: 'GraphQL',
    description: 'A comprehensive guide covering graphql',
    date: '2025-09-20',
    category: 'Development',
    tags: ["react","ai","ml"],
    image: '/assets/images/graphql/hero.png'
  },
  {
    slug: 'hands-on-lab2.1',
    title: 'Hands-on-Lab 2.1',
    description: 'A comprehensive guide covering hands-on-lab 2.1',
    date: '2025-09-20',
    category: 'Development',
    tags: ["database","ai","business central","dynamics"],
    image: '/assets/images/hands-on-lab2.1/hero.png'
  },
  {
    slug: 'hands-on-lab2.2',
    title: 'Hands-on-Lab 2.2',
    description: 'A comprehensive guide covering hands-on-lab 2.2',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","dynamics"],
    image: '/assets/images/hands-on-lab2.2/hero.png'
  },
  {
    slug: 'hands-on-lab2.3',
    title: 'Hands-on-Lab 2.3',
    description: 'A comprehensive guide covering hands-on-lab 2.3',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","dynamics"],
    image: '/assets/images/hands-on-lab2.3/hero.png'
  },
  {
    slug: 'hands-on-lab3.1',
    title: 'Hands-on-Lab 3.1',
    description: 'A comprehensive guide covering hands-on-lab 3.1',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","business central","dynamics","git"],
    image: '/assets/images/hands-on-lab3.1/hero.png'
  },
  {
    slug: 'hubspotquotetemplate',
    title: 'HubSpot Quote Template',
    description: 'A comprehensive guide covering hubspot quote template',
    date: '2025-09-20',
    category: 'Development',
    tags: [],
    image: '/assets/images/hubspotquotetemplate/hero.png'
  },
  {
    slug: 'internetofthings1',
    title: 'Internet of Things (Part 1)',
    description: 'A comprehensive guide covering internet of things (part 1)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["docker","ai","git","github"],
    image: '/assets/images/internetofthings1/hero.png'
  },
  {
    slug: 'internetofthings2',
    title: 'Internet of Things (Part 2)',
    description: 'A comprehensive guide covering internet of things (part 2)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["docker"],
    image: '/assets/images/internetofthings2/hero.png'
  },
  {
    slug: 'internetofthings3',
    title: 'Internet of Things (Part 3)',
    description: 'A comprehensive guide covering internet of things (part 3)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","ml","machine learning","testing"],
    image: '/assets/images/internetofthings3/hero.png'
  },
  {
    slug: 'ionic',
    title: 'Ionic',
    description: 'A comprehensive guide covering ionic',
    date: '2025-09-20',
    category: 'Development',
    tags: ["react","javascript","typescript","azure","aws"],
    image: '/assets/images/ionic/hero.png'
  },
  {
    slug: 'javascriptgraph',
    title: 'JavaScript and Microsoft Graph',
    description: 'A comprehensive guide covering javascript and microsoft graph',
    date: '2025-09-20',
    category: 'Java',
    tags: ["javascript","azure","java","ai","ml"],
    image: '/assets/images/javascriptgraph/hero.png'
  },
  {
    slug: 'kubernetes',
    title: 'Kubernetes',
    description: 'A comprehensive guide covering kubernetes',
    date: '2025-09-20',
    category: 'DevOps',
    tags: ["docker","kubernetes","ai","ml"],
    image: '/assets/images/kubernetes/hero.png'
  },
  {
    slug: 'langchain',
    title: 'LangChain (RAG)',
    description: 'A comprehensive guide covering langchain (rag)',
    date: '2025-09-20',
    category: 'AI/ML',
    tags: ["python","ai","ml","machine learning"],
    image: '/assets/images/langchain/hero.png'
  },
  {
    slug: 'langchainagents',
    title: 'LangChain Agents',
    description: 'A comprehensive guide covering langchain agents',
    date: '2025-09-20',
    category: 'AI/ML',
    tags: ["python","ai"],
    image: '/assets/images/langchainagents/hero.png'
  },
  {
    slug: 'langflow1',
    title: 'Langflow (Part 1)',
    description: 'A comprehensive guide covering langflow (part 1)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["python","ai"],
    image: '/assets/images/langflow1/hero.png'
  },
  {
    slug: 'leaflet',
    title: 'Leaflet',
    description: 'A comprehensive guide covering leaflet',
    date: '2025-09-20',
    category: 'Development',
    tags: ["javascript","azure","java","ai","ml"],
    image: '/assets/images/leaflet/hero.png'
  },
  {
    slug: 'llamacorp',
    title: 'LlamaCpp',
    description: 'A comprehensive guide covering llamacpp',
    date: '2025-09-20',
    category: 'Development',
    tags: ["python","ai","ml"],
    image: '/assets/images/llamacorp/hero.png'
  },
  {
    slug: 'lmstudio',
    title: 'LM Studio',
    description: 'A comprehensive guide covering lm studio',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai"],
    image: '/assets/images/lmstudio/hero.png'
  },
  {
    slug: 'm365commandlineinterface',
    title: 'Microsoft 365 command line interface',
    description: 'A comprehensive guide covering microsoft 365 command line interface',
    date: '2025-09-20',
    category: 'Development',
    tags: ["docker","ai","ml","git","github"],
    image: '/assets/images/m365commandlineinterface/hero.png'
  },
  {
    slug: 'macbook',
    title: 'Apple MacBook Air with M2 chip',
    description: 'A comprehensive guide covering apple macbook air with m2 chip',
    date: '2025-09-20',
    category: 'Development',
    tags: ["python","ai"],
    image: '/assets/images/macbook/hero.png'
  },
  {
    slug: 'machinelearning',
    title: 'Machine Learning',
    description: 'A comprehensive guide covering machine learning',
    date: '2025-09-20',
    category: 'AI/ML',
    tags: ["sql","ai","machine learning"],
    image: '/assets/images/machinelearning/hero.png'
  },
  {
    slug: 'machinelearning1',
    title: 'Machine Learning (Part 1)',
    description: 'A comprehensive guide covering machine learning (part 1)',
    date: '2025-09-20',
    category: 'AI/ML',
    tags: ["cloud","ai","ml","machine learning"],
    image: '/assets/images/machinelearning1/hero.png'
  },
  {
    slug: 'machinelearning2',
    title: 'Machine Learning (Part 2)',
    description: 'A comprehensive guide covering machine learning (part 2)',
    date: '2025-09-20',
    category: 'AI/ML',
    tags: ["javascript","java","python","sql","ai"],
    image: '/assets/images/machinelearning2/hero.png'
  },
  {
    slug: 'machinelearning3',
    title: 'Machine Learning (Part 3)',
    description: 'A comprehensive guide covering machine learning (part 3)',
    date: '2025-09-20',
    category: 'AI/ML',
    tags: ["ai","ml","machine learning"],
    image: '/assets/images/machinelearning3/hero.png'
  },
  {
    slug: 'machinelearning4',
    title: 'Machine Learning (Part 4)',
    description: 'A comprehensive guide covering machine learning (part 4)',
    date: '2025-09-20',
    category: 'AI/ML',
    tags: ["python","ai","ml","machine learning","git"],
    image: '/assets/images/machinelearning4/hero.png'
  },
  {
    slug: 'machinelearning5',
    title: 'Machine Learning (Part 5)',
    description: 'A comprehensive guide covering machine learning (part 5)',
    date: '2025-09-20',
    category: 'AI/ML',
    tags: ["ai","machine learning","git","github"],
    image: '/assets/images/machinelearning5/hero.png'
  },
  {
    slug: 'machinelearning6',
    title: 'Machine Learning (Part 6)',
    description: 'A comprehensive guide covering machine learning (part 6)',
    date: '2025-09-20',
    category: 'AI/ML',
    tags: ["ai","machine learning","testing"],
    image: '/assets/images/machinelearning6/hero.png'
  },
  {
    slug: 'machinelearning7',
    title: 'Machine Learning (Part 7)',
    description: 'A comprehensive guide covering machine learning (part 7)',
    date: '2025-09-20',
    category: 'AI/ML',
    tags: ["cloud","ai","ml","machine learning"],
    image: '/assets/images/machinelearning7/hero.png'
  },
  {
    slug: 'machinelearning8',
    title: 'Machine Learning (Part 8)',
    description: 'A comprehensive guide covering machine learning (part 8)',
    date: '2025-09-20',
    category: 'AI/ML',
    tags: ["ai","ml","machine learning","git","github"],
    image: '/assets/images/machinelearning8/hero.png'
  },
  {
    slug: 'machinelearning9',
    title: 'Machine Learning (Part 9)',
    description: 'A comprehensive guide covering machine learning (part 9)',
    date: '2025-09-20',
    category: 'AI/ML',
    tags: ["database","ai","machine learning","git"],
    image: '/assets/images/machinelearning9/hero.png'
  },
  {
    slug: 'machinelearningwip',
    title: 'Machine Learning (WIP)',
    description: 'A comprehensive guide covering machine learning (wip)',
    date: '2025-09-20',
    category: 'AI/ML',
    tags: ["ai","ml","machine learning","git","github"],
    image: '/assets/images/machinelearningwip/hero.png'
  },
  {
    slug: 'macscreensharing',
    title: 'Mac Screen Sharing',
    description: 'A comprehensive guide covering mac screen sharing',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai"],
    image: '/assets/images/macscreensharing/hero.png'
  },
  {
    slug: 'mapextension',
    title: 'Map Extension',
    description: 'A comprehensive guide covering map extension',
    date: '2025-09-20',
    category: 'Development',
    tags: ["javascript","cloud","java","ai","business central"],
    image: '/assets/images/mapextension/hero.png'
  },
  {
    slug: 'mcpserver',
    title: 'Model Context Protocol (Part 1)',
    description: 'A comprehensive guide covering model context protocol (part 1)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["typescript","ai"],
    image: '/assets/images/mcpserver/hero.png'
  },
  {
    slug: 'mcpserver2',
    title: 'Model Context Protocol (Part 2)',
    description: 'A comprehensive guide covering model context protocol (part 2)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["azure","docker","ai","business central","git"],
    image: '/assets/images/mcpserver2/hero.png'
  },
  {
    slug: 'microsoftdynamics365appforoutlook',
    title: 'Microsoft Dynamics 365 App for Outlook',
    description: 'A comprehensive guide covering microsoft dynamics 365 app for outlook',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","dynamics","power platform"],
    image: '/assets/images/microsoftdynamics365appforoutlook/hero.png'
  },
  {
    slug: 'microsoftgraph',
    title: 'Microsoft Graph',
    description: 'A comprehensive guide covering microsoft graph',
    date: '2025-09-20',
    category: 'Development',
    tags: ["javascript","azure","java","ai","dynamics"],
    image: '/assets/images/microsoftgraph/hero.png'
  },
  {
    slug: 'modeldriven1',
    title: 'Model Driven Apps (Part 1)',
    description: 'A comprehensive guide covering model driven apps (part 1)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["sql","database","ai","power platform","testing"],
    image: '/assets/images/modeldriven1/hero.png'
  },
  {
    slug: 'modeldriven2',
    title: 'Model Driven Apps (Part 2)',
    description: 'A comprehensive guide covering model driven apps (part 2)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","dynamics","power platform","git"],
    image: '/assets/images/modeldriven2/hero.png'
  },
  {
    slug: 'modeldriven3',
    title: 'Model Driven Apps (Part 3)',
    description: 'A comprehensive guide covering model driven apps (part 3)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["javascript","java","ml","dynamics"],
    image: '/assets/images/modeldriven3/hero.png'
  },
  {
    slug: 'modeldriven4',
    title: 'Model Driven Apps (Part 4)',
    description: 'A comprehensive guide covering model driven apps (part 4)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["javascript","java","ai","power platform"],
    image: '/assets/images/modeldriven4/hero.png'
  },
  {
    slug: 'modeldrivenapps',
    title: 'Model Driven Apps',
    description: 'A comprehensive guide covering model driven apps',
    date: '2025-09-20',
    category: 'Development',
    tags: ["cloud","dotnet","ai","ml","dynamics"],
    image: '/assets/images/modeldrivenapps/hero.png'
  },
  {
    slug: 'modeldrivenpurchaseorderlines',
    title: 'Model Driven Purchase Order Lines',
    description: 'A comprehensive guide covering model driven purchase order lines',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","business central","power platform"],
    image: '/assets/images/modeldrivenpurchaseorderlines/hero.png'
  },
  {
    slug: 'modeldrivenpurchaseorders',
    title: 'Model Driven Purchase Orders',
    description: 'A comprehensive guide covering model driven purchase orders',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","business central","dynamics","power platform"],
    image: '/assets/images/modeldrivenpurchaseorders/hero.png'
  },
  {
    slug: 'mssqlserver',
    title: 'Microsoft SQL Server (Part 1)',
    description: 'A comprehensive guide covering microsoft sql server (part 1)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["javascript","azure","docker","dotnet","c#"],
    image: '/assets/images/mssqlserver/hero.png'
  },
  {
    slug: 'mssqlserver2',
    title: 'Microsoft SQL Server (Part 2)',
    description: 'A comprehensive guide covering microsoft sql server (part 2)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["javascript","dotnet","c#","java","sql"],
    image: '/assets/images/mssqlserver2/hero.png'
  },
  {
    slug: 'mssqlserver3',
    title: 'Microsoft SQL Server (Part 3)',
    description: 'A comprehensive guide covering microsoft sql server (part 3)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["react","javascript","typescript","azure","java"],
    image: '/assets/images/mssqlserver3/hero.png'
  },
  {
    slug: 'multiplayer',
    title: 'Multiplayer Game',
    description: 'A comprehensive guide covering multiplayer game',
    date: '2025-09-20',
    category: 'Development',
    tags: ["javascript","java","database","ai","ml"],
    image: '/assets/images/multiplayer/hero.png'
  },
  {
    slug: 'mysql',
    title: 'MySQL',
    description: 'A comprehensive guide covering mysql',
    date: '2025-09-20',
    category: 'Development',
    tags: ["javascript","aws","java","mysql","sql"],
    image: '/assets/images/mysql/hero.png'
  },
  {
    slug: 'nextjs1',
    title: 'Next.js (Part 1)',
    description: 'A comprehensive guide covering next.js (part 1)',
    date: '2025-09-20',
    category: 'Web Development',
    tags: ["react","javascript","aws","java","git"],
    image: '/assets/images/nextjs1/hero.png'
  },
  {
    slug: 'nextjs2',
    title: 'Next.js (Part 2)',
    description: 'A comprehensive guide covering next.js (part 2)',
    date: '2025-09-20',
    category: 'Web Development',
    tags: ["javascript","aws","java","ai","ml"],
    image: '/assets/images/nextjs2/hero.png'
  },
  {
    slug: 'nextjs3',
    title: 'Next.js (Part 3)',
    description: 'A comprehensive guide covering next.js (part 3)',
    date: '2025-09-20',
    category: 'Web Development',
    tags: ["aws","database","ai","git","github"],
    image: '/assets/images/nextjs3/hero.png'
  },
  {
    slug: 'nextjs4',
    title: 'Next.js (Part 4)',
    description: 'A comprehensive guide covering next.js (part 4)',
    date: '2025-09-20',
    category: 'Web Development',
    tags: ["azure","aws","git","github"],
    image: '/assets/images/nextjs4/hero.png'
  },
  {
    slug: 'nextjs5',
    title: 'Next.js (Part 5)',
    description: 'A comprehensive guide covering next.js (part 5)',
    date: '2025-09-20',
    category: 'Web Development',
    tags: ["typescript","azure","aws","ai","ml"],
    image: '/assets/images/nextjs5/hero.png'
  },
  {
    slug: 'ngrx',
    title: 'NGRX',
    description: 'A comprehensive guide covering ngrx',
    date: '2025-09-20',
    category: 'Development',
    tags: ["angular","react","typescript","ai","ml"],
    image: '/assets/images/ngrx/hero.png'
  },
  {
    slug: 'ngrxdevtools',
    title: 'NGRX devtools',
    description: 'A comprehensive guide covering ngrx devtools',
    date: '2025-09-20',
    category: 'Development',
    tags: ["angular","git","github"],
    image: '/assets/images/ngrxdevtools/hero.png'
  },
  {
    slug: 'ngrxentity',
    title: 'NGRX entity',
    description: 'A comprehensive guide covering ngrx entity',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","git","github","testing"],
    image: '/assets/images/ngrxentity/hero.png'
  },
  {
    slug: 'notes',
    title: 'Notes',
    description: 'A comprehensive guide covering notes',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ml"],
    image: '/assets/images/notes/hero.png'
  },
  {
    slug: 'npm',
    title: 'npm JavaScript',
    description: 'A comprehensive guide covering npm javascript',
    date: '2025-09-20',
    category: 'Development',
    tags: ["javascript","java","ai","git","github"],
    image: '/assets/images/npm/hero.png'
  },
  {
    slug: 'npmcc',
    title: 'npm C++',
    description: 'A comprehensive guide covering npm c++',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","git","github","testing"],
    image: '/assets/images/npmcc/hero.png'
  },
  {
    slug: 'nuget',
    title: 'NuGet C#',
    description: 'A comprehensive guide covering nuget c#',
    date: '2025-09-20',
    category: 'Development',
    tags: ["dotnet","c#","ai","git","github"],
    image: '/assets/images/nuget/hero.png'
  },
  {
    slug: 'ollamadeepsekr1applemacbookinstall',
    title: 'DeepSeek R1',
    description: 'A comprehensive guide covering deepseek r1',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","testing"],
    image: '/assets/images/ollamadeepsekr1applemacbookinstall/hero.png'
  },
  {
    slug: 'opencv',
    title: 'Object Detection',
    description: 'A comprehensive guide covering object detection',
    date: '2025-09-20',
    category: 'Development',
    tags: ["python","git","github"],
    image: '/assets/images/opencv/hero.png'
  },
  {
    slug: 'page134',
    title: 'Dynamics 365 Sales (Part 1)',
    description: 'A comprehensive guide covering dynamics 365 sales (part 1)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","business central","dynamics"],
    image: '/assets/images/page134/hero.png'
  },
  {
    slug: 'page141',
    title: 'Java Spring Boot (Spare)',
    description: 'A comprehensive guide covering java spring boot (spare)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["azure","docker","java","spring","postgresql"],
    image: '/assets/images/page141/hero.png'
  },
  {
    slug: 'page152',
    title: 'Vendor Posting Group COPY',
    description: 'A comprehensive guide covering vendor posting group copy',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","business central","dynamics"],
    image: '/assets/images/page152/hero.png'
  },
  {
    slug: 'page199',
    title: 'Power Pages (Part 1) BACKUP',
    description: 'A comprehensive guide covering power pages (part 1) backup',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","business central","dynamics","power platform"],
    image: '/assets/images/page199/hero.png'
  },
  {
    slug: 'page200',
    title: 'Power Page (Part 2) Backup',
    description: 'A comprehensive guide covering power page (part 2) backup',
    date: '2025-09-20',
    category: 'Development',
    tags: ["javascript","java","ai","ml","business central"],
    image: '/assets/images/page200/hero.png'
  },
  {
    slug: 'page50',
    title: 'Next.js (Part 4)',
    description: 'A comprehensive guide covering next.js (part 4)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["aws"],
    image: '/assets/images/page50/hero.png'
  },
  {
    slug: 'page55',
    title: 'Page 55',
    description: 'A comprehensive guide covering page 55',
    date: '2025-09-20',
    category: 'Development',
    tags: [],
    image: '/assets/images/page55/hero.png'
  },
  {
    slug: 'page65',
    title: 'Machine Learning (Part 4a)',
    description: 'A comprehensive guide covering machine learning (part 4a)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["python","ai","ml","machine learning","git"],
    image: '/assets/images/page65/hero.png'
  },
  {
    slug: 'page68',
    title: 'Machine Learning (Part 7)',
    description: 'A comprehensive guide covering machine learning (part 7)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","machine learning"],
    image: '/assets/images/page68/hero.png'
  },
  {
    slug: 'page75',
    title: 'Page 75',
    description: 'A comprehensive guide covering page 75',
    date: '2025-09-20',
    category: 'Development',
    tags: [],
    image: '/assets/images/page75/hero.png'
  },
  {
    slug: 'page86',
    title: 'ASP.NET 5 Visual Basic',
    description: 'A comprehensive guide covering asp.net 5 visual basic',
    date: '2025-09-20',
    category: 'Development',
    tags: ["azure","docker","dotnet","sql","database"],
    image: '/assets/images/page86/hero.png'
  },
  {
    slug: 'phaser',
    title: 'Phaser',
    description: 'A comprehensive guide covering phaser',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","ml","git","github"],
    image: '/assets/images/phaser/hero.png'
  },
  {
    slug: 'phpsetup',
    title: 'PHP Setup',
    description: 'A comprehensive guide covering php setup',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ml"],
    image: '/assets/images/phpsetup/hero.png'
  },
  {
    slug: 'pi1',
    title: 'Raspberry Pi Imager',
    description: 'A comprehensive guide covering raspberry pi imager',
    date: '2025-09-20',
    category: 'Development',
    tags: [],
    image: '/assets/images/pi1/hero.png'
  },
  {
    slug: 'pi2',
    title: 'Raspberry Pi GPIO',
    description: 'A comprehensive guide covering raspberry pi gpio',
    date: '2025-09-20',
    category: 'Development',
    tags: ["python","ai"],
    image: '/assets/images/pi2/hero.png'
  },
  {
    slug: 'pluginactions',
    title: 'Plugin Actions',
    description: 'A comprehensive guide covering plugin actions',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai"],
    image: '/assets/images/pluginactions/hero.png'
  },
  {
    slug: 'postinggroups',
    title: 'Posting Groups',
    description: 'A comprehensive guide covering posting groups',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","business central","dynamics"],
    image: '/assets/images/postinggroups/hero.png'
  },
  {
    slug: 'posts',
    title: 'Posts',
    description: 'A comprehensive guide covering posts',
    date: '2025-09-20',
    category: 'Development',
    tags: [],
    image: '/assets/images/posts/hero.png'
  },
  {
    slug: 'powerapps23',
    title: 'Power Apps (Part 23)',
    description: 'A comprehensive guide covering power apps (part 23)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["sql","business central"],
    image: '/assets/images/powerapps23/hero.png'
  },
  {
    slug: 'powerapps23configurationmigrationtool',
    title: 'Power Apps (Part 23)',
    description: 'A comprehensive guide covering power apps (part 23)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","ml","power platform"],
    image: '/assets/images/powerapps23configurationmigrationtool/hero.png'
  },
  {
    slug: 'powerapps6',
    title: 'A Custom Connector for Microsoft Graph',
    description: 'A comprehensive guide covering a custom connector for microsoft graph',
    date: '2025-09-20',
    category: 'Development',
    tags: ["azure","ai"],
    image: '/assets/images/powerapps6/hero.png'
  },
  {
    slug: 'powerappsapplication',
    title: 'A Power Apps Application',
    description: 'A comprehensive guide covering a power apps application',
    date: '2025-09-20',
    category: 'Development',
    tags: ["database","ai"],
    image: '/assets/images/powerappsapplication/hero.png'
  },
  {
    slug: 'powerappswithrest',
    title: 'A Power Apps Custom Connector',
    description: 'A comprehensive guide covering a power apps custom connector',
    date: '2025-09-20',
    category: 'Development',
    tags: ["azure","dotnet","git","github","asp.net"],
    image: '/assets/images/powerappswithrest/hero.png'
  },
  {
    slug: 'powerappsxx',
    title: 'Power Apps (Part XX)',
    description: 'A comprehensive guide covering power apps (part xx)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["sql","business central"],
    image: '/assets/images/powerappsxx/hero.png'
  },
  {
    slug: 'powerautomate',
    title: 'Power Automate',
    description: 'A comprehensive guide covering power automate',
    date: '2025-09-20',
    category: 'Development',
    tags: [],
    image: '/assets/images/powerautomate/hero.png'
  },
  {
    slug: 'powerautomatereports',
    title: 'Microsoft Power Automate Reports',
    description: 'A comprehensive guide covering microsoft power automate reports',
    date: '2025-09-20',
    category: 'Development',
    tags: ["cloud","ai","dynamics"],
    image: '/assets/images/powerautomatereports/hero.png'
  },
  {
    slug: 'powerpages1',
    title: 'Power Pages (Part 1)',
    description: 'A comprehensive guide covering power pages (part 1)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","business central","dynamics","power platform"],
    image: '/assets/images/powerpages1/hero.png'
  },
  {
    slug: 'powerpages2',
    title: 'Power Pages (Part 2)',
    description: 'A comprehensive guide covering power pages (part 2)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","business central"],
    image: '/assets/images/powerpages2/hero.png'
  },
  {
    slug: 'powerpages3',
    title: 'Power Pages (Part 3)',
    description: 'A comprehensive guide covering power pages (part 3)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","business central"],
    image: '/assets/images/powerpages3/hero.png'
  },
  {
    slug: 'promptdialog',
    title: 'Business Central (Part 27) PromptDialog',
    description: 'A comprehensive guide covering business central (part 27) promptdialog',
    date: '2025-09-20',
    category: 'Development',
    tags: ["cloud","ai","business central","dynamics"],
    image: '/assets/images/promptdialog/hero.png'
  },
  {
    slug: 'promptdialog2',
    title: 'Business Central (Part 28) PrompDialog 2',
    description: 'A comprehensive guide covering business central (part 28) prompdialog 2',
    date: '2025-09-20',
    category: 'Development',
    tags: ["azure","cloud","ai","business central","dynamics"],
    image: '/assets/images/promptdialog2/hero.png'
  },
  {
    slug: 'promptdialog3',
    title: 'Business Central (Part 29) PromptDialog 3',
    description: 'A comprehensive guide covering business central (part 29) promptdialog 3',
    date: '2025-09-20',
    category: 'Development',
    tags: ["javascript","java","ai","ml","business central"],
    image: '/assets/images/promptdialog3/hero.png'
  },
  {
    slug: 'promptengineering',
    title: 'Prompt Engineering',
    description: 'A comprehensive guide covering prompt engineering',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai"],
    image: '/assets/images/promptengineering/hero.png'
  },
  {
    slug: 'promptflow1',
    title: 'Prompt Flow (Part 1)',
    description: 'A comprehensive guide covering prompt flow (part 1)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["azure","docker","kubernetes","devops","python"],
    image: '/assets/images/promptflow1/hero.png'
  },
  {
    slug: 'promptflow2',
    title: 'Prompt Flow (Part 2)',
    description: 'A comprehensive guide covering prompt flow (part 2)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["docker","ai"],
    image: '/assets/images/promptflow2/hero.png'
  },
  {
    slug: 'promptflow3',
    title: 'Prompt Flow (Part 3)',
    description: 'A comprehensive guide covering prompt flow (part 3)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["python","ai","git","github"],
    image: '/assets/images/promptflow3/hero.png'
  },
  {
    slug: 'promptflow4',
    title: 'Prompt Flow (Part 4)',
    description: 'A comprehensive guide covering prompt flow (part 4)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai"],
    image: '/assets/images/promptflow4/hero.png'
  },
  {
    slug: 'promptflow5',
    title: 'Prompt Flow (Part 5)',
    description: 'A comprehensive guide covering prompt flow (part 5)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["docker","python","ai"],
    image: '/assets/images/promptflow5/hero.png'
  },
  {
    slug: 'promptflow6',
    title: 'Prompt Flow (Part 6)',
    description: 'A comprehensive guide covering prompt flow (part 6)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["python","ai"],
    image: '/assets/images/promptflow6/hero.png'
  },
  {
    slug: 'purchaseinvoice',
    title: 'Purchase Invoice',
    description: 'A comprehensive guide covering purchase invoice',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","dynamics"],
    image: '/assets/images/purchaseinvoice/hero.png'
  },
  {
    slug: 'purview',
    title: 'Microsoft Purview',
    description: 'A comprehensive guide covering microsoft purview',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai"],
    image: '/assets/images/purview/hero.png'
  },
  {
    slug: 'pwa',
    title: 'Progressive Web Application',
    description: 'A comprehensive guide covering progressive web application',
    date: '2025-09-20',
    category: 'Development',
    tags: ["javascript","azure","java","ai","ml"],
    image: '/assets/images/pwa/hero.png'
  },
  {
    slug: 'reactandasp.net',
    title: 'React and ASP.NET Core',
    description: 'A comprehensive guide covering react and asp.net core',
    date: '2025-09-20',
    category: '.NET',
    tags: ["angular","react","dotnet","sql","database"],
    image: '/assets/images/reactandasp.net/hero.png'
  },
  {
    slug: 'reactusestateuseeffect',
    title: 'React useState and useEffect',
    description: 'A comprehensive guide covering react usestate and useeffect',
    date: '2025-09-20',
    category: 'Web Development',
    tags: ["react"],
    image: '/assets/images/reactusestateuseeffect/hero.png'
  },
  {
    slug: 'restapiservice',
    title: 'REST',
    description: 'A comprehensive guide covering rest',
    date: '2025-09-20',
    category: 'Development',
    tags: ["javascript","docker","java","ai"],
    image: '/assets/images/restapiservice/hero.png'
  },
  {
    slug: 'rewardsextension',
    title: 'Rewards Extension',
    description: 'A comprehensive guide covering rewards extension',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","ml","business central","dynamics"],
    image: '/assets/images/rewardsextension/hero.png'
  },
  {
    slug: 'sails1',
    title: 'Sails (Part 1)',
    description: 'A comprehensive guide covering sails (part 1)',
    date: '2025-09-20',
    category: 'AI/ML',
    tags: ["azure","aws","devops","database","ai"],
    image: '/assets/images/sails1/hero.png'
  },
  {
    slug: 'sails2',
    title: 'Sails (Part 2)',
    description: 'A comprehensive guide covering sails (part 2)',
    date: '2025-09-20',
    category: 'AI/ML',
    tags: ["azure","aws","ai","git","github"],
    image: '/assets/images/sails2/hero.png'
  },
  {
    slug: 'sails3',
    title: 'Sails (Part 3)',
    description: 'A comprehensive guide covering sails (part 3)',
    date: '2025-09-20',
    category: 'AI/ML',
    tags: ["aws","docker","kubernetes","ai","ml"],
    image: '/assets/images/sails3/hero.png'
  },
  {
    slug: 'salesinvoice',
    title: 'Sales Invoice',
    description: 'A comprehensive guide covering sales invoice',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","dynamics"],
    image: '/assets/images/salesinvoice/hero.png'
  },
  {
    slug: 'sentenceembeddings',
    title: 'Sentence Embeddings',
    description: 'A comprehensive guide covering sentence embeddings',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","machine learning"],
    image: '/assets/images/sentenceembeddings/hero.png'
  },
  {
    slug: 'sentencesimilarity',
    title: 'Sentence Similarity',
    description: 'A comprehensive guide covering sentence similarity',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai"],
    image: '/assets/images/sentencesimilarity/hero.png'
  },
  {
    slug: 'sentimentanalysis',
    title: 'Sentiment Analysis',
    description: 'A comprehensive guide covering sentiment analysis',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","machine learning"],
    image: '/assets/images/sentimentanalysis/hero.png'
  },
  {
    slug: 'sh1106',
    title: 'Raspberry Pi SH1106',
    description: 'A comprehensive guide covering raspberry pi sh1106',
    date: '2025-09-20',
    category: 'Development',
    tags: ["python","ml","machine learning"],
    image: '/assets/images/sh1106/hero.png'
  },
  {
    slug: 'sharepoint2019',
    title: 'SharePoint 2019',
    description: 'A comprehensive guide covering sharepoint 2019',
    date: '2025-09-20',
    category: 'Development',
    tags: ["azure","sql","database","ai"],
    image: '/assets/images/sharepoint2019/hero.png'
  },
  {
    slug: 'sharepointsitedesignsandsitescripts',
    title: 'SharePoint site designs and site scripts',
    description: 'A comprehensive guide covering sharepoint site designs and site scripts',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai"],
    image: '/assets/images/sharepointsitedesignsandsitescripts/hero.png'
  },
  {
    slug: 'sharepointwebpart1',
    title: 'SharePoint Web Part (Part 1)',
    description: 'A comprehensive guide covering sharepoint web part (part 1)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["react","typescript","ai","ml","testing"],
    image: '/assets/images/sharepointwebpart1/hero.png'
  },
  {
    slug: 'sharepointwebpart2',
    title: 'SharePoint Web Part (Part 2)',
    description: 'A comprehensive guide covering sharepoint web part (part 2)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["react","javascript","java","ai","ml"],
    image: '/assets/images/sharepointwebpart2/hero.png'
  },
  {
    slug: 'spring-boot-2',
    title: 'Java Spring Boot (Part 2)',
    description: 'A comprehensive guide covering java spring boot (part 2)',
    date: '2025-09-20',
    category: 'Java',
    tags: ["azure","java","spring","ai","git"],
    image: '/assets/images/spring-boot-2/hero.png'
  },
  {
    slug: 'spring-boot-3',
    title: 'Java Spring Boot (Part 3)',
    description: 'A comprehensive guide covering java spring boot (part 3)',
    date: '2025-09-20',
    category: 'Java',
    tags: ["azure","java","spring","git","github"],
    image: '/assets/images/spring-boot-3/hero.png'
  },
  {
    slug: 'spring-boot-4',
    title: 'Java Spring Boot (Part 4)',
    description: 'A comprehensive guide covering java spring boot (part 4)',
    date: '2025-09-20',
    category: 'Java',
    tags: ["java","spring"],
    image: '/assets/images/spring-boot-4/hero.png'
  },
  {
    slug: 'spring-boot-5',
    title: 'Java Spring Boot (Part 5)',
    description: 'A comprehensive guide covering java spring boot (part 5)',
    date: '2025-09-20',
    category: 'Java',
    tags: ["java","spring","ai","ml","git"],
    image: '/assets/images/spring-boot-5/hero.png'
  },
  {
    slug: 'spring-boot-6',
    title: 'Java Spring Boot (Part 6)',
    description: 'A comprehensive guide covering java spring boot (part 6)',
    date: '2025-09-20',
    category: 'Java',
    tags: ["java","spring","ai","git","github"],
    image: '/assets/images/spring-boot-6/hero.png'
  },
  {
    slug: 'spring-boot',
    title: 'Java Spring Boot (Part 1)',
    description: 'A comprehensive guide covering java spring boot (part 1)',
    date: '2025-09-20',
    category: 'Java',
    tags: ["react","javascript","java","spring","ai"],
    image: '/assets/images/spring-boot/hero.png'
  },
  {
    slug: 'sprint-apps1',
    title: 'Azure Spring Apps (Part 1)',
    description: 'A comprehensive guide covering azure spring apps (part 1)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["azure","java","spring","ai"],
    image: '/assets/images/sprint-apps1/hero.png'
  },
  {
    slug: 'stablediffusion',
    title: 'Stable Diffusion',
    description: 'A comprehensive guide covering stable diffusion',
    date: '2025-09-20',
    category: 'Development',
    tags: ["python","ai","git","github"],
    image: '/assets/images/stablediffusion/hero.png'
  },
  {
    slug: 'staticwebapp.config.json',
    title: 'staticwebapp.config.json',
    description: 'A comprehensive guide covering staticwebapp.config.json',
    date: '2025-09-20',
    category: 'Development',
    tags: ["azure","ai","ml","git","github"],
    image: '/assets/images/staticwebapp.config.json/hero.png'
  },
  {
    slug: 'streamlit',
    title: 'Streamlit',
    description: 'A comprehensive guide covering streamlit',
    date: '2025-09-20',
    category: 'Development',
    tags: ["python","ai","ml","machine learning"],
    image: '/assets/images/streamlit/hero.png'
  },
  {
    slug: 'syntexautofill',
    title: 'SharePoint Syntex Autofill',
    description: 'A comprehensive guide covering sharepoint syntex autofill',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","ml"],
    image: '/assets/images/syntexautofill/hero.png'
  },
  {
    slug: 'taxsetup',
    title: 'Tax Setup',
    description: 'A comprehensive guide covering tax setup',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","business central","dynamics"],
    image: '/assets/images/taxsetup/hero.png'
  },
  {
    slug: 'teamstoolkit',
    title: 'Teams Toolkit with Azure',
    description: 'A comprehensive guide covering teams toolkit with azure',
    date: '2025-09-20',
    category: 'Development',
    tags: ["react","azure","cloud","sql","database"],
    image: '/assets/images/teamstoolkit/hero.png'
  },
  {
    slug: 'teamstoolkitspfx',
    title: 'Teams Toolkit with SPFx',
    description: 'A comprehensive guide covering teams toolkit with spfx',
    date: '2025-09-20',
    category: 'Development',
    tags: ["azure","cloud","ai","git","github"],
    image: '/assets/images/teamstoolkitspfx/hero.png'
  },
  {
    slug: 'threejs',
    title: 'Three.js',
    description: 'A comprehensive guide covering three.js',
    date: '2025-09-20',
    category: 'Development',
    tags: ["javascript","java","ai"],
    image: '/assets/images/threejs/hero.png'
  },
  {
    slug: 'threetier',
    title: 'Blazor WASM API SQL Server Stored Procedure',
    description: 'A comprehensive guide covering blazor wasm api sql server stored procedure',
    date: '2025-09-20',
    category: 'Development',
    tags: ["dotnet","sql","database","ai","asp.net"],
    image: '/assets/images/threetier/hero.png'
  },
  {
    slug: 'ticktacktoe',
    title: 'Multiplayer Tick-Tack-Toe',
    description: 'A comprehensive guide covering multiplayer tick-tack-toe',
    date: '2025-09-20',
    category: 'Development',
    tags: ["javascript","java","database","ai","ml"],
    image: '/assets/images/ticktacktoe/hero.png'
  },
  {
    slug: 'topics',
    title: 'Topics',
    description: 'A comprehensive guide covering topics',
    date: '2025-09-20',
    category: 'Development',
    tags: ["business central"],
    image: '/assets/images/topics/hero.png'
  },
  {
    slug: 'vbnetconsolesqlserverunittests',
    title: 'VB.NET Console SQL Server Unit Tests',
    description: 'A comprehensive guide covering vb.net console sql server unit tests',
    date: '2025-09-20',
    category: 'Development',
    tags: ["dotnet","sql","database","ai","testing"],
    image: '/assets/images/vbnetconsolesqlserverunittests/hero.png'
  },
  {
    slug: 'vbnetwinforms',
    title: 'VB.NET WinForms and ASP.NET Core API',
    description: 'A comprehensive guide covering vb.net winforms and asp.net core api',
    date: '2025-09-20',
    category: 'Development',
    tags: ["dotnet","ai","asp.net"],
    image: '/assets/images/vbnetwinforms/hero.png'
  },
  {
    slug: 'vendorpostinggroup',
    title: 'Vendor Posting Group',
    description: 'A comprehensive guide covering vendor posting group',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","business central","dynamics"],
    image: '/assets/images/vendorpostinggroup/hero.png'
  },
  {
    slug: 'warehousemanagementputaway',
    title: 'Warehouse Management Put away',
    description: 'A comprehensive guide covering warehouse management put away',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","business central","dynamics"],
    image: '/assets/images/warehousemanagementputaway/hero.png'
  },
  {
    slug: 'webcomponents',
    title: 'Web Components',
    description: 'A comprehensive guide covering web components',
    date: '2025-09-20',
    category: 'Development',
    tags: ["angular","react","vue","javascript","java"],
    image: '/assets/images/webcomponents/hero.png'
  },
  {
    slug: 'webvr',
    title: 'WebVR',
    description: 'A comprehensive guide covering webvr',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","git","github"],
    image: '/assets/images/webvr/hero.png'
  },
  {
    slug: 'webvrdemo',
    title: 'Simple AR Example',
    description: 'A comprehensive guide covering simple ar example',
    date: '2025-09-20',
    category: 'Development',
    tags: [],
    image: '/assets/images/webvrdemo/hero.png'
  },
  {
    slug: 'webvrdemo2',
    title: 'Simple WebVR',
    description: 'A comprehensive guide covering simple webvr',
    date: '2025-09-20',
    category: 'Development',
    tags: [],
    image: '/assets/images/webvrdemo2/hero.png'
  },
  {
    slug: 'webvrdemo3',
    title: 'Simple WebAR',
    description: 'A comprehensive guide covering simple webar',
    date: '2025-09-20',
    category: 'Development',
    tags: [],
    image: '/assets/images/webvrdemo3/hero.png'
  },
  {
    slug: 'webvrdemo4',
    title: 'Simple WebAR',
    description: 'A comprehensive guide covering simple webar',
    date: '2025-09-20',
    category: 'Development',
    tags: [],
    image: '/assets/images/webvrdemo4/hero.png'
  },
  {
    slug: 'webvrdemo5',
    title: 'WebXR AR Test',
    description: 'A comprehensive guide covering webxr ar test',
    date: '2025-09-20',
    category: 'Development',
    tags: [],
    image: '/assets/images/webvrdemo5/hero.png'
  },
  {
    slug: 'webvrdemo6',
    title: 'AR with Camera Error Handling',
    description: 'A comprehensive guide covering ar with camera error handling',
    date: '2025-09-20',
    category: 'Development',
    tags: [],
    image: '/assets/images/webvrdemo6/hero.png'
  },
  {
    slug: 'webvrdemo7',
    title: 'WebXR AR Fallback',
    description: 'A comprehensive guide covering webxr ar fallback',
    date: '2025-09-20',
    category: 'Development',
    tags: [],
    image: '/assets/images/webvrdemo7/hero.png'
  },
  {
    slug: 'webvrpart2',
    title: 'WebVR (Part 2)',
    description: 'A comprehensive guide covering webvr (part 2)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["javascript","java"],
    image: '/assets/images/webvrpart2/hero.png'
  },
  {
    slug: 'webvrscene',
    title: 'WebVRScene',
    description: 'A comprehensive guide covering webvrscene',
    date: '2025-09-20',
    category: 'Development',
    tags: [],
    image: '/assets/images/webvrscene/hero.png'
  },
  {
    slug: 'webvrscene2',
    title: 'WebVRScene2',
    description: 'A comprehensive guide covering webvrscene2',
    date: '2025-09-20',
    category: 'Development',
    tags: [],
    image: '/assets/images/webvrscene2/hero.png'
  },
  {
    slug: 'webxr',
    title: 'WebXR',
    description: 'A comprehensive guide covering webxr',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ml","git","github"],
    image: '/assets/images/webxr/hero.png'
  },
  {
    slug: 'webxrscene',
    title: 'WebXRScene',
    description: 'A comprehensive guide covering webxrscene',
    date: '2025-09-20',
    category: 'Development',
    tags: [],
    image: '/assets/images/webxrscene/hero.png'
  },
  {
    slug: 'xcode1',
    title: 'XCode C++ (Part 1)',
    description: 'A comprehensive guide covering xcode c++ (part 1)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai"],
    image: '/assets/images/xcode1/hero.png'
  },
  {
    slug: 'xcode2',
    title: 'XCode C++ (Part 2)',
    description: 'A comprehensive guide covering xcode c++ (part 2)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai"],
    image: '/assets/images/xcode2/hero.png'
  },
  {
    slug: 'xcode3',
    title: 'XCode C++ (Part 3)',
    description: 'A comprehensive guide covering xcode c++ (part 3)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai"],
    image: '/assets/images/xcode3/hero.png'
  },
  {
    slug: 'xcode4',
    title: 'XCode C++ (Part 4)',
    description: 'A comprehensive guide covering xcode c++ (part 4)',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai","ml"],
    image: '/assets/images/xcode4/hero.png'
  },
  {
    slug: 'yolo',
    title: 'Yolo',
    description: 'A comprehensive guide covering yolo',
    date: '2025-09-20',
    category: 'Development',
    tags: ["ai"],
    image: '/assets/images/yolo/hero.png'
  },
  {
    slug: 'azure-ai-part-1',
    title: 'Azure AI (Part 1)',
    description: 'A comprehensive guide covering azure ai (part 1)',
    date: '2024-01-10',
    category: 'Azure',
    tags: ["Azure","AI","Machine Learning"],
    image: '/assets/images/azure-ai-part-1/hero.png'
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
