# Guided lab: Threat-model and authorize a procurement agent

## Lab profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Cloud resources | None |
| Account changes | None |
| Timebox | 90-150 minutes |
| Cleanup | [No-cloud cleanup verification](cleanup.md) |

> Do not invoke Bedrock models, create Guardrails, AgentCore resources, knowledge bases, identities, policies, or paid evaluation jobs.

## Objective

Design controls for an agent that reads policy, drafts purchase requests, and can invoke enterprise tools, without calling any model or AWS service.

## Inputs

- The agent retrieves contracts and vendor documents from a governed knowledge source.
- It can read catalog data, draft purchase requests, send messages, and request purchase-order creation.
- Orders above USD 5,000 or to a new vendor require two human approvals.
- Documents can contain malicious instructions; users span multiple business units.
- Prompts, retrieval snippets, decisions, approvals, and tool calls have different retention rules.

All facts are fictional. Keep account IDs, credentials, private endpoints, customer records, and other sensitive information out of the artifacts.

## Preflight

1. Confirm the exercise remains `DESIGN-ONLY`; do not create or change AWS resources.
2. Confirm the current AWS Free plan is unchanged and billing alerts remain available.
3. Use only fictional or sanitized inputs; do not record account IDs, ARNs, credentials, endpoints, or customer data.
4. If this architecture were later deployed in an approved paid sandbox, require the standard tags `Course`, `Module`, `Owner`, and `ExpiresAt` on every supported resource. Tags are design annotations here, not a reason to deploy.
5. Read [cleanup.md](cleanup.md) before starting and record that no cloud resources are expected.

## Architecture frame

Before selecting a service, create five columns: hard requirement, owner, trust boundary, failure domain, and measurable evidence. A design decision is valid only when it closes a row in that table.

## Guided procedure

### 1. Establish requirements and authority

1. Mark each input as a hard constraint, assumption, or preference.
2. Assign one accountable owner to every hard constraint.
3. Record numeric RTO, RPO, capacity, cost, and compliance limits where relevant.
4. Identify who may approve a change, exception, failover, or rollback.

### 2. Draw boundaries

Create an ASCII or diagramming-tool view that distinguishes:

- organization/account and administrative boundaries;
- human and workload trust paths;
- network and data movement;
- Availability Zone, Region, external provider, and operator failure domains;
- evidence, key, and recovery ownership.

### 3. Complete the module analysis

1. Draw user, agent runtime, model, Guardrail, retrieval, memory, AgentCore Identity, policy gateway, tools, approvers, logs, and external-vendor boundaries.
2. Threat-model direct/indirect prompt injection, cross-tenant retrieval, secret leakage, confused deputy, excessive agency, poisoned memory, approval spoofing, and denial of wallet.
3. Create an action matrix with read/draft/notify/create/change/delete, reversibility, maximum impact, credential scope, policy, approval, timeout, and evidence.
4. Write pseudocode deterministic rules for amount, vendor status, segregation of duties, tenant, and allowed tool parameters.
5. Define Guardrail coverage and state what remains outside it.
6. Build at least 20 synthetic evaluation cases including adversarial documents and ambiguous approvals; specify expected safe behavior.
7. Design human approval payload, identity, expiry, rejection, escalation, and resume semantics.
8. Define incident response for leaked data or an unauthorized tool call, including credential revocation and memory quarantine.
9. Estimate token/model, guardrail, retrieval, tool, logging, and human-review cost per completed purchase.

For each task, write the observation, inference, decision, evidence, residual risk, and owner. Do not treat an architecture diagram as proof by itself.

### 4. Run a controlled failure game

Choose the most consequential listed dependency. Walk the clock through detection, diagnosis, authorization, containment, recovery, validation, and rollback. Record the first point at which the design misses an objective. Then change one control and repeat.

### 5. Compare alternatives

Score at least three approaches from 1 (poor) to 5 (strong) for security, blast radius, recovery, operations, compliance, variable cost, fixed cost, migration risk, and reversibility. Weight only criteria traced to requirements.

### 6. Write the ADR

Document context, decision, alternatives, consequences, assumptions, validation evidence, exception owner, reversal trigger, and rollback authority.

## Validate

The result should have these characteristics:

- Deterministic authorization, not model judgment, controls external effects.
- Each tool receives a minimal, attributable, tenant-scoped credential.
- High-impact actions pause for authenticated approval with safe timeout.
- Guardrail responsibility and limitations are explicit.
- Evaluation includes security, safety, correctness, privacy, reliability, latency, and cost.

## Cleanup

No cloud cleanup is expected. Complete [cleanup.md](cleanup.md), sanitize evidence, and explicitly record `No cloud resources created - DESIGN-ONLY`.

Complete every gate in [validation.md](validation.md), then perform [cleanup.md](cleanup.md). Save non-sensitive evidence using [the course evidence template](../../../templates/lab-evidence-template.md).
