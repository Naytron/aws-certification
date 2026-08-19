# Must know: Hybrid Networking, Routing, DNS, and Segmentation

## Decision frame

For every design, separate:

1. **Business objective** - the outcome and tolerated loss, not a preferred service.
2. **Hard constraints** - legal boundary, RTO/RPO, identity authority, data residency, and migration window.
3. **Failure domains** - account, Availability Zone, Region, identity provider, network, control plane, and operator.
4. **Trust boundaries** - who authenticates, who authorizes, who can assume or delegate, and where credentials exist.
5. **Operations** - owner, telemetry, runbook, escalation, test cadence, and rollback authority.
6. **Economics** - fixed baseline, variable usage, data processing/transfer, licenses, commitments, and people cost.

## Decision table

| Signal | Prefer | Reject or challenge |
| --- | --- | --- |
| Many VPCs need transitive routing | Transit Gateway or Cloud WAN in a paid enterprise design | Large peering mesh |
| Expose one service without broad routing | PrivateLink endpoint service | Full network adjacency |
| Low-cost learning validation | Local route-table simulation and diagrams | Deploying Transit Gateway or NAT Gateway |
| Predictable private bandwidth | Redundant Direct Connect with independent paths plus VPN where required | Single Direct Connect as HA |
| Hybrid DNS | Route 53 Resolver endpoints/rules with explicit authority | Ad hoc forwarding in every VPC |

## Deep analysis

- A route must exist in both directions; security controls and stateful appliances must see symmetric flows. A successful outbound traceroute does not prove return routing.
- Transit Gateway attachments associate with one route table and can propagate to multiple tables. Segmentation requires intentional association, propagation, static/blackhole routes, and appliance mode decisions.
- Direct Connect is not encrypted by default. Use MACsec where supported or IPsec/private connectivity patterns when encryption is required.
- Two virtual interfaces on one physical connection are not independent. Model device, location, provider, conduit, BGP session, and Region dependencies.
- Route 53 Resolver inbound endpoints receive DNS queries into VPCs; outbound endpoints forward selected queries outward. Rule priority and authority must prevent loops.
- Overlapping CIDRs constrain routed integration; PrivateLink, proxies, translation, renumbering, or application-layer integration can avoid broad connectivity.
- Model per-hour attachment/endpoint/gateway charges, data processing at each hop, inter-AZ/Region transfer, and centralized egress hairpinning.
- NAT Gateway, Transit Gateway, Direct Connect, and interface endpoints can create material fixed or processing cost; all are design-only here.

## Failure and blast-radius checklist

- Name the smallest unit that can fail without affecting another workload.
- Distinguish data-plane continuity from control-plane changes during an incident.
- Identify correlated dependencies: shared identity, DNS, KMS, quotas, pipelines, and operators.
- State the recovery authority and the evidence required before failover or rollback.
- Quantify RTO and RPO per business transaction; "highly available" is not a target.
- Test degraded modes, not only total outages.
- Prevent a compromised workload identity from becoming an organization-wide principal.

## Exam traps

- Treating a second VPN tunnel in one customer device as complete path diversity.
- Assuming security groups solve missing or asymmetric routes.
- Propagating every attachment into every Transit Gateway route table.
- Forwarding the same DNS zone in both directions and creating a loop.
- Ignoring inter-AZ data processing through centralized appliances.

## Retrieval prompts

1. Which requirement drives the boundary, and which service is merely an implementation?
2. What is the largest credible correlated failure?
3. What must remain available if the AWS control plane or enterprise identity provider is impaired?
4. Which cost is fixed even at zero traffic?
5. What evidence proves the control works rather than merely exists?

## Official references

- [Transit Gateway design best practices](https://docs.aws.amazon.com/vpc/latest/tgw/tgw-best-design-practices.html)
- [Direct Connect resiliency](https://docs.aws.amazon.com/directconnect/latest/UserGuide/resiliency_toolkit.html)
- [Route 53 Resolver overview](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html)
- [AWS PrivateLink concepts](https://docs.aws.amazon.com/vpc/latest/privatelink/concepts.html)
- [Site-to-Site VPN tunnel options](https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNTunnels.html)
