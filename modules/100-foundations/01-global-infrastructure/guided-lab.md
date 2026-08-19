# Guided Lab: Scope and Region Evidence

## Lab profile

| Field | Value |
| --- | --- |
| Level | 100 |
| SAA-C03 | All domains |
| Cost label | `FREE-PLAN SAFE` |
| Target Region | Course home Region |
| Expected resources | One temporary standard SSM String parameter |
| Cleanup required | Yes |

## Objective

Prove Regional/AZ scope with CLI discovery, create one tagged Regional marker, and diagnose a wrong-Region request.


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
export MODULE="100-global"
export PARAM="/aws-course/100-global/region-note"
aws ec2 describe-availability-zones --region "$REGION" \
  --filters Name=state,Values=available \
  --query 'AvailabilityZones[].{Name:ZoneName,Id:ZoneId}' --output table
aws ssm put-parameter --region "$REGION" --name "$PARAM" --type String \
  --value "regional-marker" --overwrite
aws ssm add-tags-to-resource --region "$REGION" --resource-type Parameter \
  --resource-id "$PARAM" --tags \
  Key=Course,Value=aws-solutions-architect Key=Module,Value="$MODULE" \
  Key=Owner,Value="$OWNER" Key=ExpiresAt,Value="$EXPIRES_AT"
```

## Validate

```bash
aws ssm get-parameter --region "$REGION" --name "$PARAM" \
  --query 'Parameter.{Name:Name,Type:Type}' --output table
aws ssm list-tags-for-resource --region "$REGION" \
  --resource-type Parameter --resource-id "$PARAM" --output table
```

Observe at least two AZ names if the Region exposes them. Record AZ IDs as the stable cross-account identifiers.

## Controlled break and fix

Break the endpoint selection without changing resources:

```bash
aws ec2 describe-availability-zones --region us-not-a-region-1 --max-items 1
```

Expected: endpoint/Region validation failure. Fix by repeating with `--region "$REGION"`. Record why a wrong console/CLI Region can make valid resources appear missing.

## Cleanup

```bash
aws ssm delete-parameter --region "$REGION" --name "$PARAM"
aws ssm get-parameter --region "$REGION" --name "$PARAM"
```

The final command must return `ParameterNotFound`.

## Evidence

Record redacted AZ output, parameter tags, the break/fix, and deletion in the course lab-evidence template.
