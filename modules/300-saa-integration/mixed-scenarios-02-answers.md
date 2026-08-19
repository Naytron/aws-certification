# Mixed Scenario Set 2 - Explained Answers

## Answer key

| Item | Answer | Primary domain |
| ---: | --- | --- |
| 1 | B | Secure |
| 2 | B | High-performing |
| 3 | B | Resilient |
| 4 | B | High-performing / Resilient |
| 5 | A | High-performing |
| 6 | B | Cost-optimized |
| 7 | A | Resilient |
| 8 | A | Secure |
| 9 | A | High-performing / Cost |
| 10 | A | High-performing |
| 11 | B | Secure / Resilient |
| 12 | A | Cost-optimized |

## Explanations

### 1 - B

An instance profile supplies temporary role credentials and can scope access to the prefix. Rotation of long-lived keys preserves unnecessary secret administration. File encryption does not remove distribution or rotation. Anonymous access violates the identity requirement and CIDR conditions are not workload identity.

### 2 - B

EFS supplies elastic shared NFS across Availability Zones. EBS is AZ-scoped block storage and is not a general three-AZ shared volume. Glacier is archival object storage. Instance store is ephemeral and nightly copies do not meet shared live filesystem semantics.

### 3 - B

FIFO message groups preserve ordering within each customer while allowing groups to progress independently. Stable deduplication IDs address producer retries within FIFO behavior. Standard queues do not promise strict order. One global group removes parallelism. Email is not a processing queue.

### 4 - B

The measured constraint is connections, not CPU. RDS Proxy pools and reuses database connections, while bounded concurrency prevents overload. CloudFront cannot proxy the database protocol. S3 lifecycle and load-balancer type do not address database connections.

### 5 - A

CloudFront caches HTTP content at edge locations, lowering latency and origin requests. Global Accelerator improves network paths but is not the primary content cache. Direct Connect serves private hybrid connectivity. Client VPN serves user-to-VPC access.

### 6 - B

Remove idle hours and right-size from evidence before making commitments. Multi-AZ and replicas solve availability/read scaling not required. A commitment made before measurement can lock in waste.

### 7 - A

Step Functions models waits, retries, branches, errors, compensation, and execution history. The other choices solve DNS, block storage, or lightweight edge request processing, not durable business workflow orchestration.

### 8 - A

Security-group references express tier identity and allow only intended paths. Public CIDRs expose internal ports. One subnet/NACL cannot express resource-to-resource stateful trust as precisely. IAM users control AWS API authorization, not transport reachability between tiers.

### 9 - A

When the network cannot meet the deadline, an offline device transfer is the appropriate family after validating current availability, capacity, handling, and timeline. The other online answers do not fix the constrained source link; NAT Gateway is on the AWS side.

### 10 - A

ElastiCache is an in-memory application cache suitable when controlled staleness is acceptable. Deep Archive is high-latency archival storage. Health checks route based on health. Backups recover data rather than accelerate reads.

### 11 - B

Object Lock supplies WORM retention controls and requires versioning; encryption and least privilege protect confidentiality and administration. Versioning alone allows privileged deletion of versions. Instance store is ephemeral. SQS is not a seven-year compliance archive.

### 12 - A

Commit only the evidenced baseline; preserve elasticity for peaks and use Spot only where interruptions are acceptable. Peak-sized commitment risks idle spend. Dedicated Hosts require a stated isolation or licensing reason. Disabling scaling harms both cost and resilience.
