# Challenge lab: Defend Enterprise Observability, Incident Response, and Resilience Testing

## Lab profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Cloud resources | None |
| Guidance level | Independent architecture review board exercise |
| Timebox | 120 minutes plus 20-minute defense |
| Cleanup | [No-cloud cleanup verification](cleanup.md) |

> Do not deploy OpenSearch, Fault Injection Service experiments, log ingestion, custom metrics, or persistent dashboards.

## Preflight

1. Confirm the exercise remains `DESIGN-ONLY`; do not create or change AWS resources.
2. Confirm the current AWS Free plan is unchanged and billing alerts remain available.
3. Use only fictional or sanitized inputs; do not record account IDs, ARNs, credentials, endpoints, or customer data.
4. If this architecture were later deployed in an approved paid sandbox, require the standard tags `Course`, `Module`, `Owner`, and `ExpiresAt` on every supported resource. Tags are design annotations here, not a reason to deploy.
5. Read [cleanup.md](cleanup.md) before starting and record that no cloud resources are expected.

## Brief

A SaaS platform remains technically reachable, but one dependency throttles and client retries multiply load. Infrastructure averages look normal while 20% of tenants cannot complete checkout.

## Hard requirements

- Detect customer impact within five minutes.
- Contain retry amplification without blocking healthy tenants.
- Preserve seven-year security evidence.
- Provide executive status every 20 minutes.
- Demonstrate prevention in a controlled game day.

## Constraints

- No OpenSearch deployment in the course account.
- Tenant IDs are sensitive and must be hashed in shared telemetry.
- Rollback may restore an earlier security defect.

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

- Telemetry delivery is delayed by ten minutes.
- The incident commander loses access through the normal IdP.
- One automatic remediation worsens retry amplification.

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
