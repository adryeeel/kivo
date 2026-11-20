'use client';

import type { SubmitEvent } from 'react';

import { Button } from '@base-ui/react/button';
import { Dialog } from '@base-ui/react/dialog';
import { Input } from '@base-ui/react/input';
import { Eye, EyeOff, LockKeyhole, Mail, X } from 'lucide-react';
import { useRef, useState } from 'react';

type FieldErrors = { email?: string; password?: string };

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState('');
  const [help, setHelp] = useState<'reset' | 'signup' | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = emailRef.current!;
    const password = passwordRef.current!;
    const nextErrors: FieldErrors = {};
    if (!email.value.trim()) nextErrors.email = 'Enter your email address.';
    else if (email.validity.typeMismatch) nextErrors.email = 'Enter a valid email address.';
    if (!password.value) nextErrors.password = 'Enter your password.';
    setErrors(nextErrors);
    setNotice('');
    if (nextErrors.email) email.focus();
    else if (nextErrors.password) password.focus();
    // shortcut: this preview has no auth API; connect Better Auth before accepting sign-ins.
    else
      setNotice(
        'This is a first look at Kivo. Sign-in isn’t available yet, and your details haven’t been sent.',
      );
  }

  return (
    <div className="w-full max-w-80">
      <h1 className="text-2xl leading-8 font-semibold tracking-[-0.7px]">Welcome home.</h1>
      <p className="mt-2 text-sm leading-6 text-muted">Sign in to your family space.</p>
      <form onSubmit={submit} noValidate aria-label="Sign in" className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email address
          </label>
          <div className="input-shell">
            <Mail size={16} strokeWidth={1.6} aria-hidden="true" />
            <Input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className="h-11 w-full min-w-0 bg-transparent text-base text-ink outline-none placeholder:text-muted lg:text-sm"
              onInput={() => {
                setErrors((current) => ({ ...current, email: undefined }));
                setNotice('');
              }}
            />
          </div>
          {errors.email ? (
            <p className="mt-2 text-xs leading-5 text-error" id="email-error">
              {errors.email}
            </p>
          ) : null}
        </div>
        <div>
          <div className="mb-3 flex min-h-6 items-center justify-between gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Button className="text-button -my-2.5" onClick={() => setHelp('reset')}>
              Forgot password?
            </Button>
          </div>
          <div className="input-shell pr-0">
            <LockKeyhole size={16} strokeWidth={1.6} aria-hidden="true" />
            <Input
              ref={passwordRef}
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className="h-11 w-full min-w-0 bg-transparent text-base text-ink outline-none placeholder:text-muted lg:text-sm"
              onInput={() => {
                setErrors((current) => ({ ...current, password: undefined }));
                setNotice('');
              }}
            />
            <Button
              className="grid size-11 shrink-0 place-items-center rounded-md text-muted hover:text-ink"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={16} strokeWidth={1.6} aria-hidden="true" />
              ) : (
                <Eye size={16} strokeWidth={1.6} aria-hidden="true" />
              )}
            </Button>
          </div>
          {errors.password ? (
            <p className="mt-2 text-xs leading-5 text-error" id="password-error">
              {errors.password}
            </p>
          ) : null}
        </div>
        <Button className="button-primary mt-1 w-full" type="submit">
          Sign in
        </Button>
        <output
          className={
            notice
              ? 'rounded-md border border-line bg-raised px-3 py-2.5 text-xs leading-5 text-muted'
              : 'empty:hidden'
          }
        >
          {notice}
        </output>
      </form>
      <p className="mt-4 flex flex-wrap items-center justify-center gap-1 text-sm text-muted">
        New to Kivo?{' '}
        <Button className="text-button" onClick={() => setHelp('signup')}>
          Create an account
        </Button>
      </p>
      <Dialog.Root
        open={help !== null}
        onOpenChange={(open) => {
          if (!open) setHelp(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 bg-black/45 backdrop-blur-xs" />
          <Dialog.Popup className="fixed top-1/2 left-1/2 max-h-[calc(100dvh-40px)] w-[calc(100%-40px)] max-w-sm -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-line bg-surface p-7 text-ink shadow-xl">
            <Dialog.Title className="pr-5 text-xl font-semibold tracking-tight">
              {help === 'reset' ? 'Password recovery' : 'Join your family on Kivo'}
            </Dialog.Title>
            <Dialog.Description className="mt-3 text-sm leading-6 text-muted">
              {help === 'reset'
                ? 'Password recovery will be available when Kivo opens for sign-in. This first look doesn’t create or access real accounts.'
                : 'Account creation is coming with Kivo’s first release. For now, take a look around and make yourself at home.'}
            </Dialog.Description>
            <Dialog.Close className="button-primary mt-6 w-full">Got it</Dialog.Close>
            <Dialog.Close
              className="absolute top-1 right-1 grid size-11 place-items-center rounded-md text-muted hover:text-ink"
              aria-label="Close"
            >
              <X size={17} aria-hidden="true" />
            </Dialog.Close>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
