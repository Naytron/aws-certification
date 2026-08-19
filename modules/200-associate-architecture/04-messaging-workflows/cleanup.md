# Cleanup

1. Receive the known DLQ message, capture its receipt handle, and delete that message only.
2. Do not use `purge-queue`; it can destroy unrelated evidence if the wrong URL is selected.
3. Delete stack `saa200-messaging` and wait for `DELETE_COMPLETE`.
4. Use `aws sqs get-queue-url --queue-name <each-exact-name>` and `aws lambda get-function --function-name <exact-name>`; expect not found.
5. Delete an exact retained log group only if stack events show it remained.
6. Remove local `template.yaml`; check home Region, CloudWatch, and Billing.
