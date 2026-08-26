# Course Map

Follow the modules in order. Optional deep dives can be deferred, but phase gates should not be skipped.

## Interactive assessment

The **[AWS Architecture Quiz](https://naytron.github.io/aws-certification/)**
contains 25 questions at each course level and a mixed 100-question mode. Use it
after a phase gate or for spaced retrieval; answers and explanations appear only
after submitting the attempt.

## Phase 0 - Safe onboarding

| Order | Module | Level | Primary result |
| --- | --- | --- | --- |
| 0.1 | [Free-plan signup](account/free-plan-signup.md) | 100 | A learning account with known limits |
| 0.2 | [Security baseline](account/security-baseline.md) | 100 | Root protection and a non-root workflow |
| 0.3 | [Budgets and alerts](account/budgets-and-alerts.md) | 100 | Early warning for usage and cost |
| 0.4 | [Cleanup discipline](account/cleanup-and-account-closure.md) | 100 | A repeatable zero-resource verification process |

**Gate:** Demonstrate secure sign-in, CloudShell or CLI access, active alerts, required tags, and a clean account after a small test deployment.

## Phase 1 - Level 100 foundations

| Order | Module | SAA emphasis |
| --- | --- | --- |
| 1.1 | [AWS global infrastructure and Well-Architected](modules/100-foundations/01-global-infrastructure/README.md) | All domains |
| 1.2 | [IAM, KMS, and secrets](modules/100-foundations/02-iam-kms-secrets/README.md) | Secure architectures |
| 1.3 | [EC2, EBS, Auto Scaling, and load balancing](modules/100-foundations/03-compute-elasticity/README.md) | Resilient and high-performing |
| 1.4 | [S3, EFS, and storage lifecycle](modules/100-foundations/04-storage/README.md) | Secure, resilient, and cost-optimized |
| 1.5 | [VPC networking and DNS](modules/100-foundations/05-vpc-networking/README.md) | Secure, resilient, and high-performing |
| 1.6 | [RDS, Aurora, and DynamoDB](modules/100-foundations/06-databases/README.md) | Resilient, high-performing, and cost-optimized |
| 1.7 | [CloudWatch, CloudTrail, and operational visibility](modules/100-foundations/07-observability/README.md) | Secure and resilient |

**Gate:** Build, observe, troubleshoot, and remove a small secure web workload.

## Phase 2 - Level 200 associate architecture

| Order | Module | SAA emphasis |
| --- | --- | --- |
| 2.1 | [High availability and failure isolation](modules/200-associate-architecture/01-ha-failure-isolation/README.md) | Resilient architectures |
| 2.2 | [Route 53, CloudFront, and edge patterns](modules/200-associate-architecture/02-edge-dns/README.md) | High-performing architectures |
| 2.3 | [Lambda and API Gateway](modules/200-associate-architecture/03-serverless-api/README.md) | High-performing and cost-optimized |
| 2.4 | [SQS, SNS, EventBridge, and Step Functions](modules/200-associate-architecture/04-messaging-workflows/README.md) | Resilient architectures |
| 2.5 | [ECS, EKS, and container selection](modules/200-associate-architecture/05-containers/README.md) | High-performing and cost-optimized |
| 2.6 | [Database, analytics, and storage decisions](modules/200-associate-architecture/06-data-decisions/README.md) | High-performing and cost-optimized |
| 2.7 | [Backup, recovery, RTO, and RPO](modules/200-associate-architecture/07-backup-dr/README.md) | Resilient architectures |
| 2.8 | [Cost architecture and pricing decisions](modules/200-associate-architecture/08-cost-optimization/README.md) | Cost-optimized architectures |

**Gate:** Complete the three-tier and event-driven capstones, then pass the associate architecture review.

## Phase 3 - SAA-C03 integration

| Domain | Exam weight |
| --- | ---: |
| Design Secure Architectures | 30% |
| Design Resilient Architectures | 26% |
| Design High-Performing Architectures | 24% |
| Design Cost-Optimized Architectures | 20% |

Complete:

- [Domain review sheets and decision drills](modules/300-saa-integration/README.md)
- [Mixed scenario sets](modules/300-saa-integration/mixed-scenarios-01.md)
- [Timed practice sets](modules/300-saa-integration/timed-practice.md)
- Distractor and error-log reviews
- SAA capstone and architecture defense

**Milestone:** Sit SAA only after meeting the [SAA scorecard](assessments/saa-scorecard.md) criteria.

## Phase 4 - Level 300-400 architecture depth

| Order | Module | SAP emphasis |
| --- | --- | --- |
| 4.1 | [Organizations, SCPs, Control Tower, and multi-account strategy](modules/300-advanced-architecture/01-multi-account-governance/README.md) | Organizational complexity |
| 4.2 | [Federation, cross-account access, and centralized security](modules/300-advanced-architecture/02-federation-central-security/README.md) | Organizational complexity |
| 4.3 | [Transit Gateway, PrivateLink, hybrid DNS, VPN, and Direct Connect](modules/300-advanced-architecture/03-hybrid-networking/README.md) | New solutions |
| 4.4 | [Multi-Region architecture and disaster recovery](modules/300-advanced-architecture/04-multi-region-dr/README.md) | New and existing solutions |
| 4.5 | [Enterprise observability, incident response, and resilience testing](modules/300-advanced-architecture/05-observability-incident-response/README.md) | Continuous improvement |
| 4.6 | [Data platforms, streaming, analytics, and governance](modules/300-advanced-architecture/06-data-platforms/README.md) | New solutions |
| 4.7 | [Migration assessment, transfer, database migration, and modernization](modules/300-advanced-architecture/07-migration-modernization/README.md) | Migration and modernization |
| 4.8 | [FinOps, quotas, commitments, and portfolio governance](modules/300-advanced-architecture/08-finops-quotas/README.md) | Continuous improvement |
| 4.9 | [Responsible AI architecture controls](modules/300-advanced-architecture/09-responsible-ai-controls/README.md) | Emerging professional topics |

**Gate:** Defend a complex enterprise architecture under security, cost, operational, migration, and resilience constraints.

## Phase 5 - SAP-C02 integration

| Domain | Exam weight |
| --- | ---: |
| Design Solutions for Organizational Complexity | 26% |
| Design for New Solutions | 29% |
| Continuous Improvement for Existing Solutions | 25% |
| Accelerate Workload Migration and Modernization | 20% |

Complete:

- [Long-form requirements analysis](modules/400-professional-architecture/requirements-and-time-management.md)
- Multi-service decision drills
- Migration-wave and rollback exercises
- [Professional capstones](capstones/README.md)
- Architecture review board defense
- Timed professional practice sets

**Milestone:** Sit SAP only after meeting the [SAP scorecard](assessments/sap-scorecard.md) and experience criteria.

## Capstone sequence

1. [Secure highly available three-tier application](capstones/01-three-tier/README.md)
2. [Event-driven serverless order-processing platform](capstones/02-event-driven/README.md)
3. [Multi-Region continuity and disaster-recovery design](capstones/03-multi-region-dr/README.md)
4. [Enterprise multi-account landing-zone simulation](capstones/04-landing-zone/README.md)
5. [Hybrid network and identity architecture](capstones/05-hybrid-network/README.md)
6. [Migration and modernization portfolio](capstones/06-migration-portfolio/README.md)
7. [Final professional architecture review board](capstones/07-architecture-review-board/README.md)
