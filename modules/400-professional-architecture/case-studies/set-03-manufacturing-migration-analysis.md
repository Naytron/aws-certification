# Case Study 3 Deep Analysis

Open this file only after completing
[the scenario](set-03-manufacturing-migration.md).

## Requirement hierarchy

Plant safety and continuity, the 14-month deadline, ERP RTO/RPO, file semantics,
retention, and security are hard constraints. Modernization and cost follow.
The target foundation must precede production migration. Hidden dependencies and
overlap make bulk server movement unsafe.

## Decision 1 answer: B

Dependency-led waves preserve business services, not just machine groups.
Discovery data is evidence to validate, not truth to accept blindly. The 7R
decision can differ by component: retire an unused report server, repurchase a
commodity package, relocate a hardware-bound appliance, rehost a deadline-bound
server, replatform a supported database, and refactor a high-value decoupling
candidate later.

A practical sequence is:

1. Landing-zone, identity, network, DNS, logging, backup, security, and support
   readiness.
2. Low-risk non-production pilot to prove factory tooling.
3. Shared services with protected coexistence.
4. Application waves grouped around dependency closures.
5. ERP and critical databases after rehearsal.
6. Residual hardware relocations or approved retains, then decommission.

### Explicit distractor rejection

- **A ignores dependencies and business calendars.** Equal server count does not
  equal equal risk or a usable application.
- **C makes the lease deadline depend on maximum change** and adds Kubernetes
  operations beyond current skills.
- **D adds WAN latency and outage coupling** and can create expensive,
  long-lived hybrid hairpin traffic.

## Decision 2 answer: B

No single transfer mechanism fits 1.6 PB, changing files, databases, and servers.
A seed reduces initial network demand; delta synchronization closes the change
gap. The 3 TB daily change rate alone requires about 278 Mbps sustained before
protocol and contention overhead, so the effective 2 Gbps link can handle deltas
only if other traffic, transfer windows, and throttling are modeled. Copying 1.6
PB at a theoretical continuous 2 Gbps would take roughly 74 days before overhead,
making a seed attractive.

File targets must preserve actual semantics. Windows CAD shares may require an
FSx option that supports needed SMB behavior, ACLs, locking, performance, and
integration. Object archives can use S3 retention and legal-hold capabilities
where application semantics permit. DMS-like continuous replication can support
the five-minute database RPO, but unsupported objects, data types, large objects,
triggers, and validation require explicit testing. The unsupported-extension
database may remain self-managed, replatform differently, or be refactored after
the deadline.

### Explicit distractor rejection

- **A has no delta plan.** Months of changes would be absent at cutover.
- **C violates encryption and least privilege, lacks consistency coordination,
  and competes unpredictably with plant traffic.**
- **D misses the five-minute ERP RPO** because nightly recovery can lose almost
  a day and does not prove a two-hour cutover.

## Decision 3 answer: B

Local control must continue through a four-hour cloud disconnect, so the control
loop and bounded operational state stay at the plant. Store-and-forward needs
capacity for the disconnect target, durable ordering rules where needed,
idempotent replay, poison-record handling, and data-age alarms. Diverse network
paths, tested routing/DNS convergence, and encryption protect non-local flows.
Managed compute or ECS reduces operational burden unless portability or
Kubernetes-specific control is a real requirement.

### Explicit distractor rejection

- **A directly violates four-hour disconnected operation.**
- **C is service-first reasoning** and conflicts with limited Kubernetes skill;
  containers do not require EKS.
- **D is a single circuit and location failure domain.** Dedicated connectivity
  does not mean redundant connectivity.

## ERP rollback and data authority

Before cutover: lower DNS TTL where DNS is used, freeze incompatible changes,
verify replication lag, reconcile row counts and checksums, test authentication,
and obtain business approval. At cutover: stop or fence source writes, drain
transactions, apply final changes, verify target state, change routing, and run
business transactions. Roll back if validation, error rate, latency, or
reconciliation crosses an approved threshold.

If the target accepted writes, simply pointing back loses those changes. The
plan needs reverse replication proven in advance, a temporary dual-write design
with defined semantics, or a business reconciliation/import procedure. The
source is decommissioned only after stabilization, owner sign-off, retention and
audit evidence, dependency monitoring, backup validation, license release, and
an approved no-return point.

## Cross-domain analysis

- **Security:** temporary migration roles, encryption, chain of custody,
  immutable quality records, and source credential removal.
- **Reliability:** local autonomy, diverse links, target backup, quota checks,
  and wave rollback.
- **Performance:** CAD latency and file semantics, ERP database latency, transfer
  throttles, and disconnected queue capacity.
- **Operations:** migration factory, runbooks, owner validation, monitoring, and
  support handoff.
- **Cost:** parallel run, transfer, appliances, licenses, managed services,
  training, data center exit, and delayed commitments.
- **Organization:** plant safety authority, application owner sign-off, platform
  foundation ownership, and vendor coordination.
- **Migration:** 7R per workload, dependency waves, stabilization, and
  decommission.

## Example ADR

- **Decision:** Use dependency-led waves and separate deadline migration from
  later modernization.
- **Drivers:** lease end, hidden dependencies, plant continuity, limited skills.
- **Consequences:** temporary heterogeneous targets and disciplined portfolio
  governance; faster risk reduction.
- **Rejected:** refactor-all exceeds schedule and operational capacity.
- **Review trigger:** a workload's risk/value makes modernization necessary
  before migration.

## Example risks

| Risk | Trigger | Mitigation | Owner | Residual |
| --- | --- | --- | --- | --- |
| Hidden dependency | Unexpected blocked flow | Discovery plus owner validation and pilot | App owner | Rare batch dependency |
| Delta exceeds link | Backlog grows | Seed, QoS/throttle, extra window/path | Network | Peak contention |
| Unsupported DB object | Validation mismatch | Compatibility test and alternate target | DB owner | Self-managed burden |
| Target rollback loses writes | Target receives production writes | Reverse sync or reconciliation plan | Business/data owner | Manual reconciliation |
| Plant queue fills | Disconnect nears capacity | Local sizing, alarm, safe operating mode | Plant operations | Extended carrier outage |
