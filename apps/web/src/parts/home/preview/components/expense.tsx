import { CheckIcon, ShoppingBasketIcon } from '@kivo/ui/icons/symbols';

export function PreviewExpense() {
    return (
        <div className='grid w-full grid-cols-1 items-start gap-4 wrap-anywhere @[12rem]:grid-cols-[auto_minmax(0,1fr)] @[18rem]:grid-cols-[auto_minmax(0,1fr)_auto]'>
            <span className='bg-muted text-muted-foreground hidden size-12 items-center justify-center rounded-2xl @[12rem]:flex'>
                <ShoppingBasketIcon className='size-5' aria-hidden='true' />
            </span>
            <div className='min-w-0'>
                <p className='font-medium'>The weekly shop</p>
                <p className='text-muted-foreground mt-2 text-sm'>Ana paid · 3 people</p>
            </div>
            <div className='min-w-0 @[12rem]:col-start-2 @[18rem]:col-start-auto @[18rem]:ml-auto @[18rem]:text-right'>
                <p className='font-medium tabular-nums'>€90</p>
                <p className='text-muted-foreground mt-2 inline-flex items-center gap-2 text-sm'>
                    <CheckIcon className='size-3' aria-hidden='true' /> Equal split
                </p>
            </div>
        </div>
    );
}
