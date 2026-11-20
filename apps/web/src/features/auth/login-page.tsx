import { Brand } from '@/components/brand';
import { ThemeSwitch } from '@/components/theme-switch';
import { FamilyPreview } from '@/features/auth/family-preview';
import { LoginForm } from '@/features/auth/login-form';

export function LoginPage() {
  return (
    <div className="grid min-h-svh w-full grid-rows-[auto_1fr_auto] bg-surface">
      <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 pt-[max(12px,env(safe-area-inset-top))] lg:px-7">
        <Brand />
        <ThemeSwitch />
      </header>
      <main className="grid lg:grid-cols-2">
        <FamilyPreview />
        <section
          className="flex min-w-0 items-center justify-center px-6 py-10 lg:p-10"
          aria-label="Sign in to Kivo"
        >
          <LoginForm />
        </section>
      </main>
      <footer className="border-t border-line px-5 py-3 pb-[max(12px,env(safe-area-inset-bottom))] text-center text-xs text-muted">
        © Kivo
      </footer>
    </div>
  );
}
