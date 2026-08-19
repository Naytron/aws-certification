# Must Know: Databases

**Level:** 100 | **Cost:** `DESIGN-ONLY` | **SAA-C03:** Design Resilient Architectures; Design High-Performing Architectures; Design Cost-Optimized Architectures

## Decision table

| Requirement | Prefer | Decision rule |
| --- | --- | --- |
| Relational joins and familiar SQL engine | RDS or Aurora | Managed relational engines preserve SQL semantics. |
| Massive key-value/document scale with known access patterns | DynamoDB | Partition-key design drives distribution and queries. |
| RDS high availability | Multi-AZ deployment | Standby/failover is not the same as a read replica. |
| RDS read scaling | Read replicas | Asynchronous replicas serve reads; design for lag. |
| Unknown/spiky DynamoDB traffic | On-demand capacity | Pay per request and avoid initial capacity planning. |

## Service and responsibility boundaries

- RDS manages database infrastructure; customers still own schema, queries, accounts, and data classification.
- RDS Multi-AZ improves availability; read replicas primarily scale reads.
- DynamoDB Query requires a partition-key equality condition; Scan reads broadly.
- DynamoDB TTL expiry is asynchronous and must not be treated as an exact deletion scheduler.

## Failure modes

| Failure | Observable effect | Response |
| --- | --- | --- |
| DynamoDB low-cardinality hot key | Throttling and uneven capacity | Distribute traffic with a suitable partition key. |
| Scan on request path | Cost and latency grow with table size | Model keys and indexes for the access pattern. |
| Read replica treated as synchronous HA | Lag or promotion assumptions break RPO/RTO | Use the feature matching availability requirements. |
| Final snapshot retained unintentionally | Storage persists after database deletion | Name, review, and remove retained snapshots deliberately. |

## Common exam distractors

- A DynamoDB global secondary index is not free duplication; it has storage and request effects.
- RDS Multi-AZ is not primarily a read-scaling feature.
- DynamoDB strongly consistent reads are not supported on global secondary indexes.

Reject an answer because it violates a stated requirement, not merely because another service is more familiar.

## Recall prompts

1. State the hardest requirement that selects each service or pattern.
2. Name the failure boundary and the customer-owned configuration.
3. Explain one cheaper option and the requirement it fails.
4. Explain one more complex option and why it is premature.

## Official references

- [Amazon RDS concepts](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)
- [RDS Multi-AZ deployments](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html)
- [DynamoDB core components](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html)
- [DynamoDB read consistency](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html)
