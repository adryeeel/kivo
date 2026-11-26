import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig } from 'vitest/config';

import { browserConfig } from '@kivo/vitest/browser';

export default mergeConfig(
    browserConfig,
    defineConfig({
        test: {
            restoreMocks: true,
            fileParallelism: false,
            setupFiles: ['./src/tests/setup.browser.ts'],
        },
        resolve: {
            alias: {
                'next/link': fileURLToPath(new URL('./src/tests/mocks/link.tsx', import.meta.url)),
                'next/image': fileURLToPath(
                    new URL('./src/tests/mocks/image.tsx', import.meta.url),
                ),
            },
        },
    }),
);
