# Must Know - Messaging and Workflow Architecture

## Selection table

| Need | Prefer | Boundary |
| --- | --- | --- |
| Buffer work for competing consumers | SQS | Consumers pull; Standard queues are at-least-once and best-effort ordered |
| Fan out one publication to subscribers | SNS | Push to queues, Lambda, HTTP/S, and other subscribers |
| Route events by content across producers/consumers | EventBridge | Event bus with rules, schemas, archive/replay options |
| Coordinate steps, branches, waits, and errors | Step Functions | Workflow state and execution history, not a general queue |
| Strict message group ordering and deduplication | SQS FIFO | Throughput and grouping tradeoffs; ordering is per message group |

Set SQS visibility timeout longer than normal processing with margin, and extend it deliberately for variable work. A visibility timeout is not message retention. A redrive policy moves repeatedly failed messages to a DLQ; monitor DLQ age/count and define replay after repair.

## Reliability and security

- Assume duplicates and make consumers idempotent. Exactly-once business outcome requires application state, not faith in transport.
- Delete an SQS message only after the business transaction succeeds.
- Use resource policies and KMS only when requirements demand them; grant the producing service and consuming role narrowly.
- EventBridge events and SNS messages can reach multiple targets; isolate subscribers with queues where independent retry/backpressure matters.
- Step Functions Standard fits durable, auditable, potentially long workflows; Express fits high-volume short workflows with different execution semantics and pricing.

## Distractors

- Increasing visibility timeout fixes poison data: it only delays retry.
- SNS alone buffers offline HTTP subscribers indefinitely: add SQS where durable buffering is required.
- One FIFO message group scales ordered processing: one group serializes work.
- DLQ is automatic remediation: it is evidence plus isolation; operators still diagnose and replay.

## Official references

- [SQS visibility timeout](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html)
- [SNS architecture](https://docs.aws.amazon.com/sns/latest/dg/welcome.html)
- [Choosing Step Functions workflows](https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html)
