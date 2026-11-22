import { defineConfig } from 'oxlint';

import { perfectionist } from './perfectionist.ts';

export const baseConfig = defineConfig({
    extends: [perfectionist],
    plugins: ['typescript', 'eslint', 'unicorn', 'oxc'],
    options: {
        typeAware: true,
        typeCheck: true,
    },
});
