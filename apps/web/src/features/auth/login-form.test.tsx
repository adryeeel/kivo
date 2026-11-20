import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { LoginForm } from './login-form';

test('validates the form and focuses the first invalid field', async () => {
  const user = userEvent.setup();
  render(<LoginForm />);
  await user.click(screen.getByRole('button', { name: 'Sign in' }));
  expect(screen.getByLabelText('Email address')).toHaveFocus();
  expect(screen.getByText('Enter your email address.')).toBeVisible();
  await user.type(screen.getByLabelText('Email address'), 'invalid');
  await user.click(screen.getByRole('button', { name: 'Sign in' }));
  expect(screen.getByText('Enter a valid email address.')).toBeVisible();
  await user.clear(screen.getByLabelText('Email address'));
  await user.type(screen.getByLabelText('Email address'), 'ana@example.com');
  await user.click(screen.getByRole('button', { name: 'Sign in' }));
  expect(screen.getByLabelText('Password')).toHaveFocus();
  expect(screen.getByText('Enter your password.')).toBeVisible();
});

test('reveals and hides a password without clearing the entered value', async () => {
  const user = userEvent.setup();
  render(<LoginForm />);
  const password = screen.getByLabelText('Password');
  await user.type(password, 'preview-only');
  await user.click(screen.getByRole('button', { name: 'Show password' }));
  expect(password).toHaveAttribute('type', 'text');
  expect(password).toHaveValue('preview-only');
  await user.click(screen.getByRole('button', { name: 'Hide password' }));
  expect(password).toHaveAttribute('type', 'password');
});

test('does not send or persist credentials when submitting the preview', async () => {
  const fetch = vi.spyOn(globalThis, 'fetch');
  const user = userEvent.setup();
  render(<LoginForm />);
  await user.type(screen.getByLabelText('Email address'), 'ana@example.com');
  await user.type(screen.getByLabelText('Password'), 'preview-only');
  await user.click(screen.getByRole('button', { name: 'Sign in' }));
  expect(screen.getByRole('status')).toHaveTextContent('Sign-in isn’t available yet');
  expect(fetch).not.toHaveBeenCalled();
  expect(localStorage.length).toBe(0);
  expect(sessionStorage.length).toBe(0);
  expect(screen.getByLabelText('Email address')).toHaveValue('ana@example.com');
});

test.each([
  ['Forgot password?', 'Password recovery will be available'],
  ['Create an account', 'Account creation is coming'],
])('explains the preview boundary for %s and restores focus', async (name, message) => {
  const user = userEvent.setup();
  render(<LoginForm />);
  const trigger = screen.getByRole('button', { name });
  await user.click(trigger);
  expect(screen.getByRole('dialog')).toHaveTextContent(message);
  await user.click(screen.getByRole('button', { name: 'Got it' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});
