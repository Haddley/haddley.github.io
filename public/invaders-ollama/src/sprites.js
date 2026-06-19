/**
 * src/sprites.js - Handles all sprite definitions and drawing logic for pixel art.
 */

export function drawSprite(ctx, x, y, w, h, pixels, color = '#FFFFFF') {
    export function drawSprite(ctx, x, y, w, h, pixels, color = '#FFFFFF') {
    const pixelHeight = 3; // Standard character height
    const pixelWidth = Math.floor(w / 3);

    for (let r = 0; r < pixels.length; r++) {
        const row = pixels[r];
        let currentX = x + (r * 2); // Adjust for character spacing on the sprite itself

        for (let c = 0; c < row.length; c++) {
            if (row[c] === 'X') {
                // Draw a 3x3 block starting at (currentX, y + r*3)
                ctx.fillStyle = color;
                ctx.fillRect(currentX, y + r * pixelHeight, 2, pixelHeight); // Using 2px width approximation
            } else if (row[c] !== ' ') {
                 // Handle other characters if necessary, although usually it's X or space
            }
        }

         // Optimized drawing logic for character grid might be needed here.
    }
}}
