# Level 300-400 Enterprise Architecture Depth

This track develops architecture judgment for AWS Certified Solutions Architect - Professional (SAP-C02). It is not a catalog of services. Every module requires boundary analysis, quantified recovery objectives, operational ownership, cost modeling, and defense of rejected alternatives.

## Safety and cost posture

The learning account starts on the current AWS Free plan.

> Joining AWS Organizations or setting up AWS Control Tower automatically upgrades a Free-plan account to a Paid plan. The governance exercises in this track are `DESIGN-ONLY`. Do not enable either service merely to complete the course.

Direct Connect, Transit Gateway, NAT Gateway, EKS, OpenSearch Service, Amazon MSK, and persistent multi-Region databases are also `DESIGN-ONLY` unless a learner has a separately governed paid sandbox and deliberately accepts the cost. Cost-safe exercises use policy simulation, local route analysis, template review, failure games, spreadsheets, logs, diagrams, and ADRs.

## SAP-C02 mapping

| Domain | Weight | Track coverage |
| --- | ---: | --- |
| Domain 1: Design Solutions for Organizational Complexity | 26% | Modules 1-3, 8 |
| Domain 2: Design for New Solutions | 29% | Modules 3-6, 9 |
| Domain 3: Continuous Improvement for Existing Solutions | 25% | Modules 4-6, 8-9 |
| Domain 4: Accelerate Workload Migration and Modernization | 20% | Modules 6-8 |

AWS can include unscored pretest questions. Emerging services are studied as architecture signals, not as guaranteed scored coverage. Module 9 labels AgentCore topics accordingly and anchors decisions in durable security principles.

## Sequence

| Order | Module | Principal defense |
| --- | --- | --- |
| 1 | [Multi-account governance](01-multi-account-governance/README.md) | Boundaries, delegated administration, SCP evaluation |
| 2 | [Federation and central security](02-federation-central-security/README.md) | Human/workload trust and detection ownership |
| 3 | [Hybrid networking](03-hybrid-networking/README.md) | Routing, DNS, segmentation, and failure convergence |
| 4 | [Multi-Region disaster recovery](04-multi-region-dr/README.md) | RTO/RPO, data authority, failover and failback |
| 5 | [Observability and incident response](05-observability-incident-response/README.md) | Telemetry contracts, response authority, resilience tests |
| 6 | [Data platforms](06-data-platforms/README.md) | Data domains, streaming semantics, governance and cost |
| 7 | [Migration and modernization](07-migration-modernization/README.md) | Portfolio discovery, dependency waves, rollback |
| 8 | [FinOps and quotas](08-finops-quotas/README.md) | Unit economics, commitments, allocation, capacity |
| 9 | [Responsible AI controls](09-responsible-ai-controls/README.md) | Model/agent trust, guardrails, approval, evidence |

## Track-wide rules

1. Start from business outcomes and hard constraints, not service preferences.
2. Mark each control as preventive, detective, responsive, or recovery.
3. Treat accounts, Regions, identity systems, DNS, pipelines, quotas, and humans as failure domains.
4. Quantify RTO, RPO, maximum tolerable data loss, and decision deadlines.
5. Model normal, degraded, recovery, and rollback states.
6. Include transfer, processing, logging, support, licensing, and labor in cost arguments.
7. Keep evidence non-sensitive. Never record account IDs, credentials, private endpoints, or customer data.
8. Do not deploy anything from this track unless a file explicitly changes the `DESIGN-ONLY` label and includes cleanup.

## Final gate

Create one portfolio architecture that combines all nine modules. Defend it to a mock architecture review board. The defense must include:

- organizational and trust boundaries;
- network, Region, and service failure domains;
- numeric service-level and recovery objectives;
- migration waves with rollback gates;
- security and compliance evidence;
- operational ownership and incident authority;
- quotas and 10x growth behavior;
- three-year unit economics and commitment risk;
- AI data/action controls where AI is present.

## Official references

- [SAP-C02 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.html)
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
- [Choosing an AWS Free Tier plan](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html)
- [AWS Architecture Center](https://aws.amazon.com/architecture/)
