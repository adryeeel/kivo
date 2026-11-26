# Assertions and coverage

## Query user-visible contracts

Query from the render result or a scoped fixture locator. Prefer `getByRole` with its accessible name, then `getByLabelText` or `getByText`. Avoid global page/document queries, class selectors, `data-slot` and DOM traversal; they can match unrelated content or bind tests to structure.

A missing role/name may be a production accessibility defect. Do not add fake roles to decorative elements. Test IDs are allowed for deliberately hidden behavior, such as canvas fallbacks, or wrappers whose meaningful style cannot be targeted semantically. Name them after the element in kebab-case. Primitive-owned presentation tests may inspect their own track/indicator slots when those elements have no separate semantics; keep such assertions out of consumer suites.

Check exact accessible names before weakening a locator. Give icon-only links useful labels and communicate new-tab behavior when present.

## Assert observable results

Use `await expect.element(locator)` for page assertions; it retries asynchronous renders and transitions. Use ordinary `expect` for plain values/mocks and `expect.poll` for changing non-element values. Await interactions. `toHaveTextContent` compares the whole normalized text, including `aria-hidden` text; `toMatchTextContent` checks a partial string or pattern.

Assert the actual control ARIA states (`aria-disabled`, `aria-selected`, `aria-expanded`). A disabled element may need `click({ force: true })` to prove it does nothing, because Playwright otherwise refuses to click. Disabled tabs can remain reachable with arrows without being selectable.

Write expected values independently from production constants. Use named case lists for `it.for`. Avoid large snapshots; a targeted snapshot is appropriate only when the reviewed output structure is the actual contract.

Follow [Test code layout](structure.md#code-layout) for spacing between assertions and surrounding setup or interactions. Let the formatter wrap each assertion expression; separate complete assertions rather than manually breaking a matcher chain.

## Coverage priorities

1. Behavior: clicks, keys, navigation, callback effects and link destinations.

2. Accessibility: roles, names, descriptions, state, keyboard paths and restored focus.

3. Meaningful presentation: visibility at breakpoints, theme/accent roles, reduced motion and state feedback.

Test shared behavior, variants and contrast in `packages/ui`; app suites should test how the page composes them rather than repeating shared tests. Compare contrast ratios from computed colours rather than palette names.

Skip incidental padding/grid classes. Use `toHaveClass` for a meaningful token role and `toHaveStyle` for palette-independent state such as opacity. Exercise compiler fixtures through the real pipeline, and use builds/runtime checks for boundaries unit tests cannot prove.
