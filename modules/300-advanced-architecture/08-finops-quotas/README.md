# FinOps, Quotas, Commitments, and Portfolio Governance

## Level and exam mapping

- Level: 300-400
- SAP-C02 domains: Domain 1 - Organizational Complexity; Domain 3 - Continuous Improvement; Domain 4 - Migration and Modernization
- Cost label: `DESIGN-ONLY`
- Default account impact: none

> The course account begins on the AWS Free plan. This module creates no AWS resources. Never convert the account to a Paid plan merely to complete an exercise.

## Why this is level 400

Cost and capacity are architecture properties. You must assign economics to owners, normalize spend by business value, model commitment and transfer risk, and prove quotas/capacity under growth and recovery instead of applying indiscriminate savings targets.

## Outcomes

After this module, you can:

1. Build allocation, showback/chargeback, and unit-economics models.
2. Distinguish pricing, usage, rate, commitment, and architectural optimization.
3. Evaluate Savings Plans and Reservations against uncertainty.
4. Treat service quotas as tested capacity dependencies.
5. Govern anomaly response and optimization without damaging reliability.

## Prerequisites

- AWS pricing and billing fundamentals
- Workload ownership and tagging
- Resilience, migration, and data-transfer concepts

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

- [Cost Optimization Pillar](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html)
- [AWS Cost Management](https://docs.aws.amazon.com/cost-management/latest/userguide/what-is-costmanagement.html)
- [Savings Plans](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html)
- [Service Quotas](https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html)
- [Data Exports](https://docs.aws.amazon.com/cur/latest/userguide/what-is-data-exports.html)
