import { expect } from 'vitest';

import { it } from './utils/context';

it('leaves incomplete input alone while typing and moving between fields', async ({ form }) => {
    const email = form.getByLabelText('Email address');

    const password = form.getByLabelText('Password', { exact: true });

    await email.fill('ana@');

    await password.fill('unfinished');

    await password.fill('');

    await email.click();

    await expect.element(email).toHaveAttribute('aria-invalid', 'false');

    await expect.element(password).toHaveAttribute('aria-invalid', 'false');

    await expect.element(form.getByText('Enter a valid email address.')).not.toBeInTheDocument();

    await expect.element(form.getByText('Enter your password.')).not.toBeInTheDocument();

    await expect.element(form.getByRole('status')).not.toBeInTheDocument();
});

it('shows required errors and focuses the first invalid field on submit', async ({ invalid }) => {
    await expect.element(invalid.getByLabelText('Email address')).toHaveFocus();

    await expect
        .element(invalid.getByLabelText('Email address'))
        .toHaveAttribute('aria-invalid', 'true');

    await expect
        .element(invalid.getByLabelText('Password', { exact: true }))
        .toHaveAttribute('aria-invalid', 'true');

    await expect.element(invalid.getByText('Enter your email address.')).toBeVisible();

    await expect.element(invalid.getByText('Enter your password.')).toBeVisible();
});

it('clears only the edited email error until resubmission', async ({ invalid }) => {
    const email = invalid.getByLabelText('Email address');

    await email.fill('invalid');

    await invalid.getByLabelText('Password', { exact: true }).click();

    await expect.element(email).toHaveAttribute('aria-invalid', 'false');

    await expect.element(invalid.getByText('Enter your email address.')).not.toBeInTheDocument();

    await expect.element(invalid.getByText('Enter a valid email address.')).not.toBeInTheDocument();

    await expect.element(invalid.getByText('Enter your password.')).toBeVisible();

    await invalid.getByRole('button', { exact: true, name: 'Sign in' }).click();

    await expect.element(email).toHaveFocus();

    await expect.element(invalid.getByText('Enter a valid email address.')).toBeVisible();
});

it('clears a malformed email error as soon as the address is edited', async ({ form }) => {
    const email = form.getByLabelText('Email address');

    await email.fill('invalid');

    await form.getByRole('button', { exact: true, name: 'Sign in' }).click();

    await expect.element(form.getByText('Enter a valid email address.')).toBeVisible();

    await email.fill('ana@example.com');

    await expect.element(email).toHaveAttribute('aria-invalid', 'false');

    await expect.element(form.getByText('Enter a valid email address.')).not.toBeInTheDocument();
});

it('focuses the remaining invalid password after email is corrected', async ({ invalid }) => {
    await invalid.getByLabelText('Email address').fill('ana@example.com');

    await invalid.getByRole('button', { exact: true, name: 'Sign in' }).click();

    await expect.element(invalid.getByText('Enter your email address.')).not.toBeInTheDocument();

    await expect.element(invalid.getByLabelText('Password', { exact: true })).toHaveFocus();

    await expect.element(invalid.getByText('Enter your password.')).toBeVisible();
});

it('rechecks a password cleared again after editing', async ({ invalid }) => {
    const password = invalid.getByLabelText('Password', { exact: true });

    await invalid.getByLabelText('Email address').fill('ana@example.com');

    await password.fill('unfinished');

    await password.fill('');

    await invalid.getByLabelText('Email address').click();

    await expect.element(password).toHaveAttribute('aria-invalid', 'false');

    await expect.element(invalid.getByText('Enter your password.')).not.toBeInTheDocument();

    await invalid.getByRole('button', { exact: true, name: 'Sign in' }).click();

    await expect.element(password).toHaveFocus();

    await expect.element(invalid.getByText('Enter your password.')).toBeVisible();
});
