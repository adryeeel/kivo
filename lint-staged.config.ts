import type { Configuration } from 'lint-staged';

const config: Configuration = {
    '*.{ts,tsx}': ['pnpm exec oxlint', 'pnpm exec oxfmt'],
    '*.{css,md,yml,yaml,json}': ['pnpm exec oxfmt --no-error-on-unmatched-pattern'],
};

export default config;
