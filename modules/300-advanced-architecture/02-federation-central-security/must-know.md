# Must know: Federation, Cross-Account Trust, and Central Security

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
| Human workforce at enterprise scale | IAM Identity Center with external IdP and permission sets | Per-account IAM users or shared roles |
| AWS workload to AWS workload | Role assumption or resource policy with tightly scoped principals/conditions | Long-lived access keys |
| Third-party deputy | External ID plus exact principal, scoped permissions, and rotation/offboarding | Guessable role name alone |
| Emergency IdP outage | Vaulted, monitored, time-limited break-glass path tested regularly | Permanent unmonitored administrator |
| Central finding aggregation | Delegated security account with member-account response runbooks | All response power in management account |

## Deep analysis

- Authentication proves an identity; authorization permits an action. Federation maps external identity context into temporary AWS sessions.
- A role trust policy answers who may assume; identity policies answer what callers may request; role permissions and boundaries cap the resulting session.
- Use aws:PrincipalOrgID, exact principal ARNs, ExternalId for third parties, SourceIdentity, session tags, and MFA conditions only where their provenance is controlled.
- ABAC scales only when tag issuance and mutation are governed. An attacker who can self-assign authorization tags controls the policy.
- Centralize immutable evidence and finding normalization, but retain workload context and pre-authorized containment in member accounts.
- Break-glass is a separate recovery control: independent authentication, dual approval where feasible, short duration, alerting, and post-use review.
- Cross-account KMS access requires both key policy and caller permission; changing either side can break recovery.

## Failure and blast-radius checklist

- Name the smallest unit that can fail without affecting another workload.
- Distinguish data-plane continuity from control-plane changes during an incident.
- Identify correlated dependencies: shared identity, DNS, KMS, quotas, pipelines, and operators.
- State the recovery authority and the evidence required before failover or rollback.
- Quantify RTO and RPO per business transaction; "highly available" is not a target.
- Test degraded modes, not only total outages.
- Prevent a compromised workload identity from becoming an organization-wide principal.

## Exam traps

- Using an external ID as a secret instead of a confused-deputy discriminator.
- Wildcard Principal in role trust with weak conditions.
- Assuming IAM Identity Center availability is identical to every workload Region.
- Centralizing logs but failing to delegate incident authority.
- Allowing users to set the same session tags used for authorization.

## Retrieval prompts

1. Which requirement drives the boundary, and which service is merely an implementation?
2. What is the largest credible correlated failure?
3. What must remain available if the AWS control plane or enterprise identity provider is impaired?
4. Which cost is fixed even at zero traffic?
5. What evidence proves the control works rather than merely exists?

## Official references

- [IAM Identity Center concepts](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html)
- [IAM role trust policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_manage_modify.html)
- [Confused deputy prevention](https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html)
- [IAM policy evaluation](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html)
- [Security Reference Architecture](https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/welcome.html)
