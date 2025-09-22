// Category Configuration
export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  aliases?: string[]; // Add aliases for alternative URLs
}

export const categories: Category[] = [
  // New automated target categories
  {
    slug: 'dotnet',
    name: '.NET',
    description: 'ASP.NET, Blazor, C#, and .NET development',
    icon: '🏗️',
    color: 'bg-purple-100 text-purple-800',
    aliases: ['net', 'csharp', 'C#', 'aspnet', 'blazor']
  },
  {
    slug: 'csharp',
    name: 'C#',
    description: 'C# programming language, syntax, and development',
    icon: '🔷',
    color: 'bg-purple-100 text-purple-800',
    aliases: ['cs', 'C#']
  },
  {
    slug: 'python',
    name: 'Python',
    description: 'Python programming, data science, AI/ML, and automation',
    icon: '🐍',
    color: 'bg-green-100 text-green-800',
    aliases: ['py', 'django', 'flask', 'pandas', 'numpy']
  },
  {
    slug: 'java',
    name: 'Java',
    description: 'Java development, Spring, Android, and JVM technologies',
    icon: '☕',
    color: 'bg-orange-100 text-orange-800',
    aliases: ['spring', 'J2EE', 'kotlin']
  },
  {
    slug: 'sql',
    name: 'SQL',
    description: 'SQL databases, queries, data management, and database development',
    icon: '🗄️',
    color: 'bg-indigo-100 text-indigo-800',
    aliases: ['mysql', 'postgresql', 'sqlserver', 'sqlite']
  },
  {
    slug: 'javascript',
    name: 'JavaScript',
    description: 'JavaScript development, Node.js, React, Angular, and other web frameworks',
    icon: '🟨',
    color: 'bg-yellow-100 text-yellow-800',
    aliases: ['js', 'nodejs', 'node', 'vue', 'electron', 'nextjs']
  },
  {
    slug: 'react',
    name: 'React',
    description: 'React library modern web development',
    icon: '⚛️',
    color: 'bg-cyan-100 text-cyan-800',
    aliases: ['reactjs', 'jsx', 'nextjs']
  },
  {
    slug: 'angular',
    name: 'Angular',
    description: 'Angular framework enterprise web applications',
    icon: '🅰️',
    color: 'bg-red-100 text-red-800',
    aliases: ['angularjs', 'ng']
  },
  {
    slug: 'typescript',
    name: 'TypeScript',
    description: 'TypeScript development, type-safe JavaScript, and modern web apps',
    icon: '🔷',
    color: 'bg-blue-100 text-blue-800',
    aliases: ['ts', 'tsx']
  },
  {
    slug: 'php',
    name: 'PHP',
    description: 'PHP programming language, web development, and server-side scripting',
    icon: '🐘',
    color: 'bg-purple-100 text-purple-800',
    aliases: ['laravel', 'symfony', 'wordpress']
  },
  {
    slug: 'azure',
    name: 'Azure',
    description: 'Microsoft Azure cloud services and development',
    icon: '☁️',
    color: 'bg-blue-100 text-blue-800',
    aliases: ['azureai', 'azureopenai', 'azure-functions', 'azure-devops']
  },
  {
    slug: 'aws',
    name: 'AWS',
    description: 'Amazon Web Services, cloud infrastructure, and development',
    icon: '🟠',
    color: 'bg-orange-100 text-orange-800',
    aliases: ['amazon', 'ec2', 'lambda', 'eks', 'ecs', 'fargate']
  },
  {
    slug: 'ai',
    name: 'AI',
    description: 'Artificial Intelligence, machine learning, and AI models',
    icon: '🤖',
    color: 'bg-green-100 text-green-800',
    aliases: ['artificial-intelligence', 'machine-learning', 'ml', 'openai', 'chatgpt']
  },
  {
    slug: 'power-platform',
    name: 'Power Platform',
    description: 'Microsoft Power Platform, Power Apps, Power Automate, Power BI',
    icon: '⚡',
    color: 'bg-yellow-100 text-yellow-800',
    aliases: ['power-apps', 'power-automate', 'power-bi', 'powerapps', 'powerautomate', 'powerbi']
  },
  {
    slug: 'microsoft-dynamics',
    name: 'Microsoft Dynamics',
    description: 'Microsoft Dynamics 365, CRM, ERP, and business applications',
    icon: '🏢',
    color: 'bg-indigo-100 text-indigo-800',
    aliases: ['dynamics365', 'dynamics-365', 'crm']
  },
  {
    slug: 'business-central',
    name: 'Business Central',
    description: 'Microsoft Dynamics 365 Business Central ERP system',
    icon: '💼',
    color: 'bg-blue-100 text-blue-800',
    aliases: ['dynamics-business-central', 'bc']
  },
  {
    slug: 'microsoft-365',
    name: 'Microsoft 365',
    description: 'Microsoft 365, Office 365, SharePoint, Teams development',
    icon: '📊',
    color: 'bg-purple-100 text-purple-800',
    aliases: ['office365', 'sharepoint', 'teams', 'onedrive', 'outlook']
  },
  {
    slug: 'devops',
    name: 'DevOps',
    description: 'DevOps practices, CI/CD, automation, and deployment pipelines',
    icon: '🔄',
    color: 'bg-gray-100 text-gray-800',
    aliases: ['ci-cd', 'continuous-integration', 'continuous-deployment', 'automation']
  },
  {
    slug: 'maps',
    name: 'Maps',
    description: 'A Geographic Information System is a powerful computer-based system designed to capture, store, manage, analyze, and visualize all types of geographic data',
    icon: '🌎',
    color: 'bg-gray-100 text-gray-800',
    aliases: ['GIS', 'geographic-information-system', 'leaflet']
  },

];

// Category Helper Functions
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(category =>
    category.slug === slug ||
    (category.aliases && category.aliases.includes(slug))
  );
}

export function getCategoryByName(name: string): Category | undefined {
  return categories.find(cat => cat.name === name);
}

export function categoryNameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
}

export function categorySlugToName(slug: string): string {
  const category = getCategoryBySlug(slug);
  return category ? category.name : slug;
}

