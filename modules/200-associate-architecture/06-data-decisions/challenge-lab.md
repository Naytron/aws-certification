# Challenge Lab - Polyglot persistence decision

## Lab profile

**Cost label:** `DESIGN-ONLY`

No resources are created by the core `DESIGN-ONLY` challenge. The required tags `Course`, `Module`, `Owner`, and `ExpiresAt` apply only if an approved optional deployment occurs.

## Preflight

1. Run `aws sts get-caller-identity`; do not record the account ID.
2. Run `aws configure get region` and confirm the course home Region.
3. Confirm the Free-plan/credit status and budget alerts.
4. Read `cleanup.md` before any approved optional deployment.

## Challenge

Map these access patterns independently: account transactions with joins, product lookup by SKU at burst scale, product images, shared Linux content, hot session cache, and monthly analytics over historical events. Select a service for each, state key/index/schema choices, HA and backup behavior, consistency requirement, encryption/authorization boundary, and cost driver.

Perform standard preflight. Include one failure caused by a hot DynamoDB key and one caused by treating a cache as durable. Pass when each choice follows an access pattern rather than a one-database preference. Verify no resources exist.

## Validate

Confirm every stated pass condition with a diagram, decision table, or observable inventory result. Verify that no AWS resources were created for the core challenge and that any optional deployment uses the four required tags.

## Cleanup

This challenge creates no resources. Run the exact service inventory checks in [cleanup](cleanup.md), keep the sanitized decision matrix, and leave all pre-existing data services unchanged.

## Official references

- [AWS database decision guide](https://docs.aws.amazon.com/decision-guides/latest/databases-on-aws-how-to-choose/databases-on-aws-how-to-choose.html)
- [Athena performance optimization](https://docs.aws.amazon.com/athena/latest/ug/performance-tuning.html)
- [S3 storage classes](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html)
