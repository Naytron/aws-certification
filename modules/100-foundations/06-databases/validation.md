# Validation: Databases

**Level:** 100 | **Cost label:** `FREE-PLAN SAFE` | **SAA-C03:** Design Resilient Architectures; Design High-Performing Architectures; Design Cost-Optimized Architectures

Run validation before cleanup, redact account IDs/ARNs, and record only non-sensitive output.

## Required evidence

| Check | Pass condition |
| --- | --- |
| Identity | `sts get-caller-identity` is the expected non-root identity; output is not stored |
| Region | Every Regional command names the recorded home Region |
| Cost | Billing/credits reviewed; only resources listed by the lab exist |
| Tags | `Course`, `Module`, `Owner`, and `ExpiresAt` appear on every taggable resource |
| Functional | The guided and challenge observable outcomes succeed |
| Security | No public access, long-term key, secret in evidence, or unnecessary permission was added |
| Failure | The controlled fault produced the predicted symptom and the fix was verified |
| Cleanup readiness | Exact names/IDs and dependency order are recorded before deletion |

## Decision validation

Explain, without notes:

1. The requirement that selected the service or pattern.
2. Its Region/AZ/global scope and primary failure boundary.
3. The customer-owned security and recovery configuration.
4. Why one cheaper and one more complex alternative fails.

## Post-cleanup validation

Follow [cleanup.md](cleanup.md), then prove each exact resource is absent. Check the service console in the same Region, any global service used, and Billing/Free Tier usage. A not-found result is evidence only when the command names the exact lab resource.

## Gate

Pass when every row above is evidenced, no named resource remains, and the architecture decision can be defended.
