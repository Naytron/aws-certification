# Architecture Scenario: Two-tier network boundary

**Level:** 100 | **Cost label:** `DESIGN-ONLY` | **SAA-C03:** Design Secure Architectures; Design Resilient Architectures; Design High-Performing Architectures

## Business context

A public web tier must accept HTTPS. An application tier must accept traffic only from the web tier and has no inbound internet path.

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

Put both tiers in one public subnet and allow 0.0.0.0/0 to every port.

**Assessment:** Reject: it violates tier isolation.

### Approach B

Public and private subnets across AZs; web SG allows HTTPS, app SG references web SG.

**Assessment:** Choose: routing and identity-aware controls match the flows.

### Approach C

One subnet named private with an internet route and open SG.

**Assessment:** Reject: names do not establish network isolation.

## Decision

Choose B. Add outbound paths only for documented dependencies; this module does not deploy a NAT Gateway.

## Distractor analysis

For each rejection, cite the exact unmet requirement or needless cost. Service familiarity, maximum feature count, and "AWS managed" are not sufficient reasons.

## Follow-up change

Choose one requirement to change. State whether the decision changes, which component changes, and which new failure/cost boundary appears.

## Defense checklist

- Draw trust, network, data, and failure boundaries.
- Identify shared-responsibility ownership.
- State RTO/RPO assumptions if recovery is involved.
- Name one observable signal proving the design works.
