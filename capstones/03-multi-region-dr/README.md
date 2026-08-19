# Capstone 03: Multi-Region Continuity and Disaster Recovery

## Profile

| Field | Value |
| --- | --- |
| Level | 400 |
| Cost label | `DESIGN-ONLY` |
| Optional variant | `OPTIONAL PAID/SANDBOX` only as described below |
| SAP-C02 emphasis | Domains 1, 2, and 3 |
| Time box | 10-14 hours plus a 30-minute defense |

The default exercise creates local documents and diagrams only. A second Region,
persistent standby data stores, NAT Gateways, Route 53 health checks, and
replication can consume credits or create charges. Do not deploy the optional
variant in the course Free-plan account.

## Scenario

A business-to-business ordering platform serves US and EU customers from one
Region. The API, workers, relational order store, object documents, identity
integration, DNS, observability, and a third-party tax API form the critical
path. The board requires regional disaster recovery after a 95-minute outage.

## Requirements

- Tier 1 order submission: RTO 20 minutes, RPO 2 minutes.
- Tier 2 document retrieval: RTO 4 hours, RPO 24 hours.
- Acknowledged orders must not be duplicated or silently lost.
- EU personal data stays in approved EU Regions.
- Recovery must operate without the failed Region's control plane.
- The surviving design supports 150% of normal peak within 10 minutes of
  failover and documents quota headroom.
- DNS, certificates, keys, secrets, artifacts, configuration, identity, and
  third-party dependencies are recoverable.
- Security evidence is retained by an administrator separate from workload
  operators.
- Recovery is tested quarterly; failback and data reconciliation are in scope.
- Cost is minimized after RTO, RPO, correctness, residency, and security are met.

## Constraints

- The application can add idempotency and region-aware data ownership but cannot
  be fully rewritten.
- The relational engine does not support safe unconstrained multi-writer
  monetary updates.
- Tax calculations may queue for 30 minutes, but order acceptance may not.
- The support team requires an explicit human approval before changing data
  authority.
- The learner has no customer data, domains, or secrets.

## Work to perform

### 1. Requirement and dependency analysis

Create a requirement ledger and dependency graph. For every dependency state:

- service tier and owner;
- normal and recovery Region;
- RTO/RPO contribution;
- data authority and consistency;
- failure detection;
- recovery mechanism;
- quota/capacity need;
- security and residency constraint;
- test evidence.

### 2. Compare recovery strategies

Compare backup/restore, pilot light, warm standby, and multi-site. Include:

- achievable RTO/RPO and evidence;
- replication and corruption behavior;
- control-plane independence;
- steady and recovery cost;
- operational skill and exercise burden;
- failover, writer fencing, failback, and reconciliation;
- risks from DNS, identity, keys, secrets, and external services.

Select a strategy per tier rather than forcing one strategy on every component.

### 3. Design all lifecycle states

Diagram normal, degraded, failover, recovery, and failback. Show:

- request routing and health signal;
- trust and network boundaries;
- active writer and fencing mechanism;
- object/database replication direction;
- asynchronous queues and idempotency ledger;
- security evidence path;
- operator approval point;
- behavior during primary control-plane loss.

### 4. Produce executable runbooks

Write detection, declaration, failover, validation, rollback, failback, and
communications steps. Each step needs owner, expected duration, prerequisite,
evidence, and stop condition. Automation may gather evidence and scale capacity;
the data-authority change pauses for the named approval.

### 5. Design the recovery exercise

Define a controlled regional impairment that does not require destructive
wildcard operations. Measure:

- detection time;
- decision time;
- infrastructure/data readiness;
- customer restoration time;
- last acknowledged source business record;
- newest recovered target record;
- replication lag and reconciliation exceptions;
- latency/error rate after restoration;
- failback time and unresolved risks.

RTO begins when the customer path becomes unavailable and ends only when
end-to-end acceptance checks pass. RPO compares durable business records, not
dashboard health.

## Required deliverables

