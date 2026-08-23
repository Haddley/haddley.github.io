// ---------------------------------------------------------------------------
// audio.js — AudioManager singleton. Every sound is synthesized at runtime
// with the Web Audio API; no audio files are used.
// ---------------------------------------------------------------------------

import { MARCH_NOTES, MARCH_NOTE_DURATION } from './constants.js';

class AudioManager {
  constructor() {
    this.ctx = null;
    this.ufoNodes = null; // { osc, lfo, gain } while the UFO loop plays
  }

  _ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }

  /** Call on first user interaction to satisfy autoplay policies. */
  unlock() {
    this._ensure();
  }

  /** Simple enveloped tone: type osc with an optional exponential sweep. */
  _tone({ type = 'square', f0, f1, dur, gain = 0.15, when = 0 }) {
    const ctx = this._ensure();
    if (!ctx) return;
    const t0 = ctx.currentTime + when;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(f0, t0);
    if (f1 !== undefined && f1 !== f0) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t0 + dur / 1000);
    }
    g.gain.setValueAtTime(gain, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur / 1000);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur / 1000 + 0.02);
  }

  /** Filtered white-noise burst. */
  _noise({ filterType = 'bandpass', freq, dur, gain = 0.3 }) {
    const ctx = this._ensure();
    if (!ctx) return;
    const t0 = ctx.currentTime;
    const len = Math.floor((ctx.sampleRate * dur) / 1000);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur / 1000);
    src.connect(filter);
    filter.connect(g);
    g.connect(ctx.destination);
    src.start(t0);
  }

  playShoot() {
    this._tone({ type: 'square', f0: 800, f1: 200, dur: 150, gain: 0.12 });
  }

  playAlienDeath() {
    this._noise({ filterType: 'bandpass', freq: 600, dur: 350, gain: 0.25 });
  }

  playPlayerDeath() {
    this._noise({ filterType: 'lowpass', freq: 600, dur: 900, gain: 0.3 });
  }

  playMarch(step) {
    const note = MARCH_NOTES[step % MARCH_NOTES.length];
    this._tone({ type: 'square', f0: note, dur: MARCH_NOTE_DURATION, gain: 0.08 });
  }

  playUfoDeath() {
    this._tone({ type: 'square', f0: 700, f1: 80, dur: 500, gain: 0.15 });
  }

  /** LFO-modulated sawtooth loop that plays while the UFO is on screen. */
  startUfo() {
    this.stopUfo();
    const ctx = this._ensure();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = 400;
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 8;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 120; // ±120 Hz wobble
    const g = ctx.createGain();
    g.gain.value = 0.05;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start();
    lfo.start();
    this.ufoNodes = { osc, lfo, g };
  }

  stopUfo() {
    if (!this.ufoNodes) return;
    const { osc, lfo, g } = this.ufoNodes;
    const t = this.ctx ? this.ctx.currentTime : 0;
    try {
      g.gain.setTargetAtTime(0, t, 0.05);
      osc.stop(t + 0.3);
      lfo.stop(t + 0.3);
    } catch (_) {
      /* already stopped */
    }
    this.ufoNodes = null;
  }
}

export const audio = new AudioManager();
