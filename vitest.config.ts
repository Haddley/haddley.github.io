import { defineConfig } from 'vitest/config';

export default defineConfig({
    css: {
        postcss: {
            plugins: [],
        },
    },
    test: {
        environment: 'jsdom',
        include: ['tests/unit/**/*.test.ts'],
        globals: true,
    },
});
