import { defineConfig, defineProject, mergeConfig } from 'vitest/config';
import shared from '@kivo/config/vitest';
import browser from '@kivo/config/vitest/browser';

export default defineConfig({
  root: import.meta.dirname,
  test: {
    name: 'web',
    projects: [
      mergeConfig(
        shared,
        defineProject({
          test: { name: 'server', include: ['tests/**/*.server.test.tsx'] },
        }),
      ),
      mergeConfig(
        browser,
        defineProject({
          test: {
            name: 'browser',
            // Theme tests share storage and the emulated OS preference.
            fileParallelism: false,
            include: ['tests/**/*.test.tsx'],
            exclude: ['tests/**/*.server.test.tsx'],
            setupFiles: ['./tests/setup.browser.ts'],
            browser: {
              commands: {
                async setColorScheme({ page }, colorScheme: 'light' | 'dark') {
                  await page.emulateMedia({ colorScheme });
                },
              },
            },
          },
        }),
      ),
    ],
  },
});
