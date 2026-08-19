# Independent Extensions

Complete Extension A and one design extension. Do not exceed ten total messages.

## Extension A - Duplicate safety (`FREE-PLAN SAFE`)

Without changing the provided processor:

1. Submit the same valid `orderId` twice.
2. Predict source-queue and table behavior before observing it.
3. Verify only one item exists for that key and the duplicate does not enter the DLQ.
4. Explain the limit: this conditional write protects one state transition, but real payment/fulfillment side effects need their own idempotency records and ordering rules.

## Extension B - Completion fanout (`DESIGN-ONLY`)

Design a completion event after order acceptance:

- Define event source, detail type, schema version, order identifier, and correlation identifier.
- Compare EventBridge rules with SNS topic subscriptions.
- Add independent inventory, notification, and analytics consumers.
- Define retry/DLQ ownership per target and schema evolution.
- Reject a design that makes the processor synchronously call all consumers.

## Extension C - Stateful fulfillment (`DESIGN-ONLY`)

Design a Step Functions workflow for reserve inventory -> authorize payment -> await fraud result -> confirm -> compensate on failure.

Include:

- Standard versus Express choice.
- Retryable versus terminal errors.
- Timeouts and callback/wait pattern.
- Idempotency at each side effect.
- Compensation limits; do not call it a database transaction.
- Execution-history retention and sensitive-data logging controls.

Reject "put every step in one Lambda" on timeout, retry, audit, and coupling grounds.

## Extension D - FIFO decision (`DESIGN-ONLY`)

Change the business rule: updates for one order must be ordered while different orders run concurrently.

Specify:

- FIFO queue.
- `orderId` as message group ID.
- Stable event ID as deduplication ID.
- Throughput implications.
- Consumer idempotency despite deduplication support.

Explain why one global message group is a scalability distractor.

## Extension E - Production recovery (`DESIGN-ONLY`)

Meet RTO 60 minutes and near-zero RPO for acknowledged orders:

- Define infrastructure-as-code recovery, queue/data backup or replication limits, DynamoDB recovery choice, quotas, IAM, DNS/API cutover, and validation.
- State whether one-Region managed multi-AZ behavior already meets the stated failure scope.
- Do not add multi-Region solely because it sounds resilient.

## Evidence

For the selected design extension, provide a diagram, three decision records, two alarm/runbook entries, and two rejected alternatives tied to explicit requirements.
