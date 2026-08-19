# Architecture Scenario: Protected document archive

**Level:** 100 | **Cost label:** `DESIGN-ONLY` | **SAA-C03:** All SAA-C03 domains

## Business context

A company stores millions of documents, retrieves recent files often, and rarely retrieves files older than 90 days.

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

Store all files on one EC2 instance-store volume.

**Assessment:** Reject: ephemeral local block storage is the wrong durability and scale boundary.

### Approach B

S3 with Block Public Access, encryption, versioning, and a reviewed lifecycle transition.

**Assessment:** Choose: object access and lifecycle match the requirements.

### Approach C

EFS One Zone with no backup.

**Assessment:** Reject: file semantics and reduced AZ resilience are unnecessary.

## Decision

Choose B. If applications require shared POSIX file locking, EFS becomes relevant.

## Distractor analysis

For each rejection, cite the exact unmet requirement or needless cost. Service familiarity, maximum feature count, and "AWS managed" are not sufficient reasons.

## Follow-up change

Choose one requirement to change. State whether the decision changes, which component changes, and which new failure/cost boundary appears.

## Defense checklist

- Draw trust, network, data, and failure boundaries.
- Identify shared-responsibility ownership.
- State RTO/RPO assumptions if recovery is involved.
- Name one observable signal proving the design works.
