'use client';

// Live demo: the trained MiniGPT exhibit model running in the reader's browser.
// Readers type text and see the next-letter chances as a wheel they can spin, the
// attention for any block and head, and what the machine would guess if
// it stopped early.

import React from 'react';
import { ForwardResult, adjustChances, spinWheel } from '@/lib/minigptEngine';
import { ChanceList, SPIN_MS, Wheel, label, mono, panel, rotationFor, show, topK, useMiniGPTEngine } from './minigptShared';

const HEAD_COLOURS = ['#2563eb', '#7c3aed', '#059669', '#d97706'];
const GRID_LETTERS = 16;

const START_TEXT = 'KING RICHARD III:\nA horse! a horse! my kingdom for a hors';

export default function MiniGPTDemo() {
  const { engine, error } = useMiniGPTEngine();
  const [text, setText] = React.useState(START_TEXT);
  const [temperature, setTemperature] = React.useState(1);
  const [topP, setTopP] = React.useState(1);
  const [topKSetting, setTopKSetting] = React.useState(65);
  const [block, setBlock] = React.useState(0);
  const [head, setHead] = React.useState(0);
  const [writing, setWriting] = React.useState(false);
  const [spinning, setSpinning] = React.useState(false);
  const [rotation, setRotation] = React.useState(0);
  const stopRef = React.useRef(false);

  const ids = React.useMemo(() => (engine ? engine.encode(text) : []), [engine, text]);
  const unknown = React.useMemo(
    () => (engine ? Array.from(new Set(Array.from(text).filter((c) => !engine.knows(c)))) : []),
    [engine, text]
  );
  const result: ForwardResult | null = React.useMemo(
    () => (engine && ids.length > 0 ? engine.forward(ids) : null),
    [engine, ids]
  );
  const chances = React.useMemo(
    () => (result ? adjustChances(result.logits, temperature, topP, topKSetting) : null),
    [result, temperature, topP, topKSetting]
  );

  const addLetter = React.useCallback(
    (current: string): string | null => {
      if (!engine) return null;
      const r = engine.forward(engine.encode(current));
      const p = adjustChances(r.logits, temperature, topP, topKSetting);
      return current + engine.manifest.chars[spinWheel(p)];
    },
    [engine, temperature, topP, topKSetting]
  );

  const write = async (n: number) => {
    if (!engine || writing) return;
    setWriting(true);
    stopRef.current = false;
    let current = text;
    for (let i = 0; i < n && !stopRef.current; i++) {
      const next = addLetter(current);
      if (next === null) break;
      current = next;
      setText(current);
      await new Promise((r) => setTimeout(r, 0));
    }
    setWriting(false);
  };

  // Spin the wheel on screen, and only add the letter once it stops under the pointer.
  const spinOnce = () => {
    if (!engine || !chances || writing || spinning) return;
    const id = spinWheel(chances);
    setSpinning(true);
    setRotation(rotationFor(chances, id));
    // Hold on the winning slice for a moment, then show the next letter's new wheel at rest.
    window.setTimeout(() => {
      setText((t) => t + engine.manifest.chars[id]);
      setSpinning(false);
      setRotation(0);
    }, SPIN_MS + 700);
  };

  // Back to the starting line and the wheel as it is.
  const reset = () => {
    setText(START_TEXT);
    setTemperature(1);
    setTopP(1);
    setTopKSetting(65);
  };

  if (error) return <div style={panel}>{error}</div>;
  if (!engine) return <div style={panel}>Loading my trained MiniGPT (3.3 MB)…</div>;

  const chars = engine.manifest.chars;
  const T = Math.min(ids.length, engine.manifest.block_size);
  const shownIds = ids.slice(-T);
  const gridStart = Math.max(0, T - GRID_LETTERS);
  const A = result ? result.attention[block][head] : null;
  const colour = HEAD_COLOURS[head];

  return (
    <div className="minigpt-demo mbr-fonts-style" style={{ fontSize: '0.95rem' }}>
      <div style={panel}>
        <div style={label}>Type some text (only the 65 letters in Tiny Shakespeare count)</div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          spellCheck={false}
          style={{ ...mono, width: '100%', fontSize: '1rem', padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
        />
        {unknown.length > 0 && (
          <div style={{ color: '#b45309', fontSize: '0.85rem' }}>
            The machine has no card for {unknown.map(show).join(' ')}, so it skips {unknown.length === 1 ? 'it' : 'them'}.
          </div>
        )}
        {ids.length > engine.manifest.block_size && (
          <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>
            Only the last {engine.manifest.block_size} letters fit in its positions; the machine cannot see anything earlier.
          </div>
        )}
        <div className="d-flex flex-wrap gap-2 mt-2">
          <button type="button" className="btn btn-sm btn-primary" disabled={writing || spinning || ids.length === 0} onClick={spinOnce}>
            Spin the wheel once
          </button>
          <button type="button" className="btn btn-sm btn-primary" disabled={writing || spinning || ids.length === 0} onClick={() => write(200)}>
            Write 200 letters
          </button>
          <button type="button" className="btn btn-sm btn-outline-secondary" disabled={writing || spinning} onClick={reset}>
            Reset
          </button>
          {writing && (
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => (stopRef.current = true)}>
              Stop
            </button>
          )}
        </div>
      </div>

      <div style={panel}>
        <div style={label}>Steps 4 and 5: the chances for the next letter, and the wheel</div>
        <div className="d-flex flex-wrap gap-4 mb-2" style={{ fontSize: '0.85rem' }}>
          <label>
            Temperature: <strong>{temperature.toFixed(1)}</strong>
            <input type="range" min={0} max={2} step={0.1} value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} style={{ display: 'block', width: '180px' }} />
          </label>
          <label>
            Keep the biggest k slices (top-k): <strong>{topKSetting >= 65 ? 'all' : topKSetting}</strong>
            <input type="range" min={1} max={65} step={1} value={topKSetting} onChange={(e) => setTopKSetting(Number(e.target.value))} style={{ display: 'block', width: '180px' }} />
          </label>
          <label>
            Keep slices up to (top-p): <strong>{topP >= 1 ? 'all' : `${Math.round(topP * 100)}%`}</strong>
            <input type="range" min={0.5} max={1} step={0.05} value={topP} onChange={(e) => setTopP(Number(e.target.value))} style={{ display: 'block', width: '180px' }} />
          </label>
        </div>
        {chances && (
          <div className="d-flex flex-wrap align-items-center" style={{ gap: '1.5rem' }}>
            <Wheel chances={chances} chars={chars} rotation={rotation} spinning={spinning} />
            <ChanceList chances={chances} chars={chars} />
          </div>
        )}
      </div>

      <div style={panel}>
        <div style={label}>Step 3: inside attention</div>
        <div className="d-flex flex-wrap gap-3 mb-2" style={{ fontSize: '0.85rem' }}>
          <span>
            Block:{' '}
            {[0, 1, 2, 3].map((b) => (
              <button key={b} type="button" className={`btn btn-sm ${b === block ? 'btn-dark' : 'btn-outline-secondary'}`} style={{ marginRight: '4px' }} onClick={() => setBlock(b)}>
                {b + 1}
              </button>
            ))}
          </span>
          <span>
            Head:{' '}
            {[0, 1, 2, 3].map((h) => (
              <button key={h} type="button" className="btn btn-sm" style={{ marginRight: '4px', background: h === head ? HEAD_COLOURS[h] : '#fff', color: h === head ? '#fff' : HEAD_COLOURS[h], border: `1px solid ${HEAD_COLOURS[h]}` }} onClick={() => setHead(h)}>
                {h + 1}
              </button>
            ))}
          </span>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>
          The last {T - gridStart} positions. Each row is a working card, labelled with the letter it started from; the bigger the dot, the more attention it gives the working card above.
        </div>
        {A && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', ...mono }}>
              <thead>
                <tr>
                  <th />
                  {shownIds.slice(gridStart).map((id, j) => (
                    <th key={j} style={{ width: '20px', textAlign: 'center', fontSize: '0.8rem' }}>{show(chars[id])}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shownIds.slice(gridStart).map((id, ii) => {
                  const i = gridStart + ii;
                  return (
                    <tr key={ii}>
                      <th style={{ textAlign: 'right', paddingRight: '4px', fontSize: '0.8rem' }}>{show(chars[id])}</th>
                      {shownIds.slice(gridStart).map((_, jj) => {
                        const j = gridStart + jj;
                        if (j > i) return <td key={jj} style={{ width: '20px', height: '20px', background: '#f3f4f6', border: '1px solid #fff' }} />;
                        const w = A[i * T + j];
                        const r = Math.max(1, 8 * Math.sqrt(w));
                        return (
                          <td key={jj} title={`${(w * 100).toFixed(1)}%`} style={{ width: '20px', height: '20px', textAlign: 'center', padding: 0 }}>
                            <span style={{ display: 'inline-block', width: `${2 * r}px`, height: `${2 * r}px`, borderRadius: '50%', background: w >= 0.02 ? colour : '#d1d5db', opacity: 0.85, verticalAlign: 'middle' }} />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={panel}>
        <div style={label}>What it would guess if it stopped early</div>
        <div className="d-flex flex-wrap gap-3">
          {result &&
            result.earlyProbs.map((p, s) => (
              <div key={s} style={{ minWidth: '110px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151' }}>{s === 0 ? 'before block 1' : `after block ${s}`}</div>
                {topK(p, 3).map((i) => (
                  <div key={i} style={{ fontSize: '0.8rem' }}>
                    <span style={{ ...mono, fontWeight: 700 }}>{show(chars[i])}</span> {(p[i] * 100).toFixed(1)}%
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
