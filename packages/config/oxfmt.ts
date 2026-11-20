import { defineConfig } from 'oxfmt';

export default defineConfig({
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  sortTailwindcss: true,
  sortImports: {
    groups: ['type', 'builtin', 'external', 'internal', 'style', 'unknown'],
    internalPattern: ['@/', '@kivo/'],
  },
  ignorePatterns: [
    '**/.next/**',
    '**/dist/**',
    '**/coverage/**',
    '**/next-env.d.ts',
    'pnpm-lock.yaml',
    '.agents/**',
    '.codex/**',
    '.aws/**',
  ],
});
