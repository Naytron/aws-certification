# Mixed Scenario Set 1 - Explained Answers

## Answer key

| Item | Answer | Primary domain |
| ---: | --- | --- |
| 1 | B | Secure |
| 2 | B | Resilient |
| 3 | A, B | Resilient |
| 4 | B | High-performing |
| 5 | A | Secure / Cost |
| 6 | B | Cost-optimized |
| 7 | B | High-performing |
| 8 | A, B | Secure |
| 9 | A | High-performing / Cost |
| 10 | C | Resilient / Cost |
| 11 | A | Resilient |
| 12 | B | Secure |

## Explanations

### 1 - B

Origin access control lets CloudFront authenticate to a non-public S3 origin; the bucket policy can limit reads to the distribution. Signed URLs or cookies enforce viewer authorization. A makes the origin bypassable. S3 is not placed in a subnet, so C is based on a false model. D creates long-lived AWS credentials for application users.

### 2 - B

SQS durably buffers the accepted work, lets workers scale independently, and supports DLQ isolation. At-least-once delivery makes idempotency necessary. A keeps API latency coupled to processing and can amplify failure with retries. C loses accepted demand. SNS without a durable queue does not provide the same backlog control.

### 3 - A, B

Multi-AZ supplies the availability/failover requirement; read replicas handle reporting read scale. Snapshots are not a live AZ-failover mechanism. Network ACLs do not create database availability. Retention improves recoverability but does not offload reads or provide automatic failover.

### 4 - B

Global Accelerator supports TCP/UDP endpoints, static anycast IPs, and AWS global network routing. CloudFront is primarily an HTTP content delivery network. REST API does not support the game protocol. DNS alone does not supply the same static anycast entry or network acceleration.

### 5 - A

An S3 gateway endpoint removes this S3 path from NAT processing and supports policy controls. An internet gateway does not make a private, non-publicly addressed Lambda interface directly usable and violates intent. More NAT gateways increase cost. Instance store is ephemeral compute storage and does not replace S3.

### 6 - B

The workload tolerates interruptions and has a generous deadline, so diversified Spot capacity plus checkpoints converts that flexibility into savings. A pays peak price continuously. Dedicated Hosts solve licensing/isolation concerns not stated. Provisioned concurrency is a latency feature, not the natural fit for long batch rendering.

### 7 - B

The partition key concentrates traffic, so distribute requests across logical shards and reassemble query results when needed. More item bytes do not distribute activity. RDS Multi-AZ is unrelated. S3 Transfer Acceleration does not affect DynamoDB partition heat.

### 8 - A, B

WAF inspects Layer 7 requests and managed rules can block common injection patterns. CloudTrail records AWS API activity for investigation. Security groups do not parse HTTP payloads or support deny rules. One-hour log expiration undermines evidence. EC2 key pairs address host access, not these needs.

### 9 - A

Columnar, compressed Parquet reduces bytes scanned; partition pruning avoids irrelevant objects. Deep Archive prevents immediate analytics access and can add retrieval delay/cost. EC2 size does not power Athena. Replication adds resilience and transfer/storage, not scan efficiency.

### 10 - C

The tolerant RPO/RTO and cost priority fit backup and restore, provided restoration is automated and tested. A and B buy recovery speed not required. D remains in the failed Region/AZ path and is not a DR strategy.

### 11 - A

EventBridge rules route by event content and decouple publishers from independently managed targets. Multiple consumers on one SQS queue compete for messages rather than each receiving a copy. Direct calls preserve coupling. Database polling adds latency and operations.

### 12 - B

Secrets Manager provides managed storage, retrieval logging integration, and rotation workflows. The function assumes a role with least-privilege access. Repository encryption still distributes a static secret. Public S3 is exposure. Administrator user keys violate least privilege and temporary-credential practices.
