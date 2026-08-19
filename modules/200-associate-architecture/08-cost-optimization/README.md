# Cost-Optimized Architecture

## Level and SAA-C03 mapping

- Level: 200 - Associate architecture
- Domains: D4 primary; D1, D2, and D3 supporting
- Cost label: `DESIGN-ONLY with read-only Billing observations`
- Core services: AWS Pricing Calculator, Cost Explorer, AWS Budgets, Compute Optimizer, Savings Plans, Reserved Instances, S3 lifecycle

This module aligns to the [SAA-C03 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html). Domain codes used throughout the track are D1 secure, D2 resilient, D3 high-performing, and D4 cost-optimized.

## Outcomes

1. Model total cost from demand, unit rates, utilization, transfer, storage, and operations
2. Choose elasticity and commitment instruments without sacrificing hard requirements
3. Detect architectural cost traps and build measurable optimization guardrails

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

- [AWS Pricing Calculator](https://docs.aws.amazon.com/pricing-calculator/latest/userguide/what-is-pricing-calculator.html)
- [Cost Optimization Pillar](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html)
- [Savings Plans](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html)
