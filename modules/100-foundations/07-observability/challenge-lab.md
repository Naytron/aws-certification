# Challenge Lab: Actionable Alarm

## Lab profile

| Field | Value |
| --- | --- |
| Level | 100 |
| Cost label | `USES CREDITS` |
| SAA-C03 | Secure and resilient architectures |
| Target Region | Course home Region |
| Cleanup required | Yes, in this session |

## Outcome

Publish a bounded custom metric, create an alarm, diagnose a dimension mismatch, and clean up immediately.


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

- Namespace `AWS-Course-100`, metric `Latency`, dimension `Stage=challenge`.
- Alarm `aws-course-100-observability-latency`; threshold 500 ms, one 60-second period, no actions.
- Required tags on the alarm using `cloudwatch tag-resource`.
- Publish one value of 800 ms.
- Do not create SNS topics or subscriptions.

## Validate

Use `get-metric-data` or `get-metric-statistics` to show the datapoint, `describe-alarms` to show configuration/state, and `list-tags-for-resource` to show all tags. State transitions can take several minutes.

## Controlled break and fix

First configure the alarm with dimension `Stage=production` while the datapoint uses `Stage=challenge`. Observe `INSUFFICIENT_DATA`. Compare dimensions, update the alarm to `Stage=challenge`, republish 800 ms, and wait for `ALARM`. Explain why metric dimensions are part of metric identity.

## Cleanup

```bash
aws cloudwatch delete-alarms --region "$REGION" \
  --alarm-names aws-course-100-observability-latency
aws cloudwatch describe-alarms --region "$REGION" \
  --alarm-names aws-course-100-observability-latency \
  --query 'MetricAlarms' --output json
```

Expected: `[]`. Custom metric definitions age out when no data is published; there is no delete-metric API. Do not publish more data. Check that no SNS resource or dashboard was created.
