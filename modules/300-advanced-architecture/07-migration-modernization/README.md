# Migration Assessment, Waves, and Modernization

## Level and exam mapping

- Level: 300-400
- SAP-C02 domains: Domain 4 - Migration and Modernization; Domain 3 - Continuous Improvement
- Cost label: `DESIGN-ONLY`
- Default account impact: none

> The course account begins on the AWS Free plan. This module creates no AWS resources. Never convert the account to a Paid plan merely to complete an exercise.

## Why this is level 400

Portfolio migration is a dependency, risk, operating-model, and business-change program. You must choose dispositions per workload, discover hidden coupling, sequence foundations and waves, prove cutover/rollback, and avoid modernizing faster than teams can operate.

## Outcomes

After this module, you can:

1. Build a fact-based application portfolio and dependency graph.
2. Choose 7R dispositions and target patterns using business constraints.
3. Sequence foundation, pilot, migration waves, and decommission gates.
4. Design data transfer/database cutover and reconciliation.
5. Separate migration from modernization and control dual-running cost.

## Prerequisites

- Core AWS compute, storage, database, network, and identity choices
- DR, observability, and governance design
- Basic migration 7Rs and data-transfer concepts

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

- [AWS migration strategies](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html)
- [Migration portfolio assessment](https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-portfolio-assessment-guide/welcome.html)
- [Application Migration Service](https://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html)
- [Database Migration Service](https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html)
- [DataSync concepts](https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html)
