# Answer key: Multi-Region Architecture and Disaster Recovery

## 1. B

RPO constrains how far back recovered data may be relative to the incident.

## 2. C

RTO is business restoration elapsed time, including human and technical stages.

## 3. D

Backups need independent retention/immutability and tested restoration against logical damage.

## 4. A

Fencing prevents split brain under partial failure or partition.

## 5. B

Long RTO can justify the lower fixed cost of restore-based recovery.

## 6. C

Recovery capacity must be prevalidated; templates do not reserve quota or physical capacity.

## 7. C

Idempotent processing turns retries into the same logical operation and supports reconciliation.

## 8. A

State may diverge after failover; return requires data and authority management.

## 9. B

A shared identity dependency can defeat otherwise regional isolation.

## 10. C

The most complex pattern is justified only when objectives require it and the data model supports it.

## Review method

For each miss, write the governing requirement, the decision rule, why your option failed, and one changed fact that would make it correct.
