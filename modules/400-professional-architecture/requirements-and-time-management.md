# Professional Requirement Parsing and Time Management

## Build a requirement ledger

For every long scenario, create a compact ledger before choosing services.

| Field | Question |
| --- | --- |
| Actor and owner | Who owns the workload, data, platform, control, and recovery decision? |
| Current state | What already exists, and what may not change? |
| Required outcome | What observable result is requested? |
| Hard constraints | Which numeric, regulatory, protocol, geography, and timing limits are mandatory? |
| Priority | Is the prompt minimizing cost, outage, operational effort, migration time, or development? |
| Failure scope | Component, AZ, Region, account, identity provider, network, or human process? |
| Data semantics | RPO, consistency, ordering, residency, retention, and authority? |
| Change path | Deployment, migration wave, rollback trigger, and coexistence period? |
| Evidence | What metric, log, test, or approval proves success? |

Do not turn every adjective into a hard constraint. "Global" does not
automatically mean active-active. "Highly available" does not automatically mean
multi-Region. "Minimal operational overhead" often favors managed services, but
only after protocol, behavior, and compliance fit are established.

## Constraint hierarchy

Apply this order unless the scenario states another priority:

1. Safety, legal, regulatory, and data residency.
2. Functional compatibility and correctness.
3. Numeric RTO, RPO, latency, throughput, and availability.
4. Explicit migration outage and rollback constraints.
5. Operational ownership and skills.
6. Cost and commercial commitments.
7. Convenience.

A cheaper option that misses RPO is invalid. A fully automated option that
breaks separation of duties is invalid. An option that meets every hard
requirement but adds unused services is usually a distractor.

## State-transition reasoning

Professional decisions include lifecycle states, not only a target diagram.

- **Normal:** authority, request path, controls, capacity, and monitoring.
- **Degraded:** what fails, how it is detected, and what still works.
- **Recovery:** who authorizes a change, how data consistency is checked, and
  what target time is measured.
- **Rollback or failback:** the stop conditions, authoritative data source,
  reconciliation, and customer communication.

For migration, replace recovery with coexistence, cutover, rollback, and
decommission states. An architecture without an executable transition is
incomplete.

## Seven-lens decision test

Before selecting an answer, run a short cross-domain check:

1. **Security:** least privilege, trust boundaries, encryption, traceability,
   residency, and incident containment.
2. **Reliability:** failure domains, quotas, RTO/RPO, backups, restore tests,
   replication lag, and dependency recovery.
3. **Performance:** access pattern, latency, throughput, concurrency, caching,
   partitioning, and load tests.
4. **Operations:** deployment, patching, observability, ownership, automation,
   runbooks, and skill burden.
5. **Cost:** steady and variable cost, data transfer, licenses, support, idle DR,
   commitments, and engineering labor.
6. **Organization:** accounts, OUs, delegated administration, policy evaluation,
   shared services, chargeback, and team autonomy.
7. **Migration:** dependencies, 7R choice, wave, synchronization, validation,
   rollback, and decommission.

## Distractor rejection language

Reject with evidence, not preference:

- "Option B violates the 15-minute RPO because nightly snapshots can lose almost
  24 hours."
- "Option C meets throughput but not isolation because the SCP cannot grant a
  permission that the identity policy lacks."
- "Option D is technically valid but adds cluster operations when the prompt
  prioritizes minimal operational effort."

Avoid "not best practice" without naming the violated requirement.

## Time recovery protocol

If an item exceeds two and a half minutes:

1. Restate the requested outcome in seven words or fewer.
2. Circle the strongest numeric or governance constraint.
3. Remove options that solve a different problem.
4. Compare the remaining options on the prompt's priority.
5. Select the most defensible answer, flag it, and continue.

Never leave an item blank because the official guide confirms no penalty for
guessing.

## Practice evidence

For every timed set, record:

- completion time and unanswered count;
- raw score by domain;
- confident-correct, uncertain-correct, uncertain-wrong, and confident-wrong;
- errors by knowledge, requirement, distractor, scope, operations, or time;
- average time on correct and incorrect items;
- one new decision rule and a scheduled fresh reattempt.
