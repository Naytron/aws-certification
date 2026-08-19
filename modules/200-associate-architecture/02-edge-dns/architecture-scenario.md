# Architecture Scenario - Global media launch

A company launches immutable images globally. The origin must remain private, users need low latency, and no custom domain is available yet. Later, 10% of users should test a new Regional API.

- **A:** Private S3 REST origin, CloudFront with OAC, versioned keys; Route 53 weighted aliases later for API migration.
- **B:** Public S3 website endpoint with a secret query parameter.
- **C:** Global Accelerator in front of S3 for caching.

Choose A. OAC protects the origin and CloudFront provides HTTP caching without a purchased domain. Weighted DNS supports controlled API traffic once names exist. B is public and the "secret" leaks; C does not cache S3 objects. If the future workload is UDP, Global Accelerator becomes relevant.
