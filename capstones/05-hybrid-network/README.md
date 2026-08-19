# Capstone 05: Hybrid Network and Identity Architecture

## Profile

| Field | Value |
| --- | --- |
| Level | 400 |
| Cost label | `DESIGN-ONLY` |
| Optional variant | `OPTIONAL PAID/SANDBOX` only as described below |
| SAP-C02 emphasis | Domains 1, 2, and 4 |
| Time box | 12-16 hours plus a 40-minute defense |

Direct Connect, Transit Gateway, Site-to-Site VPN, Network Firewall, NAT
Gateway, Resolver endpoints, and persistent directory services can incur cost.
Do not deploy them in the Free-plan account.

## Scenario

An enterprise has two data centers, 60 AWS VPCs in two Regions, 14 branch
offices, and one acquisition with overlapping address space. Workloads need
private access to on-premises databases and selected shared AWS services.
Workforce users authenticate through a corporate identity provider. Applications
use both Windows-integrated and modern service identities.

## Requirements

- Remove single circuit, location, device, and tunnel failure from critical
  paths.
- Provide deterministic production, non-production, sandbox, shared-service,
  inspection, and acquisition routing domains.
- Keep production and sandbox isolated.
- Preserve symmetric routing through stateful inspection.
- Resolve approved private domains in both directions without open forwarding
  or resolution loops.
- Provide p95 network latency below 35 ms from the primary data center to the
  primary Region for Tier 1 traffic.
- Encrypt sensitive traffic in transit, including where Direct Connect alone
  does not provide the required encryption.
- Centralize workforce access with MFA and group lifecycle; avoid long-lived
  human access keys.
- Use workload identities and short-lived cross-account credentials.
- Support a four-hour identity-provider outage with controlled break glass.
- Isolate overlapping acquired CIDRs until renumbering can finish.
- Capture route, flow, DNS, authentication, and configuration evidence.
- Model data processing, endpoint, inspection, egress, circuit, license, and
  support cost.

## Constraints

- The primary data center reaches two separate Direct Connect locations; the
  secondary initially has VPN only.
- A partner advertises routes the enterprise must never transit to AWS.
- Some legacy Windows workloads require directory trust for 12 months.
- The acquisition cannot renumber for six months.
- Security requires egress filtering and named incident authority.
- Route convergence must not create asymmetric return paths.

## Work to perform

### 1. Build route and trust inventories

Create:

- source/destination/protocol/port/latency/owner matrix;
- CIDR and autonomous-system inventory;
- route advertisement/acceptance policy;
- DNS namespace and authority matrix;
- workforce and workload trust inventory;
- data classification and encryption matrix.

Mark every overlap, default route, transitive path, third-party route, and
identity fallback.

### 2. Compare connectivity patterns

Compare VPC peering, Transit Gateway, Cloud WAN where organizational need
justifies evaluation, PrivateLink, Direct Connect gateway/VIF types, and
Site-to-Site VPN. Select by scale, transitivity, segmentation, protocol,
bandwidth, latency, operations, and cost.

The design must show:

- diverse Direct Connect and VPN paths;
- BGP policy, prefix filters, preference, and failure convergence;
- Transit Gateway associations and propagations per route domain;
- stateful inspection forward and return paths;
- inter-Region routing and failure behavior;
- overlap isolation, translation/proxy, PrivateLink, or renumber path;
- service endpoints and egress behavior.

Do not assert that a dedicated circuit is automatically encrypted or redundant.

### 3. Design hybrid DNS

Show private hosted zones, Route 53 Resolver inbound/outbound endpoints,
domain-specific forwarding rules, on-premises resolvers, conditional forwarding,
query logging, and failure behavior. Prevent:

- `0.0.0.0/0`-style open resolver access;
- forwarding loops;
- one endpoint or AZ as a single failure;
- split-horizon ambiguity;
- accidental public publication of private names.

### 4. Design identity

Separate workforce, workload, device, and legacy directory identities. Include:

- corporate IdP federation and group lifecycle;
- permission sets and account assignments;
- least-privilege cross-account roles with source/confused-deputy conditions;
- workload role delivery without embedded keys;
- legacy directory trust boundary and retirement;
- session duration, elevation, break glass, revocation, and audit;
- behavior during IdP, directory, DNS, and network outage.

### 5. Model failures and operations

Tabletop at least:

1. primary Direct Connect location failure;
2. one VPN tunnel failure;
3. bad route advertisement;
4. inspection appliance/AZ failure;
5. Resolver endpoint failure or loop;
6. corporate IdP outage;
7. compromised privileged session;
8. Region isolation.

