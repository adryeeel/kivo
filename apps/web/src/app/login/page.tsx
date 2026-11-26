import type { Metadata } from 'next';

import { LoginPage } from '@/parts/login';

export const metadata: Metadata = { title: 'Sign in · Kivo' };

export default function Page() {
    return <LoginPage />;
}
