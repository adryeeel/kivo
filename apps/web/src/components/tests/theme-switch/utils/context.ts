import { test, onTestFinished } from 'vitest';

import { renderThemeSwitch } from './page';

export const it = test.extend('appearance', async () => {
    const previousTheme = localStorage.getItem('theme');

    const previousClass = document.documentElement.className;

    onTestFinished(() => {
        if (previousTheme === null) {
            localStorage.removeItem('theme');
        } else {
            localStorage.setItem('theme', previousTheme);
        }

        document.documentElement.className = previousClass;
    });

    return renderThemeSwitch();
});
