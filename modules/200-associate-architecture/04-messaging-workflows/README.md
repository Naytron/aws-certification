# Messaging and Workflow Architecture

## Level and SAA-C03 mapping

- Level: 200 - Associate architecture
- Domains: D2 primary; D1, D3, and D4 supporting
- Cost label: `USES CREDITS - tiny ephemeral SQS/Lambda lab`
- Core services: Amazon SQS, Amazon SNS, Amazon EventBridge, AWS Step Functions, AWS Lambda

This module aligns to the [SAA-C03 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html). Domain codes used throughout the track are D1 secure, D2 resilient, D3 high-performing, and D4 cost-optimized.

## Outcomes

1. Choose SQS, SNS, EventBridge, and Step Functions by delivery and orchestration semantics
2. Design idempotent consumers, retries, visibility timeouts, and dead-letter handling
3. Diagnose poison messages, duplicate delivery, fanout, and ordering distractors

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

- [SQS visibility timeout](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html)
- [SNS architecture](https://docs.aws.amazon.com/sns/latest/dg/welcome.html)
- [Choosing Step Functions workflows](https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html)
