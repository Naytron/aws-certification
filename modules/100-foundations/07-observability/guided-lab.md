# Guided Lab: Structured Logs and a Metric Filter

## Lab profile

| Field | Value |
| --- | --- |
| Level | 100 |
| SAA-C03 | Secure and resilient architectures |
| Cost label | `USES CREDITS` |
| Target Region | Course home Region |
| Expected resources | One log group/stream and one metric filter/custom metric |
| Cleanup required | Yes, in this session |

## Objective

Write structured events, filter an error, derive a metric, and distinguish operational evidence from CloudTrail API audit history.


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
export MODULE="100-observability"
export LOG_GROUP="/aws/course/100-observability"
export LOG_STREAM="guided"
aws logs create-log-group --region "$REGION" --log-group-name "$LOG_GROUP" \
  --tags Course=aws-solutions-architect,Module="$MODULE",Owner="$OWNER",ExpiresAt="$EXPIRES_AT"
aws logs put-retention-policy --region "$REGION" --log-group-name "$LOG_GROUP" \
  --retention-in-days 1
aws logs create-log-stream --region "$REGION" --log-group-name "$LOG_GROUP" \
  --log-stream-name "$LOG_STREAM"
TS=$(($(date +%s)*1000))
aws logs put-log-events --region "$REGION" --log-group-name "$LOG_GROUP" \
  --log-stream-name "$LOG_STREAM" --log-events \
  timestamp=$TS,message='{"level":"INFO","requestId":"r-100","message":"checkout started"}' \
  timestamp=$((TS+1)),message='{"level":"ERROR","requestId":"r-100","message":"payment timeout"}'
```

## Controlled break and fix

Try an invalid metric-filter pattern:

```bash
aws logs put-metric-filter --region "$REGION" --log-group-name "$LOG_GROUP" \
  --filter-name CourseErrors --filter-pattern '{ $.level = "ERROR" ' \
  --metric-transformations metricName=ErrorCount,metricNamespace=AWS-Course-100,metricValue=1
```

Expected: `InvalidParameterException`. Fix the closing brace:

```bash
aws logs put-metric-filter --region "$REGION" --log-group-name "$LOG_GROUP" \
  --filter-name CourseErrors --filter-pattern '{ $.level = "ERROR" }' \
  --metric-transformations metricName=ErrorCount,metricNamespace=AWS-Course-100,metricValue=1
TS=$(($(date +%s)*1000))
aws logs put-log-events --region "$REGION" --log-group-name "$LOG_GROUP" \
  --log-stream-name "$LOG_STREAM" --log-events \
  timestamp=$TS,message='{"level":"ERROR","requestId":"r-101","message":"test error"}'
```

## Validate

```bash
aws logs filter-log-events --region "$REGION" --log-group-name "$LOG_GROUP" \
  --filter-pattern '{ $.level = "ERROR" }' --query 'events[].message' --output text
aws logs describe-metric-filters --region "$REGION" --log-group-name "$LOG_GROUP" --output table
aws logs list-tags-log-group --region "$REGION" --log-group-name "$LOG_GROUP" --output table
aws cloudtrail lookup-events --region "$REGION" --max-results 5 \
  --lookup-attributes AttributeKey=EventName,AttributeValue=PutMetricFilter \
  --query 'Events[].[EventTime,EventName]' --output table
```

CloudWatch Logs contains application-like events; CloudTrail shows the API configuration call. Metric publication can take several minutes.

## Cleanup

Delete the metric filter, then log group, using [cleanup.md](cleanup.md). A custom metric may remain visible without new data; no further datapoints are emitted after the filter/log group is gone.
