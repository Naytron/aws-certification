# Failure Exercise - Poisoned Dependency Configuration

## Purpose

Observe bounded retries, partial batch failure, DLQ isolation, alarm behavior, correction, and controlled redrive.

## Inject one safe fault

1. Confirm both queues are empty and order `fail-001` is not in DynamoDB.
2. Record the processor's current non-secret value `TABLE_NAME=saa3-order-state`.
3. Change it to `TABLE_NAME=saa3-order-state-missing`.
4. Submit one valid synthetic order:

```json
{"orderId":"fail-001","sku":"demo-1","quantity":1}
```

Do not delete a table, alter IAM, disable encryption, or send additional failures.

## Observe

The intake should return 202 because enqueue succeeded. Processing should fail:

1. Processor log records `order_failed`.
2. Lambda errors may not increment when partial batch failure is returned normally; use logs and SQS metrics as primary evidence.
3. `ApproximateReceiveCount` increases.
4. After maximum receives, the exact message appears in `saa3-orders-dlq`.
5. Alarm `saa3-orders-dlq-visible` enters ALARM after evaluation.

Queue metrics are approximate and delayed. Wait; do not create more messages.

## Diagnose

- API success proves only durable acceptance.
- Source-queue drain plus DLQ depth identifies isolated processing failure.
- Processor logs identify the failed dependency.
- Compare configured and actual table names.
- Root cause: invalid dependency configuration, not malformed order data.

## Correct and redrive

1. Restore `TABLE_NAME=saa3-order-state`.
2. Wait for Lambda configuration update to complete.
3. Use the SQS console DLQ redrive task, selecting only `saa3-orders` as destination and this lab's message.
4. Confirm `fail-001` appears once in DynamoDB with `ACCEPTED`.
5. Confirm source queue and DLQ return to zero visible/in-flight messages.
6. Confirm the alarm returns to OK after metric evaluation.

If redrive is unavailable, inspect the exact message, send that single body to the source queue, then delete only the reviewed DLQ message by its exact receipt handle. Never purge a queue as a substitute for understanding the failure.

## Production prevention

Defend:

- Infrastructure-as-code references and pre-deployment dependency checks.
- Deployment canary and alarm-based rollback.
- DLQ alarm routed to an owned response channel.
- Runbook with authorization and redrive limits.
- Idempotency before replay.
- Retention long enough for detection and response.
