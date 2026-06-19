export class Entity {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update(deltaTime) {
        // To be implemented by subclasses
    }

    draw(ctx) {
        // To be implemented by subclasses
    }
}
