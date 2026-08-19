# Architecture Review Checklist

Use this checklist for scenarios, challenge labs, and capstones.

## Requirements

- Which requirements are hard constraints?
- Which quality attribute has priority when tradeoffs conflict?
- What is the expected steady state, peak, and growth?
- What data classification, sovereignty, and retention rules apply?
- What are RTO and RPO?
- What may not change during migration?

## Security

- Where are the trust boundaries?
- How do humans and workloads obtain temporary credentials?
- Are permissions least privilege and condition-scoped?
- Where are secrets stored and rotated?
- Is data encrypted in transit and at rest with the right key ownership?
- Which preventive, detective, and responsive controls exist?
- What public or cross-account access is possible?

## Reliability

- What fails independently: component, instance, AZ, Region, account, or provider link?
- Are health checks end-to-end and tied to recovery?
- Is state durable and recoverable?
- Are retries bounded with backoff and idempotency?
- How are queues, poison messages, and partial failures handled?
- Have recovery procedures been tested?

## Performance

- What is the access pattern and bottleneck?
- Can the design scale horizontally?
- Where does caching help, and how is invalidation handled?
- Are service quotas and partitioning keys adequate?
- Is the network path appropriate for latency and throughput?

## Cost

- Which costs scale with requests, storage, time, data transfer, or provisioned capacity?
- Can a managed or serverless service reduce total operational cost?
- Are commitments appropriate only for stable usage?
- Are idle, duplicate, and retained resources controlled?
- Do tags and account boundaries support allocation?

## Operations

- How is infrastructure deployed, changed, and rolled back?
- Which metrics, logs, traces, and audit events prove health?
- What alarm triggers an actionable runbook?
- How are patches, certificates, keys, and dependencies maintained?
- What is the incident, escalation, and post-incident process?

## Migration

- What are the dependencies and migration wave?
- Which strategy applies: retire, retain, rehost, relocate, replatform, repurchase, or refactor?
- How is data synchronized and cut over?
- What is the rollback trigger and procedure?
- How is business validation performed?

## Final decision

- Does the design satisfy every hard requirement?
- Is there a simpler design that also satisfies them?
- Which plausible alternative fails one requirement?
- Which risk is intentionally accepted, and by whom?
