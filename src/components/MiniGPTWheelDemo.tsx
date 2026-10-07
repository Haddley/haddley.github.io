'use client';

// The first, simpler live demo in MiniGPT (Part 1): only what the post has explained by that point.
// The reader edits the text, sees the model's wheel of chances for the next letter, and spins it,
// once or ten times in a row. No temperature, trimming, or attention yet.

import React from 'react';
import { spinWheel } from '@/lib/minigptEngine';
import { ChanceList, Wheel, label, mono, panel, restRotation, rotationFor, show, useMiniGPTEngine } from './minigptShared';

const START_TEXT = 'go';
const ONE_SPIN_MS = 2200;   // a single spin, slow enough to watch
const QUICK_SPIN_MS = 900;  // each spin when writing ten letters in a row
const HOLD_MS = 450;        // pause on the winning slice before the next wheel appears

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function MiniGPTWheelDemo() {
  const { engine, error } = useMiniGPTEngine();
  const [text, setText] = React.useState(START_TEXT);
  const [spinning, setSpinning] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [spinTo, setSpinTo] = React.useState<number | null>(null);
  const [durationMs, setDurationMs] = React.useState(ONE_SPIN_MS);
  const [landed, setLanded] = React.useState<string | null>(null);
  const stopRef = React.useRef(false);

  const ids = React.useMemo(() => (engine ? engine.encode(text) : []), [engine, text]);
  const unknown = React.useMemo(
    () => (engine ? Array.from(new Set(Array.from(text).filter((c) => !engine.knows(c)))) : []),
    [engine, text]
  );
  // The model's chances for the next letter: the slices of this text's wheel.
  const chances = React.useMemo(() => (engine && ids.length > 0 ? engine.forward(ids).probs : null), [engine, ids]);

  // Spin the wheel for the current text, wait for it to stop, and add the winning letter.
  const spin = async (current: string, ms: number): Promise<string | null> => {
    if (!engine) return null;
    const p = engine.forward(engine.encode(current)).probs;
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
  };

  if (error) return <div style={panel}>{error}</div>;
  if (!engine) return <div style={panel}>Loading my trained MiniGPT (3.3 MB)…</div>;

  const chars = engine.manifest.chars;

  return (
    <div className="minigpt-demo mbr-fonts-style" style={{ fontSize: '0.95rem' }}>
      <div style={panel}>
        <div style={label}>The text so far (only the 65 letters in Tiny Shakespeare count)</div>
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setLanded(null);
          }}
          disabled={busy}
          rows={2}
          spellCheck={false}
          style={{ ...mono, width: '100%', fontSize: '1rem', padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
        />
        {unknown.length > 0 && (
          <div style={{ color: '#b45309', fontSize: '0.85rem' }}>
            The model has no card for {unknown.map(show).join(' ')}, so it skips {unknown.length === 1 ? 'it' : 'them'}.
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
            Reset to &ldquo;go&rdquo;
          </button>
        </div>
      </div>

      <div style={panel}>
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
