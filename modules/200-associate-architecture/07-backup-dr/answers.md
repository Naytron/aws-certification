# Explained Answers - Backup and Disaster Recovery

## 1. What does RPO measure?

**Answer:** The maximum acceptable amount of data loss expressed as time. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 2. What does RTO measure?

**Answer:** The maximum acceptable time to restore service. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 3. Which DR strategy has the lowest standing cost?

**Answer:** Backup and restore, usually with the longest RTO. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 4. Why is replication not a complete backup strategy?

**Answer:** It can propagate corruption or deletion and may share an administrative failure domain. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 5. What must a restore test prove?

**Answer:** Discoverability, access/decryption, integrity, application usability, and completion within objectives. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 6. What does S3 deletion do in a versioned bucket by default?

**Answer:** It creates a delete marker while prior versions remain. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 7. Why does Multi-AZ not satisfy Regional DR?

**Answer:** Its failure isolation remains within one Region. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 8. What does warm standby mean?

**Answer:** A functional but scaled-down recovery environment that can scale up after failover. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 9. Why include quotas in a DR runbook?

**Answer:** Recovery capacity may fail to launch even when templates and data are ready. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 10. What isolation can cross-account backup add?

**Answer:** A separate administrative boundary against compromise or accidental deletion. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## Review rule

For every miss, write the governing rule in your own words and apply it to a new scenario before closing the error-log entry.
