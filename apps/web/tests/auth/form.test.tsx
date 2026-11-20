import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';

import { LoginForm } from '@/features/auth/login-form';

test('validates required fields and email format, focusing the first error', async () => {
  const screen = await render(<LoginForm />);
  const email = screen.getByLabelText('Email address');
  const submit = screen.getByRole('button', { name: 'Sign in' });
  await submit.click();
  await expect.element(email).toHaveFocus();
  await expect.element(screen.getByText('Enter your email address.')).toBeVisible();
  await email.fill('invalid');
  await submit.click();
  await expect.element(screen.getByText('Enter a valid email address.')).toBeVisible();
  await email.fill('ana@example.com');
  await submit.click();
  await expect.element(screen.getByLabelText('Password')).toHaveFocus();
});

test('reveals and hides the entered password', async () => {
  const screen = await render(<LoginForm />);
  const password = screen.getByLabelText('Password');
  await password.fill('preview-only');
  await screen.getByRole('button', { name: 'Show password' }).click();
  await expect.element(password).toHaveAttribute('type', 'text');
  await expect.element(password).toHaveValue('preview-only');
  await screen.getByRole('button', { name: 'Hide password' }).click();
  await expect.element(password).toHaveAttribute('type', 'password');
});
