---
name: pull-request
description: Push, open or update a pull request, prepare it for review, and complete unblocked ready and merge actions within the user-authorized scope. Covers draft conventions, independent review, host linking and check monitoring.
---

# Pull request

Read [Pull requests](../../../docs/contributing/pull-requests.md) and the [template](../../../.github/pull_request_template.md); use [commit](../commit/SKILL.md) for local history. Inputs are branch/base, intended change, issue and authorized actions.

## Prepare and submit

Inspect the full diff, including intended untracked files. If a demand or slice exists, reference it and follow its [completion rules](../../../docs/contributing/demand-planning.md); an intermediate PR must not close the demand. Obtain relevant validation and [review](../../../docs/quality/review.md); resolve material findings or disclose gaps. Write the final problem, resulting behavior, tradeoffs and useful evidence in the template, using a structured body or `--body-file`.

Push the feature branch and open a draft into the correct base. Apply the guide's title, label, assignee and issue-link conventions. Perform host-required PR linking immediately after create/takeover/push actions. Report failures without claiming publication or linking succeeded.

## Update and finish

Use ordinary commits for fixes. Recheck changed findings against the new head; keep title/body aligned with final scope. Rewrite only in the documented draft exceptions and within authorization.

Follow [Pull requests](../../../docs/contributing/pull-requests.md) for authorization, readiness, checks and merge requirements. Carry forward authorization already given and respect the requested stopping point. Do not assume a request to open a PR authorizes a merge or deployment.

Follow host monitoring/lifecycle rules when waiting is required; children return status rather than watching. Return PR URL, head, validation/review state and exact pending action. Do not publish unrelated findings or deploy as a side effect.
