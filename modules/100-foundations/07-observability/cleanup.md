# Cleanup: Observability

**Level:** 100 | **Cost:** `USES CREDITS`

Delete dependents before their source:

```bash
REGION="${AWS_REGION:-$(aws configure get region)}"
LOG_GROUP="/aws/course/100-observability"
aws logs delete-metric-filter --region "$REGION" --log-group-name "$LOG_GROUP" --filter-name CourseErrors
aws logs delete-log-group --region "$REGION" --log-group-name "$LOG_GROUP"
aws logs describe-log-groups --region "$REGION" --log-group-name-prefix "$LOG_GROUP" \
  --query 'logGroups[?logGroupName==`/aws/course/100-observability`]' --output json
aws cloudwatch delete-alarms --region "$REGION" --alarm-names aws-course-100-observability-latency
aws cloudwatch describe-alarms --region "$REGION" \
  --alarm-names aws-course-100-observability-latency --query MetricAlarms --output json
```

Expected outputs: `[]` and `[]`. CloudTrail event history is AWS-provided history and was not created by the lab. Custom metric definitions cannot be deleted; stop publication and they age out. Confirm no SNS topic, dashboard, trail, or log group was added.
