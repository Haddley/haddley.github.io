/**
 * src/sprites.js - Handles all sprite definitions and drawing logic for pixel art.
 * Converted to IIFE pattern.
 */

(function(global) {
  /**
   * Draws a pixel-art sprite onto a canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas context.
   * @param {number} x - Top-left X position.
   * @param {number} y - Top-left Y position.
   * @param {number} w - Total width of the sprite (used to calculate pixel width).
   * @param {number} h - Total height of the sprite (used to calculate pixel height).
   * @param {string[]} pixels - Array of strings, each character represents a pixel.
   *                            'X' = colored, ' ' = transparent.
   * @param {string} color - Fill color (default '#FFFFFF').
   */
  function drawSprite(ctx, x, y, w, h, pixels, color = '#FFFFFF') {
    // Calculate pixel size based on grid dimensions.
    // Assuming pixels is a rectangular grid; rows = pixels.length, columns = pixels[0].length.
    const rows = pixels.length;
    const cols = rows > 0 ? pixels[0].length : 0;
    const pixelWidth = cols > 0 ? Math.floor(w / cols) : 0;
    const pixelHeight = rows > 0 ? Math.floor(h / rows) : 0;

    for (let row = 0; row < rows; row++) {
      const rowStr = pixels[row];
      for (let col = 0; col < cols && col < rowStr.length; col++) {
        if (rowStr[col] === 'X') {
          ctx.fillStyle = color;
          ctx.fillRect(
            x + col * pixelWidth,
            y + row * pixelHeight,
            pixelWidth,
            pixelHeight
          );
        }
      }
    }
  }

  // Expose the function globally.
  global.drawSprite = drawSprite;
})(window);