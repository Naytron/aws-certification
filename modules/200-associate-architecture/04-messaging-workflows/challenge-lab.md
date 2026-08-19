# Challenge Lab - Fanout order notifications

## Lab profile

**Cost label:** `DESIGN-ONLY`

No resources are created by the core `DESIGN-ONLY` challenge. The required tags `Course`, `Module`, `Owner`, and `ExpiresAt` apply only if an approved optional deployment occurs.

## Preflight

1. Run `aws sts get-caller-identity`; do not record the account ID.
2. Run `aws configure get region` and confirm the course home Region.
3. Confirm the Free-plan/credit status and budget alerts.
4. Read `cleanup.md` before any approved optional deployment.

## Challenge

Design an order event delivered independently to billing, inventory, and analytics. Billing and inventory need durable backpressure; analytics may filter events by value.

1. Complete standard preflight.
2. Compare SNS-to-three-SQS fanout with EventBridge rules to queues.
3. Define event contract, idempotency key, retry, DLQ, replay, encryption, and least-privilege policies.
4. Simulate one poison billing event and one unavailable analytics consumer.
5. State where Step Functions adds value and where it would be needless.
6. Verify no resources were created.

Pass when one subscriber's failure cannot block the others and replay cannot duplicate the business outcome.

## Validate

Confirm every stated pass condition with a diagram, decision table, or observable inventory result. Verify that no AWS resources were created for the core challenge and that any optional deployment uses the four required tags.

## Cleanup

No resources are created. Run the inventory checks in [cleanup](cleanup.md), retain only sanitized design evidence, and do not delete pre-existing queues, topics, buses, or state machines.

## Official references

- [SQS visibility timeout](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html)
- [SNS architecture](https://docs.aws.amazon.com/sns/latest/dg/welcome.html)
- [Choosing Step Functions workflows](https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html)
