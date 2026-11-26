import { page } from 'vitest/browser';
import { onTestFinished } from 'vitest';
import { render } from 'vitest-browser-react';
import { renderToString } from 'react-dom/server';

import { LoginForm } from '@/parts/login/form';

export function renderForm() {
    return render(<LoginForm />);
}

export function renderStaticForm() {
    const container = document.body.appendChild(document.createElement('div'));

    onTestFinished(() => {
        return container.remove();
    });

    container.innerHTML = renderToString(<LoginForm />);

    return page.elementLocator(container);
}
