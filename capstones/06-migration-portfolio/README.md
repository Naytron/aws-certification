# Capstone 06: Migration and Modernization Portfolio

## Profile

| Field | Value |
| --- | --- |
| Level | 400 |
| Cost label | `DESIGN-ONLY` |
| Deployment | None required |
| SAP-C02 emphasis | Domains 1, 3, and 4 |
| Time box | 14-20 hours plus a 45-minute defense |

Migration appliances, replication fleets, Direct Connect, DMS, migration tools,
parallel environments, and target services can create cost. This capstone uses
synthetic inventory data and local planning artifacts.

## Scenario

An enterprise must exit a data center in 18 months. The synthetic portfolio has
120 applications, 900 servers, 95 databases, 2.4 PB of data, 40 commercial
licenses, and dependencies across ERP, identity, DNS, messaging, file services,
mainframe feeds, and partner links. The board expects early savings but will not
accept uncontrolled operational risk.

## Requirements

- Complete the exit within 18 months with measurable quarterly value.
- Establish multi-account governance, identity, network, DNS, logging, backup,
  security, and support before production scale-out.
- Classify every application with a reasoned 7R disposition: retire, retain,
  relocate, rehost, replatform, repurchase, or refactor.
- Group migration waves by validated dependency and business calendar.
- ERP cutover: outage below 2 hours and data loss below 5 minutes.
- Tier 1 migrations require rehearsal, rollback, data reconciliation, business
  validation, and a stabilization period.
- Preserve residency, retention, legal hold, encryption, and license terms.
- Do not make the exit depend on refactoring all workloads.
- Modernize where it reduces material risk/cost or enables required outcomes.
- Show three-year TCO including migration, parallel run, transfer, licenses,
  training, support, and decommission.
- Buy commitments only after post-migration demand becomes stable.

## Constraints

- Effective network throughput is 5 Gbps; daily change rate is 8 TB.
- 20% of owners dispute automated dependency data.
- Six databases use features unsupported by the preferred managed target.
- Four appliances have hardware-bound licensing.
- Two applications cannot move before a regulatory audit in month 12.
- Operations has container experience but limited Kubernetes administration.

## Synthetic portfolio

Create at least 20 representative rows covering:

- Tier 1 ERP and database;
- customer web/API system;
- Windows file/CAD workload;
- batch analytics;
- event-driven integration;
- commercial SaaS candidate;
- unsupported database;
- low-use application;
- hardware appliance;
- regulated archive;
- mainframe/partner dependency;
- development/test fleet.

Each row must include owner, business capability, tier, users, environment,
compute/OS, database, data size/change, protocols, dependencies, compliance,
RTO/RPO, utilization, license, current cost, deadline, proposed 7R, target,
wave, validation, rollback, and decommission condition.

## Work to perform

### 1. Assess

- Define discovery sources and confidence.
- Reconcile tool data with owners, traffic, CMDB, contracts, and finance.
- Build business and technical cases using AWS CAF perspectives.
- Identify readiness gaps and foundation backlog.
- Score migration value, urgency, complexity, dependency, and risk.

### 2. Mobilize

Design landing-zone, identity, network/DNS, security, observability, backup,
service management, FinOps, and migration-factory readiness. Define team RACI,
skills plan, tool access, data handling, change process, and evidence standards.
Run a low-risk pilot and feed lessons into the factory.

### 3. Choose migration and modernization patterns

For representative workloads compare:

- Application Migration Service-style rehost;
- DMS and schema conversion for homogeneous/heterogeneous database moves;
- DataSync, Transfer Family, online transfer, and Snow Family seed/delta needs;
- EBS, EFS, FSx families, S3, and Storage Gateway by access semantics;
- EC2, managed databases, ECS/Fargate, EKS, Lambda, and integration services;
- repurchase, retirement, relocation, and approved retain.

Selection must include compatibility, outage, throughput, consistency,
security, operations, skills, lock-in, cost, and rollback.

### 4. Build waves

Provide at least six waves:

1. foundation readiness;
2. migration-factory pilot;
3. low-risk production;
4. shared dependencies;
5. business-critical groups;
6. audit-delayed/residual workloads and exit.

For each wave define entry, freeze, pre-copy, delta, cutover, business
validation, technical validation, rollback, stabilization, decommission, owner,
communication, and metrics. A wave is not complete at traffic cutover.

### 5. Engineer ERP cutover and rollback

Name source of truth in every state. Quantify:

