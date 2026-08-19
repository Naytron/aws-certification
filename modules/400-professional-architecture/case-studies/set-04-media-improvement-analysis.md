# Case Study 4 Deep Analysis

Open this file only after completing
[the scenario](set-04-media-improvement.md).

## Requirement hierarchy

The hard targets are p99 below two seconds at 10x, 99.95% SLO, automatic AZ
recovery, ordering, replay safety, credential removal, retention, and reversible
deployment. Cost per streamed hour and avoidance of a pre-event rewrite direct
the choice among valid improvements.

## Decision 1 answer: B

The measured loop preserves attribution and rollback. Start with customer
journey indicators: playback-start success, p50/p95/p99 startup time, error
budget consumption, rebuffer rate, and dependency latency. Correlate traces,
queue/stream lag, cache hit ratio, eviction, database connections, lock time,
throttles, instance saturation, and quota headroom. Reproduce demand shape, not
only average request rate.

Prioritize exposures by customer and business impact, reversibility, confidence,
and effort. Use canaries and game days to prove rather than assume improvement.

### Explicit distractor rejection

- **A violates the explicit no-full-rewrite constraint** and combines too many
  failure sources to attribute or roll back safely.
- **C spends before identifying the bottleneck** and locks seasonal peak into a
  three-year commitment.
- **D produces visibility without action.** Unowned, non-actionable dashboards
  do not change deployment risk or recovery.

## Decision 2 answer: A

The layered option addresses likely feedback loops while preserving semantics.
CloudFront reduces origin demand when cache keys and TTLs reflect authorization,
query, header, and mutability requirements. Coalescing and jitter prevent many
workers from recomputing one expired object. Bounded concurrency and connection
pools protect the database. Decoupling absorbs bursts where asynchronous
completion is acceptable.

Per-channel keys keep related live events in one ordered partition. Idempotent
consumers record or derive stable event identity so retries and replay do not
duplicate side effects. Load tests include skewed popular channels, cache-cold
starts, AZ loss, broker/consumer interruption, and quota behavior.

### Explicit distractor rejection

- **B can expose personalized or authorized content and serve stale live data.**
  It optimizes hit rate by violating correctness and security.
- **C creates a larger single point of failure** and does not address connection
  storms, cache behavior, or elastic peak handling.
- **D breaks per-channel ordering.** Timestamps cannot reliably reconstruct
  causal order under concurrency, clock skew, and retry.

## Decision 3 answer: A

CI/CD should exchange an external workload identity for short-lived AWS
credentials, assume narrowly scoped roles, and record deployment actions.
Versioned IaC and signed or otherwise integrity-verified artifacts improve
repeatability. Progressive traffic plus SLO gates limits blast radius.

Expand-and-contract schema change keeps old and new application versions
compatible: add new nullable structures, deploy code that can work across
versions, backfill and validate, shift reads/writes, then remove old structures
only after the rollback window. Application rollback must not require restoring
the entire database and losing valid writes.

Central evidence needs classification, retention, access, integrity, query, and
cost rules. Unit economics divides attributable delivery, compute, data,
streaming, observability, and support costs by streamed hours. Commitments apply
only to a stable minimum baseline after measurement.

### Explicit distractor rejection

- **B retains a powerful long-lived secret** and weak attribution.
- **C makes all-at-once failure broad, and database restore is not a valid
  application rollback because it discards unrelated writes.**
- **D overcommits highly seasonal capacity** before the new baseline is known.

## Cross-domain remediation order

1. Remove exposed keys, constrain roles, and protect evidence.
2. Define SLOs, telemetry ownership, and event readiness.
3. Add repeatable IaC and progressive delivery with schema compatibility.
4. Reproduce the event load and fix cache/database feedback loops.
5. Prove AZ recovery and stream replay in game days.
6. Evaluate managed streaming against control, migration, ordering, throughput,
   operations, and cost needs.
7. Right-size and commit only after stable evidence.

## Example ADR

- **Decision:** Apply measured layered remediation, not a rewrite.
- **Drivers:** two upcoming events, SLO, 10x performance, reversible delivery,
  and 25% unit-cost reduction.
- **Consequences:** temporary operation of current Kafka and database while
  guardrails improve; staged modernization remains possible.
- **Rejected:** rewrite-all has unacceptable schedule and rollback risk.
- **Review trigger:** managed-streaming evaluation proves better total value or
  current platform cannot meet SLO at tested load.

## Example evidence

| Measure | Baseline | Gate |
| --- | ---: | ---: |
| Playback startup p99 | 4.2 s | <2.0 s at representative 10x |
| AZ recovery | Manual/unknown | Automated, within SLO error budget |
| Duplicate side effects on replay | Unknown | 0 in controlled replay |
| Long-lived CI keys | Present | 0; federation events traceable |
| Cost per streamed hour | Index 1.00 | <=0.75 over comparable mix |

## Example risks

| Risk | Trigger | Mitigation | Owner | Residual |
| --- | --- | --- | --- | --- |
| Cache serves wrong variant | Authorization/cache-key test fails | Explicit cache policy and negative tests | App | New header introduced |
| Connection storm repeats | Pool saturation | Caps, backpressure, alarm, load test | DB/app | Novel burst |
| Canary misses rare fault | Error after broadening | Slow rollout and rapid rollback | Release | Low-frequency path |
| Stream replay duplicates | Idempotency test fails | Stable event ID and outcome ledger | Streaming | External side effect |
| Commitment exceeds baseline | Utilization drops | Commit only stable minimum | FinOps | Product decline |

## Defense answers

Average CPU hides tail latency, memory, locks, hot keys, connection limits,
queue lag, burst shape, and individual saturated dependencies. A schema remains
rollback-compatible through expand-and-contract sequencing, cross-version
application compatibility, validated backfill, delayed destructive changes, and
an explicit rollback window.
