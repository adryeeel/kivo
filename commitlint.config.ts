import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-empty': [2, 'never'],
        'scope-enum': [
            2,
            'always',
            [
                'web',
                'ui',
                'oxfmt',
                'oxlint',
                'typescript',
                'vitest',
                'agents',
                'repo',
                'docs',
                'ci',
                'docker',
                'deps',
                'deps-dev',
            ],
        ],
    },
};

export default config;
