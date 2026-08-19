# Domain 4: Accelerate Workload Migration and Modernization

**Weight: 20% of scored content**

## What must be integrated

The official tasks cover portfolio selection, migration approach, target
architecture, and modernization. Migration is a controlled business change with
dependencies and rollback, not a bulk copy operation.

## Portfolio decision sequence

1. Discover applications, infrastructure, data, owners, licenses, traffic,
   dependencies, compliance, and business deadlines.
2. Validate discovery with application and business owners.
3. Classify each workload by disposition: retire, retain, relocate, rehost,
   replatform, repurchase, or refactor.
4. Define target account, network, identity, operations, security, and recovery
   readiness.
5. Group waves by dependency and business risk, not only server count.
6. Rehearse synchronization, cutover, validation, rollback, and communication.
7. Migrate, observe through a stabilization window, then decommission only after
   sign-off and retention obligations.

## Selection rules

| Need | Likely starting point | Key rejection test |
| --- | --- | --- |
| Fast server move with low code change | Application Migration Service/rehost | Hardware coupling, licensing, and unsupported OS |
| Online heterogeneous database move | DMS plus schema conversion where needed | Unsupported objects, data type semantics, and validation |
| Large offline transfer | Snow Family | Lead time, chain of custody, and delta synchronization |
| Repeated file transfer | DataSync | Protocol, metadata, bandwidth, and changed-file window |
| Shared file semantics | EFS or FSx family based on protocol/workload | Locking, latency, Windows features, and throughput |
| Decouple components | SQS, SNS, EventBridge, or Step Functions by interaction | Ordering, fanout, orchestration, replay, and idempotency |
| Container target | ECS or EKS according to control and portability need | Team skill and cluster operations |

## Professional reasoning

- Separate migration strategy from modernization destination. A workload may
  rehost by a deadline and refactor after stabilization.
- Build the landing-zone, identity, connectivity, observability, backup, and
  support foundation before large waves.
- Size transfer from data volume, effective throughput, change rate, and allowed
  cutover, not link headline speed.
- Define source of truth during every phase.
- Test rollback under the same data-change conditions as cutover. If writes
  occur on the target, reverse synchronization or business reconciliation may
  be required.
- Include licensing, data transfer, parallel run, training, and decommission
  costs in the business case.

## Common traps

- Wave grouping by department while hidden dependencies cross departments.
- Database cutover with no schema-object or row-level validation.
- DNS TTL changed only at cutover.
- Refactoring every workload before realizing deadline value.
- Keeping source systems indefinitely "for safety" without cost or security
  ownership.
- Buying long commitments before the post-migration baseline stabilizes.

## Practice artifacts

Create a portfolio inventory, dependency graph, 7R rationale, target-state ADRs,
wave plan, cutover and rollback runbooks, validation matrix, cost case,
decommission evidence, and risk register.

## Official references

- [Official Domain 4 outline](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02-domain4.html)
- [AWS migration process: assess, mobilize, migrate](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-migration/overview.html)
- [AWS Cloud Adoption Framework](https://aws.amazon.com/cloud-adoption-framework/)
