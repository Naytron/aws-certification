# Hands-on exercise: Design and replay a governed event-to-analytics pipeline

## Exercise profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Cloud resources | None |
| Tools | Text editor, spreadsheet, diagramming tool, and optional local policy/query tool |
| Timebox | 90-150 minutes |
| Primary artifact | Data product contract, replay worksheet, access matrix, and cost model |

## Objective

Model ingestion, quality, lineage, access, replay, and privacy for a fictional customer-event platform without deploying streaming clusters.

## Inputs

- Producers emit order events with orderId, customerToken, eventTime, schemaVersion, amount, and region.
- Duplicates and events up to two hours late occur; one producer can reorder updates.
- Finance needs daily immutable facts; operations needs five-minute aggregates.
- EU personal data must remain in EU and support erasure unless under legal hold.
- Raw JSON volume is 5 TB/day; query users currently scan 120 TB/day.

Treat all names and numbers as fictional. Do not paste account IDs, credentials, endpoints, or customer data into course evidence.

## Tasks

1. Define owners and SLOs for raw, conformed, finance, and operational data products.
2. Design batch/stream paths with ordering key, late-event window, deduplication, checkpoint, dead-letter, and replay behavior.
3. Walk a duplicate create, out-of-order update, and corrected event through the state model.
4. Define schema compatibility and producer deployment gates.
5. Create a data-access matrix for producer, engineer, analyst, finance, privacy, and security roles.
6. Map lineage and erasure from raw through aggregates, exports, backups, and legal holds.
7. Redesign file format, partitioning, compaction, and query controls; calculate scan reduction categories.
8. Compare Kinesis, Firehose, MSK, and batch ingestion in an ADR based on semantics and operating cost.

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

- Finance requires restatable month-end results after logic changes.
- A Region boundary prevents raw replication.
- A consumer cannot upgrade before a breaking schema change.

Rework the design for one change. Do not add a service unless it closes a traced requirement.

## Expected characteristics

- Every data product has accountable owner, contract, SLO, quality, and consumers.
- Replay produces deterministic business facts or explicitly records corrections.
- Residency and erasure include derived data and exports.
- The design distinguishes event delivery from business-effect idempotency.
- Cost model includes ingest, storage, requests, scans, compaction, transfer, and observability.

## Evidence

Save only non-sensitive diagrams, calculations, decision tables, and the ADR. Use [the course evidence template](../../../templates/lab-evidence-template.md).
