export function PreviewSummary() {
    return (
        <dl className='grid grid-cols-2 gap-4'>
            <div>
                <dt className='text-muted-foreground text-xs'>Shared this month</dt>
                <dd className='mt-1 text-2xl font-semibold tabular-nums'>€1,280.00</dd>
            </div>
            <div>
                <dt className='text-muted-foreground text-xs'>You are owed · all time</dt>
                <dd className='mt-1 text-2xl font-semibold tabular-nums'>€60.00</dd>
            </div>
        </dl>
    );
}
