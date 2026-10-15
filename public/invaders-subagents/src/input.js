// InputHandler singleton. Keyboard only (arrow keys / A / D move; Space fires).
import AudioManagerInstance from './audio.js';

const KEYMAP = {
  ArrowLeft: 'left',
  KeyA: 'left',
  ArrowRight: 'right',
  KeyD: 'right',
  Space: 'fire',
  Enter: 'start',
};

class InputHandler {
  constructor() {
    this.down = new Set(); // currently-held logical keys
    this.pressed = new Set(); // edge-triggered this frame
    this._bind();
  }

  _bind() {
    if (typeof window === 'undefined') return;
    window.addEventListener('keydown', (e) => {
      const logical = KEYMAP[e.code];
      if (logical) {
        AudioManagerInstance._unlock();
        this.down.add(logical);
        if (!e.repeat) this.pressed.add(logical);
        // Space doubles as "start the game".
        if (logical === 'fire') this.pressed.add('start');
        e.preventDefault();
      }
    });
    window.addEventListener('keyup', (e) => {
      const logical = KEYMAP[e.code];
      if (logical) this.down.delete(logical);
    });
    window.addEventListener('blur', () => {
      this.down.clear();
      this.pressed.clear();
    });
  }

  left() {
    return this.down.has('left');
  }

  right() {
    return this.down.has('right');
  }

  /** True exactly once per Space press, then cleared. */
  consumeFire() {
    return this._take('fire');
  }

  /** True exactly once per Space/Enter press, then cleared. */
  consumeStart() {
    return this._take('start');
  }

  _take(key) {
    if (this.pressed.has(key)) {
      this.pressed.delete(key);
      return true;
    }
    return false;
  }

  /** Called by the engine once per frame after reading input. */
  endFrame() {
    this.pressed.clear();
  }
}

export const InputHandlerInstance = new InputHandler();
export default InputHandlerInstance;
