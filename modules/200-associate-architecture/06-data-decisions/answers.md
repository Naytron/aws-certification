# Explained Answers - Database, Analytics, and Storage Decisions

## 1. What should drive database selection first?

**Answer:** The workload's access patterns, consistency, scale, availability, and operational constraints. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 2. What is a DynamoDB scan often evidence of?

**Answer:** An access pattern not supported by an appropriate key or index. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 3. Which storage fits shared POSIX files across instances?

**Answer:** Amazon EFS. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 4. Which storage fits durable HTTP-addressable objects?

**Answer:** Amazon S3. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 5. What primarily drives Athena query cost?

**Answer:** Bytes scanned, affected by projection, partitioning, compression, and columnar format. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 6. What is the main role of an RDS read replica?

**Answer:** Scaling reads and potentially supporting promotion, not replacing the HA meaning of Multi-AZ. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 7. Why is a cache not the system of record?

**Answer:** Entries can expire or be evicted and cache nodes can fail. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 8. When is Redshift more plausible than Athena?

**Answer:** For sustained warehouse workloads needing predictable concurrency/performance and richer warehouse management. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 9. Why can archival lifecycle transitions cost more?

**Answer:** Minimum duration, retrieval, request, and small-object charges can outweigh storage savings. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 10. What does EBS provide compared with EFS?

**Answer:** Low-latency block storage tied to an AZ and normally attached to compute, not a Regional shared file API. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## Review rule

For every miss, write the governing rule in your own words and apply it to a new scenario before closing the error-log entry.
