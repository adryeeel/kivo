# Components and interaction

Prefer semantic HTML. Shared components belong in [the UI package](../architecture/ui.md), while feature composition stays in the app. Add dependencies and wrappers for actual interaction requirements.

## Verification target

Give controls accessible names and visible keyboard focus. Use links for navigation and buttons for actions. Check tab order, keyboard activation, error feedback, disabled states and focus restoration when those behaviors exist. Test dialogs and menus with their real primitives rather than replacing them with mocks.

Verify narrow/wide layouts and realistic content extremes. Add loading, empty and error states only for behavior the product actually has. Browser tests and manual checks provide different evidence; report any untested assistive-technology or real-device behavior explicitly.
