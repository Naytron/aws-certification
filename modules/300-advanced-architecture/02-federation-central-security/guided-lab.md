# Guided lab: Evaluate cross-account trust and a compromised session

## Lab profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Cloud resources | None |
| Account changes | None |
| Timebox | 90-150 minutes |
| Cleanup | [No-cloud cleanup verification](cleanup.md) |

> Do not create federation, delegated-administrator, organization-wide trail, or cross-account role resources for this exercise.

## Objective

Review fictional federation and role policies, identify escalation paths, and design evidence-preserving containment.

## Inputs

- Workforce users enter through a corporate SAML/OIDC IdP and IAM Identity Center.
- A CI role in a tooling account deploys to production.
- A vendor operates a read-only support integration for many customers.
- Security aggregates findings and CloudTrail evidence.
- The corporate IdP has a two-hour outage scenario.

All facts are fictional. Keep account IDs, credentials, private endpoints, customer records, and other sensitive information out of the artifacts.

## Preflight

1. Confirm the exercise remains `DESIGN-ONLY`; do not create or change AWS resources.
2. Confirm the current AWS Free plan is unchanged and billing alerts remain available.
3. Use only fictional or sanitized inputs; do not record account IDs, ARNs, credentials, endpoints, or customer data.
4. If this architecture were later deployed in an approved paid sandbox, require the standard tags `Course`, `Module`, `Owner`, and `ExpiresAt` on every supported resource. Tags are design annotations here, not a reason to deploy.
5. Read [cleanup.md](cleanup.md) before starting and record that no cloud resources are expected.

## Architecture frame

Before selecting a service, create five columns: hard requirement, owner, trust boundary, failure domain, and measurable evidence. A design decision is valid only when it closes a row in that table.

## Guided procedure

### 1. Establish requirements and authority

1. Mark each input as a hard constraint, assumption, or preference.
2. Assign one accountable owner to every hard constraint.
3. Record numeric RTO, RPO, capacity, cost, and compliance limits where relevant.
4. Identify who may approve a change, exception, failover, or rollback.

### 2. Draw boundaries

Create an ASCII or diagramming-tool view that distinguishes:

- organization/account and administrative boundaries;
- human and workload trust paths;
- network and data movement;
- Availability Zone, Region, external provider, and operator failure domains;
- evidence, key, and recovery ownership.

### 3. Complete the module analysis

1. Draw the identity chain from IdP subject to AWS session to target resource and log event.
2. Review sample trust patterns for wildcard principals, absent ExternalId, ungoverned session tags, and excessive duration.
3. Build an authorization matrix for workforce admin, developer, CI deployer, vendor, security investigator, and responder.
4. Evaluate a compromised CI session: reachable roles, pass-role paths, resource policies, KMS keys, and persistence options.
5. Design immediate containment that does not destroy forensic evidence.
6. Define source identity/session-tag provenance and CloudTrail queries needed for attribution.
7. Design and tabletop a break-glass workflow for IdP outage.
8. Write an ADR for central versus local response authority.

For each task, write the observation, inference, decision, evidence, residual risk, and owner. Do not treat an architecture diagram as proof by itself.

### 4. Run a controlled failure game

Choose the most consequential listed dependency. Walk the clock through detection, diagnosis, authorization, containment, recovery, validation, and rollback. Record the first point at which the design misses an objective. Then change one control and repeat.

### 5. Compare alternatives

Score at least three approaches from 1 (poor) to 5 (strong) for security, blast radius, recovery, operations, compliance, variable cost, fixed cost, migration risk, and reversibility. Weight only criteria traced to requirements.

### 6. Write the ADR

Document context, decision, alternatives, consequences, assumptions, validation evidence, exception owner, reversal trigger, and rollback authority.

## Validate

The result should have these characteristics:

- Every trust edge has issuer, audience/principal, conditions, duration, and revocation method.
- No human or workload uses long-lived access keys.
- Authorization tags cannot be self-issued by the subject.
- Break-glass use triggers an independent alert and review.
- Central findings do not create a single unbounded responder role.

## Cleanup

No cloud cleanup is expected. Complete [cleanup.md](cleanup.md), sanitize evidence, and explicitly record `No cloud resources created - DESIGN-ONLY`.

Complete every gate in [validation.md](validation.md), then perform [cleanup.md](cleanup.md). Save non-sensitive evidence using [the course evidence template](../../../templates/lab-evidence-template.md).
