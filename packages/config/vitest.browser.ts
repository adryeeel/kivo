import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineProject, mergeConfig } from 'vitest/config';

import shared from '@kivo/config/vitest';

export default mergeConfig(
  shared,
  defineProject({
    plugins: [react()],
    test: {
      browser: {
        enabled: true,
        headless: true,
        provider: playwright(),
        instances: [{ browser: 'chromium' }],
      },
    },
  }),
);
