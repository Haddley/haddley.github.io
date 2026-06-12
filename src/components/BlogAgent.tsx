'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    // Test hook: inject a mock engine to skip real model loading in e2e tests
    __mlcEngineOverride?: unknown;
  }
}
const gaEvent = (name: string, params?: Record<string, unknown>) => window.gtag?.('event', name, params);
import type { MLCEngine } from '@mlc-ai/web-llm';
import {
  TOOL_DEFINITIONS, CATEGORIES,
  searchPosts, getPostsByCategory, getCategoryUrl,
  type AgentData,
} from '@/lib/agent-tools';

const MODELS = [
  { id: 'Qwen2.5-7B-Instruct-q4f16_1-MLC',   label: 'Qwen2.5 7B',   size: '~4 GB',   note: 'Best quality' },
  { id: 'Qwen2.5-3B-Instruct-q4f16_1-MLC',   label: 'Qwen2.5 3B',   size: '~2 GB',   note: 'Balanced' },
  { id: 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC', label: 'Qwen2.5 1.5B', size: '~1 GB',   note: 'Fast' },
  { id: 'Qwen2.5-0.5B-Instruct-q4f16_1-MLC', label: 'Qwen2.5 0.5B', size: '~500 MB', note: 'Tiny' },
] as const;
type ModelId = typeof MODELS[number]['id'];
const NAVY = '#1a2b4b';
const JINA_KEY = process.env.NEXT_PUBLIC_JINA_API_KEY ?? '';

// Only offer web_search when a Jina API key is configured — avoids the model
// wasting a round on a tool call it can't fulfil.
const ACTIVE_TOOLS = JINA_KEY
  ? TOOL_DEFINITIONS
  : TOOL_DEFINITIONS.filter(t => t.function.name !== 'web_search');

type ToolDef = typeof ACTIVE_TOOLS[number];

function buildToolSystemPrompt(tools: ToolDef[], postCount: number): string {
  const defs = tools
    .map(t => JSON.stringify({ name: t.function.name, description: t.function.description, parameters: t.function.parameters }))
    .join('\n');
  return `You are the AI assistant for Neil Haddley's developer blog (${postCount} posts, 24 categories). Neil specialises in Azure, Business Central, Power Platform, AI, and web development.

You have access to these tools:
<tools>
${defs}
</tools>

STRICT OUTPUT RULES:
1. When you need to call a tool, output ONLY a JSON code block — no text before or after it:
\`\`\`json
{"name": "tool_name", "arguments": {"arg": "value"}}
\`\`\`
2. Call ONE tool per response. Never output two code blocks.
3. After receiving <tool_response> results, answer in plain text only — no code blocks.
4. Format every post link as [Title](url) — Description.

Example — user asks "Any Python posts?":
\`\`\`json
{"name": "get_posts_by_category", "arguments": {"category": "Python"}}
\`\`\``;
}

function parseToolCalls(text: string): Array<{ name: string; arguments: Record<string, string> }> {
  const out: Array<{ name: string; arguments: Record<string, string> }> = [];

  // Primary: ```json ... ``` code blocks
  const jsonBlock = /```(?:json)?\s*([\s\S]*?)\s*```/g;
  let m: RegExpExecArray | null;
  while ((m = jsonBlock.exec(text)) !== null) {
    try {
      const parsed = JSON.parse(m[1].trim());
      if (typeof parsed.name === 'string') out.push({ name: parsed.name, arguments: parsed.arguments ?? {} });
    } catch { /* skip */ }
  }
  if (out.length) return out;

  // Fallback: <tool_call> blocks (with or without closing tag)
  const tagBlock = /<tool_call>\s*([\s\S]*?)\s*(?:<\/tool_call>|(?=<tool_call>)|$)/g;
  while ((m = tagBlock.exec(text)) !== null) {
    const jsonStr = m[1].trim();
    if (!jsonStr) continue;
    try {
      const parsed = JSON.parse(jsonStr);
      if (typeof parsed.name === 'string') out.push({ name: parsed.name, arguments: parsed.arguments ?? {} });
    } catch { /* skip */ }
  }
  return out;
}

type LoadStatus = 'idle' | 'loading' | 'ready' | 'unsupported' | 'error';

interface LoadState { status: LoadStatus; progress: number; text: string }
interface Message { role: 'user' | 'assistant'; content: string }

function MessageContent({ text, onNavigate }: { text: string; onNavigate: (href: string) => void }) {
  const [html, setHtml] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { remark } = await import('remark');
      const { default: remarkHtml } = await import('remark-html');
      const result = await remark().use(remarkHtml, { sanitize: false }).process(text);
      if (!cancelled) setHtml(result.toString());
    })();
    return () => { cancelled = true; };
  }, [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a');
      if (a) {
        const href = a.getAttribute('href') ?? '';
        if (href.startsWith('/')) { e.preventDefault(); onNavigate(href); }
      }
    };
    el.addEventListener('click', handler);
    return () => el.removeEventListener('click', handler);
  }, [html, onNavigate]);

  return (
    <div
      ref={ref}
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ lineHeight: 1.5 }}
    />
  );
}

