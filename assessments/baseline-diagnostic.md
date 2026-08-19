# Baseline Diagnostic

Take this closed-book before the first module. It is a placement tool, not a pass/fail exam.

Record:

- Confident answer
- Uncertain answer
- Unknown

An uncertain correct answer still identifies a review need.

## Questions

1. Which cloud characteristic allows capacity to grow and shrink with demand?
   - A. Durability
   - B. Elasticity
   - C. Encryption
   - D. Immutability

2. A service must remain available after one data-center failure. What design idea matters most?
   - A. One larger server
   - B. Multiple independent failure domains
   - C. A longer DNS name
   - D. More administrator accounts

3. Which CIDR block contains 256 IPv4 addresses before platform reservations?
   - A. `/16`
   - B. `/20`
   - C. `/24`
   - D. `/28`

4. What does a stateful firewall remember?
   - A. Prior connection state
   - B. Disk snapshots
   - C. DNS zones
   - D. Encryption keys

5. Which control best limits blast radius when an application needs access to one bucket?
   - A. Give it account administrator access
   - B. Use a role with only required bucket actions and resources
   - C. Store root credentials with the application
   - D. Disable logging

6. Which storage model is accessed using object keys and APIs rather than mounted blocks?
   - A. Object storage
   - B. Block storage
   - C. Swap storage
   - D. CPU cache

7. What does RPO measure?
   - A. Maximum acceptable data loss measured in time
   - B. Maximum acceptable recovery duration
   - C. Average request latency
   - D. Password rotation interval

8. What does RTO measure?
   - A. Encryption strength
   - B. Maximum acceptable recovery duration
   - C. Maximum acceptable data loss
   - D. Queue depth

9. Why should retries use backoff and a maximum attempt count?
   - A. To make every call synchronous
   - B. To avoid amplifying an overload or persistent failure
   - C. To disable monitoring
   - D. To guarantee no duplicate work

10. What property lets a repeated request produce the same intended effect without duplicate side effects?
    - A. Idempotency
    - B. Compression
    - C. Sharding
    - D. Federation

11. Which statement about horizontal scaling is correct?
    - A. It always means adding CPU to one server
    - B. It adds or removes service instances
    - C. It removes the need for health checks
    - D. It guarantees strong consistency

12. A queue is inserted between a web tier and workers. What is the primary architecture benefit?
    - A. It couples their deployment schedules
    - B. It buffers demand and decouples processing rate
    - C. It replaces authentication
    - D. It removes all duplicate messages

13. Which DNS record maps a name to an IPv4 address?
    - A. A
    - B. MX
    - C. TXT
    - D. NS

14. What is the purpose of a load-balancer health check?
    - A. Encrypt database backups
    - B. Remove unhealthy targets from request routing
    - C. Create user accounts
    - D. Reduce object-storage durability

15. Which database factor should be defined before choosing a key-value schema?
    - A. The console color
    - B. Access patterns
    - C. The administrator's favorite SQL editor
    - D. The DNS registrar

16. What is the main distinction between metrics and logs?
    - A. Metrics are numeric time series; logs are event records
    - B. Logs can never contain timestamps
    - C. Metrics cannot trigger alarms
    - D. Logs are always cheaper

17. Why should infrastructure changes be reviewed as a plan or change set?
    - A. To hide resource replacement
    - B. To understand creates, updates, replacements, and deletions before execution
    - C. To avoid version control
    - D. To make rollback impossible

18. Which cost can remain after a virtual machine is terminated?
    - A. An unattached retained disk
    - B. CPU time on the terminated machine
    - C. Memory allocated to the terminated process
    - D. A stopped request

19. What is a hard architecture constraint?
    - A. A requirement the design must satisfy
    - B. A preferred icon color
    - C. An optional future idea
    - D. A fact that can be ignored during tradeoffs

20. What should happen before a hands-on cloud lab is considered complete?
    - A. The first successful page load
    - B. Validation, evidence, and verified resource cleanup
    - C. Creation of root access keys
    - D. Disabling budget alerts

## Interpretation

- Strong general fundamentals: begin Phase 0 and move quickly through familiar explanations, but still complete AWS-specific labs.
- Mixed fundamentals: use the full Level 100 sequence.
- Significant gaps: add introductory networking, Linux, security, and distributed-systems review while completing Phase 0.

Do not skip account safety based on the score.
