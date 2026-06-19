export const ALIEN_SQUID_A = [
    '  X       X  ',
    '   X     X   ',
    '  XXXXXXXXX  ',
    ' XX  XXX  XX ',
    'XXXXXXXXXXXXX',
    'XXX  XXX  XXX',
    ' X         X ',
    '  X       X  ',
];

export const ALIEN_SQUID_B = [
    '  X       X  ',
    'X   X     X  X',
    'X XXXXXXXXX X',
    'XXXX XXX XXXX',
    'XXXXXXXXXXXXX',
    'XXXX     XXXX',
    ' X         X ',
    '  X       X  ',
];

export const ALIEN_CRAB_A = [
    '     XXX     ',
    '   XXXXXXX   ',
    '  XXXXXXXXX  ',
    ' XXXXX XXXXX ',
    'XXXXXXXXXXXXX',
    'XXX  XXX  XXX',
    'X           X',
    'XX         XX',
];

export const ALIEN_CRAB_B = [
    '     XXX     ',
    '   XXXXXXX   ',
    '  XXXXXXXXX  ',
    ' XXXXX XXXXX ',
    'XXXXXXXXXXXXX',
    'XXX  XXX  XXX',
    'XX         XX',
    'X           X',
];

export const ALIEN_OCTOPUS_A = [
    '   XXXXXXX   ',
    '  XXXXXXXXX  ',
    ' XXXXXXXXXXX ',
    'XXXX XXX XXXX',
    'XXXXXXXXXXXXX',
    'XX XXXXXXX XX',
    'X           X',
    'X  X     X  X',
];

export const ALIEN_OCTOPUS_B = [
    '   XXXXXXX   ',
    '  XXXXXXXXX  ',
    ' XXXXXXXXXXX ',
    'XXXX XXX XXXX',
    'XXXXXXXXXXXXX',
    'XXX XXXXX XXX',
    'X           X',
    'X  X     X  X',
];

export const PLAYER_SPRITE = [
    '      X      ',
    '     XXX     ',
    '     XXX     ',
    'XXXXXXXXXXXXX',
    'XXXXXXXXXXXXX',
    'XXXXXXXXXXXXX',
    'XXXXXXXXXXXXX',
    'XXXXXXXXXXXXX',
];

export const UFO_SPRITE = [
    '   XXXXXXX   ',
    ' XXXXXXXXXXX ',
    'XXXXXXXXXXXXX',
    'XX  XXX  XX  ',
    'XXXXXXXXXXXXX',
    '   XXXXXXX   ',
];

export function drawSprite(ctx, x, y, w, h, pixels, color) {
    const rows = pixels.length;
    const cols = rows > 0 ? pixels[0].length : 0;
    if (cols === 0) return;

    const pixelWidth = Math.floor(w / cols);
    const pixelHeight = Math.floor(h / rows);
    const spriteW = cols * pixelWidth;
    const spriteH = rows * pixelHeight;
    const offsetX = Math.floor((w - spriteW) / 2);
    const offsetY = Math.floor((h - spriteH) / 2);

    ctx.fillStyle = color;
    for (let row = 0; row < rows; row++) {
        const rowStr = pixels[row];
        for (let col = 0; col < cols && col < rowStr.length; col++) {
            if (rowStr[col] === 'X') {
                ctx.fillRect(
                    x + offsetX + col * pixelWidth,
                    y + offsetY + row * pixelHeight,
                    pixelWidth,
                    pixelHeight
                );
            }
        }
    }
}
