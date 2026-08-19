# Quiz: Federation, Cross-Account Trust, and Central Security

Closed-book. Select the best answer. Questions are original and scenario based.

## 1. What is the ExternalId condition primarily designed to mitigate?

A. Password reuse
B. Cross-service encryption
C. The confused-deputy problem for third-party role assumption
D. Expired STS sessions

## 2. A role trust policy allows a principal, but the caller identity policy does not allow sts:AssumeRole. Usually what happens?

A. The SCP becomes irrelevant
B. Allowed by trust alone
C. Denied because both sides of the role-assumption authorization are not satisfied
D. Root automatically grants it

## 3. What is the key ABAC control?

A. Put tags in usernames
B. Allow self-service PrincipalTag values
C. Use more tags
D. Govern who can issue and mutate authorization tags

## 4. Which credential pattern is preferred for CI deployment?

A. Temporary scoped role session with attributable context
B. Shared root credentials
C. Public resource policy
D. Embedded administrator access key

## 5. What should a break-glass design include?

A. The normal IdP as its only dependency
B. Permanent daily use
C. Independent authentication, short duration, alerts, and review
D. No logging to protect secrecy

## 6. Why can deleting a compromised role be a poor first containment step?

A. It lengthens sessions
B. IAM roles cannot be deleted
C. It may disrupt production and does not erase already issued sessions; evidence can be lost elsewhere
D. Roles are free

## 7. Cross-account use of a customer KMS key commonly requires what?

A. Only a bucket ACL
B. A NAT Gateway
C. Only an SCP allow
D. Key policy and caller-side permission

## 8. What does SourceIdentity improve?

A. Session attribution across role assumptions
B. Route convergence
C. Budget accuracy
D. Data encryption

## 9. Where should organization-wide findings be administered?

A. Only in the management account
B. A delegated security account with scoped member response
C. Every developer laptop
D. The root user email

## 10. What is the best response to suspected CI compromise?

A. Share new static keys
B. Wait silently for expiry
C. Delete all logs
D. Stop issuance, isolate source, scope deny, preserve evidence, hunt persistence, restore by canary

## Score

- 8/10 or better: pass, then explain every distractor you considered.
- Below 8/10: update the error log and retake with different challenge assumptions.
