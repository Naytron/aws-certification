# Multi-Account Governance and Landing Zones

## Level and exam mapping

- Level: 300-400
- SAP-C02 domains: Domain 1 - Organizational Complexity; Domain 3 - Continuous Improvement
- Cost label: `DESIGN-ONLY`
- Default account impact: none

> The course account begins on the AWS Free plan. This module creates no AWS resources. Never convert the account to a Paid plan merely to complete an exercise.

## Why this is level 400

You must place ownership and controls at organizational boundaries, reason through SCP intersection and exceptions, limit management-account blast radius, and design an operating model that survives acquisition, compromise, and control-plane impairment.

## Outcomes

After this module, you can:

1. Design an OU and account model from isolation and ownership requirements.
2. Evaluate identity policies, permissions boundaries, SCPs, resource policies, and explicit denies together.
3. Design delegated administration, account vending, exceptions, and evidence without centralizing all power.
4. Compare Control Tower, Organizations-native, and custom landing-zone tradeoffs.
5. Model governance rollout and rollback without disrupting production.

## Prerequisites

- Secure Free-plan account and billing alerts
- IAM policy evaluation fundamentals
- CloudTrail, Config, KMS, and network baseline concepts

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

- [SAP-C02 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.html)
- [AWS Organizations terminology](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html)
- [SCP evaluation](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_evaluation.html)
- [Control Tower concepts](https://docs.aws.amazon.com/controltower/latest/userguide/how-control-tower-works.html)
- [Free Tier plans](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html)
