// @vitest-environment node
import { renderToString } from 'react-dom/server';
import { expect, test } from 'vitest';
import { LoginPage } from './login-page';

test('renders the login page on the server without browser globals', () => {
  const html = renderToString(<LoginPage />);
  expect(html).toContain('Welcome home.');
  expect(html).toContain('© Kivo');
  expect(html).not.toContain('Made for life together');
});
