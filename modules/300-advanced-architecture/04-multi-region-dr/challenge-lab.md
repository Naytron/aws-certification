# Challenge lab: Defend Multi-Region Architecture and Disaster Recovery

## Lab profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Cloud resources | None |
| Guidance level | Independent architecture review board exercise |
| Timebox | 120 minutes plus 20-minute defense |
| Cleanup | [No-cloud cleanup verification](cleanup.md) |

> Do not deploy persistent multi-Region databases, standby fleets, replication, Route 53 health checks, or recovery resources.

## Preflight

1. Confirm the exercise remains `DESIGN-ONLY`; do not create or change AWS resources.
2. Confirm the current AWS Free plan is unchanged and billing alerts remain available.
3. Use only fictional or sanitized inputs; do not record account IDs, ARNs, credentials, endpoints, or customer data.
4. If this architecture were later deployed in an approved paid sandbox, require the standard tags `Course`, `Module`, `Owner`, and `ExpiresAt` on every supported resource. Tags are design annotations here, not a reason to deploy.
5. Read [cleanup.md](cleanup.md) before starting and record that no cloud resources are expected.

## Brief

A payment platform experiences rising errors in its primary Region. Some APIs and replication still work, but latency is breaching SLOs. A premature failover could create two writers.

## Hard requirements

- Restore authorization within 15 minutes of customer impact.
- Lose no more than one minute of accepted payment intents.
- Never capture the same payment twice.
- Retain audit evidence and support reconciliation.
- Return safely to the preferred Region after stability.

## Constraints

- Replication lag is unknown for three minutes during the incident.
- The secondary handles 60% of peak until scaled.
- Operations has only one practiced failover in the last year.

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

- The incident is an application corruption replicated to both Regions.
- The secondary Region has insufficient quota and capacity.
- The primary recovers while failover is only half complete.

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
