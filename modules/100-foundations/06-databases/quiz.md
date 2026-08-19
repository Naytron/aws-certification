# Quiz: Databases

**Level:** 100 | **SAA-C03:** Design Resilient Architectures; Design High-Performing Architectures; Design Cost-Optimized Architectures

Take this closed-book. These are original retrieval questions, not copied exam items. Choose the best answer for the stated requirement.

## 1. Which feature primarily improves RDS availability?

A. Multi-AZ
B. Read replica only
C. DynamoDB TTL
D. S3 lifecycle
## 2. Which feature primarily scales RDS reads?

A. Read replicas
B. Security groups
C. EBS tags
D. IAM alias
## 3. What does DynamoDB Query require?

A. Partition-key equality
B. A full table scan
C. SQL joins
D. Root credentials
## 4. Why avoid Scan on a hot request path?

A. It reads broadly and cost/latency grow
B. It is strongly consistent only
C. It creates a VPC
D. It deletes TTL items
## 5. Which capacity mode fits unknown spiky traffic at Level 100?

A. On-demand
B. Fixed EC2 tenancy
C. Provisioned without autoscaling always
D. Multi-AZ
## 6. Is DynamoDB TTL exact to the second?

A. Yes
B. No; deletion is asynchronous
C. Only in us-east-1
D. Only with a GSI
## 7. Can a GSI provide strongly consistent reads?

A. Yes always
B. No
C. Only with root
D. Only when empty
## 8. Who owns schema and query design in managed RDS?

A. AWS alone
B. The customer
C. Route 53
D. CloudFront

## Scoring

Score one point each. Target 7/8 before continuing. For every miss, explain why your answer failed and why the best distractor is still wrong. Review [answers.md](answers.md) only after committing your choices.
