# Level 200 - Associate Architecture

This track turns Level 100 service knowledge into architecture decisions for AWS Certified Solutions Architect - Associate (SAA-C03). Complete modules in order; each one separates requirements, service boundaries, failure behavior, cost, and plausible distractors.

## SAA-C03 domain map

| Code | Domain | Exam weight | Track emphasis |
| --- | --- | ---: | --- |
| D1 | Design Secure Architectures | 30% | Identity, encryption, origin/resource policies, least privilege, data protection |
| D2 | Design Resilient Architectures | 26% | Failure isolation, decoupling, backup, RTO/RPO |
| D3 | Design High-Performing Architectures | 24% | Edge, scaling, serverless, containers, data access patterns |
| D4 | Design Cost-Optimized Architectures | 20% | Elasticity, managed services, storage/query efficiency, commitments |

## Modules

| Order | Module | Primary domains | Lab safety |
| --- | --- | --- | --- |
| 1 | [High availability and failure isolation](01-ha-failure-isolation/README.md) | D2 | Design-only |
| 2 | [Edge and DNS](02-edge-dns/README.md) | D3 | Tiny ephemeral CloudFront/S3; no domain |
| 3 | [Serverless API](03-serverless-api/README.md) | D3, D4 | Tiny ephemeral API/Lambda |
| 4 | [Messaging and workflows](04-messaging-workflows/README.md) | D2 | Tiny ephemeral SQS/Lambda |
| 5 | [Containers](05-containers/README.md) | D3, D4 | Analysis; ECS run optional sandbox; EKS design-only |
| 6 | [Data decisions](06-data-decisions/README.md) | D3, D4 | Tiny S3/Athena or design-only |
| 7 | [Backup and DR](07-backup-dr/README.md) | D2 | Tiny versioned S3 restore |
| 8 | [Cost optimization](08-cost-optimization/README.md) | D4 | Design-only |

## Safety contract

Before every lab: run `aws sts get-caller-identity`, confirm `aws configure get region`, inspect Free-plan/credits and budgets, prepare tags `Course`, `Module`, `Owner`, and `ExpiresAt`, and read cleanup. Never record account IDs or credentials. Deploy only exact named resources. Delete dependents before dependencies and verify absence.

No core lab deploys a NAT Gateway, EKS control plane, Global Accelerator, OpenSearch, MSK, or persistent database. Exercises needing those services are explicitly `DESIGN-ONLY` or `OPTIONAL PAID/SANDBOX`.

## Track gate

- Complete all guided and challenge labs with cleanup evidence.
- Score at least 80% on each original quiz and explain every distractor.
- Defend a three-tier and event-driven design across all four domains.
- Demonstrate that quotas/limits are checked when decision-relevant rather than memorized blindly.

## Official sources

- [SAA-C03 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html)
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
- [AWS service quotas](https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html)
- [AWS Free Tier plans](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html)
