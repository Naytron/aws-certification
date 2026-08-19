# Cleanup

1. Drop only the named Athena table/database; delete workgroup `saa200-data`.
2. Run `aws s3api list-object-versions --bucket <exact-bucket>` and record every key/version created by this lab.
3. Delete each recorded object version and delete marker by exact key and version ID. Do not use a wildcard bucket-emptying command.
4. Delete the exact bucket and verify `head-bucket` returns NotFound.
5. Confirm no Glue crawler, RDS/Aurora cluster, Redshift resource, or ElastiCache cluster was created.
6. Check Billing and Athena query history.
