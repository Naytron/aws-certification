# Databases

## Level and exam mapping

- Level: 100
- SAA-C03 domains: Design Resilient Architectures; Design High-Performing Architectures; Design Cost-Optimized Architectures
- Cost label: `FREE-PLAN SAFE`

Choose relational or key-value data services from access patterns, consistency, scaling, and recovery requirements.

## Outcomes

After this module, you can:

1. Choose RDS/Aurora or DynamoDB from data and access patterns.
2. Separate Multi-AZ availability from read scaling and backups.
3. Design DynamoDB keys to serve known queries without scans.
4. Explain consistency, capacity mode, indexes, and hot-partition risks.

## Prerequisites

- Completed IAM module
- DynamoDB permissions
- Small synthetic data only

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

- [Amazon RDS concepts](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)
- [RDS Multi-AZ deployments](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html)
- [DynamoDB core components](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html)
- [DynamoDB read consistency](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html)
