const fs = require('fs');
const path = require('path');

// Final mappings using existing images
const finalMappings = {
  'page134.md': '/assets/images/dynamics365salespart1',
  'page141.md': '/assets/images/dynamics365salespart1',
  'page152.md': '/assets/images/dynamics365salespart1',
  'page199.md': '/assets/images/dynamics365salespart1',
  'page200.md': '/assets/images/dynamics365salespart1',
  'page50.md': '/assets/images/dynamics365salespart1',
  'page55.md': '/assets/images/dynamics365salespart1',
  'page65.md': '/assets/images/dynamics365salespart1',
  'page68.md': '/assets/images/dynamics365salespart1',
  'page75.md': '/assets/images/dynamics365salespart1',
  'page86.md': '/assets/images/dynamics365salespart1',
  'posts.md': '/assets/images/blogcopilotstudio'
};

// Function to update frontmatter
function updateFrontmatter(filePath, imagePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Handle both hero.png and default-hero.png
  const updatedContent = content.replace(
    /^image:\s*['"]?.*(?:hero\.png|default-hero\.png)['"]?$/m,
    `image: "${imagePath}"`
  );
  
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated ${path.basename(filePath)} with image: ${imagePath}`);
    return true;
  }
  return false;
}

// Update AWS/Azure specific files with existing images
const awsAzureMappings = {
  'amazonecs.md': '/assets/images/amazon-ecr-google-chrome-10-13-2021-4-06-47-pm-1380x733.png',
  'amazonfargate.md': '/assets/images/amazon-ecr-google-chrome-10-13-2021-4-06-47-pm-1380x733.png',
  'api management.md': '/assets/images/azurex70x75.svg',
  'applelogo.md': '/assets/images/appleLogo',
  'asp.net 5 cs.md': '/assets/images/asp.net 5 cs',
  'asp.net 5 visual basic.md': '/assets/images/asp.net 5 visual basic',
  'asp.net core.md': '/assets/images/aspnetcore',
  'blazorwasmandasp.net.md': '/assets/images/blazorwasmandasp.net',
  'businesscentralintegrationtables.md': '/assets/images/businesscentralintegrationtables',
  'businesscentralpart 27 extendingstandardapis.md': '/assets/images/businesscentralpart 27 extendingstandardapis',
  'businesscentralpart 2extendingstandardapis.md': '/assets/images/businesscentralpart 2extendingstandardapis',
  'businesscentralpart26integratingwithdataverseusingintegrationtables.md': '/assets/images/businesscentralpart26integratingwithdataverseusingintegrationtables',
  'businesscentralpart26integrationtables.md': '/assets/images/businesscentralpart26integrationtables',
  'configurecopilotwithauthentication.md': '/assets/images/configurecopilotwithauthentication',
  'customercontentvirtualtables.md': '/assets/images/customercontentvirtualtables',
  'customercopilotstudio.md': '/assets/images/customercopilotstudio',
  'dataversefetchxml.md': '/assets/images/dataversefetchxml',
  'dotnet core part1.md': '/assets/images/dotnet core part1',
  'dotnet core part2 deleted.md': '/assets/images/dotnet core part2 deleted',
  'dotnet core part2.md': '/assets/images/dotnet core part2',
  'dotnet core part3.md': '/assets/images/dotnet core part3',
  'dynamicssales4.md': '/assets/images/dynamicssales4',
  'finetuning.md': '/assets/images/finetuning',
  'google08ffec2589f7c95c.md': '/assets/images/google08ffec2589f7c95c',
  'google111fd44366657b80.md': '/assets/images/google111fd44366657b80',
  'hands-on-lab2.1.md': '/assets/images/hands-on-lab2.1',
  'hands-on-lab2.2.md': '/assets/images/hands-on-lab2.2',
  'hands-on-lab2.3.md': '/assets/images/hands-on-lab2.3',
  'hands-on-lab3.1.md': '/assets/images/hands-on-lab3.1',
  'hubspotquotetemplate.md': '/assets/images/hubspotquotetemplate',
  'macbook.md': '/assets/images/macbook',
  'machinelearning.md': '/assets/images/machinelearning',
  'machinelearningwip.md': '/assets/images/machinelearningwip',
  'mcpserver2.md': '/assets/images/mcp-1024x1024.png',
  'microsoftdynamics365appforoutlook.md': '/assets/images/microsoftdynamics365appforoutlook',
  'modeldrivenapps.md': '/assets/images/modeldrivenapps',
  'mssqlserver3.md': '/assets/images/mssqlserver3',
  'notes.md': '/assets/images/notes',
  'postinggroups.md': '/assets/images/postinggroups',
  'posts.md': '/assets/images/blogcopilotstudio',
  'powerapps23.md': '/assets/images/powerapps23',
  'powerappsxx.md': '/assets/images/powerappsxx',
  'reactandasp.net.md': '/assets/images/reactandasp.net',
  'sentenceembeddings.md': '/assets/images/sentenceembeddings',
  'sprint-apps1.md': '/assets/images/spring-framework-logo',
  'staticwebapp.config.json.md': '/assets/images/staticwebapp.config.json',
  'streamlit.md': '/assets/images/streamlit',
  'taxsetup.md': '/assets/images/taxsetup',
  'webvrdemo.md': '/assets/images/webvrdemo',
  'webvrdemo2.md': '/assets/images/webvrdemo2',
  'webvrdemo3.md': '/assets/images/webvrdemo3',
  'webvrdemo4.md': '/assets/images/webvrdemo4',
  'webvrdemo5.md': '/assets/images/webvrdemo5',
  'webvrdemo6.md': '/assets/images/webvrdemo6',
  'webvrdemo7.md': '/assets/images/webvrdemo7',
  'webvrpart2.md': '/assets/images/webvrpart2',
  'webvrscene.md': '/assets/images/webvrscene',
  'webvrscene2.md': '/assets/images/webvrscene2',
  'webxrscene.md': '/assets/images/webxrscene',
  'yolo.md': '/assets/images/yolo'
};

const contentDir = './content';
let updatedCount = 0;

// Process final mappings first
Object.keys(finalMappings).forEach(file => {
  const filePath = path.join(contentDir, file);
  if (fs.existsSync(filePath)) {
    if (updateFrontmatter(filePath, finalMappings[file])) {
      updatedCount++;
    }
  }
});

// Then update with actual existing image names
Object.keys(awsAzureMappings).forEach(file => {
  const filePath = path.join(contentDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    // Only update files that still have placeholder images
    if (content.includes('/assets/images/ecs-logo.png') || 
        content.includes('/assets/images/fargate-logo.png') ||
        content.includes('/assets/images/azure-api-management.png') ||
        content.includes('/assets/images/apple-logo.png') ||
        content.includes('/assets/images/dotnet-logo.png') ||
        content.includes('/assets/images/blazor-logo.png') ||
        content.includes('/assets/images/business-central-logo.png') ||
        content.includes('/assets/images/copilot-logo.png') ||
        content.includes('/assets/images/dataverse-logo.png') ||
        content.includes('/assets/images/dynamics-365-logo.png') ||
        content.includes('/assets/images/ai-ml-logo.png') ||
        content.includes('/assets/images/google-logo.png') ||
        content.includes('/assets/images/lab-icon.png') ||
        content.includes('/assets/images/hubspot-logo.png') ||
        content.includes('/assets/images/ml-icon.png') ||
        content.includes('/assets/images/powerapps-logo.png') ||
        content.includes('/assets/images/sql-server-logo.png') ||
        content.includes('/assets/images/notes-icon.png') ||
        content.includes('/assets/images/react-logo.png') ||
        content.includes('/assets/images/azure-static-web-apps.png') ||
        content.includes('/assets/images/streamlit-logo.png') ||
        content.includes('/assets/images/webvr-logo.png') ||
        content.includes('/assets/images/webxr-logo.png') ||
        content.includes('/assets/images/yolo-logo.png')) {
      if (updateFrontmatter(filePath, awsAzureMappings[file])) {
        updatedCount++;
      }
    }
  }
});

console.log(`\nUpdated ${updatedCount} final files with appropriate images.`);

// Final check
const files = fs.readdirSync(contentDir);
const remainingFiles = [];
files.forEach(file => {
  if (file.endsWith('.md')) {
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('hero.png')) {
      remainingFiles.push(file);
    }
  }
});

console.log(`\nFinal check - Remaining files with hero.png: ${remainingFiles.length}`);
if (remainingFiles.length > 0) {
  console.log('Files still needing images:');
  remainingFiles.forEach(file => console.log(`  - ${file}`));
}