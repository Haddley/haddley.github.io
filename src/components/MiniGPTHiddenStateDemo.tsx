'use client';

// A live demo for the lm_head section of MiniGPT (Part 1): text and the two hyperparameters go in,
// and the reader sees what comes out at each stage: the final hidden state (the last letter's hidden state,
// 128 numbers), lm_head's 65 scores, and the chances after temperature and top-k. The sliders only
// change the last stage, which is the point: they act after the model has done its work.

import React from 'react';
import { adjustChances } from '@/lib/minigptEngine';
import { Squares, TextBox, label, maxAbs, mono, panel, show, signed, topK, useMiniGPTEngine } from './minigptShared';

const START_TEXT = 'go';
const START_TEMPERATURE = 1;
const COLOUR_SCALE = 4; // a number this far from 0, either way, gets the strongest colour

const note: React.CSSProperties = { fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' };

const sign: React.CSSProperties = { fontSize: '1.4rem', fontWeight: 700, color: '#6b7280' };

// The average of a list's numbers, and their spread (standard deviation) around it.
function describe(values: Float32Array): string {
  const n = values.length;
  const mean = values.reduce((sum, v) => sum + v, 0) / n;
  const spread = Math.sqrt(values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / n);
  return `average ${signed(mean, 2)}, spread ${spread.toFixed(2)}`;
}

function Figure({ caption, children }: { caption: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ flex: '1 1 180px', maxWidth: '240px', minWidth: '180px' }}>
      {children}
      <div style={{ fontSize: '0.75rem', color: '#4b5563', marginTop: '0.3rem' }}>{caption}</div>
    </div>
  );
}

