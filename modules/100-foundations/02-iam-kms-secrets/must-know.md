# Must Know: IAM, KMS, and Secrets

**Level:** 100 | **Cost:** `DESIGN-ONLY` | **SAA-C03:** Design Secure Architectures (primary); all domains

## Decision table

| Requirement | Prefer | Decision rule |
| --- | --- | --- |
| AWS workload needs AWS access | IAM role | Delivers rotating temporary credentials. |
| Human workforce access | Federation/Identity Center in production | Avoids fleets of long-term IAM-user credentials. |
| Database password needs managed rotation | Secrets Manager | Purpose-built secret storage and rotation integration. |
| Non-secret configuration or simple SecureString | Systems Manager Parameter Store | Lower-complexity hierarchical configuration; rotation is not equivalent. |
| Need key policy, rotation control, or cross-account key use | Customer managed KMS key | Adds control and cost; do not create one without the requirement. |

## Service and responsibility boundaries

- Authentication establishes identity; authorization evaluates whether an action on a resource is allowed.
- IAM roles provide sessions, not permanent credentials attached to a person or application.
- KMS protects cryptographic keys and performs cryptographic operations; it is not a general secret database.
- Secrets Manager stores secret values and can coordinate rotation; Parameter Store is not a drop-in managed-rotation service.

## Failure modes

| Failure | Observable effect | Response |
| --- | --- | --- |
| Identity policy allows, key policy does not | KMS access is denied | Check both IAM authorization and KMS key policy/grants. |
| Secret encrypted but broadly readable | Confidentiality is lost through authorization | Restrict GetSecretValue/GetParameter and decrypt permissions. |
| Role trust is too broad | Unintended principals can request sessions | Constrain trusted principals and conditions. |
| Long-lived administrator key | Credential theft has durable impact | Use federation, roles, and short sessions. |

## Common exam distractors

- Encryption at rest does not replace least-privilege authorization.
- A permissions boundary grants nothing; it limits what identity policies may grant.
- An explicit deny overrides an allow, while absence of an allow is an implicit deny.

Reject an answer because it violates a stated requirement, not merely because another service is more familiar.

## Recall prompts

1. State the hardest requirement that selects each service or pattern.
2. Name the failure boundary and the customer-owned configuration.
3. Explain one cheaper option and the requirement it fails.
4. Explain one more complex option and why it is premature.

## Official references

- [IAM best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [Policy evaluation logic](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html)
- [AWS KMS concepts](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html)
- [Secrets Manager and Parameter Store](https://docs.aws.amazon.com/secretsmanager/latest/userguide/secret-type-other.html)
