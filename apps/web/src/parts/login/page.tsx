import { SiteShell } from '@/components/site-shell';

import { LoginForm } from '@/parts/login/form';
import { FamilyPreview } from '@/parts/login/preview';

// Adapted from shadcn/ui login-02; see THIRD_PARTY_NOTICES.md.
export function LoginPage() {
    return (
        <SiteShell>
            <main className='grid lg:grid-cols-2'>
                <FamilyPreview />
                <section
                    aria-label='Sign in to Kivo'
                    className='flex min-w-0 items-start justify-center px-6 py-10 lg:items-center lg:p-12'
                >
                    <LoginForm />
                </section>
            </main>
        </SiteShell>
    );
}
