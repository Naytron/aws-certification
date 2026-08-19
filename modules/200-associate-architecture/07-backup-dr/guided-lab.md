# Guided Lab - Versioned-object restore drill

## Lab profile

**Cost label:** `USES CREDITS`

`USES CREDITS`; home Region; one uniquely named tagged S3 bucket, two tiny versions of one synthetic text object, and one delete marker. No replication, AWS Backup vault, KMS customer key, or second Region.

Every created resource that supports tags must include `Course`, `Module`, `Owner`, and `ExpiresAt`.

## Preflight

Confirm identity, Region, budget/credits, plan, exact bucket name, tags, and cleanup. Record start time and targets: restore one object within 10 minutes and lose no committed version.

## Build

1. Create the bucket with Block Public Access and four tags; enable versioning.
2. Upload `records/status.txt` containing `approved-v1`; record returned version ID.
3. Upload `approved-v2`; record its version ID.
4. Delete the key without a version ID, creating a delete marker. Confirm an ordinary `head-object` fails.

## Validate

List versions for exact prefix `records/status.txt`. Retrieve v2 explicitly to a local file, verify exact content, then restore availability by copying that exact version onto the same key. Record new version ID and elapsed RTO. Explain why deleting only the marker is an alternative and why copying creates a clearer restore event.

## Break and fix

Attempt a restore plan that says only "use latest backup." Reject it because "latest" can be a delete marker or corrupted version. Fix by selecting an immutable version ID and recording integrity evidence.

## Cleanup

List all versions/delete markers for the exact key. Delete each by exact key/version ID, verify the bucket has zero versions, then delete the exact bucket. Check global S3 and Billing.

## Official references

- [Disaster recovery options](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html)
- [AWS Backup concepts](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html)
- [S3 Versioning](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html)