export default function BlogAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [toolStatus, setToolStatus] = useState('');
  const [loadState, setLoadState] = useState<LoadState>({ status: 'idle', progress: 0, text: '' });
  const [agentData, setAgentData] = useState<AgentData | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('agent-model');
      if (MODELS.some(m => m.id === saved)) return saved as ModelId;
    }
    return 'Qwen2.5-3B-Instruct-q4f16_1-MLC';
  });

  const engineRef = useRef<MLCEngine | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  // Full API message history including tool calls/results — not in state to avoid
  // stale-closure issues inside the async agent loop. Drives model context.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiHistoryRef = useRef<any[]>([]);
  const abortRef = useRef(false);
  const isThinkingRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Keep isThinkingRef in sync so the ESC handler always sees current state
  useEffect(() => { isThinkingRef.current = isThinking; }, [isThinking]);

  // ESC key — interrupt the running generation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isThinkingRef.current && engineRef.current) {
        abortRef.current = true;
        engineRef.current.interruptGenerate();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Fetch post metadata once the panel opens
  useEffect(() => {
    if (!isOpen || agentData) return;
    fetch('/agent-data.json')
      .then(r => r.json())
      .then(setAgentData)
      .catch(() => {});
  }, [isOpen, agentData]);

  const loadModel = async () => {
    if (window.__mlcEngineOverride) {
      engineRef.current = window.__mlcEngineOverride as MLCEngine;
      setLoadState({ status: 'ready', progress: 100, text: '' });
      return;
    }
    if (!('gpu' in navigator && navigator.gpu)) {
      setLoadState({ status: 'unsupported', progress: 0, text: 'WebGPU is required. Try Chrome or Edge on a GPU-enabled device.' });
      return;
    }
    localStorage.setItem('agent-model', selectedModel);
    setLoadState({ status: 'loading', progress: 0, text: 'Initialising…' });
    try {
      const { CreateMLCEngine } = await import('@mlc-ai/web-llm');
      const engine = await CreateMLCEngine(
        selectedModel,
        {
          initProgressCallback: ({ progress, text }) =>
            setLoadState({ status: 'loading', progress: Math.round(progress * 100), text }),
        },
        {},
      );
      engineRef.current = engine;
      setLoadState({ status: 'ready', progress: 100, text: '' });
    } catch (err) {
      setLoadState({ status: 'error', progress: 0, text: err instanceof Error ? err.message : 'Failed to load model.' });
    }
  };

  const executeTool = useCallback(async (name: string, args: Record<string, string>): Promise<string> => {
    const posts = agentData?.posts ?? [];
    switch (name) {
      case 'search_posts': {
        const results = searchPosts(args.query ?? '', posts);
        return results.length
          ? JSON.stringify(results.map(p => ({ url: `/posts/${p.slug}/`, title: p.title, description: p.description })))
          : 'No matching posts found.';
      }
      case 'get_posts_by_category': {
        const results = getPostsByCategory(args.category ?? '', posts);
        return results.length
          ? JSON.stringify(results.map(p => ({ url: `/posts/${p.slug}/`, title: p.title, description: p.description })))
          : `No posts in category "${args.category}".`;
      }
      case 'list_categories': {
        const counts = CATEGORIES
          .map(cat => ({ category: cat, url: getCategoryUrl(cat), count: posts.filter(p => p.categories.includes(cat)).length }))
          .filter(c => c.count > 0)
          .sort((a, b) => b.count - a.count);
        return JSON.stringify(counts);
      }
      case 'get_post_content': {
        const slug = args.slug ?? args.query ?? '';
        if (!slug) return 'No slug provided.';
        try {
          const res = await fetch(`/agent-posts/${encodeURIComponent(slug)}.json`);
          if (!res.ok) return `Post "${slug}" not found (${res.status}).`;
          const data = await res.json();
          return JSON.stringify(data);
        } catch {
          return `Failed to load post "${slug}".`;
        }
      }
      case 'navigate_to_post':
        router.push(`/posts/${args.slug}/`);
        return `Navigating to "${args.slug}".`;
      case 'web_search': {
        if (!JINA_KEY) return 'Web search is not configured (NEXT_PUBLIC_JINA_API_KEY not set).';
        try {
          const url = `https://s.jina.ai/${encodeURIComponent(args.query ?? '')}`;
          const res = await fetch(url, {
            headers: {
              'Accept': 'text/plain',
              'Authorization': `Bearer ${JINA_KEY}`,
              'X-Respond-With': 'no-references',  // omit citation list to save context
            },
          });
          if (!res.ok) return `Web search failed (${res.status}).`;
          const text = await res.text();
          // Cap at ~3000 chars to keep context reasonable
          return text.length > 3000 ? text.slice(0, 3000) + '\n…(truncated)' : text;
        } catch {
          return 'Web search unavailable.';
        }
      }
      default:
        return 'Unknown tool.';
    }
  }, [agentData, router]);

  const sendMessage = async () => {
    if (!input.trim() || !engineRef.current || isThinking) return;

    const userText = input.trim();
    setInput('');
    setIsThinking(true);
    setToolStatus('');
    abortRef.current = false;
    gaEvent('agent_message_sent', { page: pathname });

    // Show user message immediately in the UI
    const userMsg = { role: 'user', content: userText };
    setMessages(prev => [...prev, { role: 'user', content: userText }]);

    try {
      const engine = engineRef.current;
      const posts = agentData?.posts ?? [];
      // Describe the page the user is currently on
      let pageContext = 'home page';
      const postMatch = pathname.match(/^\/posts\/([^/]+)\/?$/);
      const categoryMatch = pathname.match(/^\/posts\/category\/([^/]+)\/?$/);
      if (postMatch) {
        const slug = postMatch[1];
        const post = posts.find(p => p.slug === slug);
        pageContext = post
          ? `post url: "/posts/${slug}/", slug: "${slug}", title: "${post.title}" (categories: ${post.categories.join(', ')}; tags: ${post.tags})`
          : `post at /posts/${slug}/`;
      } else if (categoryMatch) {
        const catSlug = categoryMatch[1];
        const catName = CATEGORIES.find(c => c.toLowerCase().replace(/[^a-z0-9]+/g, '-') === catSlug) ?? catSlug;
        pageContext = `"${catName}" category page`;
      } else if (pathname.startsWith('/posts')) {
        pageContext = 'blog post listing';
      } else if (pathname.startsWith('/categories')) {
        pageContext = 'categories overview';
      }

      const currentSlug = postMatch?.[1] ?? '';
      const contextHint = `[Current page: ${pageContext}. RULES (priority order): (1) On a post page: if the user asks to summarise, explain, or asks about this post — call get_post_content with slug "${currentSlug}" immediately. Do not search. (2) For category questions use get_posts_by_category; for keyword queries use search_posts. Never name or link a post without calling a tool first. (3) Never call get_post_content to browse or list — only when reading a specific post. (4) Never repeat the same tool call in one turn. Be concise.]`;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const apiMsgs: any[] = [
        { role: 'system', content: buildToolSystemPrompt(ACTIVE_TOOLS, posts.length) },
        ...apiHistoryRef.current,
        { role: 'user', content: `${contextHint}\n\n${userText}` },
      ];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const turnMsgs: any[] = [userMsg];

      const MAX_TOOL_ROUNDS = 4;
      let finalContent = '';
      const calledThisTurn = new Set<string>();
      let contentFetchCount = 0;

      console.group(`[BlogAgent] turn — "${userText}"`);
      console.log('model:', selectedModel, '| history depth:', apiHistoryRef.current.length, '| page:', pageContext);

      // Prompt-based tool loop: parse <tool_call> blocks from plain text output.
      // No WebLLM tools API needed — works with any instruction-tuned model.
      for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
        if (abortRef.current) { console.log('aborted before round', round); break; }

        console.log(`round ${round} — sending ${apiMsgs.length} msgs`);
        let resp;
        try {
          resp = await engine.chat.completions.create({ messages: [...apiMsgs] });
        } catch (err: unknown) {
          if (err instanceof Error && (err.name === 'AbortError' || err.message.toLowerCase().includes('interrupt'))) {
            console.log('interrupted at round', round);
            break;
          }
          throw err;
        }

        const rawContent = resp.choices[0].message.content ?? '';
        console.log(`round ${round} — raw:`, rawContent.slice(0, 300));

        // Strip preamble text before the first tool call marker — model sometimes narrates first
        const jsonBlockStart = rawContent.indexOf('```');
        const tagBlockStart = rawContent.indexOf('<tool_call>');
        const firstMarker = [jsonBlockStart, tagBlockStart].filter(i => i >= 0).reduce((a, b) => Math.min(a, b), Infinity);
        const contentForParsing = firstMarker > 0 ? rawContent.slice(firstMarker) : rawContent;
        const toolCalls = parseToolCalls(contentForParsing);
        if (!toolCalls.length) {
          // No tool calls — strip any stray markers and use as the final answer
          finalContent = rawContent
            .replace(/```(?:json)?\s*[\s\S]*?```/g, '')
            .replace(/<tool_call>[\s\S]*?<\/tool_call>/g, '')
            .replace(/https?:\/\/[^\s/)]+(\/(posts|categories)[^\s)]*)/g, '$1')
            .trim();
          console.log('text response:', finalContent.slice(0, 200));
          break;
        }

        const names = toolCalls.map(tc =>
          tc.name === 'web_search' ? '🌐 web search' : `🔍 ${tc.name.replace(/_/g, ' ')}`
        ).join(', ');
        setToolStatus(`${names}…`);
        apiMsgs.push({ role: 'assistant', content: rawContent });

        const resultParts: string[] = [];
        for (const tc of toolCalls) {
          if (abortRef.current) break;

          const callKey = `${tc.name}:${JSON.stringify(tc.arguments)}`;
          if (calledThisTurn.has(callKey)) {
            console.log(`  skipping duplicate: ${tc.name}`);
            resultParts.push(`You already called ${tc.name} with these arguments. Stop calling tools and answer the user now.`);
            continue;
          }
          if (tc.name === 'get_post_content') {
            if (contentFetchCount >= 2) {
              resultParts.push('(content fetch limit reached — summarise from results already available)');
              continue;
            }
            contentFetchCount++;
          }
          calledThisTurn.add(callKey);

          console.log(`  tool: ${tc.name}`, tc.arguments);
          gaEvent('agent_tool_called', { tool: tc.name, page: pathname });
          const result = await executeTool(tc.name, tc.arguments);
          console.log(`  result (${result.length} chars):`, result.slice(0, 300));
          resultParts.push(result);
        }

        const allDuplicates = resultParts.every(r => r.startsWith('You already called'));
        apiMsgs.push({
          role: 'user',
          content: allDuplicates
            ? `You have already retrieved the information needed. Answer the user's question in plain text now — do not call any more tools.`
            : `<tool_response>\n${resultParts.join('\n\n')}\n</tool_response>\nNow answer the user's question in plain text using these results. Do not call any more tools.`,
        });
      }

      // If the loop exhausted without producing a text answer, do one final call
      if (!finalContent && !abortRef.current) {
        setToolStatus('');
        console.log('loop exhausted — final nudge');
        try {
          const finalResp = await engine.chat.completions.create({ messages: [...apiMsgs] });
          const raw = finalResp.choices[0].message.content?.trim() ?? '';
          finalContent = raw
            .replace(/```(?:json)?\s*[\s\S]*?```/g, '')
            .replace(/<tool_call>[\s\S]*?<\/tool_call>/g, '')
            .replace(/https?:\/\/[^\s/)]+(\/(posts|categories)[^\s)]*)/g, '$1')
            .trim();
          console.log('nudge response:', finalContent.slice(0, 200));
        } catch (err: unknown) {
          if (!(err instanceof Error && (err.name === 'AbortError' || err.message.toLowerCase().includes('interrupt')))) throw err;
          console.log('nudge interrupted');
        }
      }

      console.groupEnd();

      if (finalContent) {
        const assistantMsg: Message = { role: 'assistant', content: finalContent };
        setMessages(prev => [...prev, assistantMsg]);
        turnMsgs.push(assistantMsg);
      }

      // Commit user + final assistant text only — no tool call/response messages
      apiHistoryRef.current = [...apiHistoryRef.current, ...turnMsgs];
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Error: ${err instanceof Error ? err.message : 'Something went wrong.'}`,
      }]);
    } finally {
      setIsThinking(false);
      setToolStatus('');
      abortRef.current = false;
    }
  };

  const startNewChat = () => {
    if (engineRef.current && isThinkingRef.current) {
      abortRef.current = true;
      engineRef.current.interruptGenerate();
    }
    setMessages([]);
    setInput('');
    apiHistoryRef.current = [];
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(v => { if (!v) gaEvent('agent_opened', { page: pathname }); return !v; })}
        aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          width: 56, height: 56, borderRadius: '50%',
          background: NAVY, color: '#fff', border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform .15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: 92, right: 24, zIndex: 9998,
          width: 'min(360px, calc(100vw - 32px))',
          maxHeight: 'min(520px, calc(100vh - 120px))',
          background: '#fff', borderRadius: 14,
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.07)',
        }}>
          {/* Header */}
          <div style={{ background: NAVY, color: '#fff', padding: '13px 16px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Blog AI Assistant</div>
              <div style={{ fontSize: 11, opacity: 0.6, marginTop: 2 }}>
                {loadState.status === 'ready'
                  ? `${MODELS.find(m => m.id === selectedModel)?.label ?? 'Qwen2.5'} · local WebGPU`
                  : 'Powered by WebLLM'}
              </div>
            </div>
            <button
              onClick={startNewChat}
              title="New chat"
              aria-label="Start new chat"
              style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff', borderRadius: 8, padding: '5px 9px',
                cursor: 'pointer', fontSize: 13, lineHeight: 1,
                display: 'flex', alignItems: 'center', gap: 5,
                opacity: messages.length === 0 ? 0.35 : 1,
                transition: 'opacity .15s, background .15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              💬 <span style={{ fontSize: 11 }}>New chat</span>
            </button>
          </div>

          {/* Idle: model selector */}
          {loadState.status === 'idle' && (
            <div style={{ padding: 20, fontSize: 13, flexShrink: 0 }}>
              <div style={{ marginBottom: 10, color: '#555', fontSize: 12 }}>Choose a model (downloaded once, cached in browser):</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                {MODELS.map(m => (
                  <label key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13 }}>
                    <input
                      type="radio"
                      name="model"
                      value={m.id}
                      checked={selectedModel === m.id}
                      onChange={() => setSelectedModel(m.id)}
                    />
                    <span style={{ fontWeight: 500 }}>{m.label}</span>
                    <span style={{ color: '#999', fontSize: 11 }}>{m.size} · {m.note}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={loadModel}
                style={{ fontSize: 13, padding: '7px 18px', background: NAVY, color: '#fff', border: 'none', borderRadius: 20, cursor: 'pointer' }}
              >
                Load model
              </button>
            </div>
          )}

          {/* Loading / error */}
          {(loadState.status === 'loading' || loadState.status === 'unsupported' || loadState.status === 'error') && (
            <div style={{ padding: 20, fontSize: 13, flexShrink: 0 }}>
              {loadState.status === 'unsupported' || loadState.status === 'error' ? (
                <div>
                  <div style={{ color: '#c0392b', marginBottom: 10 }}>⚠ {loadState.text}</div>
                  {loadState.status === 'error' && (
                    <button onClick={loadModel} style={{ fontSize: 12, padding: '6px 14px', background: NAVY, color: '#fff', border: 'none', borderRadius: 20, cursor: 'pointer' }}>
                      Retry
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <div style={{ color: '#555', fontSize: 12, marginBottom: 10 }}>
                    {loadState.progress === 0
                      ? `Loading ${MODELS.find(m => m.id === selectedModel)?.label ?? 'model'}… (first run ${MODELS.find(m => m.id === selectedModel)?.size ?? ''} download, cached afterwards)`
                      : loadState.text}
                  </div>
                  <div style={{ background: '#e9ecef', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                    <div style={{ background: NAVY, height: '100%', width: `${loadState.progress}%`, transition: 'width .3s ease' }} />
                  </div>
                  <div style={{ fontSize: 11, color: '#aaa', marginTop: 5 }}>{loadState.progress}%</div>
                </div>
              )}
            </div>
          )}

          {/* Messages */}
          {loadState.status === 'ready' && (
            <>
              <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {messages.length === 0 && (
                  <div style={{ color: '#bbb', fontSize: 13, textAlign: 'center', marginTop: 40, lineHeight: 1.7 }}>
                    Ask me about posts, topics,<br />or categories on the blog.
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div key={i} style={{
                    maxWidth: '88%', padding: '9px 13px', borderRadius: 10,
                    fontSize: 13, lineHeight: 1.55, wordBreak: 'break-word',
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    background: msg.role === 'user' ? NAVY : '#f1f3f5',
                    color: msg.role === 'user' ? '#fff' : '#222',
                  }}>
                    {msg.role === 'assistant'
                      ? <MessageContent text={msg.content} onNavigate={url => { router.push(url); setIsOpen(false); }} />
                      : msg.content
                    }
                  </div>
                ))}
                {(isThinking || toolStatus) && (
                  <div style={{ alignSelf: 'flex-start', padding: '9px 13px', borderRadius: 10, background: '#f1f3f5', fontSize: 12, color: '#888' }}>
                    {toolStatus || '…'}
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input row */}
              <div style={{ padding: '10px 12px', borderTop: '1px solid #eee', display: 'flex', gap: 8, flexShrink: 0 }}>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Ask about the blog…"
                  disabled={isThinking}
                  style={{
                    flex: 1, padding: '8px 12px',
                    border: '1px solid #ddd', borderRadius: 20,
                    fontSize: 13, outline: 'none',
                    background: isThinking ? '#f9f9f9' : '#fff',
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={isThinking || !input.trim()}
                  style={{
                    padding: '8px 16px', background: NAVY, color: '#fff',
                    border: 'none', borderRadius: 20, cursor: 'pointer', fontSize: 13,
                    opacity: isThinking || !input.trim() ? 0.4 : 1,
                    transition: 'opacity .15s',
                  }}
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
