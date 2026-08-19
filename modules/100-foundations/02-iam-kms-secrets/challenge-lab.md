# Challenge Lab: Scoped Configuration Reader

## Lab profile

| Field | Value |
| --- | --- |
| Level | 100 |
| Cost label | `FREE-PLAN SAFE` |
| SAA-C03 | Design Secure Architectures |
| Target Region | Course home Region |
| Cleanup required | Yes |

## Outcome

Create a second temporary role that can read exactly one SecureString but cannot list all parameters or read a sibling parameter.


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

- `MODULE=100-iam`
- Role: `aws-course-100-iam-challenge`
- Parameters: `/aws-course/100-iam/allowed` and `/aws-course/100-iam/blocked`
- Trust only the current MFA-protected course IAM user.
- Use standard SecureString parameters with the AWS managed SSM key.
- Tag the role and both parameters.
- Grant only `ssm:GetParameter` on the `allowed` parameter.
- Assume the role for 900 seconds; do not create any access key.

## Validate

Using inline STS session environment variables, prove:

1. `GetParameter --with-decryption` succeeds for `allowed`.
2. It returns `AccessDeniedException` for `blocked`.
3. `DescribeParameters` is denied.
4. All three resources have the required tags.

## Controlled break and fix

First write the policy resource ARN without the `parameter/` path segment. Observe access denied for `allowed`; compare the requested resource ARN in the error to the policy, correct the ARN, wait for propagation, and retry.

## Cleanup

```bash
aws iam delete-role-policy --role-name aws-course-100-iam-challenge --policy-name ReadAllowedOnly
aws iam delete-role --role-name aws-course-100-iam-challenge
aws ssm delete-parameter --region "$REGION" --name /aws-course/100-iam/allowed
aws ssm delete-parameter --region "$REGION" --name /aws-course/100-iam/blocked
rm -f challenge-trust.json challenge-policy.json challenge-session.json
aws iam get-role --role-name aws-course-100-iam-challenge
```

Expected: `NoSuchEntity`. Verify each parameter separately with `get-parameter`; each must return `ParameterNotFound`.
