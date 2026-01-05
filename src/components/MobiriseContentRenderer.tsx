'use client';

import React from 'react';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Function to get appropriate icon class based on URL
function getIconForUrl(url: string): string {
  try {
    // Handle relative URLs by checking if they start with /
    if (url.startsWith('/')) {
      // Check file extension for relative URLs
      if (url.match(/\.(mp3|wav|ogg|m4a)$/i)) {
        return 'mbri-music';
      } else if (url.match(/\.(mp4|webm|mov)$/i)) {
        return 'mbri-video';
      } else if (url.match(/\.(pdf|doc|docx)$/i)) {
        return 'mbri-file';
      }
      return 'mbri-pages';
    }
    
    const hostname = new URL(url).hostname.toLowerCase();
    
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      return 'socicon-youtube socicon';
    } else if (hostname.includes('microsoft.com') || hostname.includes('learn.microsoft.com')) {
      return 'socicon-microsoft socicon';
    } else if (hostname.includes('github.com')) {
      return 'socicon-github socicon';
    } else if (hostname.includes('amazon.com') || hostname.includes('aws.amazon.com')) {
      return 'socicon-amazon socicon';
    } else if (hostname.includes('wikimedia.org') || hostname.includes('commons.wikimedia.org')) {
      return 'mbri-pages';
    } else {
      return 'mbri-pages';
    }
  } catch {
    // If URL parsing fails, return a default icon
    return 'mbri-pages';
  }
}

// Function to process inline markdown syntax
function processInlineMarkdown(text: string): React.ReactElement[] {
  const elements: React.ReactElement[] = [];
  let currentIndex = 0;
  let elementKey = 0;

  // Regular expressions for different markdown patterns
  const patterns = [
    { regex: /\[([^\]]+)\]\(([^)]+)\)/g, component: 'link' }, // [text](url)
    { regex: /\*\*(.*?)\*\*/g, component: 'strong' }, // **bold**
    { regex: /\*(.*?)\*/g, component: 'em' },         // *italic*
    { regex: /`(.*?)`/g, component: 'code' }         // `code`
  ];

  while (currentIndex < text.length) {
    let earliestMatch = null;
    let earliestIndex = text.length;
    let matchedPattern = null;

    // Find the earliest markdown pattern
    for (const pattern of patterns) {
      pattern.regex.lastIndex = currentIndex;
      const match = pattern.regex.exec(text);
      if (match && match.index < earliestIndex) {
        earliestMatch = match;
        earliestIndex = match.index;
        matchedPattern = pattern;
      }
    }

    if (earliestMatch && matchedPattern) {
      // Add text before the match
      if (earliestIndex > currentIndex) {
        elements.push(
          <span key={elementKey++}>
            {text.slice(currentIndex, earliestIndex)}
          </span>
        );
      }

      // Add the formatted element
      if (matchedPattern.component === 'link') {
        const linkText = earliestMatch[1];
        const linkUrl = earliestMatch[2];
        elements.push(
          <a key={elementKey++} href={linkUrl} className="text-primary">
            {linkText}
          </a>
        );
      } else if (matchedPattern.component === 'strong') {
        elements.push(
          <strong key={elementKey++}>
            {earliestMatch[1]}
          </strong>
        );
      } else if (matchedPattern.component === 'em') {
        elements.push(
          <em key={elementKey++}>
            {earliestMatch[1]}
          </em>
        );
      } else if (matchedPattern.component === 'code') {
        elements.push(
          <code key={elementKey++}>
            {earliestMatch[1]}
          </code>
        );
      }

      currentIndex = earliestIndex + earliestMatch[0].length;
    } else {
      // No more patterns found, add remaining text
      elements.push(
        <span key={elementKey++}>
          {text.slice(currentIndex)}
        </span>
      );
      break;
    }
  }

  return elements;
}

interface MobiriseParsedContent {
  type: 'text' | 'image' | 'video' | 'audio' | 'heading' | 'code' | 'references-header' | 'references' | 'table' | 'hr';
  content: string;
  description?: string;
  level?: number;
  language?: string;
  references?: Array<{url: string, title: string}>;
  tableData?: {
    headers: string[];
    rows: string[][];
  };
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

    // Handle horizontal rules (---, ***, ___ with optional spaces)
    if (/^(\*\s*){3,}$/.test(trimmedLine) || /^(\-\s*){3,}$/.test(trimmedLine) || /^(\_\s*){3,}$/.test(trimmedLine)) {
      // Flush any accumulated text
      if (currentTextContent.length > 0) {
        sections.push({
          type: 'text',
          content: currentTextContent.join('\n')
        });
        currentTextContent = [];
      }

      sections.push({
        type: 'hr',
        content: ''
      });

      continue;
    }
    
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
        
        // Check if this is a video file
        const videoExtensions = ['.mp4', '.webm', '.mov'];
        const isVideo = videoExtensions.some(ext => imagePath.toLowerCase().endsWith(ext));
        
        // Check if this is an audio file
        const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a'];
        const isAudio = audioExtensions.some(ext => imagePath.toLowerCase().endsWith(ext));
        
        let contentType: 'image' | 'video' | 'audio' = 'image';
        if (isVideo) contentType = 'video';
        else if (isAudio) contentType = 'audio';
        
