# Guided Foundation

## Lab profile

| Field | Value |
| --- | --- |
| Cost label | `FREE-PLAN SAFE` after eligibility/limit confirmation; otherwise `DESIGN-ONLY` |
| Region | Course home Region |
| Queues | `saa3-orders`, `saa3-orders-dlq` |
| Functions | `saa3-order-intake`, `saa3-order-processor` |
| API/table | `saa3-orders-api`, `saa3-order-state` |
| Alarm | `saa3-orders-dlq-visible` |
| Cleanup | Same session |

## Preflight

1. Read [cleanup](cleanup.md).
2. Confirm identity, home Region, Free plan, credits, budgets, and access to API Gateway, Lambda, SQS, DynamoDB, and CloudWatch.
3. Prepare non-sensitive tags and a same-day `ExpiresAt`.
4. Stop rather than upgrade if any service is unavailable.

## 1. Create queues

Create standard queues:

- `saa3-orders-dlq`: retention 4 days.
- `saa3-orders`: retention 1 day, visibility timeout 30 seconds, DLQ redrive policy with maximum receives 2.

Apply required tags to each. Record exact queue URLs only in temporary session notes, not repository evidence.

Why: the source queue buffers the producer/consumer rate difference. The DLQ isolates repeatedly failing messages. A DLQ is not self-healing; correction and controlled redrive remain required.

## 2. Create data tier

Create DynamoDB table `saa3-order-state`:

- Partition key `orderId` (String).
- On-demand capacity.
- Default server-side encryption.
- Required tags.

Use synthetic data only.

## 3. Create processor

Create Python 3 Lambda `saa3-order-processor` with:

- New role `saa3-order-processor-role`.
- Basic log permissions.
- Exact-table `GetItem` and `PutItem`.
- SQS event-source permissions limited to `saa3-orders`.
- `TABLE_NAME=saa3-order-state`.
- Timeout 5 seconds; memory 128 MB; required tags.

Code:

```python
import json
import os
import boto3
from botocore.exceptions import ClientError

table = boto3.resource("dynamodb").Table(os.environ["TABLE_NAME"])

def lambda_handler(event, context):
    failures = []
    for record in event["Records"]:
        try:
            order = json.loads(record["body"])
            order_id = order["orderId"]
            item = {
                "orderId": order_id,
                "sku": order["sku"],
                "quantity": int(order["quantity"]),
                "status": "ACCEPTED",
            }
            try:
                table.put_item(
                    Item=item,
                    ConditionExpression="attribute_not_exists(orderId)",
                )
            except ClientError as error:
                if error.response["Error"]["Code"] != "ConditionalCheckFailedException":
                    raise
            print(json.dumps({"event": "order_processed", "orderId": order_id}))
        except Exception as error:
            print(json.dumps({
                "event": "order_failed",
                "messageId": record["messageId"],
                "errorType": type(error).__name__,
            }))
            failures.append({"itemIdentifier": record["messageId"]})
    return {"batchItemFailures": failures}
```

Create an SQS event-source mapping:

- Source: `saa3-orders`.
- Batch size: 5.
- Enable `ReportBatchItemFailures`.
- Keep concurrency small/default; do not generate load.

Why: conditional write makes duplicate processing harmless for this state transition. Partial batch response retries only failed records.

## 4. Create intake

Create Python 3 Lambda `saa3-order-intake` with:

- New role `saa3-order-intake-role`.
- Basic log permissions.
- Only `sqs:SendMessage` to exact source queue.
- `QUEUE_URL` set to the source queue URL.
- Timeout 5 seconds; memory 128 MB; required tags.

Code:

```python
import json
import os
import re
import boto3

sqs = boto3.client("sqs")
queue_url = os.environ["QUEUE_URL"]
safe_id = re.compile(r"^[A-Za-z0-9-]{1,40}$")

def reply(status, body):
    return {
        "statusCode": status,
        "headers": {"content-type": "application/json"},
        "body": json.dumps(body),
    }

def lambda_handler(event, context):
    try:
        order = json.loads(event.get("body") or "{}")
        order_id = str(order["orderId"])
        sku = str(order["sku"])
        quantity = int(order["quantity"])
        if not safe_id.fullmatch(order_id) or not safe_id.fullmatch(sku):
            raise ValueError("invalid identifier")
        if quantity < 1 or quantity > 10:
            raise ValueError("quantity out of range")
    except (KeyError, TypeError, ValueError, json.JSONDecodeError):
        return reply(400, {"message": "invalid order"})
    sqs.send_message(
        QueueUrl=queue_url,
        MessageBody=json.dumps({
            "orderId": order_id,
            "sku": sku,
            "quantity": quantity,
        }),
    )
    print(json.dumps({"event": "order_enqueued", "orderId": order_id}))
    return reply(202, {"orderId": order_id, "status": "QUEUED"})
```

## 5. Create API

Create HTTP API `saa3-orders-api`:

- Route `POST /orders`.
- Integration `saa3-order-intake`.
- Default auto-deploy stage.
- Required tags.

The route is unauthenticated only for the brief synthetic lab. Production must use a JWT/Cognito or other justified authorization control, WAF/rate protection as needed, and schema validation.

## 6. Observability

1. Invoke each function so exact log groups exist.
2. Set both `/aws/lambda/saa3-order-intake` and `/aws/lambda/saa3-order-processor` retention to 1 day.
3. Create alarm `saa3-orders-dlq-visible`:
   - Namespace `AWS/SQS`
   - Metric `ApproximateNumberOfMessagesVisible`
   - Dimension `QueueName=saa3-orders-dlq`
   - Maximum, 1 minute, threshold >= 1, one evaluation period
   - No notification action for this lab
4. Tag the alarm if supported.

Continue with [validation](validation.md), [failure exercise](failure-exercise.md), and one [independent extension](independent-extensions.md).
