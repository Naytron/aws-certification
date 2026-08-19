# Mixed Scenario Set 1

These scenarios are original course content. Do not consult the [answers](mixed-scenarios-01-answers.md) until the set is complete.

Time limit: 24 minutes. Record one answer and confidence (H/M/L) per item.

## 1

A media application stores private videos in S3. Paid users should stream through CloudFront. Users must not bypass CloudFront with an S3 URL, and the bucket must remain non-public. Which design best meets the requirements?

- A. Make the bucket public and use an unsigned CloudFront distribution
- B. Use a CloudFront origin access control, a restrictive bucket policy, and signed URLs or cookies
- C. Put S3 in a private subnet behind a NAT Gateway
- D. Give every paid user IAM access keys with `s3:GetObject`

## 2

An order API accepts bursts that exceed the processing tier for several minutes. Every accepted order must be processed, duplicate delivery is possible, and API latency must remain low. Which design is best?

- A. API Gateway invokes a worker synchronously and retries until success
- B. The API stores an order message in SQS; idempotent workers scale on backlog; failed messages go to a DLQ
- C. Increase the worker EC2 instance size and reject excess requests
- D. Publish to one SNS subscription with no durable queue

## 3

A production relational database must survive an Availability Zone failure automatically. Reporting also creates heavy read load. Which TWO changes meet the requirements?

- A. Enable RDS Multi-AZ
- B. Add one or more read replicas and direct reporting reads to them
- C. Store automated snapshots in the same Availability Zone
- D. Replace the database security group with a network ACL
- E. Increase backup retention only

## 4

A company has a global real-time game protocol over UDP. It requires static entry IP addresses and improved routing over the AWS global network. Which service is the best fit?

- A. Amazon CloudFront
- B. AWS Global Accelerator
- C. Amazon API Gateway REST API
- D. Route 53 simple routing with a long TTL

## 5

Lambda functions in private subnets read S3 objects at high volume. The company wants to eliminate NAT Gateway processing for that path and keep traffic on the AWS network. Which change is most appropriate?

- A. Add an S3 gateway VPC endpoint and restrictive endpoint/bucket policies
- B. Add an internet gateway directly to each private subnet
- C. Add one NAT Gateway per function
- D. Copy the objects to instance store

## 6

A batch image-rendering workload can resume from checkpoints and finish any time within 12 hours. Demand is variable and cost is the priority. Which compute strategy is best?

- A. Fixed On-Demand instances sized for peak load
- B. Spot capacity diversified across suitable instance types and Availability Zones, with checkpoint-aware retries
- C. Dedicated Hosts under a three-year commitment
- D. Provisioned Lambda concurrency running continuously

## 7

An application uses DynamoDB. Almost all traffic targets a single tenant ID used as the partition key, causing throttling while table-level capacity remains. What is the best architectural correction?

- A. Increase item size so fewer items are stored
- B. Redesign keys to distribute the hot tenant's traffic, using a calculated shard suffix and a query fanout where needed
- C. Add an RDS Multi-AZ standby
- D. Enable S3 Transfer Acceleration

## 8

A security team needs to block known SQL injection request patterns at the public application edge and retain API activity for investigation. Which TWO controls address these separate needs?

- A. AWS WAF managed rules on the public entry point
- B. AWS CloudTrail with protected trail logs
- C. A security group deny rule containing the SQL pattern
- D. S3 lifecycle expiration after one hour
- E. An EC2 key pair rotation policy

## 9

An analytics team stores daily CSV files in S3 and repeatedly scans all files with Athena. Query cost and duration are increasing. Which change most directly improves both?

- A. Convert data to compressed Parquet and partition by commonly filtered attributes
- B. Move files to S3 Glacier Deep Archive before querying
- C. Increase the size of an unrelated EC2 instance
- D. Replicate every object to another Region

## 10

A company requires disaster recovery for an application. Data loss up to 24 hours and recovery within 48 hours are acceptable. The workload is rarely used during a disaster, and cost is the leading constraint. Which strategy is most appropriate?

- A. Multi-Region active-active at full capacity
- B. Warm standby with production-scale capacity in both Regions
- C. Automated backups copied to another Region, tested infrastructure-as-code restoration, and a runbook
- D. One larger instance in the primary Availability Zone

## 11

An application must fan out an event to several consumers. Consumers use different event attributes to decide whether to run, and new consumers should be added without changing publishers. Which design best fits?

- A. EventBridge custom bus with rules and independent targets
- B. One shared SQS queue read by all consumers
- C. A direct synchronous call from the publisher to each consumer
- D. One EC2 instance that polls the publisher database

## 12

A team stores database credentials in an encrypted Lambda environment variable. Policy now requires automatic rotation without code deployments and auditable retrieval. Which option best fits?

- A. Store the password in source control but encrypt the repository
- B. Use Secrets Manager, configure rotation, and grant the function's role scoped retrieval access
- C. Put the password in a public S3 object with a random name
- D. Give the function an administrator IAM user access key
