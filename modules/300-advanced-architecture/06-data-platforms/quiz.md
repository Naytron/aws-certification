# Quiz: Enterprise Data Platforms, Streaming, Analytics, and Governance

Closed-book. Select the best answer. Questions are original and scenario based.

## 1. What most directly reduces columnar analytical scan cost?

A. Store all data as uncompressed JSON
B. Use suitable columnar format, partition pruning, and compact files
C. Increase duplicate copies
D. Use one partition per customer

## 2. Does at-least-once delivery require consumer idempotency?

A. Only for S3 tags
B. No, duplicates are impossible
C. Yes, duplicates/replay must not duplicate business effects
D. Only for DNS

## 3. What does a schema registry not solve?

A. Version lookup
B. Serialization validation
C. Schema storage
D. Business semantic ownership and compatibility decisions

## 4. What is needed for event-time correctness?

A. Ordering key, lateness/watermark, duplicate, and correction policy
B. More dashboards
C. Public access
D. Arrival time only

## 5. Which design scales semantic accountability?

A. No owners
B. Domain-owned data products with central interoperability controls
C. One spreadsheet
D. Every consumer defines facts independently

## 6. Why is raw replication not a backup against corruption?

A. Catalogs delete data
B. Replication copies corruption too
C. S3 cannot version
D. KMS prevents recovery

## 7. What must a privacy deletion map include?

A. Only dashboard cache
B. Only KMS key
C. Only source row
D. Derived products, exports, backups, holds, and proof

## 8. When is MSK justified over simpler managed ingestion?

A. When Kafka semantics/ecosystem/portability requirements outweigh fixed and operational cost
B. For a tiny course lab
C. To avoid all operations
D. Always

## 9. What is a small-file problem consequence?

A. Lower metadata work
B. Excessive request/metadata overhead and poor query efficiency
C. Automatic perfect compaction
D. No effect

## 10. What makes financial replay safe?

A. Ignore late events
B. Overwrite history silently
C. Version logic/data, preserve lineage, reconcile, and control restatement
D. Delete raw events

## Score

- 8/10 or better: pass, then explain every distractor you considered.
- Below 8/10: update the error log and retake with different challenge assumptions.
