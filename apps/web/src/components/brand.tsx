import Image from 'next/image';

export function Brand() {
    return (
        <span className='text-foreground inline-flex items-center gap-1'>
            <Image
                src='/brand/kivo-mark.svg'
                alt=''
                width={44}
                height={44}
                className='dark:brightness-0 dark:invert'
            />
            <span className='font-heading text-4xl font-bold tracking-[-0.045em]'>kivo</span>
        </span>
    );
}
