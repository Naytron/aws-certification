# Architecture Scenario - Ticketing surge

## Context and requirements

A ticketing API has unpredictable bursts. Checkout state must not be lost, an AZ failure must recover within five minutes with RPO 0, and a Regional disaster may recover within four hours with up to 15 minutes of data loss. The team is small and cost sensitive.

## Candidates

- **A:** ALB and Auto Scaling in two AZs, RDS Multi-AZ, durable S3 assets, tested cross-Region backups.
- **B:** Larger EC2 instance and RDS instance in one AZ with hourly snapshots.
- **C:** Active/active compute and writable databases in two Regions.

## Decision

Choose A. It satisfies the strict AZ objective and uses backup-based Regional recovery matching the looser DR objective. Test restore and routing runbooks.

## Distractors

B has vertical capacity but two zonal single points. C may meet the objectives but adds conflict resolution, cross-Region transfer, and operations the requirements do not justify. If Regional RTO becomes under one minute and the application can tolerate eventual consistency, reconsider active/active.
