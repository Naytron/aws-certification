# Must Know - Database, Analytics, and Storage Decisions

## Start with the access pattern

| Requirement | Strong candidate | Reject common distractor |
| --- | --- | --- |
| Transactions, joins, relational constraints | RDS/Aurora | DynamoDB solely to avoid administration |
| Key-value at very large scale with known keys | DynamoDB | RDS read replicas as unlimited write scaling |
| Durable objects and data lake | S3 | EBS shared across arbitrary fleets |
| Shared POSIX file access | EFS | S3 when file-system semantics are mandatory |
| Block storage for one instance/AZ-bound workload | EBS | EFS when low-latency block semantics are required |
| Repeated low-latency cache/session access | ElastiCache | Cache as sole durable system of record |
| Ad hoc SQL over S3 | Athena | Persistent cluster for occasional queries |
| Managed warehouse with sustained analytic workload | Redshift | OLTP database for broad scans |

## Decision details

- Model DynamoDB partition keys for even distribution and access patterns. A scan is not a substitute for a missing key design.
- RDS Multi-AZ improves availability; read replicas scale reads. Aurora replicas can participate in failover and read scaling.
- S3 storage class selection depends on access frequency, retrieval time, minimum storage duration, and object size. Lifecycle transitions are not automatically cheaper.
- Athena charges are driven largely by bytes scanned: columnar formats, compression, partitioning, and selecting required columns matter.
- Caches need TTL, invalidation, miss behavior, and failure behavior. Durable truth remains elsewhere.
- Check quotas, supported Regions, engine versions, and current Free-plan availability before deployment.

## Distractors

- "NoSQL is always faster": access pattern and model determine performance.
- Multi-AZ scales reads: its primary purpose is HA; choose reader features explicitly.
- Glacier-class storage for frequently restored tiny files: retrieval/minimum-duration economics can lose.
- Add ElastiCache to fix bad queries: measure and correct data access first.

## Official references

- [AWS database decision guide](https://docs.aws.amazon.com/decision-guides/latest/databases-on-aws-how-to-choose/databases-on-aws-how-to-choose.html)
- [Athena performance optimization](https://docs.aws.amazon.com/athena/latest/ug/performance-tuning.html)
- [S3 storage classes](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html)
