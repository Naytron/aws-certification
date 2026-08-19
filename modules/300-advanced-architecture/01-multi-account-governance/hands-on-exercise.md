# Hands-on exercise: Simulate an OU, SCP, and exception rollout

## Exercise profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Cloud resources | None |
| Tools | Text editor, spreadsheet, diagramming tool, and optional local policy/query tool |
| Timebox | 90-150 minutes |
| Primary artifact | OU map, policy-evaluation matrix, rollout plan, and ADR |

## Objective

Design a landing-zone policy model and manually evaluate requests without creating an organization.

## Inputs

- Fictional enterprise: regulated payments, retail analytics, shared platform, security, and two acquisitions.
- Payments requires EU-only workload Regions; global IAM and billing APIs must remain usable.
- Development teams need sandbox freedom but cannot disable audit or expose public storage.
- Security needs read access and delegated administration without routine management-account use.
- One acquired account has unknown automation and cannot accept immediate denies.

Treat all names and numbers as fictional. Do not paste account IDs, credentials, endpoints, or customer data into course evidence.

## Tasks

1. Draw proposed roots/OUs/accounts and label owner, data class, lifecycle, and recovery contact.
2. Write pseudocode SCPs for audit protection, Region restriction with global-service exceptions, and sandbox boundaries.
3. Evaluate ten sample requests across SCP, identity policy, boundary, resource policy, and session policy. Include explicit-deny precedence.
4. Design delegated administrators for Config, Security Hub, GuardDuty, and account provisioning; minimize management-account sessions.
5. Create a canary rollout: inventory APIs, policy lint, simulation, test OU, telemetry window, expansion, rollback.
6. Define a time-bound exception record with approver, compensating control, expiry, and evidence.
7. Model acquisition onboarding before and after the account joins the target organization.
8. Write the ADR comparing Control Tower, Organizations-native automation, and a custom landing zone.

## Required analysis tables

### Boundary register

| Boundary | Owner | Inbound trust | Outbound trust | Failure impact | Preventive control | Detective evidence |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |

### Requirement traceability

| Requirement | Architecture decision | Evidence | Residual risk | Exception owner |
| --- | --- | --- | --- | --- |
| | | | | |

### Failure game

| Injected failure | Detection | Automatic response | Human decision | RTO/RPO effect | Rollback |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

## Architecture decision record

- Context and hard constraints
- Decision and scope
- Alternatives rejected and exact reasons
- Security, resilience, cost, compliance, and operational consequences
- Assumptions requiring validation
- Reversal trigger and rollback owner

## Challenge changes

- The regulator requires a separately controlled root and billing authority.
- A global service call is accidentally blocked by the Region deny.
- The management account credentials are suspected compromised during rollout.

Rework the design for one change. Do not add a service unless it closes a traced requirement.

## Expected characteristics

- No workload resides in the management account.
- OUs reflect stable policy/lifecycle differences rather than the reporting org chart.
- Every deny has a tested rollback and required service exemptions.
- Exceptions expire and produce detective evidence.
- The design explicitly states that this is a simulation and Organizations/Control Tower were not enabled.

## Evidence

Save only non-sensitive diagrams, calculations, decision tables, and the ADR. Use [the course evidence template](../../../templates/lab-evidence-template.md).
