# Must know: Enterprise Observability, Incident Response, and Resilience Testing

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
| Customer reliability objective | Journey SLI/SLO and error budget | Infrastructure uptime dashboard alone |
| Security audit trail | Organization-wide trails/log archive with immutable controls and access separation | Logs writable by workload administrators |
| High-cardinality exploration | Structured logs/traces with controlled dimensions and query tiering | Unbounded custom metric dimensions |
| Known reversible response | Pre-authorized automation with scope, guardrail, and rollback | Universal self-healing administrator |
| Unknown/high-impact incident | Human incident command with evidence-preserving actions | Destructive automation based on one alarm |

## Deep analysis

- Monitoring asks whether known conditions are healthy; observability supports explaining novel states from emitted evidence. Both require an explicit telemetry contract.
- An SLI measures user-relevant behavior; an SLO sets the target. Error budgets govern release/risk decisions, not merely reporting.
- Central collection must survive workload-account compromise. Separate log archive, security tooling, KMS administration, retention, and query access.
- Cardinality is a cost and reliability dimension. Put request IDs and tenant IDs in logs/traces; reserve metrics for bounded dimensions and aggregations.
- Alerts should be actionable, owned, severity-routed, deduplicated, and tied to a runbook. Optimize time to useful detection, not alarm count.
- Automation needs a bounded blast radius, idempotency, dry run, stop conditions, audit, and manual override.
- Fault injection begins with a hypothesis, steady-state metric, smallest blast radius, abort threshold, and recovery validation. Never run an unbounded experiment in production.
- OpenSearch can incur persistent cost and is design-only here; local log queries or CloudWatch Logs Insights syntax review are cost-safe substitutes.

## Failure and blast-radius checklist

- Name the smallest unit that can fail without affecting another workload.
- Distinguish data-plane continuity from control-plane changes during an incident.
- Identify correlated dependencies: shared identity, DNS, KMS, quotas, pipelines, and operators.
- State the recovery authority and the evidence required before failover or rollback.
- Quantify RTO and RPO per business transaction; "highly available" is not a target.
- Test degraded modes, not only total outages.
- Prevent a compromised workload identity from becoming an organization-wide principal.

## Exam traps

- Alerting on CPU without a customer-impact or saturation hypothesis.
- Using averages that hide tail latency and tenant-specific failures.
- Allowing the compromised workload account to delete its audit history.
- Calling a dashboard an incident-response plan.
- Running fault injection without an abort signal independent of the system under test.

## Retrieval prompts

1. Which requirement drives the boundary, and which service is merely an implementation?
2. What is the largest credible correlated failure?
3. What must remain available if the AWS control plane or enterprise identity provider is impaired?
4. Which cost is fixed even at zero traffic?
5. What evidence proves the control works rather than merely exists?

## Official references

- [CloudWatch Observability](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html)
- [CloudWatch Logs Insights syntax](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html)
- [AWS SRA logging](https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/log-archive.html)
- [Incident response guide](https://docs.aws.amazon.com/whitepapers/latest/aws-security-incident-response-guide/welcome.html)
- [Fault Injection Service concepts](https://docs.aws.amazon.com/fis/latest/userguide/what-is.html)
