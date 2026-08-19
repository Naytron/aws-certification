# Challenge Lab - Regional recovery runbook

## Lab profile

**Cost label:** `DESIGN-ONLY`

No resources are created by the core `DESIGN-ONLY` challenge. The required tags `Course`, `Module`, `Owner`, and `ExpiresAt` apply only if an approved optional deployment occurs.

## Preflight

1. Run `aws sts get-caller-identity`; do not record the account ID.
2. Run `aws configure get region` and confirm the course home Region.
3. Confirm the Free-plan/credit status and budget alerts.
4. Read `cleanup.md` before any approved optional deployment.

## Challenge

Create a runbook for a two-tier application with RTO 2 hours and RPO 15 minutes after complete Region loss.

1. Perform preflight.
2. Choose backup/restore, pilot light, warm standby, or active/active.
3. Cover infrastructure, data, KMS, secrets, container/image artifacts, DNS, quotas, validation, failback, and communications.
4. Add isolated backup retention and a test cadence.
5. Simulate loss of the primary Region and a backup decryption failure.
6. Prove the plan meets numeric objectives and does not rely on Multi-AZ.

No DR environment is deployed. Pass when recovery order, ownership, evidence, and abort/failback criteria are executable.

## Validate

Confirm every stated pass condition with a diagram, decision table, or observable inventory result. Verify that no AWS resources were created for the core challenge and that any optional deployment uses the four required tags.

## Cleanup

No recovery environment is created. Follow the no-resource checks in [cleanup](cleanup.md); retain the sanitized runbook and remove no existing backup, key, bucket, or recovery resource.

## Official references

- [Disaster recovery options](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html)
- [AWS Backup concepts](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html)
- [S3 Versioning](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html)
