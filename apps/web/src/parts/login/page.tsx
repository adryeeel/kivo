import { SiteShell } from '@/components/site-shell';

import { LoginForm } from '@/parts/login/form';

// Uses shadcn/ui form primitives; see THIRD_PARTY_NOTICES.md.
export function LoginPage() {
    return (
        <SiteShell>
            <main className='flex min-w-0 items-start justify-center px-6 py-12 sm:items-center sm:py-16'>
                <LoginForm />
            </main>
        </SiteShell>
    );
}
