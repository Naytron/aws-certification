# Case Study 1 Deep Analysis

Open this file only after completing
[the scenario](set-01-global-payments.md).

## Requirement hierarchy

The hard gates are regional continuity, RTO 15 minutes, RPO 1 minute, no
duplicate approval, residency, p99 latency, immutable retention, and independence
from the failed Region. Cost is explicitly subordinate. The targeted-change
constraint rejects a wholesale event-sourced rewrite, while the no-conflict
constraint rejects uncontrolled multi-writer monetary state.

## Decision 1 answer: B

Warm standby with explicit market ownership is the only option that can satisfy
the complete requirement set. It prepositions capacity and artifacts for a
15-minute RTO, uses continuous replication appropriate to a one-minute RPO, and
avoids unconstrained monetary write conflicts. Market ownership keeps a single
authority in normal operation. A failover state machine must fence the old
writer, verify replication position, promote the target, scale capacity, shift
traffic, and validate synthetic transactions.

Idempotency needs a merchant-scoped operation key persisted with the
authorization outcome in the same durable transaction boundary. Retries return
the recorded outcome. Region failover does not create a new business operation.
Globally unique identifiers alone are insufficient unless duplicate requests
map to the same key and result.

Residency is handled by keeping EU cardholder records in approved EU locations
and replicating only explicitly classified, tokenized metadata across boundaries.
KMS key policy, grants, replica-key operation, and break-glass ownership belong
in the recovery design. Audit records go to a separate archive/security
administrative boundary with retention controls.

### Explicit distractor rejection

- **A fails RPO and likely RTO.** A nightly snapshot can lose almost 24 hours,
  and restore, scaling, validation, and DNS convergence cannot credibly meet 15
  minutes.
- **C fails correctness.** Last-writer-wins can discard or reorder monetary
  changes and violates the explicit rejection of uncontrolled conflict
  resolution. Full active-active capacity also increases cost before proving a
  valid data model.
- **D fails regional continuity.** Multi-AZ protects against AZ-level failures,
  not loss of the Region or a regional dependency.

## Decision 2 answer: B

Diverse physical paths, locations, and devices reduce correlated hybrid failure.
The route design must include both forward and return paths, BGP preference,
prefix filters, health detection, DNS behavior, and encryption. A backup VPN is
valuable only when its throughput and failover are tested. The degraded fraud
mode needs an explicit risk owner, entry and exit signals, capped duration,
enhanced monitoring, and retrospective review.

### Explicit distractor rejection

- **A preserves the single-location failure domain.** More bandwidth does not
  provide path diversity.
- **C violates security.** Public exposure and long-lived embedded credentials
  expand attack surface and break credential-management requirements.
- **D misuses SQS.** SQS is asynchronous and does not return a synchronous reply
  to the same message. Waiting on a consumer also preserves the critical-path
  dependency unless the application is redesigned around a response channel and
  documented timeout behavior.

## Decision 3 answers: B and D

A controlled failover measures business RTO/RPO under representative failure,
including the difficult failback and reconciliation phases. Continuous
synthetics show customer-path health between exercises, while separately
administered retention provides defensible evidence.

### Explicit distractor rejection

- **A shows replication status, not recoverability.** It does not prove data can
  be promoted, traffic shifted, or service restored in time.
- **C is an assertion, not test evidence.**
- **E slows DNS change propagation** and conflicts with rapid failover.

## Cross-domain tradeoffs

- **Security:** residency, tokenization, key ownership, least-privilege recovery
  roles, immutable evidence, and controlled degraded approval.
- **Reliability:** independent artifacts and roles, dependency recovery,
  writer fencing, quota headroom, synthetics, and quarterly exercises.
- **Performance:** local market routing, pretested standby scaling, and fraud
  timeout behavior protect p99 latency.
- **Operations:** the design adds failover state and reconciliation. Automation
  should pause at the risk-owner decision and data-authority switch.
- **Cost:** warm standby is cheaper than full multi-site but more expensive than
  backup/restore; the RTO/RPO makes that premium necessary.
- **Organization:** security owns evidence, database owners approve authority
  changes, and business risk owns degraded fraud.
- **Migration:** introduce idempotency and partition ownership before enabling
  failover; canary merchants should precede broad rollout.

## Example ADR

- **Decision:** Use warm standby with single-writer market ownership.
- **Drivers:** 15-minute RTO, one-minute RPO, correctness, residency, and limited
  application change.
- **Rejected:** backup/restore misses objectives; uncontrolled multi-writer
  risks financial correctness.
- **Consequences:** pay for standby capacity and replication; maintain fencing,
  reconciliation, quarterly exercise, and independent recovery credentials.
- **Review trigger:** business lowers RTO below tested scaling time or approves a
  data model that supports conflict-free multi-writer operation.

## Example RTO/RPO evidence

RTO starts when the synthetic customer path becomes unavailable and ends after
the target passes authorization, audit, latency, and dependency checks. RPO is
the time difference between the last committed, externally acknowledged source
operation and the newest equivalent durable target operation after promotion.
Record timestamps from a common time source and reconcile by business ID.

## Residual risks

| Risk | Trigger | Mitigation | Owner | Residual |
| --- | --- | --- | --- | --- |
| Replication lag exceeds 1 minute | Lag alarm | Stop failover, reconcile or invoke approved loss decision | Database owner | Business may wait beyond RTO |
| Stale primary accepts writes | Lost fencing signal | Lease/fencing control and network isolation | Platform owner | Split authority during complex partition |
| Standby quota insufficient | Scaling test fails | Preapproved quotas and quarterly scale test | Cloud platform | Sudden regional capacity scarcity |
| Both hybrid paths share carrier | Path audit finds overlap | Contractual and physical diversity review | Network owner | Hidden provider dependency |
| Degraded fraud abuse | Mode entry or duration alarm | Approval, stricter limits, monitoring, post-review | Risk owner | Higher fraud exposure for 20 minutes |

## Defense answers

Duplicate approval is prevented by a stable business idempotency key and
transactionally stored result, combined with single-writer authority and fencing.
Control-plane independence is proven by pre-provisioned target roles, artifacts,
configuration, keys, capacity, health checks, and a failover exercise initiated
without calling the failed Region's control plane.
