'use client';

import { useEffect, useRef, useState } from 'react';

let mermaidInitialized = false;

export default function MermaidDiagram({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [svg, setSvg] = useState<string>('');
  // Unique per-instance id -- mermaid.render() needs one, and a post can embed more than one diagram.
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { default: mermaid } = await import('mermaid');
      if (!mermaidInitialized) {
        // Draw node and edge labels as SVG text, not as HTML inside <foreignObject>. Safari sizes and clips the
        // foreignObject labels wrongly, so diagram text was cut off. The wrapping width stops long identifiers
        // such as get_embedding_provider().embed() from being broken in the middle of a word.
        // The root-level wrappingWidth works in Mermaid 12 but is missing from its type definitions, so the
        // config is built as a variable first.
        const config = {
          startOnLoad: false,
          theme: 'neutral' as const,
          securityLevel: 'strict' as const,
          htmlLabels: false,
          wrappingWidth: 300,
          flowchart: { htmlLabels: false, wrappingWidth: 300 },
          class: { htmlLabels: false },
        };
        mermaid.initialize(config);
        mermaidInitialized = true;
      }
      try {
        const { svg: rendered } = await mermaid.render(idRef.current, chart);
        if (!cancelled) setSvg(rendered);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to render diagram.');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <div style={{ padding: '1rem', border: '1px solid #e0a0a0', borderRadius: 4, background: '#fff5f5', color: '#a03030', fontSize: '0.85rem' }}>
        Diagram failed to render: {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mermaid-diagram"
      style={{ display: 'flex', justifyContent: 'center', overflowX: 'auto', padding: '1rem 0' }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
