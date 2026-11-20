import { defineConfig } from 'oxfmt';

export default defineConfig({
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  sortTailwindcss: true,
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
