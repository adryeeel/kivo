# Identity and metadata

[Site constants](../../apps/web/src/const/site.ts) own the title, description, URL and language. Package manifests own package names and scopes; update imports and workspace references when those change.

The site constants expose preferences to the application. The root layout uses them for the default title, description, metadata base and HTML language. The home feature displays the configured title and description. React renders copy as text; no raw HTML interpolation is needed.

Add per-route metadata, icons, robots, sitemap and share images when the actual product needs them. Keep secrets out of this public configuration. Production preferences are build inputs, so rebuild after changing them.
