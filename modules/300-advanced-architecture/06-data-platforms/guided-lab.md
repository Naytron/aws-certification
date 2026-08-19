# Guided lab: Design and replay a governed event-to-analytics pipeline

## Lab profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Cloud resources | None |
| Account changes | None |
| Timebox | 90-150 minutes |
| Cleanup | [No-cloud cleanup verification](cleanup.md) |

> Do not deploy MSK, OpenSearch, Kinesis, warehouses, crawlers, or persistent data stores.

## Objective

Model ingestion, quality, lineage, access, replay, and privacy for a fictional customer-event platform without deploying streaming clusters.

## Inputs

- Producers emit order events with orderId, customerToken, eventTime, schemaVersion, amount, and region.
- Duplicates and events up to two hours late occur; one producer can reorder updates.
- Finance needs daily immutable facts; operations needs five-minute aggregates.
- EU personal data must remain in EU and support erasure unless under legal hold.
- Raw JSON volume is 5 TB/day; query users currently scan 120 TB/day.

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

1. Define owners and SLOs for raw, conformed, finance, and operational data products.
2. Design batch/stream paths with ordering key, late-event window, deduplication, checkpoint, dead-letter, and replay behavior.
3. Walk a duplicate create, out-of-order update, and corrected event through the state model.
4. Define schema compatibility and producer deployment gates.
5. Create a data-access matrix for producer, engineer, analyst, finance, privacy, and security roles.
6. Map lineage and erasure from raw through aggregates, exports, backups, and legal holds.
7. Redesign file format, partitioning, compaction, and query controls; calculate scan reduction categories.
8. Compare Kinesis, Firehose, MSK, and batch ingestion in an ADR based on semantics and operating cost.

For each task, write the observation, inference, decision, evidence, residual risk, and owner. Do not treat an architecture diagram as proof by itself.

### 4. Run a controlled failure game

Choose the most consequential listed dependency. Walk the clock through detection, diagnosis, authorization, containment, recovery, validation, and rollback. Record the first point at which the design misses an objective. Then change one control and repeat.

### 5. Compare alternatives

Score at least three approaches from 1 (poor) to 5 (strong) for security, blast radius, recovery, operations, compliance, variable cost, fixed cost, migration risk, and reversibility. Weight only criteria traced to requirements.

### 6. Write the ADR

Document context, decision, alternatives, consequences, assumptions, validation evidence, exception owner, reversal trigger, and rollback authority.

## Validate

The result should have these characteristics:

- Every data product has accountable owner, contract, SLO, quality, and consumers.
- Replay produces deterministic business facts or explicitly records corrections.
- Residency and erasure include derived data and exports.
- The design distinguishes event delivery from business-effect idempotency.
- Cost model includes ingest, storage, requests, scans, compaction, transfer, and observability.

## Cleanup

No cloud cleanup is expected. Complete [cleanup.md](cleanup.md), sanitize evidence, and explicitly record `No cloud resources created - DESIGN-ONLY`.

Complete every gate in [validation.md](validation.md), then perform [cleanup.md](cleanup.md). Save non-sensitive evidence using [the course evidence template](../../../templates/lab-evidence-template.md).
