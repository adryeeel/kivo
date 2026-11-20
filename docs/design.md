# Kivo design direction

## What to take from the reference

The supplied IMG_0527.jpg shows an inset light desktop dashboard: narrow sidebar,
small toolbar, connected summary tiles, one generous table panel, fine neutral
borders, restrained shadows, violet actions, and soft status pills. Preserve
that visual hierarchy. Its tiny text, dense controls, and desktop columns must
be adapted for phones. The image does not establish which library created it.

Kivo should feel like a calm family ledger. The distinctive content is shared
responsibility: who paid, each person's share, what remains owed, and a common
goal. Avoid generic subscription KPIs, decorative sparklines, or percentage
changes whose comparison period has not been defined.

## UI libraries researched

Checked against primary documentation on 20 November 2026. Visual-fit judgments
below are design assessments, not claims of screenshot provenance. No package
has been installed or benchmarked.

| Candidate | Fit and tradeoff | Decision |
| --- | --- | --- |
| [shadcn/ui](https://ui.shadcn.com/docs) and [blocks](https://ui.shadcn.com/blocks) | Editable source components and dashboard/sidebar building blocks; needs deliberate tokens and density to match the reference | Recommended foundation |
| [Untitled UI React](https://www.untitledui.com/react/docs/introduction) | Strong visual starting point for subtle tables, pills, and navigation; React Aria + Tailwind; open-source core, additional PRO page examples | Closest ready-styled alternative; use free components or inspect terms before taking PRO code |
| [ReUI](https://reui.io/docs) | shadcn-compatible registry with data grids and filter components; open-source and premium offerings | Revisit if the expense screen outgrows the base table; do not add a second system now |
| [Tremor](https://www.tremor.so/) | React/Tailwind dashboard and chart components with Radix primitives | Useful analytics reference; not necessary for expense entry or splitting |

Choose shadcn/ui with Base UI primitives, Tailwind, and one consistent outline
icon family (Lucide). Use the current compatible stable versions at scaffolding
time and pin them. Choose a single primitive family; do not combine Base UI,
Radix, and React Aria variants of the same control. shadcn source ownership
means Kivo must maintain its copied components and review upstream fixes.
Retain license notices. The repository's existing LICENSE is unchanged; no paid
template assets are included in this plan.

Start with Button, Input, Label, Select, Dialog, Sheet, Tabs, Badge, Progress,
and a semantic Table. Add components only when a screen uses them. A normal
table plus server filters is enough initially; defer TanStack Table, Recharts,
and chart wrappers until actual sorting/visualization needs justify them.

## Proposed tokens

Hex values are starting tokens, not sampled values from the photograph.

| Token | Value | Purpose |
| --- | --- | --- |
| canvas | `#F3F3F0` | Page and sidebar background |
| surface | `#FFFFFF` | Content panels and forms |
| line | `#E6E6E1` | Decorative separators; do not rely on this for input boundaries |
| ink | `#20221F` | Primary text |
| muted | `#65685F` | Secondary text |
| accent | `#7651D6` | Primary actions and selected navigation |

Supporting tokens: strong control border `#85887F`, violet tint `#F1ECFC`,
success text `#216343` on `#E8F5ED`, warning text `#80500C` on `#FFF4DB`,
and danger text `#AC2D36` on `#FCECEE`. Verify rendered contrast with actual
font sizes and control states; do not assume the reference's pale labels pass.
Color always has a text label or icon alongside it.

Use a self-hosted Manrope variable font with system fallbacks: 14 px desktop
body, 16 px phone body/form fields, 12–13 px metadata, 20–24 px headings,
and 28–32 px primary amounts. Enable tabular numerals, align amount columns
right, and format currency with Intl.NumberFormat. Long names truncate visually
with an accessible full label; amounts must remain readable.

Spacing uses 4/8/12/16/24/32 px. Controls have 8 px radii, panels 12 px, and the
desktop outer shell 18 px. Borders organize content; shadows are limited to
floating surfaces. No nested card stacks or gradient decoration.

## Responsive layout

Build the 390 px phone view first and verify down to 320 px. Below 768 px use
a full-width shell, 16 px gutters, a simple header, two summary columns, and
fixed bottom navigation with safe-area padding. At 768–1023 px use a navigation
drawer and roomier list. From 1024 px show the 208 px sidebar, compact toolbar,
and desktop table. Keep content left-aligned and cap the shell at 1600 px.

The desktop inset frame is an aesthetic detail, not a requirement to waste
phone space. On mobile, a transaction is a readable row with description,
payer/date, your share, and amount. Essential information must not disappear
behind horizontal scrolling. Put secondary metadata in expense details.

### Phone: family overview

```text
┌──────────────────────────────────┐
│ Kivo   Family ▾          Profile  │
│ November 2026 ▾                   │
│ Family overview                  │
│                                  │
│ Shared spending  │ Your share    │
│ €1,280.00        │ €420.00       │
│──────────────────┼───────────────│
│ You are owed     │ Goals marked  │
│ €60.00           │ €740.00       │
│                                  │
│ Balances             Settle up   │
│ Bruno owes you €30.00            │
│ Clara owes you €30.00            │
│                                  │
│ Summer holiday       €740/€2,400  │
│ [──────────                  ]   │
│                                  │
│ Recent expenses   + Add expense  │
│ Groceries                €90.00  │
│ Ana · Today      Your share €30  │
│                                  │
│ Overview  Expenses  Goals  More  │
└──────────────────────────────────┘
```

Monthly spending/share tiles follow the month selector. The balance tile is
labeled All time; goal progress is lifetime and labeled accordingly. Do not
imply that selecting November resets existing debts or goal contributions.
If your net balance is negative, show You owe; if zero, show All settled.

### Desktop: family expenses

```text
┌──────────────┬───────────────────────────────────────────────────┐
│ Kivo         │ Family expenses   [Month ▾] [Export] [+ Expense]   │
│ Family ▾     ├─────────────┬────────────┬──────────┬──────────────┤
│              │ Spending    │ Your share │ All-time │ Goal progress│
│ Overview     │             │            │ balance  │              │
│ Expenses •   ├─────────────┴────────────┴──────────┴──────────────┤
│ Balances     │ [Search description] [Category ▾] [Member ▾]      │
│ Goals        │ All / Paid by me / Includes me                    │
│ Budgets      ├────────────┬────────┬────────┬──────────┬───────────┤
│              │ Description│ Paid by│ Date   │Your share│ Amount    │
│ Members      │ Groceries  │ Ana    │ Nov 20 │   €30.00 │    €90.00 │
│ Settings     │ …          │ …      │ …      │        … │         … │
│              ├────────────┴────────┴────────┴──────────┴───────────┤
│ Personal ▾   │ Previous                              Next        │
└──────────────┴───────────────────────────────────────────────────┘
```

## Interaction details

- Keep Add expense visible near the phone expense list and in the desktop
  toolbar. The phone form opens as a full-height accessible dialog; desktop
  uses a focused panel. Preserve form state on failure and warn before closing
  a dirty form. Use focus trapping/restoration and visible close/back controls.
- Expense order: amount, description, date/category, paid by, split with,
  equal/exact selection, share preview, Save expense. Personal mode hides split
  controls and labels the entry private. Exact shares show the remaining cents.
- Use decimal keyboards, explicit currency, and locale-aware text parsing.
  Never silently reinterpret an ambiguous separator or round extra precision.
- Member chips show names and initials; profile photos are optional. Do not
  depend on photos to distinguish payers or participants.
- For financial saves, show pending state, retain the same retry key, and wait
  for the server before updating confirmed totals. An ambiguous network result
  says Checking save status, not Saved or Failed without evidence.
- Pending settlement, Confirm receipt, and Request reversal have explicit
  party/status information. No swipe-only or color-only action.
- Touch targets are at least 44 px; active controls meet contrast requirements.
  Support keyboard navigation, 200% zoom, reduced motion, screen-reader form
  errors, safe-area insets, and scrolling when the software keyboard opens.
- Use brief opacity/transform transitions only for opened controls. Avoid
  auto-playing charts and number animations in a financial ledger.

## Design review gate

Compare desktop layout to the reference and phone layout to the actual task.
Check density, type size, alignment, empty/error states, and whether a family
member can add a split without understanding bookkeeping. Screenshot review
at phone and desktop widths is required once there is a running UI. No rendered
design or real-device verification has been performed in this planning slice.
