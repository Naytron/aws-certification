# Requirements

## Business context

A retailer accepts orders from short promotions. The API must acknowledge valid orders quickly even when downstream processing is slower. Operations needs to find and safely replay failures.

## Hard requirements

| Area | Requirement |
| --- | --- |
| Intake | Return an accepted response after durable enqueue, not after fulfillment |
| Burst handling | Buffer at least a 10x temporary traffic increase and scale workers independently |
| Delivery | Assume at-least-once delivery; duplicate messages must not create duplicate orders |
| Failure | Bounded retries and a DLQ; operators can inspect and redrive after correction |
| Security | TLS entry, input validation, least-privilege roles, encryption, no stored AWS keys or secrets |
| Data | Order ID is the idempotency key; order status is queryable |
| Observability | Correlation/order ID in logs, queue age/depth, Lambda errors, DLQ alarm |
| Recovery | Production target RTO 60 minutes and RPO near zero for already acknowledged orders |
| Cost | Managed serverless services, short retention, no idle server fleet |
| Governance | Required tags and one home Region |
| Cleanup | Exact named resources removable in dependency-safe order |

## Scaled-lab limits

- Maximum ten synthetic messages.
- Order fields: `orderId`, `sku`, and integer `quantity`; no PII/payment data.
- Standard SQS queue to force reasoning about possible duplicates and ordering.
- Source retention 1 day, DLQ retention 4 days, visibility timeout 30 seconds.
- Lambda timeout 5 seconds and 128 MB memory.
- DynamoDB on-demand with `orderId` string partition key.

## Production decisions to defend

1. Standard versus FIFO queue.
2. Partial batch response and idempotency strategy.
3. Visibility timeout, batch size, retry count, and DLQ retention.
4. Backpressure, concurrency, quotas, and downstream protection.
5. EventBridge fanout versus SNS fanout.
6. Step Functions orchestration versus choreography.
7. Regional recovery strategy and acknowledged-message RPO.
8. Authentication and authorization for order creation/status reads.
