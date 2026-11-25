export function PreviewSummary() {
    return (
        <dl className='grid grid-cols-1 gap-5 min-[360px]:grid-cols-2'>
            <div>
                <dt className='text-muted-foreground min-h-10 text-sm leading-5'>
                    Shared this month
                </dt>
                <dd className='mt-1 text-2xl font-semibold tabular-nums'>€1,280</dd>
            </div>
            <div>
                <dt className='text-muted-foreground min-h-10 text-sm leading-5'>
                    You’re owed · all time
                </dt>
                <dd className='mt-1 text-2xl font-semibold tabular-nums'>€60</dd>
            </div>
        </dl>
    );
}
