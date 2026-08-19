# Domain 2 - Design Resilient Architectures (26%)

## What the domain tests

1. Scalable, loosely coupled architectures.
2. Highly available and fault-tolerant architectures.

## Must-know facts

- High availability reduces interruption; fault tolerance continues through faults. Do not promise either without a stated failure scope.
- Spread production compute across Availability Zones and remove single-instance dependencies.
- An ALB distributes HTTP/HTTPS using application rules; an NLB handles high-performance TCP/UDP/TLS and static IP needs.
- Auto Scaling replaces unhealthy instances and changes capacity. A load balancer does not create capacity.
- Keep compute stateless; move sessions and durable state to managed stores.
- SQS buffers work, absorbs bursts, and permits independent scaling. Standard queues are at-least-once and best-effort ordered; consumers must be idempotent.
- FIFO queues provide ordering and deduplication within their defined constraints, not unlimited throughput.
- SNS fans out notifications; EventBridge routes events by content; Step Functions orchestrates explicit stateful workflows.
- A dead-letter queue isolates repeatedly failed messages. It is not a replay strategy unless redrive and retention are designed.
- RDS Multi-AZ provides availability/failover. Read replicas primarily scale reads and can support some DR patterns; they are not the same feature.
- DynamoDB is multi-AZ by design. Global tables add multi-Region replication.
- S3 Standard stores data redundantly across multiple AZs; One Zone storage classes trade resilience for cost.
- Backups meet RPO only if frequent enough and restorable. RTO includes infrastructure, data restore, DNS, dependencies, quotas, and validation.
- DR patterns generally trade increasing cost for decreasing RTO/RPO: backup/restore, pilot light, warm standby, multi-site active/active.
- Route 53 health checks and routing policies steer traffic but cannot repair an unhealthy application.
- Multi-Region is not automatically better: it adds replication, consistency, failover, testing, and cost complexity.

## Decision reasoning

1. Translate business language into RTO, RPO, failure scope, and consistency.
2. Find every single point of failure in request, compute, state, and operations.
3. Decouple components whose scaling or failure behavior differs.
4. Choose retries with exponential backoff, jitter, bounded attempts, idempotency, DLQs, and alarms.
5. Prefer the least complex design that meets the stated target.
6. Test restore and failover; a diagram is not proof.

## Plausible alternatives that fail

| Requirement | Best direction | Plausible failure |
| --- | --- | --- |
| Survive one AZ loss | Multi-AZ load balancer, compute, and data design | Two instances in one AZ share a failure boundary |
| Absorb order spikes | SQS between intake and workers | Larger synchronous servers preserve coupling |
| Scale relational reads | Read replicas | Multi-AZ standby is not normally a read endpoint |
| Near-zero regional RTO/RPO | Multi-Region active/active where supported | Nightly backup cannot meet near-zero targets |
| Preserve ordered per-customer commands | FIFO queue with message group per customer | One global message group serializes all customers |

## Retrieval checks

Explain without notes:

1. Multi-AZ versus read replicas.
2. Why at-least-once delivery requires idempotency.
3. How RTO and RPO change a DR choice.
4. Why two resources are not resilient if they share one failure boundary.

## Official references

- [SAA-C03 Domain 2](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain2.html)
- [Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html)
- [SQS design](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-best-practices.html)
- [RDS high availability](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html)
