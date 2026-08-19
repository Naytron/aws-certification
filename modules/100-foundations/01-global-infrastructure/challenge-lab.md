# Challenge Lab: Region Selection Record

## Lab profile

| Field | Value |
| --- | --- |
| Level | 100 |
| Cost label | `FREE-PLAN SAFE` |
| SAA-C03 | All domains |
| Target Region | Course home Region |
| Cleanup required | Yes |

## Outcome

Without copying the guided procedure, compare your home Region with one alternative and leave a tagged Regional decision marker.


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

1. Set `MODULE=100-global` and `PARAM=/aws-course/100-global/challenge`.
2. Compare available AZ IDs and one required service endpoint in two Regions.
3. Write a standard SSM String parameter in the selected Region containing only `selected`.
4. Apply all four required tags.
5. Record a decision table covering latency, compliance, service availability, resilience, and cost.

## Validate

```bash
aws ssm get-parameter --region "$REGION" --name "$PARAM" --query 'Parameter.Type' --output text
aws ssm list-tags-for-resource --region "$REGION" --resource-type Parameter \
  --resource-id "$PARAM" --query 'TagList[].[Key,Value]' --output table
```

Expected type: `String`; all required tags are present.

## Controlled break and fix

Request the parameter from the alternative Region. Observe `ParameterNotFound`, then repeat in `$REGION`. Explain Regional resource scope.

## Cleanup

```bash
aws ssm delete-parameter --region "$REGION" --name "$PARAM"
aws ssm get-parameter --region "$REGION" --name "$PARAM"
```

Expected final result: `ParameterNotFound`. Do not delete parameters by path or wildcard.
