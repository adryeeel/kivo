import { defineConfig } from 'oxlint';

import { baseConfig } from './base.ts';

export const reactConfig = defineConfig({
    extends: [baseConfig],
    plugins: ['react', 'jsx-a11y', 'vitest'],
    rules: {
        'vitest/no-standalone-expect': [
            'warn',
            {
                additionalTestBlockFunctions: [
                    'it',
                    'it.for',
                    'it.skip',
                    'it.only',
                    'it.todo',
                    'it.concurrent',
                ],
            },
        ],
    },
});
