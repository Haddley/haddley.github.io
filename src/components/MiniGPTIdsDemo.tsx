'use client';

// A live demo for "Letters to numbers" in MiniGPT (Part 1): each character the reader types becomes its ID,
// its place in the model's vocabulary of 65 letters. Characters outside the vocabulary are skipped, as
// the demos do. The whole vocabulary is shown below, in ID order, with the typed letters highlighted.

import React from 'react';
import { TextBox, label, mono, panel, show, useMiniGPTEngine } from './minigptShared';

const START_TEXT = 'goo';
const note: React.CSSProperties = { fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' };

export default function MiniGPTIdsDemo() {
  const { engine, error } = useMiniGPTEngine();
  const [text, setText] = React.useState(START_TEXT);

  if (error) return <div style={panel}>{error}</div>;
  if (!engine) return <div style={panel}>Loading my trained MiniGPT (3.3 MB)…</div>;

  const chars = engine.manifest.chars;
  const typed = Array.from(text);
  const used = new Set(engine.encode(text));
  const ids = engine.encode(text);

  return (
    <div className="minigpt-demo mbr-fonts-style" style={{ fontSize: '0.95rem' }}>
      <div style={panel}>
        <div style={label}>The text so far</div>
        <TextBox value={text} onChange={setText} limit={engine.manifest.block_size} />
      </div>

      <div style={panel}>
        <div style={label}>Each letter becomes its ID</div>
        <div className="d-flex flex-wrap" style={{ gap: '0.3rem' }}>
          {typed.map((ch, i) => {
            const known = engine.knows(ch);
            return (
              <div
                key={i}
                style={{
                  border: `1px solid ${known ? '#93c5fd' : '#fca5a5'}`,
                  background: known ? '#eff6ff' : '#fef2f2',
                  borderRadius: '6px',
                  padding: '0.2rem 0.45rem',
                  textAlign: 'center',
                  minWidth: '2.2rem',
                }}
              >
                <div style={{ ...mono, fontWeight: 700 }}>{show(ch)}</div>
                <div style={{ ...mono, fontSize: '0.75rem', color: known ? '#1d4ed8' : '#b91c1c' }}>{known ? chars.indexOf(ch) : 'skip'}</div>
              </div>
            );
          })}
        </div>
        <div style={{ ...mono, fontSize: '0.85rem', marginTop: '0.6rem', overflowWrap: 'anywhere' }}>
          [{ids.join(', ')}]
        </div>
        <div style={note}>This list of IDs is all that goes into the model.</div>
      </div>

      <div style={panel}>
        <div style={label}>The whole vocabulary: 65 letters, in ID order</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(2.6rem, 1fr))', gap: '0.25rem' }}>
          {chars.map((ch, id) => (
            <div
              key={id}
              style={{
                border: '1px solid #e5e7eb',
                background: used.has(id) ? '#2563eb' : '#f9fafb',
                color: used.has(id) ? '#ffffff' : '#111827',
                borderRadius: '4px',
                textAlign: 'center',
                padding: '0.1rem 0',
              }}
            >
              <div style={{ ...mono, fontWeight: 700 }}>{show(ch)}</div>
              <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>{id}</div>
            </div>
          ))}
        </div>
        <div style={note}>
          ↵ is the new line and ␣ the space. The order is the computer&rsquo;s standard one: the new line, the space and punctuation, the digit 3, the capitals, then the small letters. The letters you typed are blue.
        </div>
      </div>
    </div>
  );
}
