# Architecture scenario: Cut cost without invalidating disaster recovery

## Business context

A board requests a 20% cloud cost reduction. A review finds idle warm capacity and low average CPU, but the same resources support a 15-minute regional failover objective.

## Requirements

- Reduce run-rate by 20% within two quarters.
- Retain checkout SLO and 15-minute RTO.
- Do not weaken security retention.
- Support a product launch with 4x demand.
- Avoid stranded commitments during modernization.

## Constraints

- Secondary-Region quota requests can take weeks.
- Billing data has delay.
- Memory telemetry is incomplete.

## Candidate approaches

### Approach A - blanket shutdown

Remove warm capacity and halve all instances based on average CPU.

### Approach B - constraint-aware portfolio

Protect required resilience/security baselines, fix transfer/log waste, add missing telemetry, rightsize with tests, schedule nonproduction, and commit only stable post-migration use.

### Approach C - buy maximum commitment

Purchase three-year commitments for current peak before optimizing.

## Decision

Choose B. Optimize architecture and usage before rate. Treat warm capacity as an explicit resilience cost, test whether it can scale within RTO, and preserve it until an alternative is proven.

## Tradeoff defense

- Some apparently idle spend is insurance; label and test it rather than hide it.
- More telemetry has cost but enables safer rightsizing.
- Flexible/shorter commitments may have lower discounts but lower stranded-value risk.

## Distractor analysis

For each rejected option, cite the exact hard requirement it violates or the needless fixed cost, coupling, or operator burden it adds. A familiar service is not automatically the right architecture.

## Architecture review board questions

1. What unit metric proves efficiency rather than cost shifting?
2. Which spend is required by RTO, security, or compliance?
3. What downside utilization results if migration happens early?
4. Which quota fails under launch plus deployment surge?
5. How are forecast savings verified after billing delay?

## Follow-up changes

- If RTO is relaxed to four hours, compare backup/pilot-light savings.
- If demand becomes contractually stable, reassess longer commitments after architecture optimization.
