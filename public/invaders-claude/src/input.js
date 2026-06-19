export class InputHandler {
  constructor() {
    this.keys = {};
    this.onUnlock = null;
    window.addEventListener('keydown', e => {
      this.keys[e.code] = true;
      if (this.onUnlock) { this.onUnlock(); this.onUnlock = null; }
    });
    window.addEventListener('keyup', e => { this.keys[e.code] = false; });
  }

  isDown(code) { return !!this.keys[code]; }
  isLeft() { return this.isDown('ArrowLeft') || this.isDown('KeyA'); }
  isRight() { return this.isDown('ArrowRight') || this.isDown('KeyD'); }
  isShoot() { return this.isDown('Space'); }
}

export const input = new InputHandler();
