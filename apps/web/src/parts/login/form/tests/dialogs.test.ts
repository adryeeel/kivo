import { it, expect } from 'vitest';
import { page } from 'vitest/browser';

import { renderForm } from './utils/page';

const actions = [
    { name: 'Forgot password?', message: 'Password recovery is unavailable right now.' },
    { name: 'Create an account', message: 'Account creation is unavailable right now.' },
];

it.for(actions)(
    '$name reports the unavailable action and restores focus',
    async ({ name, message }) => {
        const screen = await renderForm();
        const trigger = screen.getByRole('button', { name, exact: true });

        await trigger.click();
        await expect.element(page.getByRole('dialog')).toMatchTextContent(message);
        await page.getByRole('button', { exact: true, name: 'Got it' }).click();
        await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
        await expect.element(trigger).toHaveFocus();
    },
);
