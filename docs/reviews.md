## Dependabot update grouping

Grouped version and security updates separately for each configured ecosystem,
keeping the existing schedules and commit settings. Critique: grouping can make
major changes harder to isolate; all versions remain eligible and each PR still
needs review. The YAML parses and its six group rules were checked locally;
Dependabot's hosted execution can only be verified after the change is merged.
