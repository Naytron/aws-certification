# AWS Global Infrastructure and Well-Architected

## Level and exam mapping

- Level: 100
- SAA-C03 domains: All SAA-C03 domains
- Cost label: `FREE-PLAN SAFE`

Choose Regions and Availability Zones (AZs), identify service scope, and use Well-Architected tradeoffs rather than slogans.

## Outcomes

After this module, you can:

1. Distinguish global, Regional, and AZ-scoped resources.
2. Choose a Region from compliance, latency, service, resilience, and cost requirements.
3. Use multiple AZs for failure isolation without confusing them with Regions.
4. Apply the six Well-Architected pillars to a small design.

## Prerequisites

- Phase 0 account baseline
- CloudShell access
- A recorded home Region

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

- [AWS Global Infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/)
- [Regions and Zones](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
