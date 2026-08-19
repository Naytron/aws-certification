# Must Know: Compute and Elasticity

**Level:** 100 | **Cost:** `DESIGN-ONLY` | **SAA-C03:** Design Resilient Architectures; Design High-Performing Architectures; Design Cost-Optimized Architectures

## Decision table

| Requirement | Prefer | Decision rule |
| --- | --- | --- |
| HTTP host/path routing | Application Load Balancer | Layer 7 routing and HTTP-aware features. |
| TCP/UDP, static IP, or very high network performance | Network Load Balancer | Layer 4 behavior. |
| Baseline steady capacity | On-Demand first; evaluate Savings Plans later | Avoid commitments before usage is known. |
| Fault-tolerant flexible work | Spot Instances | Accept and handle interruption. |
| Durable block data for one AZ | EBS | Volume is AZ-scoped and can persist independently. |

## Service and responsibility boundaries

- An EC2 instance and its EBS volume reside in one AZ; snapshots are Regional.
- An Auto Scaling group maintains desired capacity but does not make an application stateless.
- A load balancer distributes traffic; it does not fix unhealthy application state or database design.
- Stopping an instance does not remove EBS volumes or every associated cost.

## Failure modes

| Failure | Observable effect | Response |
| --- | --- | --- |
| Minimum equals one in one AZ | No capacity during AZ loss | Use multiple AZ subnets and sufficient minimum capacity. |
| State stored on instance | Replacement loses sessions/files | Externalize state to suitable data services. |
| Wrong health check | Healthy infrastructure serves broken application | Use application-aware target health where needed. |
| Spot for non-interruptible singleton | Interruption causes outage | Use Spot only with interruption-tolerant architecture. |

## Common exam distractors

- Auto Scaling does not automatically scale a database or make code resilient.
- EBS Multi-Attach is not a general shared-file-system replacement.
- A larger instance is not always better than horizontal scaling and right-sizing.

Reject an answer because it violates a stated requirement, not merely because another service is more familiar.

## Recall prompts

1. State the hardest requirement that selects each service or pattern.
2. Name the failure boundary and the customer-owned configuration.
3. Explain one cheaper option and the requirement it fails.
4. Explain one more complex option and why it is premature.

## Official references

- [Amazon EC2 instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Instances.html)
- [Auto Scaling groups](https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-groups.html)
- [Elastic Load Balancing](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html)
- [Amazon EBS](https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html)
