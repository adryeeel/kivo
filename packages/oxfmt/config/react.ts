import { defineConfig } from 'oxfmt';

import { baseConfig } from './base.ts';

export const reactConfig = defineConfig({
    ...baseConfig,
    jsxSingleQuote: true,
    sortTailwindcss: {
        preserveWhitespace: true,
        functions: ['clsx', 'cn'],
    },
});
