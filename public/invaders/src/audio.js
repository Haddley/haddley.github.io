class AudioManager {
  constructor() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      this.ctx = null;
    }
    // Doubled from the classic 160/130/110/100 Hz originals so the fundamentals
    // are audible on laptop speakers (which roll off below ~200 Hz).
    this.marchNotes = [320, 260, 220, 190];
    this.ufoSource = null;
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  _ready() {
    return this.ctx && this.ctx.state === 'running';
  }

  // All scheduling uses currentTime + 0.05 so events always land in the future
  // relative to the audio thread's block position.
  _t() {
    return this.ctx.currentTime + 0.05;
  }

  playShoot() {
    if (!this._ready()) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.type = 'square';
    const t = this._t();
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.12);
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  playAlienDeath() {
    if (!this._ready()) return;
    const len = Math.floor(this.ctx.sampleRate * 0.35);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 600;
    filter.Q.value = 1;
    const gain = this.ctx.createGain();
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    const t = this._t();
    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    src.start(t);
    src.stop(t + 0.35);
  }

  playPlayerDeath() {
    if (!this._ready()) return;
    const len = Math.floor(this.ctx.sampleRate * 0.9);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600;
    const gain = this.ctx.createGain();
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    const t = this._t();
    gain.gain.setValueAtTime(0.6, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
    src.start(t);
    src.stop(t + 0.9);
  }

  playMarch(step) {
    if (!this._ready()) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.type = 'square';
    osc.frequency.value = this.marchNotes[step % 4];
    const t = this._t();
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.start(t);
    osc.stop(t + 0.08);
  }

  startUFO() {
    if (!this.ctx || this.ufoSource) return;
    const osc = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    const gain = this.ctx.createGain();
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.value = 400;
    lfo.type = 'sine';
    lfo.frequency.value = 8;
    lfoGain.gain.value = 120;
    gain.gain.value = 0.07;
    osc.start();
    lfo.start();
    this.ufoSource = { osc, lfo };
  }

  stopUFO() {
    if (!this.ufoSource) return;
    try { this.ufoSource.osc.stop(); } catch (e) {}
    try { this.ufoSource.lfo.stop(); } catch (e) {}
    this.ufoSource = null;
  }

  playUFODeath() {
    this.stopUFO();
    if (!this._ready()) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.type = 'square';
    const t = this._t();
    osc.frequency.setValueAtTime(700, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.5);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc.start(t);
    osc.stop(t + 0.5);
  }
}

export default new AudioManager();
