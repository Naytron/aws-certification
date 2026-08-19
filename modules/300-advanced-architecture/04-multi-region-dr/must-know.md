# Must know: Multi-Region Architecture and Disaster Recovery

## Decision frame

For every design, separate:

1. **Business objective** - the outcome and tolerated loss, not a preferred service.
2. **Hard constraints** - legal boundary, RTO/RPO, identity authority, data residency, and migration window.
3. **Failure domains** - account, Availability Zone, Region, identity provider, network, control plane, and operator.
4. **Trust boundaries** - who authenticates, who authorizes, who can assume or delegate, and where credentials exist.
5. **Operations** - owner, telemetry, runbook, escalation, test cadence, and rollback authority.
6. **Economics** - fixed baseline, variable usage, data processing/transfer, licenses, commitments, and people cost.

## Decision table

| Signal | Prefer | Reject or challenge |
| --- | --- | --- |
| RTO in days, low change rate | Backup/restore with verified cross-boundary copies | Idle full duplicate stack |
| RTO in hours | Pilot light plus automated infrastructure/data recovery | Manual undocumented rebuild |
| RTO in minutes with predictable load | Warm standby sized and tested for scale-up | Unproven cold capacity |
| Near-zero RTO/RPO | Active-active only with conflict-safe data and operations | Dual writers without conflict semantics |
| Compliance isolation | Independent recovery account/Region, keys, evidence, and access | Backups controlled by compromised workload role |

## Deep analysis

- RTO is elapsed time to restore the business capability; RPO is tolerated data loss measured from the incident. Detection and decision time consume RTO.
- Define objectives per transaction and dependency. A frontend cannot meet a 15-minute RTO if identity, DNS, keys, data, or quotas take hours.
- Availability within a Region and disaster recovery across Regions address different failures; neither removes application-level defects or bad data.
- Asynchronous replication creates a nonzero RPO and possible lag under stress. Multi-writer systems require conflict ownership, idempotency, ordering, and reconciliation.
- Failover changes authority. Prevent split brain with fencing/leases or a single declared writer and prove old-writer isolation before promotion.
- Failback is a migration: reconcile divergent data, restore replication, validate, shift traffic gradually, and preserve rollback.
- AWS control planes and quotas may be impaired or insufficient during a regional event. Pre-provision critical capacity, artifacts, IAM, keys, and observability.
- Persistent multi-Region databases and full standby fleets are optional paid/sandbox only; use calculations and game simulation in this module.

## Failure and blast-radius checklist

- Name the smallest unit that can fail without affecting another workload.
- Distinguish data-plane continuity from control-plane changes during an incident.
- Identify correlated dependencies: shared identity, DNS, KMS, quotas, pipelines, and operators.
- State the recovery authority and the evidence required before failover or rollback.
- Quantify RTO and RPO per business transaction; "highly available" is not a target.
- Test degraded modes, not only total outages.
- Prevent a compromised workload identity from becoming an organization-wide principal.

## Exam traps

- Equating cross-Region replication with backup against deletion or corruption.
- Claiming zero RPO with asynchronous replication.
- Failing over compute while identity, KMS, DNS, or artifacts remain single-Region.
- Using DNS TTL as the entire RTO.
- Testing failover but never reconciliation or failback.

## Retrieval prompts

1. Which requirement drives the boundary, and which service is merely an implementation?
2. What is the largest credible correlated failure?
3. What must remain available if the AWS control plane or enterprise identity provider is impaired?
4. Which cost is fixed even at zero traffic?
5. What evidence proves the control works rather than merely exists?

## Official references

- [Disaster recovery of workloads on AWS](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html)
- [Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html)
- [Route 53 failover routing](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-failover.html)
- [AWS Backup security](https://docs.aws.amazon.com/aws-backup/latest/devguide/security.html)
- [ARC readiness checks](https://docs.aws.amazon.com/r53recovery/latest/dg/readiness-checks.html)
