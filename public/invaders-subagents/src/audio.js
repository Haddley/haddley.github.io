// AudioManager singleton. All sound is synthesized via the Web Audio API (no files).
import { MARCH_BEAT_MS } from './constants.js';

class AudioManager {
  constructor() {
    this.ctx = null;
    this.ufoNodes = null; // { osc, lfo, gain } while the UFO loop is running
    this._boundUnlock = () => this._unlock();
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this._boundUnlock, { once: true });
      window.addEventListener('pointerdown', this._boundUnlock, { once: true });
    }
  }

  _unlock() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  _now() {
    return this.ctx ? this.ctx.currentTime : 0;
  }

  _osc(type, freq0, freq1, durMs, vol = 0.1) {
    if (!this.ctx) return;
    const t = this._now();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq0, t);
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, freq1), t + durMs / 1000);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + durMs / 1000);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + durMs / 1000 + 0.02);
  }

  _noise(durMs, filterType, filterFreq, vol = 0.15) {
    if (!this.ctx) return;
    const t = this._now();
    const length = Math.max(1, Math.floor(this.ctx.sampleRate * (durMs / 1000)));
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = filterFreq;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + durMs / 1000);
    src.connect(filter).connect(gain).connect(this.ctx.destination);
    src.start(t);
  }

  shoot() {
    this._osc('square', 800, 200, 150, 0.12);
  }

  alienDeath() {
    this._noise(350, 'bandpass', 600, 0.18);
  }

  playerDeath() {
    this._noise(900, 'lowpass', 600, 0.22);
  }

  march(step) {
    const notes = [320, 260, 220, 190];
    this._osc('square', notes[step % notes.length], notes[step % notes.length], MARCH_BEAT_MS, 0.08);
  }

  ufoStart() {
    if (!this.ctx || this.ufoNodes) return;
    const t = this._now();
    const osc = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 400;
    lfo.type = 'sine';
    lfo.frequency.value = 8;
    lfoGain.gain.value = 120;
    lfo.connect(lfoGain).connect(osc.frequency);
    gain.gain.value = 0.06;
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(t);
    lfo.start(t);
    this.ufoNodes = { osc, lfo, gain };
  }

  ufoStop() {
    if (!this.ufoNodes) return;
    const { osc, lfo } = this.ufoNodes;
    try {
      osc.stop();
      lfo.stop();
    } catch (e) {
      /* already stopped */
    }
    this.ufoNodes = null;
  }

  ufoDeath() {
    this._osc('square', 700, 80, 500, 0.12);
  }
}

export const AudioManagerInstance = new AudioManager();
export default AudioManagerInstance;
