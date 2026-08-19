# Challenge Lab: Lifecycle and Recovery

## Lab profile

| Field | Value |
| --- | --- |
| Level | 100 |
| Cost label | `FREE-PLAN SAFE` |
| SAA-C03 | All domains |
| Target Region | Course home Region |
| Cleanup required | Yes |

## Outcome

Create a second private versioned bucket, recover content from a previous version, and validate a lifecycle rule.


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

- Bucket suffix: `aws-course-100-storage-challenge-<account>-<region>`.
- Module tag: `100-storage`; include every required tag.
- Keep all four S3 Block Public Access settings true.
- Use default SSE-S3, versioning, and a noncurrent-version expiration rule of 7 days.
- Upload two tiny versions of `challenge/config.txt`.
- Download the older version by its exact version ID and prove its content.

## Validate

Use `get-public-access-block`, `get-bucket-encryption`, `get-bucket-versioning`, `get-bucket-lifecycle-configuration`, `get-bucket-tagging`, and `list-object-versions`. Expected: private, `AES256`, `Enabled`, one enabled rule, four tags, and two versions.

## Controlled break and fix

Attempt to apply a lifecycle rule with `Status` set to `Active`. Capture the validation failure. Correct the enum to `Enabled`, apply it, and retrieve it.

## Cleanup

```bash
aws s3api delete-bucket-policy --bucket "$BUCKET"
aws s3api list-object-versions --bucket "$BUCKET" --prefix challenge/config.txt \
  --query 'Versions[].[Key,VersionId]' --output text |
while read -r KEY VERSION; do
  aws s3api delete-object --bucket "$BUCKET" --key "$KEY" --version-id "$VERSION"
done
aws s3api list-object-versions --bucket "$BUCKET" --prefix challenge/config.txt \
  --query 'DeleteMarkers[].[Key,VersionId]' --output text |
while read -r KEY VERSION; do
  aws s3api delete-object --bucket "$BUCKET" --key "$KEY" --version-id "$VERSION"
done
aws s3api delete-bucket-lifecycle --bucket "$BUCKET"
aws s3api delete-bucket --bucket "$BUCKET" --region "$REGION"
aws s3api head-bucket --bucket "$BUCKET"
rm -f challenge-lifecycle.json challenge-config.txt recovered-config.txt
```

Expected: `404`/`Not Found`.

Do not delete buckets or objects by a partial name, prefix wildcard, or account-wide script.
