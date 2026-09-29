// All sound is synthesised with the Web Audio API. There are no audio files.
// Every public method is safe to call before unlock(): it simply does nothing.

const MARCH_FREQS = [320, 260, 220, 190];

export class AudioManager {
  constructor() {
    this.ctx = null;              // AudioContext, created by unlock()
    this.marchTimer = null;       // id returned by setInterval
    this.marchIntervalMs = 0;     // current beat length in ms
    this.marchStep = 0;           // which of the 4 notes plays next
    this.ufoOsc = null;           // UFO siren oscillator (null = silent)
    this.ufoLfo = null;           // UFO wobble oscillator
  }

  // Call on every keydown and click. Browsers only allow sound after a user gesture.
  unlock() {
    if (!this.ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      this.ctx = new Ctx();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  // Short burst of filtered white noise.
  _noise(duration, filterType, filterFreq, volume) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const size = Math.ceil(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, size, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = filterFreq;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);   // never ramp to 0

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    source.start(now);
    source.stop(now + duration);
  }

  // Short tone that slides from startFreq to endFreq.
  _tone(type, startFreq, endFreq, duration, volume) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(startFreq, now);
    if (endFreq !== startFreq) {
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);
    }
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }

  shoot()     { this._tone('square', 800, 200, 0.15, 0.2); }
  alienDie()  { this._noise(0.35, 'bandpass', 600, 0.3); }
  playerDie() { this._noise(0.9, 'lowpass', 600, 0.4); }
  ufoDie()    { this._tone('square', 700, 80, 0.5, 0.2); }

  // March beat: 800 ms with 50 aliens alive, down to 100 ms with 1 alive.
  static marchInterval(alive, total) {
    return Math.max(100, Math.round(800 * alive / total));
  }

  startMarch(alive, total) {
    this.stopMarch();
    this.marchIntervalMs = AudioManager.marchInterval(alive, total);
    this.marchTimer = setInterval(() => {
      if (!this.ctx) return;
      const freq = MARCH_FREQS[this.marchStep % 4];
      this._tone('square', freq, freq, 0.08, 0.15);
      this.marchStep++;
    }, this.marchIntervalMs);
  }

  stopMarch() {
    if (this.marchTimer !== null) {
      clearInterval(this.marchTimer);
      this.marchTimer = null;
    }
  }

  // Called every frame while playing. Restarts the timer only when the tempo changes.
  updateMarchTempo(alive, total) {
    const wanted = AudioManager.marchInterval(alive, total);
    if (this.marchTimer === null || wanted !== this.marchIntervalMs) {
      this.startMarch(alive, total);
    }
  }

  startUfo() {
    if (!this.ctx || this.ufoOsc) return;          // already playing
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
    this.ufoOsc = osc;
    this.ufoLfo = lfo;
  }

  // Safe to call many times, even when nothing is playing.
  stopUfo() {
    if (!this.ufoOsc) return;
    try { this.ufoOsc.stop(); } catch (e) { /* already stopped */ }
    try { this.ufoLfo.stop(); } catch (e) { /* already stopped */ }
    this.ufoOsc = null;
    this.ufoLfo = null;
  }
}

export const audio = new AudioManager();