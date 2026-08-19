# Must Know: VPC Networking and DNS

**Level:** 100 | **Cost:** `DESIGN-ONLY` | **SAA-C03:** Design Secure Architectures; Design Resilient Architectures; Design High-Performing Architectures

## Decision table

| Requirement | Prefer | Decision rule |
| --- | --- | --- |
| Resource must receive internet-initiated traffic | Public route plus public address and allowed security controls | A subnet is public because of routing, not its name. |
| Private workload needs outbound IPv4 internet | NAT design in a later paid/sandbox lab | NAT Gateways cost money and are prohibited in this track. |
| Instance-to-instance allowlist | Security groups | Stateful resource-level filtering. |
| Subnet-level explicit allow and deny | Network ACL | Stateless rules require both directions. |
| Private DNS namespace in VPCs | Route 53 private hosted zone | Resolution is associated to selected VPCs. |

## Service and responsibility boundaries

- A VPC is Regional; each subnet belongs to exactly one AZ.
- Route tables decide where traffic can go; security controls decide whether it is permitted.
- Security groups are stateful and allow-only; network ACLs are stateless and support allow/deny.
- Route 53 is authoritative DNS and health-aware routing; it is not a packet load balancer.

## Failure modes

| Failure | Observable effect | Response |
| --- | --- | --- |
| Overlapping CIDRs | Peering/hybrid routing becomes ambiguous | Plan non-overlapping address space. |
| 0.0.0.0/0 ingress to admin ports | Unnecessary attack exposure | Restrict sources and prefer managed access paths. |
| Private subnet with no required service path | Updates or APIs fail | Provide deliberate endpoints or egress; do not add NAT blindly. |
| NACL return path omitted | Connections fail despite an allow | Model stateless inbound and outbound ephemeral traffic. |

## Common exam distractors

- A subnet called private is not private if its routing and addresses expose resources.
- A security group deny rule cannot be added; use narrower allows or another control.
- VPC peering is not transitive.

Reject an answer because it violates a stated requirement, not merely because another service is more familiar.

## Recall prompts

1. State the hardest requirement that selects each service or pattern.
2. Name the failure boundary and the customer-owned configuration.
3. Explain one cheaper option and the requirement it fails.
4. Explain one more complex option and why it is premature.

## Official references

- [What is Amazon VPC?](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [VPC route tables](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html)
- [Security groups and network ACLs](https://docs.aws.amazon.com/vpc/latest/userguide/infrastructure-security.html)
- [Route 53 routing policies](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html)
