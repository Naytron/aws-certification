# Must know: Enterprise Data Platforms, Streaming, Analytics, and Governance

## Decision frame

For every design, separate:

1. **Business objective** - the outcome and tolerated loss, not a preferred service.
2. **Hard constraints** - legal boundary, RTO/RPO, identity authority, data residency, and migration window.
3. **Failure domains** - account, Availability Zone, Region, identity provider, network, control plane, and operator.
4. **Trust boundaries** - who authenticates, who authorizes, who can assume or delegate, and where credentials exist.
5. **Operations** - owner, telemetry, runbook, escalation, test cadence, and rollback authority.
6. **Economics** - fixed baseline, variable usage, data processing/transfer, licenses, commitments, and people cost.

## Decision table

| Signal | Prefer | Reject or challenge |
| --- | --- | --- |
| Open multi-engine historical data | S3 lake with columnar formats, catalog, governed access, lifecycle | One operational database for all analytics |
| Governed SQL BI and predictable concurrency | Warehouse/serverless warehouse by workload economics | Unbounded scans over raw JSON |
| Simple managed event ingestion | Kinesis Data Streams/Firehose where semantics fit | Self-managed Kafka by default |
| Kafka ecosystem/portability requirement | MSK only after operational and fixed-cost analysis | Persistent MSK for a small course exercise |
| Domain scale | Federated ownership with central interoperability controls | Central team owns every data definition |

## Deep analysis

- A data lake is storage architecture; governance requires identity, catalog, policy, classification, quality, lineage, retention, and accountability.
- Partitioning and columnar formats reduce scanned bytes. Over-partitioning creates small-file and metadata overhead; compaction is an operational requirement.
- At-least-once delivery is common. Exactly-once claims have a scope; end-to-end correctness still needs idempotency keys, checkpoints, transactional boundaries, and replay tests.
- Event-time processing must define lateness, watermark, ordering key, duplicate policy, and correction behavior.
- Schema evolution requires compatibility rules and producer/consumer ownership. A registry does not decide business semantics.
- Lake Formation can centralize fine-grained governance, but cross-account sharing, service-linked roles, hybrid access, and emergency paths require an operating model.
- Deletion obligations conflict with immutable archives and derived copies; map subject identifiers, legal holds, retention, and erasure propagation explicitly.
- MSK/OpenSearch and continuously provisioned streaming are design-only/optional paid. Local event/replay and cost calculations are the default.

## Failure and blast-radius checklist

- Name the smallest unit that can fail without affecting another workload.
- Distinguish data-plane continuity from control-plane changes during an incident.
- Identify correlated dependencies: shared identity, DNS, KMS, quotas, pipelines, and operators.
- State the recovery authority and the evidence required before failover or rollback.
- Quantify RTO and RPO per business transaction; "highly available" is not a target.
- Test degraded modes, not only total outages.
- Prevent a compromised workload identity from becoming an organization-wide principal.

## Exam traps

- Calling S3 plus Glue a complete governance program.
- Assuming exactly-once transport means exactly-once business effects.
- Partitioning on a high-cardinality identifier without workload analysis.
- Centralizing all data ownership and creating a bottleneck.
- Ignoring cross-Region transfer and duplicate storage in retention costs.

## Retrieval prompts

1. Which requirement drives the boundary, and which service is merely an implementation?
2. What is the largest credible correlated failure?
3. What must remain available if the AWS control plane or enterprise identity provider is impaired?
4. Which cost is fixed even at zero traffic?
5. What evidence proves the control works rather than merely exists?

## Official references

- [AWS data analytics lens](https://docs.aws.amazon.com/wellarchitected/latest/analytics-lens/welcome.html)
- [Lake Formation cross-account sharing](https://docs.aws.amazon.com/lake-formation/latest/dg/cross-account-permissions.html)
- [Kinesis Data Streams terminology](https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html)
- [MSK best practices](https://docs.aws.amazon.com/msk/latest/developerguide/bestpractices.html)
- [S3 performance design patterns](https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance-design-patterns.html)
