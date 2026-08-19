# Storage

## Level and exam mapping

- Level: 100
- SAA-C03 domains: All SAA-C03 domains
- Cost label: `FREE-PLAN SAFE`

Choose object, block, and file storage by access pattern, durability, sharing, lifecycle, and recovery requirements.

## Outcomes

After this module, you can:

1. Choose S3, EBS, or EFS from protocol and sharing requirements.
2. Secure S3 with Block Public Access, policy, encryption, and versioning.
3. Use lifecycle rules without confusing storage transition with backup.
4. Explain durability, availability, replication, and recovery as separate properties.

## Prerequisites

- Completed IAM module
- S3 permissions
- A globally unique naming convention

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

- [Amazon S3 data protection](https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html)
- [S3 Block Public Access](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html)
- [S3 lifecycle](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html)
- [Amazon EFS](https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html)
