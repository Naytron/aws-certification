# Cleanup

Delete only the named capstone resources. Never use wildcard or account-wide deletion commands.

## Dependency-safe order

1. Delete API Gateway HTTP API `saa3-product-api` by its exact API ID.
2. Delete alarm `saa3-product-handler-errors`.
3. Delete Lambda `saa3-product-handler`.
4. Delete exact log group `/aws/lambda/saa3-product-handler`.
5. Delete DynamoDB table `saa3-products` after confirming it contains only synthetic capstone data.
6. Detach/delete only the inline or customer policy created for `saa3-lambda-role`, then delete that exact role.

If using the CLI, discover exact identifiers before each deletion:

```powershell
aws apigatewayv2 get-apis --region $env:AWS_REGION --query "Items[?Name=='saa3-product-api'].[ApiId,Name]" --output table
aws lambda get-function --region $env:AWS_REGION --function-name saa3-product-handler
aws dynamodb describe-table --region $env:AWS_REGION --table-name saa3-products --query "Table.TableStatus"
aws cloudwatch describe-alarms --region $env:AWS_REGION --alarm-names saa3-product-handler-errors
```

Deletion examples require the exact reviewed API ID:

```powershell
$ApiId = "replace-with-reviewed-id"
aws apigatewayv2 delete-api --region $env:AWS_REGION --api-id $ApiId
aws cloudwatch delete-alarms --region $env:AWS_REGION --alarm-names saa3-product-handler-errors
aws lambda delete-function --region $env:AWS_REGION --function-name saa3-product-handler
aws logs delete-log-group --region $env:AWS_REGION --log-group-name /aws/lambda/saa3-product-handler
aws dynamodb delete-table --region $env:AWS_REGION --table-name saa3-products
```

Delete the exact IAM role in the console after reviewing attachments; do not delete shared or service-linked roles.

## Verify

Repeat the read-only discovery commands and expect not-found/empty exact-name results. Also check:

- API Gateway, Lambda, DynamoDB, CloudWatch alarms/log groups, and IAM consoles.
- The home Region only, plus global IAM.
- Billing, credit balance, Free Tier usage, and budgets after data refresh.
- No unexpected resources, policies, or data remain.

Cleanup is incomplete until deletion finishes, including DynamoDB `DELETING` state.
