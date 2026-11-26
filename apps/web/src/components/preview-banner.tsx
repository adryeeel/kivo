export function PreviewBanner() {
    return (
        <aside
            aria-label='Preview notice'
            className='bg-primary text-primary-foreground px-6 py-2 pt-[max(0.5rem,env(safe-area-inset-top))] text-center text-sm leading-6'
        >
            Preview: sample data only. Account actions aren’t connected yet. Don’t enter real
            credentials.
        </aside>
    );
}
