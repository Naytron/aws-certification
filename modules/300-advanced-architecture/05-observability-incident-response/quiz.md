# Quiz: Enterprise Observability, Incident Response, and Resilience Testing

Closed-book. Select the best answer. Questions are original and scenario based.

## 1. Which is the strongest availability SLI for checkout?

A. Average EC2 CPU
B. Fraction of valid checkout attempts completed correctly within the threshold
C. Number of dashboards
D. Log volume

## 2. What does an error budget represent?

A. Maximum CPU
B. AWS invoice variance
C. The tolerated unreliability implied by an SLO
D. A log retention period

## 3. Where should immutable audit logs be controlled?

A. Developer laptops
B. A public bucket
C. Only by each workload admin
D. A separated archive/security boundary with restricted deletion and key access

## 4. Why can average latency be misleading?

A. It can hide tail and tenant-specific failure
B. It cannot be graphed
C. It costs more
D. It is always higher than p99

## 5. Where should requestId usually live?

A. As an unbounded custom metric dimension
B. Structured logs/traces for correlation
C. In an SCP
D. In a route table

## 6. What makes automated remediation safe?

A. Triggering on one noisy alarm
B. Administrator permission everywhere
C. Bounded scope, idempotency, evidence, stop conditions, rollback, and override
D. No logs

## 7. What starts a resilience experiment?

A. Deleting production resources
B. A vendor demo
C. Random failure
D. A hypothesis tied to a measurable steady state

## 8. What is the best first response to retry amplification?

A. Introduce backoff/jitter, caps, idempotency, and load shedding
B. Remove all quotas
C. Hide errors
D. Encourage faster retries

## 9. Why is OpenSearch design-only in this module?

A. It cannot search logs
B. Persistent clusters can create material cost; local/query exercises teach the decision safely
C. It is not an AWS service
D. It has no security controls

## 10. What belongs in an incident timeline?

A. Billing tags
B. Only final root cause
C. Timestamped observations, hypotheses, evidence, decisions, and actions
D. Only chat transcripts

## Score

- 8/10 or better: pass, then explain every distractor you considered.
- Below 8/10: update the error log and retake with different challenge assumptions.
