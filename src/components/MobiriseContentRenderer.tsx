'use client';

import React from 'react';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import MermaidDiagram from './MermaidDiagram';
import dynamic from 'next/dynamic';

// Live demos are loaded only on the posts that use them, and only in the browser.
const MiniGPTDemo = dynamic(() => import('./MiniGPTDemo'), { ssr: false });
const MiniGPTWheelDemo = dynamic(() => import('./MiniGPTWheelDemo'), { ssr: false });
const MiniGPTHiddenStateDemo = dynamic(() => import('./MiniGPTHiddenStateDemo'), { ssr: false });
const MiniGPTBlocksDemo = dynamic(() => import('./MiniGPTBlocksDemo'), { ssr: false });
const MiniGPTSwitchesDemo = dynamic(() => import('./MiniGPTSwitchesDemo'), { ssr: false });
const MiniGPTAttentionDemo = dynamic(() => import('./MiniGPTAttentionDemo'), { ssr: false });
const MiniGPTEmbedDemo = dynamic(() => import('./MiniGPTEmbedDemo'), { ssr: false });

// Copy-to-clipboard button for code blocks
function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      className={`btn btn-sm ${copied ? 'btn-success' : 'btn-outline-secondary'}`}
      onClick={handleCopy}
      aria-label="Copy code to clipboard"
      style={{ fontSize: '0.75rem', padding: '0.15rem 0.6rem' }}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

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
        const isExternal = /^https?:\/\//i.test(linkUrl);
        elements.push(
          <a
            key={elementKey++}
            href={linkUrl}
            className="text-primary"
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {processInlineMarkdown(linkText)}
          </a>
        );
      } else if (matchedPattern.component === 'strong') {
        elements.push(
          <strong key={elementKey++}>
            {processInlineMarkdown(earliestMatch[1])}
          </strong>
        );
      } else if (matchedPattern.component === 'em') {
        elements.push(
          <em key={elementKey++}>
            {processInlineMarkdown(earliestMatch[1])}
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
  type: 'text' | 'image' | 'video' | 'audio' | 'heading' | 'code' | 'references-header' | 'references' | 'table' | 'hr' | 'blockquote' | 'callout';
  content: string;
  calloutType?: string;
  children?: MobiriseParsedContent[];
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
  let codeFence = '```';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Handle code blocks (support 3+ backtick fences)
    const fenceMatch = trimmedLine.match(/^(`{3,})/);
    if (fenceMatch && (!inCodeBlock || trimmedLine === codeFence)) {
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
        codeFence = fenceMatch[1];
        codeLanguage = trimmedLine.slice(codeFence.length).trim(); // Extract language
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
        codeFence = '```';
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

    // Handle Head First-style callouts: ":::type Optional title" ... ":::".
    // Callouts can nest (e.g. an answer inside an exercise), and their bodies are parsed recursively.
    const calloutMatch = trimmedLine.match(/^:::([a-z-]+)\s*(.*)$/);
    if (calloutMatch) {
      if (currentTextContent.length > 0) {
        sections.push({ type: 'text', content: currentTextContent.join('\n') });
        currentTextContent = [];
      }

      const bodyLines: string[] = [];
      let depth = 1;
      let fence: string | null = null;
      let j = i + 1;
      for (; j < lines.length; j++) {
        const inner = lines[j].trim();
        const innerFence = inner.match(/^(`{3,})/);
        if (innerFence && (fence === null || inner === fence)) {
          fence = fence === null ? innerFence[1] : null;
        } else if (fence === null) {
          if (/^:::[a-z-]/.test(inner)) depth++;
          else if (inner === ':::' && --depth === 0) break;
        }
        bodyLines.push(lines[j]);
      }

      sections.push({
        type: 'callout',
        calloutType: calloutMatch[1],
        content: calloutMatch[2],
        children: parseMarkdownToMobirise(bodyLines.join('\n'))
      });

      i = j; // Skip past the closing ':::'
      continue;
    }

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

    // Handle blockquotes (lines starting with '>')
    if (trimmedLine.startsWith('>')) {
      // Flush any accumulated text
      if (currentTextContent.length > 0) {
        sections.push({
          type: 'text',
          content: currentTextContent.join('\n')
        });
        currentTextContent = [];
      }

      const quoteLines: string[] = [];
      let j = i;

      // Collect all consecutive blockquote lines, stripping the leading '>'
      while (j < lines.length && lines[j].trim().startsWith('>')) {
        quoteLines.push(lines[j].trim().replace(/^>\s?/, ''));
        j++;
      }

      sections.push({
        type: 'blockquote',
        content: quoteLines.join('\n')
      });

      i = j - 1; // Adjust loop counter
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
        const rawPath = imageMatch[1];
        const imagePath = rawPath.startsWith('/') || rawPath.startsWith('http') ? rawPath : '/' + rawPath;
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

// Turns a heading into a URL-friendly id, so posts can link to their own sections.
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// Callout boxes, written in Markdown as ":::type Optional title" ... ":::".
const CALLOUTS: Record<string, { icon: string; label: string; accent: string; background: string }> = {
  'brain-power': { icon: '🧠', label: 'Brain Power', accent: '#7c3aed', background: '#f5f3ff' },
  'no-dumb-questions': { icon: '🙋', label: 'There are no Dumb Questions', accent: '#2563eb', background: '#eff6ff' },
  'watch-it': { icon: '⚠️', label: 'Watch it!', accent: '#dc2626', background: '#fef2f2' },
  'pencil': { icon: '✏️', label: 'Sharpen your pencil', accent: '#059669', background: '#ecfdf5' },
  'fireside-chat': { icon: '🔥', label: 'Fireside Chat', accent: '#c2410c', background: '#fff7ed' },
  'bullet-points': { icon: '📌', label: 'Bullet Points', accent: '#4b5563', background: '#f9fafb' },
  'under-the-hood': { icon: '🔧', label: 'Under the hood', accent: '#6b7280', background: '#f9fafb' },
  'test-drive': { icon: '🚗', label: 'Test Drive', accent: '#0891b2', background: '#ecfeff' },
  'answer': { icon: '💡', label: 'Show the answer', accent: '#059669', background: '#ffffff' },
};

// Wraps a section body in the Mobirise page shell, unless it is nested inside a callout.
function wrap(
  key: React.Key,
  nested: boolean,
  inner: React.ReactNode,
  sectionClass = 'content5 cid-content5',
  colClass = 'col-md-12 col-lg-11'
) {
  if (nested) return <div key={key} className="mb-3">{inner}</div>;
  return (
    <section key={key} className={sectionClass} data-bs-version="5.1">
      <div className="container">
        <div className="row justify-content-center">
          <div className={colClass}>{inner}</div>
        </div>
      </div>
    </section>
  );
}

function renderCallout(section: MobiriseParsedContent, index: number, nested: boolean) {
  // ":::demo minigpt" ... ":::" embeds a live demo rather than a callout box.
  if (section.calloutType === 'demo') {
    if (section.content.trim() === 'minigpt') return wrap(index, nested, <MiniGPTDemo />);
    if (section.content.trim() === 'minigpt1') return wrap(index, nested, <MiniGPTWheelDemo />);
    if (section.content.trim() === 'minigpt12') return wrap(index, nested, <MiniGPTWheelDemo settings />);
    if (section.content.trim() === 'minigpt-logits') return wrap(index, nested, <MiniGPTWheelDemo settings scores />);
    if (section.content.trim() === 'minigpt3') return wrap(index, nested, <MiniGPTHiddenStateDemo />);
    if (section.content.trim() === 'minigpt-blocks') return wrap(index, nested, <MiniGPTBlocksDemo />);
    if (section.content.trim() === 'minigpt-mlp') return wrap(index, nested, <MiniGPTSwitchesDemo kind="mlp" />);
    if (section.content.trim() === 'minigpt-heads') return wrap(index, nested, <MiniGPTSwitchesDemo kind="heads" />);
    if (section.content.trim() === 'minigpt-qkv') return wrap(index, nested, <MiniGPTAttentionDemo />);
    if (section.content.trim() === 'minigpt-embed') return wrap(index, nested, <MiniGPTEmbedDemo />);
    return null;
  }
  const style = CALLOUTS[section.calloutType || ''] || CALLOUTS['bullet-points'];
  const body = (section.children || []).map((child, childIndex) => renderSection(child, childIndex, true));

  // Collapsible callouts: answers to exercises, and optional deep-dive detail.
  if (section.calloutType === 'answer' || section.calloutType === 'under-the-hood') {
    const summary = section.calloutType === 'answer'
      ? style.label
      : `${style.label}${section.content ? `: ${section.content}` : ''}`;
    return wrap(index, nested, (
      <details
        className="mbr-fonts-style display-7"
        style={{ border: `1px dashed ${style.accent}`, borderRadius: '8px', background: style.background, padding: '0.75rem 1.25rem', margin: nested ? '0.5rem 0 0' : '1.5rem 0' }}
      >
        <summary style={{ cursor: 'pointer', fontWeight: 700, color: style.accent, fontFamily: "var(--font-hand), 'Bradley Hand', 'Comic Sans MS', cursive", fontSize: '1.15rem' }}>
          <span aria-hidden="true">{style.icon}</span> {processInlineMarkdown(summary)}
        </summary>
        <div className="mt-3">{body}</div>
      </details>
    ));
  }

  const hand = "var(--font-hand), 'Bradley Hand', 'Comic Sans MS', cursive";
  const title = (
    <div className="mb-3" style={{ fontFamily: hand, fontWeight: 700, fontSize: '1.35rem', color: style.accent, lineHeight: 1.2 }}>
      <span aria-hidden="true" style={{ marginRight: '0.5rem' }}>{style.icon}</span>
      {style.label}
      {section.content && <span style={{ fontWeight: 400, color: '#374151' }}> · {processInlineMarkdown(section.content)}</span>}
    </div>
  );

  // Fireside chats: each "**Speaker:** line" becomes a speech bubble, alternating sides.
  if (section.calloutType === 'fireside-chat') {
    const speakers: string[] = [];
    const bubbles: React.ReactNode[] = [];
    (section.children || []).forEach((child, i) => {
      if (child.type !== 'text') {
        bubbles.push(renderSection(child, i, true));
        return;
      }
      // Consecutive paragraphs arrive as one text section, one line each.
      child.content.split('\n').forEach((line, j) => {
        const m = line.match(/^\*\*([^*:]+):\*\*\s*(.*)$/);
        if (!m) {
          bubbles.push(<p key={`${i}-${j}`} className="mb-2">{processInlineMarkdown(line)}</p>);
          return;
        }
        if (!speakers.includes(m[1])) speakers.push(m[1]);
        const right = speakers.indexOf(m[1]) % 2 === 1;
        bubbles.push(
          <div key={`${i}-${j}`} style={{ display: 'flex', justifyContent: right ? 'flex-end' : 'flex-start', margin: '0.6rem 0' }}>
            <div style={{ maxWidth: '82%', background: right ? '#ffffff' : '#ffedd5', border: `1.5px solid ${style.accent}`, borderRadius: right ? '16px 16px 4px 16px' : '16px 16px 16px 4px', padding: '0.5rem 0.9rem', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
              <div style={{ fontFamily: hand, fontWeight: 700, color: style.accent, fontSize: '1.05rem' }}>{m[1]}</div>
              <div>{processInlineMarkdown(m[2])}</div>
            </div>
          </div>
        );
      });
    });
    return wrap(index, nested, (
      <aside className="mbr-fonts-style display-7" style={{ border: `2px solid ${style.accent}`, borderRadius: '14px', background: style.background, padding: '1rem 1.25rem', margin: '1.5rem 0' }}>
        {title}
        {bubbles}
      </aside>
    ));
  }

  // A slightly tilted sticky note, lined paper, or a pinned card, depending on the callout type.
  const look: React.CSSProperties =
    section.calloutType === 'brain-power' || section.calloutType === 'watch-it'
      ? { transform: section.calloutType === 'brain-power' ? 'rotate(-0.6deg)' : 'rotate(0.5deg)', boxShadow: '3px 4px 0 rgba(0,0,0,0.08)', border: `2px solid ${style.accent}` }
      : section.calloutType === 'pencil'
        ? {
            backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0, transparent 31px, #d1fae5 31px, #d1fae5 32px)',
            borderLeft: '3px solid #f87171',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }
        : section.calloutType === 'bullet-points'
          ? { transform: 'rotate(0.3deg)', boxShadow: '2px 3px 0 rgba(0,0,0,0.07)', border: '1px solid #d1d5db' }
          : { borderLeft: `6px solid ${style.accent}`, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' };

  return wrap(index, nested, (
    <aside
      className="mbr-fonts-style display-7"
      style={{ borderRadius: '8px', background: style.background, padding: '1rem 1.5rem 0.25rem', margin: '1.5rem 0', ...look }}
    >
      {title}
      {body}
    </aside>
  ));
}

function renderSection(section: MobiriseParsedContent, index: number, nested = false): React.ReactNode {
  if (section.type === 'callout') {
    return renderCallout(section, index, nested);
  } else if (section.type === 'heading') {
    if (section.level === 1) {
      // Main title - already handled in page header
      return null;
    } else if (section.level === 2) {
      return wrap(index, nested, (
        <h4 id={slugify(section.content)} className="mbr-section-subtitle mbr-fonts-style mb-4 display-5" style={{ scrollMarginTop: '90px' }}>
          {processInlineMarkdown(section.content)}
        </h4>
      ));
    } else if (section.level === 3) {
      // Subheadings sit between the h2 size (32px) and body text (19.2px), with an accent bar so they read as headings.
      return wrap(index, nested, (
        <h5
          id={slugify(section.content)}
          className="mbr-section-subtitle mbr-fonts-style mb-3"
          style={{ scrollMarginTop: '90px', fontSize: '1.6rem', fontWeight: 600, lineHeight: 1.3, marginTop: '1.25rem', paddingLeft: '0.75rem', borderLeft: '4px solid #2563eb' }}
        >
          {processInlineMarkdown(section.content)}
        </h5>
      ));
    }
  } else if (section.type === 'text') {
    // Split the text into runs of plain lines and runs of list items ("- ", "* ", or "1. ").
    const runs: Array<{ kind: 'p' | 'ul' | 'ol'; lines: string[] }> = [];
    for (const line of section.content.split('\n')) {
      const kind = /^[-*]\s+/.test(line) ? 'ul' : /^\d+\.\s+/.test(line) ? 'ol' : 'p';
      const item = kind === 'p' ? line : line.replace(/^([-*]|\d+\.)\s+/, '');
      const last = runs[runs.length - 1];
      if (last && last.kind === kind) last.lines.push(item);
      else runs.push({ kind, lines: [item] });
    }
    return wrap(index, nested, (
      <>
        {runs.map((run, runIndex) => {
          const spacing = nested && runIndex === runs.length - 1 ? ' mb-0' : '';
          if (run.kind === 'p') {
            return (
              <p key={runIndex} className={`mbr-text mbr-fonts-style display-7${spacing}`}>
                {run.lines.map((line, lineIndex) => (
                  <span key={lineIndex}>
                    {processInlineMarkdown(line)}
                    {lineIndex < run.lines.length - 1 && <><br /><br /></>}
                  </span>
                ))}
              </p>
            );
          }
          const List = run.kind === 'ul' ? 'ul' : 'ol';
          return (
            <List key={runIndex} className={`mbr-text mbr-fonts-style display-7${spacing}`}>
              {run.lines.map((line, lineIndex) => (
                <li key={lineIndex} className="mb-2">{processInlineMarkdown(line)}</li>
              ))}
            </List>
          );
        })}
      </>
    ));
  } else if (section.type === 'hr') {
    return wrap(index, nested, <hr />);
  } else if (section.type === 'blockquote') {
    const paragraphs = section.content.split('\n').reduce<string[][]>((acc, line) => {
      if (line === '') {
        acc.push([]);
      } else {
        if (acc.length === 0) acc.push([]);
        acc[acc.length - 1].push(line);
      }
      return acc;
    }, []).filter(para => para.length > 0);

    return wrap(index, nested, (
      <blockquote
        className="mbr-fonts-style display-7"
        style={{
          borderLeft: '4px solid #ddd',
          margin: '1.5rem 0',
          padding: '0.5rem 1.5rem',
          fontStyle: 'italic',
          color: '#555'
        }}
      >
        {paragraphs.map((para, pIndex) => (
          <p key={pIndex} className={pIndex < paragraphs.length - 1 ? 'mb-3' : 'mb-0'}>
            {para.map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {processInlineMarkdown(line)}
                {lineIndex < para.length - 1 && ' '}
              </React.Fragment>
            ))}
          </p>
        ))}
      </blockquote>
    ));
  } else if (section.type === 'image') {
    const image = (
      <Image
        src={section.content}
        alt={(section.description || '').replace(/[`*]/g, '')}
        width={800}
        height={600}
        style={{ width: '100%', height: 'auto' }}
        className="img-fluid"
        onError={() => {
          console.error('Image failed to load:', section.content);
        }}
        unoptimized={true}
      />
    );
    // Every image opens full size when tapped. Diagrams are drawn as SVGs with small text,
    // so on a phone they also keep a readable width inside a sideways-scrolling box.
    const isDiagram = /\.svg(\?|$)/i.test(section.content);
    return wrap(index, nested, (
      <div className="image-wrapper">
        {isDiagram ? (
          <>
            <a href={section.content} target="_blank" rel="noopener noreferrer" className="svg-diagram" title="Open the full-size diagram">
              {image}
            </a>
            <span className="svg-diagram-hint">Scroll sideways, or tap the diagram to open it full size</span>
          </>
        ) : (
          <>
            <a href={section.content} target="_blank" rel="noopener noreferrer" className="image-link" title="Open the full-size image">
              {image}
            </a>
            <span className="svg-diagram-hint">Tap the image to open it full size</span>
          </>
        )}
        {section.description && (
          <p className="mbr-description mbr-fonts-style mt-2 align-center display-4">
            {processInlineMarkdown(section.description)}
          </p>
        )}
      </div>
    ), 'image3 cid-image3', 'col-12 col-lg-11');
  } else if (section.type === 'video') {
    return wrap(index, nested, (
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
            {processInlineMarkdown(section.description)}
          </p>
        )}
      </div>
    ), 'image3 cid-image3', 'col-12 col-lg-11');
  } else if (section.type === 'audio') {
    return wrap(index, nested, (
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
            {processInlineMarkdown(section.description)}
          </p>
        )}
      </div>
    ), 'content5 cid-content5', 'col-12 col-lg-11');
  } else if (section.type === 'table') {
    return wrap(index, nested, (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              {section.tableData?.headers.map((header, headerIndex) => (
                <th key={headerIndex} className="mbr-fonts-style display-7 fw-bold">
                  {processInlineMarkdown(header)}
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
    ));
  } else if (section.type === 'code' && section.language === 'mermaid') {
    return wrap(index, nested, <MermaidDiagram chart={section.content} />, 'content7 cid-content7', 'col-12 col-lg-11');
  } else if (section.type === 'code') {
    return wrap(index, nested, (
      <blockquote>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mbr-section-title mbr-fonts-style mb-0 display-7">
            <strong>{section.language ? section.language.toUpperCase() : 'CODE'}</strong>
          </h5>
          <CopyCodeButton code={section.content || ''} />
        </div>
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
          lineNumberStyle={{ userSelect: 'none' }}
        >
          {section.content}
        </SyntaxHighlighter>
      </blockquote>
    ), 'content7 cid-content7', 'col-12 col-md-11');
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
}

export default function MobiriseContentRenderer({ markdownContent }: MobiriseContentRendererProps) {
  const sections = parseMarkdownToMobirise(markdownContent);

  return <>{sections.map((section, index) => renderSection(section, index))}</>;
}
