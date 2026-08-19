# Architecture Scenario: Checkout incident visibility

**Level:** 100 | **Cost label:** `DESIGN-ONLY` | **SAA-C03:** Design Secure Architectures; Design Resilient Architectures

## Business context

Operators need to detect elevated checkout errors, inspect failed request context, and audit configuration changes.

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

Only a dashboard of average CPU.

**Assessment:** Reject: it misses application errors, alerting, and audit evidence.

### Approach B

Error-rate metric/alarm, structured bounded-retention logs, and CloudTrail audit events.

**Assessment:** Choose: each signal answers a distinct question.

### Approach C

Store all logs forever and page on every single error.

**Assessment:** Reject: unbounded cost and alert fatigue.

## Decision

Choose B. Add tracing when the request crosses multiple services and correlation is otherwise ambiguous.

## Distractor analysis

For each rejection, cite the exact unmet requirement or needless cost. Service familiarity, maximum feature count, and "AWS managed" are not sufficient reasons.

## Follow-up change

Choose one requirement to change. State whether the decision changes, which component changes, and which new failure/cost boundary appears.

## Defense checklist

- Draw trust, network, data, and failure boundaries.
- Identify shared-responsibility ownership.
- State RTO/RPO assumptions if recovery is involved.
- Name one observable signal proving the design works.
