# Free-Plan-Safe Scaled Lab

## Lab profile

| Field | Value |
| --- | --- |
| Cost label | `FREE-PLAN SAFE` when current plan eligibility and small limits are confirmed; otherwise `DESIGN-ONLY` |
| Region | Course home Region only |
| Names | `saa3-product-api`, `saa3-product-handler`, `saa3-products`, `saa3-lambda-role` |
| Data | Two synthetic items maximum |
| Retention | Lambda logs: 1 day |
| Cleanup | Same study session |

The Free plan prevents charges while it remains active, but resources consume credits and eligibility is limited. Stop if the Billing console or service console indicates an upgrade or unavailable feature.

## Preflight

1. Read [cleanup](cleanup.md) before creating anything.
2. Confirm non-root identity, home Region, Free plan, credit balance, budgets, and service eligibility.
3. Set non-sensitive values:

```powershell
$env:AWS_REGION = "us-east-1" # Replace only with the recorded home Region.
$Owner = "learner-alias"
$ExpiresAt = (Get-Date).ToUniversalTime().AddHours(4).ToString("yyyy-MM-ddTHH:mmZ")
aws sts get-caller-identity
aws configure get region
```

Do not record the identity output.

## Build

Use the console so generated execution-role policy details remain visible.

### 1. Data tier

Create DynamoDB table `saa3-products`:

- Partition key: `productId` (String).
- Capacity: on-demand.
- Encryption: default server-side encryption.
- Point-in-time recovery: leave disabled for this short synthetic lab; include it in the production design.
- Tags:
  - `Course=aws-solutions-architect`
  - `Module=capstone-01-three-tier`
  - `Owner=<non-sensitive alias>`
  - `ExpiresAt=<same-day UTC timestamp>`

### 2. Application tier

Create Python 3 Lambda `saa3-product-handler` with a new execution role `saa3-lambda-role`. Add only DynamoDB `GetItem` and `PutItem` permission for the exact table ARN plus basic log permissions. Set:

- Environment variable `TABLE_NAME=saa3-products`.
- Timeout 5 seconds.
- Memory 128 MB.
- Required tags.

Use this original lab handler:

```python
import json
import os
import boto3

table = boto3.resource("dynamodb").Table(os.environ["TABLE_NAME"])

def response(status, body):
    return {
        "statusCode": status,
        "headers": {"content-type": "application/json"},
        "body": json.dumps(body),
    }

def lambda_handler(event, context):
    route = event.get("routeKey", "")
    if route == "GET /health":
        return response(200, {"status": "ok"})
    if route == "PUT /products/{id}":
        product_id = event["pathParameters"]["id"]
        body = json.loads(event.get("body") or "{}")
        item = {"productId": product_id, "name": str(body.get("name", "sample"))[:80]}
        table.put_item(Item=item)
        return response(200, item)
    if route == "GET /products/{id}":
        product_id = event["pathParameters"]["id"]
        item = table.get_item(Key={"productId": product_id}).get("Item")
        return response(200 if item else 404, item or {"message": "not found"})
    return response(404, {"message": "route not found"})
```

Never place a secret in code or environment variables.

### 3. Presentation/API tier

Create HTTP API `saa3-product-api`:

- Lambda integration: `saa3-product-handler`.
- Routes: `GET /health`, `PUT /products/{id}`, `GET /products/{id}`.
- Default stage with automatic deployment.
- Required API tags.

This lab leaves product routes unauthenticated only for short-lived synthetic data. In the production design, require Cognito/JWT or another stated application identity control for writes.

### 4. Observability

1. Invoke `GET /health` once so `/aws/lambda/saa3-product-handler` exists.
2. Set that exact log group retention to 1 day.
3. Create alarm `saa3-product-handler-errors` on Lambda `Errors`, Sum, 5 minutes, threshold >= 1, one evaluation period, with no notification action for the lab.
4. Tag the alarm if the selected interface supports tags.

## Validate

Follow [validation](validation.md), then [failure exercise](failure-exercise.md). Do not generate load; three to five requests are sufficient.
