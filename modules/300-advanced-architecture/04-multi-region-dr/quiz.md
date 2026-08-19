# Quiz: Multi-Region Architecture and Disaster Recovery

Closed-book. Select the best answer. Questions are original and scenario based.

## 1. What does RPO measure?

A. Time to repair hardware
B. Maximum tolerable data loss expressed as time
C. Monthly availability only
D. DNS TTL

## 2. Which time belongs inside RTO?

A. Annual planning
B. Only database promotion
C. Detection, decision, recovery actions, and validation
D. Only DNS propagation

## 3. Why is replication not sufficient backup?

A. It cannot cross Regions
B. It removes encryption
C. It is always slower
D. Deletion or corruption can replicate to the recovery copy

## 4. What is essential before promoting a secondary writer?

A. Fence old authority and establish a single writer
B. Delete logs
C. Increase RPO
D. Lower TTL only

## 5. Which DR pattern usually matches an RTO of days?

A. Full active-active
B. Backup and restore
C. Always-on duplicate EKS
D. Multi-writer database

## 6. What can invalidate secondary-Region recovery even if templates exist?

A. Too few tags
B. README formatting
C. Insufficient quotas or unavailable capacity
D. Long resource names

## 7. What protects retrying payment requests from duplicate effects?

A. More Regions alone
B. S3 lifecycle
C. Idempotency keys and transaction-state checks
D. A shorter DNS name

## 8. Failback should be treated as what?

A. A controlled migration with reconciliation, validation, and rollback
B. An automatic delete
C. A billing action
D. A DNS reversal only

## 9. Which is a correlated dependency?

A. Independent recovery keys
B. One identity connector required by both Regions
C. Separate quota allocations
D. Different deployment artifacts

## 10. Why is active-active not automatically best?

A. It cannot use DNS
B. It has no availability benefit
C. It adds conflict, consistency, operations, and cost complexity that must satisfy a requirement
D. AWS forbids it

## Score

- 8/10 or better: pass, then explain every distractor you considered.
- Below 8/10: update the error log and retake with different challenge assumptions.
