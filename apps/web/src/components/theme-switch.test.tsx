import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { expect, test, vi } from 'vitest';
import { ThemeProvider } from './theme-provider';
import { ThemeSwitch } from './theme-switch';

test('persists theme choices under the existing storage key', async () => {
  const user = userEvent.setup();
  render(
    <ThemeProvider>
      <ThemeSwitch />
    </ThemeProvider>,
  );
  expect(screen.getByRole('radio', { name: 'System theme' })).toBeChecked();
  await user.click(screen.getByRole('radio', { name: 'Dark theme' }));
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(localStorage.getItem('kivo.theme')).toBe('dark');
  await user.click(screen.getByRole('radio', { name: 'Light theme' }));
  expect(document.documentElement.dataset.theme).toBe('light');
});

test('the provider initializes a persisted theme before hydration', () => {
  localStorage.setItem('kivo.theme', 'dark');
  const container = document.createElement('div');
  container.innerHTML = renderToString(
    <ThemeProvider>
      <ThemeSwitch />
    </ThemeProvider>,
  );
  const script = container.querySelector('script');
  expect(script).not.toBeNull();
  window.eval(script!.textContent!);
  expect(document.documentElement.dataset.theme).toBe('dark');
});

test('follows OS changes in system mode and honors explicit choices', async () => {
  const user = userEvent.setup();
  const events = new EventTarget();
  const media = {
    matches: false,
    addListener: (listener: EventListener) => events.addEventListener('change', listener),
    removeListener: (listener: EventListener) => events.removeEventListener('change', listener),
    addEventListener: events.addEventListener.bind(events),
    removeEventListener: events.removeEventListener.bind(events),
  };
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => media),
  );
  render(
    <ThemeProvider>
      <ThemeSwitch />
    </ThemeProvider>,
  );
  act(() => {
    media.matches = true;
    events.dispatchEvent(Object.assign(new Event('change'), { matches: true }));
  });
  expect(document.documentElement.dataset.theme).toBe('dark');
  await user.click(screen.getByRole('radio', { name: 'Light theme' }));
  expect(document.documentElement.dataset.theme).toBe('light');
  await user.click(screen.getByRole('radio', { name: 'System theme' }));
  expect(document.documentElement.dataset.theme).toBe('dark');
});

test('synchronizes external storage changes and resets to system when cleared', () => {
  render(
    <ThemeProvider>
      <ThemeSwitch />
    </ThemeProvider>,
  );
  act(() =>
    window.dispatchEvent(new StorageEvent('storage', { key: 'kivo.theme', newValue: 'dark' })),
  );
  expect(screen.getByRole('radio', { name: 'Dark theme' })).toBeChecked();
  expect(document.documentElement.dataset.theme).toBe('dark');
  act(() =>
    window.dispatchEvent(new StorageEvent('storage', { key: 'kivo.theme', newValue: null })),
  );
  expect(screen.getByRole('radio', { name: 'System theme' })).toBeChecked();
});

test('keeps the theme usable when storage is blocked', async () => {
  const user = userEvent.setup();
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('Blocked');
  });
  render(
    <ThemeProvider>
      <ThemeSwitch />
    </ThemeProvider>,
  );
  await user.click(screen.getByRole('radio', { name: 'Dark theme' }));
  expect(screen.getByRole('radio', { name: 'Dark theme' })).toBeChecked();
  expect(document.documentElement.dataset.theme).toBe('dark');
});

test('hydrates a saved theme without server/client mismatch', async () => {
  const container = document.createElement('div');
  const component = (
    <ThemeProvider>
      <ThemeSwitch />
    </ThemeProvider>
  );
  container.innerHTML = renderToString(component);
  document.body.append(container);
  localStorage.setItem('kivo.theme', 'dark');
  const onRecoverableError = vi.fn<() => void>();
  let root: ReturnType<typeof hydrateRoot> | undefined;
  try {
    await act(async () => {
      root = hydrateRoot(container, component, { onRecoverableError });
    });
    expect(screen.getByRole('radio', { name: 'Dark theme' })).toBeChecked();
    expect(onRecoverableError).not.toHaveBeenCalled();
  } finally {
    act(() => root?.unmount());
    container.remove();
  }
});
