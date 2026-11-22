import { SITE } from '@/const/site';
import { Brand } from '@/components/brand';

export function HomePage() {
    return (
        <main className='mx-auto max-w-3xl px-6 py-16'>
            <h1>
                <Brand />
            </h1>
            <p className='text-muted-foreground mt-4'>{SITE.description}</p>
        </main>
    );
}
