# Guided Lab: Temporary Role and SecureString

## Lab profile

| Field | Value |
| --- | --- |
| Level | 100 |
| SAA-C03 | Design Secure Architectures |
| Cost label | `FREE-PLAN SAFE` |
| Target Region | Course home Region |
| Expected resources | One IAM role, one inline policy, one standard SecureString |
| Key choice | AWS managed `alias/aws/ssm`; no customer managed KMS key |
| Cleanup required | Yes |

## Objective

Assume a least-privilege role with STS temporary credentials and retrieve one encrypted parameter after diagnosing an implicit deny.


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

The course bootstrap administrator in `account/security-baseline.md` is a constrained learning-account exception, not production practice. This lab narrows work to a role session.

```bash
export MODULE="100-iam"
export ROLE="aws-course-100-iam-reader"
export PARAM="/aws-course/100-iam/demo-secret"
CALLER_ARN=$(aws sts get-caller-identity --query Arn --output text)
case "$CALLER_ARN" in *:user/*) ;; *) echo "Use the MFA-protected course IAM user in CloudShell."; exit 1;; esac
printf '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":"%s"},"Action":"sts:AssumeRole"}]}' \
  "$CALLER_ARN" > trust.json
aws iam create-role --role-name "$ROLE" --assume-role-policy-document file://trust.json \
  --tags Key=Course,Value=aws-solutions-architect Key=Module,Value="$MODULE" \
  Key=Owner,Value="$OWNER" Key=ExpiresAt,Value="$EXPIRES_AT"
aws ssm put-parameter --region "$REGION" --name "$PARAM" --type SecureString \
  --value "training-value-change-me" --overwrite
aws ssm add-tags-to-resource --region "$REGION" --resource-type Parameter \
  --resource-id "$PARAM" --tags Key=Course,Value=aws-solutions-architect \
  Key=Module,Value="$MODULE" Key=Owner,Value="$OWNER" Key=ExpiresAt,Value="$EXPIRES_AT"
aws sts assume-role --role-arn "arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):role/$ROLE" \
  --role-session-name course-reader --duration-seconds 900 > session.json
```

## Controlled break and fix

The role trust permits a session, but no permissions policy grants SSM access. Use the session only for this command:

```bash
AWS_ACCESS_KEY_ID=$(python -c "import json;print(json.load(open('session.json'))['Credentials']['AccessKeyId'])") \
AWS_SECRET_ACCESS_KEY=$(python -c "import json;print(json.load(open('session.json'))['Credentials']['SecretAccessKey'])") \
AWS_SESSION_TOKEN=$(python -c "import json;print(json.load(open('session.json'))['Credentials']['SessionToken'])") \
aws ssm get-parameter --region "$REGION" --name "$PARAM" --with-decryption
```

Expected: `AccessDeniedException` (implicit deny). Add the narrow permission using the original CloudShell identity:

```bash
ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
printf '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":"ssm:GetParameter","Resource":"arn:aws:ssm:%s:%s:parameter/aws-course/100-iam/demo-secret"}]}' \
  "$REGION" "$ACCOUNT" > permission.json
aws iam put-role-policy --role-name "$ROLE" --policy-name ReadOneCourseParameter \
  --policy-document file://permission.json
sleep 10
```

Repeat the temporary-session command. Expected: parameter metadata and decrypted value. Do not record the value.

## Validate

```bash
aws iam list-role-tags --role-name "$ROLE" --output table
aws ssm list-tags-for-resource --region "$REGION" --resource-type Parameter \
  --resource-id "$PARAM" --output table
aws iam get-role-policy --role-name "$ROLE" --policy-name ReadOneCourseParameter \
  --query 'PolicyDocument.Statement[0].Action' --output text
```

## Cleanup

```bash
aws iam delete-role-policy --role-name "$ROLE" --policy-name ReadOneCourseParameter
aws iam delete-role --role-name "$ROLE"
aws ssm delete-parameter --region "$REGION" --name "$PARAM"
rm -f trust.json permission.json session.json
aws iam get-role --role-name "$ROLE"
aws ssm get-parameter --region "$REGION" --name "$PARAM"
```

Expected: `NoSuchEntity` and `ParameterNotFound`. The SecureString uses an AWS managed key, so no key deletion is required.
