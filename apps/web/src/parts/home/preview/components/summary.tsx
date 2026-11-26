export function PreviewSummary() {
    return (
        <dl className='grid grid-cols-1 gap-x-10 gap-y-8 @[18rem]:grid-cols-2 @[18rem]:gap-y-3'>
            <div className='grid min-w-0 grid-cols-[minmax(0,1fr)] gap-3 @[18rem]:row-span-2 @[18rem]:grid-rows-subgrid'>
                <dt className='text-muted-foreground text-sm leading-5'>Shared this month</dt>
                <dd className='font-heading text-3xl font-semibold tracking-tight wrap-anywhere tabular-nums'>
                    €1,280
                </dd>
            </div>
            <div className='grid min-w-0 grid-cols-[minmax(0,1fr)] gap-3 @[18rem]:row-span-2 @[18rem]:grid-rows-subgrid'>
                <dt className='text-muted-foreground text-sm leading-5'>You’re owed · all time</dt>
                <dd className='font-heading text-primary text-3xl font-semibold tracking-tight wrap-anywhere tabular-nums'>
                    €60
                </dd>
            </div>
        </dl>
    );
}
