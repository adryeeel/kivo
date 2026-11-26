import { render } from 'vitest-browser-react';

import { ThemeProvider } from '@kivo/ui/providers/theme';

import { LoginPage } from '@/parts/login';

export function renderLogin() {
    return render(<LoginPage />, { wrapper: ThemeProvider });
}
