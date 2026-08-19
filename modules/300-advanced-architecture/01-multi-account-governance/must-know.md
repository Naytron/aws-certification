# Must know: Multi-Account Governance and Landing Zones

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
| Independent legal or regulatory boundary | Separate organization or explicitly isolated account hierarchy with separate root/billing authority | One giant OU tree assumed to be a security boundary |
| Different workload lifecycle or operator | Separate account; apply controls by OU/tag only where enforceable | VPC-only isolation for unrelated teams |
| Prevent action across member accounts | SCP as a maximum-permission guardrail plus identity authorization | SCP as a permission grant |
| Central service ownership | Delegated administrator in a security/tooling account | Routine administration from the management account |
| Frequent exception | Redesign guardrail scope and time-bound exception workflow | Permanent allow-list attached high in the tree |

## Deep analysis

- An AWS account is an authorization, quota, billing, and API blast-radius boundary; an OU is a policy attachment and lifecycle grouping, not a runtime boundary.
- SCP effective permission is the intersection of applicable SCP allows with identity/resource authorization; any applicable explicit deny wins. SCPs do not affect the management account and do not grant permissions.
- Keep workloads out of the management account. Restrict its principals, email, root process, and network access; use it for organization-only tasks.
- Separate preventive controls from detective controls. SCPs cannot express every resource configuration; use Config, CloudTrail, Security Hub, and remediation with evidence.
- Control Tower supplies opinionated controls and account lifecycle automation but adds governed-region, drift, update, and customization obligations.
- Policy changes are deployments: test against an inventory of used APIs, canary an OU, observe, then expand with a rollback owner.
- Acquisitions may require staged trust between organizations before account moves; moving accounts changes policy inheritance and billing ownership.

## Failure and blast-radius checklist

- Name the smallest unit that can fail without affecting another workload.
- Distinguish data-plane continuity from control-plane changes during an incident.
- Identify correlated dependencies: shared identity, DNS, KMS, quotas, pipelines, and operators.
- State the recovery authority and the evidence required before failover or rollback.
- Quantify RTO and RPO per business transaction; "highly available" is not a target.
- Test degraded modes, not only total outages.
- Prevent a compromised workload identity from becoming an organization-wide principal.

## Exam traps

- Assuming FullAWSAccess overrides a deny attached at a parent OU.
- Using the management account as the central security workload account.
- Putting production and development in one account because tags exist.
- Applying a Region deny without exemptions for global services and required control planes.
- Treating Control Tower enrollment as free or reversible without planning.

## Retrieval prompts

1. Which requirement drives the boundary, and which service is merely an implementation?
2. What is the largest credible correlated failure?
3. What must remain available if the AWS control plane or enterprise identity provider is impaired?
4. Which cost is fixed even at zero traffic?
5. What evidence proves the control works rather than merely exists?

## Official references

- [SAP-C02 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.html)
- [AWS Organizations terminology](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html)
- [SCP evaluation](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_evaluation.html)
- [Control Tower concepts](https://docs.aws.amazon.com/controltower/latest/userguide/how-control-tower-works.html)
- [Free Tier plans](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html)
