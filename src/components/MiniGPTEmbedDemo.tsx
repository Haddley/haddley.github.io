'use client';

// A live demo for the embeddings in MiniGPT (Part 1): the reader picks a letter in the text, and sees
// its token embedding (one row of a table, the same for every copy of that letter), its position
// embedding (one row of another table, the same for every letter in that position), and their sum,
// the input embedding that block 1 receives.

import React from 'react';
import { Squares, TextBox, label, maxAbs, mono, panel, show, signed, useMiniGPTEngine } from './minigptShared';

const START_TEXT = 'goo';
const note: React.CSSProperties = { fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' };
const sign: React.CSSProperties = { fontSize: '1.4rem', fontWeight: 700, color: '#6b7280' };

function first(values: Float32Array, n: number): string {
  return Array.from(values.slice(0, n)).map((v) => signed(v, 3)).join(', ') + ', …';
}

function Figure({ title, values, scale }: { title: React.ReactNode; values: Float32Array; scale: number }) {
  return (
    <div style={{ flex: '1 1 180px', maxWidth: '240px', minWidth: '180px' }}>
      <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>{title}</div>
      <Squares values={values} scale={scale} name="Number" />
      <div style={{ ...mono, fontSize: '0.75rem', marginTop: '0.3rem', color: '#374151' }}>{first(values, 3)}</div>
    </div>
  );
}

export default function MiniGPTEmbedDemo() {
  const { engine, error } = useMiniGPTEngine();
  const [text, setText] = React.useState(START_TEXT);
  const [picked, setPicked] = React.useState<number | null>(null);

  if (error) return <div style={panel}>{error}</div>;
  if (!engine) return <div style={panel}>Loading my trained MiniGPT (3.3 MB)…</div>;

  const ids = engine.encode(text).slice(-engine.manifest.block_size);
  const chars = engine.manifest.chars;
  const pos = picked !== null && picked < ids.length ? picked : ids.length - 1;

  let body: React.ReactNode = <span style={{ color: '#6b7280' }}>Type at least one letter.</span>;
  if (ids.length > 0) {
    const id = ids[pos];
    const tok = engine.tokenEmbedding(id);
    const p = engine.positionEmbedding(pos);
    const sum = tok.map((v, i) => v + p[i]);
    const scale = Math.max(maxAbs(tok), maxAbs(p), maxAbs(sum));
    const copies = ids.filter((x) => x === id).length;
    body = (
      <div style={panel}>
        <div style={label}>
          Position {pos + 1}: the letter <span style={mono}>{show(chars[id])}</span>, ID {id}
        </div>
        <div className="d-flex flex-wrap align-items-center" style={{ gap: '0.75rem' }}>
          <Figure title={<>token embedding: row {id}, for <span style={mono}>{show(chars[id])}</span></>} values={tok} scale={scale} />
          <span style={sign}>+</span>
          <Figure title={`position embedding: row ${pos}, for position ${pos + 1}`} values={p} scale={scale} />
          <span style={sign}>=</span>
          <Figure title="input embedding, into block 1" values={sum} scale={scale} />
        </div>
        <div style={note}>
          Blue above 0, orange below, on one scale for all three. Each number on the right is the sum of the two in the same place on the left.
          {copies > 1
            ? ` This text has ${copies} copies of ${show(chars[id])}: they all get the same token embedding, so only the position embedding tells them apart.`
            : ''}
        </div>
      </div>
    );
  }

  return (
    <div className="minigpt-demo mbr-fonts-style" style={{ fontSize: '0.95rem' }}>
      <div style={panel}>
        <div style={label}>The text so far</div>
        <TextBox
          value={text}
          onChange={(t) => {
            setText(t);
            setPicked(null);
          }}
          limit={engine.manifest.block_size}
        />
        {ids.length > 0 && (
          <>
            <div style={{ ...label, marginTop: '0.9rem' }}>Pick a letter</div>
            <div className="d-flex flex-wrap" style={{ gap: '0.25rem' }}>
              {ids.map((x, i) => (
                <button
                  key={i}
                  type="button"
                  title={`Position ${i + 1}`}
                  className={`btn btn-sm ${i === pos ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setPicked(i)}
                  style={{ ...mono, minWidth: '2rem', padding: '0.15rem 0.4rem', margin: 0 }}
                >
                  {show(chars[x])}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      {body}
    </div>
  );
}
