# Architecture Scenario - Clickstream exploration

A startup stores compressed clickstream objects, runs a few analyst queries weekly, and cannot operate a persistent cluster.

- **A:** S3 partitioned columnar data plus Glue Data Catalog and Athena workgroup controls.
- **B:** Always-on large Redshift provisioned cluster.
- **C:** RDS Multi-AZ with every event as an OLTP row and full-table scans.

Choose A. Serverless query and scan-efficient layout match intermittent use. B has needless idle capacity; C mixes analytic scans with transactional design. If sustained concurrency, predictable warehouse performance, and complex BI grow, reassess Redshift options.
