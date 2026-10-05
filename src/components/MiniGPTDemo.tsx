'use client';

// Live demo: the trained MiniGPT exhibit model running in the reader's browser.
// Readers type text and see the next-letter chances as a wheel they can spin, the
// attention for any block and head, and what the machine would guess if
// it stopped early.

import React from 'react';
import { MiniGPTEngine, MiniGPTManifest, ForwardResult, adjustChances, spinWheel } from '@/lib/minigptEngine';

const BASE = '/minigpt-demo/';
const HEAD_COLOURS = ['#2563eb', '#7c3aed', '#059669', '#d97706'];
const SLICE_COLOURS = ['#2563eb', '#7c3aed', '#059669', '#d97706', '#dc2626', '#0891b2', '#db2777', '#65a30d'];
const GREYS = ['#e5e7eb', '#d1d5db'];
const SPIN_MS = 2200;
const GRID_LETTERS = 16;

function show(ch: string): string {
  if (ch === ' ') return '␣';
  if (ch === '\n') return '↵';
  return ch;
}

function topK(probs: Float32Array, k: number): number[] {
  return Array.from(probs.keys())
    .sort((a, b) => probs[b] - probs[a])
    .slice(0, k);
}

interface Slice {
  id: number;
  start: number;
  end: number;
  colour: string;
}

// Slices run clockwise from the top, biggest first. Letters under 2.5% are grey.
function slicesFor(chances: Float32Array): Slice[] {
  const order = Array.from(chances.keys())
    .filter((i) => chances[i] > 0)
    .sort((a, b) => chances[b] - chances[a]);
  const slices: Slice[] = [];
  let angle = 0;
  order.forEach((id, k) => {
    const span = chances[id] * 360;
    const colour = chances[id] >= 0.025 && k < SLICE_COLOURS.length ? SLICE_COLOURS[k] : GREYS[k % 2];
    slices.push({ id, start: angle, end: angle + span, colour });
    angle += span;
  });
  return slices;
}

function point(r: number, angle: number): [number, number] {
  const a = (angle * Math.PI) / 180;
  return [r * Math.sin(a), -r * Math.cos(a)];
}

function Wheel({ chances, chars, rotation, spinning }: { chances: Float32Array; chars: string[]; rotation: number; spinning: boolean }) {
  const R = 100;
  const slices = slicesFor(chances);
  return (
    <svg viewBox="-115 -125 230 240" width="230" height="240" role="img" aria-label="The wheel of chances for the next letter">
      <g style={{ transform: `rotate(${rotation}deg)`, transition: spinning ? `transform ${SPIN_MS}ms cubic-bezier(.12,.75,.18,1)` : 'none' }}>
        {slices.map((sl) => {
          const span = sl.end - sl.start;
          if (span >= 359.99) return <circle key={sl.id} r={R} fill={sl.colour} />;
          const [x0, y0] = point(R, sl.start);
          const [x1, y1] = point(R, sl.end);
          return (
            <path
              key={sl.id}
              d={`M0,0 L${x0.toFixed(2)},${y0.toFixed(2)} A${R},${R} 0 ${span > 180 ? 1 : 0} 1 ${x1.toFixed(2)},${y1.toFixed(2)} Z`}
              fill={sl.colour}
              stroke="#fff"
              strokeWidth={span >= 9 ? 1.5 : 0.3}
            />
          );
        })}
        {slices
          .filter((sl) => sl.end - sl.start >= 14)
          .map((sl) => {
            const mid = (sl.start + sl.end) / 2;
            const [x, y] = point(R * 0.68, mid);
            // Turned with its slice: upright at 12 o'clock, upside down at 6 o'clock.
            return (
              <text key={sl.id} x={x} y={y + 5} transform={`rotate(${mid.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)})`} textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff" style={mono}>
                {show(chars[sl.id])}
              </text>
            );
          })}
      </g>
      <path d={`M-10,${-R - 16} L10,${-R - 16} L0,${-R + 4} Z`} fill="#111827" stroke="#fff" strokeWidth="2" />
      <circle r="8" fill="#fff" stroke="#111827" strokeWidth="2" />
    </svg>
  );
}

const panel: React.CSSProperties = {
  border: '1px solid #e5e7eb',
  borderRadius: '10px',
  padding: '1rem 1.25rem',
  background: '#ffffff',
  marginBottom: '1rem',
};
const label: React.CSSProperties = { fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' };
const mono: React.CSSProperties = { fontFamily: 'ui-monospace, Menlo, Consolas, monospace' };

export default function MiniGPTDemo() {
  const [engine, setEngine] = React.useState<MiniGPTEngine | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [text, setText] = React.useState('KING RICHARD III:\nA horse! a horse! my kingdom for a hors');
  const [temperature, setTemperature] = React.useState(1);
  const [topP, setTopP] = React.useState(1);
  const [block, setBlock] = React.useState(0);
  const [head, setHead] = React.useState(0);
  const [writing, setWriting] = React.useState(false);
  const [spinning, setSpinning] = React.useState(false);
  const [rotation, setRotation] = React.useState(0);
  const stopRef = React.useRef(false);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [m, w] = await Promise.all([
          fetch(`${BASE}manifest.json`).then((r) => r.json() as Promise<MiniGPTManifest>),
          fetch(`${BASE}weights.bin`).then((r) => r.arrayBuffer()),
        ]);
        if (!cancelled) setEngine(new MiniGPTEngine(m, w));
      } catch {
        if (!cancelled) setError('The model could not be loaded.');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
    () => (result ? adjustChances(result.logits, temperature, topP) : null),
    [result, temperature, topP]
  );

  const addLetter = React.useCallback(
    (current: string): string | null => {
      if (!engine) return null;
      const r = engine.forward(engine.encode(current));
      const p = adjustChances(r.logits, temperature, topP);
      return current + engine.manifest.chars[spinWheel(p)];
    },
    [engine, temperature, topP]
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
    const slice = slicesFor(chances).find((sl) => sl.id === id);
    if (!slice) return;
    const mid = (slice.start + slice.end) / 2;
    setSpinning(true);
    setRotation(4 * 360 + ((360 - mid) % 360));
    // Hold on the winning slice for a moment, then show the next letter's new wheel at rest.
    window.setTimeout(() => {
      setText((t) => t + engine.manifest.chars[id]);
      setSpinning(false);
      setRotation(0);
    }, SPIN_MS + 700);
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
            Keep slices up to (top-p): <strong>{topP >= 1 ? 'all' : `${Math.round(topP * 100)}%`}</strong>
            <input type="range" min={0.5} max={1} step={0.05} value={topP} onChange={(e) => setTopP(Number(e.target.value))} style={{ display: 'block', width: '180px' }} />
          </label>
        </div>
        {chances && (
          <div className="d-flex flex-wrap align-items-center" style={{ gap: '1.5rem' }}>
            <Wheel chances={chances} chars={chars} rotation={rotation} spinning={spinning} />
            <div>
              {topK(chances, 8).map((i) => (
                <div key={i} className="d-flex align-items-center" style={{ gap: '0.5rem', marginBottom: '2px' }}>
                  <span style={{ ...mono, width: '1.5rem', textAlign: 'right', fontWeight: 700 }}>{show(chars[i])}</span>
                  <span style={{ fontSize: '0.85rem' }}>{(chances[i] * 100).toFixed(1)}%</span>
                </div>
              ))}
              <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.4rem', maxWidth: '16rem' }}>
                Each letter gets a slice as big as its chance. Grey slices are letters under 2.5%.
              </div>
            </div>
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
