# Observability

## Level and exam mapping

- Level: 100
- SAA-C03 domains: Design Secure Architectures; Design Resilient Architectures
- Cost label: `USES CREDITS`

Use metrics, logs, alarms, and API audit history to answer specific operational and security questions.

## Outcomes

After this module, you can:

1. Distinguish CloudWatch metrics, logs, alarms, and dashboards from CloudTrail API audit events.
2. Create a bounded-retention log group and derive a metric from structured events.
3. Design actionable alarms around symptoms and business outcomes.
4. Diagnose missing telemetry by checking Region, namespace, dimensions, permissions, and time range.

## Prerequisites

- Completed IAM module
- CloudWatch Logs and CloudTrail read permissions
- Immediate cleanup window

## Module workflow

1. Read [must-know.md](must-know.md).
2. Run [guided-lab.md](guided-lab.md).
3. Prove [validation.md](validation.md).
4. Complete [challenge-lab.md](challenge-lab.md).
5. Defend [architecture-scenario.md](architecture-scenario.md).
6. Follow [cleanup.md](cleanup.md).
7. Take [quiz.md](quiz.md), then review [answers.md](answers.md).

## Evidence required

- A simple architecture or scope diagram
- Redacted command output proving identity, Region, and result
- Required resource tags
- Break/fix symptom, cause, correction, and prevention
- Dependency-safe cleanup proof
- One decision record and one rejected alternative

Never record account IDs, ARNs containing account IDs, credentials, secrets, or private endpoints.

## Completion gate

- Guided and challenge validation pass.
- The controlled fault is diagnosed from evidence, not guesswork.
- You can explain every decision table row and distractor.
- All explicitly named resources are removed.
- Closed-book quiz score is at least 80%.

## Official references

- [What is Amazon CloudWatch?](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html)
- [CloudWatch Logs concepts](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatchLogsConcepts.html)
- [CloudTrail event history](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html)
- [CloudWatch alarm states](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html)
