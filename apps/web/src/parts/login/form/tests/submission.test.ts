import { expect } from 'vitest';

import { it } from './utils/context';

const edits = [
    { label: 'Email address', value: 'bruno@example.com' },
    { label: 'Password', value: 'updated-preview' },
];

it('reports unavailable sign-in without discarding the password', async ({ submitted }) => {
    await expect
        .element(submitted.getByRole('status'))
        .toMatchTextContent('Sign-in is unavailable right now.');
    await expect
        .element(submitted.getByLabelText('Password', { exact: true }))
        .toHaveValue('preview-only');
});

it.for(edits)(
    'clears the submission notice when $label changes',
    async ({ label, value }, { submitted }) => {
        await submitted.getByLabelText(label, { exact: true }).fill(value);
        await expect.element(submitted.getByRole('status')).not.toBeInTheDocument();

        await submitted.getByRole('button', { exact: true, name: 'Sign in' }).click();
        await expect.element(submitted.getByRole('status')).toBeVisible();
    },
);
