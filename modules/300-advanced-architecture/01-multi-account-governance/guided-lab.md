# Guided lab: Simulate an OU, SCP, and exception rollout

## Lab profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Cloud resources | None |
| Account changes | None |
| Timebox | 90-150 minutes |
| Cleanup | [No-cloud cleanup verification](cleanup.md) |

> Do not enable AWS Organizations or AWS Control Tower; either action automatically upgrades the current Free plan to a Paid plan.

## Objective

Design a landing-zone policy model and manually evaluate requests without creating an organization.

## Inputs

- Fictional enterprise: regulated payments, retail analytics, shared platform, security, and two acquisitions.
- Payments requires EU-only workload Regions; global IAM and billing APIs must remain usable.
- Development teams need sandbox freedom but cannot disable audit or expose public storage.
- Security needs read access and delegated administration without routine management-account use.
- One acquired account has unknown automation and cannot accept immediate denies.

All facts are fictional. Keep account IDs, credentials, private endpoints, customer records, and other sensitive information out of the artifacts.

## Preflight

1. Confirm the exercise remains `DESIGN-ONLY`; do not create or change AWS resources.
2. Confirm the current AWS Free plan is unchanged and billing alerts remain available.
3. Use only fictional or sanitized inputs; do not record account IDs, ARNs, credentials, endpoints, or customer data.
4. If this architecture were later deployed in an approved paid sandbox, require the standard tags `Course`, `Module`, `Owner`, and `ExpiresAt` on every supported resource. Tags are design annotations here, not a reason to deploy.
5. Read [cleanup.md](cleanup.md) before starting and record that no cloud resources are expected.

## Architecture frame

Before selecting a service, create five columns: hard requirement, owner, trust boundary, failure domain, and measurable evidence. A design decision is valid only when it closes a row in that table.

## Guided procedure

### 1. Establish requirements and authority

1. Mark each input as a hard constraint, assumption, or preference.
2. Assign one accountable owner to every hard constraint.
3. Record numeric RTO, RPO, capacity, cost, and compliance limits where relevant.
4. Identify who may approve a change, exception, failover, or rollback.

### 2. Draw boundaries

Create an ASCII or diagramming-tool view that distinguishes:

- organization/account and administrative boundaries;
- human and workload trust paths;
- network and data movement;
- Availability Zone, Region, external provider, and operator failure domains;
- evidence, key, and recovery ownership.

### 3. Complete the module analysis

1. Draw proposed roots/OUs/accounts and label owner, data class, lifecycle, and recovery contact.
2. Write pseudocode SCPs for audit protection, Region restriction with global-service exceptions, and sandbox boundaries.
3. Evaluate ten sample requests across SCP, identity policy, boundary, resource policy, and session policy. Include explicit-deny precedence.
4. Design delegated administrators for Config, Security Hub, GuardDuty, and account provisioning; minimize management-account sessions.
5. Create a canary rollout: inventory APIs, policy lint, simulation, test OU, telemetry window, expansion, rollback.
6. Define a time-bound exception record with approver, compensating control, expiry, and evidence.
7. Model acquisition onboarding before and after the account joins the target organization.
8. Write the ADR comparing Control Tower, Organizations-native automation, and a custom landing zone.

For each task, write the observation, inference, decision, evidence, residual risk, and owner. Do not treat an architecture diagram as proof by itself.

### 4. Run a controlled failure game

Choose the most consequential listed dependency. Walk the clock through detection, diagnosis, authorization, containment, recovery, validation, and rollback. Record the first point at which the design misses an objective. Then change one control and repeat.

### 5. Compare alternatives

Score at least three approaches from 1 (poor) to 5 (strong) for security, blast radius, recovery, operations, compliance, variable cost, fixed cost, migration risk, and reversibility. Weight only criteria traced to requirements.

### 6. Write the ADR

Document context, decision, alternatives, consequences, assumptions, validation evidence, exception owner, reversal trigger, and rollback authority.

## Validate

The result should have these characteristics:

- No workload resides in the management account.
- OUs reflect stable policy/lifecycle differences rather than the reporting org chart.
- Every deny has a tested rollback and required service exemptions.
- Exceptions expire and produce detective evidence.
- The design explicitly states that this is a simulation and Organizations/Control Tower were not enabled.

## Cleanup

No cloud cleanup is expected. Complete [cleanup.md](cleanup.md), sanitize evidence, and explicitly record `No cloud resources created - DESIGN-ONLY`.

Complete every gate in [validation.md](validation.md), then perform [cleanup.md](cleanup.md). Save non-sensitive evidence using [the course evidence template](../../../templates/lab-evidence-template.md).
