import { MARCH_PITCHES, MARCH_BEAT_DURATION } from './constants.js';

let audioCtx = null;

function getContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function createNoiseBuffer(durationMs) {
    const ctx = getContext();
    const sampleRate = ctx.sampleRate;
    const length = Math.floor(sampleRate * (durationMs / 1000));
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    return buffer;
}

export function initAudioContext() {
    getContext();
}

export function playShootSound() {
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
}

export function playAlienDeathSound() {
    const ctx = getContext();
    const buffer = createNoiseBuffer(350);
    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 600;
    bandpass.Q.value = 1.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

    source.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(ctx.destination);
    source.start(ctx.currentTime);
    source.stop(ctx.currentTime + 0.35);
}

export function playPlayerDeathSound() {
    const ctx = getContext();
    const buffer = createNoiseBuffer(900);
    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 600;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.9);

    source.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(ctx.destination);
    source.start(ctx.currentTime);
    source.stop(ctx.currentTime + 0.9);
}

let marchStep = 0;

export function playMarchBeat() {
    const ctx = getContext();
    const pitch = MARCH_PITCHES[marchStep];
    marchStep = (marchStep + 1) % MARCH_PITCHES.length;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + MARCH_BEAT_DURATION / 1000);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + MARCH_BEAT_DURATION / 1000);
}

let ufoOsc = null;
let ufoLFO = null;
let ufoGain = null;

export function startUFOSound() {
    stopUFOSound();
    const ctx = getContext();

    ufoOsc = ctx.createOscillator();
    ufoOsc.type = 'sawtooth';
    ufoOsc.frequency.value = 400;

    ufoLFO = ctx.createOscillator();
    ufoLFO.type = 'sine';
    ufoLFO.frequency.value = 8;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 120;
    ufoLFO.connect(lfoGain);
    lfoGain.connect(ufoOsc.frequency);

    ufoGain = ctx.createGain();
    ufoGain.gain.setValueAtTime(0.1, ctx.currentTime);

    ufoOsc.connect(ufoGain);
    ufoGain.connect(ctx.destination);
    ufoOsc.start(ctx.currentTime);
    ufoLFO.start(ctx.currentTime);
}

export function stopUFOSound() {
    if (ufoOsc) {
        try { ufoOsc.stop(); } catch (e) {}
        ufoOsc = null;
    }
    if (ufoLFO) {
        try { ufoLFO.stop(); } catch (e) {}
        ufoLFO = null;
    }
    ufoGain = null;
}

export function playUFODeathSound() {
    stopUFOSound();
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(700, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
}
