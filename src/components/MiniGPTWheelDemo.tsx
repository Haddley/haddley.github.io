'use client';

// The first, simpler live demo in MiniGPT (Part 1): only what the post has explained by that point.
// The reader edits the text, sees the model's wheel of chances for the next letter, and spins it,
// once or ten times in a row. With `settings`, it also has temperature and top-k sliders, which
// reshape the wheel before it spins. With `scores` as well, a table shows each step of the reshaping,
// from the model's scores (logits) to the chances. No top-p or attention yet.

import React from 'react';
import { adjustChances, spinWheel } from '@/lib/minigptEngine';
import { ChanceList, TextBox, Wheel, label, mono, panel, restRotation, rotationFor, show, signed, topK, useMiniGPTEngine } from './minigptShared';

const START_TEXT = 'go';
const ONE_SPIN_MS = 2200;   // a single spin, slow enough to watch
const QUICK_SPIN_MS = 900;  // each spin when writing ten letters in a row
const HOLD_MS = 450;        // pause on the winning slice before the next wheel appears

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const START_TEMPERATURE = 1;

const cell: React.CSSProperties = { padding: '2px 8px', textAlign: 'right', whiteSpace: 'nowrap' };

// Each step from the scores to the chances, for the letters with the biggest scores: the score (logit),
// the score divided by the temperature, whether top-k keeps it, and the chance after softmax.
function ScoreTable({ logits, chances, temperature, k, chars }: { logits: Float32Array; chances: Float32Array; temperature: number; k: number; chars: string[] }) {
  const rows = topK(logits, 6);
  const kept = new Set(topK(logits, k));
  const greedy = temperature <= 0.01;
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ ...mono, fontSize: '0.8rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #d1d5db', fontFamily: 'inherit' }}>
            <th style={{ ...cell, textAlign: 'center' }}></th>
            <th style={cell}>score</th>
            <th style={cell}>{greedy ? '÷ 0' : `÷ ${temperature.toFixed(1)}`}</th>
            <th style={cell}>top-k</th>
            <th style={cell}>chance</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((i) => (
            <tr key={i}>
              <td style={{ ...cell, textAlign: 'center', fontWeight: 700 }}>{show(chars[i])}</td>
              <td style={cell}>{signed(logits[i], 3)}</td>
              <td style={cell}>{greedy ? '—' : signed(logits[i] / temperature, 3)}</td>
              <td style={cell}>{greedy ? '—' : kept.has(i) ? 'kept' : 'cut'}</td>
              <td style={{ ...cell, fontWeight: 700 }}>{(chances[i] * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.4rem', maxWidth: '22rem' }}>
        The six biggest of the 65 scores. {greedy ? 'At temperature 0, the biggest score simply takes the whole wheel. ' : ''}
        Same text and same settings always give the same numbers: only the spin is left to chance.
      </div>
    </div>
  );
}

export default function MiniGPTWheelDemo({ settings = false, scores = false }: { settings?: boolean; scores?: boolean }) {
  const { engine, error } = useMiniGPTEngine();
  const [text, setText] = React.useState(START_TEXT);
  const [spinning, setSpinning] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [spinTo, setSpinTo] = React.useState<number | null>(null);
  const [durationMs, setDurationMs] = React.useState(ONE_SPIN_MS);
  const [landed, setLanded] = React.useState<string | null>(null);
  const [temperature, setTemperature] = React.useState(START_TEMPERATURE);
  const [topKSetting, setTopKSetting] = React.useState(65);
  const stopRef = React.useRef(false);

  const ids = React.useMemo(() => (engine ? engine.encode(text) : []), [engine, text]);
  const unknown = React.useMemo(
    () => (engine ? Array.from(new Set(Array.from(text).filter((c) => !engine.knows(c)))) : []),
    [engine, text]
  );
  // The model's chances for the next letter: the slices of this text's wheel.
  // With the sliders, temperature and top-k reshape the wheel first; without them, it is the plain softmax.
  const wheelFor = React.useCallback(
    (logits: Float32Array, probs: Float32Array) => (settings ? adjustChances(logits, temperature, 1, topKSetting) : probs),
    [settings, temperature, topKSetting]
  );
  const logits = React.useMemo(() => (engine && ids.length > 0 ? engine.forward(ids).logits : null), [engine, ids]);
  const chances = React.useMemo(() => {
    if (!engine || ids.length === 0) return null;
    const r = engine.forward(ids);
    return wheelFor(r.logits, r.probs);
  }, [engine, ids, wheelFor]);

  // Spin the wheel for the current text, wait for it to stop, and add the winning letter.
  const spin = async (current: string, ms: number): Promise<string | null> => {
    if (!engine) return null;
    const r = engine.forward(engine.encode(current));
    const p = wheelFor(r.logits, r.probs);
    const id = spinWheel(p);
    const letter = engine.manifest.chars[id];
    setDurationMs(ms);
    setSpinning(true);
    setSpinTo(rotationFor(p, id));
    await sleep(ms + HOLD_MS);
    setLanded(letter);
    setSpinning(false);
    setSpinTo(null);
    setText(current + letter);
    return current + letter;
  };

  const spinOnce = async () => {
    if (busy || !chances) return;
    setBusy(true);
    await spin(text, ONE_SPIN_MS);
    setBusy(false);
  };

  const spinTen = async () => {
    if (busy || !chances) return;
    setBusy(true);
    stopRef.current = false;
    let current: string | null = text;
    for (let i = 0; i < 10 && current !== null && !stopRef.current; i++) {
      current = await spin(current, QUICK_SPIN_MS);
      await sleep(150); // let the new wheel appear before the next spin
    }
    setBusy(false);
  };

  const reset = () => {
    setText(START_TEXT);
    setLanded(null);
    setTemperature(START_TEMPERATURE);
    setTopKSetting(65);
  };

  if (error) return <div style={panel}>{error}</div>;
  if (!engine) return <div style={panel}>Loading my trained MiniGPT (3.3 MB)…</div>;

  const chars = engine.manifest.chars;

  return (
    <div className="minigpt-demo mbr-fonts-style" style={{ fontSize: '0.95rem' }}>
      <div style={panel}>
        <div style={label}>The text so far (only the 65 letters in Tiny Shakespeare count)</div>
        <TextBox
          value={text}
          onChange={(t) => {
            setText(t);
            setLanded(null);
          }}
          limit={engine.manifest.block_size}
          disabled={busy}
        />
        {unknown.length > 0 && (
          <div style={{ color: '#b45309', fontSize: '0.85rem' }}>
            The model does not know {unknown.map(show).join(' ')}, so it skips {unknown.length === 1 ? 'it' : 'them'}.
          </div>
        )}
        <div className="d-flex flex-wrap gap-2 mt-2">
          <button type="button" className="btn btn-sm btn-primary" disabled={busy || !chances} onClick={spinOnce}>
            Spin the wheel once
          </button>
          <button type="button" className="btn btn-sm btn-primary" disabled={busy || !chances} onClick={spinTen}>
            Spin ten times
          </button>
          {busy && (
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => (stopRef.current = true)}>
              Stop
            </button>
          )}
          <button type="button" className="btn btn-sm btn-outline-secondary" disabled={busy} onClick={reset}>
            {settings ? 'Reset' : <>Reset to &ldquo;go&rdquo;</>}
          </button>
        </div>
      </div>

      <div style={panel}>
        {settings && (
          <div className="d-flex flex-wrap mb-3" style={{ fontSize: '0.85rem', columnGap: '2rem', rowGap: '0.75rem' }}>
            <label>
              Temperature: <strong>{temperature.toFixed(1)}</strong>
              {temperature <= 0.01 ? ' (always the biggest slice)' : ''}
              <input type="range" min={0} max={2} step={0.1} value={temperature} disabled={busy} onChange={(e) => setTemperature(Number(e.target.value))} style={{ display: 'block', width: '200px' }} />
            </label>
            <label>
              Top-k, keep the biggest: <strong>{topKSetting >= 65 ? 'all 65' : topKSetting}</strong>
              <input type="range" min={1} max={65} step={1} value={topKSetting} disabled={busy} onChange={(e) => setTopKSetting(Number(e.target.value))} style={{ display: 'block', width: '200px' }} />
            </label>
          </div>
        )}
        <div style={label}>
          The wheel for the next letter after &ldquo;<span style={mono}>{text.length > 24 ? '…' + text.slice(-24) : text}</span>&rdquo;
        </div>
        {chances ? (
          <div className="d-flex flex-wrap align-items-center" style={{ gap: '1.5rem' }}>
            <Wheel chances={chances} chars={chars} rotation={spinTo ?? restRotation(chances)} spinning={spinning} durationMs={durationMs} />
            <div style={{ flex: scores ? '0 1 22rem' : '0 1 17rem', maxWidth: scores ? '22rem' : '17rem' }}>
              {scores && logits ? (
                <ScoreTable logits={logits} chances={chances} temperature={temperature} k={topKSetting} chars={chars} />
              ) : (
                <ChanceList chances={chances} chars={chars} k={6} />
              )}
              {/* Space for the message is always kept, so the layout does not jump as it comes and goes. */}
              <div style={{ marginTop: '0.6rem', fontSize: '0.9rem', minHeight: '2.8em', visibility: landed !== null && !spinning ? 'visible' : 'hidden' }}>
                The pointer landed on <strong style={mono}>{show(landed ?? ' ')}</strong>, so the model wrote it, and made a new wheel.
              </div>
            </div>
          </div>
        ) : (
          <div style={{ color: '#6b7280' }}>Type at least one letter to see its wheel.</div>
        )}
      </div>
    </div>
  );
}
