# Distractor Analysis

## The requirements-first method

1. Read the final ask first: one answer or multiple, and the optimization target.
2. Extract hard requirements: protocol, RTO, RPO, consistency, security boundary, operations, performance, and cost.
3. Mark soft preferences separately.
4. Predict the architecture before reading choices.
5. Eliminate any choice that violates one hard requirement.
6. Among survivors, choose the least complex option that fully satisfies the prompt.
7. Re-read qualifiers such as "most cost-effective," "least operational effort," and "without changing the application."

## Common distractor constructions

| Pattern | Test |
| --- | --- |
| Correct service, wrong feature | Does Multi-AZ solve reads, or failover? Does a read replica meet synchronous RPO? |
| Technically possible, operationally excessive | Is custom code proposed where a managed integration satisfies every requirement? |
| Cheapest component, failed requirement | Did the option remove required availability, durability, or latency? |
| Secure-sounding but incomplete | Does encryption omit authorization, rotation, network path, or auditing? |
| More services, no benefit | Which explicit requirement needs each component? |
| Keyword match | Would the answer remain correct if the service name were removed from the prompt? |
| Scale mismatch | Is the bottleneck actually storage/database/network rather than compute? |
| Wrong failure boundary | Are replicas in one AZ, one Region, or one account when the stated event is broader? |
| Async mismatch | Does the business require an immediate synchronous result? |
| Hidden data-transfer cost | Does the design force NAT, cross-AZ, or cross-Region paths? |

## Rejection sentence

Use: "`Choice X` provides `<benefit>`, but fails `<hard requirement>` because `<mechanism>`." If no hard requirement fails, compare operational burden and total cost.

Example: "A larger EC2 instance provides more compute, but fails burst isolation because intake remains synchronously coupled to processing."

## Multiple-response control

- Treat the stated number of selections as a constraint.
- Evaluate each option independently against the prompt.
- Do not select an option merely because it complements another correct answer.
- Verify the selected combination is sufficient and contains no conflicting controls.

## Review discipline

For every missed or low-confidence item, record:

- Requirement missed.
- Distractor mechanism.
- Decision rule.
- A new counterexample.
- One plausible alternative and its precise failure.

Never store copied proprietary question text. Summarize the concept in original language.
