# Must Know: Observability

**Level:** 100 | **Cost:** `DESIGN-ONLY` | **SAA-C03:** Design Secure Architectures; Design Resilient Architectures

## Decision table

| Requirement | Prefer | Decision rule |
| --- | --- | --- |
| Who called an AWS API and when? | CloudTrail event history or a configured trail/lake | Audit-plane question. |
| Is CPU or request latency abnormal? | CloudWatch metric and alarm | Time-series operational signal. |
| Why did this request fail? | Structured application/service logs | Detailed event context. |
| Need cross-signal investigation | Correlate timestamps, request IDs, metrics, logs, and traces | No one signal answers every question. |
| Alarm must page an operator | Use a symptom tied to user impact and a tested action | Avoid noisy non-actionable thresholds. |

## Service and responsibility boundaries

- CloudTrail records supported account activity; it is not application performance monitoring.
- CloudWatch receives metrics and logs; retention and ingestion must be configured and cost-managed.
- An alarm evaluates metric data; it does not repair the cause unless an explicit action is designed.
- CloudTrail event history provides a bounded Regional management-event view and is not a substitute for a durable trail.

## Failure modes

| Failure | Observable effect | Response |
| --- | --- | --- |
| Wrong Region/time range | Telemetry appears missing | Confirm signal scope and timestamps first. |
| Metric dimensions do not match | Alarm remains INSUFFICIENT_DATA | Publish/query the exact namespace, metric, and dimensions. |
| Infinite log retention by accident | Storage grows | Set retention from compliance and investigation needs. |
| Alarm on a noisy cause | Alert fatigue | Alarm on actionable symptoms and test the response. |

## Common exam distractors

- CloudTrail is not a real-time application log service.
- A dashboard is not an alert and does not notify anyone.
- More logs are not automatically better; structured, bounded, queryable signals are the goal.

Reject an answer because it violates a stated requirement, not merely because another service is more familiar.

## Recall prompts

1. State the hardest requirement that selects each service or pattern.
2. Name the failure boundary and the customer-owned configuration.
3. Explain one cheaper option and the requirement it fails.
4. Explain one more complex option and why it is premature.

## Official references

- [What is Amazon CloudWatch?](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html)
- [CloudWatch Logs concepts](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatchLogsConcepts.html)
- [CloudTrail event history](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html)
- [CloudWatch alarm states](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html)
