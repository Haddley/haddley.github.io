'use client';

// The first, simpler live demo in MiniGPT (Part 1): only what the post has explained by that point.
// The reader edits the text, sees the model's wheel of chances for the next letter, and spins it,
// once or ten times in a row. With `settings`, it also has temperature and top-k sliders, which
// reshape the wheel before it spins. No top-p or attention yet.

import React from 'react';
import { adjustChances, spinWheel } from '@/lib/minigptEngine';
import { ChanceList, TextBox, Wheel, label, mono, panel, restRotation, rotationFor, show, useMiniGPTEngine } from './minigptShared';

const START_TEXT = 'go';
const ONE_SPIN_MS = 2200;   // a single spin, slow enough to watch
const QUICK_SPIN_MS = 900;  // each spin when writing ten letters in a row
const HOLD_MS = 450;        // pause on the winning slice before the next wheel appears

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const START_TEMPERATURE = 1;

export default function MiniGPTWheelDemo({ settings = false }: { settings?: boolean }) {
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
            <div style={{ flex: '0 1 17rem', maxWidth: '17rem' }}>
              <ChanceList chances={chances} chars={chars} k={6} />
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
