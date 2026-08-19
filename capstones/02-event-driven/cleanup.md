# Cleanup

Delete only exact capstone resources. Confirm the source and DLQ contain no messages after successful validation.

## Dependency-safe order

1. Delete HTTP API `saa3-orders-api` by reviewed API ID.
2. Disable and delete the SQS event-source mapping for `saa3-order-processor`.
3. Delete alarm `saa3-orders-dlq-visible`.
4. Delete functions `saa3-order-intake` and `saa3-order-processor`.
5. Delete exact log groups:
   - `/aws/lambda/saa3-order-intake`
   - `/aws/lambda/saa3-order-processor`
6. Delete source queue `saa3-orders` by exact queue URL.
7. Delete DLQ `saa3-orders-dlq` by exact queue URL.
8. Delete DynamoDB table `saa3-order-state` after confirming it contains synthetic data only.
9. Remove policies created only for the lab, then delete exact roles:
   - `saa3-order-intake-role`
   - `saa3-order-processor-role`

Do not use queue purge as cleanup and do not delete service-linked or shared roles.

## Exact discovery

```powershell
aws apigatewayv2 get-apis --region $env:AWS_REGION --query "Items[?Name=='saa3-orders-api'].[ApiId,Name]" --output table
aws lambda list-event-source-mappings --region $env:AWS_REGION --function-name saa3-order-processor --query "EventSourceMappings[].[UUID,EventSourceArn,State]" --output table
aws lambda get-function --region $env:AWS_REGION --function-name saa3-order-intake
aws lambda get-function --region $env:AWS_REGION --function-name saa3-order-processor
aws sqs get-queue-url --region $env:AWS_REGION --queue-name saa3-orders
aws sqs get-queue-url --region $env:AWS_REGION --queue-name saa3-orders-dlq
aws dynamodb describe-table --region $env:AWS_REGION --table-name saa3-order-state --query "Table.TableStatus"
```

Use the exact API ID, mapping UUID, and queue URLs returned by reviewed discovery. Example shape:

```powershell
aws lambda delete-event-source-mapping --region $env:AWS_REGION --uuid "replace-with-reviewed-uuid"
aws apigatewayv2 delete-api --region $env:AWS_REGION --api-id "replace-with-reviewed-api-id"
aws cloudwatch delete-alarms --region $env:AWS_REGION --alarm-names saa3-orders-dlq-visible
aws lambda delete-function --region $env:AWS_REGION --function-name saa3-order-intake
aws lambda delete-function --region $env:AWS_REGION --function-name saa3-order-processor
aws logs delete-log-group --region $env:AWS_REGION --log-group-name /aws/lambda/saa3-order-intake
aws logs delete-log-group --region $env:AWS_REGION --log-group-name /aws/lambda/saa3-order-processor
aws sqs delete-queue --region $env:AWS_REGION --queue-url "replace-with-reviewed-source-queue-url"
aws sqs delete-queue --region $env:AWS_REGION --queue-url "replace-with-reviewed-dlq-url"
aws dynamodb delete-table --region $env:AWS_REGION --table-name saa3-order-state
```

## Verify

- Exact APIs, mappings, functions, queues, table, alarm, log groups, roles, and lab policies are absent.
- DynamoDB deletion has completed.
- Home Region and global IAM contain no capstone residue.
- Billing, credit balance, Free Tier usage, and budgets have been reviewed after data refresh.
- No optional extension resource remains.
