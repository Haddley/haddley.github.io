'use client';

// Pieces shared by the MiniGPT demos: loading the exhibit model, and drawing the wheel of chances.

import React from 'react';
import { MiniGPTEngine, MiniGPTManifest } from '@/lib/minigptEngine';

export const BASE = '/minigpt-demo/';
export const SLICE_COLOURS = ['#2563eb', '#7c3aed', '#059669', '#d97706', '#dc2626', '#0891b2', '#db2777', '#65a30d'];
export const GREYS = ['#e5e7eb', '#d1d5db'];
export const SPIN_MS = 2200;

export const panel: React.CSSProperties = {
  border: '1px solid #e5e7eb',
  borderRadius: '10px',
  padding: '1rem 1.25rem',
  background: '#ffffff',
  marginBottom: '1rem',
};
export const label: React.CSSProperties = { fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' };
export const mono: React.CSSProperties = { fontFamily: 'ui-monospace, Menlo, Consolas, monospace' };

export function show(ch: string): string {
  if (ch === ' ') return '␣';
  if (ch === '\n') return '↵';
  return ch;
}

export function topK(probs: Float32Array, k: number): number[] {
  return Array.from(probs.keys())
    .sort((a, b) => probs[b] - probs[a])
    .slice(0, k);
}

export interface Slice {
  id: number;
  start: number;
  end: number;
  colour: string;
}

// Slices run clockwise from the top, biggest first. Letters under 2.5% are grey.
export function slicesFor(chances: Float32Array): Slice[] {
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

// The rotation that brings the middle of the biggest slice under the pointer, so the wheel
// rests with its most likely letter upright at the top.
export function restRotation(chances: Float32Array): number {
  const biggest = slicesFor(chances)[0];
  if (!biggest) return 0;
  return (360 - (biggest.start + biggest.end) / 2) % 360;
}

// The rotation that brings the middle of a letter's slice under the pointer, after four full turns.
export function rotationFor(chances: Float32Array, id: number): number {
  const slice = slicesFor(chances).find((sl) => sl.id === id);
  if (!slice) return 0;
  const mid = (slice.start + slice.end) / 2;
  return 4 * 360 + ((360 - mid) % 360);
}

function point(r: number, angle: number): [number, number] {
  const a = (angle * Math.PI) / 180;
  return [r * Math.sin(a), -r * Math.cos(a)];
}

export function Wheel({
  chances,
  chars,
  rotation,
  spinning,
  durationMs = SPIN_MS,
}: {
  chances: Float32Array;
  chars: string[];
  rotation: number;
  spinning: boolean;
  durationMs?: number;
}) {
  const R = 100;
  const slices = slicesFor(chances);
  return (
    <svg viewBox="-115 -125 230 240" width="230" height="240" role="img" aria-label="The wheel of chances for the next letter">
      <g style={{ transform: `rotate(${rotation}deg)`, transition: spinning ? `transform ${durationMs}ms cubic-bezier(.12,.75,.18,1)` : 'none' }}>
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

// The biggest slices, as a list, with what the rest share between them.
export function ChanceList({ chances, chars, k = 8 }: { chances: Float32Array; chars: string[]; k?: number }) {
  const top = topK(chances, k);
  const rest = 1 - top.reduce((sum, i) => sum + chances[i], 0);
  return (
    <div>
      {top.map((i) => (
        <div key={i} className="d-flex align-items-center" style={{ gap: '0.5rem', marginBottom: '2px' }}>
          <span style={{ ...mono, width: '1.5rem', textAlign: 'right', fontWeight: 700 }}>{show(chars[i])}</span>
          <span style={{ fontSize: '0.85rem' }}>{(chances[i] * 100).toFixed(1)}%</span>
        </div>
      ))}
      <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.4rem', maxWidth: '16rem' }}>
        The other {chances.length - top.length} letters share {(rest * 100).toFixed(1)}%. Each letter gets a slice as big as its chance; grey slices are letters under 2.5%.
      </div>
    </div>
  );
}

// Load the exhibit model once: about 3.3 MB of numbers, run in the reader's browser.
export function useMiniGPTEngine(): { engine: MiniGPTEngine | null; error: string | null } {
  const [engine, setEngine] = React.useState<MiniGPTEngine | null>(null);
  const [error, setError] = React.useState<string | null>(null);
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
  return { engine, error };
}
