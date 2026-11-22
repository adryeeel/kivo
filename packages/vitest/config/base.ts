import { defineConfig } from 'vitest/config';

export const baseConfig = defineConfig({
    resolve: { tsconfigPaths: true },
    test: {
        maxWorkers: '100%',
        passWithNoTests: true,
    },
});
