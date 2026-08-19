# Architecture scenario: Exit a data center without rewriting checkout

## Business context

A retailer has nine months to leave a facility. Executives want checkout rewritten into microservices during migration, but its peak season begins in five months and current dependency knowledge is weak.

## Requirements

- Exit facility in nine months.
- Checkout downtime under 15 minutes and RPO under one minute.
- No major architecture change during peak freeze.
- Reduce license cost within 12 months.
- Create a later modernization path.

## Constraints

- Only two teams have cloud operations experience.
- Database supports CDC but schema changes are frequent.
- Rollback must remain possible until transaction reconciliation passes.

## Candidate approaches

### Approach A - rewrite now

Build new EKS microservices and migrate data before peak.

### Approach B - two-step migration

Replatform/rehost checkout with CDC and minimal code change, stabilize and decommission source, then modernize bounded capabilities using strangler patterns.

### Approach C - retain indefinitely

Renew the facility and defer all work without a risk-reduction plan.

## Decision

Choose B. Meet the immovable exit and continuity constraints with the least simultaneous change. Build observability and seams during migration, then modernize after production evidence and operator maturity improve.

## Tradeoff defense

- Two steps can cost more short term but separate deadline risk from architectural transformation.
- Temporary dual run is budgeted and time bounded by reconciliation gates.
- Refactoring later requires executive protection from becoming permanent deferral.

## Distractor analysis

For each rejected option, cite the exact hard requirement it violates or the needless fixed cost, coupling, or operator burden it adds. A familiar service is not automatically the right architecture.

## Architecture review board questions

1. Which dependencies can force checkout into another wave?
2. What lag and reconciliation threshold authorizes the write switch?
3. What is the latest safe rollback time?
4. When can source licenses and infrastructure be terminated?
5. Which metric proves later modernization improves business outcomes?

## Follow-up changes

- If the facility deadline is removed and teams are mature, reassess selective refactoring before migration.
- If CDC is unsupported, compare longer outage, application-level replication, or staged data partitioning.
