export class AudioManager {
  constructor() {
    this.ctx = null;
    this.marchStep = 0;
    this.marchFreqs = [320, 260, 220, 190];
    this.marchInterval = null;
    this.ufoSource = null;
    this.ufoGain = null;
    this._marchInterval = null;
  }

  unlock() {
    if (this.ctx) return;
    this.ctx = new AudioContext();
  }

  _noise(duration, filterType, filterFreq, gain = 0.3) {
    if (!this.ctx) return;
    const bufSize = Math.ceil(this.ctx.sampleRate * duration);
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

    const src = this.ctx.createBufferSource();
    src.buffer = buf;

    const filter = this.ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = filterFreq;

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(gain, this.ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    src.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    src.start();
    src.stop(this.ctx.currentTime + duration);
  }

  _osc(type, startFreq, endFreq, duration, gain = 0.2) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
    if (endFreq !== startFreq) {
      osc.frequency.exponentialRampToValueAtTime(endFreq, this.ctx.currentTime + duration);
    }
    gainNode.gain.setValueAtTime(gain, this.ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  shoot() { this._osc('square', 800, 200, 0.15); }
  alienDie() { this._noise(0.35, 'bandpass', 600); }
  playerDie() { this._noise(0.9, 'lowpass', 600, 0.4); }
  ufoDie() { this._osc('square', 700, 80, 0.5); }

  startMarch(aliveCount, totalCount) {
    this.stopMarch();
    const interval = Math.max(100, Math.round(800 * aliveCount / totalCount));
    this._marchInterval = interval;
    this.marchInterval = setInterval(() => {
      if (!this.ctx) return;
      const freq = this.marchFreqs[this.marchStep % 4];
      this._osc('square', freq, freq, 0.08, 0.15);
      this.marchStep++;
    }, interval);
  }

  stopMarch() {
    if (this.marchInterval) {
      clearInterval(this.marchInterval);
      this.marchInterval = null;
    }
  }

  updateMarchTempo(aliveCount, totalCount) {
    const interval = Math.max(100, Math.round(800 * aliveCount / totalCount));
    if (interval !== this._marchInterval) {
      this._marchInterval = interval;
      this.startMarch(aliveCount, totalCount);
    }
  }

  startUfo() {
    if (!this.ctx || this.ufoSource) return;
    const osc = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.value = 400;
    lfo.type = 'sine';
    lfo.frequency.value = 8;
    lfoGain.gain.value = 120;
    gain.gain.value = 0.15;

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    lfo.start();
    osc.start();
    this.ufoSource = osc;
    this.ufoGain = gain;
    this._ufoLfo = lfo;
  }

  stopUfo() {
    if (this.ufoSource) {
      try { this.ufoSource.stop(); } catch {}
      try { this._ufoLfo.stop(); } catch {}
      this.ufoSource = null;
      this.ufoGain = null;
      this._ufoLfo = null;
    }
  }
}

export const audio = new AudioManager();
