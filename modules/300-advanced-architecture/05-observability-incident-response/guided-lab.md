# Guided lab: Investigate a distributed outage from synthetic logs

## Lab profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Cloud resources | None |
| Account changes | None |
| Timebox | 90-150 minutes |
| Cleanup | [No-cloud cleanup verification](cleanup.md) |

> Do not deploy OpenSearch, Fault Injection Service experiments, log ingestion, custom metrics, or persistent dashboards.

## Objective

Use supplied synthetic observations to distinguish symptom from cause, direct containment, and propose a safe resilience experiment.

## Inputs

- Checkout p99 latency rises from 800 ms to 9 s; error rate is 7%.
- API CPU averages 35%, queue age grows, database connections hit 95%, and one tenant generates retry storms.
- Deployment completed 12 minutes before impact; a dependency quota also changed.
- CloudTrail shows a security-group update by automation.
- Logs include requestId, tenantHash, route, status, latencyMs, retryCount, and dependency.

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

1. Define availability and latency SLIs, a 30-day SLO, and an error-budget policy.
2. Write Logs Insights-like queries for p50/p95/p99, failures by dependency, retry amplification, top hashed tenants, and deployment correlation.
3. Construct an incident timeline separating observation, hypothesis, evidence, decision, and action.
4. Evaluate deployment rollback, tenant rate limiting, connection relief, and SG restoration for reversibility and blast radius.
5. Assign incident commander, operations, communications, security, and service-owner roles.
6. Design central log retention and access separation across workload, security, and archive accounts.
7. Create a fault-injection hypothesis for database connection saturation with steady-state and abort conditions.
8. Write a post-incident action list ranked by risk reduction, not convenience.

For each task, write the observation, inference, decision, evidence, residual risk, and owner. Do not treat an architecture diagram as proof by itself.

### 4. Run a controlled failure game

Choose the most consequential listed dependency. Walk the clock through detection, diagnosis, authorization, containment, recovery, validation, and rollback. Record the first point at which the design misses an objective. Then change one control and repeat.

### 5. Compare alternatives

Score at least three approaches from 1 (poor) to 5 (strong) for security, blast radius, recovery, operations, compliance, variable cost, fixed cost, migration risk, and reversibility. Weight only criteria traced to requirements.

### 6. Write the ADR

Document context, decision, alternatives, consequences, assumptions, validation evidence, exception owner, reversal trigger, and rollback authority.

## Validate

The result should have these characteristics:

- SLOs measure customer journeys and tail behavior.
- Queries use bounded time windows and do not expose raw customer identifiers.
- The timeline distinguishes correlation from causation.
- Containment preserves evidence and has rollback.
- Game-day abort signal remains available when the tested dependency fails.

## Cleanup

No cloud cleanup is expected. Complete [cleanup.md](cleanup.md), sanitize evidence, and explicitly record `No cloud resources created - DESIGN-ONLY`.

Complete every gate in [validation.md](validation.md), then perform [cleanup.md](cleanup.md). Save non-sensitive evidence using [the course evidence template](../../../templates/lab-evidence-template.md).
