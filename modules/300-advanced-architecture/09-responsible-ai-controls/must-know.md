# Must know: Responsible AI, Bedrock Guardrails, Agent Identity, and Human Approval

## Decision frame

For every design, separate:

1. **Business objective** - the outcome and tolerated loss, not a preferred service.
2. **Hard constraints** - legal boundary, RTO/RPO, identity authority, data residency, and migration window.
3. **Failure domains** - account, Availability Zone, Region, identity provider, network, control plane, and operator.
4. **Trust boundaries** - who authenticates, who authorizes, who can assume or delegate, and where credentials exist.
5. **Operations** - owner, telemetry, runbook, escalation, test cadence, and rollback authority.
6. **Economics** - fixed baseline, variable usage, data processing/transfer, licenses, commitments, and people cost.

## Decision table

| Signal | Prefer | Reject or challenge |
| --- | --- | --- |
| Safety/topic/content control | Bedrock Guardrails plus deterministic application controls and evaluation | Guardrail as sole authorization layer |
| Agent calls AWS/third party | AgentCore Identity/workload identity with scoped delegated credentials and policy enforcement | Shared embedded API keys |
| Irreversible/high-impact action | Deterministic policy gate and informed human approval | Model self-approval |
| Sensitive retrieval | Authorized retrieval, metadata filters, source labels, and output policy | Prompt instruction alone |
| Model/service failure | Defined fail-closed or degraded path by business risk | Silent fallback to ungoverned model |

## Deep analysis

- Exam-status note: AWS may include unscored pretest questions, and exam content evolves. Bedrock AgentCore is an emerging topic; study its architecture, but do not assume a named feature is guaranteed scored SAP-C02 coverage. Verify the current official exam guide.
- Guardrails can evaluate denied topics, harmful content, sensitive information, word filters, contextual grounding, and automated reasoning capabilities as documented. They do not replace IAM, data authorization, transaction validation, or human accountability.
- Treat system prompts, retrieved documents, memory, tool results, and user content as different trust classes. Prompt injection can arrive indirectly through retrieved/tool content.
- AgentCore Identity supports agent/workload identity and credential-provider patterns. Bind identity to exact tools/actions/audiences, short duration, tenant context, and auditable delegation.
- AgentCore Policy can enforce deterministic Cedar-based authorization at tool boundaries. Natural-language policy generation still requires review and deterministic enforcement.
- Human approval must be meaningful: show proposed action, target, diff, evidence, impact, alternatives, expiry, and authenticated approver. Timeouts fail safely; the model cannot approve itself.
- Classify actions: read-only/reversible and bounded may automate; externally visible, financial, privilege-changing, destructive, or safety-critical actions require stronger gates.
- Evaluate before release and continuously: safety, correctness, groundedness, bias/fairness relevant to context, prompt injection, data leakage, tool misuse, latency, and cost. Preserve privacy and legal basis.
- Bedrock/AgentCore deployment may consume credits or incur usage charges. This module is design-only; use threat models and synthetic evaluations.

## Failure and blast-radius checklist

- Name the smallest unit that can fail without affecting another workload.
- Distinguish data-plane continuity from control-plane changes during an incident.
- Identify correlated dependencies: shared identity, DNS, KMS, quotas, pipelines, and operators.
- State the recovery authority and the evidence required before failover or rollback.
- Quantify RTO and RPO per business transaction; "highly available" is not a target.
- Test degraded modes, not only total outages.
- Prevent a compromised workload identity from becoming an organization-wide principal.

## Exam traps

- Assuming a Guardrail is a complete security or authorization control.
- Giving an agent one broad role for every tool and tenant.
- Allowing retrieved text to choose tools or override policy.
- Using an LLM to decide whether its own destructive action needs approval.
- Logging raw prompts and secrets without privacy/retention analysis.

## Retrieval prompts

1. Which requirement drives the boundary, and which service is merely an implementation?
2. What is the largest credible correlated failure?
3. What must remain available if the AWS control plane or enterprise identity provider is impaired?
4. Which cost is fixed even at zero traffic?
5. What evidence proves the control works rather than merely exists?

## Official references

- [SAP-C02 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.html)
- [Bedrock Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html)
- [AgentCore Identity overview](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/identity-overview.html)
- [AgentCore Policy](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy.html)
- [Agentic AI Lens - human oversight](https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel02-bp05.html)
- [Agentic AI Lens - human in the loop](https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec04-bp02.html)
