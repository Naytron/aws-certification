# Edge and DNS Architecture

## Level and SAA-C03 mapping

- Level: 200 - Associate architecture
- Domains: D3 primary; D1, D2, and D4 supporting
- Cost label: `USES CREDITS - tiny ephemeral CloudFront/S3 lab`
- Core services: Route 53, CloudFront, S3, AWS WAF, ACM, Global Accelerator

This module aligns to the [SAA-C03 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html). Domain codes used throughout the track are D1 secure, D2 resilient, D3 high-performing, and D4 cost-optimized.

## Outcomes

1. Choose Route 53 routing policies from health, geography, and performance requirements
2. Design CloudFront cache keys, origin protection, TLS, and invalidation behavior
3. Separate authoritative DNS decisions from content-delivery decisions without buying a domain

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

- [Route 53 routing policies](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html)
- [CloudFront cache content](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ConfiguringCaching.html)
- [Restricting S3 access with OAC](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html)
