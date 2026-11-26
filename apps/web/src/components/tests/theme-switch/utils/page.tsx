import { render } from 'vitest-browser-react';

import { ThemeProvider } from '@kivo/ui/providers/theme';

import { ThemeSwitch } from '@/components/theme-switch';

function Page() {
    return (
        <ThemeProvider defaultTheme='light'>
            <ThemeSwitch />
        </ThemeProvider>
    );
}

export function renderThemeSwitch() {
    return render(<Page />);
}
