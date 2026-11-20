import { defineConfig, mergeConfig } from 'vitest/config';
import shared from '@kivo/config/vitest';

export default mergeConfig(
  shared,
  defineConfig({
    root: import.meta.dirname,
    test: {
      name: 'web',
      environment: 'jsdom',
      setupFiles: ['./tests/setup.ts'],
    },
  }),
);
