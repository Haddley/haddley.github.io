export class AudioManager {
  constructor() {
    this.ctx = null;
    this.ufoOscillator = null;
    this.ufoGain = null;
    this.ufoLfo = null;
    this.ufoLfoGain = null;
  }

  _ctx() {
    this.unlock();
    return this.ctx;
  }

  unlock() {
    if (typeof window !== "undefined" && !this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPlayerShoot() {
    const ctx = this._ctx();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
  }

  playAlienDeath() {
    const ctx = this._ctx();
    if (!ctx) return;

    // Create white noise buffer
    const bufferSize = Math.floor(ctx.sampleRate * 0.35);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    // Create filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 600;

    // Create gain
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    // Connect and play
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start(ctx.currentTime);
    source.stop(ctx.currentTime + 0.35);
  }

  playPlayerDeath() {
    const ctx = this._ctx();
    if (!ctx) return;

    // Create white noise buffer
    const bufferSize = Math.floor(ctx.sampleRate * 0.9);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    // Create filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600;

    // Create gain
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

    // Connect and play
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start(ctx.currentTime);
    source.stop(ctx.currentTime + 0.9);
  }

  playMarch(step) {
    const ctx = this._ctx();
    if (!ctx) return;

    const frequencies = [320, 260, 220, 190];
    const frequency = frequencies[step % frequencies.length];

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    gain.gain.setValueAtTime(1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.08);
  }

  startUfoLoop() {
    const ctx = this._ctx();
    if (!ctx || this.ufoOscillator) return;

    // Create LFO
    this.ufoLfo = ctx.createOscillator();
    this.ufoLfo.type = 'sine';
    this.ufoLfo.frequency.setValueAtTime(8, ctx.currentTime);

    // Create LFO gain for modulation
    this.ufoLfoGain = ctx.createGain();
    this.ufoLfoGain.gain.setValueAtTime(120, ctx.currentTime);

    // Create main oscillator
    this.ufoOscillator = ctx.createOscillator();
    this.ufoOscillator.type = 'sawtooth';
    this.ufoOscillator.frequency.setValueAtTime(400, ctx.currentTime);

    // Connect LFO to frequency modulation
    this.ufoLfo.connect(this.ufoLfoGain);
    this.ufoLfoGain.connect(this.ufoOscillator.frequency);

    // Create gain for volume control
    this.ufoGain = ctx.createGain();
    this.ufoGain.gain.setValueAtTime(0.3, ctx.currentTime);

    // Connect everything
    this.ufoOscillator.connect(this.ufoGain);
    this.ufoGain.connect(ctx.destination);

    // Start oscillators
    this.ufoOscillator.start(ctx.currentTime);
    this.ufoLfo.start(ctx.currentTime);
  }

  stopUfoLoop() {
    const ctx = this._ctx();
    if (!ctx || !this.ufoOscillator) return;

    this.ufoOscillator.stop(ctx.currentTime);
    this.ufoLfo.stop(ctx.currentTime);
    
    // Clean up references
    this.ufoOscillator = null;
    this.ufoGain = null;
    this.ufoLfo = null;
    this.ufoLfoGain = null;
  }

  playUfoDeath() {
    const ctx = this._ctx();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(700, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.5);

    gain.gain.setValueAtTime(1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);
  }
}

export const audio = new AudioManager();