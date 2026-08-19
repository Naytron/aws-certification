# Database, Analytics, and Storage Decisions

## Level and SAA-C03 mapping

- Level: 200 - Associate architecture
- Domains: D3 and D4 primary; D1 and D2 supporting
- Cost label: `USES CREDITS - tiny ephemeral S3/Athena lab`
- Core services: S3, EBS, EFS, RDS/Aurora, DynamoDB, ElastiCache, Redshift, Athena

This module aligns to the [SAA-C03 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html). Domain codes used throughout the track are D1 secure, D2 resilient, D3 high-performing, and D4 cost-optimized.

## Outcomes

1. Select relational, key-value, object, file, cache, warehouse, and query services from access patterns
2. Distinguish availability, durability, consistency, scaling, and analytics requirements
3. Estimate scan and storage cost before creating persistent data infrastructure

## Prerequisites

- Complete account security, budgets, cleanup discipline, and Level 100 foundations.
- Use temporary credentials in CloudShell; never create a root access key.
- Read the cost label and [cleanup](cleanup.md) before any deployment.

## Workflow

1. Read [must-know](must-know.md).
2. Complete the [guided lab](guided-lab.md).
3. Apply [validation](validation.md).
4. Complete the [challenge lab](challenge-lab.md).
5. Defend the [architecture scenario](architecture-scenario.md).
6. Follow [cleanup](cleanup.md).
7. Take the [quiz](quiz.md), then review [answers](answers.md).

## Evidence and completion gate

Record a diagram, commands/configuration, observable results, one break/fix, cleanup proof, and an architecture decision using the [course lab-evidence template](../../../templates/lab-evidence-template.md). Completion requires passing every validation item, explaining two distractors, and scoring at least 8/10 closed-book.

## Official references

- [AWS database decision guide](https://docs.aws.amazon.com/decision-guides/latest/databases-on-aws-how-to-choose/databases-on-aws-how-to-choose.html)
- [Athena performance optimization](https://docs.aws.amazon.com/athena/latest/ug/performance-tuning.html)
- [S3 storage classes](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html)
