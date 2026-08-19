# Must Know - High Availability and Failure Isolation

## Decision rules

| Requirement | Prefer | Reject when |
| --- | --- | --- |
| Survive one data-center failure in a Region | Multi-AZ resources and stateless compute across at least two AZs | A single-AZ fleet, even with several instances |
| Scale healthy web capacity | ALB plus target health checks plus Auto Scaling | DNS failover for per-request balancing |
| Regional disaster recovery | Backup/restore, pilot light, warm standby, or active/active according to RTO/RPO | Calling Multi-AZ a multi-Region DR plan |
| Durable object storage | S3; add replication only for an explicit second-Region requirement | EBS snapshots as a shared live file system |
| Relational HA with simple failover | RDS Multi-AZ deployment | Read replicas alone as synchronous HA |

An AZ is a failure-isolation boundary inside a Region. A Region is a separate geographic boundary. Multi-AZ normally improves availability; multi-Region adds continuity complexity, replication lag, routing, consistency, and cost.

## Failure behavior that changes decisions

- Load balancers route only to registered healthy targets; health checks must represent application readiness, not merely an open port.
- Auto Scaling replaces unhealthy capacity, but replacement is not instantaneous. Keep headroom for sudden loss.
- RDS Multi-AZ is for availability and failover. Read replicas primarily scale reads and can be promoted; replication is asynchronous.
- S3 and DynamoDB are Regional managed services designed across multiple AZs; do not add an EC2 proxy to make them "highly available."
- Quorum systems need enough members in independent failure domains. Two equal members cannot safely establish majority after a partition.

## Common failures and distractors

- **More instances in one AZ:** capacity, not AZ fault tolerance.
- **Read replica equals standby:** wrong objective and replication semantics.
- **Cross-Region for every workload:** needless latency, cost, and conflict handling without a DR requirement.
- **Health check `/`:** can stay green while a critical dependency is unavailable.
- **Backups equal HA:** backups recover data; they do not keep a live endpoint available.

## Official references

- [AWS Regions and Availability Zones](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions-availability-zones.html)
- [Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html)
- [RDS high availability](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html)
