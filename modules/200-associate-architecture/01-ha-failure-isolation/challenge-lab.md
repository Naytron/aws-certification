# Challenge Lab - Hidden single-point audit

## Lab profile

**Cost label:** `DESIGN-ONLY`

No resources are created by the core `DESIGN-ONLY` challenge. The required tags `Course`, `Module`, `Owner`, and `ExpiresAt` apply only if an approved optional deployment occurs.

## Preflight

1. Run `aws sts get-caller-identity`; do not record the account ID.
2. Run `aws configure get region` and confirm the course home Region.
3. Confirm the Free-plan/credit status and budget alerts.
4. Read `cleanup.md` before any approved optional deployment.

## Challenge

Given a web tier spread across three AZs with one NAT Gateway, one writable database, an in-memory session cache, and a nightly snapshot:

1. Confirm identity and Region with the standard preflight.
2. Classify every component as zonal, Regional, or global.
3. Find at least four availability or recovery gaps.
4. Propose a minimum-cost correction for an AZ failure and a separate correction for Regional loss.
5. Specify health signals, RTO, RPO, and one controlled break/fix experiment.
6. Reject at least two over-engineered alternatives.

Pass when another learner can predict behavior for instance, AZ, dependency, deployment, and Region failures from your artifact. No AWS resources are created, so cleanup is an inventory check only.

## Validate

Confirm every stated pass condition with a diagram, decision table, or observable inventory result. Verify that no AWS resources were created for the core challenge and that any optional deployment uses the four required tags.

## Cleanup

No cloud resources were created. Run the module inventory checks and leave all pre-existing resources unchanged.

## Official references

- [AWS Regions and Availability Zones](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions-availability-zones.html)
- [Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html)
- [RDS high availability](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html)
