# Must know: Migration Assessment, Waves, and Modernization

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
| Hard deadline, low change tolerance | Rehost/replatform first; modernize after stabilization | Full rewrite during data-center exit |
| Unsupported or no business value | Retire or retain by evidence | Migrate every discovered server |
| Tightly coupled system | Move dependency group or introduce tested decoupling | Wave by org chart |
| Low-downtime database move | CDC plus validation and rehearsed cutover | One untested bulk export |
| Purpose-built replacement has business case | Repurchase with process/data migration and exit plan | Service substitution without organizational change |

## Deep analysis

- The 7Rs are portfolio dispositions: retire, retain, rehost, relocate, repurchase, replatform, refactor. The right answer can differ by dependency and migration phase.
- Discovery combines telemetry, configuration, interviews, contracts, data sensitivity, business criticality, and dependency observation. An inventory without owners is not actionable.
- Build landing-zone, identity, connectivity, logging, backup, quota, and support foundations before production waves.
- Wave by dependency closure, business calendar, risk, and support readiness. A low-risk pilot should test the end-to-end factory, not only technology.
- A cutover plan needs freeze, sync, validation, decision deadline, rollback trigger, DNS/client cache behavior, business reconciliation, and communication.
- CDC reduces downtime but introduces lag, schema-change, ordering, and dual-write risks. Define the final authority and do not leave migration replication indefinitely.
- Decommissioning requires owner sign-off, retention/export, license/contract closure, monitoring removal, CMDB update, and cost verification.
- Modernization changes architecture and operating model. Use measurable hypotheses and avoid forcing EKS when simpler managed/serverless patterns meet requirements.

## Failure and blast-radius checklist

- Name the smallest unit that can fail without affecting another workload.
- Distinguish data-plane continuity from control-plane changes during an incident.
- Identify correlated dependencies: shared identity, DNS, KMS, quotas, pipelines, and operators.
- State the recovery authority and the evidence required before failover or rollback.
- Quantify RTO and RPO per business transaction; "highly available" is not a target.
- Test degraded modes, not only total outages.
- Prevent a compromised workload identity from becoming an organization-wide principal.

## Exam traps

- Selecting a migration service before discovering dependencies.
- Rewriting a critical system during a fixed data-center exit without a rollback path.
- Calling a server moved when data, DNS, monitoring, backup, and operators are not ready.
- Leaving source systems running indefinitely after cutover.
- Treating EKS as modernization regardless of team capability.

## Retrieval prompts

1. Which requirement drives the boundary, and which service is merely an implementation?
2. What is the largest credible correlated failure?
3. What must remain available if the AWS control plane or enterprise identity provider is impaired?
4. Which cost is fixed even at zero traffic?
5. What evidence proves the control works rather than merely exists?

## Official references

- [AWS migration strategies](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html)
- [Migration portfolio assessment](https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-portfolio-assessment-guide/welcome.html)
- [Application Migration Service](https://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html)
- [Database Migration Service](https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html)
- [DataSync concepts](https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html)
