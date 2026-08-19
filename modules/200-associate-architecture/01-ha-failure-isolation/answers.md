# Explained Answers - High Availability and Failure Isolation

## 1. Three instances run in one AZ. What failure remains unaddressed?

**Answer:** Loss of that AZ; instance count does not cross the zonal boundary. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 2. Which objective distinguishes DR choices most directly?

**Answer:** Numeric RTO and RPO, together with consistency and cost requirements. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 3. Why is an RDS read replica not automatically an HA standby?

**Answer:** It primarily scales reads, is normally asynchronous, and promotion is a separate recovery action. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 4. What should an ALB health check measure?

**Answer:** Application readiness sufficient to serve traffic, not only process or port liveness. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 5. When is active/active multi-Region usually unjustified?

**Answer:** When looser RTO/RPO can be met by a simpler, cheaper recovery strategy. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 6. What does Auto Scaling contribute after an AZ loses capacity?

**Answer:** It replaces or adds healthy compute, subject to launch time and available capacity. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 7. Why are backups not high availability?

**Answer:** They support recovery after interruption rather than a continuously available endpoint. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 8. What is the danger of two quorum members across two AZs?

**Answer:** After a partition neither side can safely form an unambiguous majority. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 9. Which AWS boundary is appropriate for a single data-center-class fault?

**Answer:** An Availability Zone. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## 10. What must a failure matrix include besides the fault?

**Answer:** Detection, response, user impact, data impact, and recovery ownership. The decision follows the stated requirement; alternatives that do not meet it are distractors.

## Review rule

For every miss, write the governing rule in your own words and apply it to a new scenario before closing the error-log entry.
