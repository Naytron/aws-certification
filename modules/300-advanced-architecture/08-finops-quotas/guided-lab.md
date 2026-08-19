# Guided lab: Run a quarterly architecture and cost review

## Lab profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Cloud resources | None |
| Account changes | None |
| Timebox | 90-150 minutes |
| Cleanup | [No-cloud cleanup verification](cleanup.md) |

> Do not purchase Savings Plans or Reservations, request quota increases, create budgets, or change account billing configuration for this simulation.

## Objective

Analyze a fictional cost/usage export and growth forecast, then choose changes that preserve SLOs and recovery objectives.

## Inputs

- Monthly cost is USD 420,000; orders grew 35% and cost grew 20%.
- Compute has 70% stable baseline; a migration may move 30% to serverless in nine months.
- NAT processing and cross-AZ transfer doubled after centralized inspection.
- Logging is 18% of spend; 60% is debug data retained indefinitely.
- Secondary Region quotas support half the declared DR peak.

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

1. Create allocation rules using account, cost category, governed tags, and causal shared-cost drivers.
2. Calculate cost per successful order and separate rate, usage, architecture, and growth effects.
3. Rank ten optimization candidates by annualized value, engineering effort, risk, and confidence.
4. Model no commitment, one-year partial commitment, and overcommit scenarios through the migration.
5. Rightsize one service using utilization plus latency, queue, failover, and seasonal evidence.
6. Map network paths and calculate categories for NAT, TGW, cross-AZ, and internet/Region transfer.
7. Define log classes with security/compliance retention, query tier, sampling, and deletion controls.
8. Build a quota register for steady state, 10x event, deployment surge, and DR.
9. Write an ADR selecting a commitment and quota-remediation plan.

For each task, write the observation, inference, decision, evidence, residual risk, and owner. Do not treat an architecture diagram as proof by itself.

### 4. Run a controlled failure game

Choose the most consequential listed dependency. Walk the clock through detection, diagnosis, authorization, containment, recovery, validation, and rollback. Record the first point at which the design misses an objective. Then change one control and repeat.

### 5. Compare alternatives

Score at least three approaches from 1 (poor) to 5 (strong) for security, blast radius, recovery, operations, compliance, variable cost, fixed cost, migration risk, and reversibility. Weight only criteria traced to requirements.

### 6. Write the ADR

Document context, decision, alternatives, consequences, assumptions, validation evidence, exception owner, reversal trigger, and rollback authority.

## Validate

The result should have these characteristics:

- Allocation rules are causal, governed, and show an unallocated category.
- Optimization protects SLO, security, and DR constraints.
- Commitments cover defensible baseline, not peak or speculative migration load.
- Quota plans include lead time and secondary Region.
- Every action has owner, forecast savings, validation, and rollback.

## Cleanup

No cloud cleanup is expected. Complete [cleanup.md](cleanup.md), sanitize evidence, and explicitly record `No cloud resources created - DESIGN-ONLY`.

Complete every gate in [validation.md](validation.md), then perform [cleanup.md](cleanup.md). Save non-sensitive evidence using [the course evidence template](../../../templates/lab-evidence-template.md).
