# Answer key: Multi-Account Governance and Landing Zones

## 1. B

SCPs cap member-account permissions. An explicit deny in any applicable policy wins; FullAWSAccess cannot override it.

## 2. C

Account separation creates multiple useful hard boundaries. Tags are attributes, not universal isolation.

## 3. A

Delegation reduces management-account exposure while retaining centralized service administration.

## 4. A

An SCP is a guardrail, not an authorization grant. Identity/resource policies must still allow the action.

## 5. C

A policy is a production deployment. Canary rollout limits unknown dependency blast radius.

## 6. D

OUs are policy/lifecycle groupings. Accounts and organizations provide stronger administrative boundaries.

## 7. C

Region guardrails need carefully tested exclusions for global and required control-plane operations.

## 8. A

Time bounds and compensating evidence prevent an exception from silently becoming the baseline.

## 9. B

The current Free plan automatically upgrades when Control Tower is configured; this module is design-only.

## 10. C

Dependency discovery and staged inheritance preserve availability and a clear rollback point.

## Review method

For each miss, write the governing requirement, the decision rule, why your option failed, and one changed fact that would make it correct.
