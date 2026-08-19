# Hands-on exercise: Run a quarterly architecture and cost review

## Exercise profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Cloud resources | None |
| Tools | Text editor, spreadsheet, diagramming tool, and optional local policy/query tool |
| Timebox | 90-150 minutes |
| Primary artifact | Unit-cost model, allocation rules, commitment scenarios, quota register, and ADR |

## Objective

Analyze a fictional cost/usage export and growth forecast, then choose changes that preserve SLOs and recovery objectives.

## Inputs

- Monthly cost is USD 420,000; orders grew 35% and cost grew 20%.
- Compute has 70% stable baseline; a migration may move 30% to serverless in nine months.
- NAT processing and cross-AZ transfer doubled after centralized inspection.
- Logging is 18% of spend; 60% is debug data retained indefinitely.
- Secondary Region quotas support half the declared DR peak.

Treat all names and numbers as fictional. Do not paste account IDs, credentials, endpoints, or customer data into course evidence.

## Tasks

1. Create allocation rules using account, cost category, governed tags, and causal shared-cost drivers.
2. Calculate cost per successful order and separate rate, usage, architecture, and growth effects.
3. Rank ten optimization candidates by annualized value, engineering effort, risk, and confidence.
4. Model no commitment, one-year partial commitment, and overcommit scenarios through the migration.
5. Rightsize one service using utilization plus latency, queue, failover, and seasonal evidence.
6. Map network paths and calculate categories for NAT, TGW, cross-AZ, and internet/Region transfer.
7. Define log classes with security/compliance retention, query tier, sampling, and deletion controls.
8. Build a quota register for steady state, 10x event, deployment surge, and DR.
9. Write an ADR selecting a commitment and quota-remediation plan.

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

- Demand falls 40% after a product change.
- A cost anomaly coincides with a security incident.
- Finance mandates 20% cuts during peak season.

Rework the design for one change. Do not add a service unless it closes a traced requirement.

## Expected characteristics

- Allocation rules are causal, governed, and show an unallocated category.
- Optimization protects SLO, security, and DR constraints.
- Commitments cover defensible baseline, not peak or speculative migration load.
- Quota plans include lead time and secondary Region.
- Every action has owner, forecast savings, validation, and rollback.

## Evidence

Save only non-sensitive diagrams, calculations, decision tables, and the ADR. Use [the course evidence template](../../../templates/lab-evidence-template.md).
