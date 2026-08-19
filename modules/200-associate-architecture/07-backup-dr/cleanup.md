# Cleanup

1. Run `aws s3api list-object-versions --bucket <exact-bucket> --prefix records/status.txt`.
2. For every returned version and delete marker created in this lab, run `aws s3api delete-object --bucket <exact-bucket> --key records/status.txt --version-id <exact-id>`.
3. Repeat the list and require empty `Versions` and `DeleteMarkers`.
4. Delete the exact bucket and verify `head-bucket` returns NotFound.
5. Confirm no AWS Backup vault/plan, replication rule, second-Region bucket, custom KMS key, or recovery instance exists.
6. Check Billing.
