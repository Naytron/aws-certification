# Enterprise Data Platforms, Streaming, Analytics, and Governance

## Level and exam mapping

- Level: 300-400
- SAP-C02 domains: Domain 2 - New Solutions; Domain 3 - Continuous Improvement; Domain 4 - Migration and Modernization
- Cost label: `DESIGN-ONLY`
- Default account impact: none

> The course account begins on the AWS Free plan. This module creates no AWS resources. Never convert the account to a Paid plan merely to complete an exercise.

## Why this is level 400

Data architecture crosses ownership, semantic contracts, consistency, privacy, lineage, retention, query workload, and unit economics. You must separate storage from governance and prove replay, deletion, recovery, and cost behavior across batch and streaming paths.

## Outcomes

After this module, you can:

1. Choose lake, warehouse, operational store, and streaming patterns by workload.
2. Design data-domain ownership, catalog, lineage, access, and quality contracts.
3. Reason about delivery semantics, ordering, replay, schema evolution, and idempotency.
4. Apply privacy, residency, retention, and key-boundary controls.
5. Model scan, ingest, storage, transfer, and always-on platform costs.

## Prerequisites

- S3, databases, IAM/KMS, queues, and analytics fundamentals
- Partitioning and data format basics
- RTO/RPO and multi-account boundaries

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

- [AWS data analytics lens](https://docs.aws.amazon.com/wellarchitected/latest/analytics-lens/welcome.html)
- [Lake Formation cross-account sharing](https://docs.aws.amazon.com/lake-formation/latest/dg/cross-account-permissions.html)
- [Kinesis Data Streams terminology](https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html)
- [MSK best practices](https://docs.aws.amazon.com/msk/latest/developerguide/bestpractices.html)
- [S3 performance design patterns](https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance-design-patterns.html)
