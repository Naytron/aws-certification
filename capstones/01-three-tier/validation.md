# Validation

Record observations in [evidence](evidence.md). Redact account IDs and endpoint hostnames.

## Functional

Using the generated API invoke URL:

```powershell
$ApiUrl = "https://example.execute-api.region.amazonaws.com" # Do not commit the real URL.
Invoke-RestMethod -Method Get -Uri "$ApiUrl/health"
Invoke-RestMethod -Method Put -Uri "$ApiUrl/products/p-001" -ContentType "application/json" -Body '{"name":"Synthetic Widget"}'
Invoke-RestMethod -Method Get -Uri "$ApiUrl/products/p-001"
```

Expected: health `ok`; PUT and GET show `p-001` and `Synthetic Widget`.

## Security

- Lambda role has only log permissions and exact-table `GetItem`/`PutItem`.
- No IAM user/access key was created.
- DynamoDB is not exposed through a public network endpoint controlled by the learner.
- No secret or sensitive data exists in code, tags, logs, or evidence.
- Write-route authentication is explicitly identified as a production requirement and scaled-lab limitation.

## Resilience and performance reasoning

- Explain how API Gateway, Lambda, and DynamoDB remove instance/AZ administration.
- Explain why this does not prove the production RDS RPO/RTO.
- Identify Lambda concurrency, DynamoDB partition key, downstream limits, and quotas as scaling constraints.
- State why `productId` is acceptable for this tiny lab but must be tested against production access distribution.

## Observability

- Lambda Invocations and Errors contain the test timestamps.
- Log retention is exactly 1 day.
- Alarm `saa3-product-handler-errors` exists and is explained.
- Failure exercise produces an attributable log and metric.

## Tags and Region

List only non-sensitive resource names and confirm all supported resources carry required tags. Confirm every resource is in the one home Region.

## Production design

Pass only if the diagram and decision record satisfy every item in [architecture tasks](architecture-tasks.md), including AZ loss, database failover, bad deployment, restore, and cost.

## Cleanup

After functional restoration, execute [cleanup](cleanup.md). Cleanup proof is part of validation.
