# Hands-on exercise: Evaluate cross-account trust and a compromised session

## Exercise profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Cloud resources | None |
| Tools | Text editor, spreadsheet, diagramming tool, and optional local policy/query tool |
| Timebox | 90-150 minutes |
| Primary artifact | Trust graph, policy evaluation workbook, and containment runbook |

## Objective

Review fictional federation and role policies, identify escalation paths, and design evidence-preserving containment.

## Inputs

- Workforce users enter through a corporate SAML/OIDC IdP and IAM Identity Center.
- A CI role in a tooling account deploys to production.
- A vendor operates a read-only support integration for many customers.
- Security aggregates findings and CloudTrail evidence.
- The corporate IdP has a two-hour outage scenario.

Treat all names and numbers as fictional. Do not paste account IDs, credentials, endpoints, or customer data into course evidence.

## Tasks

1. Draw the identity chain from IdP subject to AWS session to target resource and log event.
2. Review sample trust patterns for wildcard principals, absent ExternalId, ungoverned session tags, and excessive duration.
3. Build an authorization matrix for workforce admin, developer, CI deployer, vendor, security investigator, and responder.
4. Evaluate a compromised CI session: reachable roles, pass-role paths, resource policies, KMS keys, and persistence options.
5. Design immediate containment that does not destroy forensic evidence.
6. Define source identity/session-tag provenance and CloudTrail queries needed for attribution.
7. Design and tabletop a break-glass workflow for IdP outage.
8. Write an ADR for central versus local response authority.

## Required analysis tables

### Boundary register

| Boundary | Owner | Inbound trust | Outbound trust | Failure impact | Preventive control | Detective evidence |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |

### Requirement traceability

| Requirement | Architecture decision | Evidence | Residual risk | Exception owner |
| --- | --- | --- | --- | --- |
| | | | | |

### Failure game

| Injected failure | Detection | Automatic response | Human decision | RTO/RPO effect | Rollback |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

## Architecture decision record

- Context and hard constraints
- Decision and scope
- Alternatives rejected and exact reasons
- Security, resilience, cost, compliance, and operational consequences
- Assumptions requiring validation
- Reversal trigger and rollback owner

## Challenge changes

- The vendor serves 500 customers with one AWS principal.
- The IdP group mapping is accidentally broadened.
- The security aggregation Region is unavailable during containment.

Rework the design for one change. Do not add a service unless it closes a traced requirement.

## Expected characteristics

- Every trust edge has issuer, audience/principal, conditions, duration, and revocation method.
- No human or workload uses long-lived access keys.
- Authorization tags cannot be self-issued by the subject.
- Break-glass use triggers an independent alert and review.
- Central findings do not create a single unbounded responder role.

## Evidence

Save only non-sensitive diagrams, calculations, decision tables, and the ADR. Use [the course evidence template](../../../templates/lab-evidence-template.md).
