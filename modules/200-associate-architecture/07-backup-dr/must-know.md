# Must Know - Backup and Disaster Recovery

## Recovery strategy continuum

| Strategy | Cost/readiness | Typical decision |
| --- | --- | --- |
| Backup and restore | Lowest standing cost, longest RTO | Hours are acceptable |
| Pilot light | Core data/services ready, compute mostly off | Faster recovery with moderate standing cost |
| Warm standby | Scaled-down functional environment | Minutes-level RTO justifies ongoing cost |
| Multi-site active/active | Highest complexity and cost | Near-zero interruption plus conflict/consistency design |

RPO is maximum acceptable data loss measured in time. RTO is maximum acceptable restoration time. Both come from business impact and must include dependencies, not only a database.

## Controls and boundaries

- Replication can copy corruption or deletion; isolated, versioned, access-controlled backups address different threats.
- A backup is useful only when it can be found, decrypted, restored, and validated within the objective.
- Cross-Region copies improve Regional isolation; cross-account copies improve administrative isolation. Free-plan labs remain single-account and teach these as design-only.
- AWS Backup centralizes supported backup policies, vaults, copies, and restore testing. Never assume every resource type/Region/feature is supported.
- S3 Versioning preserves object versions; delete operations normally create delete markers. Lifecycle and replication behavior need deliberate configuration.
- Define DNS, credentials, secrets, certificates, quotas, infrastructure code, and data synchronization in the recovery runbook.

## Distractors

- Multi-AZ equals DR: it addresses zonal availability, not complete Regional continuity.
- Read replica equals immutable backup: replication is live and may carry bad changes.
- Snapshot created equals recovery tested: restore and application validation are missing.
- Lowest RPO always best: more frequent/cross-Region protection costs more and can add complexity.

## Official references

- [Disaster recovery options](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html)
- [AWS Backup concepts](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html)
- [S3 Versioning](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html)
