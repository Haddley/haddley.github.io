'use client';

// A live demo for "Four blocks in a row" in MiniGPT (Part 1): run only the first few blocks.
// The reader picks how many of the four blocks run, from 0 (the embeddings straight into lm_head)
// to 4 (the real model), and sees the last hidden state after every block, the chances after the
// chosen one, and what the model writes with only that many blocks. Stopping early is a peek:
// lm_head was trained to read block 4's output, not block 1's.

import React from 'react';
import { MiniGPTEngine } from '@/lib/minigptEngine';
import { ChanceList, Squares, TextBox, label, maxAbs, mono, panel, topK, useMiniGPTEngine } from './minigptShared';

const START_TEXT = 'Before we proceed any further, hear me spea';
const WRITE_LETTERS = 60;

const note: React.CSSProperties = { fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' };

// Write letters one at a time, always taking the biggest slice, so that the only thing that
// changes from one run to the next is the number of blocks.
function writeGreedy(engine: MiniGPTEngine, text: string, blocks: number, n: number): string {
  let ids = engine.encode(text);
  let out = '';
  for (let i = 0; i < n; i++) {
    const r = engine.forward(ids, { blocks });
    const id = topK(r.earlyProbs[blocks], 1)[0];
    ids = [...ids, id];
    out += engine.manifest.chars[id];
  }
  return out;
}

export default function MiniGPTBlocksDemo() {
  const { engine, error } = useMiniGPTEngine();
  const [text, setText] = React.useState(START_TEXT);
  const [blocks, setBlocks] = React.useState(4);
  const [written, setWritten] = React.useState<{ blocks: number; text: string } | null>(null);

  const ids = React.useMemo(() => (engine ? engine.encode(text) : []), [engine, text]);
  const result = React.useMemo(() => (engine && ids.length > 0 ? engine.forward(ids) : null), [engine, ids]);

  if (error) return <div style={panel}>{error}</div>;
  if (!engine) return <div style={panel}>Loading my trained MiniGPT (3.3 MB)…</div>;

  const chars = engine.manifest.chars;
  const nLayer = engine.manifest.n_layer;
  // One colour scale for all five grids, so that they can be compared: the strongest colour is a
  // little below the biggest number in any of them.
  const scale = result ? 0.6 * Math.max(...result.blockStates.map(maxAbs)) : 1;
  const shown = text.length > 24 ? '…' + text.slice(-24) : text;

  return (
    <div className="minigpt-demo mbr-fonts-style" style={{ fontSize: '0.95rem' }}>
      <div style={panel}>
        <div style={label}>The text so far</div>
        <TextBox
          value={text}
          onChange={(t) => {
            setText(t);
            setWritten(null);
          }}
          limit={engine.manifest.block_size}
        />
        <div style={{ ...label, marginTop: '0.9rem' }}>How many blocks run</div>
        <div className="d-flex flex-wrap" style={{ gap: '0.4rem' }}>
          {Array.from({ length: nLayer + 1 }, (_, n) => (
            <button
              key={n}
              type="button"
              className={`btn btn-sm ${n === blocks ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setBlocks(n)}
            >
              {n === 0 ? 'none' : n === nLayer ? `all ${n}` : n}
            </button>
          ))}
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => { setText(START_TEXT); setBlocks(4); setWritten(null); }}>
            Reset
          </button>
        </div>
      </div>

      {!result ? (
        <div style={panel}>
          <span style={{ color: '#6b7280' }}>Type at least one letter.</span>
        </div>
      ) : (
        <>
          <div style={panel}>
            <div style={label}>
              The last letter&rsquo;s hidden state after &ldquo;<span style={mono}>{shown}</span>&rdquo;, block by block
            </div>
            <div className="d-flex flex-wrap" style={{ gap: '0.75rem' }}>
              {result.blockStates.map((state, n) => (
                <div
                  key={n}
                  onClick={() => setBlocks(n)}
                  style={{ flex: '0 0 auto', width: '150px', cursor: 'pointer', opacity: n <= blocks ? 1 : 0.3, outline: n === blocks ? '2px solid #2563eb' : 'none', outlineOffset: '4px', borderRadius: '4px' }}
                >
                  <Squares values={state} scale={scale} name="Number" maxWidth="150px" />
                  <div style={{ fontSize: '0.75rem', color: '#4b5563', marginTop: '0.25rem', textAlign: 'center' }}>
                    {n === 0 ? 'before any block' : `after block ${n}`}
                  </div>
                </div>
              ))}
            </div>
            <div style={note}>
              Blue above 0, orange below, on one scale for all five. Each block adds to the hidden state, so the squares get stronger as the blocks go on. Faded squares are blocks that did not run.
            </div>
          </div>

          <div style={panel}>
            <div style={label}>
              The chances for the next letter, after {blocks === 0 ? 'no blocks at all' : blocks === nLayer ? 'all four blocks' : `only ${blocks} block${blocks === 1 ? '' : 's'}`}
            </div>
            <ChanceList chances={result.earlyProbs[blocks]} chars={chars} k={6} />
            <div style={note}>
              {blocks === nLayer
                ? 'This is the real model.'
                : 'A peek: lm_head was trained to read what comes out of block 4, so it reads an earlier hidden state only roughly.'}
            </div>
          </div>

          <div style={panel}>
            <div style={label}>Writing with {blocks === 0 ? 'no blocks' : blocks === nLayer ? 'all four blocks' : `only ${blocks} block${blocks === 1 ? '' : 's'}`}</div>
            <button type="button" className="btn btn-sm btn-primary" onClick={() => setWritten({ blocks, text: writeGreedy(engine, text, blocks, WRITE_LETTERS) })}>
              Write {WRITE_LETTERS} letters
            </button>
            {written && (
              <div style={{ ...mono, whiteSpace: 'pre-wrap', marginTop: '0.6rem', padding: '0.5rem', background: '#f9fafb', borderRadius: '6px' }}>
                <span style={{ color: '#9ca3af' }}>{shown}</span>
                <strong>{written.text}</strong>
              </div>
            )}
            <div style={note}>
              It always takes the biggest slice, so the same text and the same number of blocks always write the same letters
              {written ? ` (these were written with ${written.blocks === 0 ? 'no blocks' : `${written.blocks} block${written.blocks === 1 ? '' : 's'}`})` : ''}. Try none, then 1, then all 4.
            </div>
          </div>
        </>
      )}
    </div>
  );
}

