# Must know: FinOps, Quotas, Commitments, and Portfolio Governance

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
| Stable compute baseline | Commit only after coverage/utilization and change-risk analysis | Commit to forecasted peak |
| Spiky or uncertain use | On-Demand/serverless or shorter flexibility with guardrails | Long inflexible commitment for speculative demand |
| Shared platform cost | Allocate by causal driver plus transparent unallocated remainder | Divide evenly regardless of consumption |
| DR capacity | Model quota, capacity, warm footprint, and event demand | Assume templates create capacity |
| Cost anomaly | Contain safely, identify owner/root cause, verify billing lag | Terminate resources blindly |

## Deep analysis

- FinOps is a collaborative operating model: inform, optimize, and operate. Finance, engineering, procurement, security, and product share decisions.
- Allocation needs accounts, cost categories, and governed tags. Some charges are shared or untaggable; publish a rule and confidence rather than fabricate precision.
- Unit cost (for example cost per successful order) separates useful growth from waste. Total cost alone can rise while efficiency improves.
- Commitment decisions use normalized steady usage, coverage, utilization, duration, payment, family/Region flexibility, migration plans, and downside scenarios.
- Rightsizing requires CPU, memory, network, storage, latency, queue, seasonality, and failover evidence. CPU alone is insufficient.
- Cost Optimization Hub, Cost Explorer, CUR/data exports, Budgets, and anomaly detection serve different decision/evidence needs; billing data is delayed.
- Quotas are Regional or global and some are adjustable. Build a quota register, headroom policy, lead time, alarm, growth test, and DR allocation.
- NAT Gateway, TGW processing, cross-AZ/Region transfer, logs, snapshots, idle IPs, and duplicated data often dominate costs missed by instance-only reviews.

## Failure and blast-radius checklist

- Name the smallest unit that can fail without affecting another workload.
- Distinguish data-plane continuity from control-plane changes during an incident.
- Identify correlated dependencies: shared identity, DNS, KMS, quotas, pipelines, and operators.
- State the recovery authority and the evidence required before failover or rollback.
- Quantify RTO and RPO per business transaction; "highly available" is not a target.
- Test degraded modes, not only total outages.
- Prevent a compromised workload identity from becoming an organization-wide principal.

## Exam traps

- Buying commitments to maximize theoretical discount before migration.
- Treating budgets as real-time hard caps.
- Allocating all shared cost by headcount.
- Rightsizing a resilient fleet below failover capacity.
- Discovering secondary-Region quotas during disaster recovery.

## Retrieval prompts

1. Which requirement drives the boundary, and which service is merely an implementation?
2. What is the largest credible correlated failure?
3. What must remain available if the AWS control plane or enterprise identity provider is impaired?
4. Which cost is fixed even at zero traffic?
5. What evidence proves the control works rather than merely exists?

## Official references

- [Cost Optimization Pillar](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html)
- [AWS Cost Management](https://docs.aws.amazon.com/cost-management/latest/userguide/what-is-costmanagement.html)
- [Savings Plans](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html)
- [Service Quotas](https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html)
- [Data Exports](https://docs.aws.amazon.com/cur/latest/userguide/what-is-data-exports.html)
