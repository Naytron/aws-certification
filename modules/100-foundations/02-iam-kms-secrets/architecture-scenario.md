# Architecture Scenario: Rotating application credential

**Level:** 100 | **Cost label:** `DESIGN-ONLY` | **SAA-C03:** Design Secure Architectures (primary); all domains

## Business context

An EC2 application needs a database password. Operators must not embed it in an AMI, and the password must rotate automatically.

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

Store the password in instance user data.

**Assessment:** Reject: user data is not a managed secret-rotation boundary.

### Approach B

Use Secrets Manager, a scoped instance role, encryption, and managed rotation.

**Assessment:** Choose: it addresses retrieval, authorization, encryption, and rotation.

### Approach C

Put the password in an encrypted source repository.

**Assessment:** Reject: encryption does not provide runtime rotation or least-privilege retrieval.

## Decision

Choose B. Parameter Store SecureString becomes plausible if automatic rotation is removed and the operational tradeoff is accepted.

## Distractor analysis

For each rejection, cite the exact unmet requirement or needless cost. Service familiarity, maximum feature count, and "AWS managed" are not sufficient reasons.

## Follow-up change

Choose one requirement to change. State whether the decision changes, which component changes, and which new failure/cost boundary appears.

## Defense checklist

- Draw trust, network, data, and failure boundaries.
- Identify shared-responsibility ownership.
- State RTO/RPO assumptions if recovery is involved.
- Name one observable signal proving the design works.
