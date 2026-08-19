# Multi-Region Architecture and Disaster Recovery

## Level and exam mapping

- Level: 300-400
- SAP-C02 domains: Domain 2 - New Solutions; Domain 3 - Continuous Improvement
- Cost label: `DESIGN-ONLY`
- Default account impact: none

> The course account begins on the AWS Free plan. This module creates no AWS resources. Never convert the account to a Paid plan merely to complete an exercise.

## Why this is level 400

A multi-Region diagram is not a recovery strategy. You must decompose business transactions, data authority, replication semantics, dependencies, detection, decision time, failover, reconciliation, and failback into a tested recovery system with explicit cost.

## Outcomes

After this module, you can:

1. Translate business impact into tiered RTO, RPO, and availability targets.
2. Select backup/restore, pilot light, warm standby, or active-active by dependency.
3. Design data replication and conflict handling around a declared write authority.
4. Build failover and failback runbooks with decision gates.
5. Expose correlated cross-Region dependencies and control-plane assumptions.

## Prerequisites

- Availability Zone high availability and backup concepts
- Route 53, Global Accelerator, databases, queues, and KMS basics
- Incident command and observability fundamentals

## Workflow

1. Read [must-know.md](must-know.md) and restate each decision rule.
2. Complete [guided-lab.md](guided-lab.md).
3. Rebuild the analysis independently in [challenge-lab.md](challenge-lab.md).
4. Use [hands-on-exercise.md](hands-on-exercise.md) as an additional simulation workbook.
5. Defend [architecture-scenario.md](architecture-scenario.md) as if presenting to an architecture review board.
6. Check the observable gates in [validation.md](validation.md).
7. Complete the explicit no-cloud verification in [cleanup.md](cleanup.md).
8. Take [quiz.md](quiz.md) closed-book, then review [answers.md](answers.md).

## Evidence required

- A boundary diagram showing organization, trust, network, data, and failure boundaries
- The completed analysis artifact requested by the exercise
- An architecture decision record (ADR) with assumptions and rejected alternatives
- A failure or rollback analysis
- A cost and operational ownership statement
- A closed-book quiz score and corrected error-log entries

## Completion gate

You are complete only when you can defend the selected design, identify its residual risks, name its owner, and explain how the decision changes when one hard constraint changes.

## Official references

- [Disaster recovery of workloads on AWS](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html)
- [Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html)
- [Route 53 failover routing](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-failover.html)
- [AWS Backup security](https://docs.aws.amazon.com/aws-backup/latest/devguide/security.html)
- [ARC readiness checks](https://docs.aws.amazon.com/r53recovery/latest/dg/readiness-checks.html)
