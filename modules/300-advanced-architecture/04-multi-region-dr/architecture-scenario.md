# Architecture scenario: Recover payments during a partial regional impairment

## Business context

A payment platform experiences rising errors in its primary Region. Some APIs and replication still work, but latency is breaching SLOs. A premature failover could create two writers.

## Requirements

- Restore authorization within 15 minutes of customer impact.
- Lose no more than one minute of accepted payment intents.
- Never capture the same payment twice.
- Retain audit evidence and support reconciliation.
- Return safely to the preferred Region after stability.

## Constraints

- Replication lag is unknown for three minutes during the incident.
- The secondary handles 60% of peak until scaled.
- Operations has only one practiced failover in the last year.

## Candidate approaches

### Approach A - immediate DNS flip

Route all clients to the secondary while the primary writer remains available.

### Approach B - staged fencing and promotion

Shed noncritical load, establish observed lag, fence old writes, promote one authority, route canaries, scale, validate invariants, then expand.

### Approach C - wait for complete primary failure

Take no action while errors continue because partial outages are ambiguous.

## Decision

Choose B. Use objective health and business SLOs to invoke a pre-authorized runbook. Protect payment uniqueness by fencing the old writer and using idempotency keys. Route a canary before full traffic and retain an explicit abort gate.

## Tradeoff defense

- Fencing adds seconds but prevents a far more expensive split brain.
- Degraded mode preserves core authorization while optional functions wait.
- Warm capacity costs more than cold recovery but is necessary for the stated RTO.

## Distractor analysis

For each rejected option, cite the exact hard requirement it violates or the needless fixed cost, coupling, or operator burden it adds. A familiar service is not automatically the right architecture.

## Architecture review board questions

1. What precise signal starts the 15-minute clock and triggers authority?
2. How is the old writer fenced under network partition?
3. What customer response is returned for uncertain transactions?
4. How are duplicates and gaps reconciled?
5. What evidence must exist before failback?

## Follow-up changes

- For zero tolerated loss, redesign transaction acceptance or use synchronous/quorum semantics and accept latency/availability tradeoffs.
- If RTO becomes four hours, pilot light may replace warm standby.
