import { act } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { ThemeProvider } from '../../src/components/theme-provider';
import { ThemeSwitch } from '../../src/components/theme-switch';

test('initializes the saved theme before hydration without a mismatch', async () => {
  const component = (
    <ThemeProvider>
      <ThemeSwitch />
    </ThemeProvider>
  );
  const container = document.body.appendChild(document.createElement('div'));
  container.innerHTML = renderToString(component);
  localStorage.setItem('kivo.theme', 'dark');
  window.eval(container.querySelector('script')!.textContent!);
  expect(document.documentElement.dataset.theme).toBe('dark');
  const onRecoverableError = vi.fn<() => void>();
  const root = hydrateRoot(container, component, { onRecoverableError });
  try {
    await expect
      .poll(() => container.querySelector<HTMLInputElement>('input[value="dark"]')?.checked)
      .toBe(true);
    expect(onRecoverableError).not.toHaveBeenCalled();
  } finally {
    await act(async () => root.unmount());
    container.remove();
  }
});

test('reflects changes from another tab and resets when the key is removed', async () => {
  const screen = await render(<ThemeSwitch />, { wrapper: ThemeProvider });
  window.dispatchEvent(new StorageEvent('storage', { key: 'kivo.theme', newValue: 'dark' }));
  await expect.element(screen.getByRole('radio', { name: 'Dark theme' })).toBeChecked();
  window.dispatchEvent(new StorageEvent('storage', { key: 'kivo.theme', newValue: null }));
  await expect.element(screen.getByRole('radio', { name: 'System theme' })).toBeChecked();
});

test('keeps appearance usable when saving to storage is blocked', async () => {
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('Blocked');
  });
  const screen = await render(<ThemeSwitch />, { wrapper: ThemeProvider });
  await screen.getByRole('radio', { name: 'Dark theme' }).click();
  await expect.element(screen.getByRole('radio', { name: 'Dark theme' })).toBeChecked();
  await expect.poll(() => document.documentElement.dataset.theme).toBe('dark');
});
