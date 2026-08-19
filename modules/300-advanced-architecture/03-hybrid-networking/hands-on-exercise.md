# Hands-on exercise: Prove paths through a segmented hybrid network

## Exercise profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Cloud resources | None |
| Tools | Text editor, spreadsheet, diagramming tool, and optional local policy/query tool |
| Timebox | 90-150 minutes |
| Primary artifact | Route matrices, DNS authority map, failure game, and cost model |

## Objective

Analyze a fictional Transit Gateway/Direct Connect/VPN design entirely on paper and identify unreachable, asymmetric, and over-permitted paths.

## Inputs

- Six VPCs: prod, nonprod, shared services, inspection, data, and vendor.
- On-premises advertises 10.0.0.0/8; an acquired VPC overlaps 10.40.0.0/16.
- Primary Direct Connect and backup Site-to-Site VPN terminate in different facilities but share one corporate router.
- Internal zone corp.example is authoritative on premises; cloud.example is authoritative in Route 53 private hosted zones.
- Traffic through inspection crosses Availability Zones for some paths.

Treat all names and numbers as fictional. Do not paste account IDs, credentials, endpoints, or customer data into course evidence.

## Tasks

1. Inventory every CIDR, ASN, attachment, route-table association, propagation, static route, and blackhole.
2. For twelve source/destination pairs, prove forward route, return route, stateful inspection symmetry, SG/NACL, DNS, and MTU assumptions.
3. Identify any route leaks between nonprod, prod, vendor, and data segments.
4. Resolve the overlapping acquisition network using three candidate patterns and choose one by migration horizon.
5. Draw DNS query paths for both namespaces; add rules that avoid loops and single-endpoint failure.
6. Calculate monthly fixed and per-GB categories for TGW, endpoints, inspection, cross-AZ, NAT, VPN, and Direct Connect without deploying them.
7. Run failure games for one DX path, customer router, TGW route table error, Resolver endpoint AZ, and inspection appliance.
8. Write an ADR for central egress and inspection versus distributed controls.

## Required analysis tables

### Boundary register

| Boundary | Owner | Inbound trust | Outbound trust | Failure impact | Preventive control | Detective evidence |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |

### Requirement traceability

| Requirement | Architecture decision | Evidence | Residual risk | Exception owner |
| --- | --- | --- | --- | --- |
| | | | | |

### Failure game

| Injected failure | Detection | Automatic response | Human decision | RTO/RPO effect | Rollback |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

## Architecture decision record

- Context and hard constraints
- Decision and scope
- Alternatives rejected and exact reasons
- Security, resilience, cost, compliance, and operational consequences
- Assumptions requiring validation
- Reversal trigger and rollback owner

## Challenge changes

- A SaaS provider needs one API but must not learn enterprise routes.
- IPv6 must be introduced while an on-prem firewall remains IPv4-only.
- The RTO for private connectivity drops from four hours to five minutes.

Rework the design for one change. Do not add a service unless it closes a traced requirement.

## Expected characteristics

- Every allowed path has bidirectional proof and every denied path has a specific control.
- The design does not call one physical DX connection redundant.
- DNS has explicit authority, conditional rules, health/capacity, and no forwarding loop.
- Overlap strategy includes a long-term renumbering or isolation decision.
- Cost model exposes centralized hairpin and inter-AZ charges.

## Evidence

Save only non-sensitive diagrams, calculations, decision tables, and the ADR. Use [the course evidence template](../../../templates/lab-evidence-template.md).
