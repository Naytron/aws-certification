# Domain 1: Design Solutions for Organizational Complexity

**Weight: 26% of scored content**

## What must be integrated

The official tasks cover connectivity, security controls, resilience,
multi-account environments, and cost visibility. The professional distinction
is policy and ownership across many accounts, teams, Regions, and networks.

## Decision map

| Need | Start with | Critical check |
| --- | --- | --- |
| Account isolation and delegated ownership | Organizations OUs and accounts; Control Tower when approved | SCPs set permission boundaries but do not grant permissions |
| Workforce access | IAM Identity Center with external IdP where required | Permission-set scope, break glass, session duration, and identity outage |
| Workload cross-account access | Resource policies or assumed roles | Confused-deputy controls, external ID or source conditions, and audit trail |
| Many VPCs and hybrid routes | Transit Gateway and explicit route domains | CIDR overlap, transitivity, inspection symmetry, DNS, quotas, and cost |
| Private service publishing | PrivateLink | Consumer-initiated access and protocol limitations |
| Central security | Delegated administrators and archive/security accounts | Log immutability, finding aggregation, response authority, and Region coverage |
| Cost allocation | Account boundaries plus mandatory business tags | Untaggable shared cost, allocation categories, and unit owner |

## Professional reasoning

- Put hard isolation boundaries in accounts, not only VPCs or tags.
- Design OUs around policy intent and lifecycle, not a fragile organization
  chart.
- Keep the management account free of workloads. Delegate supported service
  administration.
- Separate log archive from security tooling and define who can read, alter, and
  respond.
- Evaluate effective permission as the intersection of identity and resource
  policies, permission boundaries, session policies, and SCPs, with any explicit
  deny winning.
- Model network propagation and return paths. A hub does not create permission,
  route symmetry, DNS resolution, or encryption by itself.
- Choose DR from business RTO/RPO and dependency behavior, then price it.
- Expose shared cost with accounts, tags, CUR data, budgets, and accountable
  owners before buying commitments.

## Common traps

- Using an SCP to grant access.
- Enabling Control Tower in the course Free-plan account.
- One flat production OU with broad exceptions.
- A single Direct Connect circuit presented as resilient.
- Central inspection without symmetric routing.
- Central logs whose administrators can delete evidence.
- Multi-Region selected without data-authority or failback design.

## Practice artifacts

Create an OU/account map, effective-permission trace, route and DNS matrix,
delegated-admin RACI, cost allocation model, ADR, and risk register.

## Official references

- [Official Domain 1 outline](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02-domain1.html)
- [AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html)
- [Designing a Control Tower landing zone](https://docs.aws.amazon.com/prescriptive-guidance/latest/designing-control-tower-landing-zone/introduction.html)
- [AWS VPC connectivity options](https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/welcome.html)
