# Must Know - Cost-Optimized Architecture

## Optimize in the right order

1. Meet security, resilience, and performance requirements.
2. Measure demand and unit economics.
3. Remove waste and idle resources.
4. Match supply to demand with elasticity and right-sizing.
5. Select the lowest-cost service architecture.
6. Commit only the stable baseline after measurement.

## Pricing decisions

| Pattern | Candidate | Caution |
| --- | --- | --- |
| Fault-tolerant interruptible compute | EC2 Spot | Interruptions require checkpointing/retry and diversified capacity |
| Flexible steady compute spend | Compute Savings Plans | Financial commitment; forecast the conservative baseline |
| Stable specific instance footprint | EC2 Instance Savings Plans or RIs | Scope/flexibility differs; understand current terms |
| Spiky short request workload | Serverless/on-demand | Per-unit premium may be cheaper than idle capacity |
| Predictable high sustained workload | Right-sized provisioned capacity plus commitment | Preserve headroom and recovery capacity |

Data transfer, NAT Gateway processing/hourly cost, cross-AZ traffic, logs, public IPv4, snapshots, requests, retrieval, and minimum storage durations can dominate. Architecture diagrams should annotate these flows.

## Guardrails and failures

- Tags support allocation but do not retroactively fix untagged history. Enforce naming/tagging and use cost categories where appropriate.
- Budgets and anomaly detection alert; they do not stop charges.
- Rightsize using CPU plus memory, network, disk, latency, and seasonality. Average CPU alone is insufficient.
- Unit metrics such as cost/order expose whether business efficiency improves as totals grow.
- Avoid premature commitments, overlong log retention, unattached volumes/IPs, duplicated snapshots, accidental cross-AZ paths, and NAT Gateways in training labs.

## Distractors

- Cheapest instance hourly rate equals cheapest architecture: utilization and operations matter.
- Spot for an irreplaceable singleton: interruption violates resilience.
- All Upfront commitment before measurement: locks in guessed demand.
- S3 lifecycle always saves: transition, retrieval, duration, and request costs matter.

## Official references

- [AWS Pricing Calculator](https://docs.aws.amazon.com/pricing-calculator/latest/userguide/what-is-pricing-calculator.html)
- [Cost Optimization Pillar](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html)
- [Savings Plans](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html)
