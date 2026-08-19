# Guided Lab: Private Versioned S3 Bucket

## Lab profile

| Field | Value |
| --- | --- |
| Level | 100 |
| SAA-C03 | All domains |
| Cost label | `FREE-PLAN SAFE` |
| Target Region | Course home Region |
| Expected resources | One small S3 bucket, two tiny object versions, one lifecycle rule |
| Cleanup required | Yes |

## Objective

Build a private, encrypted, versioned bucket; recover a prior object version; and enforce encryption headers with a bucket policy.


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
export MODULE="100-storage"
ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
export BUCKET="aws-course-100-storage-${ACCOUNT}-${REGION}"
if [ "$REGION" = "us-east-1" ]; then
  aws s3api create-bucket --bucket "$BUCKET" --region "$REGION"
else
  aws s3api create-bucket --bucket "$BUCKET" --region "$REGION" \
    --create-bucket-configuration LocationConstraint="$REGION"
fi
aws s3api put-public-access-block --bucket "$BUCKET" --public-access-block-configuration \
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
aws s3api put-bucket-encryption --bucket "$BUCKET" \
  --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'
aws s3api put-bucket-versioning --bucket "$BUCKET" \
  --versioning-configuration Status=Enabled
aws s3api put-bucket-tagging --bucket "$BUCKET" \
  --tagging "TagSet=[{Key=Course,Value=aws-solutions-architect},{Key=Module,Value=$MODULE},{Key=Owner,Value=$OWNER},{Key=ExpiresAt,Value=$EXPIRES_AT}]"
printf '{"Rules":[{"ID":"ExpireNoncurrent","Status":"Enabled","Filter":{"Prefix":""},"NoncurrentVersionExpiration":{"NoncurrentDays":7}}]}' > lifecycle.json
aws s3api put-bucket-lifecycle-configuration --bucket "$BUCKET" \
  --lifecycle-configuration file://lifecycle.json
echo "version-one" > object.txt
aws s3api put-object --bucket "$BUCKET" --key demo/object.txt --body object.txt \
  --server-side-encryption AES256
echo "version-two" > object.txt
aws s3api put-object --bucket "$BUCKET" --key demo/object.txt --body object.txt \
  --server-side-encryption AES256
```

## Validate

```bash
aws s3api get-public-access-block --bucket "$BUCKET"
aws s3api get-bucket-encryption --bucket "$BUCKET"
aws s3api get-bucket-versioning --bucket "$BUCKET"
aws s3api list-object-versions --bucket "$BUCKET" --prefix demo/object.txt \
  --query 'Versions[].[VersionId,IsLatest,Size]' --output table
aws s3api get-bucket-tagging --bucket "$BUCKET" --output table
```

## Controlled break and fix

Add a policy that denies uploads without an explicit SSE-S3 header:

```bash
ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
printf '{"Version":"2012-10-17","Statement":[{"Sid":"DenyMissingSSE","Effect":"Deny","Principal":"*","Action":"s3:PutObject","Resource":"arn:aws:s3:::%s/*","Condition":{"StringNotEquals":{"s3:x-amz-server-side-encryption":"AES256"}}}]}' "$BUCKET" > policy.json
aws s3api put-bucket-policy --bucket "$BUCKET" --policy file://policy.json
echo "blocked" > blocked.txt
aws s3api put-object --bucket "$BUCKET" --key demo/blocked.txt --body blocked.txt
```

Expected: `AccessDenied`. Fix by repeating with `--server-side-encryption AES256`; inspect `ServerSideEncryption` with `head-object`.

## Cleanup

```bash
aws s3api delete-bucket-policy --bucket "$BUCKET"
aws s3api list-object-versions --bucket "$BUCKET" \
  --query 'Versions[].[Key,VersionId]' --output text |
while read -r KEY VERSION; do
  aws s3api delete-object --bucket "$BUCKET" --key "$KEY" --version-id "$VERSION"
done
aws s3api list-object-versions --bucket "$BUCKET" \
  --query 'DeleteMarkers[].[Key,VersionId]' --output text |
while read -r KEY VERSION; do
  aws s3api delete-object --bucket "$BUCKET" --key "$KEY" --version-id "$VERSION"
done
aws s3api delete-bucket-lifecycle --bucket "$BUCKET"
aws s3api delete-bucket --bucket "$BUCKET" --region "$REGION"
aws s3api head-bucket --bucket "$BUCKET"
rm -f lifecycle.json policy.json object.txt blocked.txt
```

Expected: `404`/`Not Found`. The loops act only on version IDs returned by the exact lab bucket; do not replace the bucket name with a wildcard. See [cleanup.md](cleanup.md) for additional checks.
