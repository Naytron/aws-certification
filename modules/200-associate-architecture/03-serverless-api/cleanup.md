# Cleanup

1. Record stack outputs and exact physical IDs.
2. Run `aws cloudformation delete-stack --stack-name saa200-serverless-api`.
3. Run `aws cloudformation wait stack-delete-complete --stack-name saa200-serverless-api`.
4. Query each recorded function with `aws lambda get-function --function-name <exact-name>` and API with `aws apigatewayv2 get-api --api-id <exact-id>`; expect not found.
5. Query the exact log group; delete it by exact name only if it was retained unexpectedly.
6. Remove only the local `template.yaml` created for this lab and check Billing.
