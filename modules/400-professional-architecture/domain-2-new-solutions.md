# Domain 2: Design for New Solutions

**Weight: 29% of scored content**

## What must be integrated

The official tasks cover deployment, business continuity, security, reliability,
performance, and cost. Begin with measurable workload behavior, not a favorite
service.

## Decision map

| Question | Evidence required |
| --- | --- |
| How will change be released? | Versioned IaC, test gates, deployment strategy, rollback trigger, and data compatibility |
| How much loss and outage are acceptable? | Business-approved RPO/RTO, dependency map, restore/failover tests |
| What is trusted? | Identity, network, data, key, certificate, secret, and software-supply-chain boundaries |
| What fails independently? | AZ, Region, account, quota, third party, control plane, and operator |
| What is the access pattern? | Request rate, object size, key distribution, consistency, latency, and growth |
| What drives cost? | Demand shape, idle capacity, transfer, storage lifecycle, support, and labor |

## Professional reasoning

- Select Multi-AZ for local availability and multi-Region only when geographic
  continuity, latency, sovereignty, or blast-radius requirements justify it.
- RTO and RPO apply to the whole critical path. The slowest unrecovered
  dependency determines service restoration.
- Separate immutable infrastructure rollback from stateful data rollback.
- Prefer asynchronous decoupling when the business tolerates it; define
  idempotency, ordering, retries, poison-message handling, and replay.
- Choose a purpose-built data store from access and consistency requirements,
  not from marketing categories.
- Include quotas and 10x behavior in capacity decisions.
- Treat managed services as an operations trade, not an automatic answer.
- Model data transfer and idle recovery capacity before claiming cost
  optimization.

## Common traps

- Active-active application tiers over a single-Region writable database.
- DNS failover with no health signal for end-to-end correctness.
- Backups with no restore time or restore test.
- Blue/green deployment where an irreversible schema change prevents rollback.
- A cache used as the authoritative store.
- Spot capacity for a non-interruptible singleton.
- Encryption named without key ownership, rotation, or cross-Region recovery.

## Practice artifacts

Create a context and failure-domain diagram, workload profile, threat model,
quota table, deployment state machine, recovery runbook, three-year cost model,
ADR, and risk register.

## Official references

- [Official Domain 2 outline](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02-domain2.html)
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
- [Plan for disaster recovery](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/plan-for-disaster-recovery-dr.html)
