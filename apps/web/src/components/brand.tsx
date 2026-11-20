export function Brand() {
    return (
        <span className="inline-flex items-center gap-2 text-[23px] leading-none font-bold tracking-[-1px]">
            <svg className="size-7 text-primary" viewBox="0 0 40 40" aria-hidden="true">
                <rect width="40" height="40" rx="10" fill="currentColor" />
                <path
                    d="M12 10v20m4-10 12-10M16 20l12 10"
                    fill="none"
                    className="stroke-on-primary"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <span>
                kivo<span className="text-accent">.</span>
            </span>
        </span>
    );
}
