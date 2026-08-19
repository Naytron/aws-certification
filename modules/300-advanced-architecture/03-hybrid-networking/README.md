# Hybrid Networking, Routing, DNS, and Segmentation

## Level and exam mapping

- Level: 300-400
- SAP-C02 domains: Domain 1 - Organizational Complexity; Domain 2 - New Solutions
- Cost label: `DESIGN-ONLY`
- Default account impact: none

> The course account begins on the AWS Free plan. This module creates no AWS resources. Never convert the account to a Paid plan merely to complete an exercise.

## Why this is level 400

Hybrid connectivity is a distributed system. You must prove bidirectional route propagation, DNS authority, encryption, segmentation, convergence, and capacity across administrative domains while identifying expensive fixed network components and common-mode failures.

## Outcomes

After this module, you can:

1. Select hub, mesh, PrivateLink, peering, and service-insertion patterns by requirement.
2. Analyze BGP, route-table, prefix, asymmetry, MTU, and overlapping-address failures.
3. Design hybrid DNS authority and resolver endpoints without loops.
4. Quantify path capacity, convergence, and connectivity RTO.
5. Compare VPN, Direct Connect, Transit Gateway, and cost-safe substitutes.

## Prerequisites

- VPC routing, security groups, NACLs, Route 53, and TLS
- CIDR arithmetic and basic BGP concepts
- Multi-account ownership model

## Workflow

1. Read [must-know.md](must-know.md) and restate each decision rule.
2. Complete [guided-lab.md](guided-lab.md).
3. Rebuild the analysis independently in [challenge-lab.md](challenge-lab.md).
4. Use [hands-on-exercise.md](hands-on-exercise.md) as an additional simulation workbook.
5. Defend [architecture-scenario.md](architecture-scenario.md) as if presenting to an architecture review board.
6. Check the observable gates in [validation.md](validation.md).
7. Complete the explicit no-cloud verification in [cleanup.md](cleanup.md).
8. Take [quiz.md](quiz.md) closed-book, then review [answers.md](answers.md).

## Evidence required

- A boundary diagram showing organization, trust, network, data, and failure boundaries
- The completed analysis artifact requested by the exercise
- An architecture decision record (ADR) with assumptions and rejected alternatives
- A failure or rollback analysis
- A cost and operational ownership statement
- A closed-book quiz score and corrected error-log entries

## Completion gate

You are complete only when you can defend the selected design, identify its residual risks, name its owner, and explain how the decision changes when one hard constraint changes.

## Official references

- [Transit Gateway design best practices](https://docs.aws.amazon.com/vpc/latest/tgw/tgw-best-design-practices.html)
- [Direct Connect resiliency](https://docs.aws.amazon.com/directconnect/latest/UserGuide/resiliency_toolkit.html)
- [Route 53 Resolver overview](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html)
- [AWS PrivateLink concepts](https://docs.aws.amazon.com/vpc/latest/privatelink/concepts.html)
- [Site-to-Site VPN tunnel options](https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNTunnels.html)
