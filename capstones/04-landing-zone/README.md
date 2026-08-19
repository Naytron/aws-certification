# Capstone 04: Enterprise Landing-Zone Simulation

## Profile

| Field | Value |
| --- | --- |
| Level | 400 |
| Cost label | `DESIGN-ONLY` |
| Deployment | None in the course account |
| SAP-C02 emphasis | Domains 1, 2, and 3 |
| Time box | 12-16 hours plus a 35-minute defense |

> Do not enable AWS Organizations or AWS Control Tower in the Free-plan learning
> account. Either action automatically upgrades the account to a Paid plan.
> This capstone is a document, policy-evaluation, and tabletop simulation.

## Scenario

An enterprise will consolidate 140 accounts from four business units. It must
vend a governed account in four business hours, preserve product autonomy,
enforce regulated controls, support acquisitions, allocate cost, and provide
central incident response. Existing accounts have policy drift, three identity
providers, inconsistent logging, and Region exceptions.

## Requirements

- Keep workloads out of the organization management account.
- Separate platform, security, network, production, non-production, sandbox,
  exceptions/quarantine, and suspended lifecycle needs.
- Federate workforce access from a corporate identity source with MFA, group
  lifecycle, least privilege, elevation, and tested break glass.
- Prevent member accounts from disabling mandatory audit, encryption,
  public-access, and approved-Region controls.
- Preserve product teams' ability to operate inside their authorized boundary.
- Separate log custody, security investigation, platform administration, and
  application operation.
- Aggregate security findings and define response authority across accounts and
  Regions.
- Supply approved connectivity, DNS, backup, observability, budgets, and owner
  metadata during account vending.
- Allocate direct and shared costs to products and assign anomaly response.
- Enroll existing accounts in waves without broad production outages.
- Govern temporary exceptions with owner, compensating control, expiry, and
  review.

## Constraints

- Two workloads need a restricted Region for six months.
- One acquisition cannot federate its identity source for 90 days.
- Some controls are detective rather than preventive.
- Security has 24x7 response; platform operates business hours.
- The design must handle policy size/attachment quotas and service Region
  coverage.

## Work to perform

### 1. Define the operating model

Create a RACI for management-account actions, account vending, identity,
network, keys, logs, security findings, backup, policy, exceptions, cost, and
incident response. State which services use delegated administration and why.

### 2. Design accounts and OUs

Use OUs to express policy intent and lifecycle, not only the reporting
organization. Define:

- foundational accounts and administrative separation;
- workload environment boundaries;
- sandbox limits;
- exception/quarantine and suspended account behavior;
- nested policy inheritance and attachment strategy;
- account move approval and evidence;
- acquisition and divestiture lifecycle.

### 3. Design control architecture

For each control state whether it is preventive, proactive, detective,
responsive, or recovery. Map it to control objective, scope, enforcement or
detection mechanism, owner, exception process, evidence, and failure behavior.

Show effective permission for three examples. Include identity/resource allows,
permissions boundaries, session policies, SCPs, and explicit denies. State
clearly that SCPs constrain maximum available permission but do not grant it.

### 4. Design the account-vending product

Define request, approval, unique email/owner, OU placement, baseline deployment,
identity assignment, network choice, logging/security enrollment, backup,
budgets, tags, validation, handoff, and rollback. The four-hour objective must
have measured stage budgets and an escalation path.

### 5. Plan staged enrollment

Create waves for inventory, policy simulation, remediation, non-production
pilot, production canary, and scale. Define a safe transitional OU, entry/exit
gates, rollback, communications, and evidence. An enrollment failure must not be
fixed by disabling mandatory organization-wide evidence.

### 6. Model cost and quotas

Include account-level direct costs and allocation of transit, inspection,
endpoints, logs, configuration recording, security services, support, and shared
platform labor. Define anomaly owner/SLA and policy, account, stack, and API
quota monitoring.

## Required deliverables

1. Executive summary, assumptions, and requirement traceability.
2. OU/account diagram and account lifecycle.
3. Organization management/delegated-administrator RACI.
4. Identity flow, permission-set catalog, elevation, and break-glass runbook.
5. Control catalog and three effective-permission traces.
6. Central logging, finding, backup, and incident-response design.
7. Account-vending workflow with stage times and rollback.
8. Existing-account enrollment waves and exception lifecycle.
9. Cost allocation, anomaly, and quota model.
10. At least three ADRs: OU design, identity model, and evidence custody.
11. Risk register and architecture-defense responses.

## Validation and review criteria

- No workload or routine service administration depends on the management
  account.
- Every account has owner, environment, data classification, cost center,
  support, and lifecycle state.
- Mandatory controls have evidence and an exception path that cannot silently
  become permanent.
- Effective-permission examples are technically correct; no SCP grants access.
- Workload operators cannot alter retained audit evidence.
- Break glass is independent enough to cover identity-provider failure and is
  monitored/tested.
- Account vending meets four hours without skipping security validation.
- Enrollment has canary, stop, rollback, and safe transitional behavior.
- Region exceptions have narrow scope, compensating controls, and expiration.
- Shared cost and security/operations ownership are explicit.

## Evidence

- Versioned diagrams and policy pseudocode.
- Redacted policy-evaluation truth tables.
- Account-vending tabletop timestamps.
- Example control findings and response tickets using synthetic identifiers.
- Enrollment rehearsal results and stop/rollback decisions.
- ADR approvals, exception decision, quota calculations, and risk acceptance.

Never record account IDs, full ARNs, identity attributes, credentials, private
endpoints, or production data.

## Rubric

| Criterion | Weight |
| --- | ---: |
| Organization/account/OU lifecycle | 15 |
| Identity and effective permissions | 15 |
| Controls, evidence custody, and security response | 15 |
| Vending automation, validation, and rollback | 15 |
| Enrollment waves and exception governance | 10 |
| Network/backup/observability integration | 10 |
| Cost, quotas, operations, and RACI | 10 |
| ADRs, risks, and defense | 10 |

Score each 0-5. Weighted score is `sum(score / 5 * weight)`. Pass at 80 or
higher, with at least 3/5 in organization, identity, controls, and vending. Any
design that enables Organizations or Control Tower in the Free-plan account
fails the safety gate.

## Defense questions

1. Why are OUs based on policy intent rather than the org chart?
2. Why should the management account remain workload-free?
3. Walk through an effective allow and an explicit deny.
4. How does break glass work if the corporate IdP is unavailable?
5. Who can alter log retention, and who can investigate?
6. What happens when a new SCP blocks a production service action?
7. How is a six-month Region exception prevented from becoming permanent?
8. How are shared transit and security costs assigned fairly?
9. How is an acquired account enrolled without losing audit continuity?
10. What evidence proves account vending meets four hours?

## Cleanup

The required capstone is design-only and creates no AWS resources, so cloud
cleanup is not applicable. Remove any local scratch exports that contain
sensitive identifiers; keep only sanitized evidence.

Do not create an optional course-account deployment. If an instructor provides
an AWS-managed organization sandbox, follow that sandbox's reset procedure and
verify the lab accounts, permission assignments, policies, stacks, and temporary
identity objects were reset. Do not attempt to dismantle a governed organization
without its owner.

## Official references

- [Designing an AWS Control Tower landing zone](https://docs.aws.amazon.com/prescriptive-guidance/latest/designing-control-tower-landing-zone/introduction.html)
- [AWS Organizations terminology and concepts](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html)
- [Service control policies](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html)
- [IAM Identity Center](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html)
- [AWS Security Reference Architecture](https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/welcome.html)
