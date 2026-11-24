import { it, expect } from 'vitest';
import { render } from 'vitest-browser-react';

import { LoginForm } from '@/parts/login/form';

it('validates on submit, focuses the first error, and revalidates edits', async () => {
    const screen = await render(<LoginForm />);
    const email = screen.getByLabelText('Email address');
    const password = screen.getByLabelText('Password', { exact: true });
    const submit = screen.getByRole('button', { exact: true, name: 'Sign in' });

    await submit.click();
    await expect.element(email).toHaveFocus();
    await expect.element(email).toHaveAttribute('aria-invalid', 'true');
    await expect.element(screen.getByText('Enter your email address.')).toBeVisible();

    await email.fill('invalid');
    await expect.element(screen.getByText('Enter a valid email address.')).toBeVisible();
    await email.fill('ana@example.com');
    await expect.element(screen.getByText('Enter a valid email address.')).not.toBeInTheDocument();
    await submit.click();
    await expect.element(password).toHaveFocus();
    await expect.element(screen.getByText('Enter your password.')).toBeVisible();
});

it('reveals and hides the entered password without changing it', async () => {
    const screen = await render(<LoginForm />);
    const password = screen.getByLabelText('Password', { exact: true });

    await password.fill(' preview-only ');
    await screen.getByRole('button', { name: 'Show password' }).click();
    await expect.element(password).toHaveAttribute('type', 'text');
    await expect.element(password).toHaveValue(' preview-only ');
    await screen.getByRole('button', { name: 'Hide password' }).click();
    await expect.element(password).toHaveAttribute('type', 'password');
    await expect.element(password).toHaveValue(' preview-only ');
});