export default function MiniGPTHiddenStateDemo() {
  const { engine, error } = useMiniGPTEngine();
  const [text, setText] = React.useState(START_TEXT);
  const [temperature, setTemperature] = React.useState(START_TEMPERATURE);
  const [topKSetting, setTopKSetting] = React.useState(65);
  const [picked, setPicked] = React.useState<number | null>(null);

  const ids = React.useMemo(() => (engine ? engine.encode(text) : []), [engine, text]);
  const unknown = React.useMemo(
    () => (engine ? Array.from(new Set(Array.from(text).filter((c) => !engine.knows(c)))) : []),
    [engine, text]
  );
  // The model's work depends on the text only; the sliders never reach it.
  const result = React.useMemo(() => (engine && ids.length > 0 ? engine.forward(ids) : null), [engine, ids]);
  // Temperature and top-k act on lm_head's scores, after the model has done its work.
  const chances = React.useMemo(
    () => (result ? adjustChances(result.logits, temperature, 1, topKSetting) : null),
    [result, temperature, topKSetting]
  );

  // The letter being scored: the reader's pick, or else the biggest score for this text.
  const letter = picked ?? (result ? topK(result.logits, 1)[0] : 0);
  const lowest = result ? topK(result.logits.map((v) => -v), 1)[0] : 0;
  const row = engine && result ? engine.lmHeadRow(letter) : null;
  const products = React.useMemo(
    () => (row && result ? result.finalHidden.map((v, i) => v * row.weights[i]) : new Float32Array(0)),
    [row, result]
  );
  const total = products.reduce((sum, v) => sum + v, 0);
  const agree = products.filter((v) => v > 0).length;

  const reset = () => {
    setText(START_TEXT);
    setTemperature(START_TEMPERATURE);
    setTopKSetting(65);
    setPicked(null);
  };

  if (error) return <div style={panel}>{error}</div>;
  if (!engine) return <div style={panel}>Loading my trained MiniGPT (3.3 MB)…</div>;

  const chars = engine.manifest.chars;
  const shown = text.length > 24 ? '…' + text.slice(-24) : text;

  return (
    <div className="minigpt-demo mbr-fonts-style" style={{ fontSize: '0.95rem' }}>
      <div style={panel}>
        <div style={label}>Going in: the text so far</div>
        <TextBox value={text} onChange={setText} limit={engine.manifest.block_size} />
        {unknown.length > 0 && (
          <div style={{ color: '#b45309', fontSize: '0.85rem' }}>
            The model does not know {unknown.map(show).join(' ')}, so it skips {unknown.length === 1 ? 'it' : 'them'}.
          </div>
        )}
        <div style={{ ...label, marginTop: '0.9rem' }}>Going in: the hyperparameters</div>
        <div className="d-flex flex-wrap" style={{ fontSize: '0.85rem', columnGap: '2rem', rowGap: '0.75rem' }}>
          <label>
            Temperature: <strong>{temperature.toFixed(1)}</strong>
            {temperature <= 0.01 ? ' (always the biggest slice)' : ''}
            <input type="range" min={0} max={2} step={0.1} value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} style={{ display: 'block', width: '200px' }} />
          </label>
          <label>
            Top-k, keep the biggest: <strong>{topKSetting >= 65 ? 'all 65' : topKSetting}</strong>
            <input type="range" min={1} max={65} step={1} value={topKSetting} onChange={(e) => setTopKSetting(Number(e.target.value))} style={{ display: 'block', width: '200px' }} />
          </label>
        </div>
        <button type="button" className="btn btn-sm btn-outline-secondary mt-2" onClick={reset}>
          Reset
        </button>
      </div>

      {!result || !chances || !row ? (
        <div style={panel}>
          <span style={{ color: '#6b7280' }}>Type at least one letter to see what comes out.</span>
        </div>
      ) : (
        <>
          <div style={panel}>
            <div style={label}>Out of the blocks: the last letter&rsquo;s hidden state, and the final normalisation</div>
            <div className="d-flex flex-wrap align-items-center" style={{ gap: '0.75rem' }}>
              <Figure caption={<>the last letter&rsquo;s hidden state after &ldquo;<span style={mono}>{shown}</span>&rdquo;, as it comes out of block 4: {describe(result.lastCard)}</>}>
                <Squares values={result.lastCard} scale={COLOUR_SCALE} name="Number" />
              </Figure>
              <span style={sign}>→</span>
              <Figure caption={<>after the final normalisation, the final hidden state: {describe(result.finalHidden)}</>}>
                <Squares values={result.finalHidden} scale={COLOUR_SCALE} name="Number" />
              </Figure>
            </div>
            <div style={note}>
              Out of the blocks, the numbers are small, so the squares are pale. The final normalisation rescales them to average 0 and spread 1, then
              stretches and shifts each one by its own trained amount. The pattern stays much the same; the scale is what changes. The sliders do not
              change any of it.
            </div>
          </div>

          <div style={panel}>
            <div style={label}>
              Into <span style={mono}>lm_head</span>: scoring one letter
            </div>
            <div style={{ fontSize: '0.85rem', marginBottom: '0.4rem' }}>Pick a letter. The five biggest scores, and the lowest:</div>
            <div className="d-flex flex-wrap" style={{ gap: '0.4rem', marginBottom: '0.9rem' }}>
              {[...topK(result.logits, 5), lowest].map((i) => (
                <button
                  key={i}
                  type="button"
                  className={`btn btn-sm ${i === letter ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setPicked(i)}
                  style={{ ...mono, padding: '0.2rem 0.5rem' }}
                >
                  <strong style={{ marginRight: '0.45rem' }}>{show(chars[i])}</strong>
                  {signed(result.logits[i], 3)}
                </button>
              ))}
            </div>
            <div className="d-flex flex-wrap align-items-center" style={{ gap: '0.75rem' }}>
              <Figure caption="the final hidden state (changes with the text)">
                <Squares values={result.finalHidden} scale={COLOUR_SCALE} name="Number" />
              </Figure>
              <span style={sign}>×</span>
              <Figure caption={<><strong style={mono}>{show(chars[letter])}</strong>&rsquo;s row of <span style={mono}>lm_head</span> (fixed by training)</>}>
                <Squares values={row.weights} scale={maxAbs(row.weights)} name="Number" />
              </Figure>
              <span style={sign}>=</span>
              <Figure caption="number by number: blue where the two agree, orange where they do not">
                <Squares values={products} scale={maxAbs(products)} name="Product" />
              </Figure>
            </div>
            <div style={{ fontSize: '0.9rem', marginTop: '0.75rem' }}>
              Add up the 128 products: <strong style={mono}>{signed(total, 3)}</strong>. Add the bias for <strong style={mono}>{show(chars[letter])}</strong>,{' '}
              <span style={mono}>{signed(row.bias, 3)}</span>, and the score is <strong style={mono}>{signed(total + row.bias, 3)}</strong>.
            </div>
            <div style={note}>
              Each square is one of 128 numbers: blue above 0, orange below. With a mouse, hover over one to see it. {agree} of the 128 products are blue: the more the final hidden state matches a letter&rsquo;s row, the bigger that letter&rsquo;s score.
              lm_head does this for all 65 letters at once, and the sliders do not change any of it.
            </div>
          </div>

          <div style={panel}>
            <div style={label}>After temperature, top-k and softmax: the chances</div>
            {topK(chances, 5)
              .filter((i) => chances[i] > 0)
              .map((i) => (
                <div key={i} className="d-flex align-items-center" style={{ gap: '0.75rem', marginBottom: '2px' }}>
                  <span style={{ ...mono, width: '1.5rem', textAlign: 'right', fontWeight: 700 }}>{show(chars[i])}</span>
                  <span>{(chances[i] * 100).toFixed(1)}%</span>
                </div>
              ))}
            <div style={note}>This is the only part the sliders change.</div>
          </div>
        </>
      )}
    </div>
  );
}
