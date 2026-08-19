# Explained Answers - Cost-Optimized Architecture

## 1. What should happen before purchasing a long commitment?

**Answer:** Measure and optimize usage, then commit only a conservative stable baseline. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 2. When is Spot appropriate?

**Answer:** For interruption-tolerant work with retry, checkpointing, and diversified capacity. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 3. Why can serverless be cheaper at a higher unit rate?

**Answer:** It avoids paying for idle capacity and scales to actual use. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 4. What cost does an S3 gateway endpoint often avoid?

**Answer:** NAT Gateway hourly/data-processing cost for supported S3 traffic from a VPC. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 5. Why is average CPU insufficient for right-sizing?

**Answer:** Memory, network, disk, latency peaks, and seasonality may be the real constraints. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 6. Do AWS Budgets stop spending?

**Answer:** No; they alert and data can be delayed. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 7. What is a useful business unit metric?

**Answer:** A normalized measure such as cost per order or per 1,000 requests. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 8. Why may an archival S3 class increase cost?

**Answer:** Retrieval, transitions, requests, minimum duration, and object-size economics can outweigh storage savings. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 9. What is wrong with pricing only compute?

**Answer:** Transfer, storage, requests, logs, IPs, backups, and operations can dominate. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 10. What does sensitivity analysis reveal?

**Answer:** Which assumptions drive the decision and where architectures cross over. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## Review rule

For every miss, write the governing rule in your own words and apply it to a new scenario before closing the error-log entry.
