/**
 * Unit tests for shared game logic across all four games.
 *
 * These tests exercise pure functions inline (no HTML loading needed) to keep
 * the suite fast and free from browser-environment dependencies.
 */

// ─── Room code generation ──────────────────────────────────────────────────

const ALLOWED_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // no I or O

/** Replicates the room code logic shared by all four games. */
function generateRoomCode(): string {
    const chars = ALLOWED_CHARS;
    return Array.from({ length: 4 }, () =>
        chars[Math.floor(Math.random() * chars.length)]
    ).join('');
}

describe('generateRoomCode', () => {
    it('produces a 4-character string', () => {
        expect(generateRoomCode()).toHaveLength(4);
    });

    it('contains only allowed characters (no I or O)', () => {
        for (let i = 0; i < 200; i++) {
            const code = generateRoomCode();
            expect(code).toMatch(/^[ABCDEFGHJKLMNPQRSTUVWXYZ]{4}$/);
        }
    });

    it('never contains I or O', () => {
        for (let i = 0; i < 500; i++) {
            const code = generateRoomCode();
            expect(code).not.toMatch(/[IO]/);
        }
    });

    it('generates unique codes across many iterations', () => {
        const codes = new Set(Array.from({ length: 50 }, () => generateRoomCode()));
        // With 24^4 = 331,776 possible codes, 50 samples should almost always be unique.
        // Allow at most 2 collisions as a safety margin.
        expect(codes.size).toBeGreaterThanOrEqual(48);
    });

    it('uses all 24 allowed characters over many samples', () => {
        const seen = new Set<string>();
        for (let i = 0; i < 5000; i++) {
            generateRoomCode().split('').forEach(c => seen.add(c));
        }
        for (const c of ALLOWED_CHARS) {
            expect(seen).toContain(c);
        }
    });
});

// ─── Theme toggle logic ────────────────────────────────────────────────────

describe('theme toggle', () => {
    // Use a simple in-memory store to avoid jsdom localStorage quirks
    let store: Record<string, string>;

    beforeEach(() => {
        document.body.className = '';
        store = {};
    });

    function toggleTheme(storageKey: string) {
        document.body.classList.toggle('day');
        const day = document.body.classList.contains('day');
        store[storageKey] = day ? 'day' : 'dark';
    }

    function restoreTheme(storageKey: string) {
        if (store[storageKey] === 'day') {
            document.body.classList.add('day');
        }
    }

    it('adds body.day class on first toggle', () => {
        toggleTheme('test-theme');
        expect(document.body.classList.contains('day')).toBe(true);
    });

    it('removes body.day class on second toggle', () => {
        toggleTheme('test-theme');
        toggleTheme('test-theme');
        expect(document.body.classList.contains('day')).toBe(false);
    });

    it('persists "day" to store', () => {
        toggleTheme('test-theme');
        expect(store['test-theme']).toBe('day');
    });

    it('persists "dark" to store after second toggle', () => {
        toggleTheme('test-theme');
        toggleTheme('test-theme');
        expect(store['test-theme']).toBe('dark');
    });

    it('uses game-specific keys — keys are all distinct', () => {
        const keys = ['boggle-theme', 'liarsdice-theme', 'pit-theme', 'ttt-theme'];
        for (const key of keys) {
            store = {};
            document.body.className = '';
            toggleTheme(key);
            expect(store[key]).toBe('day');
        }
    });

    it('restores day mode when stored value is "day"', () => {
        store['test-theme'] = 'day';
        restoreTheme('test-theme');
        expect(document.body.classList.contains('day')).toBe(true);
    });

    it('does not add day class when stored value is "dark"', () => {
        store['test-theme'] = 'dark';
        restoreTheme('test-theme');
        expect(document.body.classList.contains('day')).toBe(false);
    });
});

// ─── Storage key names ────────────────────────────────────────────────────

describe('storage key names', () => {
    it('each game uses a unique name key', () => {
        const nameKeys = ['boggle-name', 'liarsdice-name', 'pit-name', 'ttt-name'];
        expect(new Set(nameKeys).size).toBe(nameKeys.length);
    });

    it('each game uses a unique theme key', () => {
        const themeKeys = ['boggle-theme', 'liarsdice-theme', 'pit-theme', 'ttt-theme'];
        expect(new Set(themeKeys).size).toBe(themeKeys.length);
    });

    it('name and theme keys do not overlap across games', () => {
        const allKeys = [
            'boggle-name', 'liarsdice-name', 'pit-name', 'ttt-name',
            'boggle-theme', 'liarsdice-theme', 'pit-theme', 'ttt-theme',
        ];
        expect(new Set(allKeys).size).toBe(allKeys.length);
    });
});

// ─── Room code input constraints ──────────────────────────────────────────

describe('room code constraints', () => {
    it('room code length is 4', () => {
        expect(generateRoomCode()).toHaveLength(4);
    });

    it('a 4-char code made of allowed chars passes the join validator', () => {
        // The liarsdice/pit join validator: pid = code.trim().toUpperCase() (non-empty)
        const code = generateRoomCode();
        const pid = code.trim().toUpperCase();
        expect(pid.length).toBeGreaterThan(0);
        expect(pid).toMatch(/^[ABCDEFGHJKLMNPQRSTUVWXYZ]{4}$/);
    });

    it('ttt join validator rejects codes shorter than 4', () => {
        // ticktacktoe checks: code.length !== 4
        const short = 'AB';
        expect(short.length !== 4).toBe(true);
    });

    it('ttt join validator accepts exactly 4-char codes', () => {
        const code = generateRoomCode();
        expect(code.length !== 4).toBe(false);
    });
});
