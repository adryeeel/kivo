import { Check, ShoppingBasket, Sun, Users } from 'lucide-react';

export function FamilyPreview() {
  return (
    <aside
      className="hidden flex-col justify-center border-r border-line bg-raised p-8 lg:flex xl:p-10"
      aria-label="A preview of your family space"
    >
      <div className="mx-auto w-full max-w-[440px]">
        <h2 className="text-2xl leading-8 font-semibold tracking-[-0.8px]">
          Everyday expenses.
          <br />
          Bigger plans.
        </h2>
        <p className="mt-3 max-w-80 text-sm leading-6 text-muted">
          A shared view of what you spend, what you owe, and what you’re working toward.
        </p>
        <div className="mt-6 overflow-hidden rounded-lg border border-line bg-surface text-sm">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <span className="flex items-center gap-2 font-semibold">
              <Users size={16} className="text-muted" aria-hidden="true" /> Our family
            </span>
            <span className="text-xs text-muted">November</span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-line border-b border-line py-4">
            <div className="px-4">
              <p className="text-xs text-muted">Shared this month</p>
              <p className="mt-1 text-[25px] font-semibold tracking-tight tabular-nums">
                €1,280<span className="text-lg font-normal text-muted">.00</span>
              </p>
            </div>
            <div className="px-4">
              <p className="text-xs text-muted">You are owed</p>
              <p className="mt-1 text-[25px] font-semibold tracking-tight tabular-nums">
                €60<span className="text-lg font-normal text-muted">.00</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-md bg-raised text-muted">
              <ShoppingBasket size={17} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <div>
              <p className="font-medium">The weekly shop</p>
              <p className="mt-0.5 text-xs text-muted">Ana paid · Split between 3</p>
            </div>
            <div className="ml-auto text-right">
              <p className="font-medium tabular-nums">€90.00</p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-accent">
                <Check size={12} aria-hidden="true" /> Split equally
              </p>
            </div>
          </div>
          <div className="px-4 py-4">
            <div className="flex items-center gap-2">
              <Sun size={17} className="text-accent" aria-hidden="true" />
              <span className="font-medium">A summer together</span>
              <span className="ml-auto text-xs text-muted">31%</span>
            </div>
            <progress
              className="mt-3 block h-1.5 w-full overflow-hidden rounded-full border-0 bg-accent-soft text-accent [&::-moz-progress-bar]:bg-accent [&::-webkit-progress-bar]:bg-accent-soft [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-accent"
              aria-label="Summer goal"
              max={2400}
              value={740}
              aria-valuetext="740 euros marked saved toward 2,400 euros"
            />
            <p className="mt-2 text-xs text-muted">
              <span className="font-semibold text-ink">€740</span> marked saved of €2,400
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted">
          Illustrative preview · Your personal finances stay private.
        </p>
      </div>
    </aside>
  );
}
