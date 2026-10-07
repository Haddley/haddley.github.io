// A small, dependency-free forward pass for the MiniGPT exhibit model, so the
// trained model can run in the browser. It mirrors the notebook's PyTorch code:
// token + position embeddings, pre-LayerNorm blocks (causal multi-head
// attention, then a GELU MLP), a final LayerNorm, and a linear head.

export interface MiniGPTManifest {
  chars: string[];
  n_layer: number;
  n_head: number;
  n_embd: number;
  block_size: number;
  tensors: Record<string, { shape: number[]; offset: number }>;
}

export interface ForwardResult {
  // Chances for the next letter after the last position (sums to 1).
  probs: Float32Array;
  // Raw scores for the next letter, before softmax.
  logits: Float32Array;
  // attention[layer][head] is a T x T matrix, row-major: row = letter doing the looking.
  attention: Float32Array[][];
  // Chances for the next letter if the machine stopped early:
  // index 0 = cards only, 1..n_layer = after each block.
  earlyProbs: Float32Array[];
}

// erf from Abramowitz and Stegun 7.1.26 (maximum error about 1.5e-7),
// used for PyTorch's default exact GELU.
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-ax * ax);
  return sign * y;
}

function gelu(x: number): number {
  return 0.5 * x * (1 + erf(x / Math.SQRT2));
}

export function softmax(scores: Float32Array): Float32Array {
  let max = -Infinity;
  for (const s of scores) if (s > max) max = s;
  const out = new Float32Array(scores.length);
  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    const e = scores[i] === -Infinity ? 0 : Math.exp(scores[i] - max);
    out[i] = e;
    sum += e;
  }
  for (let i = 0; i < out.length; i++) out[i] /= sum;
  return out;
}

export class MiniGPTEngine {
  readonly manifest: MiniGPTManifest;
  private weights: Float32Array;
  private stoi: Map<string, number>;

  constructor(manifest: MiniGPTManifest, buffer: ArrayBuffer) {
    this.manifest = manifest;
    this.weights = new Float32Array(buffer);
    this.stoi = new Map(manifest.chars.map((c, i) => [c, i]));
  }

  private t(name: string): Float32Array {
    const info = this.manifest.tensors[name];
    if (!info) throw new Error(`Missing tensor ${name}`);
    const size = info.shape.reduce((a, b) => a * b, 1);
    return this.weights.subarray(info.offset, info.offset + size);
  }

  encode(text: string): number[] {
    const ids: number[] = [];
    for (const ch of text) {
      const id = this.stoi.get(ch);
      if (id !== undefined) ids.push(id);
    }
    return ids;
  }

  knows(ch: string): boolean {
    return this.stoi.has(ch);
  }

  // y[T x out] = x[T x in] . W^T + b, with W stored as [out x in] like nn.Linear.
  private linear(x: Float32Array, T: number, nIn: number, name: string): Float32Array {
    const W = this.t(`${name}.weight`);
    const b = this.t(`${name}.bias`);
    const nOut = b.length;
    const y = new Float32Array(T * nOut);
    for (let r = 0; r < T; r++) {
      const xo = r * nIn;
      for (let o = 0; o < nOut; o++) {
        let acc = b[o];
        const wo = o * nIn;
        for (let i = 0; i < nIn; i++) acc += x[xo + i] * W[wo + i];
        y[r * nOut + o] = acc;
      }
    }
    return y;
  }

  private layerNorm(x: Float32Array, T: number, C: number, name: string): Float32Array {
    const w = this.t(`${name}.weight`);
    const b = this.t(`${name}.bias`);
    const y = new Float32Array(T * C);
    for (let r = 0; r < T; r++) {
      let mean = 0;
      for (let i = 0; i < C; i++) mean += x[r * C + i];
      mean /= C;
      let v = 0;
      for (let i = 0; i < C; i++) {
        const d = x[r * C + i] - mean;
        v += d * d;
      }
      const inv = 1 / Math.sqrt(v / C + 1e-5);
      for (let i = 0; i < C; i++) y[r * C + i] = (x[r * C + i] - mean) * inv * w[i] + b[i];
    }
    return y;
  }

  // Chances for the next letter, read from the last card only.
  private readOut(x: Float32Array, T: number): Float32Array {
    const C = this.manifest.n_embd;
    const last = x.subarray((T - 1) * C, T * C);
    const normed = this.layerNorm(new Float32Array(last), 1, C, 'final_ln');
    return this.linear(normed, 1, C, 'lm_head');
  }

