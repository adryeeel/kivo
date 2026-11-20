import { expect, test } from 'vitest';
import { commands } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { ThemeProvider } from '../../src/components/theme-provider';
import { ThemeSwitch } from '../../src/components/theme-switch';

test('persists an explicit preference under the existing key', async () => {
  const screen = await render(<ThemeSwitch />, { wrapper: ThemeProvider });
  await screen.getByRole('radio', { name: 'Dark theme' }).click();
  await expect.poll(() => document.documentElement.dataset.theme).toBe('dark');
  expect(localStorage.getItem('kivo.theme')).toBe('dark');
});

test('follows native OS changes only while system appearance is selected', async () => {
  const screen = await render(<ThemeSwitch />, { wrapper: ThemeProvider });
  await commands.setColorScheme('dark');
  await expect.poll(() => document.documentElement.dataset.theme).toBe('dark');
  await screen.getByRole('radio', { name: 'Light theme' }).click();
  await expect.poll(() => document.documentElement.dataset.theme).toBe('light');
  await screen.getByRole('radio', { name: 'System theme' }).click();
  await expect.poll(() => document.documentElement.dataset.theme).toBe('dark');
});
