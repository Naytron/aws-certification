# Must Know: Storage

**Level:** 100 | **Cost:** `DESIGN-ONLY` | **SAA-C03:** All SAA-C03 domains

## Decision table

| Requirement | Prefer | Decision rule |
| --- | --- | --- |
| HTTP/API object access at massive scale | S3 | Object storage, not a mountable block device. |
| Boot or low-latency block volume for EC2 | EBS | Block semantics in one AZ. |
| Shared POSIX file system across Linux instances | EFS | Regional managed NFS file storage. |
| Rarely accessed object with flexible retrieval | S3 lifecycle to an appropriate storage class | Match retrieval time and minimum-duration charges. |
| Protect from accidental overwrite/delete | S3 Versioning plus appropriate backup/replication controls | Versioning helps recovery but is not a complete backup policy. |

## Service and responsibility boundaries

- S3 is object storage; applications use object APIs rather than in-place block updates.
- EBS is normally attached within its AZ; copy snapshots to support other recovery scopes.
- EFS provides file semantics and shared access; it is not the cheapest default for object archives.
- S3 Block Public Access is a guardrail, not a substitute for least-privilege policies.

## Failure modes

| Failure | Observable effect | Response |
| --- | --- | --- |
| Public ACL or policy | Data exposure | Keep Block Public Access enabled and validate policy. |
| Versioning enabled without lifecycle | Old versions and delete markers accumulate | Add reviewed noncurrent-version lifecycle rules. |
| Archive class without retrieval analysis | Restore delay or charges violate requirements | Choose class from access and recovery requirements. |
| Bucket deleted before versions | Deletion fails | Remove object versions and delete markers before the bucket. |

## Common exam distractors

- S3 Standard-IA is not automatically cheaper for frequently read small objects.
- Versioning does not provide immutable retention unless Object Lock and governance are designed.
- EFS and EBS solve different file-versus-block access patterns.

Reject an answer because it violates a stated requirement, not merely because another service is more familiar.

## Recall prompts

1. State the hardest requirement that selects each service or pattern.
2. Name the failure boundary and the customer-owned configuration.
3. Explain one cheaper option and the requirement it fails.
4. Explain one more complex option and why it is premature.

## Official references

- [Amazon S3 data protection](https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html)
- [S3 Block Public Access](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html)
- [S3 lifecycle](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html)
- [Amazon EFS](https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html)
