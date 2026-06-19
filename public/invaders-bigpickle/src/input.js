class InputHandler {
  constructor() {
    this.keys = {};
    this._onDown = this._onDown.bind(this);
    this._onUp = this._onUp.bind(this);
    window.addEventListener('keydown', this._onDown);
    window.addEventListener('keyup', this._onUp);
  }

  _onDown(e) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
      e.preventDefault();
    }
    this.keys[e.key] = true;
  }

  _onUp(e) {
    this.keys[e.key] = false;
  }

  isDown(key) {
    return !!this.keys[key];
  }

  isAnyActionDown() {
    return this.isDown('ArrowLeft') || this.isDown('ArrowRight') ||
      this.isDown('a') || this.isDown('d') || this.isDown('A') || this.isDown('D') ||
      this.isDown(' ');
  }
}

const inputHandler = new InputHandler();
export default inputHandler;
