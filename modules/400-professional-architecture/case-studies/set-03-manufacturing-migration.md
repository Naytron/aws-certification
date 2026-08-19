# Case Study 3: Hybrid Manufacturing Migration

This is an original scenario, not a proprietary exam question.

## Business context

ForgeWorks operates 11 plants and two data centers. Its portfolio contains 420
virtual machines, 38 databases, 1.6 PB of engineering files, and a manufacturing
execution system (MES) that exchanges messages with programmable controllers.
Discovery found undocumented dependencies among MES, Active Directory, DNS,
license servers, file shares, and a SQL Server cluster. The primary data center
lease ends in 14 months.

## Requirements

- Vacate the primary data center within 14 months.
- Do not interrupt plant control. Local production must continue for four hours
  if cloud connectivity fails.
- ERP cutover outage must be below two hours and data loss below five minutes.
- Preserve Windows file locking, ACLs, and low-latency CAD access for designers.
- Retain regulated quality records for ten years with legal hold.
- Encrypt migration traffic and use temporary, least-privilege migration roles.
- Establish centralized identity, networking, logging, backup, and support
  before production waves.
- Demonstrate per-wave rollback, reconciliation, and business sign-off.
- Modernize where value and risk justify it; do not make the lease deadline
  depend on refactoring every application.
- Reduce three-year run cost without purchasing commitments before utilization
  stabilizes.

## Constraints

- Effective WAN throughput is 2 Gbps and the average daily file change rate is
  3 TB.
- One database uses unsupported extensions for the preferred managed target.
- Four appliances have hardware-bound licenses.
- Plant engineers have limited Kubernetes experience.
- The acquired company cannot renumber its overlapping network this quarter.

## Decision 1: Portfolio and waves

Choose one.

### A. Server-count waves

Sort virtual machines alphabetically into equal groups and migrate each group
with the same rehost procedure.

### B. Dependency-led portfolio plan

Validate discovery with owners, classify each workload using the 7Rs, establish
the foundation, migrate low-risk pilots, group waves by dependency and business
calendar, and give each wave entry, cutover, rollback, stabilization, and
decommission gates.

### C. Refactor first

Rewrite every application as microservices on EKS before moving any production
traffic.

### D. Database-only plan

Move all databases first and allow applications to continue calling them across
the WAN until each application eventually migrates.

## Decision 2: Data and application transfer

Choose one.

### A. One offline copy

Ship one encrypted appliance containing the 1.6 PB file estate, then cut over
months later without transferring changed files.

### B. Seed, synchronize, and validate by workload

Use an offline transfer option to seed very large cold and file datasets when
lead time supports it, then continuous DataSync-style delta transfer for
supported file workloads. Use DMS-style full load and change data capture for
supported databases, with schema conversion and validation where heterogeneous.
Select FSx/EFS/S3 targets from protocol and access semantics. Use Application
Migration Service for suitable server rehosts.

### C. Internet copy from each server

Let application owners run uncoordinated recursive copies over the public
internet using administrator credentials.

### D. Backup restore only

Restore every database from its most recent nightly backup and accept the
difference.

## Decision 3: Plant continuity and target platform

Choose one.

### A. Cloud-only synchronous control

Make controller acknowledgement depend synchronously on a service in one AWS
Region.

### B. Edge autonomy with hybrid recovery

Keep time-critical control and a bounded store-and-forward queue at each plant.
Use redundant hybrid paths for enterprise traffic, explicit DNS and route
failover, replay with idempotency, and cloud services for aggregation and
non-time-critical processing. Prefer managed compute or ECS for initial targets
unless a workload specifically requires Kubernetes APIs.

### C. EKS everywhere

Adopt EKS for every application because containers are the modernization goal.

### D. Single Direct Connect

Use one Direct Connect circuit and treat its dedicated nature as sufficient
availability.

## Required submission

- Portfolio inventory and 7R rationale for at least 12 representative workloads.
- Dependency graph and five migration waves.
- Transfer-window math, target service decision table, and licensing plan.
- ERP cutover/rollback runbook with RTO/RPO evidence.
- Plant disconnected-state model.
- ADR, risk register, and three-year cost categories.
- Defense answers:
  1. When can the source be decommissioned?
  2. How does target-side write activity change rollback?
