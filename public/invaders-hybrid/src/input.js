export class InputHandler {
  constructor() {
    this.keys = new Set();
    this.fireQueued = false;

    if (typeof window !== "undefined") {
      window.addEventListener('keydown', (event) => {
        if (event.key === ' ' || event.code === 'Space') {
          event.preventDefault();
          this.fireQueued = true;
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' ||
                   event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
          event.preventDefault();
        }
        this.keys.add(event.key.toLowerCase());
      });

      window.addEventListener('keyup', (event) => {
        this.keys.delete(event.key.toLowerCase());
      });
    }
  }

  left() {
    return this.keys.has('arrowleft') || this.keys.has('a');
  }

  right() {
    return this.keys.has('arrowright') || this.keys.has('d');
  }

  consumeFire() {
    if (this.fireQueued) {
      this.fireQueued = false;
      return true;
    }
    return false;
  }
}

export const input = new InputHandler();