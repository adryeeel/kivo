import { page } from 'vitest/browser';
import { onTestFinished } from 'vitest';

export async function setViewport(width: number, height: number) {
    const previous = { width: window.innerWidth, height: window.innerHeight };

    onTestFinished(() => page.viewport(previous.width, previous.height));

    await page.viewport(width, height);
}

export function enlargeText() {
    const previous = document.documentElement.style.fontSize;

    onTestFinished(() => {
        document.documentElement.style.fontSize = previous;
    });

    document.documentElement.style.fontSize = '200%';
}

export function setTheme(theme: string) {
    const previous = document.documentElement.classList.contains('dark');

    onTestFinished(() => {
        document.documentElement.classList.toggle('dark', previous);
    });

    document.documentElement.classList.toggle('dark', theme === 'dark');
}
