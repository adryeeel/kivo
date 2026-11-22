# Performance patterns

## Rendering and dependencies

Keep server components as the default and scope client boundaries to interactions. Avoid shipping a parser, UI runtime or animation library for static content. Use framework image/font facilities when the product needs them; verify request size and layout stability.

## Interaction

Keep event handlers small and release listeners, timers and observers. Avoid repeated synchronous layout reads/writes. Measure the real interaction before introducing memoization, caching or virtualization.

## Canvas and GPU work

Start expensive render loops only while visible, stop them on unmount, cap resolution and provide a software/reduced-motion fallback when necessary. Real-device calibration is separate from browser emulation.

## Evidence

Compare like environments and representative data. Record revision, route, viewport, build mode and throttling. A source review or a passing unit test cannot establish a loading or responsiveness improvement.
