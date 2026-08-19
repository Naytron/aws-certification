# Cleanup: Global Infrastructure

**Level:** 100 | **Cost:** `FREE-PLAN SAFE`

Set the exact values used by the lab:

```bash
REGION="${AWS_REGION:-$(aws configure get region)}"
PARAM="/aws-course/100-global/region-note"       # guided
aws ssm delete-parameter --region "$REGION" --name "$PARAM"
aws ssm get-parameter --region "$REGION" --name "$PARAM"
```

For the challenge, repeat only with `PARAM=/aws-course/100-global/challenge`. `ParameterNotFound` is the expected verification. Parameter tags are deleted with the parameter. Check the SSM Parameter Store console in the same Region and Billing/Free Tier views. No global service resource was created.
