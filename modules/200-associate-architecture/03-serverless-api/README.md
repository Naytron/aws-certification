# Serverless API Architecture

## Level and SAA-C03 mapping

- Level: 200 - Associate architecture
- Domains: D3 and D4 primary; D1 and D2 supporting
- Cost label: `USES CREDITS - tiny ephemeral Lambda/API Gateway lab`
- Core services: AWS Lambda, Amazon API Gateway, DynamoDB, CloudWatch, IAM, Cognito

This module aligns to the [SAA-C03 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html). Domain codes used throughout the track are D1 secure, D2 resilient, D3 high-performing, and D4 cost-optimized.

## Outcomes

1. Select API Gateway, Lambda, and integration patterns from traffic and latency constraints
2. Apply least privilege, throttling, idempotency, and observability to a serverless request path
3. Explain concurrency, retries, cold starts, and failure isolation without treating serverless as limit-free

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

- [API Gateway HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html)
- [Lambda quotas](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html)
- [Lambda best practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
