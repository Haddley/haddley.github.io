'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    // Test hook: inject a mock engine to skip real model loading in e2e tests
    __mlcEngineOverride?: unknown;
  }
}
const gaEvent = (name: string, params?: Record<string, unknown>) => window.gtag?.('event', name, params);
import {
  TOOL_DEFINITIONS, CATEGORIES,
  searchPosts, getPostsByCategory, getCategoryUrl, searchWiki, getTopic, listTopics,
  type AgentData, type WikiData,
} from '@/lib/agent-tools';

const MODEL_LABEL = 'Qwen3.5 9B';
const MAX_HISTORY_MESSAGES = 6;   // the last three exchanges
const NAVY = '#1a2b4b';
// The model is chosen by the agent backend on the Mac mini, not by the visitor or this page.
// Ollama is never reached from the browser: it listens on localhost only, and the backend
// (behind Caddy) rate-limits, picks the model, and forwards to it. No key is shipped here.
// Port 8443 because the router's own admin page already uses 443.
// Two fixed backends, never a visitor-supplied address. Open any page with ?agent=local to use the
// test backend on the home network (remembered for the tab), or ?agent=prod to go back.
const AGENT_APIS = {
  prod: process.env.NEXT_PUBLIC_AGENT_API ?? 'https://agent.haddley.net:8443',
  local: 'http://Agents-Mac-mini.local:8080',
} as const;

function pickAgentApi(): string {
  if (typeof window === 'undefined') return AGENT_APIS.prod;
  try {
    const asked = new URLSearchParams(window.location.search).get('agent');
    if (asked === 'local' || asked === 'prod') sessionStorage.setItem('agentBackend', asked);
    return AGENT_APIS[sessionStorage.getItem('agentBackend') === 'local' ? 'local' : 'prod'];
  } catch {
    return AGENT_APIS.prod;
  }
}

type InferenceEngine = {
  chat: { completions: { create(opts: { messages: unknown[] }): Promise<{ choices: Array<{ message: { content: string | null } }> }> } };
  interruptGenerate(): void;
};
const JINA_KEY = process.env.NEXT_PUBLIC_JINA_API_KEY ?? '';

// Only offer web_search when a Jina API key is configured — avoids the model
// wasting a round on a tool call it can't fulfil.
const ACTIVE_TOOLS = JINA_KEY
  ? TOOL_DEFINITIONS
  : TOOL_DEFINITIONS.filter(t => t.function.name !== 'web_search');

type ToolDef = typeof ACTIVE_TOOLS[number];

