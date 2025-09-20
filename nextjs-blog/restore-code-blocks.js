const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// File paths
const markdownDir = 'content/';
const htmlDir = '../backup-20250921/';

// Language mapping for code blocks
const languageMap = {
    'language-javascript': 'javascript',
    'language-js': 'javascript',
    'language-typescript': 'typescript',
    'language-ts': 'typescript',
    'language-html': 'html',
    'language-css': 'css',
    'language-json': 'json',
    'language-yaml': 'yaml',
    'language-yml': 'yaml',
    'language-python': 'python',
    'language-py': 'python',
    'language-java': 'java',
    'language-cs': 'csharp',
    'language-csharp': 'csharp',
    'language-cpp': 'cpp',
    'language-c': 'c',
    'language-sql': 'sql',
    'language-bash': 'bash',
    'language-sh': 'bash',
    'language-powershell': 'powershell',
    'language-ps1': 'powershell',
    'language-xml': 'xml',
    'language-text': 'text',
    'language-plaintext': 'text',
    'language-al': 'al',
    'language-php': 'php',
    'language-go': 'go',
    'language-rust': 'rust',
    'language-swift': 'swift',
    'language-kotlin': 'kotlin',
    'language-dart': 'dart',
    'language-r': 'r',
    'language-matlab': 'matlab',
    'language-dockerfile': 'dockerfile',
    'language-docker': 'dockerfile',
    'language-markdown': 'markdown',
    'language-md': 'markdown',
    'language-graphql': 'graphql',
    'language-vb': 'vb',
    'language-vbnet': 'vb'
};

function extractCodeFromHTML(htmlPath) {
    try {
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        const dom = new JSDOM(htmlContent);
        const doc = dom.window.document;
        
        const codeBlocks = [];
        
        // Find all pre elements with language classes
        const preElements = doc.querySelectorAll('pre[class*="language-"]');
        
        preElements.forEach((pre, index) => {
            const codeElement = pre.querySelector('code');
            if (codeElement) {
                // Get the language from the class attribute
                const classNames = pre.className.split(' ');
                const languageClass = classNames.find(cls => cls.startsWith('language-'));
                const language = languageMap[languageClass] || 'text';
                
                // Extract code from HTML comments or text content
                let code = '';
                const htmlContent = codeElement.innerHTML;
                
                // Check if code is in HTML comments
                const commentMatch = htmlContent.match(/<!--\s*([\s\S]*?)\s*-->/);
                if (commentMatch) {
                    code = commentMatch[1].trim();
                } else {
                    // Fall back to text content
                    code = codeElement.textContent.trim();
                }
                
                if (code) {
                    // Find the title/description from nearby elements
                    let title = '';
                    
                    // Look for a previous heading or strong element
                    let prevElement = pre.previousElementSibling;
                    while (prevElement && !title) {
                        if (prevElement.tagName && ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'STRONG', 'B'].includes(prevElement.tagName)) {
                            title = prevElement.textContent.trim();
                            break;
                        }
                        if (prevElement.textContent && prevElement.textContent.trim().length > 0 && prevElement.textContent.trim().length < 100) {
                            title = prevElement.textContent.trim();
                            break;
                        }
                        prevElement = prevElement.previousElementSibling;
                    }
                    
                    // Clean up the title
                    if (title) {
                        title = title.replace(/[^\w\s\-\.]/g, '').trim();
                        if (title.length > 50) {
                            title = title.substring(0, 50) + '...';
                        }
                    }
                    
                    codeBlocks.push({
                        title: title || `Code block ${index + 1}`,
                        language,
                        code: code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
                    });
                }
            }
        });
        
        return codeBlocks;
    } catch (error) {
        console.error(`Error processing ${htmlPath}:`, error.message);
        return [];
    }
}

function getCurrentCodeBlockCount(markdownPath) {
    try {
        const content = fs.readFileSync(markdownPath, 'utf8');
        const codeBlockMatches = content.match(/```[\s\S]*?```/g) || [];
        return codeBlockMatches.length;
    } catch (error) {
        return 0;
    }
}

function restoreCodeBlocks(markdownPath, htmlPath) {
    try {
        const codeBlocks = extractCodeFromHTML(htmlPath);
        const currentCount = getCurrentCodeBlockCount(markdownPath);
        
        if (codeBlocks.length === 0 || codeBlocks.length <= currentCount) {
            console.log(`Skipping ${path.basename(markdownPath)} - no additional code blocks to restore`);
            return false;
        }
        
        let markdownContent = '';
        try {
            markdownContent = fs.readFileSync(markdownPath, 'utf8');
        } catch (error) {
            console.log(`Creating new markdown file: ${markdownPath}`);
        }
        
        // Add code blocks to the end of the markdown file
        let additionalContent = '\n\n';
        
        codeBlocks.forEach((block, index) => {
            if (index >= currentCount) { // Only add new code blocks
                additionalContent += `## ${block.title}\n\n`;
                additionalContent += `\`\`\`${block.language}\n${block.code}\n\`\`\`\n\n`;
            }
        });
        
        const updatedContent = markdownContent + additionalContent;
        fs.writeFileSync(markdownPath, updatedContent, 'utf8');
        
        console.log(`✅ Restored ${codeBlocks.length - currentCount} code blocks to ${path.basename(markdownPath)}`);
        return true;
    } catch (error) {
        console.error(`❌ Error restoring code blocks for ${markdownPath}:`, error.message);
        return false;
    }
}

