# Cleanup: IAM, KMS, and Secrets

**Level:** 100 | **Cost:** `FREE-PLAN SAFE`

Delete dependents before roles, using exact names:

```bash
REGION="${AWS_REGION:-$(aws configure get region)}"
aws iam delete-role-policy --role-name aws-course-100-iam-reader --policy-name ReadOneCourseParameter
aws iam delete-role --role-name aws-course-100-iam-reader
aws ssm delete-parameter --region "$REGION" --name /aws-course/100-iam/demo-secret
```

For the challenge, delete `ReadAllowedOnly`, then `aws-course-100-iam-challenge`, then the two explicitly named parameters. Remove local JSON session files. Verify roles with `iam get-role` (`NoSuchEntity`) and parameters one at a time (`ParameterNotFound`). No customer managed KMS key or Secrets Manager secret was created. Never schedule deletion of an unrelated key.
