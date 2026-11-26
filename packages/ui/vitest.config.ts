import { mergeConfig, defineConfig } from 'vitest/config';

import { browserConfig } from '@kivo/vitest/browser';

export default mergeConfig(
    browserConfig,
    defineConfig({
        test: { fileParallelism: false },
        resolve: { dedupe: ['react', 'react-dom'] },
        optimizeDeps: {
            include: [
                '@base-ui/react/button',
                '@base-ui/react/dialog',
                '@base-ui/react/menu',
                '@base-ui/react/progress',
                'class-variance-authority',
                'lucide-react',
                'vitest-browser-react',
            ],
        },
    }),
);
