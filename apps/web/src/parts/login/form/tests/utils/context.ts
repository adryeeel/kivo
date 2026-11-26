import { vi, test } from 'vitest';

import { fillCredentials } from '../helpers/credentials';

import { renderForm } from './page';

export const it = test
    .extend('form', async () => renderForm())
    .extend('invalid', async ({ form }) => {
        await form.getByRole('button', { exact: true, name: 'Sign in' }).click();
        await vi.waitFor(() => form.getByText('Enter your email address.').element());
        return form;
    })
    .extend('submitted', async ({ form }) => {
        await fillCredentials(form);
        await form.getByRole('button', { exact: true, name: 'Sign in' }).click();
        await vi.waitFor(() => form.getByRole('status').element());
        return form;
    });
