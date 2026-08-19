# Guided Lab - Failure-domain design review

## Lab profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Target Region | Course home Region |
| Expected resources | No AWS resources |
| Required permissions | `sts:GetCallerIdentity`, read-only AZ query |
| Cleanup required | No cloud resources |

## Objective

Produce and test a failure matrix for a two-AZ order API and prove that every hard dependency has an explicit failure behavior.

No resources are created by the core lab. The required tags `Course`, `Module`, `Owner`, and `ExpiresAt` apply only if an approved optional deployment is performed.

## Preflight

Run `aws sts get-caller-identity` and `aws configure get region`. Do not record the account ID. Confirm budgets, prepare the required tags for any future deployment, and read cleanup first.

## Architecture

```text
clients -> ALB
             +-> AZ-a: stateless app
             +-> AZ-b: stateless app
app -> RDS Multi-AZ
app -> S3
```

## Build

1. Run `aws ec2 describe-availability-zones --filters Name=state,Values=available --query "AvailabilityZones[].ZoneName" --output table`.
2. Draw the architecture and mark Region, AZ, network, compute, and data boundaries.
3. Create a table with faults: one task, all capacity in AZ-a, ALB health-check failure, database primary failure, Region loss, and bad deployment.
4. For each fault record detection, automated response, expected user symptom, data-loss expectation, and recovery owner.
5. Set targets: AZ failure RTO 10 minutes/RPO 0; Region loss RTO 8 hours/RPO 1 hour.
6. Select a Regional DR strategy. Backup/restore is sufficient for these targets; document why active/active is excessive.

## Validate

Every dependency appears in the matrix. AZ-a loss leaves healthy capacity and a data endpoint. Region loss is not claimed to be handled by Multi-AZ. Each response has a metric or health signal.

## Break and fix

Make the ALB check test only TCP connectivity. Observe on paper that an app with failed database access remains "healthy." Fix it with a bounded readiness check that verifies critical dependencies without causing a dependency storm.

## Cleanup

No resources were created. Save the diagram, matrix, fault correction, and decision record using the lab evidence template.

## Official references

- [AWS Regions and Availability Zones](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions-availability-zones.html)
- [Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html)
- [RDS high availability](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html)
