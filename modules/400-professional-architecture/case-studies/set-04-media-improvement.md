# Case Study 4: Media Platform Continuous Improvement

This is an original scenario, not a proprietary exam question.

## Business context

StreamWave delivers live and on-demand video. An existing single-account
platform uses EC2 Auto Scaling, an Application Load Balancer, self-managed
Kafka, ElastiCache, S3, CloudFront, and a large provisioned relational database.
Deployments are manual. A viral event caused throttling, cache stampedes, and a
database connection storm. Operators increased instance sizes, but monthly cost
rose 65% while p99 startup latency remains 4.2 seconds.

Security found long-lived keys in build servers, inconsistent patching, broad
administrator roles, and logs retained for only seven days. The product has a
99.95% monthly availability SLO but alerts mostly report CPU utilization.

## Requirements

- Improve startup p99 to below 2 seconds at a tested 10x normal audience.
- Meet 99.95% SLO and recover from an AZ loss without operator intervention.
- Preserve live-event ordering within each channel and tolerate consumer replay.
- Remove long-lived build credentials and establish traceable least privilege.
- Retain security audit evidence for one year and application telemetry for 30
  days, with controlled access and cost management.
- Make deployments repeatable, progressive, and reversible.
- Cut cost per streamed hour by 25% within six months without reducing SLO.
- Avoid a risky full rewrite during the next two major events.
- Show improvement with before/after evidence and game-day results.

## Constraints

- The operations team can manage the current Kafka platform for six months but
  wants a managed-service evaluation.
- A legacy encoder cannot yet run on Graviton.
- Traffic is highly seasonal and commitments must not cover event peaks.
- Database schema changes have historically been irreversible.

## Decision 1: Improvement method

Choose one.

### A. Replace everything

Rewrite all services, databases, and streaming components simultaneously before
the next event.

### B. Measured, risk-ranked improvement loop

Define service-level indicators, instrument request and dependency traces,
reproduce the load, identify limiting constraints, release reversible changes
through canaries, run AZ and dependency game days, and compare cost and SLO
evidence with the baseline.

### C. Scale every resource

Double all instance and database sizes and buy three-year commitments for the
new peak.

### D. Add dashboards

Create a dashboard for every available metric but keep manual deployment and
existing ownership.

## Decision 2: Performance and reliability

Choose one.

### A. Layered remediation

Protect origins with CloudFront and cache policies matched to content semantics;
prevent stampedes with request coalescing, jittered expiry, and bounded
concurrency; decouple eligible work; pool and cap database connections; test
read scaling and data access patterns; preserve per-channel partition keys and
idempotent consumers; verify Multi-AZ behavior and quotas at 10x load.

### B. Cache all responses for one day

Ignore content mutability and authorization context to maximize hit rate.

### C. One large database

Move all processing into stored procedures on a larger single-AZ database.

### D. Random streaming partitions

Assign every event to a random partition for maximum distribution and infer
ordering from timestamps later.

## Decision 3: Security, deployment, and cost

Choose one.

### A. Automated identity and progressive delivery

Use short-lived workload federation for CI/CD, scoped deployment roles,
versioned IaC, artifact integrity controls, expand-and-contract schema changes,
canary/blue-green gates, automatic rollback on SLO signals, centralized
retention, and cost allocation by workload and streamed-hour unit.

### B. Shared administrator key

Store one administrator access key in the CI system and rotate it annually.

### C. In-place deployment

Replace every task at once and restore from database backup if application
validation fails.

### D. Peak commitment

Purchase commitments for 100% of expected event peak before collecting a stable
post-improvement baseline.

## Required submission

- Baseline and target SLO/SLI sheet.
- 10x load-test design and bottleneck hypothesis tree.
- Telemetry contract, remediation backlog, and deployment state machine.
- AZ-loss and cache-failure game-day evidence.
- Security remediation plan, ADR, risk register, and unit-cost model.
- Defense answers:
  1. Why is average CPU insufficient evidence?
  2. How can a database schema change remain rollback-compatible?
