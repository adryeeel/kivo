import { it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, commands, userEvent } from 'vitest/browser';

import { LoginForm } from '@/parts/login/form';

it.for([
    { name: 'Forgot password?', message: 'Password recovery is unavailable right now.' },
    { name: 'Create an account', message: 'Account creation is unavailable right now.' },
])('$name reports the unavailable action and restores focus', async ({ name, message }) => {
    const screen = await render(<LoginForm />);
    const trigger = screen.getByRole('button', { name, exact: true });

    await trigger.click();
    await expect.element(page.getByRole('dialog')).toMatchTextContent(message);
    await page.getByRole('button', { exact: true, name: 'Got it' }).click();
    await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
});

it('keeps help keyboard-operable with reduced motion', async () => {
    await commands.setReducedMotion('reduce');
    const screen = await render(<LoginForm />);
    const trigger = screen.getByRole('button', { exact: true, name: 'Forgot password?' });

    await trigger.click();
    await expect.element(page.getByRole('dialog')).toBeVisible();
    expect(getComputedStyle(page.getByRole('dialog').element()).transitionProperty).toBe('opacity');
    await userEvent.keyboard('{Escape}');
    await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
});
