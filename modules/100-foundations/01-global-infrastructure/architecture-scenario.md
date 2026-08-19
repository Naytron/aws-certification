# Architecture Scenario: Regional learning portal

**Level:** 100 | **Cost label:** `DESIGN-ONLY` | **SAA-C03:** All SAA-C03 domains

## Business context

A training company serves one country and needs a low-cost portal that remains available during a single data-center failure.

## Requirements

- Security: least privilege, encryption where data is sensitive, and no unintended public access.
- Resilience: meet the stated failure requirement, not an imagined one.
- Performance: satisfy the named access or latency pattern.
- Operations: observable, testable, and recoverable.
- Cost: use the fewest components that meet hard requirements.

## Constraints

- New AWS team; avoid unnecessary operational burden.
- Current Free-plan lab account is for validation only.
- No production data or credentials may be used.

## Candidate approaches

### Approach A

One EC2 instance in the cheapest Region.

**Assessment:** Reject: it ignores latency, service availability, and AZ failure.

### Approach B

A Regional design spread across two AZs with backups and measured recovery.

**Assessment:** Choose: it satisfies the stated failure requirement with bounded complexity.

### Approach C

Active-active in four Regions from day one.

**Assessment:** Reject: no Regional-outage RTO or global-latency requirement justifies the cost.

## Decision

Choose B. Revisit C only if a measurable Regional recovery or global latency requirement appears.

## Distractor analysis

For each rejection, cite the exact unmet requirement or needless cost. Service familiarity, maximum feature count, and "AWS managed" are not sufficient reasons.

## Follow-up change

Choose one requirement to change. State whether the decision changes, which component changes, and which new failure/cost boundary appears.

## Defense checklist

- Draw trust, network, data, and failure boundaries.
- Identify shared-responsibility ownership.
- State RTO/RPO assumptions if recovery is involved.
- Name one observable signal proving the design works.