        sections.push({
          type: contentType,
          content: imagePath,
          description
        });
      }
    }
    // Handle tables
    else if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
      // Flush any accumulated text
      if (currentTextContent.length > 0) {
        sections.push({
          type: 'text',
          content: currentTextContent.join('\n')
        });
        currentTextContent = [];
      }
      
      // Parse table
      const tableLines: string[] = [];
      let j = i;
      
      // Collect all table lines
      while (j < lines.length && lines[j].trim().startsWith('|') && lines[j].trim().endsWith('|')) {
        tableLines.push(lines[j].trim());
        j++;
      }
      
      if (tableLines.length >= 2) {
        // Parse headers (first line)
        const headers = tableLines[0]
          .split('|')
          .slice(1, -1) // Remove empty first and last elements
          .map(h => h.trim());
        
        // Skip separator line (second line)
        // Parse data rows (remaining lines)
        const rows: string[][] = [];
        for (let k = 2; k < tableLines.length; k++) {
          const row = tableLines[k]
            .split('|')
            .slice(1, -1) // Remove empty first and last elements
            .map(cell => cell.trim());
          rows.push(row);
        }
        
        sections.push({
          type: 'table',
          content: '',
          tableData: {
            headers,
            rows
          }
        });
        
        i = j - 1; // Adjust loop counter
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
      
      // Check if this is a References section
      if (headingText.toLowerCase() === 'references' && level === 2) {
        sections.push({
          type: 'references-header',
          content: headingText,
          level
        });
        
        // Process the following lines as reference links
        const references: Array<{url: string, title: string}> = [];
        i++; // Move to next line
        
        while (i < lines.length) {
          const refLine = lines[i].trim();
          if (!refLine) {
            i++;
            continue;
          }
          
          // Look for markdown links: - [Title](URL) - Description
          const linkMatch = refLine.match(/^-\s*\[([^\]]+)\]\(([^)]+)\)(?:\s*-\s*(.*))?/);
          if (linkMatch) {
            references.push({
              url: linkMatch[2],
              title: linkMatch[1]
            });
            i++;
          } else {
            // No more reference links, break and continue normal processing
            i--; // Step back one line
            break;
          }
        }
        
        if (references.length > 0) {
          sections.push({
            type: 'references',
            content: '',
            references
          });
        }
      } else {
        sections.push({
          type: 'heading',
          content: headingText,
          level
        });
      }
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
                                {processInlineMarkdown(section.content)}
                              </h4>
                    </div>
                  </div>
                </div>
              </section>
            );
          } else if (section.level === 3) {
            return (
              <section key={index} className="content5 cid-content5" data-bs-version="5.1">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-10">
                      <h5 className="mbr-section-subtitle mbr-fonts-style mb-4 display-7 fw-bold">
                        {processInlineMarkdown(section.content)}
                      </h5>
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
                          {processInlineMarkdown(line)}
                          {lineIndex < section.content.split('\n').length - 1 && <><br /><br /></>}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          );
        } else if (section.type === 'hr') {
          return (
            <section key={index} className="content5 cid-content5" data-bs-version="5.1">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-12 col-lg-10">
                    <hr />
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
        } else if (section.type === 'video') {
          return (
            <section key={index} className="image3 cid-image3" data-bs-version="5.1">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-10">
                    <div className="image-wrapper">
                      <video 
                        controls 
                        autoPlay 
                        loop
                        muted
                        style={{ width: '100%', height: 'auto' }}
                        className="img-fluid"
                      >
                        <source src={section.content} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
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
        } else if (section.type === 'audio') {
          return (
            <section key={index} className="content5 cid-content5" data-bs-version="5.1">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-10">
                    <div className="audio-wrapper" style={{ padding: '20px 0' }}>
                      <audio 
                        controls 
                        style={{ 
                          width: '100%', 
                          minHeight: '54px',
                          display: 'block',
                          backgroundColor: '#f5f5f5',
                          borderRadius: '4px'
                        }}
                      >
                        <source src={section.content} type="audio/mpeg" />
                        Your browser does not support the audio tag.
                      </audio>
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
        } else if (section.type === 'table') {
          return (
            <section key={index} className="content5 cid-content5" data-bs-version="5.1">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-12 col-lg-10">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            {section.tableData?.headers.map((header, headerIndex) => (
                              <th key={headerIndex} className="mbr-fonts-style display-7 fw-bold">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.tableData?.rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="mbr-text mbr-fonts-style display-7">
                                  {processInlineMarkdown(cell)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
        } else if (section.type === 'references') {
          return (
            <section key={index} className="features13 cid-references" data-bs-version="5.1">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12">
                    <h3 className="mbr-section-title align-center mb-4 mbr-fonts-style display-2">
                      <strong>References</strong>
                    </h3>
                  </div>
                  {section.references?.map((reference, refIndex) => (
                    <div key={`ref-${refIndex}`} className="col-12 col-md-4 col-lg-2 p-3">
                      <div className="card">
                        <div className="card-wrapper">
                          <div className="card-box align-center">
                            <span 
                              className={`mbr-iconfont ${getIconForUrl(reference.url)}`}
                              style={{ fontSize: '48px', marginBottom: '1rem', display: 'block' }}
                            ></span>
                            <h4 className="card-title align-center mbr-black mbr-fonts-style display-7">
                              <strong>
                                <a 
                                  href={reference.url} 
                                  className="text-primary" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                >
                                  {reference.title}
                                </a>
                              </strong>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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