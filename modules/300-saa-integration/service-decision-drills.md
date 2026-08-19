# Service Decision Drills

For each prompt, answer in 30 seconds: service/configuration, decisive requirement, and one rejected alternative. Hide the answer row until committed.

| # | Prompt | Decision and rejection |
| ---: | --- | --- |
| 1 | HTTP paths `/images` and `/api` need different targets. | ALB path routing. NLB lacks Layer 7 path rules. |
| 2 | Millions of TCP connections require static IPs. | NLB. ALB is HTTP/HTTPS Layer 7 and does not meet the static-IP requirement. |
| 3 | Private subnets need S3 without NAT. | S3 gateway endpoint. NAT works but adds internet egress architecture and processing cost. |
| 4 | One event must reach billing, analytics, and email subscribers. | SNS fanout, or EventBridge if content routing is central. One SQS queue would load-balance rather than copy to all consumers. |
| 5 | Workers must absorb a burst and retry independently. | SQS with DLQ and idempotent consumers. SNS alone does not buffer each worker backlog. |
| 6 | Workflow steps need branching, waits, retries, and audit history. | Step Functions. SQS decouples work but does not model the workflow state. |
| 7 | Ordered commands are required per account, not globally. | SQS FIFO with account ID as message group. One group for all accounts needlessly serializes work. |
| 8 | A relational database needs automatic standby failover. | RDS Multi-AZ. A read replica is primarily read scaling and is not the same failover contract. |
| 9 | A relational database is read-bound. | Read replicas and route read traffic appropriately. Multi-AZ alone does not provide normal read scaling. |
| 10 | Unpredictable key-value demand and single-digit millisecond performance. | DynamoDB with well-distributed keys, likely on-demand initially. RDS adds relational overhead not required. |
| 11 | Shared Linux files are mounted by instances in multiple AZs. | EFS. EBS is AZ-scoped block storage. |
| 12 | Durable images need HTTP delivery worldwide. | S3 origin plus CloudFront. EFS does not supply edge caching or object economics. |
| 13 | Global non-HTTP application needs static anycast IPs. | Global Accelerator. CloudFront targets HTTP content-delivery patterns. |
| 14 | Detect suspicious API behavior. | GuardDuty for managed threat detection; CloudTrail is evidence but does not by itself perform the same detection. |
| 15 | Find sensitive data in S3. | Macie. GuardDuty detects threats rather than classifying S3 content. |
| 16 | Block malicious HTTP request patterns. | WAF. Security groups cannot inspect SQL injection strings. |
| 17 | Store a rotating database password. | Secrets Manager with configured rotation. Parameter Store secure strings do not supply the same managed rotation workflow. |
| 18 | Give an EC2 workload AWS API access. | Instance profile/role. Embedded access keys are long-lived secret material. |
| 19 | Query occasional logs in S3 with SQL. | Athena with partitioned compressed data. A persistent database cluster adds idle administration and cost. |
| 20 | Capture replayable ordered telemetry shards. | Kinesis Data Streams. SQS is a work queue and is not a multi-consumer replayable stream in the same model. |
| 21 | Deliver buffered streaming data to S3 with minimal code. | Data Firehose. Kinesis Data Streams requires more consumer management. |
| 22 | Online transfer of many on-premises files. | DataSync. Snow Family is better when network/time constraints require offline transfer. |
| 23 | Interruption-tolerant batch compute. | Spot with checkpoints and diversified capacity. Reserved capacity does not monetize interruption tolerance. |
| 24 | Predictable baseline compute after right-sizing. | Evaluate Savings Plans or Reserved Instances. Spot cannot satisfy uninterrupted baseline capacity. |
| 25 | Reduce Lambda connection spikes to RDS. | RDS Proxy and bounded concurrency. A larger DB alone does not control connection churn. |
| 26 | Cache public static HTTP objects. | CloudFront. ElastiCache is an application data cache inside a VPC. |
| 27 | Cache repeated in-memory application reads. | ElastiCache. CloudFront does not serve arbitrary database objects to private application code. |
| 28 | Preserve recoverable S3 object history. | Versioning, optionally Object Lock for WORM requirements. Replication alone is not undelete protection from all logical errors. |

## Change-one-requirement practice

Repeat drills 1, 4, 8, 12, 20, and 23 after changing one hard requirement. State exactly why the decision changes. This prevents keyword matching.
