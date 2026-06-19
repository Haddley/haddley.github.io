import { MARCH_FREQ } from './constants.js';

class AudioManager {
  constructor() {
    this.ctx = null;
    this.marchIndex = 0;
    this.marchTimeout = null;
    this.ufoOscillator = null;
    this.ufoLFO = null;
    this.ufoGain = null;
  }

  unlock() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.ctx.resume();
  }

  _createNoiseBuffer(duration = 1) {
    const sr = this.ctx.sampleRate;
    const len = sr * duration;
    const buf = this.ctx.createBuffer(1, len, sr);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    return buf;
  }

  playerShoot() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.15);
  }

  alienDeath() {
    if (!this.ctx) return;
    const buf = this._createNoiseBuffer(0.35);
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 600;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    src.start(this.ctx.currentTime);
    src.stop(this.ctx.currentTime + 0.35);
  }

  playerDeath() {
    if (!this.ctx) return;
    const buf = this._createNoiseBuffer(0.9);
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.9);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.9);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    src.start(this.ctx.currentTime);
    src.stop(this.ctx.currentTime + 0.9);
  }

  startMarch(alive, total, cb) {
    this.stopMarch();
    this._scheduleMarchBeat(alive, total, cb);
  }

  _scheduleMarchBeat(alive, total, cb) {
    if (!this.ctx || alive <= 0) return;
    const interval = Math.max(100, 800 * (alive / total));
    this.marchTimeout = setTimeout(() => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = MARCH_FREQ[this.marchIndex % 4];
      this.marchIndex++;
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.08);
      cb && cb();
      this._scheduleMarchBeat(alive, total, cb);
    }, interval);
  }

  stopMarch() {
    if (this.marchTimeout) {
      clearTimeout(this.marchTimeout);
      this.marchTimeout = null;
    }
    this.marchIndex = 0;
  }

  startUFO() {
    this.stopUFO();
    if (!this.ctx) return;
    this.ufoOscillator = this.ctx.createOscillator();
    this.ufoLFO = this.ctx.createOscillator();
    this.ufoGain = this.ctx.createGain();
    const lfoGain = this.ctx.createGain();
    this.ufoOscillator.type = 'sawtooth';
    this.ufoOscillator.frequency.value = 400;
    this.ufoLFO.type = 'sine';
    this.ufoLFO.frequency.value = 8;
    lfoGain.gain.value = 120;
    this.ufoGain.gain.value = 0.2;
    this.ufoLFO.connect(lfoGain);
    lfoGain.connect(this.ufoOscillator.frequency);
    this.ufoOscillator.connect(this.ufoGain);
    this.ufoGain.connect(this.ctx.destination);
    this.ufoLFO.start(this.ctx.currentTime);
    this.ufoOscillator.start(this.ctx.currentTime);
  }

  stopUFO() {
    if (this.ufoOscillator) {
      try { this.ufoOscillator.stop(); } catch (e) {}
      this.ufoOscillator = null;
    }
    if (this.ufoLFO) {
      try { this.ufoLFO.stop(); } catch (e) {}
      this.ufoLFO = null;
    }
    this.ufoGain = null;
  }

  ufoDeath() {
    this.stopUFO();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(700, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.5);
  }
}

const audioManager = new AudioManager();
export default audioManager;
