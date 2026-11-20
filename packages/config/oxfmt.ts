import { defineConfig } from 'oxfmt';

export default defineConfig({
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 100,
    sortTailwindcss: true,
    sortImports: {
        groups: ['type', 'builtin', 'external', 'internal', 'style', 'unknown'],
        internalPattern: ['@/', '@kivo/'],
    },
    ignorePatterns: ['.agents/**', '.codex/**', '.aws/**'],
});
