# Rubric - Three-Tier Application

Score each row at 0, half credit, or full credit.

| Area | Points | Full-credit evidence |
| --- | ---: | --- |
| Requirements | 10 | Hard requirements, assumptions, RTO/RPO, scale, and constraints are measurable |
| Production architecture | 15 | Multi-AZ request/compute/data path with no unexplained single point of failure |
| Security | 15 | Least privilege, tier security groups, private tiers, TLS, secrets, encryption, audit, and admin path |
| Resilience | 15 | AZ loss, instance loss, database failover, backup/restore, and deployment rollback meet targets |
| Performance | 10 | Scaling signals, caching, read scale, connections, quotas, and load assumptions are justified |
| Cost | 10 | Production versus lab cost is separated; NAT, data transfer, retention, and idle capacity are analyzed |
| Scaled lab | 10 | API, application, and data tiers work with tags and one-Region discipline |
| Failure and observability | 10 | Fault is diagnosed from metrics/logs, restored, and prevention is defensible |
| Evidence and cleanup | 5 | Evidence is sanitized and every exact resource is removed |
| **Total** | **100** | |

## Critical failures

Any item below fails the capstone regardless of points:

- A secret, access key, account number, private endpoint, or customer data is recorded.
- Public data access or broad administrative credentials are used as the solution.
- An expensive production component is deployed contrary to the lab rules.
- Required resources are left running or cleanup is unverified.
- The learner cannot distinguish Multi-AZ failover from read scaling.
- Evidence is fabricated or only asserts results without observation.

## Pass

At least 80 points, no critical failure, and a five-minute defense that explains three decisions and three rejected alternatives.
