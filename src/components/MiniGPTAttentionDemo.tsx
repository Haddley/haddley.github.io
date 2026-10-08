'use client';

// A live demo for attention in MiniGPT (Part 1): queries, keys, and values in one head.
// The reader picks a block, a head, and a position, and sees that position's query, every earlier
// position's key, how well each one matches (query × key, then ÷ √32), the shares that softmax
// gives them, and what the position collects from the values in those shares.

import React from 'react';
import { softmax } from '@/lib/minigptEngine';
import { Squares, TextBox, label, maxAbs, mono, panel, show, signed, useMiniGPTEngine } from './minigptShared';

const START_TEXT = 'goo';
const SHOW_POSITIONS = 12; // the most recent earlier positions listed in the table

const note: React.CSSProperties = { fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' };
const cell: React.CSSProperties = { padding: '3px 8px', textAlign: 'right', whiteSpace: 'nowrap' };

function first(values: Float32Array, n: number): string {
  return Array.from(values.slice(0, n)).map((v) => signed(v, 2)).join(', ') + ', …';
}

export default function MiniGPTAttentionDemo() {
  const { engine, error } = useMiniGPTEngine();
  const [text, setText] = React.useState(START_TEXT);
  const [block, setBlock] = React.useState(0);
  const [head, setHead] = React.useState(0);
  const [picked, setPicked] = React.useState<number | null>(null);

  const ids = React.useMemo(() => (engine ? engine.encode(text).slice(-engine.manifest.block_size) : []), [engine, text]);
  const result = React.useMemo(
    () => (engine && ids.length > 0 ? engine.forward(ids, { inspect: { block, head } }) : null),
    [engine, ids, block, head]
  );

  if (error) return <div style={panel}>{error}</div>;
  if (!engine) return <div style={panel}>Loading my trained MiniGPT (3.3 MB)…</div>;

  const { n_layer, n_head, n_embd } = engine.manifest;
  const hd = n_embd / n_head;
  const root = Math.sqrt(hd);
  const chars = engine.manifest.chars;
  const T = ids.length;
  const pos = picked !== null && picked < T ? picked : T - 1;
  const ins = result?.inspected;

  const pickButtons = (n: number, value: number, set: (v: number) => void, name: string) => (
    <div className="d-flex flex-wrap" style={{ gap: '0.4rem' }}>
      {Array.from({ length: n }, (_, i) => (
        <button key={i} type="button" className={`btn btn-sm ${i === value ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => set(i)}>
          {name} {i + 1}
        </button>
      ))}
    </div>
  );

  let body: React.ReactNode = <span style={{ color: '#6b7280' }}>Type at least one letter.</span>;
  if (ins) {
    const shrunk = ins.scores[pos];
    const shares = softmax(shrunk);
    const start = Math.max(0, pos + 1 - SHOW_POSITIONS);
    const collected = new Float32Array(hd);
    for (let j = 0; j <= pos; j++) for (let d = 0; d < hd; d++) collected[d] += shares[j] * ins.v[j][d];
    const scale = Math.max(maxAbs(ins.q[pos]), ...ins.k.slice(0, pos + 1).map(maxAbs));
    body = (
      <>
        <div style={panel}>
          <div style={label}>
            Position {pos + 1}, <span style={mono}>{show(chars[ids[pos]])}</span>, makes its query: {hd} numbers
          </div>
          <Squares values={ins.q[pos]} scale={scale} name="Query number" maxWidth="260px" />
          <div style={{ ...mono, fontSize: '0.8rem', marginTop: '0.3rem' }}>{first(ins.q[pos], 3)}</div>
        </div>

        <div style={panel}>
          <div style={label}>It matches its query against the key of every position up to itself</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ fontSize: '0.85rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #d1d5db' }}>
                  <th style={{ ...cell, textAlign: 'left' }}>position</th>
                  <th style={cell}>query × key</th>
                  <th style={cell}>÷ √{hd}</th>
                  <th style={{ ...cell, textAlign: 'left' }}>share of attention</th>
                  <th style={{ ...cell, textAlign: 'left' }}>its key</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: pos + 1 - start }, (_, n) => start + n).map((j) => (
                  <tr key={j} style={{ fontWeight: j === pos ? 600 : 'normal' }}>
                    <td style={{ ...cell, textAlign: 'left' }}>
                      {j + 1} <span style={mono}>{show(chars[ids[j]])}</span>
                      {j === pos ? ' (itself)' : ''}
                    </td>
                    <td style={{ ...cell, ...mono }}>{signed(shrunk[j] * root, 2)}</td>
                    <td style={{ ...cell, ...mono }}>{signed(shrunk[j], 2)}</td>
                    <td style={{ ...cell, textAlign: 'left' }}>
                      <span style={{ display: 'inline-block', width: `${Math.max(1, shares[j] * 80)}px`, height: '10px', background: '#2563eb', borderRadius: '2px', marginRight: '6px', verticalAlign: 'middle' }} />
                      {(shares[j] * 100).toFixed(1)}%
                    </td>
                    <td style={{ ...cell, ...mono, textAlign: 'left', fontSize: '0.75rem', color: '#4b5563' }}>{first(ins.k[j], 3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={note}>
            {start > 0 ? `The ${pos + 1 - start} most recent positions; the shares of all ${pos + 1} add up to 100%. ` : 'The shares add up to 100%. '}
            Later positions are not on the list at all: a letter may not look ahead.
          </div>
        </div>

        <div style={panel}>
          <div style={label}>It collects the values, in those shares</div>
          <Squares values={collected} scale={maxAbs(collected)} name="Collected number" maxWidth="260px" />
          <div style={{ ...mono, fontSize: '0.8rem', marginTop: '0.3rem' }}>{first(collected, 3)}</div>
          <div style={note}>
            This head&rsquo;s {hd} numbers. The four heads&rsquo; results are laid side by side, mixed by one more table of weights, and added to position {pos + 1}&rsquo;s hidden state.
          </div>
        </div>
      </>
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
        <div style={{ ...label, marginTop: '0.9rem' }}>Which block, and which head</div>
        {pickButtons(n_layer, block, setBlock, 'block')}
        <div style={{ marginTop: '0.4rem' }}>{pickButtons(n_head, head, setHead, 'head')}</div>
        {T > 0 && (
          <>
            <div style={{ ...label, marginTop: '0.9rem' }}>Which position is asking</div>
            <div className="d-flex flex-wrap" style={{ gap: '0.25rem' }}>
              {ids.map((id, i) => (
                <button
                  key={i}
                  type="button"
                  title={`Position ${i + 1}`}
                  className={`btn btn-sm ${i === pos ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setPicked(i)}
                  style={{ ...mono, minWidth: '2rem', padding: '0.15rem 0.4rem' }}
                >
                  {show(chars[id])}
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
