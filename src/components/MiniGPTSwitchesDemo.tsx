'use client';

// Live "switch it off" demos for MiniGPT (Part 1). With kind="mlp", the reader switches the MLP off in
// any of the four blocks; with kind="heads", any of the 16 attention heads. The demo compares the chances
// for the next letter, and 60 letters of writing, with everything on and with the reader's switches.
// Writing always takes the biggest slice, so the switches are the only thing that changes.

import React from 'react';
import { MiniGPTEngine } from '@/lib/minigptEngine';
import { TextBox, label, mono, panel, show, topK, useMiniGPTEngine } from './minigptShared';

const WRITE_LETTERS = 60;
const note: React.CSSProperties = { fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' };
const cell: React.CSSProperties = { padding: '2px 10px', textAlign: 'right', whiteSpace: 'nowrap' };

type Options = { off?: Set<string>; mlpOff?: Set<number> };

function writeGreedy(engine: MiniGPTEngine, text: string, opts: Options, n: number): string {
  let ids = engine.encode(text);
  let out = '';
  for (let i = 0; i < n; i++) {
    const id = topK(engine.forward(ids, opts).probs, 1)[0];
    ids = [...ids, id];
    out += engine.manifest.chars[id];
  }
  return out;
}

export default function MiniGPTSwitchesDemo({ kind }: { kind: 'mlp' | 'heads' }) {
  const startText = kind === 'mlp' ? 'ROMEO:\nI thoug' : 'goo';
  const { engine, error } = useMiniGPTEngine();
  const [text, setText] = React.useState(startText);
  const [off, setOff] = React.useState<Set<string>>(new Set());
  const [written, setWritten] = React.useState<{ on: string; off: string } | null>(null);

  const opts: Options = React.useMemo(
    () => (kind === 'mlp' ? { mlpOff: new Set(Array.from(off).map(Number)) } : { off }),
    [kind, off]
  );
  const ids = React.useMemo(() => (engine ? engine.encode(text) : []), [engine, text]);
  const allOn = React.useMemo(() => (engine && ids.length > 0 ? engine.forward(ids).probs : null), [engine, ids]);
  const switched = React.useMemo(() => (engine && ids.length > 0 ? engine.forward(ids, opts).probs : null), [engine, ids, opts]);

  if (error) return <div style={panel}>{error}</div>;
  if (!engine) return <div style={panel}>Loading my trained MiniGPT (3.3 MB)…</div>;

  const { n_layer, n_head } = engine.manifest;
  const chars = engine.manifest.chars;
  const toggle = (key: string) => {
    const next = new Set(off);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setOff(next);
    setWritten(null);
  };
  const switchButton = (key: string, text: string) => (
    <button
      key={key}
      type="button"
      className={`btn btn-sm ${off.has(key) ? 'btn-outline-secondary' : 'btn-primary'}`}
      onClick={() => toggle(key)}
      style={{ minWidth: '4.2rem', textDecoration: off.has(key) ? 'line-through' : 'none' }}
    >
      {text}
    </button>
  );
  const what = kind === 'mlp' ? 'MLP' : 'head';
  const rows = allOn && switched ? Array.from(new Set([...topK(allOn, 5), ...topK(switched, 5)])).sort((a, b) => allOn[b] - allOn[a]) : [];

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
        <div style={{ ...label, marginTop: '0.9rem' }}>
          {kind === 'mlp' ? 'Each block’s MLP: press one to switch it off' : 'The 16 heads, block by block: press one to switch it off'}
        </div>
        {kind === 'mlp' ? (
          <div className="d-flex flex-wrap" style={{ gap: '0.4rem' }}>
            {Array.from({ length: n_layer }, (_, L) => switchButton(String(L), `block ${L + 1}`))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: `auto repeat(${n_head}, auto)`, gap: '0.4rem', justifyContent: 'start', alignItems: 'center' }}>
            {Array.from({ length: n_layer }, (_, L) => (
              <React.Fragment key={L}>
                <span style={{ fontSize: '0.85rem', color: '#4b5563', paddingRight: '0.3rem' }}>block {L + 1}</span>
                {Array.from({ length: n_head }, (_, h) => switchButton(`${L}:${h}`, `head ${h + 1}`))}
              </React.Fragment>
            ))}
          </div>
        )}
        <button type="button" className="btn btn-sm btn-outline-secondary mt-2" onClick={() => { setText(startText); setOff(new Set()); setWritten(null); }}>
          Reset: everything on
        </button>
      </div>

      {allOn && switched && (
        <div style={panel}>
          <div style={label}>
            The chances for the next letter after &ldquo;<span style={mono}>{text.length > 24 ? '…' + text.slice(-24) : text}</span>&rdquo;
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ fontSize: '0.85rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #d1d5db' }}>
                  <th style={{ ...cell, textAlign: 'center' }}></th>
                  <th style={cell}>everything on</th>
                  <th style={cell}>{off.size === 0 ? 'your switches (all on)' : `${off.size} ${what}${off.size === 1 ? '' : 's'} off`}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((i) => (
                  <tr key={i}>
                    <td style={{ ...cell, ...mono, textAlign: 'center', fontWeight: 700 }}>{show(chars[i])}</td>
                    <td style={cell}>{(allOn[i] * 100).toFixed(1)}%</td>
                    <td style={{ ...cell, fontWeight: 700, color: Math.abs(switched[i] - allOn[i]) > 0.05 ? '#b45309' : undefined }}>{(switched[i] * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={note}>The biggest chances either way. Orange marks a change of more than 5 points.</div>
        </div>
      )}

      <div style={panel}>
        <div style={label}>Writing, everything on and with your switches</div>
        <button
          type="button"
          className="btn btn-sm btn-primary"
          disabled={ids.length === 0}
          onClick={() => setWritten({ on: writeGreedy(engine, text, {}, WRITE_LETTERS), off: writeGreedy(engine, text, opts, WRITE_LETTERS) })}
        >
          Write {WRITE_LETTERS} letters both ways
        </button>
        {written && (
          <div className="d-flex flex-wrap" style={{ gap: '0.75rem', marginTop: '0.6rem' }}>
            {(['on', 'off'] as const).map((which) => (
              <div key={which} style={{ flex: '1 1 16rem', minWidth: 0 }}>
                <div style={{ fontSize: '0.8rem', color: '#4b5563', marginBottom: '0.2rem' }}>
                  {which === 'on' ? 'everything on' : off.size === 0 ? 'your switches (all on)' : `${off.size} ${what}${off.size === 1 ? '' : 's'} off`}
                </div>
                <div style={{ ...mono, whiteSpace: 'pre-wrap', padding: '0.5rem', background: '#f9fafb', borderRadius: '6px', minHeight: '4.5em' }}>
                  <span style={{ color: '#9ca3af' }}>{text.length > 24 ? '…' + text.slice(-24) : text}</span>
                  <strong>{written[which]}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={note}>Both always take the biggest slice, so the only difference between them is your switches.</div>
      </div>
    </div>
  );
}
