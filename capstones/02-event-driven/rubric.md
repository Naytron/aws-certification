# Rubric - Event-Driven Order Processing

Score each row at 0, half credit, or full credit.

| Area | Points | Full-credit evidence |
| --- | ---: | --- |
| Requirements and architecture | 10 | Async contract, delivery semantics, scale, security, recovery, and constraints are explicit |
| Intake and decoupling | 10 | Valid input returns 202 only after enqueue; invalid input creates no work |
| Idempotent processing | 15 | Duplicate delivery is expected, tested, and harmless for the modeled side effect |
| Failure handling | 15 | Visibility, bounded receives, partial batch response, DLQ, correction, and controlled redrive work |
| Security | 10 | Least-privilege roles, TLS entry, encryption, synthetic data, and production auth gap are explicit |
| Observability | 10 | Correlation logs, queue age/depth, Lambda metrics, DLQ alarm, and response runbook are defensible |
| Performance and cost | 10 | Batch/concurrency/downstream protection and serverless cost assumptions meet stated demand |
| Independent extension | 10 | One extension has decisions, failure ownership, and rejected alternatives |
| Evidence and cleanup | 10 | Sanitized evidence, required tags/Region, and every exact resource removed |
| **Total** | **100** | |

## Critical failures

Any item fails the capstone regardless of points:

- Secrets, access keys, account numbers, real endpoints, payment/PII, or receipt handles are recorded.
- A producer receives success before durable enqueue without that risk being explicit.
- Duplicate processing can repeat the modeled order-state side effect.
- Failed messages disappear without detection or recovery evidence.
- Broad administrator credentials are attached to either function.
- Sustained load or expensive components are deployed contrary to safety rules.
- Cleanup is incomplete or unverified.

## Pass

At least 80 points, no critical failure, successful DLQ redrive, and a five-minute defense that explains at-least-once delivery, idempotency, backpressure, and why two plausible alternatives fail requirements.
