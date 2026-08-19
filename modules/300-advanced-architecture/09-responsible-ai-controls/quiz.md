# Quiz: Responsible AI, Bedrock Guardrails, Agent Identity, and Human Approval

Closed-book. Select the best answer. Questions are original and scenario based.

## 1. What is the correct role of Bedrock Guardrails in an agent architecture?

A. Replace IAM and tool authorization
B. Provide model input/output safeguards as one layer alongside deterministic controls
C. Issue production credentials
D. Approve its own actions

## 2. Who should decide whether a destructive action is authorized?

A. Any tool response
B. The same model proposing it
C. Deterministic policy and an authenticated human where risk requires
D. Retrieved documents

## 3. What is indirect prompt injection?

A. KMS rotation
B. A quota request
C. A user typo
D. Malicious instructions arriving through retrieved or tool-supplied content

## 4. How should an agent access tools?

A. Short-lived, audience/action/tenant-scoped attributable credentials
B. Root credentials in memory
C. Public unauthenticated endpoints
D. One shared administrator key

## 5. What should an approval display?

A. Only model confidence
B. Final exact action, target, diff/impact, rationale/evidence, expiry, and requester identity
C. A generic OK button
D. Hidden tool parameters

## 6. What is a safe approval timeout?

A. Ask the model to approve
B. Execute automatically
C. Expire or enter an explicitly safe degraded path
D. Keep credentials forever

## 7. What should happen when the model is unavailable during an incident?

A. Disable audit
B. Use an unknown model silently
C. Give the agent broader permissions
D. Use a predefined degraded/read-only or human runbook based on risk

## 8. Which evaluation is required beyond helpfulness?

A. Injection, leakage, unsafe tool use, groundedness, relevant fairness, reliability, latency, and cost
B. Only grammar
C. Only model brand
D. Only token count

## 9. How should AgentCore emerging content be treated for SAP-C02 study?

A. Guaranteed scored coverage
B. Current architecture knowledge that may be emerging/pretest; verify the official guide
C. Ignore all identity principles
D. Assume service details never change

## 10. What is a denial-of-wallet control?

A. Public tools
B. Unlimited retries
C. Budgets, rate/token limits, caching where safe, circuit breakers, and anomaly response
D. Longer prompts

## Score

- 8/10 or better: pass, then explain every distractor you considered.
- Below 8/10: update the error log and retake with different challenge assumptions.
