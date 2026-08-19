# Domain 4 - Design Cost-Optimized Architectures (20%)

## What the domain tests

Cost-optimized storage, compute, databases, and networks.

## Must-know facts

- Cost optimization means meeting requirements at the lowest total cost, not selecting the lowest line-item price.
- Tag supported resources and use Budgets, Cost Explorer, and cost allocation data. Budgets alert; they are not hard caps.
- Match S3 storage class to access frequency, retrieval time, minimum duration, and resiliency. Lifecycle transitions and expiration must reflect real retention.
- S3 Intelligent-Tiering fits unknown or changing access patterns, with monitoring/automation charges and class-specific behavior.
- Use gp3 for many general EBS workloads; select provisioned IOPS or HDD types only when workload requirements justify them. Delete unattached volumes and obsolete snapshots.
- Right-size before commitments. Auto Scaling handles variable capacity; Spot fits interruption-tolerant work; Savings Plans or Reserved Instances fit measured steady usage and commitment constraints.
- Lambda can be economical for intermittent/event-driven work; continuously busy or specialized workloads may favor containers or EC2.
- RDS Multi-AZ is an availability decision, not read scaling. Do not pay for it where the workload explicitly tolerates downtime.
- DynamoDB on-demand fits uncertain demand; provisioned plus auto scaling can fit predictable demand. Standard-IA table class fits infrequently accessed data under suitable patterns.
- NAT Gateway charges include hourly and data processing. Gateway endpoints for S3/DynamoDB can reduce NAT use. Interface endpoints have hourly/data charges and must be justified.
- Avoid accidental cross-AZ and cross-Region transfer. Place chatty components deliberately without sacrificing required resilience.
- CloudFront can reduce origin and transfer load while improving latency.
- Direct Connect provides dedicated connectivity but is not automatically cheaper than VPN; decide using volume, consistency, lead time, and availability.
- Data compression, batching, filtering, and correct retention often save more than micro-optimizing one resource.
- Free-plan safety is narrower than exam architecture. Use design-only analysis where production resilience requires unavailable or credit-consuming services.

## Decision reasoning

1. Separate hard requirements from preferences.
2. Model steady, burst, storage, requests, retrieval, transfer, operations, and licensing.
3. Remove idle waste and right-size.
4. Select elasticity and pricing model.
5. Revisit storage/retention and network paths.
6. Compare total cost under realistic utilization and failure requirements.

## Plausible alternatives that fail

| Requirement | Best direction | Plausible failure |
| --- | --- | --- |
| Fault-tolerant batch jobs with flexible start | Spot fleet/capacity plus checkpoints | On-Demand only ignores interruption tolerance |
| Unknown object access | Intelligent-Tiering after class analysis | Immediate archival can create retrieval delay and fees |
| Private S3 traffic from VPC | Gateway endpoint | NAT Gateway adds processing and hourly cost |
| Predictable steady compute | Right-size, then evaluate commitment | Three-year commitment before measurement risks waste |
| Dev database tolerates nightly outage | Schedule/stop where supported and retain backups | Production-grade Multi-AZ adds cost without a requirement |

## Retrieval checks

Explain without notes:

1. Why "serverless is always cheaper" is false.
2. How an S3 lifecycle rule can increase cost.
3. Why commitments follow measurement.
4. How network topology changes the bill.

## Official references

- [SAA-C03 Domain 4](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain4.html)
- [Cost Optimization Pillar](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html)
- [AWS pricing](https://aws.amazon.com/pricing/)
- [AWS Free plan](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html)
