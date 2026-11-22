import { defineConfig } from 'oxlint';
import { fileURLToPath } from 'node:url';

const byLength = { order: 'asc', type: 'line-length' } as const;

const importGroups = {
    newlinesInside: 0,
    newlinesBetween: 1,
    groups: ['unknown', 'workspace', 'app', 'features', 'parent', 'sibling'],
    customGroups: [
        { groupName: 'features', elementNamePattern: '^@/features' },
        { groupName: 'app', elementNamePattern: '^@/' },
        { groupName: 'workspace', elementNamePattern: '^@project-template/' },
        { groupName: 'parent', elementNamePattern: '^\\.\\./' },
        { groupName: 'sibling', elementNamePattern: '^\\./' },
    ],
};

const objects = {
    groups: ['unknown', 'multiline-member'],
    useConfigurationIf: { objectType: 'non-destructured' },
};

const destructured = {
    ...byLength,
    useConfigurationIf: { objectType: 'destructured' },
};

/** Orders imports, exports and object properties shortest first, with `eslint-plugin-perfectionist`. */
export const perfectionist = defineConfig({
    jsPlugins: [fileURLToPath(import.meta.resolve('eslint-plugin-perfectionist'))],
    rules: {
        'perfectionist/sort-named-imports': ['error', byLength],
        'perfectionist/sort-named-exports': ['error', byLength],
        'perfectionist/sort-imports': ['error', { ...byLength, ...importGroups }],
        'perfectionist/sort-exports': ['error', { ...byLength, partitionByNewLine: true }],
        'perfectionist/sort-objects': ['error', { ...byLength, ...objects }, destructured],
    },
});
