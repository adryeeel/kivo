export default {
    '*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}': ['oxlint --fix --deny-warnings', 'oxfmt --write'],
    '*.{json,jsonc,css,md,yaml,yml}': 'oxfmt --write',
    '*': () => 'vitest run',
};
