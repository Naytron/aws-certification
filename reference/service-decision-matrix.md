# AWS Service Decision Matrix

Use this as a recall aid after learning the services. It is intentionally concise and does not replace service documentation.

## Compute

| Requirement | Default candidate | Reject when |
| --- | --- | --- |
| Full OS control or legacy software | EC2 | Operational overhead is unnecessary |
| Container orchestration with AWS-managed control plane | ECS | Kubernetes portability or APIs are hard requirements |
| Kubernetes control plane | EKS | Team lacks Kubernetes need or operational maturity |
| Short event-driven code | Lambda | Runtime, duration, state, or execution model does not fit |
| Batch job scheduling | AWS Batch | Work is better modeled as request/response or a persistent service |
| Simple managed application deployment | Elastic Beanstalk | Fine-grained platform control is required |

Decision rule: choose the least operationally complex service that satisfies runtime, scaling, networking, and portability requirements.

## Storage

| Requirement | Candidate | Key distinction |
| --- | --- | --- |
| Durable object storage | S3 | Object API, not a mounted block device |
| Low-latency block storage for one AZ | EBS | Attached to supported compute; snapshots are regional |
| Shared Linux file system | EFS | Regional file service using NFS |
| Shared Windows file system | FSx for Windows File Server | SMB and Windows features |
| High-performance managed Lustre | FSx for Lustre | Compute-heavy file workloads |
| Archival tiers | S3 Glacier storage classes | Retrieval time and minimum duration matter |

Decision rule: first choose object, block, or file semantics; then choose durability, performance, sharing, and lifecycle.

## Databases

| Requirement | Candidate | Key distinction |
| --- | --- | --- |
| Managed relational engine | RDS | Engine compatibility and instance-oriented operations |
| Cloud-optimized relational | Aurora | Distributed storage and Aurora-specific capabilities |
| Key-value/document at massive scale | DynamoDB | Access-pattern-first design |
| In-memory cache | ElastiCache | Redis/Valkey or Memcached patterns |
| Graph relationships | Neptune | Graph traversal |
| Time series | Timestream | Time-series ingestion and queries |
| Search and log analytics | OpenSearch Service | Search/index use, not a relational source of truth |

Decision rule: derive the service from consistency, access patterns, relationships, transactions, scale, and operations - not familiarity.

## Integration

| Requirement | Candidate | Key distinction |
| --- | --- | --- |
| Durable message queue | SQS | Consumer pull and buffering |
| Ordered/deduplicated queue semantics | SQS FIFO | Throughput and ordering tradeoffs |
| Push fanout | SNS | Publisher to multiple subscribers |
| Event routing by content/source | EventBridge | Event bus and rule-based routing |
| Workflow orchestration | Step Functions | State, retries, branching, and service coordination |
| Streaming records | Kinesis Data Streams or MSK | Ordered stream processing, not a work queue |

Decision rule: distinguish queueing, pub/sub, event routing, orchestration, and streaming before selecting a product.

## Networking and edge

| Requirement | Candidate | Key distinction |
| --- | --- | --- |
| DNS routing and health checks | Route 53 | DNS answers, not a reverse proxy |
| Global content caching | CloudFront | Edge cache and HTTP delivery |
| Anycast static IP acceleration | Global Accelerator | Improves path to regional endpoints; no content cache |
| Private service exposure | PrivateLink | Consumer-provider model without transitive routing |
| Hub connectivity across VPCs | Transit Gateway | Central routed connectivity |
| Encrypted connection over internet | Site-to-Site VPN | Faster setup, internet variability |
| Dedicated private circuit | Direct Connect | Provisioning lead time; add VPN for encryption/failover where required |

Decision rule: separate name resolution, content delivery, routing, private service access, and physical connectivity.

## Security and governance

| Requirement | Candidate | Key distinction |
| --- | --- | --- |
| Identity permissions | IAM policies and roles | Authentication/authorization |
| Data encryption keys | KMS | Key policy and grant model |
| Secret rotation/storage | Secrets Manager | Secret lifecycle |
| Parameter/config storage | Systems Manager Parameter Store | Configuration and optional secure strings |
| API threat filtering | WAF | Layer 7 web rules |
| DDoS protection | Shield | Network/transport and advanced protections |
| Threat findings | GuardDuty | Detection from telemetry |
| Security posture aggregation | Security Hub CSPM | Findings and standards |
| Resource configuration history/rules | AWS Config | Configuration, not API event logging |
| API activity audit | CloudTrail | Control-plane and selected data events |
| Multi-account preventive guardrail | SCP | Maximum available permissions, not a grant |

Decision rule: identify whether the requirement is prevention, detection, response, audit, encryption, or governance.

## Observability

| Requirement | Candidate |
| --- | --- |
| Metrics, alarms, logs, dashboards | CloudWatch |
| API audit history | CloudTrail |
| Resource inventory and configuration compliance | AWS Config |
| Distributed request traces | X-Ray or OpenTelemetry-compatible tracing |
| Event-driven remediation | EventBridge plus automation target |

Decision rule: no single tool is "monitoring." Select signals and retention based on the question being answered.
