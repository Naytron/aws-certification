# Level 100 Foundations

**Level:** 100

This track builds the service boundaries and decision rules needed for AWS Certified Solutions Architect - Associate (SAA-C03). It assumes general IT/cloud fundamentals but no AWS implementation experience.

## Before you begin

Complete [account onboarding](../../account/README.md), including the constrained bootstrap administrator described in [security-baseline.md](../../account/security-baseline.md). That broad administrator is a temporary, single-user learning-account exception. It is not a production identity pattern. Production human access should use federation and temporary credentials; workloads should use roles.

Use the course default Region (`us-east-1`) or your recorded home Region. Every lab requires tags `Course`, `Module`, `Owner`, and `ExpiresAt`. Never put account IDs, email addresses, or secrets in tags or evidence.

## Modules

| Order | Module | Cost label | SAA-C03 mapping |
| ---: | --- | --- | --- |
| 1 | [AWS Global Infrastructure and Well-Architected](01-global-infrastructure/README.md) | `FREE-PLAN SAFE` | All SAA-C03 domains |
| 2 | [IAM, KMS, and Secrets](02-iam-kms-secrets/README.md) | `FREE-PLAN SAFE` | Design Secure Architectures (primary); all domains |
| 3 | [Compute and Elasticity](03-compute-elasticity/README.md) | `USES CREDITS` | Design Resilient Architectures; Design High-Performing Architectures; Design Cost-Optimized Architectures |
| 4 | [Storage](04-storage/README.md) | `FREE-PLAN SAFE` | All SAA-C03 domains |
| 5 | [VPC Networking and DNS](05-vpc-networking/README.md) | `FREE-PLAN SAFE` | Design Secure Architectures; Design Resilient Architectures; Design High-Performing Architectures |
| 6 | [Databases](06-databases/README.md) | `FREE-PLAN SAFE` | Design Resilient Architectures; Design High-Performing Architectures; Design Cost-Optimized Architectures |
| 7 | [Observability](07-observability/README.md) | `USES CREDITS` | Design Secure Architectures; Design Resilient Architectures |

## Study workflow

For each module:

1. Read `must-know.md` and state each decision rule from memory.
2. Complete the guided lab, including its controlled break/fix.
3. Prove each item in `validation.md`.
4. Complete the challenge lab without copying guided steps.
5. Defend the choice in `architecture-scenario.md`.
6. Follow `cleanup.md` and verify no named resources remain.
7. Take `quiz.md` closed-book; use `answers.md` only afterward.

Record non-sensitive evidence with [the lab evidence template](../../templates/lab-evidence-template.md).

## Cost and safety

- `FREE-PLAN SAFE` labs use no intentionally persistent paid resource and stay tiny.
- `USES CREDITS` labs can consume Free-plan promotional credits. Run them briefly and clean up in the same session.
- This track never deploys NAT Gateways, EKS, OpenSearch, MSK, persistent load balancers, or persistent Multi-AZ databases.
- AWS offers and prices change. Check the Billing console, credit balance, and [AWS pricing](https://aws.amazon.com/pricing/) before deployment.
- Commands delete only explicit lab names or IDs. Do not replace them with wildcard deletion.

## Phase gate

You are ready for Level 200 when you can:

- Build and remove each challenge without step-by-step help.
- Diagnose one authorization, routing, scaling, data-access, and telemetry failure.
- Explain why at least two plausible exam distractors fail each scenario.
- Show a clean inventory and no unexpected billing/usage increase.

## Core references

- [SAA-C03 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html)
- [AWS Architecture Center](https://aws.amazon.com/architecture/)
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
- [AWS Free Tier plans](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html)
