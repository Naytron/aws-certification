# Hands-on exercise: Investigate a distributed outage from synthetic logs

## Exercise profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Cloud resources | None |
| Tools | Text editor, spreadsheet, diagramming tool, and optional local policy/query tool |
| Timebox | 90-150 minutes |
| Primary artifact | SLO sheet, query notebook, incident timeline, and game-day plan |

## Objective

Use supplied synthetic observations to distinguish symptom from cause, direct containment, and propose a safe resilience experiment.

## Inputs

- Checkout p99 latency rises from 800 ms to 9 s; error rate is 7%.
- API CPU averages 35%, queue age grows, database connections hit 95%, and one tenant generates retry storms.
- Deployment completed 12 minutes before impact; a dependency quota also changed.
- CloudTrail shows a security-group update by automation.
- Logs include requestId, tenantHash, route, status, latencyMs, retryCount, and dependency.

Treat all names and numbers as fictional. Do not paste account IDs, credentials, endpoints, or customer data into course evidence.

## Tasks

1. Define availability and latency SLIs, a 30-day SLO, and an error-budget policy.
2. Write Logs Insights-like queries for p50/p95/p99, failures by dependency, retry amplification, top hashed tenants, and deployment correlation.
3. Construct an incident timeline separating observation, hypothesis, evidence, decision, and action.
4. Evaluate deployment rollback, tenant rate limiting, connection relief, and SG restoration for reversibility and blast radius.
5. Assign incident commander, operations, communications, security, and service-owner roles.
6. Design central log retention and access separation across workload, security, and archive accounts.
7. Create a fault-injection hypothesis for database connection saturation with steady-state and abort conditions.
8. Write a post-incident action list ranked by risk reduction, not convenience.

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

- Telemetry delivery is delayed by ten minutes.
- The incident commander loses access through the normal IdP.
- One automatic remediation worsens retry amplification.

Rework the design for one change. Do not add a service unless it closes a traced requirement.

## Expected characteristics

- SLOs measure customer journeys and tail behavior.
- Queries use bounded time windows and do not expose raw customer identifiers.
- The timeline distinguishes correlation from causation.
- Containment preserves evidence and has rollback.
- Game-day abort signal remains available when the tested dependency fails.

## Evidence

Save only non-sensitive diagrams, calculations, decision tables, and the ADR. Use [the course evidence template](../../../templates/lab-evidence-template.md).
