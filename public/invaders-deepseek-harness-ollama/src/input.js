// Keyboard state.
//   isLeft() / isRight()  -> is the key HELD right now? (for movement)
//   consumePress(code)    -> was the key PRESSED since the last call? (for shooting)
const GAME_KEYS = ['Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

export class InputHandler {
  constructor() {
    this.keys = {};             // code -> true while held
    this.pressed = {};          // code -> true once per real key press, until consumed
    window.addEventListener('keydown', e => {
      if (GAME_KEYS.includes(e.code)) e.preventDefault();   // stop page scrolling
      this.keys[e.code] = true;
      if (!e.repeat) this.pressed[e.code] = true;           // ignore auto-repeat
    });
    window.addEventListener('keyup', e => {
      this.keys[e.code] = false;
    });
    window.addEventListener('blur', () => {
      this.keys = {};                                       // forget keys when tab loses focus
      this.pressed = {};
    });
  }

  isDown(code) { return this.keys[code] === true; }
  isLeft() { return this.isDown('ArrowLeft') || this.isDown('KeyA'); }
  isRight() { return this.isDown('ArrowRight') || this.isDown('KeyD'); }

  consumePress(code) {
    const wasPressed = this.pressed[code] === true;
    this.pressed[code] = false;
    return wasPressed;
  }
}

export const input = new InputHandler();