// All sound synthesized at runtime via the Web Audio API — no audio files.
// The AudioContext is created lazily inside unlock() (first user interaction).
export class AudioManager {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.ufoOsc = null;
    this.ufoGain = null;
    this.ufoLfo = null;
    this.marchStep = 0;
    this.marchNotes = [320, 260, 220, 190]; // Hz (doubled from arcade 160/130/110/100)
  }

  unlock() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.2;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  _now() {
    return this.ctx.currentTime;
  }

  _noiseBuffer(seconds) {
    const buf = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * seconds), this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return buf;
  }

  shoot() {
    if (!this.ctx) return;
    const t = this._now();
    const osc = this.ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.15);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.5, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.connect(g);
    g.connect(this.master);
    osc.start(t);
    osc.stop(t + 0.16);
  }

  alienDeath() {
    if (!this.ctx) return;
    const t = this._now();
    const src = this.ctx.createBufferSource();
    src.buffer = this._noiseBuffer(0.35);
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 600;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.6, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    src.connect(bp);
    bp.connect(g);
    g.connect(this.master);
    src.start(t);
  }

  playerDeath() {
    if (!this.ctx) return;
    const t = this._now();
    const src = this.ctx.createBufferSource();
    src.buffer = this._noiseBuffer(0.9);
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 600;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.6, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
    src.connect(lp);
    lp.connect(g);
    g.connect(this.master);
    src.start(t);
  }

  march() {
    if (!this.ctx) return;
    const t = this._now();
    const osc = this.ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = this.marchNotes[this.marchStep];
    this.marchStep = (this.marchStep + 1) % this.marchNotes.length;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.25, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.connect(g);
    g.connect(this.master);
    osc.start(t);
    osc.stop(t + 0.09);
  }

  ufoStart() {
    if (!this.ctx) return;
    const t = this._now();
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = 400;
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 8;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 120;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    const g = this.ctx.createGain();
    g.gain.value = 0.12;
    osc.connect(g);
    g.connect(this.master);
    osc.start(t);
    lfo.start(t);
    this.ufoOsc = osc;
    this.ufoGain = g;
    this.ufoLfo = lfo;
  }

  ufoStop() {
    if (!this.ctx || !this.ufoOsc) return;
    const t = this._now();
    try {
      this.ufoGain.gain.setValueAtTime(this.ufoGain.gain.value, t);
      this.ufoGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      this.ufoOsc.stop(t + 0.06);
      this.ufoLfo.stop(t + 0.06);
    } catch (e) {
      // already stopped
    }
    this.ufoOsc = null;
    this.ufoGain = null;
    this.ufoLfo = null;
  }

  ufoDeath() {
    if (!this.ctx) return;
    const t = this._now();
    const osc = this.ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(700, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.5);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.5, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc.connect(g);
    g.connect(this.master);
    osc.start(t);
    osc.stop(t + 0.52);
  }
}

export const audio = new AudioManager();
