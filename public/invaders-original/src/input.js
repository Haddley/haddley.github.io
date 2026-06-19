import audio from './audio.js';

class InputHandler {
    constructor() {
        this.keys = {};
        window.addEventListener('keydown', (e) => {
            audio.resume();
            this.keys[e.code] = true;
        });
        window.addEventListener('keyup', (e) => this.keys[e.code] = false);
    }

    isPressed(keyCode) {
        return !!this.keys[keyCode];
    }
}

export default new InputHandler();
