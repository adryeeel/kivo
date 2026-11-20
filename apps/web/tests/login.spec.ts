import { expect, test } from '@playwright/test';

test('follows system appearance, persists an explicit choice, and can return to system', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/login');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('radio', { name: 'System theme' })).toBeChecked();
  await page.getByRole('radio', { name: 'Light theme' }).check();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.emulateMedia({ colorScheme: 'light' });
  await page.getByRole('radio', { name: 'Dark theme' }).check();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('radio', { name: 'System theme' }).check();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('uses the saved theme before the application loads', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('kivo.theme', 'dark'));
  await page.route('**/src/main.tsx', (route) => route.abort());
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).toHaveCSS(
    'background-color',
    'rgb(19, 20, 22)',
  );
});

test('works when storage is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Storage blocked');
      },
    });
  });
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await page.getByRole('radio', { name: 'Dark theme' }).check();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(
    page.getByRole('heading', { name: 'Welcome home.' }),
  ).toBeVisible();
});

test('invalid stored preferences fall back to the system', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('kivo.theme', 'invalid'));
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('radio', { name: 'System theme' })).toBeChecked();
});

test('validates fields, reveals the password, and never submits credentials in the preview', async ({
  page,
}) => {
  const credentialRequests: string[] = [];
  page.on('request', (request) => {
    if (request.method() === 'POST' || request.url().includes('example.com'))
      credentialRequests.push(request.url());
  });
  await page.goto('/login');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByText('Enter your email address.')).toBeVisible();
  await expect(page.getByLabel('Email address')).toBeFocused();
  await page.getByLabel('Email address').fill('invalid');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByText('Enter a valid email address.')).toBeVisible();
  await page.getByLabel('Email address').fill('ana@example.com');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByLabel('Password', { exact: true })).toBeFocused();
  await page
    .getByLabel('Password', { exact: true })
    .fill('preview-only-password');
  await page.getByRole('button', { name: 'Show password' }).click();
  await expect(page.getByLabel('Password', { exact: true })).toHaveAttribute(
    'type',
    'text',
  );
  await page.getByRole('button', { name: 'Hide password' }).click();
  await expect(page.getByLabel('Password', { exact: true })).toHaveAttribute(
    'type',
    'password',
  );
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByRole('status')).toContainText(
    'Sign-in isn’t available yet',
  );
  expect(credentialRequests).toEqual([]);
  const saved = await page.evaluate(() =>
    JSON.stringify({ ...localStorage, ...sessionStorage }),
  );
  expect(saved).not.toContain('ana@example.com');
  expect(saved).not.toContain('preview-only-password');
});

test('recovery and account information open as accessible dialogs', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Forgot password?' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog')).toContainText(
    'Password recovery will be available',
  );
  await page.getByRole('button', { name: 'Got it' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Forgot password?' }),
  ).toBeFocused();
  await page.getByRole('button', { name: 'Create an account' }).click();
  await expect(page.getByRole('dialog')).toContainText(
    'Account creation is coming',
  );
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('synchronizes the theme between tabs without storing form details', async ({
  page,
  context,
}) => {
  await page.goto('/');
  const otherTab = await context.newPage();
  await otherTab.goto('/');
  await page.getByRole('radio', { name: 'Dark theme' }).check();
  await expect(otherTab.locator('html')).toHaveAttribute('data-theme', 'dark');
  await otherTab.getByRole('radio', { name: 'Light theme' }).check();
  await expect(page.getByRole('radio', { name: 'Light theme' })).toBeChecked();
});

test('remains usable with doubled text and a short viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 640, height: 360 });
  await page.goto('/');
  await page.evaluate(() => {
    document.documentElement.style.zoom = '2';
  });
  await page.getByLabel('Email address').fill('ana@example.com');
  await page.getByLabel('Password', { exact: true }).fill('preview-only');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByRole('status')).toContainText(
    'Sign-in isn’t available yet',
  );
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(640);
});

for (const width of [320, 390, 768, 1440]) {
  test(`fits a ${width}px viewport in both themes`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    for (const theme of ['Light', 'Dark']) {
      await page.getByRole('radio', { name: `${theme} theme` }).check();
      await expect(
        page.getByRole('heading', { name: 'Welcome home.' }),
      ).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      await expect(
        page.getByRole('button', { name: 'Sign in', exact: true }),
      ).toBeVisible();
    }
  });
}
