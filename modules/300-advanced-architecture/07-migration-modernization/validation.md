# Validation: Migration Assessment, Waves, and Modernization

## Artifact completeness

- [ ] Portfolio includes disposition rationale and evidence confidence.
- [ ] Dependency graph covers technical, organizational, contractual, and data links.
- [ ] Wave plan defines foundation/pilot and production entry/exit gates.
- [ ] Cutover names authority, lag, validation, rollback deadline, and reconciliation.
- [ ] Decommission checklist includes data, license, monitoring, CMDB, and cost.
- [ ] Modernization ADR avoids service-first reasoning.

## Level 400 quality gates

- [ ] Every hard requirement traces to a decision and testable evidence.
- [ ] The diagram distinguishes trust, administrative, network, data, and failure boundaries.
- [ ] RTO and RPO are numeric where continuity matters; dependencies fit within them.
- [ ] The blast radius of a bad deployment, compromised identity, quota exhaustion, and operator error is stated.
- [ ] Steady-state and failure-state operations have named owners and escalation paths.
- [ ] Fixed, variable, transfer, logging, licensing, and staffing costs are considered.
- [ ] Compliance assertions map to evidence, retention, and exception handling.
- [ ] The rollback or exit path is executable and has a decision deadline.

## Oral defense

Without notes, answer:

1. What business requirement caused the most consequential boundary?
2. Which shared dependency can invalidate the design's availability claim?
3. What happens when automation is wrong?
4. Which quota or rate limit fails first at 10x demand?
5. Which control creates the strongest evidence for an auditor?
6. Which alternative becomes correct if the primary constraint changes?

## Pass standard

Pass only with all artifact gates complete, no unowned critical risk, and at least 80% on the quiz. Rework any answer justified only by "AWS best practice" without a scenario-specific requirement.
