# Guided lab: Plan a portfolio migration factory and two cutovers

## Lab profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Cloud resources | None |
| Account changes | None |
| Timebox | 90-150 minutes |
| Cleanup | [No-cloud cleanup verification](cleanup.md) |

> Do not start Application Migration Service, DMS, DataSync, Snow-family, EKS, replication, or transfer jobs.

## Objective

Classify a fictional portfolio, build dependency-safe waves, and simulate database cutover and rollback.

## Inputs

- Twenty applications must exit a data center in 14 months.
- ERP has vendor support constraints; checkout has a 15-minute outage ceiling; archive has 800 TB; six apps are unused.
- Identity, DNS, batch file transfer, and a mainframe API are shared dependencies.
- Teams have limited container experience.
- Contracts renew in months 6 and 12.

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

1. Create a portfolio record with owner, value, criticality, data, compliance, dependencies, lifecycle, cost, and evidence confidence.
2. Assign a 7R disposition and target outcome to each workload; identify assumptions.
3. Draw the runtime and migration-time dependency graph, including people, contracts, DNS, identity, and monitoring.
4. Define landing-zone/foundation exit criteria before production waves.
5. Build pilot and subsequent waves with entry, exit, rollback, freeze, and hypercare gates.
6. Design checkout database CDC cutover with lag threshold, reconciliation, DNS/client behavior, and authority switch.
7. Create archive-transfer alternatives using online transfer, DataSync, or offline appliance concepts and elapsed-time calculations.
8. Plan decommission evidence and dual-run cost burn-down.
9. Write an ADR explaining why container orchestration is or is not part of each modernization phase.

For each task, write the observation, inference, decision, evidence, residual risk, and owner. Do not treat an architecture diagram as proof by itself.

### 4. Run a controlled failure game

Choose the most consequential listed dependency. Walk the clock through detection, diagnosis, authorization, containment, recovery, validation, and rollback. Record the first point at which the design misses an objective. Then change one control and repeat.

### 5. Compare alternatives

Score at least three approaches from 1 (poor) to 5 (strong) for security, blast radius, recovery, operations, compliance, variable cost, fixed cost, migration risk, and reversibility. Weight only criteria traced to requirements.

### 6. Write the ADR

Document context, decision, alternatives, consequences, assumptions, validation evidence, exception owner, reversal trigger, and rollback authority.

## Validate

The result should have these characteristics:

- Every workload has an owner, disposition, evidence confidence, and business outcome.
- Waves follow dependency groups rather than server count.
- Cutover includes a latest safe rollback decision and business reconciliation.
- Foundation readiness is measurable.
- Decommissioning is a governed phase, not an assumption.

## Cleanup

No cloud cleanup is expected. Complete [cleanup.md](cleanup.md), sanitize evidence, and explicitly record `No cloud resources created - DESIGN-ONLY`.

Complete every gate in [validation.md](validation.md), then perform [cleanup.md](cleanup.md). Save non-sensitive evidence using [the course evidence template](../../../templates/lab-evidence-template.md).
