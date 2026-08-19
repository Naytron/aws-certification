# Container Architecture and Selection

## Level and SAA-C03 mapping

- Level: 200 - Associate architecture
- Domains: D3 and D4 primary; D1 and D2 supporting
- Cost label: `DESIGN-ONLY; ECS run is OPTIONAL PAID/SANDBOX`
- Core services: Amazon ECS, AWS Fargate, Amazon ECR, Amazon EKS, Elastic Load Balancing, CloudWatch

This module aligns to the [SAA-C03 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html). Domain codes used throughout the track are D1 secure, D2 resilient, D3 high-performing, and D4 cost-optimized.

## Outcomes

1. Choose ECS on Fargate, ECS on EC2, EKS, Lambda, or App Runner from control and operations requirements
2. Inspect an image and ECS task definition for security, reliability, and cost defects
3. Plan a safe ECS deployment while treating EKS as design-only in a Free-plan account

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

- [Amazon ECS components](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html)
- [ECS task IAM roles](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html)
- [ECS task definition parameters](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html)
