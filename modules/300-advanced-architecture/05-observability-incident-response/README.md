# Enterprise Observability, Incident Response, and Resilience Testing

## Level and exam mapping

- Level: 300-400
- SAP-C02 domains: Domain 3 - Continuous Improvement; Domain 2 - New Solutions
- Cost label: `DESIGN-ONLY`
- Default account impact: none

> The course account begins on the AWS Free plan. This module creates no AWS resources. Never convert the account to a Paid plan merely to complete an exercise.

## Why this is level 400

Observability must connect customer outcomes to telemetry contracts, detection latency, investigation context, response authority, and resilience learning. Central dashboards alone do not define ownership, evidence integrity, or safe automated containment.

## Outcomes

After this module, you can:

1. Define SLOs, SLIs, error budgets, and telemetry contracts for critical journeys.
2. Design multi-account log/metric/trace aggregation and immutable security evidence.
3. Correlate symptoms across services with structured query analysis.
4. Create incident command, containment, and communication runbooks.
5. Plan fault injection and game days with safety stop conditions.

## Prerequisites

- CloudWatch, CloudTrail, EventBridge, and tracing basics
- Service-level objective concepts
- Multi-account and DR boundaries

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

- [CloudWatch Observability](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html)
- [CloudWatch Logs Insights syntax](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html)
- [AWS SRA logging](https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/log-archive.html)
- [Incident response guide](https://docs.aws.amazon.com/whitepapers/latest/aws-security-incident-response-guide/welcome.html)
- [Fault Injection Service concepts](https://docs.aws.amazon.com/fis/latest/userguide/what-is.html)
