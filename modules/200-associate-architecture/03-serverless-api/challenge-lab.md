# Challenge Lab - Idempotent order endpoint

## Lab profile

**Cost label:** `DESIGN-ONLY` with an optional `USES CREDITS` extension.

No resources are created by the core `DESIGN-ONLY` challenge. The required tags `Course`, `Module`, `Owner`, and `ExpiresAt` apply only if an approved optional deployment occurs.

## Preflight

1. Run `aws sts get-caller-identity`; do not record the account ID.
2. Run `aws configure get region` and confirm the course home Region.
3. Confirm the Free-plan/credit status and budget alerts.
4. Read `cleanup.md` before any approved optional deployment.

## Challenge

Design `POST /orders` so a retried request cannot create two orders. Specify request token validation, DynamoDB conditional write, response codes, IAM actions, throttling, structured logs, alarms, and asynchronous handoff for slow fulfillment. Perform standard preflight.

Optional: extend the guided stack with a tiny on-demand DynamoDB table and test the same token twice. Use an exact table name and delete it through the stack immediately. Do not add a NAT Gateway, provisioned concurrency, custom domain, or persistent database.

Pass when duplicate, throttle, malformed request, function error, and downstream failure have distinct observable outcomes and cleanup is verified.

## Validate

Confirm every stated pass condition with a diagram, decision table, or observable inventory result. Verify that no AWS resources were created for the core challenge and that any optional deployment uses the four required tags.

## Cleanup

For the core challenge, no cloud resources were created; run the module inventory checks and leave pre-existing resources unchanged. If the optional extension was approved, delete its exact DynamoDB table through the guided stack, delete the exact stack as directed in [cleanup](cleanup.md), and verify both are absent.

## Official references

- [API Gateway HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html)
- [Lambda quotas](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html)
- [Lambda best practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
