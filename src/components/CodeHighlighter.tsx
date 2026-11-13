'use client';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp';
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import visualBasic from 'react-syntax-highlighter/dist/esm/languages/prism/visual-basic';
import docker from 'react-syntax-highlighter/dist/esm/languages/prism/docker';
import powershell from 'react-syntax-highlighter/dist/esm/languages/prism/powershell';
import toml from 'react-syntax-highlighter/dist/esm/languages/prism/toml';
import diff from 'react-syntax-highlighter/dist/esm/languages/prism/diff';
import nginx from 'react-syntax-highlighter/dist/esm/languages/prism/nginx';
import al from 'react-syntax-highlighter/dist/esm/languages/prism/al';

/**
 * The full Prism build holds about 300 languages in one 600 KB script, and every page that shows a post downloaded it.
 * Only the languages the posts use are registered here (the names after ``` in content/*.md), plus the spellings the posts use
 * for them (a language's own aliases, such as vb for visual-basic or py for python, come with it). A language that is not listed is
 * shown as plain text. To add one, import it above and register it below.
 */
const languages: Record<string, unknown> = {
  bash, shell: bash, sh: bash,
  python, py: python,
  javascript, js: javascript, typescript, ts: typescript, jsx,
  json, yaml, yml: yaml, toml,
  markup, html: markup, xml: markup, markdown, md: markdown,
  css, sql,
  java, csharp, cs: csharp, 'visual-basic': visualBasic, c, cpp, 'c++': cpp, al,
  docker, dockerfile: docker, powershell, nginx, diff,
};
for (const [name, grammar] of Object.entries(languages)) {
  SyntaxHighlighter.registerLanguage(name, grammar as never);
}

interface CodeHighlighterProps {
  code: string;
  language?: string;
}

export default function CodeHighlighter({ code, language }: CodeHighlighterProps) {
  return (
    <SyntaxHighlighter
      language={language || 'text'}
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
      {code}
    </SyntaxHighlighter>
  );
}
