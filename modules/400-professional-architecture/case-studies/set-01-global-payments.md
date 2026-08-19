# Case Study 1: Global Payments Continuity

This is an original scenario, not a proprietary exam question.

## Business context

Northstar Payments processes card authorization requests for merchants in North
America and Europe. Its primary system runs in one AWS Region across three
Availability Zones. Stateless Java services run on ECS. Aurora PostgreSQL is the
transaction system of record. A legacy fraud engine in a colocation facility is
reached through one Direct Connect connection. Route 53 directs merchants to a
regional API endpoint.

The board approved European expansion after two incidents: a regional service
dependency prevented new authorizations for 74 minutes, and a fiber cut isolated
the fraud engine. The system currently handles 8,000 requests per second with a
three-times seasonal peak.

## Requirements

- Continue authorization if either AWS Region is unavailable.
- Achieve service RTO of 15 minutes and RPO of 1 minute.
- Never approve the same authorization twice.
- Keep EU cardholder data in approved EU Regions. Replicated operational
  metadata must be tokenized.
- Keep p99 API latency below 180 ms within each market.
- Preserve a complete, immutable audit trail for seven years.
- Recovery must not depend on the failed Region's control plane.
- Fraud scoring may operate in a documented degraded mode for up to 20 minutes,
  but the risk owner must approve entry.
- Run a recovery exercise each quarter and prove measured RTO/RPO.
- Minimize steady-state cost after all hard requirements are met.

## Constraints

- The application team can make targeted idempotency and data-partitioning
  changes but cannot rewrite the platform this year.
- Merchants cannot change endpoint URLs during an incident.
- The database team rejects uncontrolled multi-writer conflict resolution for
  monetary records.
- Security requires customer-managed keys and separation between security
  evidence administrators and workload operators.

## Decision 1: Regional continuity

Choose one.

### A. Backup and restore

Copy nightly Aurora snapshots and container images to the secondary Region.
Restore after an incident and change DNS.

### B. Warm standby with market ownership

Maintain scaled-down application capacity in a second approved Region. Assign
each market a single writable database home, replicate required tokenized data,
pre-provision independent deployment and recovery roles, and use Route 53 health
and an operator-approved failover runbook. Use globally unique idempotency keys
and a durable authorization ledger. Scale before shifting traffic.

### C. Uncontrolled active-active writers

Run both Regions at full capacity and allow either database to update any
authorization. Resolve collisions by last-writer-wins timestamp.

### D. Multi-AZ only

Add more ECS tasks and another Aurora reader in the existing Region. Rely on the
service SLA rather than building regional recovery.

## Decision 2: Hybrid fraud dependency

Choose one.

### A. One larger Direct Connect connection

Replace the existing circuit with a higher-capacity circuit at the same
location.

### B. Resilient hybrid paths and controlled degradation

Use diverse connectivity terminating at separate locations and devices, with
Site-to-Site VPN as an independently tested backup where appropriate. Add
health-based routing, explicit prefixes, encryption requirements, and an
approved degraded fraud policy with a circuit-breaker. Measure failover time.

### C. Public static credentials

Expose the fraud service to the internet and put a long-lived access key in each
task to reduce routing complexity.

### D. Synchronous queue

Insert SQS but make the authorization request wait until a consumer returns a
fraud result to the same message.

## Decision 3: Recovery evidence

Select the two actions that together provide the strongest evidence.

### A. Inspect replication dashboards

Record a screenshot showing healthy replication.

### B. Quarterly controlled failover

Exercise loss of the primary request path, measure last acknowledged source
write versus recovered target write, measure customer restoration time, and
test failback/reconciliation.

### C. Review the architecture diagram

Ask the architect to reconfirm that the design has no single points of failure.

### D. Synthetic authorization and immutable evidence

Continuously run non-sensitive synthetic transactions from both markets. Archive
redacted test results, control changes, recovery timestamps, and audit evidence
to a separately administered, retention-controlled store.

### E. Increase DNS TTL

Raise TTL to one day so resolver behavior is more predictable.

## Required submission

- Requirement ledger and selected answers.
- Data authority diagram for normal, degraded, failover, and failback states.
- RTO/RPO measurement method.
- ADR comparing warm standby and multi-site.
- Five-entry risk register with owner, trigger, mitigation, and residual risk.
- Answers to both defense questions:
  1. How is duplicate approval prevented across retry and failover boundaries?
  2. What proves the recovery plan can operate while the primary control plane
     is unavailable?
