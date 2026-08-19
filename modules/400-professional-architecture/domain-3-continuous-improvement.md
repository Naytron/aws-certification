# Domain 3: Continuous Improvement for Existing Solutions

**Weight: 25% of scored content**

## What must be integrated

The official tasks cover operational excellence, security, performance,
reliability, and cost. Improvement starts with a measured baseline and an
ordered remediation backlog, not a wholesale rewrite.

## Improvement loop

1. Define business SLOs and technical indicators.
2. Establish workload, dependency, cost, and risk baselines.
3. Find the limiting constraint and highest exposure.
4. Design the smallest reversible remediation.
5. Test performance, failure, security, rollback, and cost hypotheses.
6. Release through controlled automation.
7. Compare results with baseline and retain evidence.
8. Update runbooks, ownership, and the next risk-ranked action.

## Decision rules

- Alert on customer or SLO impact and actionable leading indicators; dashboards
  without ownership do not improve operations.
- Centralize telemetry while preserving account, Region, workload, and data
  sensitivity context.
- Automate repetitive, deterministic, high-frequency actions first. Require
  approval for ambiguous or high-blast-radius remediation.
- Rotate and retrieve secrets through managed mechanisms; remove embedded and
  long-lived credentials.
- Patch by risk and fleet, with canaries, maintenance windows, rollback, and
  compliance evidence.
- Identify bottlenecks with measurements before resizing or adding caches.
- Remove single points of failure and test recovery rather than inferring it
  from a diagram.
- Optimize unit cost after demand, utilization, commitments, and transfer are
  visible. Commit only to a stable baseline.

## Common traps

- More logs with no retention, query, owner, or alarm plan.
- Automatic remediation that can amplify an incident.
- Rightsizing from average utilization while ignoring peaks and memory.
- Buying commitments before modernization or migration changes the baseline.
- Declaring DR complete because replication is healthy.
- Changing every layer at once, destroying attribution and rollback.
- Treating an SLA as the workload's measured SLO.

## Practice artifacts

Create an SLO sheet, telemetry contract, operations RACI, prioritized
remediation backlog, security findings plan, load-test comparison, game-day
report, cost unit model, ADR, and residual-risk register.

## Official references

- [Official Domain 3 outline](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02-domain3.html)
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
- [CloudWatch documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html)
