import type { ComponentProps } from 'react';

function Link({ href, children, ...props }: ComponentProps<'a'>) {
    return (
        <a href={href} {...props}>
            {children}
        </a>
    );
}

export { Link as default };
