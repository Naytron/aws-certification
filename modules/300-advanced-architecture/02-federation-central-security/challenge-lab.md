# Challenge lab: Defend Federation, Cross-Account Trust, and Central Security

## Lab profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Cloud resources | None |
| Guidance level | Independent architecture review board exercise |
| Timebox | 120 minutes plus 20-minute defense |
| Cleanup | [No-cloud cleanup verification](cleanup.md) |

> Do not create federation, delegated-administrator, organization-wide trail, or cross-account role resources for this exercise.

## Preflight

1. Confirm the exercise remains `DESIGN-ONLY`; do not create or change AWS resources.
2. Confirm the current AWS Free plan is unchanged and billing alerts remain available.
3. Use only fictional or sanitized inputs; do not record account IDs, ARNs, credentials, endpoints, or customer data.
4. If this architecture were later deployed in an approved paid sandbox, require the standard tags `Course`, `Module`, `Owner`, and `ExpiresAt` on every supported resource. Tags are design annotations here, not a reason to deploy.
5. Read [cleanup.md](cleanup.md) before starting and record that no cloud resources are expected.

## Brief

A deployment system may have issued a compromised temporary session. It can assume application deployment roles in 80 accounts. Customer traffic must continue and evidence must be retained.

## Hard requirements

- Stop new privileged sessions within 15 minutes.
- Avoid deleting production evidence or encryption keys.
- Preserve unaffected deployment capability where safely possible.
- Attribute actions to pipeline run and source identity.
- Maintain a recovery path during IdP impairment.

## Constraints

- STS credentials cannot be individually revoked like a password.
- Some target roles allow one-hour sessions.
- A global deny could interrupt emergency operations.

## Independent assignment

Without copying the guided procedure or starting from a preferred AWS service:

1. State ambiguous facts and choose explicit, defensible assumptions.
2. Produce a requirement-traceability matrix with measurable evidence.
3. Draw trust, administrative, network, data, and failure boundaries.
4. Present three viable architectures, including the minimum-change option.
5. Select one design and quantify recovery, capacity, operating, compliance, and cost consequences.
6. Simulate a compromised identity, a bad deployment, a dependency outage, quota exhaustion, and operator error.
7. Define migration or rollout stages with canary, stop, rollback, and final-exit gates.
8. Write the ADR and a one-page executive risk acceptance.

## Mandatory change injects

Apply all three after the initial design is complete:

- The vendor serves 500 customers with one AWS principal.
- The IdP group mapping is accidentally broadened.
- The security aggregation Region is unavailable during containment.

For each inject, identify invalidated assumptions, changed controls, new residual risk, revised cost, and whether the original decision still stands.

## Required artifacts

- Boundary and data-flow diagram
- Requirement/evidence matrix
- Failure timeline with RTO/RPO effect
- Trust and authorization matrix
- Capacity/quota and 10x-demand analysis
- Cost model separating fixed, variable, transfer, logging, licensing, and labor
- Rollout/migration/failback runbook
- ADR with at least two rejected alternatives
- Five-minute executive summary and fifteen-minute technical defense

## Validate

- No unowned critical risk or unexplained trust edge remains.
- Every hard requirement maps to a preventive, detective, responsive, or recovery control and test evidence.
- The design names common-mode dependencies and the maximum credible blast radius.
- Recovery claims include detection, decision, authority, capacity, validation, and failback.
- Expensive services are justified by requirements and remain design-only.
- Reviewers can change one requirement and you can explain which architecture becomes preferable.

## Cleanup

No cloud cleanup is expected. Complete [cleanup.md](cleanup.md), sanitize evidence, and explicitly record `No cloud resources created - DESIGN-ONLY`.

Use [validation.md](validation.md) for the formal gate and finish with [cleanup.md](cleanup.md).
