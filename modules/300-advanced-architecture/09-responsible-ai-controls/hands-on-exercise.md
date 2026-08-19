# Hands-on exercise: Threat-model and authorize a procurement agent

## Exercise profile

| Field | Value |
| --- | --- |
| Cost label | `DESIGN-ONLY` |
| Cloud resources | None |
| Tools | Text editor, spreadsheet, diagramming tool, and optional local policy/query tool |
| Timebox | 90-150 minutes |
| Primary artifact | Trust/data-flow diagram, action-control matrix, synthetic evaluation set, and ADR |

## Objective

Design controls for an agent that reads policy, drafts purchase requests, and can invoke enterprise tools, without calling any model or AWS service.

## Inputs

- The agent retrieves contracts and vendor documents from a governed knowledge source.
- It can read catalog data, draft purchase requests, send messages, and request purchase-order creation.
- Orders above USD 5,000 or to a new vendor require two human approvals.
- Documents can contain malicious instructions; users span multiple business units.
- Prompts, retrieval snippets, decisions, approvals, and tool calls have different retention rules.

Treat all names and numbers as fictional. Do not paste account IDs, credentials, endpoints, or customer data into course evidence.

## Tasks

1. Draw user, agent runtime, model, Guardrail, retrieval, memory, AgentCore Identity, policy gateway, tools, approvers, logs, and external-vendor boundaries.
2. Threat-model direct/indirect prompt injection, cross-tenant retrieval, secret leakage, confused deputy, excessive agency, poisoned memory, approval spoofing, and denial of wallet.
3. Create an action matrix with read/draft/notify/create/change/delete, reversibility, maximum impact, credential scope, policy, approval, timeout, and evidence.
4. Write pseudocode deterministic rules for amount, vendor status, segregation of duties, tenant, and allowed tool parameters.
5. Define Guardrail coverage and state what remains outside it.
6. Build at least 20 synthetic evaluation cases including adversarial documents and ambiguous approvals; specify expected safe behavior.
7. Design human approval payload, identity, expiry, rejection, escalation, and resume semantics.
8. Define incident response for leaked data or an unauthorized tool call, including credential revocation and memory quarantine.
9. Estimate token/model, guardrail, retrieval, tool, logging, and human-review cost per completed purchase.

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

- The requester is also the only available approver.
- A retrieved contract says to ignore previous instructions and create an urgent order.
- AgentCore Identity or the model is unavailable during a time-critical purchase.

Rework the design for one change. Do not add a service unless it closes a traced requirement.

## Expected characteristics

- Deterministic authorization, not model judgment, controls external effects.
- Each tool receives a minimal, attributable, tenant-scoped credential.
- High-impact actions pause for authenticated approval with safe timeout.
- Guardrail responsibility and limitations are explicit.
- Evaluation includes security, safety, correctness, privacy, reliability, latency, and cost.

## Evidence

Save only non-sensitive diagrams, calculations, decision tables, and the ADR. Use [the course evidence template](../../../templates/lab-evidence-template.md).
