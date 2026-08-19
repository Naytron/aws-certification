# Baseline Diagnostic Answers

1. **B - Elasticity.** Elasticity adjusts capacity with demand; scalability is the broader ability to handle growth.
2. **B - Multiple independent failure domains.** Capacity in the same failure domain does not protect against that domain failing.
3. **C - `/24`.** IPv4 host bits are `32 - 24 = 8`, so the block has `2^8 = 256` addresses before reservations.
4. **A - Prior connection state.** Return traffic for an established flow can be evaluated using remembered state.
5. **B - A scoped role.** The workload receives only the actions and resources it needs, ideally through temporary credentials.
6. **A - Object storage.** Objects are retrieved by key through an API rather than exposed as raw disk blocks.
7. **A - Maximum acceptable data loss.** An RPO of 15 minutes means the recovery design must limit data loss to that window.
8. **B - Maximum acceptable recovery duration.** RTO measures how quickly service must be restored.
9. **B - Avoid amplification.** Immediate unlimited retries can worsen throttling and outages.
10. **A - Idempotency.** It is essential when messages or requests can be delivered more than once.
11. **B - Add or remove instances.** Horizontal scaling changes instance count; vertical scaling changes one instance's size.
12. **B - Buffer and decouple.** The producer can accept work at a different rate from consumers, within capacity and retention limits.
13. **A - A record.** An A record maps a name to IPv4; an AAAA record maps to IPv6.
14. **B - Stop routing to unhealthy targets.** Health checks must represent useful service health, not merely a running process.
15. **B - Access patterns.** Key design, indexes, and partitioning follow how data will be read and written.
16. **A - Numeric series versus event records.** Both can support monitoring, but they answer different questions.
17. **B - Preview impact.** Replacements and deletes can cause outage or data loss if not reviewed.
18. **A - A retained disk.** Storage and snapshots often outlive compute and continue to incur usage.
19. **A - A must-satisfy requirement.** Hard constraints eliminate otherwise plausible solutions.
20. **B - Validate and clean up.** A working request is only one part of functional, security, operational, and cost completion.

## Review

For every uncertain or missed answer, write:

1. The decision rule in one sentence.
2. A new example.
3. The strongest plausible wrong answer and why it fails.
