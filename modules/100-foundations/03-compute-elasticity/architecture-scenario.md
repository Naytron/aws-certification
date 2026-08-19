# Architecture Scenario: Elastic stateless web tier

**Level:** 100 | **Cost label:** `DESIGN-ONLY` | **SAA-C03:** Design Resilient Architectures; Design High-Performing Architectures; Design Cost-Optimized Architectures

## Business context

A web tier has unpredictable HTTP traffic, must tolerate one instance failure, and stores no local session state.

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

One large EC2 instance with a public IP.

**Assessment:** Reject: it is a single failure and scaling unit.

### Approach B

ALB plus an Auto Scaling group across two AZs using a launch template.

**Assessment:** Choose: it matches HTTP routing, replacement, and AZ distribution.

### Approach C

NLB plus one Spot instance with local sessions.

**Assessment:** Reject: protocol features and interruption tolerance do not match.

## Decision

Choose B. If traffic is fixed TCP with a static-IP requirement, reconsider NLB.

## Distractor analysis

For each rejection, cite the exact unmet requirement or needless cost. Service familiarity, maximum feature count, and "AWS managed" are not sufficient reasons.

## Follow-up change

Choose one requirement to change. State whether the decision changes, which component changes, and which new failure/cost boundary appears.

## Defense checklist

- Draw trust, network, data, and failure boundaries.
- Identify shared-responsibility ownership.
- State RTO/RPO assumptions if recovery is involved.
- Name one observable signal proving the design works.
