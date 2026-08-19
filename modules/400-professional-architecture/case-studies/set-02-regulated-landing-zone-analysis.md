# Case Study 2 Deep Analysis

Open this file only after completing
[the scenario](set-02-regulated-landing-zone.md).

## Requirement hierarchy

Regulatory separation, immutable evidence, mandatory controls, identity
lifecycle, and production isolation are hard gates. Four-hour account vending is
an operational objective. Existing-account onboarding must be staged. Region
exceptions and overlapping CIDRs make one-step standardization unsafe.

## Decision 1 answer: B

OUs should group accounts with common policy intent and lifecycle. Foundational
accounts receive different controls from workloads; production differs from
sandbox; exceptions and suspended accounts need deliberate containment.
Delegated administration reduces management-account activity. Account vending
can apply approved baselines, identity assignments, logging, networks, budgets,
and ownership metadata.

Enrollment should use waves: inventory, policy-effect simulation, remediation,
non-production pilot, production canary, and scale. Rollback means moving an
account to a known-safe transitional OU or reverting the latest baseline change,
not disabling organization-wide security.

### Explicit distractor rejection

- **A confuses permissions and metadata.** An OU cannot receive an administrator
  identity policy, and tags alone do not create hard isolation or reliable
  exception handling.
- **C expands the highest-impact blast radius.** The management account should
  not host workloads; its credentials and actions govern the organization.
- **D cannot enforce central controls or consolidate evidence** and fails the
  stated governance requirement.

## Decision 2 answer: B

Federation centralizes joiner, mover, and leaver lifecycle. Permission sets grant
account roles; SCPs and permission boundaries constrain the maximum. Time-bound
elevation limits persistent privilege, while break glass needs separate
credentials, monitoring, testing, and post-use review.

Organization-level trails and security aggregation provide coverage. Evidence
lands in a log archive boundary where workload operators cannot change retention
or delete objects. Security tooling administration and evidence custody remain
separate enough to support investigation integrity.

Effective permission is evaluated from all applicable policies. An action must
be allowed by an identity or resource policy and remain inside permission
boundaries, session policies, and SCP maximums; an explicit deny wins.

### Explicit distractor rejection

- **A creates credential sprawl** and weakens central lifecycle, MFA consistency,
  attribution, and revocation.
- **C violates separation of duties** because the subject of investigation can
  alter its own evidence and controls.
- **D cannot work because SCPs do not grant permission.** With no identity or
  applicable resource allow, the action remains denied.

## Decision 3 answer: B

Transit Gateway supports scalable hub-and-spoke connectivity and separate route
tables for routing domains. Associations and propagations must be explicit.
Inspection requires symmetric forward and return routing. Resolver endpoints and
domain-specific forwarding rules support hybrid DNS without an open recursive
resolver. Overlap can be handled by renumbering, isolation, application proxies,
or suitable PrivateLink publication; it cannot be wished away by transit.

### Explicit distractor rejection

- **A is not transitive.** VPC peering does not allow a VPC to route through a
  peer to another VPC, and full mesh becomes operationally expensive.
- **C removes account/VPC blast-radius controls, creates address and quota
  pressure, and conflicts with product isolation.**
- **D leaks internal naming and does not solve routing.** Security groups do not
  make publishing private addresses in public DNS an acceptable private DNS
  design.

## Legacy Region exception lifecycle

Create a narrowly scoped exceptions OU or policy mechanism with named owner,
business justification, allowed accounts/actions, compensating controls,
telemetry, approval, issue link, and expiration date. Test the restrictive
policy in simulation and non-production. Before expiry, migrate the dependency
or renew through explicit risk acceptance. Automated alerts escalate upcoming
expiration; they do not blindly attach a deny that could cause production loss.

## Cost and operations

Use account ownership as the primary allocation boundary, mandatory product and
environment tags for supported resources, and cost categories for shared
mapping. Allocate shared transit, inspection, logging, and support with a
documented driver such as bytes, accounts, or direct spend. Every anomaly has a
product owner and response SLA. Price Config evaluations, security ingestion,
NAT, transit processing, endpoints, and inter-Region transfer.

## Example ADR

- **Decision:** Use policy-oriented OUs with staged enrollment.
- **Drivers:** regulatory boundaries, rapid vending, acquisitions, exceptions,
  and no broad outage.
- **Consequences:** more lifecycle automation and policy testing; clear
  inheritance, quarantine, and delegated ownership.
- **Rejected:** flat OU is too coarse; independent accounts cannot enforce.
- **Review trigger:** control objectives or enterprise operating model changes.

## Example risks

| Risk | Trigger | Mitigation | Owner | Residual |
| --- | --- | --- | --- | --- |
| SCP blocks production | Simulation/canary failure | Staged rollout and safe transitional OU | Platform | Unknown service action |
| IdP outage | Federation health alarm | Tested break glass and incident process | Identity | Reduced access during outage |
| CIDR overlap | Route conflict | Isolate, renumber, proxy, or PrivateLink | Network | Temporary complexity |
| Log archive compromise | Integrity finding | Separate custody, retention, monitoring | Security | Privileged insider |
| Exception never closes | Expiry alert | Named risk owner and board escalation | Compliance | Approved temporary exposure |

## Defense answers

An SCP filters the maximum available permission; it supplies no allow to a
principal. The Region exception expires safely through ownership, compensating
controls, early alerts, dependency migration, staged policy tests, and an
approved renewal or cutover rather than an untested automatic deny.
