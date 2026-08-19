# Mixed Scenario Set 2

This is a fresh, original transfer set. Do not consult the [answers](mixed-scenarios-02-answers.md) until complete.

Time limit: 24 minutes. Record one answer and confidence (H/M/L) per item.

## 1

An EC2 application requires read access to one S3 prefix. Operators currently place access keys in a configuration file. Which change is most secure with the least credential administration?

- A. Rotate the IAM user keys every year
- B. Attach a scoped role through an instance profile and remove stored keys
- C. Encrypt the configuration file with a shared password
- D. Allow anonymous bucket reads from the VPC CIDR

## 2

An application needs shared POSIX-style storage mounted by Linux instances in three Availability Zones. Capacity is unpredictable and should grow automatically. Which storage service fits?

- A. One EBS volume attached across all three AZs
- B. Amazon EFS
- C. Amazon S3 Glacier Flexible Retrieval mounted as a disk
- D. EC2 instance store synchronized nightly

## 3

A ticket-processing system requires messages for each customer to remain ordered. Different customers should process in parallel, and occasional producer retries must not create duplicate operations. Which queue configuration is best?

- A. One SQS standard queue with no idempotency
- B. SQS FIFO, customer ID as the message group, and a stable deduplication ID
- C. SQS FIFO with one message group for the entire company
- D. An SNS email subscription

## 4

A frequently invoked Lambda fleet opens too many short-lived connections to an RDS database. Database CPU is low, but connections are exhausted. Which change most directly addresses the bottleneck?

- A. Put CloudFront in front of RDS
- B. Use RDS Proxy and bound Lambda concurrency to protect the database
- C. Add an S3 lifecycle rule
- D. Convert the ALB to an NLB

## 5

A company serves cacheable product images globally from an HTTP origin. It needs lower viewer latency and less origin traffic. Which service should it add?

- A. CloudFront
- B. Global Accelerator only
- C. Direct Connect
- D. AWS Client VPN

## 6

A non-production RDS database is used only during weekday office hours. It can tolerate startup delay and has required snapshots. What is the best first cost action?

- A. Migrate immediately to a larger Multi-AZ instance
- B. Schedule supported stop/start periods and right-size from metrics
- C. Buy a three-year commitment before measuring use
- D. Add two read replicas

## 7

An application handles payments through several steps: reserve inventory, charge, wait for an asynchronous fraud result, compensate on failure, and retain execution history. Which service best coordinates the process?

- A. Step Functions
- B. Route 53
- C. EBS Multi-Attach
- D. CloudFront Functions

## 8

A public ALB forwards to application instances. The instances must accept traffic only from the ALB, and the database must accept traffic only from the application tier. Which design best enforces this?

- A. Reference the ALB security group in the application security group and the application security group in the database security group
- B. Open application and database ports to `0.0.0.0/0`, then rely on passwords
- C. Put every tier in one public subnet with one network ACL
- D. Assign each instance an IAM user

## 9

A company needs to migrate 500 TB from a site with a slow link. Sending it online would miss the migration deadline. Which approach is most appropriate?

- A. Snow Family offline transfer after confirming device and service availability
- B. Repeated email attachments
- C. S3 Transfer Acceleration over the same insufficient link with no estimate
- D. A larger NAT Gateway in AWS

## 10

An application needs a cache for frequently read database results with sub-millisecond access. Results can be briefly stale, and application code controls invalidation. Which option fits?

- A. ElastiCache
- B. S3 Glacier Deep Archive
- C. Route 53 health checks
- D. RDS automated backups

## 11

A regulated archive requires records to be retained for seven years and protected against deletion or overwrite during the retention period. Which design best fits?

- A. S3 Versioning alone, with broad delete access
- B. S3 Object Lock in an appropriate retention mode, versioning, encryption, and tightly scoped access
- C. EBS instance store with a daily reboot
- D. An SQS dead-letter queue with seven-year visibility timeout

## 12

A service has predictable baseline EC2 utilization after six months of measurement plus short unpredictable peaks. Which purchasing and scaling approach is most appropriate?

- A. Commit the measured baseline with a suitable Savings Plan and use elastic On-Demand or interruption-tolerant Spot for peaks
- B. Buy a commitment sized to the largest observed spike
- C. Use Dedicated Hosts for all capacity without a licensing requirement
- D. Disable Auto Scaling to preserve the forecast
