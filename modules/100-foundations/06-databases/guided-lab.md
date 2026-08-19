# Guided Lab: DynamoDB Access Patterns

## Lab profile

| Field | Value |
| --- | --- |
| Level | 100 |
| SAA-C03 | Resilient, high-performing, and cost-optimized architectures |
| Cost label | `FREE-PLAN SAFE` |
| Target Region | Course home Region |
| Expected resources | One tiny on-demand DynamoDB table |
| Prohibited | RDS/Aurora instances, backups, global tables |
| Cleanup required | Yes |

## Objective

Create an on-demand table, use key-based reads and a conditional write, and diagnose a failed optimistic-concurrency condition.


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

## Build

```bash
export MODULE="100-databases"
export TABLE="aws-course-100-databases"
aws dynamodb create-table --region "$REGION" --table-name "$TABLE" \
  --billing-mode PAY_PER_REQUEST \
  --attribute-definitions AttributeName=PK,AttributeType=S AttributeName=SK,AttributeType=S \
  --key-schema AttributeName=PK,KeyType=HASH AttributeName=SK,KeyType=RANGE \
  --tags Key=Course,Value=aws-solutions-architect Key=Module,Value="$MODULE" \
  Key=Owner,Value="$OWNER" Key=ExpiresAt,Value="$EXPIRES_AT"
aws dynamodb wait table-exists --region "$REGION" --table-name "$TABLE"
aws dynamodb put-item --region "$REGION" --table-name "$TABLE" --item \
  '{"PK":{"S":"CART#1001"},"SK":{"S":"ITEM#A"},"Qty":{"N":"1"},"Version":{"N":"1"}}'
aws dynamodb put-item --region "$REGION" --table-name "$TABLE" --item \
  '{"PK":{"S":"CART#1001"},"SK":{"S":"ITEM#B"},"Qty":{"N":"2"},"Version":{"N":"1"}}'
```

## Validate

```bash
aws dynamodb query --region "$REGION" --table-name "$TABLE" \
  --key-condition-expression 'PK = :pk' \
  --expression-attribute-values '{":pk":{"S":"CART#1001"}}' \
  --projection-expression 'PK,SK,Qty,Version' --output table
aws dynamodb list-tags-of-resource --region "$REGION" --resource-arn \
  "$(aws dynamodb describe-table --region "$REGION" --table-name "$TABLE" --query Table.TableArn --output text)"
```

Expected: two items from a Query, not a Scan; billing mode is `PAY_PER_REQUEST`.

## Controlled break and fix

```bash
aws dynamodb update-item --region "$REGION" --table-name "$TABLE" \
  --key '{"PK":{"S":"CART#1001"},"SK":{"S":"ITEM#A"}}' \
  --update-expression 'SET Qty = :q, Version = :next' \
  --condition-expression 'Version = :expected' \
  --expression-attribute-values '{":q":{"N":"3"},":next":{"N":"3"},":expected":{"N":"2"}}'
```

Expected: `ConditionalCheckFailedException`; stored Version is 1. Fix expected/next values to 1 and 2, retry, then use `get-item` to prove Qty 3 and Version 2.

## Cleanup

```bash
aws dynamodb delete-table --region "$REGION" --table-name "$TABLE"
aws dynamodb wait table-not-exists --region "$REGION" --table-name "$TABLE"
aws dynamodb describe-table --region "$REGION" --table-name "$TABLE"
```

Expected: `ResourceNotFoundException`. No backup or replica was created.
