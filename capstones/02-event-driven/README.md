# Capstone 02 - Event-Driven Serverless Order Processing

## Outcome

Build and defend a small asynchronous order platform that accepts work quickly, buffers bursts, processes idempotently, isolates poison messages, exposes useful telemetry, and cleans up completely.

## Architecture

`HTTP API -> intake Lambda -> SQS source queue -> processor Lambda -> DynamoDB`

Messages that repeatedly fail move to an SQS dead-letter queue (DLQ). CloudWatch logs, metrics, and a DLQ alarm make failure visible.

## Cost and scope

The guided foundation is `FREE-PLAN SAFE` only after confirming current Free-plan service eligibility and using the stated tiny limits. The Free plan prevents charges while active, but usage consumes credits. Complete unavailable features `DESIGN-ONLY`; never upgrade the plan for this lab.

Production extensions such as multi-Region recovery, WAF, custom domains, provisioned concurrency, paid notification endpoints, and sustained load tests are design-only.

## Files

1. [Requirements](requirements.md)
2. [Guided foundation](guided-foundation.md)
3. [Independent extensions](independent-extensions.md)
4. [Failure exercise](failure-exercise.md)
5. [Validation](validation.md)
6. [Cleanup](cleanup.md)
7. [Evidence](evidence.md)
8. [Rubric](rubric.md)

## Safety rules

- Use one course home Region and synthetic orders.
- Apply `Course`, `Module`, `Owner`, and `ExpiresAt` tags.
- Use temporary credentials and least-privilege Lambda roles; create no access keys.
- Create at most two queues, two functions, one HTTP API, one table, and one alarm.
- Send at most ten messages, set log retention to 1 day, and clean up in the same session.
- Never put secrets, account IDs, full ARNs, or real endpoints in evidence.
- No wildcard deletion commands.

## Completion gate

Score at least 80/100 with no critical failure, complete one independent extension, recover one DLQ message, and prove cleanup.

## Official references

- [SQS best practices](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-best-practices.html)
- [Lambda with SQS](https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html)
- [AWS Free plan](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html)
