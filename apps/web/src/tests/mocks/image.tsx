import type { ComponentProps } from 'react';

function Image({ alt, ...props }: ComponentProps<'img'>) {
    // oxlint-disable-next-line next/no-img-element -- This mock isolates Next's image runtime, which is verified in the running app.
    return <img alt={alt} {...props} />;
}

export { Image as default };
