# Architecture Tasks

## 1. Draw the production design

Show:

- Route 53 alias -> CloudFront with WAF -> internet-facing ALB.
- ALB across at least two public subnets/AZs.
- Auto Scaling application instances or ECS tasks in private subnets across at least two AZs.
- RDS or Aurora Multi-AZ in isolated data subnets.
- Secrets Manager, KMS, S3 assets/backups, CloudWatch, CloudTrail, and Systems Manager.
- Egress path only if justified. Compare NAT per AZ, centralized NAT risk, and VPC endpoints.
- Trust, network, data, and failure boundaries.

Do not deploy this design in the Free-plan account.

## 2. Define controls

| Boundary | Required decision |
| --- | --- |
| Viewer to edge | TLS, cache behavior, WAF rule intent, origin restriction |
| Edge to load balancer | Prevent unintended origin bypass where practical |
| ALB to app | App security group accepts only from ALB security group |
| App to database | Database security group accepts only from app security group |
| Workload identity | Instance/task role with scoped permissions; no access keys |
| Database secret | Secrets Manager rotation and scoped retrieval |
| Data | KMS/key ownership decision, backup encryption, retention, restore test |
| Administration | Systems Manager Session Manager instead of public SSH |

## 3. Define scale and health

- ALB health endpoint must test application readiness without making every check depend on a slow downstream.
- Auto Scaling uses an observed signal such as request count per target, CPU, or queue depth.
- Minimum capacity spans two AZs.
- Static content is offloaded to S3/CloudFront.
- Read replicas are considered only for read scale; Multi-AZ is selected for failover.
- Connection pooling or RDS Proxy is justified from connection behavior.

## 4. Define failure and recovery

For each event, write detection, automatic behavior, manual action, RTO/RPO effect, and validation:

1. One application target fails.
2. One AZ becomes unavailable.
3. Database writer fails.
4. A bad deployment raises 5xx responses.
5. An operator deletes or corrupts a row.

## 5. Reject alternatives

Write one requirement-based rejection for each:

- One large instance in one AZ.
- Public application and database instances.
- RDS read replica as the only availability control.
- Nightly backups for a 5-minute RPO.
- Multi-Region active-active for the stated 30-minute RTO.
- One NAT Gateway presented as both cheapest and AZ-fault-tolerant.

## 6. Cost worksheet

Estimate separately with the current AWS Pricing Calculator:

- Edge/data transfer and WAF.
- ALB hours/capacity.
- Compute baseline and burst.
- NAT/data processing and endpoints.
- Database, backups, and replicas.
- Logs, metrics, and retention.

Record assumptions and date. Do not treat calculator output as a quote.

## 7. Scaled-lab mapping

| Production tier | Scaled lab | Concept retained | Important difference |
| --- | --- | --- | --- |
| CloudFront/ALB web entry | API Gateway HTTP API | Managed public entry and routing | No edge cache/WAF lab |
| Auto Scaling app fleet | Lambda | Stateless horizontal scaling | Different runtime and concurrency model |
| RDS Multi-AZ | DynamoDB | Managed regional data availability | Non-relational data model |