// Process all files
function processAllFiles() {
    console.log('🔄 Starting code block restoration process...\n');
    
    let processedCount = 0;
    let successCount = 0;
    
    // Get all markdown files
    const markdownFiles = fs.readdirSync(markdownDir)
        .filter(file => file.endsWith('.md'))
        .map(file => file.replace('.md', ''));
    
    markdownFiles.forEach(baseName => {
        const markdownPath = path.join(markdownDir, `${baseName}.md`);
        
        // Try different HTML file name variants
        const htmlVariants = [
            `${baseName}.html`,
            `${baseName.replace(/\s+/g, '')}.html`,
            `${baseName.replace(/\s+/g, '').replace(/-/g, '')}.html`,
            // Convert kebab-case to PascalCase for some files
            baseName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + '.html',
            // Try with spaces
            baseName.replace(/-/g, ' ') + '.html',
            // Try all lowercase
            baseName.toLowerCase() + '.html',
            // Try specific mappings
            getSpecificMapping(baseName)
        ].filter(Boolean);
        
        let htmlPath = null;
        for (const variant of htmlVariants) {
            const testPath = path.join(htmlDir, variant);
            if (fs.existsSync(testPath)) {
                htmlPath = testPath;
                break;
            }
        }
        
        if (htmlPath) {
            processedCount++;
            console.log(`📝 Processing: ${baseName}.md → ${path.basename(htmlPath)}`);
            const success = restoreCodeBlocks(markdownPath, htmlPath);
            if (success) successCount++;
        } else {
            console.log(`⚠️  HTML file not found for ${baseName}.md`);
        }
    });
    
    console.log(`\n📊 Processing complete:`);
    console.log(`   Files processed: ${processedCount}`);
    console.log(`   Successfully updated: ${successCount}`);
    console.log(`   Skipped/Failed: ${processedCount - successCount}`);
}

// Special mappings for files with different naming patterns
function getSpecificMapping(baseName) {
    const mappings = {
        'mssqlserver2': 'mssqlserver2.html',
        'mssqlserver3': 'mssqlserver3.html',
        'multiplayer': 'multiplayer.html',
        'nextjs1': 'nextjs1.html',
        'nextjs2': 'nextjs2.html',
        'nextjs3': 'nextjs3.html',
        'nextjs4': 'nextjs4.html',
        'nextjs5': 'nextjs5.html',
        'npm': 'npm.html',
        'npmcc': 'npmCC.html',
        'nuget': 'nuget.html',
        'ngrxentity': 'ngrxEntity.html',
        'page200': 'page200.html',
        'phaser': 'phaser.html',
        'pi2': 'pi2.html',
        'powerappswithrest': 'powerappswithrest.html',
        'promptdialog': 'promptDialog.html',
        'promptdialog2': 'promptDialog2.html',
        'promptdialog3': 'promptDialog3.html',
        'promptflow2': 'promptFlow2.html',
        'promptflow5': 'promptFlow5.html',
        'promptflow6': 'promptFlow6.html',
        'pwa': 'pwa.html',
        'reactusestateuseeffect': 'reactusestateuseeffect.html',
        'restapiservice': 'restapiservice.html',
        'rewardsextension': 'rewardsExtension.html',
        'sails3': 'sails3.html',
        'sentenceembeddings': 'sentenceEmbeddings.html',
        'sentencesimilarity': 'sentencesimilarity.html',
        'sentimentanalysis': 'sentimentanalysis.html',
        'sharepointsitedesignsandsitescripts': 'sharepointsitedesignsandsitescripts.html',
        'sharepointwebpart2': 'sharepointwebpart2.html',
        'spring-boot-3': 'spring-boot-3.html',
        'spring-boot-4': 'spring-boot-4.html',
        'spring-boot-5': 'spring-boot-5.html',
        'spring-boot-6': 'spring-boot-6.html',
        'spring-boot': 'spring-boot.html',
        'staticwebapp.config.json': 'staticwebapp.config.json.html',
        'streamlit': 'streamlit.html',
        'teamstoolkit': 'teamstoolkit.html',
        'threejs': 'threejs.html',
        'ticktacktoe': 'ticktacktoe.html',
        'vbnetwinforms': 'vbnetwinforms.html',
        'webcomponents': 'webcomponents.html',
        'xcode1': 'xcode1.html',
        'xcode2': 'xcode2.html',
        'xcode3': 'xcode3.html',
        'xcode4': 'xcode4.html'
    };
    
    return mappings[baseName];
}

// Run the restoration process
processAllFiles();