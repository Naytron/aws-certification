# VPC Networking and DNS

## Level and exam mapping

- Level: 100
- SAA-C03 domains: Design Secure Architectures; Design Resilient Architectures; Design High-Performing Architectures
- Cost label: `FREE-PLAN SAFE`

Design subnets, routes, and traffic controls from explicit connectivity and isolation requirements.

## Outcomes

After this module, you can:

1. Explain VPC, subnet, route table, security group, and network ACL boundaries.
2. Design public and private routing without treating a subnet name as a control.
3. Distinguish stateful security groups from stateless network ACLs.
4. Choose Route 53 routing behavior from availability and traffic requirements.

## Prerequisites

- Completed global infrastructure and IAM modules
- VPC permissions
- No overlapping lab CIDRs

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

- [What is Amazon VPC?](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [VPC route tables](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html)
- [Security groups and network ACLs](https://docs.aws.amazon.com/vpc/latest/userguide/infrastructure-security.html)
- [Route 53 routing policies](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html)
