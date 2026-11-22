import { SITE } from '@/const/site';

export function HomePage() {
    return (
        <main className='mx-auto max-w-3xl px-6 py-16'>
            <h1 className='text-3xl font-semibold'>{SITE.title}</h1>
            <p className='mt-4'>{SITE.description}</p>
        </main>
    );
}
