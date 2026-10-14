// Keyboard input, exposed as a singleton. Arrow keys or A/D to move, Space to fire.
export class InputHandler {
  constructor() {
    this.down = new Set();
    this.pressed = new Set();
    this._keydown = (e) => {
      if (
        e.code === 'ArrowLeft' ||
        e.code === 'ArrowRight' ||
        e.code === 'ArrowUp' ||
        e.code === 'ArrowDown' ||
        e.code === 'Space'
      ) {
        e.preventDefault();
      }
      if (!e.repeat) this.pressed.add(e.code);
      this.down.add(e.code);
    };
    this._keyup = (e) => {
      this.down.delete(e.code);
    };
    window.addEventListener('keydown', this._keydown);
    window.addEventListener('keyup', this._keyup);
  }

  isLeft() {
    return this.down.has('ArrowLeft') || this.down.has('KeyA');
  }

  isRight() {
    return this.down.has('ArrowRight') || this.down.has('KeyD');
  }

  isFire() {
    return this.down.has('Space');
  }

  consumeFire() {
    const v = this.pressed.has('Space');
    this.pressed.delete('Space');
    return v;
  }

  endFrame() {
    this.pressed.clear();
  }
}

export const input = typeof window !== 'undefined' ? new InputHandler() : null;
