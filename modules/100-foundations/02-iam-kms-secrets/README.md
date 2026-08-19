# IAM, KMS, and Secrets

## Level and exam mapping

- Level: 100
- SAA-C03 domains: Design Secure Architectures (primary); all domains
- Cost label: `FREE-PLAN SAFE`

Grant temporary, least-privilege access and choose the right boundary between authorization, encryption keys, and secret storage.

## Outcomes

After this module, you can:

1. Explain IAM policy evaluation and diagnose an explicit or implicit deny.
2. Use a role and STS temporary credentials instead of long-term access keys.
3. Choose AWS managed keys, customer managed KMS keys, Secrets Manager, or Parameter Store intentionally.
4. Separate identity, resource policy, key policy, and secret rotation responsibilities.

## Prerequisites

- Phase 0 security baseline
- CloudShell under the non-root course identity
- No root or IAM-user access keys

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

- [IAM best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [Policy evaluation logic](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html)
- [AWS KMS concepts](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html)
- [Secrets Manager and Parameter Store](https://docs.aws.amazon.com/secretsmanager/latest/userguide/secret-type-other.html)
