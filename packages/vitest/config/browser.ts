import { playwright } from '@vitest/browser-playwright';
import { mergeConfig, defineConfig } from 'vitest/config';

import { baseConfig } from './base.ts';

/** Vitest in browser mode: headless Chromium through Playwright, with CSS and the tsconfig paths. */
export const browserConfig = mergeConfig(
    baseConfig,
    defineConfig({
        test: {
            css: true,
            browser: {
                enabled: true,
                headless: true,
                instances: [{ browser: 'chromium' }],
                provider: playwright({
                    launchOptions: { channel: 'chromium' },
                }),
            },
        },
    }),
);
