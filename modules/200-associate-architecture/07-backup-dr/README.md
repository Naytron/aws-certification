# Backup and Disaster Recovery

## Level and SAA-C03 mapping

- Level: 200 - Associate architecture
- Domains: D2 primary; D1 and D4 supporting
- Cost label: `USES CREDITS - tiny ephemeral versioned S3 lab`
- Core services: AWS Backup, S3 Versioning and Replication, RDS snapshots, EBS snapshots, Route 53, Elastic Disaster Recovery

This module aligns to the [SAA-C03 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html). Domain codes used throughout the track are D1 secure, D2 resilient, D3 high-performing, and D4 cost-optimized.

## Outcomes

1. Translate business impact into RTO, RPO, retention, and recovery strategy
2. Distinguish backup, replication, high availability, and disaster recovery
3. Test restore integrity and cleanup versioned data without wildcard deletion

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

- [Disaster recovery options](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html)
- [AWS Backup concepts](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html)
- [S3 Versioning](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html)
