# High Availability and Failure Isolation

## Level and SAA-C03 mapping

- Level: 200 - Associate architecture
- Domains: D2 primary; D1, D3, and D4 supporting
- Cost label: `DESIGN-ONLY`
- Core services: Availability Zones, Regions, Elastic Load Balancing, Auto Scaling, Route 53, RDS/Aurora, DynamoDB, S3

This module aligns to the [SAA-C03 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html). Domain codes used throughout the track are D1 secure, D2 resilient, D3 high-performing, and D4 cost-optimized.

## Outcomes

1. Place components across failure boundaries without confusing HA with DR
2. Select scaling, health-check, and data-replication patterns from stated RTO/RPO
3. Identify hidden single points of failure and unsafe failover assumptions

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

- [AWS Regions and Availability Zones](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions-availability-zones.html)
- [Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html)
- [RDS high availability](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html)