- full load duration and delta backlog;
- final change-capture lag;
- DNS/session/connection behavior;
- schema/object and row/business reconciliation;
- stop-write/fencing step;
- go/no-go thresholds;
- target-side write handling on rollback;
- RTO/RPO measurement;
- failback or no-return decision.

### 6. Model TCO and value

Include data center avoided cost, cloud resource and transfer cost, licenses,
support, security/observability, migration tools, parallel run, training,
engineering labor, decommission, and contingency. Show best/base/worst cases,
unit economics, and sensitivity to growth and schedule. Separate one-time from
recurring costs.

## Required deliverables

1. Executive migration case and measurable outcomes.
2. Portfolio inventory with at least 20 representative rows.
3. Dependency graph, confidence gaps, and owner validation record.
4. 7R decision matrix and target architecture decisions.
5. Foundation readiness backlog and migration-factory RACI.
6. Six or more wave plans with entry/exit and rollback gates.
7. ERP cutover, validation, rollback, and RTO/RPO evidence design.
8. Data transfer math and service selection analysis.
9. Security, compliance, licensing, and operations handoff.
10. Three-year TCO, benefit tracking, and commitment strategy.
11. At least four ADRs, portfolio risk register, and defense responses.
12. Decommission checklist and exit acceptance certificate.

## Validation and review criteria

- Every portfolio row has an owner, disposition rationale, dependency
  confidence, target, wave, rollback, and decommission condition.
- Wave order follows dependency closure and business constraints.
- Foundation gates block production scale if identity, network, logging, backup,
  security, or support is unready.
- Transfer calculations include effective throughput, change rate, overhead,
  seed lead time, and contention.
- ERP design can prove two-hour RTO and five-minute RPO.
- Rollback explains target-side writes; "point DNS back" is insufficient.
- Unsupported features and hardware licenses have explicit outcomes.
- Modernization is selected for value, not fashion or blanket policy.
- TCO includes parallel run and decommission and avoids premature commitments.
- Source retirement requires business, technical, audit, retention, and license
  evidence.

## Evidence

- Synthetic inventory and dependency confidence report.
- Owner review decisions and unresolved assumptions.
- Pilot and wave tabletop timestamps.
- Redacted migration, reconciliation, RTO/RPO, and rollback results.
- Cost model version and pricing date.
- ADR approvals, risk acceptance, stabilization sign-off, and decommission
  certificate.

Use no real customer data, hostnames, IP addresses, account IDs, licenses,
credentials, or private endpoints.

## Rubric

| Criterion | Weight |
| --- | ---: |
| Portfolio quality, ownership, and 7R reasoning | 15 |
| Dependencies, readiness, and factory design | 15 |
| Waves, gates, and business sequencing | 15 |
| Data/application transfer and target selection | 10 |
| Cutover, rollback, reconciliation, and RTO/RPO | 20 |
| Security, compliance, licensing, and operations | 10 |
| TCO, value, commitments, and decommission | 10 |
| ADRs, risks, and defense | 5 |

Score each 0-5. Pass at 80 or higher, with at least 3/5 in portfolio, waves,
cutover/rollback, and security. Missing target-write rollback or dependency
validation is an automatic rework.

## Defense questions

1. Why is one 7R strategy inappropriate for the whole portfolio?
2. Which discovery evidence is least trustworthy and how is it validated?
3. Why does the proposed first production wave have the lowest useful risk?
4. Show that transfer plus daily change can meet the cutover window.
5. What happens to writes accepted on the target if rollback is declared?
6. Why is the unsupported database not on the preferred managed target?
7. Which modernization is deferred until after exit, and why?
8. When exactly can each source and backup be decommissioned?
9. What cost remains if the data center exit slips six months?
10. Why are commitments delayed, and what baseline will trigger them?

## Cleanup

This capstone is design-only. Delete local scratch extracts that contain
unapproved data and retain only the sanitized synthetic portfolio and evidence.
No AWS cleanup is required.

If an instructor supplies a paid migration sandbox, use only synthetic data and
follow its reset process. Stop replication tasks first, remove target test
resources and snapshots, remove staged objects and versions, delete temporary
migration roles/policies and logs, verify both source/target Regions, and review
Billing. Delete exact named resources only; never use wildcard deletion.

## Official references

- [AWS migration process: assess, mobilize, migrate](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-migration/overview.html)
- [AWS Cloud Adoption Framework](https://aws.amazon.com/cloud-adoption-framework/)
- [AWS Migration Hub](https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html)
- [AWS Application Migration Service](https://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html)
- [AWS DMS](https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html)
- [AWS DataSync](https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html)