function buildToolSystemPrompt(tools: ToolDef[], postCount: number, categoryCount: number): string {
  const defs = tools
    .map(t => JSON.stringify({ name: t.function.name, description: t.function.description, parameters: t.function.parameters }))
    .join('\n');
  return `You are the AI assistant for Neil Haddley's developer blog (${postCount} posts, ${categoryCount} categories). Neil specialises in Azure, Business Central, Power Platform, AI, and web development.

You have access to these tools:
<tools>
${defs}
</tools>

TOOL SELECTION RULES:
- Use search_posts for any keyword query — specific tools, technologies, topics, or names (e.g. "deepseek api", "mcp server", "breakout game").
- Use search_wiki when the user asks what Neil concluded, learned or thinks about something, how an idea works across his posts, or what to read on a subject. Link every topic page and post it returns. When a topic page matches, also call get_topic and use its claims and quotes. Mention if a post's status is not "current".
- Use get_posts_by_category ONLY when the user explicitly asks about a category (e.g. "Any Java posts?", "show me Azure posts").
- Use list_categories ONLY when the user asks what categories exist. Topics are different from categories: when the user asks what topics exist, or just says "topics?", use list_topics and link every topic page it returns.
- Never call list_categories for a keyword search.
- Use web_search when the user explicitly asks for a web search (e.g. "live web search", "search the web", "look up") OR when the question is about current events or real-world facts not covered by the blog. Do not substitute search_posts for these requests.

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
\`\`\`

Example — user asks "deepseek api" or "mcp server" or any specific keyword:
\`\`\`json
{"name": "search_posts", "arguments": {"query": "deepseek api"}}
\`\`\`

Example — user asks "live web search who is Prime Minister of UK" or "search the web for X" or any current-events question:
\`\`\`json
{"name": "web_search", "arguments": {"query": "who is Prime Minister of UK"}}
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
interface TraceCall { name: string; arguments: Record<string, string>; result: string }
interface TraceStep { round: number; thought?: string; calls?: TraceCall[] }
interface Message { role: 'user' | 'assistant'; content: string; trace?: TraceStep[] }

function AgentTrace({ trace }: { trace: TraceStep[] }) {
  return (
    <details style={{ marginTop: 8 }}>
      <summary style={{ cursor: 'pointer', userSelect: 'none', fontSize: 11, color: '#888' }}>
        🔍 Show working ({trace.length} step{trace.length === 1 ? '' : 's'})
      </summary>
      <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {trace.map((step, si) => (
          <div key={si} style={{ borderLeft: '2px solid #ddd', paddingLeft: 8 }}>
            {step.thought && (
              <div style={{ fontStyle: 'italic', color: '#999', fontSize: 11, marginBottom: 4, whiteSpace: 'pre-wrap' }}>
                {step.thought}
              </div>
            )}
            {step.calls?.map((c, ci) => (
              <div key={ci} style={{ marginBottom: 4 }}>
                <div style={{ color: '#556', fontSize: 11, fontFamily: 'monospace' }}>
                  {c.name}({JSON.stringify(c.arguments)})
                </div>
                <div style={{ color: '#aaa', fontSize: 11, marginLeft: 10, whiteSpace: 'pre-wrap' }}>
                  → {c.result}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </details>
  );
}

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
      className="agent-prose"
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ lineHeight: 1.55 }}
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
  const engineRef = useRef<InferenceEngine | null>(null);
  const wikiRef = useRef<Promise<WikiData | null> | null>(null);
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

  const loadModel = useCallback(async () => {
    if (window.__mlcEngineOverride) {
      engineRef.current = window.__mlcEngineOverride as InferenceEngine;
      setLoadState({ status: 'ready', progress: 100, text: '' });
      return;
    }
    setLoadState({ status: 'loading', progress: 0, text: 'Connecting to the agent…' });
    try {
      const ping = await fetch(`${pickAgentApi()}/api/version`);
      if (!ping.ok) throw new Error(`Backend returned ${ping.status}`);
      let currentController: AbortController | null = null;
      engineRef.current = {
        chat: {
          completions: {
            create: async ({ messages }: { messages: unknown[] }) => {
              currentController = new AbortController();
              try {
                const r = await fetch(`${pickAgentApi()}/v1/chat/completions`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ messages, stream: false }),
                  signal: currentController.signal,
                });
                if (!r.ok) throw new Error(r.status === 429 ? 'Too many questions just now. Please wait a minute and try again.' : `Server error ${r.status}.`);
                return r.json();
              } finally {
                currentController = null;
              }
            },
          },
        },
        interruptGenerate: () => { currentController?.abort(); },
      };
      setLoadState({ status: 'ready', progress: 100, text: '' });
    } catch (err) {
      console.warn('[BlogAgent] connect failed:', err);
      setLoadState({ status: 'error', progress: 0, text: 'The agent is not reachable right now. Please try again later.' });
    }
  }, []);

  // Connect as soon as the panel opens: there is no model to choose.
  useEffect(() => {
    if (isOpen && loadState.status === 'idle') loadModel();
  }, [isOpen, loadState.status, loadModel]);

    const executeTool = useCallback(async (name: string, args: Record<string, string>): Promise<string> => {
    const posts = agentData?.posts ?? [];
    switch (name) {
      case 'search_posts': {
        const results = searchPosts(args.query ?? '', posts);
        return results.length
          ? JSON.stringify(results.map(p => ({ slug: p.slug, url: `/posts/${p.slug}/`, title: p.title, description: p.description, tags: p.tags })))
          : 'No matching posts found.';
      }
      case 'get_posts_by_category': {
        const results = getPostsByCategory(args.category ?? '', posts);
        // The model's context window is small, so a large category returns its newest posts and the total.
        const LIMIT = 30;
        const newest = [...results].sort((a, b) => b.date.localeCompare(a.date)).slice(0, LIMIT);
        const list = JSON.stringify(newest.map(p => ({ slug: p.slug, url: `/posts/${p.slug}/`, title: p.title, description: p.description.slice(0, 140) })));
        return results.length
          ? (results.length > LIMIT ? `${results.length} posts in "${args.category}"; the ${LIMIT} newest are: ${list}` : list)
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
        // Strip URL format in case model passes /posts/slug/ instead of slug
        const slug = (args.slug ?? args.query ?? '').replace(/^\/posts\//, '').replace(/\/$/, '');
        if (!slug) return 'No slug provided.';
        try {
          const res = await fetch(`/agent-posts/${encodeURIComponent(slug)}.json`);
          if (!res.ok) return `Post "${slug}" not found (${res.status}).`;
          const data = await res.json();
          // Cap content to keep context manageable when fetching multiple posts
          if (typeof data.content === 'string' && data.content.length > 3000) {
            data.content = data.content.slice(0, 3000) + '\n…(truncated)';
          }
          return JSON.stringify(data);
        } catch {
          return `Failed to load post "${slug}".`;
        }
      }
      case 'list_topics':
      case 'search_wiki':
      case 'get_topic': {
        // The wiki is larger than the post list, so it loads the first time a wiki tool is used.
        wikiRef.current ??= fetch('/agent-wiki.json').then(r => (r.ok ? (r.json() as Promise<WikiData>) : null)).catch(() => null);
        const wiki = await wikiRef.current;
        if (!wiki) { wikiRef.current = null; return 'The wiki is not available. Use search_posts instead.'; }
        if (name === 'list_topics') return JSON.stringify(listTopics(wiki));
        if (name === 'search_wiki') {
          const found = searchWiki(args.query ?? '', wiki);
          return found.topics.length || found.posts.length ? JSON.stringify(found) : 'No wiki pages match. Try search_posts.';
        }
        const topic = getTopic(args.topic ?? args.query ?? args.slug ?? '', wiki);
        return topic ? JSON.stringify(topic) : `No topic "${args.topic}". Call search_wiki to find topic names.`;
      }
      case 'navigate_to_post': {
        const target = posts.find(p => p.slug === args.slug);
        if (!target) {
          const close = posts.find(p => p.slug.startsWith(args.slug?.slice(0, 6) ?? ''));
          return close
            ? `No post with slug "${args.slug}". Did you mean "${close.slug}"? Call search_posts to find the correct slug before navigating.`
            : `No post with slug "${args.slug}". Call search_posts to find the correct slug before navigating.`;
        }
        router.push(`/posts/${args.slug}/`);
        return `Navigating to "${args.slug}".`;
      }
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
      // Category pages live at /categories/<slug>/ (and /posts/category/<slug>/); topic pages at /topics/<slug>/
      const categoryMatch = pathname.match(/^\/(?:categories|posts\/category)\/([^/]+)\/?$/);
      const topicMatch = pathname.match(/^\/topics\/([^/]+)\/?$/);
      let pageRule = '';
      if (postMatch) {
        const slug = postMatch[1];
        const post = posts.find(p => p.slug === slug);
        pageContext = post
          ? `post url: "/posts/${slug}/", slug: "${slug}", title: "${post.title}" (categories: ${post.categories.join(', ')}; tags: ${post.tags})`
          : `post at /posts/${slug}/`;
      } else if (categoryMatch) {
        const catSlug = categoryMatch[1];
        const catName = CATEGORIES.find(c => getCategoryUrl(c) === `/categories/${catSlug}/`) ?? catSlug;
        pageContext = `"${catName}" category page`;
        pageRule = `(2b) The user is on the "${catName}" category page. "this category", "this page" and "summarise this" mean the "${catName}" category: call get_posts_by_category with category "${catName}", then summarise its themes and name the most useful posts. Do NOT call list_categories and do NOT ask which category.`;
      } else if (topicMatch) {
        const topicSlug = topicMatch[1];
        pageContext = `topic page /topics/${topicSlug}/`;
        pageRule = `(2b) The user is on the topic page "${topicSlug}". "this topic", "this page" and "summarise this" mean that topic: call get_topic with topic "${topicSlug}", then summarise its idea, key claims and where the posts differ, and link the posts. Do NOT ask which topic.`;
      } else if (pathname.startsWith('/topics')) {
        pageContext = 'topics list';
        pageRule = '(2b) The user is on the topics list. "topics", "what is here" and "list them" mean the topic pages: call list_topics. For questions about a subject use search_wiki.';
      } else if (pathname.startsWith('/posts')) {
        pageContext = 'blog post listing';
      } else if (pathname.startsWith('/categories')) {
        pageContext = 'categories overview';
      }

      const currentSlug = postMatch?.[1] ?? '';
      const postPageRule = currentSlug
        ? `(2) Only use get_post_content with slug "${currentSlug}" when the user refers to THIS page with words like "this post", "this", "the current post", or asks with no post name.`
        : `(2) You are not on a post page — do not call get_post_content unless the user explicitly names a post.`;
      const contextHint = `[Current page: ${pageContext}. RULES (priority order): (1) If the user names a specific post title (e.g. "Summarize X post", "tell me about Y") — that is a DIFFERENT post. Use search_posts to find it. NEVER assume it is the current page. ${postPageRule} ${pageRule} (3) For category questions use get_posts_by_category; for other keyword queries use search_posts. Never name or link a post without calling a tool first — always use the exact slug returned by the tool, never guess or paraphrase it. (4) Never repeat the same tool call in one turn. Be concise.]`;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const apiMsgs: any[] = [
        { role: 'system', content: buildToolSystemPrompt(ACTIVE_TOOLS, posts.length, CATEGORIES.length) },
        ...apiHistoryRef.current.map(({ role, content }) => ({ role, content })),   // no trace or other UI fields
        { role: 'user', content: `${contextHint}\n\n${userText}` },
      ];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const turnMsgs: any[] = [userMsg];

      const MAX_TOOL_ROUNDS = 8;
      let finalContent = '';
      const calledThisTurn = new Set<string>();
      let contentFetchCount = 0;
      const trace: TraceStep[] = [];

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

        const rawFull = resp.choices[0].message.content ?? '';
        const thinkMatch = rawFull.match(/<think>([\s\S]*?)<\/think>/);
        const thought = thinkMatch?.[1]?.trim() || undefined;
        const rawContent = rawFull.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
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
          if (thought) trace.push({ round, thought });
          break;
        }

        const names = toolCalls.map(tc =>
          tc.name === 'web_search' ? '🌐 web search' : `🔍 ${tc.name.replace(/_/g, ' ')}`
        ).join(', ');
        setToolStatus(thought ? `🤔 ${thought.slice(0, 60)}${thought.length > 60 ? '…' : ''} → ${names}…` : `${names}…`);
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
            if (contentFetchCount >= 6) {
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

        trace.push({
          round,
          thought,
          calls: toolCalls.map((tc, idx) => ({
            name: tc.name,
            arguments: tc.arguments,
            result: (resultParts[idx] ?? '').slice(0, 240) + ((resultParts[idx]?.length ?? 0) > 240 ? '…' : ''),
          })),
        });

        const allDuplicates = resultParts.every(r => r.startsWith('You already called'));
        const isLastRound = round >= MAX_TOOL_ROUNDS - 2;
        apiMsgs.push({
          role: 'user',
          content: allDuplicates
            ? `You have already retrieved the information needed. Answer the user's question in plain text now — do not call any more tools.`
            : `<tool_response>\n${resultParts.join('\n\n')}\n</tool_response>\n${isLastRound ? 'Now answer the user\'s question in plain text using these results. Do not call any more tools.' : 'If you need more information, call additional tools. Otherwise answer the user\'s question in plain text.'}`,
        });
      }

      // If the loop exhausted without producing a text answer, do one final call
      if (!finalContent && !abortRef.current) {
        setToolStatus('');
        console.log('loop exhausted — final nudge');
        try {
          const finalResp = await engine.chat.completions.create({ messages: [...apiMsgs] });
          const rawFull = finalResp.choices[0].message.content ?? '';
          const thinkMatch = rawFull.match(/<think>([\s\S]*?)<\/think>/);
          const thought = thinkMatch?.[1]?.trim() || undefined;
          const raw = rawFull.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
          finalContent = raw
            .replace(/```(?:json)?\s*[\s\S]*?```/g, '')
            .replace(/<tool_call>[\s\S]*?<\/tool_call>/g, '')
            .replace(/https?:\/\/[^\s/)]+(\/(posts|categories)[^\s)]*)/g, '$1')
            .trim();
          if (thought) trace.push({ round: MAX_TOOL_ROUNDS, thought });
          console.log('nudge response:', finalContent.slice(0, 200));
        } catch (err: unknown) {
          if (!(err instanceof Error && (err.name === 'AbortError' || err.message.toLowerCase().includes('interrupt')))) throw err;
          console.log('nudge interrupted');
        }
      }

      console.groupEnd();

      if (finalContent) {
        const assistantMsg: Message = { role: 'assistant', content: finalContent, trace: trace.length ? trace : undefined };
        setMessages(prev => [...prev, assistantMsg]);
        turnMsgs.push(assistantMsg);
      }

      // Commit user + final assistant text only — no tool call/response messages
      // Keep only the last few exchanges: the context window is small, and the backend refuses more than
      // 40 messages in one request (each tool round in a turn adds two). Start on a user message.
      const kept = [...apiHistoryRef.current, ...turnMsgs].slice(-MAX_HISTORY_MESSAGES);
      while (kept.length && kept[0].role !== 'user') kept.shift();
      apiHistoryRef.current = kept;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${msg}` }]);
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
          width: 'min(560px, calc(100vw - 32px))',
          maxHeight: 'min(1040px, calc(100vh - 120px))',
          background: '#fff', borderRadius: 14,
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.07)',
        }}>
          {/* Header */}
          <div style={{ background: NAVY, color: '#fff', padding: '13px 16px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>
                <Link
                  href="/posts/localagent2/"
                  style={{ color: '#fff', textDecoration: 'none', transition: 'opacity .15s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >Blog AI Assistant ↗</Link>
              </div>
              <div style={{ fontSize: 11, opacity: 0.6, marginTop: 2 }}>
                {loadState.status === 'ready' ? `${MODEL_LABEL} · hosted` : 'Hosted model'}
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
          {(loadState.status === 'idle' || loadState.status === 'loading' || loadState.status === 'unsupported' || loadState.status === 'error') && (
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
                  <div style={{ color: '#555', fontSize: 12 }}>{loadState.text || 'Connecting to the agent…'}</div>
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
                      ? <>
                          <MessageContent text={msg.content} onNavigate={url => { router.push(url); setIsOpen(false); }} />
                          {msg.trace && msg.trace.length > 0 && <AgentTrace trace={msg.trace} />}
                        </>
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
                    flex: 1, minWidth: 0, padding: '8px 12px',
                    border: '1px solid #ddd', borderRadius: 20,
                    fontSize: 16, outline: 'none',
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
