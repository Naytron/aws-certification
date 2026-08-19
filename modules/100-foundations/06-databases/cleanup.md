# Cleanup: Databases

**Level:** 100 | **Cost:** `FREE-PLAN SAFE`

Delete each exact table and wait for completion:

```bash
aws dynamodb delete-table --region "$REGION" --table-name aws-course-100-databases
aws dynamodb wait table-not-exists --region "$REGION" --table-name aws-course-100-databases
aws dynamodb describe-table --region "$REGION" --table-name aws-course-100-databases
```

Repeat only for `aws-course-100-databases-challenge` if created. Expected: `ResourceNotFoundException`. Check DynamoDB tables and backups in the same Region. The labs do not create RDS/Aurora instances, snapshots, exports, streams, or global-table replicas.
