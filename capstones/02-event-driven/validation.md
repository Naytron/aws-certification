# Validation

Use [evidence](evidence.md). Redact account IDs, full ARNs, queue URLs, and API hostnames.

## Functional

```powershell
$ApiUrl = "https://example.execute-api.region.amazonaws.com" # Never commit the real URL.
$Body = '{"orderId":"order-001","sku":"demo-1","quantity":2}'
Invoke-RestMethod -Method Post -Uri "$ApiUrl/orders" -ContentType "application/json" -Body $Body
```

Expected:

- API returns 202 and `QUEUED`.
- Source queue briefly receives then removes the message.
- DynamoDB contains `order-001`, `demo-1`, quantity 2, status `ACCEPTED`.
- Intake and processor logs share `order-001`.

Submit one invalid quantity and expect 400 with no queue/table change. Complete duplicate Extension A and expect one table item.

## Security

- Intake role can log and send only to exact source queue.
- Processor role can log, consume only the source queue, and access only the exact table actions required.
- No IAM user, access key, secret, PII, or payment data exists.
- Encryption defaults are confirmed for SQS and DynamoDB.
- Production authentication, authorization, rate limits, and WAF decisions are documented as lab gaps.

## Resilience

- Explain at-least-once delivery and idempotency.
- Explain visibility timeout versus function timeout.
- Explain why the DLQ retention exceeds source retention.
- Demonstrate corrected redrive from [failure exercise](failure-exercise.md).
- State how queue age, not only queue depth, signals stalled processing.

## Performance and cost

- Explain batch size, partial batch response, concurrency, downstream capacity, and quotas.
- Explain why an unbounded Lambda consumer can overwhelm a downstream system.
- Confirm at most ten messages and no sustained load test.
- Compare standard versus FIFO and serverless versus continuously running workers from requirements.

## Observability

- Both log groups retain 1 day.
- Logs contain correlation/order ID but no sensitive data.
- Source queue depth/age, DLQ depth, Lambda duration/throttles/errors, and DynamoDB throttles are in the production dashboard design.
- DLQ alarm changes to ALARM during the exercise and returns to OK after recovery.

## Tags and Region

Every supported resource carries required tags and exists only in the home Region.

## Cleanup

Run [cleanup](cleanup.md) and verify every exact resource is absent.
