# Architecture Scenario: Shopping-cart state

**Level:** 100 | **Cost label:** `DESIGN-ONLY` | **SAA-C03:** Design Resilient Architectures; Design High-Performing Architectures; Design Cost-Optimized Architectures

## Business context

A shopping cart is accessed by cart ID, traffic is highly variable, and the service needs single-digit millisecond key-value access without joins.

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

DynamoDB on-demand with a well-distributed cart ID partition key.

**Assessment:** Choose: access pattern and traffic match.

### Approach B

A large self-managed database on one EC2 instance.

**Assessment:** Reject: unnecessary operations and a single failure.

### Approach C

RDS Multi-AZ solely to get key-value autoscaling.

**Assessment:** Reject: relational features are not required and the scaling claim is wrong.

## Decision

Choose A. If transactions require complex joins and SQL constraints, reconsider RDS or Aurora.

## Distractor analysis

For each rejection, cite the exact unmet requirement or needless cost. Service familiarity, maximum feature count, and "AWS managed" are not sufficient reasons.

## Follow-up change

Choose one requirement to change. State whether the decision changes, which component changes, and which new failure/cost boundary appears.

## Defense checklist

- Draw trust, network, data, and failure boundaries.
- Identify shared-responsibility ownership.
- State RTO/RPO assumptions if recovery is involved.
- Name one observable signal proving the design works.
