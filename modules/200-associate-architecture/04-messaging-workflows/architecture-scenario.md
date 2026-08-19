# Architecture Scenario - Travel reservation

Booking requires reserve flight, reserve hotel, charge payment, and compensate completed steps if a later step fails. Every transition must be auditable.

- **A:** SNS topic and hope subscribers run in order.
- **B:** Step Functions Standard workflow with retries, catches, and explicit compensation; SQS where a step needs backpressure.
- **C:** One Lambda calling every dependency in sequence for up to 15 minutes.

Choose B. The state machine makes ordering, retry, timeout, and compensation visible. A fanout does not coordinate a saga; C hides durable state and couples all failures to one invocation. If steps become fire-and-forget and independent, SNS/EventBridge with queued subscribers may replace orchestration.
