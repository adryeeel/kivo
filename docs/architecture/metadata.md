# Identity and metadata

[Site constants](../../apps/web/src/const/site.ts) own the title, description, URL and language. Package manifests own package names and scopes; update imports and workspace references when those change.

The site constants expose preferences to the application. The root layout uses them for the default title, description, metadata base and HTML language. The home feature displays the configured description and a lowercase wordmark from the `Brand` component; changing the configured title does not change the wordmark. React renders copy as text; no raw HTML interpolation is needed.

Browser and Apple touch icons live in `apps/web/src/app`. Add per-route metadata, robots, sitemap and share images when the actual product needs them. Keep secrets out of this public configuration. Production preferences are build inputs, so rebuild after changing them.
