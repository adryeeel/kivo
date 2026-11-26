import { render } from 'vitest-browser-react';

import { ThemeProvider } from '@kivo/ui/providers/theme';

import { HomePage } from '@/parts/home';

export function renderHome() {
    return render(<HomePage />, { wrapper: ThemeProvider });
}