1. Executive summary and requirement ledger.
2. Current and target context/failure-domain diagrams.
3. Tiered strategy comparison and selected target architecture.
4. Data classification, authority, replication, and residency matrix.
5. Capacity, quota, and cost model for normal and recovery states.
6. Threat model and least-privilege recovery RACI.
7. ADR with alternatives, consequences, owner, and review trigger.
8. Risk register with likelihood, impact, trigger, mitigation, owner, and
   residual risk.
9. Failover, rollback, failback, and communications runbooks.
10. Recovery exercise plan and redacted result sheet.
11. Board-defense responses.

## Validation and review criteria

- Every Tier 1 dependency has an evidenced recovery path within 20 minutes.
- The RPO method can detect an acknowledged missing or duplicate order.
- No failover step depends solely on the failed Region.
- Data authority is singular and explicit in every state.
- EU data flow and key use stay within approved boundaries.
- Standby scaling and quotas support 150% normal peak.
- Health checks measure customer-path correctness, not only instance health.
- Failback handles target-side writes and reconciliation.
- Cost includes standby capacity, replication, logs, transfer, tests, support,
  and engineering effort.
- Residual risks have business owners; architecture does not hide them.

## Evidence

Store only non-sensitive evidence:

- diagram version and review date;
- synthetic test IDs and redacted timestamps;
- calculated RTO/RPO with start, end, and data checkpoints;
- quota and scaling assumptions;
- runbook step timings and exceptions;
- ADR approval and risk acceptance;
- review comments and remediation status.

Do not store account IDs, ARNs, endpoints, credentials, customer records, keys,
or secret values.

## Rubric

Score each 0-5.

| Criterion | Weight |
| --- | ---: |
| Requirement traceability and tiering | 10 |
| Data authority, correctness, and residency | 15 |
| RTO/RPO architecture and measured evidence | 20 |
| Failure/control-plane independence and capacity | 15 |
| Security, identity, key, and audit design | 10 |
| Operations, runbooks, failback, and ownership | 15 |
| Cost model, ADR, and risk treatment | 10 |
| Defense clarity and distractor rejection | 5 |

Weighted score is `sum(score / 5 * weight)`. Pass at 80 or higher, with at
least 3/5 in data correctness, RTO/RPO, security, and operations. A design that
cannot prove either hard recovery objective fails regardless of total.

## Defense questions

1. Why is Multi-AZ insufficient for this regional requirement?
2. What fences the old writer during a network partition?
3. How are acknowledged writes and duplicates measured?
4. Which recovery step requires human authority, and why?
5. How does the solution recover keys, secrets, identity, DNS, and artifacts?
6. What breaks if replication transports corruption?
7. Why is the selected design cheaper than the next more resilient valid option?
8. How will failback preserve writes accepted in the recovery Region?

## Optional paid sandbox

Only in a separately governed paid or AWS-managed sandbox, implement a small,
non-production synthetic variant with short retention and no customer data.
Before deployment obtain budget approval, name every resource, tag it, review
quotas, and read cleanup. Use disposable DNS names and synthetic records.

Validate one controlled application-path failover and record measured evidence.
Do not claim the sandbox proves production scale; it tests the runbook and
instrumentation.

## Cleanup for the optional variant

No cleanup is required for the default design-only exercise.

For the optional sandbox, delete exact named resources in dependency order:

1. Stop synthetic traffic and event sources.
2. Disable failover automation and remove test DNS records/health checks.
3. Remove secondary application services, functions, tasks, and load balancers.
4. Remove replicated test databases only after confirming no retention need;
   delete explicitly named final snapshots if created for the exercise.
5. Remove queues, test objects and object versions, replica buckets, log groups,
   secrets, and test keys according to their deletion windows.
6. Remove VPC endpoints, NAT Gateways, Elastic IP addresses, network interfaces,
   subnets, route tables, security groups, and VPCs.
7. Delete IaC stacks only after retained-resource checks.
8. Check both Regions and global Route 53/IAM resources, then review Billing and
   usage.

Never use wildcard deletion. Preserve only redacted learning evidence.

## Official references

- [Plan for disaster recovery](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/plan-for-disaster-recovery-dr.html)
- [Define recovery objectives](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/disaster-recovery-dr-objectives.html)
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
- [Route 53 disaster recovery mechanisms](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html)
