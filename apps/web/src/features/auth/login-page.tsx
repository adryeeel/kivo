import { useRef, useState, type SubmitEvent } from 'react';
import { Button } from '@base-ui/react/button';
import { Dialog } from '@base-ui/react/dialog';
import { Input } from '@base-ui/react/input';
import {
  CircleHelp,
  Eye,
  EyeOff,
  Heart,
  LockKeyhole,
  Mail,
  Users,
  X,
} from 'lucide-react';
import { Brand } from '../../components/brand';
import { ThemeSwitch } from '../../components/theme-switch';
import { FamilyPreview } from './family-preview';

type FieldErrors = { email?: string; password?: string };

export function LoginPage() {
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
    else if (email.validity.typeMismatch)
      nextErrors.email = 'Enter a valid email address.';
    if (!password.value) nextErrors.password = 'Enter your password.';
    setErrors(nextErrors);
    setNotice('');
    if (nextErrors.email) email.focus();
    else if (nextErrors.password) password.focus();
    // shortcut: this first-look slice has no auth API; connect Better Auth before accepting sign-ins.
    else
      setNotice(
        'This is a first look at Kivo. Sign-in isn’t available yet, and your details haven’t been sent.',
      );
  }

  return (
    <div className="app-shell">
      <FamilyPreview />
      <section className="auth-side" aria-label="Sign in to Kivo">
        <header className="auth-header">
          <span className="mobile-brand">
            <Brand />
          </span>
          <ThemeSwitch />
        </header>
        <main id="main" className="auth-main">
          <div className="login-intro">
            <span className="welcome-icon">
              <LockKeyhole size={22} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <h1>Welcome home.</h1>
            <p>
              A clearer picture. A little less to think about.
              <br />
              Sign in to your family space.
            </p>
          </div>
          <form
            onSubmit={submit}
            noValidate
            aria-label="Sign in"
            className="login-form"
          >
            <div className="field">
              <label htmlFor="email">Email address</label>
              <div className="input-wrapper">
                <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
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
                  onInput={() => {
                    setErrors((current) => ({ ...current, email: undefined }));
                    setNotice('');
                  }}
                />
              </div>
              {errors.email ? (
                <p className="field-error" id="email-error">
                  {errors.email}
                </p>
              ) : null}
            </div>
            <div className="field">
              <div className="field-label">
                <label htmlFor="password">Password</label>
                <Button
                  className="text-button forgot-password"
                  onClick={() => setHelp('reset')}
                >
                  Forgot password?
                </Button>
              </div>
              <div className="input-wrapper">
                <LockKeyhole size={18} strokeWidth={1.5} aria-hidden="true" />
                <Input
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? 'password-error' : undefined
                  }
                  onInput={() => {
                    setErrors((current) => ({
                      ...current,
                      password: undefined,
                    }));
                    setNotice('');
                  }}
                />
                <Button
                  className="password-toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} strokeWidth={1.5} aria-hidden="true" />
                  ) : (
                    <Eye size={18} strokeWidth={1.5} aria-hidden="true" />
                  )}
                </Button>
              </div>
              {errors.password ? (
                <p className="field-error" id="password-error">
                  {errors.password}
                </p>
              ) : null}
            </div>
            <Button className="primary-button" type="submit">
              Sign in
            </Button>
            <div role="status" className={notice ? 'form-notice' : undefined}>
              {notice}
            </div>
          </form>
          <p className="signup-prompt">
            New to the family?{' '}
            <Button className="text-button" onClick={() => setHelp('signup')}>
              Create an account
            </Button>
          </p>
          <div className="auth-divider" />
          <div className="privacy-note">
            <span className="privacy-icon">
              <Users size={19} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <p>
              Shared goals. Personal space.
              <br />
              <span>You choose what’s part of the family picture.</span>
            </p>
          </div>
        </main>
        <footer className="auth-footer">
          <span>© {new Date().getFullYear()} Kivo</span>
          <span>
            Made for life together <Heart size={12} aria-hidden="true" />
          </span>
        </footer>
      </section>
      <Dialog.Root
        open={help !== null}
        onOpenChange={(open) => {
          if (!open) setHelp(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Backdrop className="dialog-backdrop" />
          <Dialog.Popup className="dialog-popup">
            <CircleHelp
              className="dialog-icon"
              size={28}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <Dialog.Title>
              {help === 'reset'
                ? 'A fresh start, soon.'
                : 'There’s room for your family.'}
            </Dialog.Title>
            <Dialog.Description>
              {help === 'reset'
                ? 'Password recovery will be available when Kivo opens for sign-in. This first look doesn’t create or access real accounts.'
                : 'Account creation is coming with Kivo’s first release. For now, take a look around and make yourself at home.'}
            </Dialog.Description>
            <Dialog.Close className="primary-button">Got it</Dialog.Close>
            <Dialog.Close className="dialog-close" aria-label="Close">
              <X size={18} aria-hidden="true" />
            </Dialog.Close>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
