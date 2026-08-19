# Must Know: AWS Global Infrastructure and Well-Architected

**Level:** 100 | **Cost:** `DESIGN-ONLY` | **SAA-C03:** All SAA-C03 domains

## Decision table

| Requirement | Prefer | Decision rule |
| --- | --- | --- |
| Users need low latency in one country | A nearby Region with required services | Region selection is a business and technical decision. |
| A service must survive one data-center failure | Deploy across at least two AZs | AZs are isolated failure domains inside a Region. |
| A strict disaster event must not stop the service | Evaluate a second Region | Multi-AZ does not protect from a full Regional disruption. |
| The requirement is content delivery close to users | Use an edge service such as CloudFront later | Do not deploy the whole origin in every edge location. |

## Service and responsibility boundaries

- IAM is primarily global; IAM changes are not selected by the console Region.
- EC2, VPC, RDS, and most service resources are Regional; many individual resources are AZ-scoped.
- S3 bucket names are globally unique, but buckets are created in one Region.
- Edge locations are points of presence, not customer-selectable AZs.

## Failure modes

| Failure | Observable effect | Response |
| --- | --- | --- |
| Single-AZ design | An AZ disruption removes all capacity | Place independent capacity and data paths in multiple AZs. |
| Region chosen only by price | Compliance, latency, or service availability is missed | Evaluate hard constraints before price. |
| Hard-coded AZ name | Account-specific AZ letters may map differently | Select available AZs dynamically or use AZ IDs. |
| Multi-Region by default | Cost and operational complexity rise without a requirement | Add Regions only for explicit RTO/RPO, sovereignty, or latency needs. |

## Common exam distractors

- An edge location is not an AZ and does not run arbitrary EC2 instances.
- More AZs do not automatically provide cross-Region disaster recovery.
- The Shared Responsibility Model does not transfer customer configuration and data protection to AWS.

Reject an answer because it violates a stated requirement, not merely because another service is more familiar.

## Recall prompts

1. State the hardest requirement that selects each service or pattern.
2. Name the failure boundary and the customer-owned configuration.
3. Explain one cheaper option and the requirement it fails.
4. Explain one more complex option and why it is premature.

## Official references

- [AWS Global Infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/)
- [Regions and Zones](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
