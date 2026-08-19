# Evidence

Do not record secrets, account numbers, full ARNs, queue URLs, real API endpoints, message receipt handles, or customer data.

## Identity and scope

- Learner alias:
- Date:
- Home Region:
- Free plan/credit preflight:
- Cleanup deadline:

## Architecture

- Foundation diagram:
- Trust/data/failure boundaries:
- Production authentication:
- Selected independent extension:

## Resource inventory

| Type | Exact non-sensitive name | Purpose | Tags confirmed | Removed |
| --- | --- | --- | --- | --- |
| HTTP API | `saa3-orders-api` | Intake endpoint | | |
| Lambda | `saa3-order-intake` | Validate/enqueue | | |
| SQS | `saa3-orders` | Buffer | | |
| Lambda | `saa3-order-processor` | Idempotent worker | | |
| DynamoDB | `saa3-order-state` | Order state | | |
| SQS | `saa3-orders-dlq` | Failure isolation | | |
| Alarm | `saa3-orders-dlq-visible` | Failure detection | | |

## Validation

| Requirement | Sanitized observation | Pass |
| --- | --- | --- |
| 202 durable intake | | |
| Valid order processed | | |
| Invalid order rejected | | |
| Duplicate harmless | | |
| Least-privilege roles | | |
| Logs/metrics/alarm | | |

## Failure and recovery

- Fault:
- Queue/retry/DLQ observations:
- Log evidence:
- Root cause:
- Correction:
- Redrive result:
- Alarm recovery:
- Prevention:

## Decision records

Record three, including one rejected alternative:

- Requirement:
- Decision:
- Alternative:
- Exact failure/tradeoff:

## Cleanup proof

- API/mapping/functions absent:
- Queues absent:
- Table deletion complete:
- Alarm/log groups absent:
- Roles/policies absent:
- Billing/usage checked:
- Unexpected resources:
