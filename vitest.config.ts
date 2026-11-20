import { defineConfig, mergeConfig } from 'vitest/config';

import shared from '@kivo/config/vitest';

export default mergeConfig(
  shared,
  defineConfig({ test: { projects: ['apps/*/vitest.config.ts'] } }),
);
