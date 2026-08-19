# Domain 3 - Design High-Performing Architectures (24%)

## What the domain tests

1. Scalable storage.
2. Elastic compute.
3. High-performing databases.
4. Scalable networks.
5. Data ingestion and transformation.

## Must-know facts

- Start with access pattern, latency, throughput, concurrency, object size, protocol, consistency, and growth - not a favorite service.
- S3 is massively scalable object storage, not a mounted block device or a general POSIX file system.
- EBS is block storage for EC2 and is AZ-scoped. Match volume type and provisioned performance to IOPS/throughput needs.
- EFS supplies elastic shared NFS for Linux clients across AZs. FSx supplies managed purpose-built file systems.
- Horizontal scaling and stateless workers usually offer more elasticity than vertical scaling.
- Lambda scales by concurrency. Memory also changes available CPU; tune memory, timeout, batching, and concurrency from measurements.
- ECS is AWS container orchestration; EKS fits Kubernetes requirements; Fargate removes server management for supported container workloads.
- Cache only where staleness and invalidation are acceptable. CloudFront caches at the edge; ElastiCache accelerates hot application data; DAX accelerates DynamoDB reads.
- RDS read replicas scale reads. RDS Proxy manages connection pressure; it does not make slow queries fast.
- DynamoDB needs partition-key distribution that avoids hot partitions. Select on-demand for uncertain traffic or provisioned capacity for predictable, managed demand.
- CloudFront accelerates cacheable HTTP content and reduces origin load. Global Accelerator improves global network paths for TCP/UDP applications and provides static anycast IPs.
- ALB is Layer 7; NLB is Layer 4. Gateway Load Balancer inserts virtual network appliances.
- Kinesis fits ordered streaming and replay within retention; SQS fits work queues; Firehose delivers buffered streams to destinations with minimal administration.
- Glue catalogs and transforms data; Athena queries data in S3. Columnar compressed formats such as Parquet reduce scanned data for analytics.
- DataSync accelerates online file/object transfer; Snow Family addresses offline transfer where network capacity or time is insufficient.

## Decision reasoning

1. Quantify the SLO: p95 latency, requests per second, throughput, data volume, and growth.
2. Locate the bottleneck using metrics.
3. Select the service matching the data and protocol.
4. Scale each tier independently and protect dependencies with backpressure.
5. Add caching only after defining freshness and invalidation.
6. Re-measure; theoretical capacity is not an observed result.

## Plausible alternatives that fail

| Requirement | Best direction | Plausible failure |
| --- | --- | --- |
| Shared Linux file access across AZs | EFS | EBS cannot be treated as a general multi-AZ shared file system |
| Millions of unpredictable key-value requests | DynamoDB with sound keys and on-demand capacity | One large relational instance scales vertically and adds management |
| Static IPs and accelerated global TCP | Global Accelerator | CloudFront is primarily an HTTP content delivery network |
| Reduce relational connection storms | RDS Proxy plus pooled/bounded clients | A read replica does not pool writer connections |
| Query a large S3 lake cheaply and quickly | Parquet, partitioning, Athena | Repeated full CSV scans waste I/O and time |

## Retrieval checks

Explain without notes:

1. CloudFront versus Global Accelerator.
2. EBS versus EFS versus S3.
3. SQS versus Kinesis.
4. Why scaling compute may not improve end-to-end latency.

## Official references

- [SAA-C03 Domain 3](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain3.html)
- [Performance Efficiency Pillar](https://docs.aws.amazon.com/wellarchitected/latest/performance-efficiency-pillar/welcome.html)
- [Choosing AWS storage](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/storage-services.html)
- [DynamoDB partition keys](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html)
