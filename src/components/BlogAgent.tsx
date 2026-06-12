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

const MODEL_ID = 'Hermes-3-Llama-3.1-8B-q4f16_1-MLC';
const NAVY = '#1a2b4b';
const JINA_KEY = process.env.NEXT_PUBLIC_JINA_API_KEY ?? '';

// Only offer web_search when a Jina API key is configured — avoids the model
// wasting a round on a tool call it can't fulfil.
const ACTIVE_TOOLS = JINA_KEY
  ? TOOL_DEFINITIONS
  : TOOL_DEFINITIONS.filter(t => t.function.name !== 'web_search');

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
        { context_window_size: 8192 },
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
          ? JSON.stringify(results.map(p => ({ slug: p.slug, url: `/posts/${p.slug}/`, title: p.title, description: p.description, categories: p.categories })))
          : 'No matching posts found.';
      }
      case 'get_posts_by_category': {
        const results = getPostsByCategory(args.category ?? '', posts);
        return results.length
          ? JSON.stringify(results.map(p => ({ slug: p.slug, url: `/posts/${p.slug}/`, title: p.title, description: p.description })))
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

      // Hermes function-calling models forbid ANY system message when tools are present,
      // including on non-tool rounds (the message array is shared). To be safe we never
      // use a system message at all — all context rides in the user message instead.
      const contextHint = `[You are the AI assistant for Neil Haddley's developer blog. Neil specialises in Azure, Business Central, Power Platform, AI, and web development. Current page: ${pageContext}. CRITICAL RULES: (1) NEVER name, list, or link to any post without first calling search_posts or get_posts_by_category — you have no built-in knowledge of which posts exist. If no results were found, say so honestly. (2) When listing posts or categories from results, format every item as a Markdown link — [Name](url) — using the url value exactly as given; do NOT prepend any domain. Example: [My Post](/posts/my-post/). (3) When on a post page, the slug is given in "Current page" above — pass it directly to get_post_content without searching first. Be concise.]`;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const apiMsgs: any[] = [
        ...apiHistoryRef.current,
        { role: 'user', content: `${contextHint}\n\n${userText}` },
      ];

      // History stores the clean user message (no context hint) so hints don't
      // accumulate in previous turns on subsequent requests.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const turnMsgs: any[] = [userMsg];

      // Two-phase agent design:
      // Phase 1 — tool gathering: run up to MAX_TOOL_ROUNDS with tools enabled.
      //   Hermes only supports tool_choice:'auto', so we can't force a text response
      //   while tools are present. Collect all results; if the model gives text
      //   directly (no tool calls needed) we use it and skip phase 2.
      // Phase 2 — text generation: one clean call with NO tools and NO role:'tool'
      //   messages. Tool results are embedded as text in the user message. This
      //   keeps the model out of function-calling mode so content is never null.
      const MAX_TOOL_ROUNDS = 3;
      const toolResults: string[] = [];
      let finalContent = '';

      console.group(`[BlogAgent] turn — "${userText}"`);
      console.log('history depth:', apiHistoryRef.current.length, '| page:', pageContext);

      // ── Phase 1: tool gathering ──
      for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
        if (abortRef.current) { console.log('aborted before round', round); break; }

        console.log(`round ${round} — sending ${apiMsgs.length} msgs`);
        let resp;
        try {
          resp = await engine.chat.completions.create({
            // Fresh copy: WebLLM mutates the array (.unshift its system prompt).
            messages: apiMsgs.map(m =>
              m.role === 'assistant' && typeof m.content !== 'string'
                ? { ...m, content: '' }
                : m
            ),
            tools: ACTIVE_TOOLS,
            tool_choice: 'auto',
          });
        } catch (err: unknown) {
          if (err instanceof Error && (err.name === 'AbortError' || err.message.toLowerCase().includes('interrupt'))) {
            console.log('interrupted at round', round);
            break;
          }
          throw err;
        }

        const choice = resp.choices[0];
        console.log(`round ${round} — finish_reason: ${choice.finish_reason}`, choice.message);

        if (choice.finish_reason === 'stop' && choice.message.content?.trim()) {
          // Model answered directly without calling tools — use immediately, skip phase 2
          finalContent = choice.message.content.trim();
          console.log('direct text response (no tools):', finalContent);
          break;
        }

        if (choice.finish_reason === 'tool_calls' && !choice.message.tool_calls?.length) {
          // Model signalled tool_calls but emitted none — inject a nudge and retry
          console.log('empty tool_calls — injecting nudge');
          apiMsgs.push({ role: 'user', content: 'Please call the appropriate tool (e.g. search_posts or get_posts_by_category) to find the information before answering.' });
          continue;
        }

        if (choice.finish_reason === 'tool_calls' && choice.message.tool_calls?.length) {
          const names = choice.message.tool_calls.map(tc =>
            tc.function.name === 'web_search' ? '🌐 web search' : `🔍 ${tc.function.name.replace(/_/g, ' ')}`
          ).join(', ');
          setToolStatus(`${names}…`);

          apiMsgs.push(choice.message);
          turnMsgs.push(choice.message);

          for (const tc of choice.message.tool_calls) {
            if (abortRef.current) break;
            let args: Record<string, string> = {};
            try { args = JSON.parse(tc.function.arguments); } catch { /* empty args */ }
            console.log(`  tool: ${tc.function.name}`, args);
            gaEvent('agent_tool_called', { tool: tc.function.name, page: pathname });
            const result = await executeTool(tc.function.name, args);
            console.log(`  result (${result.length} chars):`, result.slice(0, 300));
            toolResults.push(result);
            const toolMsg = { role: 'tool', tool_call_id: tc.id, content: result };
            apiMsgs.push(toolMsg);
            turnMsgs.push(toolMsg);
          }
        } else {
          break; // unexpected finish_reason — stop tool loop
        }
      }

      // ── Phase 2: clean text generation ──
      // Only needed if phase 1 didn't produce a direct text answer.
      if (!finalContent && !abortRef.current) {
        setToolStatus('');
        const resultsBlock = toolResults.length > 0
          ? `\n\nSearch results:\n${toolResults.join('\n\n')}`
          : '';

        // Build a clean history: prior committed turns (user+assistant text only —
        // no role:'tool' or tool_call assistant messages) plus this turn's user query.
        const cleanHistory = apiHistoryRef.current.filter(m =>
          m.role === 'user' ||
          (m.role === 'assistant' && typeof m.content === 'string' && m.content)
        );
        const cleanMessages = [
          ...cleanHistory,
          { role: 'user', content: `${contextHint}\n\n${userText}${resultsBlock}` },
        ];

        console.log(`phase 2 — clean text call, ${cleanMessages.length} msgs, ${toolResults.length} results embedded`);
        try {
          const finalResp = await engine.chat.completions.create({ messages: cleanMessages });
          const raw = finalResp.choices[0].message.content?.trim() ?? '';
          // Strip any hallucinated domain from internal paths the model invents
          finalContent = raw.replace(/https?:\/\/[^\s/)]+(\/(posts|categories)[^\s)]*)/g, '$1');
          if (finalContent !== raw) console.log('stripped hallucinated domains from response');
          console.log('phase 2 response:', finalContent || '(empty)');
        } catch (err: unknown) {
          if (!(err instanceof Error && (err.name === 'AbortError' || err.message.toLowerCase().includes('interrupt')))) throw err;
          console.log('phase 2 interrupted');
        }
      }

      console.groupEnd();

      if (finalContent) {
        const assistantMsg: Message = { role: 'assistant', content: finalContent };
        setMessages(prev => [...prev, assistantMsg]);
        turnMsgs.push(assistantMsg);
      }

      // Commit the full turn (user + tool chain + assistant) to the ref
      // so the next turn has complete context.
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
                {loadState.status === 'ready' ? 'Hermes-3 · Llama 3.1 8B · local WebGPU' : 'Powered by WebLLM'}
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
