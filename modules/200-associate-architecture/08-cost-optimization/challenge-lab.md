# Challenge Lab - Optimization review board

## Lab profile

**Cost label:** `DESIGN-ONLY`

No resources are created by the core `DESIGN-ONLY` challenge. The required tags `Course`, `Module`, `Owner`, and `ExpiresAt` apply only if an approved optional deployment occurs.

## Preflight

1. Run `aws sts get-caller-identity`; do not record the account ID.
2. Run `aws configure get region` and confirm the course home Region.
3. Confirm the Free-plan/credit status and budget alerts.
4. Read `cleanup.md` before any approved optional deployment.

## Challenge

Review a workload with 10 underused instances, unattached EBS volumes, 365-day debug logs, cross-AZ service chatter, NAT-routed S3 traffic, and a non-interruptible nightly batch.

Prioritize changes by savings confidence, effort, and risk. Include measurement, rollback, and the hard requirement protected by each decision. Propose an S3 gateway endpoint, retention policy, right-sizing experiment, and Spot only for retryable batch portions. Decide how much baseline is safe to commit.

Perform preflight and verify no resources or commitments were created. Pass when estimates separate usage reduction, rate reduction, and architecture change.

## Validate

Confirm every stated pass condition with a diagram, decision table, or observable inventory result. Verify that no AWS resources were created for the core challenge and that any optional deployment uses the four required tags.

## Cleanup

Follow the design-only checks in [cleanup](cleanup.md). Confirm no commitment or report was created and retain only a sanitized cost model without account identifiers.

## Official references

- [AWS Pricing Calculator](https://docs.aws.amazon.com/pricing-calculator/latest/userguide/what-is-pricing-calculator.html)
- [Cost Optimization Pillar](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html)
- [Savings Plans](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html)
