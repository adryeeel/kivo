import { expect } from 'vitest';

import { it } from './utils/context';

it('reveals and hides the entered password without changing it', async ({ form }) => {
    const password = form.getByLabelText('Password', { exact: true });

    await password.fill(' preview-only ');
    await form.getByRole('button', { name: 'Show password' }).click();

    await expect.element(password).toHaveAttribute('type', 'text');
    await expect.element(password).toHaveValue(' preview-only ');

    await form.getByRole('button', { name: 'Hide password' }).click();

    await expect.element(password).toHaveAttribute('type', 'password');
    await expect.element(password).toHaveValue(' preview-only ');
});
