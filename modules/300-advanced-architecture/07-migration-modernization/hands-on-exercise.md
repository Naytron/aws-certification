# Hands-on exercise: Plan a portfolio migration factory and two cutovers

## Exercise profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Cloud resources | None |
| Tools | Text editor, spreadsheet, diagramming tool, and optional local policy/query tool |
| Timebox | 90-150 minutes |
| Primary artifact | Portfolio scorecard, dependency graph, wave plan, cutover runbook, and ADR |

## Objective

Classify a fictional portfolio, build dependency-safe waves, and simulate database cutover and rollback.

## Inputs

- Twenty applications must exit a data center in 14 months.
- ERP has vendor support constraints; checkout has a 15-minute outage ceiling; archive has 800 TB; six apps are unused.
- Identity, DNS, batch file transfer, and a mainframe API are shared dependencies.
- Teams have limited container experience.
- Contracts renew in months 6 and 12.

Treat all names and numbers as fictional. Do not paste account IDs, credentials, endpoints, or customer data into course evidence.

## Tasks

1. Create a portfolio record with owner, value, criticality, data, compliance, dependencies, lifecycle, cost, and evidence confidence.
2. Assign a 7R disposition and target outcome to each workload; identify assumptions.
3. Draw the runtime and migration-time dependency graph, including people, contracts, DNS, identity, and monitoring.
4. Define landing-zone/foundation exit criteria before production waves.
5. Build pilot and subsequent waves with entry, exit, rollback, freeze, and hypercare gates.
6. Design checkout database CDC cutover with lag threshold, reconciliation, DNS/client behavior, and authority switch.
7. Create archive-transfer alternatives using online transfer, DataSync, or offline appliance concepts and elapsed-time calculations.
8. Plan decommission evidence and dual-run cost burn-down.
9. Write an ADR explaining why container orchestration is or is not part of each modernization phase.

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

- The mainframe API latency doubles from AWS.
- The data-center contract ends three months early.
- A regulator requires data lineage through migration and rollback.

Rework the design for one change. Do not add a service unless it closes a traced requirement.

## Expected characteristics

- Every workload has an owner, disposition, evidence confidence, and business outcome.
- Waves follow dependency groups rather than server count.
- Cutover includes a latest safe rollback decision and business reconciliation.
- Foundation readiness is measurable.
- Decommissioning is a governed phase, not an assumption.

## Evidence

Save only non-sensitive diagrams, calculations, decision tables, and the ADR. Use [the course evidence template](../../../templates/lab-evidence-template.md).