  forward(idsIn: number[]): ForwardResult {
    const { n_layer, n_head, n_embd: C, block_size } = this.manifest;
    const ids = idsIn.slice(-block_size);
    const T = ids.length;
    const V = this.manifest.chars.length;
    const hd = C / n_head;
    const tok = this.t('token_embedding.weight');
    const pos = this.t('position_embedding.weight');

    // Step 2: letter card + position card, number by number.
    let x = new Float32Array(T * C);
    for (let r = 0; r < T; r++)
      for (let i = 0; i < C; i++) x[r * C + i] = tok[ids[r] * C + i] + pos[r * C + i];

    const earlyProbs: Float32Array[] = [softmax(this.readOut(x, T))];
    const attention: Float32Array[][] = [];

    // Step 3: the blocks.
    for (let L = 0; L < n_layer; L++) {
      const p = `blocks.${L}`;
      const xn = this.layerNorm(x, T, C, `${p}.ln1`);
      const q = this.linear(xn, T, C, `${p}.attn.query`);
      const k = this.linear(xn, T, C, `${p}.attn.key`);
      const v = this.linear(xn, T, C, `${p}.attn.value`);
      const heads: Float32Array[] = [];
      const mixed = new Float32Array(T * C);
      const scale = 1 / Math.sqrt(hd);
      for (let h = 0; h < n_head; h++) {
        const A = new Float32Array(T * T);
        for (let i = 0; i < T; i++) {
          const scores = new Float32Array(i + 1);
          for (let j = 0; j <= i; j++) {
            let dot = 0;
            for (let d = 0; d < hd; d++) dot += q[i * C + h * hd + d] * k[j * C + h * hd + d];
            scores[j] = dot * scale;
          }
          const w = softmax(scores);
          for (let j = 0; j <= i; j++) {
            A[i * T + j] = w[j];
            for (let d = 0; d < hd; d++) mixed[i * C + h * hd + d] += w[j] * v[j * C + h * hd + d];
          }
        }
        heads.push(A);
      }
      attention.push(heads);
      const att = this.linear(mixed, T, C, `${p}.attn.proj`);
      for (let i = 0; i < x.length; i++) x[i] += att[i];

      const xn2 = this.layerNorm(x, T, C, `${p}.ln2`);
      const hidden = this.linear(xn2, T, C, `${p}.mlp.fc1`);
      for (let i = 0; i < hidden.length; i++) hidden[i] = gelu(hidden[i]);
      const mlp = this.linear(hidden, T, hidden.length / T, `${p}.mlp.fc2`);
      const next = new Float32Array(x.length);
      for (let i = 0; i < x.length; i++) next[i] = x[i] + mlp[i];
      x = next;
      earlyProbs.push(softmax(this.readOut(x, T)));
    }

    // Step 4: chances, from the last card only.
    const logits = this.readOut(x, T);
    if (logits.length !== V) throw new Error('Unexpected vocabulary size');
    return { probs: softmax(logits), logits, attention, earlyProbs };
  }
}

// Top-k: keep the k biggest scores, and set the rest to minus infinity, as the notebook does.
// Softmax then gives every removed letter a chance of exactly 0.
export function keepTopK(scores: Float32Array, k: number): Float32Array {
  const kept = new Float32Array(scores.length).fill(-Infinity);
  const order = Array.from(scores.keys()).sort((a, b) => scores[b] - scores[a]);
  for (const i of order.slice(0, Math.min(k, scores.length))) kept[i] = scores[i];
  return kept;
}

// Step 5 helpers: reshape the wheel of chances with the boldness dial (temperature),
// then trim it, keeping the biggest k slices (top-k) and then the biggest slices up to p (top-p).
export function adjustChances(logits: Float32Array, temperature: number, topP: number, topK: number = logits.length): Float32Array {
  const V = logits.length;
  let probs: Float32Array;
  if (temperature <= 0.01) {
    probs = new Float32Array(V);
    let best = 0;
    for (let i = 1; i < V; i++) if (logits[i] > logits[best]) best = i;
    probs[best] = 1;
  } else {
    const scaled = new Float32Array(V);
    for (let i = 0; i < V; i++) scaled[i] = logits[i] / temperature;
    probs = softmax(keepTopK(scaled, topK));
  }
  if (topP < 1) {
    const order = Array.from(probs.keys()).sort((a, b) => probs[b] - probs[a]);
    const keep = new Float32Array(V);
    let total = 0;
    for (const i of order) {
      keep[i] = probs[i];
      total += probs[i];
      if (total >= topP) break;
    }
    for (let i = 0; i < V; i++) keep[i] /= total;
    probs = keep;
  }
  return probs;
}

// Spin the wheel: pick a letter, each with its own chance.
export function spinWheel(probs: Float32Array, random: () => number = Math.random): number {
  let r = random();
  for (let i = 0; i < probs.length; i++) {
    r -= probs[i];
    if (r <= 0) return i;
  }
  return probs.length - 1;
}
