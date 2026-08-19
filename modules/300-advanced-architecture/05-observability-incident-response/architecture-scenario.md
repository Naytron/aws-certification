# Architecture scenario: Respond to a retry-amplified partial outage

## Business context

A SaaS platform remains technically reachable, but one dependency throttles and client retries multiply load. Infrastructure averages look normal while 20% of tenants cannot complete checkout.

## Requirements

- Detect customer impact within five minutes.
- Contain retry amplification without blocking healthy tenants.
- Preserve seven-year security evidence.
- Provide executive status every 20 minutes.
- Demonstrate prevention in a controlled game day.

## Constraints

- No OpenSearch deployment in the course account.
- Tenant IDs are sensitive and must be hashed in shared telemetry.
- Rollback may restore an earlier security defect.

## Candidate approaches

### Approach A - scale everything

Double all compute and database capacity before understanding the bottleneck.

### Approach B - evidence-led bounded containment

Use journey SLIs and traces to isolate the dependency/tenant pattern, cap retries, shed optional work, apply reversible relief, and validate invariants.

### Approach C - wait for average CPU

Declare no incident until average CPU exceeds 80%.

## Decision

Choose B. Tail and tenant-level evidence already proves an incident. Stop retry amplification first, protect core flows, preserve forensic context, and use canary restoration. Scale only the demonstrated constrained resource.

## Tradeoff defense

- Rate limits can reject some work but protect global availability; communicate degraded behavior.
- Hashed tenant dimensions preserve troubleshooting value while reducing disclosure.
- Rolling back requires a security-risk check because availability and security changes can conflict.

## Distractor analysis

For each rejected option, cite the exact hard requirement it violates or the needless fixed cost, coupling, or operator burden it adds. A familiar service is not automatically the right architecture.

## Architecture review board questions

1. Which SLI triggered incident declaration?
2. How does the team know rate limiting is helping rather than hiding failures?
3. What automation has authority to change production?
4. Can audit logs be altered by the suspected principal?
5. What condition aborts the later resilience test?

## Follow-up changes

- If raw tenant identity is legally required for investigation, keep re-identification under restricted audited access.
- If retry behavior is controlled by third parties, add server-side idempotency and backpressure contracts.
