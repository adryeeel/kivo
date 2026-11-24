import { Progress } from '@kivo/ui/primitive/progress';
import { Separator } from '@kivo/ui/primitive/separator';
import { SunIcon, UsersIcon, CheckIcon, ShoppingBasketIcon } from '@kivo/ui/icons/symbols';
import {
    Card,
    CardTitle,
    CardHeader,
    CardAction,
    CardFooter,
    CardContent,
    CardDescription,
} from '@kivo/ui/primitive/card';

export function FamilyPreview() {
    return (
        <aside
            aria-label='A preview of your family space'
            className='bg-muted/40 hidden flex-col justify-center border-r py-12 lg:flex lg:px-12 xl:px-16'
        >
            <div className='w-full max-w-110'>
                <h2 className='font-heading text-2xl leading-8 font-semibold tracking-tight'>
                    Everyday expenses.
                    <br />
                    Bigger plans.
                </h2>
                <p className='text-muted-foreground mt-3 max-w-80 text-sm leading-6'>
                    A shared view of what you spend, what you owe, and what you’re working toward.
                </p>
                <Card size='sm' className='mt-6 gap-4'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <UsersIcon className='size-4' aria-hidden='true' /> Our family
                        </CardTitle>
                        <CardDescription>November · illustrative example</CardDescription>
                        <CardAction className='text-muted-foreground text-xs'>EUR</CardAction>
                    </CardHeader>
                    <Separator />
                    <CardContent className='flex flex-col gap-4'>
                        <dl className='grid grid-cols-2 gap-4'>
                            <div>
                                <dt className='text-muted-foreground text-xs'>Shared this month</dt>
                                <dd className='mt-1 text-2xl font-semibold tabular-nums'>
                                    €1,280.00
                                </dd>
                            </div>
                            <div>
                                <dt className='text-muted-foreground text-xs'>
                                    You are owed · all time
                                </dt>
                                <dd className='mt-1 text-2xl font-semibold tabular-nums'>€60.00</dd>
                            </div>
                        </dl>
                        <Separator />
                        <div className='flex items-center gap-3'>
                            <ShoppingBasketIcon
                                className='text-muted-foreground size-5 shrink-0'
                                aria-hidden='true'
                            />
                            <div>
                                <p className='font-medium'>The weekly shop</p>
                                <p className='text-muted-foreground mt-1 text-xs'>
                                    Ana paid · Split between 3
                                </p>
                            </div>
                            <div className='ml-auto text-right'>
                                <p className='font-medium tabular-nums'>€90.00</p>
                                <p className='text-muted-foreground mt-1 inline-flex items-center gap-1 text-xs'>
                                    <CheckIcon className='size-3' aria-hidden='true' /> Split
                                    equally
                                </p>
                            </div>
                        </div>
                        <Separator />
                    </CardContent>
                    <CardFooter className='flex-col items-stretch gap-3'>
                        <p className='flex items-center gap-2 font-medium'>
                            <SunIcon className='size-4' aria-hidden='true' /> A summer together
                        </p>
                        <Progress
                            value={740}
                            max={2400}
                            aria-label='Summer goal'
                            aria-valuetext='740 euros marked saved toward 2,400 euros'
                        />
                        <p className='text-muted-foreground text-xs'>
                            <span className='text-foreground font-semibold'>€740</span> marked saved
                            of €2,400
                        </p>
                    </CardFooter>
                </Card>
                <p className='text-muted-foreground mt-3 text-xs leading-5'>
                    Illustrative preview · Your personal finances stay private.
                </p>
            </div>
        </aside>
    );
}
