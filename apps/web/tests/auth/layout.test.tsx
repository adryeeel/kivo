import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { LoginPage } from '../../src/features/auth/login-page';
import { ThemeProvider } from '../../src/components/theme-provider';

test.each([
  [1440, 900],
  [390, 844],
])('fills a %i×%i viewport without horizontal overflow', async (width, height) => {
  await page.viewport(width, height);
  const screen = await render(<LoginPage />, { wrapper: ThemeProvider });
  await expect.element(screen.getByRole('heading', { name: 'Welcome home.' })).toBeVisible();
  const shell = screen.getByRole('banner').element().parentElement!.getBoundingClientRect();
  expect([shell.x, shell.y, shell.width]).toEqual([0, 0, width]);
  expect(shell.height).toBeGreaterThanOrEqual(height);
  expect(document.documentElement.scrollWidth).toBe(width);
});
