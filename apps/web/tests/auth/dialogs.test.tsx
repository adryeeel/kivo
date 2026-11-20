import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { LoginForm } from '../../src/features/auth/login-form';

test.each([
  ['Forgot password?', 'Password recovery will be available'],
  ['Create an account', 'Account creation is coming'],
])('%s explains the preview boundary and restores focus', async (name, message) => {
  const screen = await render(<LoginForm />);
  const trigger = screen.getByRole('button', { name });
  await trigger.click();
  await expect.element(page.getByRole('dialog')).toMatchTextContent(message);
  await page.getByRole('button', { name: 'Got it' }).click();
  await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
  await expect.element(trigger).toHaveFocus();
});
