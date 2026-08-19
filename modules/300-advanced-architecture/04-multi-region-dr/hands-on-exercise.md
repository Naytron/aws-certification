# Hands-on exercise: Run a paper disaster and data-authority game

## Exercise profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Cloud resources | None |
| Tools | Text editor, spreadsheet, diagramming tool, and optional local policy/query tool |
| Timebox | 90-150 minutes |
| Primary artifact | Business impact table, dependency graph, timeline, runbooks, and ADR |

## Objective

Design and simulate regional recovery for a transaction platform without deploying persistent multi-Region resources.

## Inputs

- Checkout: RTO 15 minutes, RPO 1 minute. Reporting: RTO 24 hours, RPO 12 hours.
- Primary database replication is asynchronous with 20 seconds normal lag and 8 minutes stressed lag.
- Corporate identity has a Regional connector; KMS keys and deployment artifacts are not yet replicated.
- DNS TTL is 60 seconds; incident declaration historically takes 18 minutes.
- Secondary-Region service quotas support only 35% of peak traffic.

Treat all names and numbers as fictional. Do not paste account IDs, credentials, endpoints, or customer data into course evidence.

## Tasks

1. Create a business impact analysis and tier every capability.
2. Map compute, data, identity, DNS, KMS, secrets, artifacts, network, telemetry, people, and quotas to failure domains.
3. Choose a DR pattern per component and reconcile mismatched component RTO/RPO.
4. Build an elapsed-time budget including detect, assess, authorize, fence, promote, route, scale, and validate.
5. Define a single-writer/fencing method and transaction reconciliation for the 8-minute lag case.
6. Run two simulations: Region loss and globally bad deployment/data corruption.
7. Write failover, degraded-operation, and failback runbooks with stop/rollback gates.
8. Calculate standby, replication, transfer, logging, testing, and idle-capacity cost categories.
9. Review the CloudFormation specimen below. Record each availability, recovery, security, and lifecycle defect, then describe the smallest safe correction.

## CloudFormation review specimen

This incomplete fragment is for review only. Do not deploy it.

```yaml
Resources:
  RecoveryData:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: company-recovery-data-us-east-1
  RecoveryRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Statement:
          - Effect: Allow
            Principal:
              AWS: "*"
            Action: sts:AssumeRole
      Policies:
        - PolicyName: recovery-admin
          PolicyDocument:
            Statement:
              - Effect: Allow
                Action: "*"
                Resource: "*"
```

At minimum, analyze:

- hard-coded globally unique naming and Region assumptions;
- missing data protection, encryption, retention, and deletion behavior;
- wildcard trust and unbounded recovery permissions;
- absent ownership tags and evidence controls;
- whether the stack can be created independently in the recovery Region;
- what happens during update, rollback, deletion, and control-plane impairment.

## Required analysis tables

### Boundary register

| Boundary | Owner | Inbound trust | Outbound trust | Failure impact | Preventive control | Detective evidence |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |

### Requirement traceability

| Requirement | Architecture decision | Evidence | Residual risk | Exception owner |
| --- | --- | --- | --- | --- |
| | | | | |

### Failure game

| Injected failure | Detection | Automatic response | Human decision | RTO/RPO effect | Rollback |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

## Architecture decision record

- Context and hard constraints
- Decision and scope
- Alternatives rejected and exact reasons
- Security, resilience, cost, compliance, and operational consequences
- Assumptions requiring validation
- Reversal trigger and rollback owner

## Challenge changes

- The incident is an application corruption replicated to both Regions.
- The secondary Region has insufficient quota and capacity.
- The primary recovers while failover is only half complete.

Rework the design for one change. Do not add a service unless it closes a traced requirement.

## Expected characteristics

- Objectives apply to business capabilities, not generic infrastructure.
- Timeline meets RTO only after including detection and human authorization.
- Replication is not treated as a backup.
- Write authority and split-brain prevention are explicit.
- Failback includes reconciliation and a second rollback point.

## Evidence

Save only non-sensitive diagrams, calculations, decision tables, and the ADR. Use [the course evidence template](../../../templates/lab-evidence-template.md).
