# Must Know - Serverless API Architecture

## Boundaries and decisions

| Requirement | Prefer | Reason |
| --- | --- | --- |
| Low-cost REST-like endpoint with simple features | API Gateway HTTP API plus Lambda | Fewer REST API features, lower complexity and price |
| API keys, usage plans, request validation, or richer transformations | API Gateway REST API | Feature requirement justifies it |
| Long-running asynchronous work | Accept request, enqueue, return `202` | API and Lambda timeouts should not own the workflow |
| Per-user authorization | JWT/Cognito or IAM as appropriate | API keys identify consumers for metering; they are not authorization |
| Durable idempotent mutation | Client token plus conditional write | Retries must not duplicate business effects |

Lambda scales by concurrent executions, not by request rate alone. Duration, downstream capacity, account/Region concurrency, burst scaling, payload sizes, and timeouts can all become architecture constraints. Check current quotas rather than memorizing values.

## Failure and security rules

- Use execution roles with only required actions and resources. Resource policies govern who may invoke where supported.
- API Gateway throttling protects backends but is best effort, not a cost ceiling or WAF.
- Synchronous invocation returns function errors to the caller/integrator. Asynchronous invocation retries and can send failures to destinations or dead-letter queues.
- Put a function in a VPC only for resources requiring VPC connectivity. Doing so changes networking and may require endpoints or egress; never add a NAT Gateway silently.
- Structured logs, correlation IDs, metrics, and alarms must distinguish client errors, integration errors, throttles, and function faults.

## Distractors

- Longer Lambda timeout for a human-scale batch job: decouple it.
- API key as authentication: use an authorizer/IAM.
- Provisioned concurrency for all functions: pay only when latency evidence requires it.
- Lambda in public subnet gets public internet: it does not receive a public IP merely from subnet placement.

## Official references

- [API Gateway HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html)
- [Lambda quotas](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html)
- [Lambda best practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
