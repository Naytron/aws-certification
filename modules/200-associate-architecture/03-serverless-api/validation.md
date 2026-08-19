# Validation

- Identity, Region, plan, and tags were checked before deployment.
- `GET /echo` returns 200 with a correlation value; an unknown route returns a distinguishable 404.
- A controlled function fault produces a 5xx and an exact log entry, then is repaired.
- Invocation permission is scoped to the API rather than `Principal: *`.
- No VPC, NAT Gateway, database, custom domain, or provisioned concurrency exists.
- Stack reaches `DELETE_COMPLETE`; exact API, Lambda, role, and log group are absent.
