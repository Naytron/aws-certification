# Compute and Elasticity

## Level and exam mapping

- Level: 100
- SAA-C03 domains: Design Resilient Architectures; Design High-Performing Architectures; Design Cost-Optimized Architectures
- Cost label: `USES CREDITS`

Choose EC2 capacity, EBS, Auto Scaling, and load-balancing patterns from workload and failure requirements.

## Outcomes

After this module, you can:

1. Select instance families and purchasing options from workload shape and interruption tolerance.
2. Explain launch templates, Auto Scaling group bounds, health checks, and replacement.
3. Distinguish EBS persistence from instance-store ephemerality.
4. Choose ALB, NLB, or no load balancer from protocol and routing needs.

## Prerequisites

- Completed IAM module
- A low usage budget
- EC2 and Auto Scaling permissions
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

- [Amazon EC2 instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Instances.html)
- [Auto Scaling groups](https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-groups.html)
- [Elastic Load Balancing](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html)
- [Amazon EBS](https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html)
