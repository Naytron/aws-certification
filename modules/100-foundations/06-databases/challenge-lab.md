# Challenge Lab: Query an Alternate Access Pattern

## Lab profile

| Field | Value |
| --- | --- |
| Level | 100 |
| Cost label | `FREE-PLAN SAFE` |
| SAA-C03 | Resilient, high-performing, and cost-optimized architectures |
| Target Region | Course home Region |
| Cleanup required | Yes |

## Outcome

Create an on-demand order table that supports lookup by order ID and by customer without scanning.


## Preflight

Use AWS CloudShell so the console session supplies temporary credentials. Do not create an access key.

```bash
aws sts get-caller-identity
REGION="${AWS_REGION:-$(aws configure get region)}"
test -n "$REGION" || { echo "Set a course home Region before continuing."; exit 1; }
aws ec2 describe-regions --region-names "$REGION" --query 'Regions[0].RegionName' --output text
export OWNER="student"
export EXPIRES_AT="$(date -u -d '+4 hours' '+%Y-%m-%dT%H:%M:%SZ')"
```

Privately confirm that the caller and Region are expected. Do not paste the account ID or full ARN into evidence. Replace `OWNER` and `EXPIRES_AT` with a non-sensitive alias and a near-future UTC cleanup time.

Required tags:

| Key | Value |
| --- | --- |
| `Course` | `aws-solutions-architect` |
| `Module` | module value shown below |
| `Owner` | `$OWNER` |
| `ExpiresAt` | `$EXPIRES_AT` |

Confirm budget alerts and credit balance, then read the Cleanup section before creating resources.

## Requirements

- Table `aws-course-100-databases-challenge`, module `100-databases`.
- Base key: `OrderId` (String).
- GSI `ByCustomer` with partition key `CustomerId` (String) and sort key `CreatedAt` (String).
- Projection `ALL`, on-demand billing, all required tags.
- Insert three tiny synthetic orders across two customers.
- Retrieve one order with `GetItem`; retrieve one customer's date-ordered records with `Query` on the GSI.

## Validate

Prove table and GSI are `ACTIVE`, billing mode is on-demand, tags are complete, `GetItem` returns one order, and the GSI Query returns only the selected customer.

## Controlled break and fix

Run a base-table Query using `CustomerId` as the key condition. Capture `ValidationException` because it is not the base partition key. Fix by specifying `--index-name ByCustomer` and querying the GSI. Explain why a Scan plus filter is a distractor.

## Cleanup

```bash
aws dynamodb delete-table --region "$REGION" \
  --table-name aws-course-100-databases-challenge
aws dynamodb wait table-not-exists --region "$REGION" \
  --table-name aws-course-100-databases-challenge
aws dynamodb describe-table --region "$REGION" \
  --table-name aws-course-100-databases-challenge
```

Expected: `ResourceNotFoundException`. Confirm no on-demand backup, global-table replica, or export was created.
