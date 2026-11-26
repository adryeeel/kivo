export function PreviewSummary() {
    return (
        <dl className='grid grid-cols-1 gap-x-5 gap-y-5 @[18rem]:grid-cols-2 @[18rem]:gap-y-1'>
            <div className='grid min-w-0 gap-1 @[18rem]:row-span-2 @[18rem]:grid-rows-subgrid'>
                <dt className='text-muted-foreground text-sm leading-5'>Shared this month</dt>
                <dd className='text-2xl font-semibold wrap-anywhere tabular-nums'>€1,280</dd>
            </div>
            <div className='grid min-w-0 gap-1 @[18rem]:row-span-2 @[18rem]:grid-rows-subgrid'>
                <dt className='text-muted-foreground text-sm leading-5'>You’re owed · all time</dt>
                <dd className='text-2xl font-semibold wrap-anywhere tabular-nums'>€60</dd>
            </div>
        </dl>
    );
}
