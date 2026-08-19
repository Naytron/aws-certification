# SAP-C02 Readiness Review

This is a go/no-go assessment, not encouragement based on course completion.
Complete it after [the SAP scorecard](sap-scorecard.md).

## Experience caveat

The official SAP-C02 guide describes a target candidate with two or more years
of experience using AWS services to design and implement cloud solutions and
providing guidance across multiple applications and projects in a complex
organization. Design-only exercises, labs, and high practice scores are useful
evidence of learning, but they do not substitute for production accountability,
incidents, migrations, cost ownership, or stakeholder decisions.

If that experience is absent, the honest result is `Developing experience`.
Seek supervised architecture work, implementation, operations, recovery
exercises, and reviews before treating certification preparation as complete.

## Evidence freshness

All score evidence must be from the last eight weeks. At least one capstone
defense and one full timed set must be from the last two weeks. A memorized set
does not count.

## Go/no-go gates

### Gate 1: Exam execution

- [ ] Can state: 75 total, 65 scored, 10 unscored, 180 minutes, minimum scaled
  score 750.
- [ ] Knows unscored items are not identified.
- [ ] Knows unanswered items are incorrect and there is no penalty for guessing.
- [ ] Completed two qualifying sets in <=170 minutes with no blank responses.
- [ ] Uses a tested three-pass plan and reaches checkpoints without rushing the
  final 15 questions.

### Gate 2: Decision quality

- [ ] Extracts hard constraints, priority, current state, target state, and
  evidence before choosing services.
- [ ] Tests security, reliability, performance, operations, cost, organization,
  and migration consequences.
- [ ] Rejects alternatives using an exact requirement or unnecessary burden.
- [ ] Explains normal, degraded, recovery/cutover, and rollback/failback states.
- [ ] Distinguishes technically possible from operationally supportable.

### Gate 3: Domain evidence

- [ ] Domain 1: governance, effective permissions, hybrid/transit networking,
  resilience, and cost allocation.
- [ ] Domain 2: deployment/rollback, continuity, security, reliability,
  performance, and cost.
- [ ] Domain 3: measured baselines, observability, remediation, failure testing,
  security improvement, and unit economics.
- [ ] Domain 4: discovery, 7Rs, target selection, waves, synchronization,
  rollback, modernization, and decommission.
- [ ] Latest two fresh sets have no domain below 75%.

### Gate 4: Professional artifacts

- [ ] ADRs state context, decision, alternatives, consequences, owner, and
  review trigger.
- [ ] Risk registers state likelihood, impact, trigger, mitigation, owner, and
  residual risk.
- [ ] Migration waves include entry, cutover, validation, rollback,
  stabilization, and exit gates.
- [ ] RTO/RPO evidence measures customer restoration and durable data loss, not
  only replication health.
- [ ] Cost models include transfer, logging, licensing, parallel run, support,
  and engineering labor where applicable.
- [ ] Architecture defense answers challenge questions directly and admits
  assumptions and residual risks.

### Gate 5: Capstones and scores

- [ ] Capstones 03-07 meet every local rubric gate.
- [ ] Four fresh case studies are complete with separate answer review.
- [ ] Latest three qualifying practice scores are >=80%.
- [ ] The objective [SAP scorecard](sap-scorecard.md) has no unchecked gate.
- [ ] Recurring misses have been closed on different scenarios.

### Gate 6: Experience

- [ ] The learner can describe recent personal decisions and outcomes in
  multi-account/identity, networking, security, recovery, performance/cost,
  migration, and operations.
- [ ] At least one experienced reviewer has challenged the learner's evidence.
- [ ] Examples distinguish personal contribution from team contribution.
- [ ] Experience is consistent with the official target-candidate description,
  or the learner records `Developing experience`.

## Result

Choose exactly one.

### Ready

Every gate is true. Evidence is fresh, practice performance is stable, the board
defense passed, and experience is appropriate. Schedule only after rechecking
the official exam page for current appointment details.

### Nearly ready

No more than two non-experience items are incomplete, neither is a domain floor,
timing, capstone, or hard-requirement failure. Record a dated remediation and
fresh reassessment.

### Developing experience

Knowledge and simulations may be strong, but production design/implementation
experience does not yet match the official target. Continue supervised work and
periodic practice; do not misrepresent labs as production.

### Not ready

Any score floor, blank-answer/timing, domain, capstone, decision-quality, or
artifact gate is unmet. Return to the relevant module and reattempt a fresh
scenario.

## Review record

- Result:
- Reviewer:
- Date:
- Evidence links:
- Unmet gates:
- Remediation owner and date:
- Next fresh assessment date:

## Official references

- [SAP-C02 exam guide and target candidate](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.html)
- [AWS Certification preparation](https://aws.amazon.com/certification/certification-prep/)
