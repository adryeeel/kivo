import { defineConfig } from 'oxlint';

import { reactConfig } from './react.ts';

export const nextConfig = defineConfig({
    plugins: ['nextjs'],
    extends: [reactConfig],
});
