# Evidence

Do not record secrets, access keys, session tokens, account numbers, full ARNs, real API endpoints, private endpoints, or customer data.

## Identity and scope

- Learner alias:
- Date:
- Home Region:
- Free plan/credit preflight confirmed:
- Cleanup deadline:

## Architecture

- Production diagram:
- Scaled-lab diagram:
- Trust boundaries:
- Failure boundaries:
- Production-only expensive components:

## Resource inventory

| Type | Exact non-sensitive name | Purpose | Required tags confirmed | Removed |
| --- | --- | --- | --- | --- |
| HTTP API | `saa3-product-api` | Presentation/API tier | | |
| Lambda | `saa3-product-handler` | Application tier | | |
| DynamoDB | `saa3-products` | Data tier | | |
| Alarm | `saa3-product-handler-errors` | Error detection | | |
| Log group | `/aws/lambda/saa3-product-handler` | Diagnostics | N/A if unsupported | |
| IAM role | `saa3-lambda-role` | Workload identity | | |

## Validation

| Requirement | Sanitized observation | Pass |
| --- | --- | --- |
| Health | | |
| Product write/read | | |
| Least privilege | | |
| Logs/metrics/alarm | | |
| Region/tags | | |

## Failure

- Fault:
- Symptom:
- Metric/log evidence:
- Root cause:
- Time to detect:
- Time to restore:
- Prevention:

## Decisions

Record three:

- Decision and requirement:
- Alternative:
- Exact reason rejected:

## Cleanup proof

- API absent:
- Lambda absent:
- Table deletion complete:
- Alarm/log group absent:
- Lab IAM role/policy absent:
- Billing/usage checked:
- Unexpected resources:
