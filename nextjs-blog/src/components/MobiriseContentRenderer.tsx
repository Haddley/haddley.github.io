'use client';

interface MobiriseParsedContent {
  type: 'text' | 'image' | 'heading';
  content: string;
  description?: string;
  level?: number;
}

function parseMarkdownToMobirise(markdownContent: string): MobiriseParsedContent[] {
  const lines = markdownContent.split('\n');
  const sections: MobiriseParsedContent[] = [];
  let currentTextContent: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) continue;
    
    // Handle images with descriptions
    if (line.startsWith('![')) {
      // Flush any accumulated text
      if (currentTextContent.length > 0) {
        sections.push({
          type: 'text',
          content: currentTextContent.join('\n')
        });
        currentTextContent = [];
      }
      
      // Extract image path
      const imageMatch = line.match(/!\[.*?\]\((.*?)\)/);
      if (imageMatch) {
        const imagePath = imageMatch[1];
        let description = '';
        
        // Check if next line is the description (italic text)
        if (i + 1 < lines.length && lines[i + 1].trim().startsWith('*') && lines[i + 1].trim().endsWith('*')) {
          description = lines[i + 1].trim().slice(1, -1); // Remove asterisks
          i++; // Skip the description line
        }
        
        sections.push({
          type: 'image',
          content: imagePath,
          description
        });
      }
    }
    // Handle headings
    else if (line.startsWith('#')) {
      // Flush any accumulated text
      if (currentTextContent.length > 0) {
        sections.push({
          type: 'text',
          content: currentTextContent.join('\n')
        });
        currentTextContent = [];
      }
      
      const level = line.match(/^#+/)?.[0].length || 1;
      const headingText = line.replace(/^#+\s*/, '');
      
      sections.push({
        type: 'heading',
        content: headingText,
        level
      });
    }
    // Accumulate text content
    else {
      currentTextContent.push(line);
    }
  }
  
  // Flush any remaining text
  if (currentTextContent.length > 0) {
    sections.push({
      type: 'text',
      content: currentTextContent.join('\n')
    });
  }
  
  return sections;
}

interface MobiriseContentRendererProps {
  markdownContent: string;
}

export default function MobiriseContentRenderer({ markdownContent }: MobiriseContentRendererProps) {
  const sections = parseMarkdownToMobirise(markdownContent);
  
  return (
    <>
      {sections.map((section, index) => {
        if (section.type === 'heading') {
          if (section.level === 1) {
            // Main title - already handled in page header
            return null;
          } else if (section.level === 2) {
            return (
              <section key={index} className="content5 cid-content5" data-bs-version="5.1">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-10">
                      <h4 className="mbr-section-subtitle mbr-fonts-style mb-4 display-5">
                        {section.content}
                      </h4>
                    </div>
                  </div>
                </div>
              </section>
            );
          }
        } else if (section.type === 'text') {
          return (
            <section key={index} className="content5 cid-content5" data-bs-version="5.1">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-12 col-lg-10">
                    <p className="mbr-text mbr-fonts-style display-7">
                      {section.content.split('\n').map((line, lineIndex) => (
                        <span key={lineIndex}>
                          {line}
                          {lineIndex < section.content.split('\n').length - 1 && <><br /><br /></>}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          );
        } else if (section.type === 'image') {
          return (
            <section key={index} className="image3 cid-image3" data-bs-version="5.1">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-10">
                    <div className="image-wrapper">
                      <img 
                        src={section.content} 
                        alt={section.description || ''} 
                        style={{ width: '100%', height: 'auto' }}
                        className="img-fluid"
                        onError={(e) => {
                          console.error('Image failed to load:', section.content);
                          (e.target as HTMLImageElement).style.border = '2px solid red';
                          (e.target as HTMLImageElement).alt = `Failed to load: ${section.content}`;
                        }}
                      />
                      {section.description && (
                        <p className="mbr-description mbr-fonts-style mt-2 align-center display-4">
                          {section.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }
        
        return null;
      })}
    </>
  );
}