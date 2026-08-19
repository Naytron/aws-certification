# Guided Lab - Query-layout cost experiment

## Lab profile

**Cost label:** `USES CREDITS`, with a `DESIGN-ONLY` fallback

`USES CREDITS`; home Region; one uniquely named S3 bucket, an Athena workgroup with bytes-scanned cutoff, a tiny CSV dataset, a tiny Parquet dataset if tooling is available, and no crawler/database server. Keep total data under 1 MB.

The deployable path requires `Course`, `Module`, `Owner`, and `ExpiresAt` on every supported resource. If Athena is unavailable and the `DESIGN-ONLY` fallback is used, no resources are created and those tags apply only to an approved optional deployment.

## Preflight

Confirm identity, Region, budgets/credits, service availability, tags, and cleanup. Set exact bucket/workgroup names and `ExpiresAt`. Athena may be unavailable on a Free plan; if blocked, complete the same steps as `DESIGN-ONLY` using EXPLAINed byte estimates.

## Build

1. Create the tagged S3 bucket with Block Public Access on.
2. Create prefixes `input/csv/`, `input/parquet/`, and `results/`; upload a synthetic 100-row sales CSV containing no personal data.
3. Create an Athena workgroup `saa200-data` with query results at the exact results prefix and a 10 MB per-query data-usage control.
4. In the Athena editor create database `saa200_data` and table `sales_csv` over only `s3://<exact-bucket>/input/csv/`. Define columns `sale_id string, region string, amount decimal(10,2)` with `OpenCSVSerde`. Optionally create `sales_parquet` with CTAS only if projected scan stays below the cutoff.
5. Run `SELECT region, sum(amount) FROM sales GROUP BY region`; record bytes scanned.

## Validate

Compare `SELECT *` with a projected/filtered query and, if available, CSV versus Parquet. Record query history, bytes scanned, S3 object layout, encryption, and tags. Explain why this tiny result is directional rather than a price benchmark.

## Break and fix

Point a table location at `s3://<bucket>/` and observe risk of scanning result files/input formats together. Do not run a broad query. Fix location to the exact prefix and document partition/layout boundaries.

## Cleanup

Delete named Athena table/database if created, then workgroup. List exact object versions, delete those keys/version IDs, and delete the exact bucket. Verify all are absent and check Billing.

## Official references

- [AWS database decision guide](https://docs.aws.amazon.com/decision-guides/latest/databases-on-aws-how-to-choose/databases-on-aws-how-to-choose.html)
- [Athena performance optimization](https://docs.aws.amazon.com/athena/latest/ug/performance-tuning.html)
- [S3 storage classes](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html)
