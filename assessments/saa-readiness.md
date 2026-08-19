# SAA-C03 Readiness Review

This review converts practice into an evidence-based decision. Passing AWS requires a minimum scaled score of 720; practice percentages are not scaled scores and cannot guarantee an outcome.

## 1. Confirm exam mechanics

State closed-book:

- 65 total questions.
- 50 scored and 15 unscored, with unscored items unidentified.
- 130 minutes.
- Minimum scaled score 720.
- No penalty for guessing; unanswered questions are incorrect.
- Secure 30%, Resilient 26%, High-Performing 24%, Cost-Optimized 20% of scored content.

If any fact is wrong, revisit the [integration overview](../modules/300-saa-integration/README.md).

## 2. Audit evidence

Use the [scorecard](saa-scorecard.md). Every answer below must be yes:

1. Are two fresh 65-question timed scores at least 80%, 48 hours or more apart?
2. Is every domain at least 75% on both sets?
3. Were both sets closed-book and completed within 130 minutes?
4. Is unsupported-guess accuracy no more than 5%?
5. Are all repeated errors closed through delayed transfer?
6. Did both capstones score at least 80% with no critical failure?
7. Can the learner explain 9 of 10 sampled decisions and reject a plausible alternative?
8. Is all deployed infrastructure removed and cleanup evidence complete?

Any "no" means `NOT YET`.

## 3. Domain defense

Give a three-minute, notes-free response for each:

| Domain | Prompt | Pass condition |
| --- | --- | --- |
| Secure | Design identity, network, data, secrets, edge, and audit controls for a public three-tier app | Least privilege and trust paths are explicit; encryption is not used as a substitute for authorization |
| Resilient | Meet a stated AZ failure, RTO, and RPO while handling bursts | Failure scope, decoupling, data behavior, retries, and restore/failover test are defensible |
| High-performing | Select storage, compute, database, network, and ingestion for quantified demand | Access patterns and metrics drive choices; bottlenecks and scaling boundaries are named |
| Cost-optimized | Reduce cost without changing required SLOs | Idle waste, right-sizing, pricing model, storage lifecycle, and transfer paths are considered |

Fail if the response relies only on service names or cannot identify why a plausible alternative violates a requirement.

## 4. Capstone defense

For each associate capstone:

1. Draw request, data, trust, network, and failure boundaries from memory.
2. Explain three architecture decisions and three rejected alternatives.
3. Present observable validation, not screenshots of resource existence alone.
4. Diagnose the controlled failure using logs/metrics.
5. Prove tags, Region discipline, and complete cleanup.
6. Explain which production components were design-only because of Free-plan safety.

## 5. Error-pattern stop rules

Do not schedule while any condition is true:

- A domain is below 75%.
- The same `K`, `R`, `D`, or `A` rule fails twice.
- Timing causes blanks or more than 10% rushed errors.
- Multiple-response count errors recur.
- Correct guesses conceal a knowledge gap.
- A capstone has public data, broad credentials, missing alarms/logs, or unverified cleanup.
- Recent scores come from repeated or memorized sets.

Follow the [remediation guide](../modules/300-saa-integration/remediation.md), then collect new fresh evidence.

## 6. Final decision

`READY` requires all gates now, not historically. If evidence is older than six weeks, take one new fresh timed set and repeat domain defense. Schedule only after a rested review; do not use last-minute memorization to replace missing competency.

## Official references

- [SAA-C03 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html)
- [AWS Certification policies](https://aws.amazon.com/certification/policies/)