For each define detection, automatic/manual action, convergence target,
customer impact, evidence, rollback, owner, and residual risk.

## Required deliverables

1. Business requirements and current-state findings.
2. Current/target diagrams showing trust, route, DNS, Region, and failure
   boundaries.
3. Traffic, route, CIDR, DNS, identity, and encryption matrices.
4. Target route tables with association/propagation logic and sample path
   traces.
5. Hybrid DNS resolution traces for both directions.
6. Workforce/workload identity and break-glass design.
7. Monitoring, incident RACI, capacity/quota, and cost model.
8. Transition phases, rollback, and acquisition renumber plan.
9. At least three ADRs: transit, overlap, and identity.
10. Risk register, failure-tabletop evidence, and defense responses.

## Validation and review criteria

- Every required flow has an explicit forward and return path and least
  privilege boundary.
- Production and sandbox cannot route to each other.
- Stateful inspection remains symmetric in normal and degraded states.
- Prefix policy blocks partner transit and unexpected defaults.
- Critical hybrid connectivity has independent failure paths and measured
  convergence.
- DNS traces identify authority and next hop without loops or public leakage.
- Sensitive traffic has an encryption mechanism, not an assumption about
  Direct Connect.
- Workforce and workloads use temporary credentials; break glass is monitored
  and tested.
- Overlap is isolated without relying on impossible transitive peering.
- Latency, throughput, MTU, quotas, and cost assumptions are quantified.

## Evidence

- Sanitized diagrams and route/DNS truth tables.
- Synthetic path, latency, and name-resolution results.
- BGP/route tabletop changes and expected convergence timestamps.
- Identity policy evaluation and redacted authentication events.
- Failure exercise record, ADR approvals, and risk acceptance.
- Cost calculations with date, Region, volume, and pricing assumptions.

Never store real CIDRs, account IDs, directory details, endpoints, credentials,
certificates, or customer traffic.

## Rubric

| Criterion | Weight |
| --- | ---: |
| Requirements, traffic, and CIDR analysis | 10 |
| Routing domains and path correctness | 20 |
| Resilience, convergence, and inspection symmetry | 15 |
| DNS authority and failure design | 10 |
| Workforce/workload identity and break glass | 15 |
| Security, encryption, and evidence | 10 |
| Transition, operations, cost, and quotas | 10 |
| ADRs, risks, and defense | 10 |

Score each 0-5. Pass at 80 or higher, with at least 3/5 in routing, resilience,
DNS, identity, and security. Any unexplained production-sandbox route, forwarding
loop, embedded credential, or asymmetric inspection path is an automatic rework.

## Defense questions

1. Trace a Tier 1 packet and its return path during normal operation.
2. What changes when the preferred Direct Connect location fails?
3. Why is one larger Direct Connect connection not high availability?
4. How is unexpected BGP transit prevented?
5. Why can VPC peering not implement the proposed transit?
6. How are overlapping networks isolated and eventually renumbered?
7. Trace an on-premises query for an AWS private name and the reverse.
8. What happens to access during IdP and directory outages?
9. How does a workload prove identity without a long-lived key?
10. Which cost grows fastest with centralized inspection and why?

## Optional paid sandbox

In a separately governed paid or AWS-managed sandbox only, implement a reduced
two-VPC route and DNS simulation with synthetic CIDRs and no customer network.
Transit Gateway or Resolver endpoints may incur hourly and processing cost.
Budget approval, exact resource names, tags, and a same-session teardown are
mandatory. Do not attempt real Direct Connect provisioning for this capstone.

## Cleanup for optional sandbox

The default design-only exercise has no cloud cleanup.

For the optional sandbox:

1. Stop synthetic traffic and remove test records/rules.
2. Delete exact named Resolver forwarding rules and disassociate them.
3. Delete Resolver endpoints after their network interfaces are released.
4. Delete Transit Gateway routes, then attachments, route tables, and the
   Transit Gateway.
5. Delete test endpoints, load balancers, NAT Gateways, and release their exact
   Elastic IP addresses.
6. Delete route-table entries, subnets, security groups, and VPCs.
7. Delete test IAM roles/policies and log groups created for the sandbox.
8. Verify both Regions, global IAM/Route 53 resources, and Billing/usage.

Use exact identifiers, never wildcard destructive commands.

## Official references

- [AWS VPC connectivity options](https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/welcome.html)
- [AWS Transit Gateway](https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html)
- [Direct Connect resiliency recommendations](https://docs.aws.amazon.com/directconnect/latest/UserGuide/resiliency_toolkit.html)
- [Route 53 Resolver](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html)
- [IAM Identity Center](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html)
