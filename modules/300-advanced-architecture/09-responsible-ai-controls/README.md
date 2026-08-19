# Responsible AI, Bedrock Guardrails, Agent Identity, and Human Approval

## Level and exam mapping

- Level: 300-400
- SAP-C02 domains: Domain 2 - New Solutions (emerging topic); Domain 3 - Continuous Improvement (emerging topic)
- Cost label: `DESIGN-ONLY`
- Default account impact: none

> The course account begins on the AWS Free plan. This module creates no AWS resources. Never convert the account to a Paid plan merely to complete an exercise.

## Why this is level 400

Generative and agentic AI introduce probabilistic output, prompt/data trust, non-human identity, tool authorization, model/vendor boundaries, and irreversible action risk. You must layer deterministic controls, model safeguards, approval, evidence, evaluation, and fallback rather than treating one filter as a security boundary.

## Outcomes

After this module, you can:

1. Threat-model model, retrieval, memory, tool, identity, and human boundaries.
2. Place Bedrock Guardrails within layered input/output controls and evaluations.
3. Design AgentCore Identity and tool authorization with least privilege and attribution.
4. Classify agent actions by reversibility and require human approval where warranted.
5. Define evidence, evaluation, incident response, compliance, and unit cost.

## Prerequisites

- IAM federation, KMS, APIs, logging, and incident response
- Basic generative AI, RAG, and agent concepts
- Data governance and privacy fundamentals

## Workflow

1. Read [must-know.md](must-know.md) and restate each decision rule.
2. Complete [guided-lab.md](guided-lab.md).
3. Rebuild the analysis independently in [challenge-lab.md](challenge-lab.md).
4. Use [hands-on-exercise.md](hands-on-exercise.md) as an additional simulation workbook.
5. Defend [architecture-scenario.md](architecture-scenario.md) as if presenting to an architecture review board.
6. Check the observable gates in [validation.md](validation.md).
7. Complete the explicit no-cloud verification in [cleanup.md](cleanup.md).
8. Take [quiz.md](quiz.md) closed-book, then review [answers.md](answers.md).

## Evidence required

- A boundary diagram showing organization, trust, network, data, and failure boundaries
- The completed analysis artifact requested by the exercise
- An architecture decision record (ADR) with assumptions and rejected alternatives
- A failure or rollback analysis
- A cost and operational ownership statement
- A closed-book quiz score and corrected error-log entries

## Completion gate

You are complete only when you can defend the selected design, identify its residual risks, name its owner, and explain how the decision changes when one hard constraint changes.

## Official references

- [SAP-C02 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.html)
- [Bedrock Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html)
- [AgentCore Identity overview](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/identity-overview.html)
- [AgentCore Policy](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy.html)
- [Agentic AI Lens - human oversight](https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel02-bp05.html)
- [Agentic AI Lens - human in the loop](https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec04-bp02.html)
