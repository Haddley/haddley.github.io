const fs = require('fs');
const path = require('path');

// Get list of files that still have hero.png
const contentDir = './content';
const assetsDir = './public/assets/images';

// Common image mappings for files that weren't in the original HTML
const manualMappings = {
  'angular.md': '/assets/images/angular',
  'angular-new.md': '/assets/images/angular',
  'angular1.md': '/assets/images/angular1',
  'angularandasp.net.md': '/assets/images/angularandasp.net',
  'amazonecs.md': '/assets/images/ecs-logo.png',
  'amazonfargate.md': '/assets/images/fargate-logo.png',
  'api management.md': '/assets/images/azure-api-management.png',
  'applelogo.md': '/assets/images/apple-logo.png',
  'asp.net 5 cs.md': '/assets/images/dotnet-logo.png',
  'asp.net 5 visual basic.md': '/assets/images/dotnet-logo.png',
  'asp.net core.md': '/assets/images/aspnetcore',
  'azureai1.md': '/assets/images/azurex70x75.svg',
  'azureai1-new.md': '/assets/images/azurex70x75.svg',
  'azurereactstaticweb app.md': '/assets/images/azurex70x75.svg',
  'blazorwasmandasp.net.md': '/assets/images/blazor-logo.png',
  'businesscentralintegrationtables.md': '/assets/images/business-central-logo.png',
  'businesscentralpart 27 extendingstandardapis.md': '/assets/images/business-central-logo.png',
  'businesscentralpart 2extendingstandardapis.md': '/assets/images/business-central-logo.png',
  'businesscentralpart26integratingwithdataverseusingintegrationtables.md': '/assets/images/business-central-logo.png',
  'businesscentralpart26integrationtables.md': '/assets/images/business-central-logo.png',
  'configurecopilotwithauthentication.md': '/assets/images/copilot-logo.png',
  'customercontentvirtualtables.md': '/assets/images/dataverse-logo.png',
  'customercopilotstudio.md': '/assets/images/copilot-logo.png',
  'dataversefetchxml.md': '/assets/images/dataverse-logo.png',
  'dotnet core part1.md': '/assets/images/dotnet-logo.png',
  'dotnet core part2 deleted.md': '/assets/images/dotnet-logo.png',
  'dotnet core part2.md': '/assets/images/dotnet-logo.png',
  'dotnet core part3.md': '/assets/images/dotnet-logo.png',
  'dynamicssales4.md': '/assets/images/dynamics-365-logo.png',
  'finetuning.md': '/assets/images/ai-ml-logo.png',
  'google08ffec2589f7c95c.md': '/assets/images/google-logo.png',
  'google111fd44366657b80.md': '/assets/images/google-logo.png',
  'hands-on-lab2.1.md': '/assets/images/lab-icon.png',
  'hands-on-lab2.2.md': '/assets/images/lab-icon.png',
  'hands-on-lab2.3.md': '/assets/images/lab-icon.png',
  'hands-on-lab3.1.md': '/assets/images/lab-icon.png',
  'hubspotquotetemplate.md': '/assets/images/hubspot-logo.png',
  'macbook.md': '/assets/images/apple-logo.png',
  'machinelearning.md': '/assets/images/ml-icon.png',
  'machinelearningwip.md': '/assets/images/ml-icon.png',
  'mcpserver2.md': '/assets/images/mcp-1024x1024.png',
  'microsoftdynamics365appforoutlook.md': '/assets/images/dynamics-365-logo.png',
  'modeldrivenapps.md': '/assets/images/powerapps-logo.png',
  'mssqlserver3.md': '/assets/images/sql-server-logo.png',
  'notes.md': '/assets/images/notes-icon.png',
  'page134.md': '/assets/images/default-hero.png',
  'page141.md': '/assets/images/default-hero.png',
  'page152.md': '/assets/images/default-hero.png',
  'page199.md': '/assets/images/default-hero.png',
  'page200.md': '/assets/images/default-hero.png',
  'page50.md': '/assets/images/default-hero.png',
  'page55.md': '/assets/images/default-hero.png',
  'page65.md': '/assets/images/default-hero.png',
  'page68.md': '/assets/images/default-hero.png',
  'page75.md': '/assets/images/default-hero.png',
  'page86.md': '/assets/images/default-hero.png',
  'postinggroups.md': '/assets/images/business-central-logo.png',
  'posts.md': '/assets/images/blog-hero.png',
  'powerapps23.md': '/assets/images/powerapps-logo.png',
  'powerappsxx.md': '/assets/images/powerapps-logo.png',
  'reactandasp.net.md': '/assets/images/react-logo.png',
  'sentenceembeddings.md': '/assets/images/ai-ml-logo.png',
  'sprint-apps1.md': '/assets/images/spring-framework-logo',
  'staticwebapp.config.json.md': '/assets/images/azure-static-web-apps.png',
  'streamlit.md': '/assets/images/streamlit-logo.png',
  'taxsetup.md': '/assets/images/business-central-logo.png',
  'webvrdemo.md': '/assets/images/webvr-logo.png',
  'webvrdemo2.md': '/assets/images/webvr-logo.png',
  'webvrdemo3.md': '/assets/images/webvr-logo.png',
  'webvrdemo4.md': '/assets/images/webvr-logo.png',
  'webvrdemo5.md': '/assets/images/webvr-logo.png',
  'webvrdemo6.md': '/assets/images/webvr-logo.png',
  'webvrdemo7.md': '/assets/images/webvr-logo.png',
  'webvrpart2.md': '/assets/images/webvr-logo.png',
  'webvrscene.md': '/assets/images/webvr-logo.png',
  'webvrscene2.md': '/assets/images/webvr-logo.png',
  'webxrscene.md': '/assets/images/webxr-logo.png',
  'yolo.md': '/assets/images/yolo-logo.png'
};

// Function to update frontmatter
function updateFrontmatter(filePath, imagePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = content.replace(
    /^image:\s*['"]?.*hero\.png['"]?$/m,
    `image: "${imagePath}"`
  );
  
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated ${path.basename(filePath)} with image: ${imagePath}`);
    return true;
  }
  return false;
}

// Process remaining files
let updatedCount = 0;
const files = fs.readdirSync(contentDir);

files.forEach(file => {
  if (file.endsWith('.md') && manualMappings[file]) {
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Only update if it still has hero.png
    if (content.includes('hero.png')) {
      if (updateFrontmatter(filePath, manualMappings[file])) {
        updatedCount++;
      }
    }
  }
});

console.log(`\nUpdated ${updatedCount} additional files with hero images.`);

// Check how many still have hero.png
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

console.log(`\nRemaining files with hero.png: ${remainingFiles.length}`);
if (remainingFiles.length > 0) {
  console.log('Files still needing images:');
  remainingFiles.forEach(file => console.log(`  - ${file}`));
}