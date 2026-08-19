# Explained Answers - Serverless API Architecture

## 1. When is an HTTP API usually preferred over a REST API?

**Answer:** When its simpler feature set meets requirements and lower cost/complexity matter. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 2. Why is an API key not user authorization?

**Answer:** It identifies a calling application for metering/throttling but is not a strong identity control. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 3. What makes a retried create operation safe?

**Answer:** An idempotency token enforced with a durable conditional operation. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 4. What does Lambda concurrency measure?

**Answer:** The number of function invocations executing at the same time. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 5. Why avoid putting a Lambda in a VPC by default?

**Answer:** It adds networking dependencies and egress design without benefit unless private resources require it. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 6. What response fits accepted long-running work?

**Answer:** Usually `202 Accepted` with a durable job identifier. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 7. What should throttling protect?

**Answer:** Backend capacity and fairness; it is not a guaranteed budget cap. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 8. When is provisioned concurrency justified?

**Answer:** When measured cold-start latency violates a requirement worth its continuing cost. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 9. What must logs avoid echoing?

**Answer:** Credentials, authorization headers, tokens, and sensitive payloads. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 10. What can replace Lambda for work exceeding its constraints?

**Answer:** A decoupled ECS task or another suitable compute service while retaining asynchronous intake. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## Review rule

For every miss, write the governing rule in your own words and apply it to a new scenario before closing the error-log entry.
