'use client';

import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MobiriseParsedContent {
  type: 'text' | 'image' | 'heading' | 'code';
  content: string;
  description?: string;
  level?: number;
  language?: string;
}

function parseMarkdownToMobirise(markdownContent: string): MobiriseParsedContent[] {
  const lines = markdownContent.split('\n');
  const sections: MobiriseParsedContent[] = [];
  let currentTextContent: string[] = [];
  let inCodeBlock = false;
  let codeContent: string[] = [];
  let codeLanguage = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Handle code blocks
    if (trimmedLine.startsWith('```')) {
      if (!inCodeBlock) {
        // Starting a code block
        // Flush any accumulated text
        if (currentTextContent.length > 0) {
          sections.push({
            type: 'text',
            content: currentTextContent.join('\n')
          });
          currentTextContent = [];
        }
        
        inCodeBlock = true;
        codeLanguage = trimmedLine.slice(3).trim(); // Extract language
        codeContent = [];
      } else {
        // Ending a code block
        sections.push({
          type: 'code',
          content: codeContent.join('\n'),
          language: codeLanguage
        });
        
        inCodeBlock = false;
        codeContent = [];
        codeLanguage = '';
      }
      continue;
    }
    
    // If we're in a code block, accumulate code content
    if (inCodeBlock) {
      codeContent.push(line);
      continue;
    }
    
    // Skip empty lines (only when not in code block)
    if (!trimmedLine) continue;
    
    // Handle images with descriptions
    if (trimmedLine.startsWith('![')) {
      // Flush any accumulated text
      if (currentTextContent.length > 0) {
        sections.push({
          type: 'text',
          content: currentTextContent.join('\n')
        });
        currentTextContent = [];
      }
      
      // Extract image path
      const imageMatch = trimmedLine.match(/!\[.*?\]\((.*?)\)/);
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
    else if (trimmedLine.startsWith('#')) {
      // Flush any accumulated text
      if (currentTextContent.length > 0) {
        sections.push({
          type: 'text',
          content: currentTextContent.join('\n')
        });
        currentTextContent = [];
      }
      
      const level = trimmedLine.match(/^#+/)?.[0].length || 1;
      const headingText = trimmedLine.replace(/^#+\s*/, '');
      
      sections.push({
        type: 'heading',
        content: headingText,
        level
      });
    }
    // Accumulate text content
    else {
      currentTextContent.push(trimmedLine);
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
                      <Image 
                        src={section.content} 
                        alt={section.description || ''} 
                        width={800}
                        height={600}
                        style={{ width: '100%', height: 'auto' }}
                        className="img-fluid"
                        onError={() => {
                          console.error('Image failed to load:', section.content);
                        }}
                        unoptimized={true}
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
        } else if (section.type === 'code') {
          return (
            <section key={index} className="content7 cid-content7" data-bs-version="5.1">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-md-10">
                    <blockquote>
                      <h5 className="mbr-section-title mbr-fonts-style mb-2 display-7">
                        <strong>{section.language ? section.language.toUpperCase() : 'CODE'}</strong>
                      </h5>
                      <SyntaxHighlighter
                        language={section.language || 'text'}
                        style={prism}
                        customStyle={{
                          backgroundColor: '#f5f5f5',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          padding: '1rem',
                          fontSize: '0.9rem',
                          lineHeight: '1.4'
                        }}
                        showLineNumbers={true}
                      >
                        {section.content}
                      </SyntaxHighlighter>
                    </blockquote>
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