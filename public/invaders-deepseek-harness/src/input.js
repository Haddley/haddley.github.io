// ---------------------------------------------------------------------------
// input.js — InputHandler singleton. Keyboard state + edge-triggered signals.
// ---------------------------------------------------------------------------

class InputHandler {
  constructor() {
    this.left = false;
    this.right = false;
    this.fireHeld = false;
    this._startQueued = false;
    this.onAnyKey = null; // callback(key) — engine uses it to unlock audio

    window.addEventListener('keydown', (e) => this._onKeyDown(e));
    window.addEventListener('keyup', (e) => this._onKeyUp(e));
  }

  _onKeyDown(e) {
    const k = e.key;
    if (k === 'ArrowLeft' || k === 'a' || k === 'A') this.left = true;
    else if (k === 'ArrowRight' || k === 'd' || k === 'D') this.right = true;
    else if (k === ' ') this.fireHeld = true;

    if (k === ' ' || k === 'Enter') this._startQueued = true;

    // Keep the page from scrolling with the game keys.
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(k)) {
      e.preventDefault();
    }

    if (this.onAnyKey) this.onAnyKey(k);
  }

  _onKeyUp(e) {
    const k = e.key;
    if (k === 'ArrowLeft' || k === 'a' || k === 'A') this.left = false;
    else if (k === 'ArrowRight' || k === 'd' || k === 'D') this.right = false;
    else if (k === ' ') this.fireHeld = false;
  }

  /** True once per Space/Enter press. */
  consumeStart() {
    const q = this._startQueued;
    this._startQueued = false;
    return q;
  }

  /** Drop any held fire so the same press that started the game doesn't shoot. */
  clearFire() {
    this.fireHeld = false;
  }
}

export const input = new InputHandler();
