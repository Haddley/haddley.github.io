'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

declare global { interface Window { gtag?: (...args: unknown[]) => void } }
const gaEvent = (name: string, params?: Record<string, unknown>) => window.gtag?.('event', name, params);
import type { MLCEngine } from '@mlc-ai/web-llm';
import {
  TOOL_DEFINITIONS, CATEGORIES,
  searchPosts, getPostsByCategory, getCategoryUrl,
  type AgentData,
} from '@/lib/agent-tools';

const MODEL_ID = 'Qwen2.5-7B-Instruct-q4f16_1-MLC';
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
1. When you need to call a tool, output EXACTLY this format — the opening tag, one line of JSON, the closing tag, and NOTHING else before or after:
<tool_call>
{"name": "tool_name", "arguments": {"arg": "value"}}
</tool_call>
2. Call ONE tool per response. Never output two <tool_call> blocks.
3. Never add any text, explanation, or preamble before a <tool_call> block.
4. After receiving <tool_response> results, answer in plain text only — no <tool_call> tags.
5. Format every post link as [Title](url).

Example — user asks "Any Python posts?":
<tool_call>
{"name": "get_posts_by_category", "arguments": {"category": "Python"}}
</tool_call>`;
}

function parseToolCalls(text: string): Array<{ name: string; arguments: Record<string, string> }> {
  // Match both properly closed blocks and unclosed blocks (model sometimes omits </tool_call>)
  const re = /<tool_call>\s*([\s\S]*?)\s*(?:<\/tool_call>|$)/g;
  const out: Array<{ name: string; arguments: Record<string, string> }> = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const candidate = m[1].trim();
    if (!candidate) continue;
    // Only take the first JSON object (stops at the second <tool_call> if present)
    const jsonEnd = candidate.indexOf('\n<tool_call>');
    const jsonStr = jsonEnd !== -1 ? candidate.slice(0, jsonEnd) : candidate;
    try {
      const parsed = JSON.parse(jsonStr);
      if (typeof parsed.name === 'string') out.push({ name: parsed.name, arguments: parsed.arguments ?? {} });
    } catch { /* skip malformed blocks */ }
  }
  return out;
}

type LoadStatus = 'idle' | 'loading' | 'ready' | 'unsupported' | 'error';

interface LoadState { status: LoadStatus; progress: number; text: string }
interface Message { role: 'user' | 'assistant'; content: string }

// Renders assistant markdown safely — converts [text](url) links to React elements
// and preserves line breaks. No dangerouslySetInnerHTML needed.
function MessageContent({ text, onNavigate }: { text: string; onNavigate: (href: string) => void }) {
  const linkRe = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;

  const addText = (chunk: string) => {
    chunk.split('\n').forEach((line, i) => {
      if (i > 0) nodes.push(<br key={`br-${key++}`} />);
      if (line) nodes.push(line);
    });
  };

  while ((m = linkRe.exec(text)) !== null) {
    if (m.index > last) addText(text.slice(last, m.index));
    const href = m[2];
    nodes.push(
      <a
        key={key++}
        href={href}
        onClick={e => { if (href.startsWith('/')) { e.preventDefault(); onNavigate(href); } }}
        style={{ color: '#1a5276', textDecoration: 'underline', cursor: 'pointer' }}
      >
        {m[1]}
      </a>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) addText(text.slice(last));
  return <>{nodes}</>;
}

export default function BlogAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [toolStatus, setToolStatus] = useState('');
  const [loadState, setLoadState] = useState<LoadState>({ status: 'idle', progress: 0, text: '' });
  const [agentData, setAgentData] = useState<AgentData | null>(null);

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

  // Start loading the model the first time the panel opens
  useEffect(() => {
    if (!isOpen || loadState.status !== 'idle') return;
    loadModel();
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadModel = async () => {
    if (!('gpu' in navigator && navigator.gpu)) {
      setLoadState({ status: 'unsupported', progress: 0, text: 'WebGPU is required. Try Chrome or Edge on a GPU-enabled device.' });
      return;
    }
    setLoadState({ status: 'loading', progress: 0, text: 'Initialising…' });
    try {
      const { CreateMLCEngine } = await import('@mlc-ai/web-llm');
      const engine = await CreateMLCEngine(
        MODEL_ID,
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

      const isOnPostPage = !!postMatch;
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
      console.log('history depth:', apiHistoryRef.current.length, '| page:', pageContext);

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

        // Strip preamble text before the first <tool_call> — model sometimes narrates first
        const toolCallStart = rawContent.indexOf('<tool_call>');
        const contentForParsing = toolCallStart > 0 ? rawContent.slice(toolCallStart) : rawContent;
        const toolCalls = parseToolCalls(contentForParsing);
        if (!toolCalls.length) {
          // No tool calls — clean up any stray tags and use as the final answer
          finalContent = rawContent
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
            resultParts.push(`(duplicate ${tc.name} skipped)`);
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

        apiMsgs.push({
          role: 'user',
          content: `<tool_response>\n${resultParts.join('\n\n')}\n</tool_response>\nNow answer the user's question in plain text using these results.`,
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
                {loadState.status === 'ready' ? 'Qwen2.5 · 7B Instruct · local WebGPU' : 'Powered by WebLLM'}
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

          {/* Loading / error */}
          {loadState.status !== 'ready' && (
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
                      ? 'Loading model… (first run ~2 GB download, cached afterwards)'
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
