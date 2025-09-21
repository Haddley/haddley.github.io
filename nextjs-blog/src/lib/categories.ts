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
    aliases: ['net', 'csharp', 'aspnet', 'blazor']
  },
  {
    slug: 'csharp',
    name: 'C#',
    description: 'C# programming language, syntax, and development',
    icon: '🔷',
    color: 'bg-purple-100 text-purple-800',
    aliases: ['cs', 'dotnet']
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
    aliases: ['spring', 'android', 'kotlin']
  },
  {
    slug: 'javascript',
    name: 'JavaScript',
    description: 'JavaScript development, Node.js, React, and web frameworks',
    icon: '🟨',
    color: 'bg-yellow-100 text-yellow-800',
    aliases: ['js', 'nodejs', 'node', 'react', 'vue', 'angular']
  },
  {
    slug: 'react',
    name: 'React',
    description: 'React library, components, hooks, and modern web development',
    icon: '⚛️',
    color: 'bg-cyan-100 text-cyan-800',
    aliases: ['reactjs', 'jsx']
  },
  {
    slug: 'angular',
    name: 'Angular',
    description: 'Angular framework, TypeScript, and enterprise web applications',
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
    aliases: ['ts']
  },
  {
    slug: 'azure',
    name: 'Azure',
    description: 'Microsoft Azure cloud services and development',
    icon: '☁️',
    color: 'bg-blue-100 text-blue-800',
    aliases: ['azureai', 'azureopenai']
  },
  {
    slug: 'aws',
    name: 'AWS',
    description: 'Amazon Web Services, cloud infrastructure, and serverless',
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
    slug: 'microsoft-365',
    name: 'Microsoft 365',
    description: 'SharePoint, Teams, Office 365, and Microsoft Graph',
    icon: '🏢',
    color: 'bg-indigo-100 text-indigo-800',
    aliases: ['m365', 'office365', 'sharepoint', 'teams', 'graph']
  },
  {
    slug: 'microsoft-dynamics',
    name: 'Microsoft Dynamics',
    description: 'Business Central, Dynamics 365, and ERP solutions',
    icon: '💼',
    color: 'bg-red-100 text-red-800',
    aliases: ['dynamics', 'business-central', 'erp', 'crm']
  },
  {
    slug: 'power-platform',
    name: 'Power Platform',
    description: 'Power Apps, Power Automate, Power BI, and Dataverse',
    icon: '⚡',
    color: 'bg-yellow-100 text-yellow-800',
    aliases: ['powerapps', 'powerautomate', 'powerbi', 'dataverse']
  },
  {
    slug: 'devops',
    name: 'DevOps',
    description: 'CI/CD, Docker, Kubernetes, and deployment automation',
    icon: '🔧',
    color: 'bg-gray-100 text-gray-800',
    aliases: ['cicd', 'docker', 'kubernetes', 'terraform']
  },
  {
    slug: 'cloud',
    name: 'Cloud',
    description: 'Cloud computing, serverless technologies, and multi-cloud',
    icon: '☁️',
    color: 'bg-cyan-100 text-cyan-800',
    aliases: ['serverless', 'microservices', 'cloud-native']
  },
  {
    slug: 'iot',
    name: 'IOT',
    description: 'Internet of Things, sensors, and embedded systems',
    icon: '🌐',
    color: 'bg-teal-100 text-teal-800',
    aliases: ['internet-of-things', 'sensors', 'embedded']
  },
  {
    slug: 'mobile',
    name: 'Mobile',
    description: 'iOS, Android, and mobile app development',
    icon: '📱',
    color: 'bg-pink-100 text-pink-800',
    aliases: ['ios', 'android', 'reactnative', 'flutter']
  },
  
  // Legacy categories for backward compatibility
  {
    slug: 'ai-machine-learning',
    name: 'AI & Machine Learning',
    description: 'AI models, machine learning, ChatGPT, and intelligent applications',
    icon: '🤖',
    color: 'bg-purple-100 text-purple-800',
    aliases: ['aiml', 'ml', 'machine-learning']
  },
  {
    slug: 'microsoft-365',
    name: 'Microsoft 365',
    description: 'Power Platform, SharePoint, Business Central, and Office 365',
    icon: '🏢',
    color: 'bg-blue-100 text-blue-800',
    aliases: ['m365', 'microsoft', 'office365', 'sharepoint', 'powerplatform']
  },
  {
    slug: 'web-development',
    name: 'Web Development',
    description: 'React, Angular, TypeScript, Next.js, and modern web technologies',
    icon: '🌐',
    color: 'bg-green-100 text-green-800',
    aliases: ['web', 'frontend', 'react', 'angular', 'javascript', 'typescript']
  },
  {
    slug: 'cloud-devops',
    name: 'Cloud & DevOps',
    description: 'Azure, AWS, Docker, Kubernetes, and cloud infrastructure',
    icon: '☁️',
    color: 'bg-sky-100 text-sky-800',
    aliases: ['cloud', 'devops', 'azure', 'aws', 'docker', 'kubernetes']
  },
  {
    slug: 'mobile-iot',
    name: 'Mobile & IoT',
    description: 'iOS development, Raspberry Pi, and Internet of Things projects',
    icon: '📱',
    color: 'bg-orange-100 text-orange-800',
    aliases: ['mobile', 'iot', 'ios', 'raspberry-pi', 'raspberrypi']
  },
  {
    slug: 'dotnet-development',
    name: '.NET Development',
    description: 'ASP.NET, Blazor, C#, VB.NET, and Microsoft development stack',
    icon: '⚡',
    color: 'bg-indigo-100 text-indigo-800',
    aliases: ['dotnet', 'net', 'csharp', 'aspnet', 'blazor', 'vb.net', 'vbnet']
  },
  {
    slug: 'data-analytics',
    name: 'Data & Analytics',
    description: 'Databases, SQL, data science, and analytics solutions',
    icon: '📊',
    color: 'bg-yellow-100 text-yellow-800',
    aliases: ['data', 'analytics', 'sql', 'database', 'datascience']
  },
  {
    slug: 'development-tools',
    name: 'Development Tools',
    description: 'IDEs, frameworks, build tools, and developer productivity',
    icon: '🛠️',
    color: 'bg-gray-100 text-gray-800',
    aliases: ['tools', 'ide', 'vscode', 'frameworks']
  },
  {
    slug: 'java',
    name: 'Java',
    description: 'Java development, Spring Boot, enterprise applications, and JVM technologies',
    icon: '☕',
    color: 'bg-orange-100 text-orange-800',
    aliases: ['spring', 'springboot', 'spring-boot', 'jvm', 'maven', 'gradle']
  },
  {
    slug: 'development',
    name: 'General Development',
    description: 'Programming concepts, tutorials, and general development topics',
    icon: '💻',
    color: 'bg-slate-100 text-slate-800',
    aliases: ['dev', 'programming', 'coding', 'general']
  }
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

