# Guided lab: Prove paths through a segmented hybrid network

## Lab profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Cloud resources | None |
| Account changes | None |
| Timebox | 90-150 minutes |
| Cleanup | [No-cloud cleanup verification](cleanup.md) |

> Do not deploy Direct Connect, Transit Gateway, NAT Gateway, VPN, PrivateLink endpoints, or Resolver endpoints; these can incur hourly, processing, transfer, or provider charges.

## Objective

Analyze a fictional Transit Gateway/Direct Connect/VPN design entirely on paper and identify unreachable, asymmetric, and over-permitted paths.

## Inputs

- Six VPCs: prod, nonprod, shared services, inspection, data, and vendor.
- On-premises advertises 10.0.0.0/8; an acquired VPC overlaps 10.40.0.0/16.
- Primary Direct Connect and backup Site-to-Site VPN terminate in different facilities but share one corporate router.
- Internal zone corp.example is authoritative on premises; cloud.example is authoritative in Route 53 private hosted zones.
- Traffic through inspection crosses Availability Zones for some paths.

All facts are fictional. Keep account IDs, credentials, private endpoints, customer records, and other sensitive information out of the artifacts.

## Preflight

1. Confirm the exercise remains `DESIGN-ONLY`; do not create or change AWS resources.
2. Confirm the current AWS Free plan is unchanged and billing alerts remain available.
3. Use only fictional or sanitized inputs; do not record account IDs, ARNs, credentials, endpoints, or customer data.
4. If this architecture were later deployed in an approved paid sandbox, require the standard tags `Course`, `Module`, `Owner`, and `ExpiresAt` on every supported resource. Tags are design annotations here, not a reason to deploy.
5. Read [cleanup.md](cleanup.md) before starting and record that no cloud resources are expected.

## Architecture frame

Before selecting a service, create five columns: hard requirement, owner, trust boundary, failure domain, and measurable evidence. A design decision is valid only when it closes a row in that table.

## Guided procedure

### 1. Establish requirements and authority

1. Mark each input as a hard constraint, assumption, or preference.
2. Assign one accountable owner to every hard constraint.
3. Record numeric RTO, RPO, capacity, cost, and compliance limits where relevant.
4. Identify who may approve a change, exception, failover, or rollback.

### 2. Draw boundaries

Create an ASCII or diagramming-tool view that distinguishes:

- organization/account and administrative boundaries;
- human and workload trust paths;
- network and data movement;
- Availability Zone, Region, external provider, and operator failure domains;
- evidence, key, and recovery ownership.

### 3. Complete the module analysis

1. Inventory every CIDR, ASN, attachment, route-table association, propagation, static route, and blackhole.
2. For twelve source/destination pairs, prove forward route, return route, stateful inspection symmetry, SG/NACL, DNS, and MTU assumptions.
3. Identify any route leaks between nonprod, prod, vendor, and data segments.
4. Resolve the overlapping acquisition network using three candidate patterns and choose one by migration horizon.
5. Draw DNS query paths for both namespaces; add rules that avoid loops and single-endpoint failure.
6. Calculate monthly fixed and per-GB categories for TGW, endpoints, inspection, cross-AZ, NAT, VPN, and Direct Connect without deploying them.
7. Run failure games for one DX path, customer router, TGW route table error, Resolver endpoint AZ, and inspection appliance.
8. Write an ADR for central egress and inspection versus distributed controls.

For each task, write the observation, inference, decision, evidence, residual risk, and owner. Do not treat an architecture diagram as proof by itself.

### 4. Run a controlled failure game

Choose the most consequential listed dependency. Walk the clock through detection, diagnosis, authorization, containment, recovery, validation, and rollback. Record the first point at which the design misses an objective. Then change one control and repeat.

### 5. Compare alternatives

Score at least three approaches from 1 (poor) to 5 (strong) for security, blast radius, recovery, operations, compliance, variable cost, fixed cost, migration risk, and reversibility. Weight only criteria traced to requirements.

### 6. Write the ADR

Document context, decision, alternatives, consequences, assumptions, validation evidence, exception owner, reversal trigger, and rollback authority.

## Validate

The result should have these characteristics:

- Every allowed path has bidirectional proof and every denied path has a specific control.
- The design does not call one physical DX connection redundant.
- DNS has explicit authority, conditional rules, health/capacity, and no forwarding loop.
- Overlap strategy includes a long-term renumbering or isolation decision.
- Cost model exposes centralized hairpin and inter-AZ charges.

## Cleanup

No cloud cleanup is expected. Complete [cleanup.md](cleanup.md), sanitize evidence, and explicitly record `No cloud resources created - DESIGN-ONLY`.

Complete every gate in [validation.md](validation.md), then perform [cleanup.md](cleanup.md). Save non-sensitive evidence using [the course evidence template](../../../templates/lab-evidence-template.md).
