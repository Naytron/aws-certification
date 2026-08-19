# Validation

- Numeric RTO/RPO are recorded before the restore.
- Exact S3 version IDs and delete marker are observable.
- Restored content matches the selected committed version.
- Recovery time is measured and compared with RTO.
- Regional runbook includes non-data dependencies and failback.
- Every version/delete marker and the exact bucket are absent after cleanup.
