# Failure Exercise - Broken Data-Tier Binding

## Purpose

Demonstrate diagnosis through API symptoms, Lambda metrics, and logs without deleting or damaging data.

## Fault

1. Record the current non-secret environment variable: `TABLE_NAME=saa3-products`.
2. Change it to `TABLE_NAME=saa3-products-missing`.
3. Invoke `GET /products/p-001` once.

Do not change IAM policies or delete the table.

## Expected evidence

- The API returns a server error.
- Lambda `Errors` increments.
- The exact Lambda log stream shows a DynamoDB resource-not-found error and request ID.
- The error alarm changes state after metric evaluation.

Do not copy account IDs, ARNs containing account IDs, or full endpoints into repository evidence.

## Diagnose

Use this sequence:

1. Confirm `/health` still runs; this separates runtime health from data-path health.
2. Compare the failed route and timestamp.
3. Inspect Lambda `Errors` and invocation logs.
4. Compare the configured table name with the existing table.
5. State the root cause: configuration points to a nonexistent dependency.

## Restore

Set `TABLE_NAME` back to `saa3-products`, wait for the update to complete, then:

1. Repeat `GET /products/p-001`.
2. Confirm HTTP 200 and the expected synthetic item.
3. Confirm no new Lambda error for the restored invocation.
4. Record time to detect and time to restore.

## Production prevention

Defend at least three:

- Infrastructure-as-code references rather than manually duplicated names.
- Pre-deployment integration test.
- Deployment alarm and rollback.
- Configuration validation at startup.
- Separate readiness/dependency health signals.
- Change audit and least-privilege deployment role.
