import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig } from 'vitest/config';

import { browserConfig } from '@kivo/vitest/browser';

export default mergeConfig(
    browserConfig,
    defineConfig({
        resolve: {
            alias: {
                'next/link': fileURLToPath(new URL('./src/tests/mocks/link.tsx', import.meta.url)),
                'next/image': fileURLToPath(
                    new URL('./src/tests/mocks/image.tsx', import.meta.url),
                ),
            },
        },
        test: {
            restoreMocks: true,
            fileParallelism: false,
            setupFiles: ['./src/tests/setup.browser.ts'],
            browser: {
                commands: {
                    async setReducedMotion({ page }, reducedMotion: 'reduce' | 'no-preference') {
                        await page.emulateMedia({ reducedMotion });
                    },
                },
            },
        },
    }),
);
