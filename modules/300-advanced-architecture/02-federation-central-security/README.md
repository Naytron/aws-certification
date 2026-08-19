# Federation, Cross-Account Trust, and Central Security

## Level and exam mapping

- Level: 300-400
- SAP-C02 domains: Domain 1 - Organizational Complexity; Domain 3 - Continuous Improvement
- Cost label: `DESIGN-ONLY`
- Default account impact: none

> The course account begins on the AWS Free plan. This module creates no AWS resources. Never convert the account to a Paid plan merely to complete an exercise.

## Why this is level 400

Enterprise identity is a chain of external identity proof, session issuance, role trust, authorization, resource policy, and evidence. You must constrain confused-deputy paths, preserve emergency access, and centralize findings without centralizing every response action.

## Outcomes

After this module, you can:

1. Design workforce federation and workload cross-account access with short-lived sessions.
2. Analyze role trust policies, external IDs, source identity, session tags, and resource policies.
3. Build central security ownership with delegated administration and local containment.
4. Design break-glass access that remains controlled and testable.
5. Trace evidence from identity provider through CloudTrail to investigation.

## Prerequisites

- IAM policy evaluation and STS role assumption
- Multi-account boundary concepts
- CloudTrail and security-service fundamentals

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

- [IAM Identity Center concepts](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html)
- [IAM role trust policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_manage_modify.html)
- [Confused deputy prevention](https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html)
- [IAM policy evaluation](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html)
- [Security Reference Architecture](https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/welcome.html)
