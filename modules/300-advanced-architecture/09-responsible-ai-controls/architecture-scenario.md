# Architecture scenario: Approve an agent that can change production

## Business context

An operations team proposes an AI agent that diagnoses incidents and can modify scaling, security groups, and database settings. Leadership wants faster recovery without increasing catastrophic automation risk.

## Requirements

- Read-only diagnosis may proceed automatically.
- Any privilege, network exposure, destructive, or data-integrity change requires deterministic authorization and usually approval.
- Target RTO is 30 minutes.
- Every recommendation, approval, credential, and tool result must be attributable.
- The system must fail safely when model, identity, or approval services are unavailable.

## Constraints

- Model output is probabilistic.
- Incidents can impair the normal identity provider.
- Emergency changes need post-event review.

## Candidate approaches

### Approach A - broad autonomous administrator

Give the agent AdministratorAccess and rely on its system prompt to be careful.

### Approach B - tiered agency

Separate diagnosis from execution; expose allow-listed typed tools; enforce deterministic policy and scoped identity; require authenticated approval for high impact; log and test every transition.

### Approach C - no AI use

Ban model-assisted diagnosis, including read-only evidence summarization.

## Decision

Choose B. The model proposes; deterministic systems authorize; scoped tools execute; humans approve high-impact decisions. Pre-authorize only bounded, reversible remediations whose worst case is understood and tested.

## Tradeoff defense

- Approval latency consumes RTO, so route by risk, pre-stage responders, and use safe timeouts rather than removing controls.
- Typed tools constrain action space but require engineering and versioned schemas.
- Read-only assistance retains value even when write authority is unavailable.

## Distractor analysis

For each rejected option, cite the exact hard requirement it violates or the needless fixed cost, coupling, or operator burden it adds. A familiar service is not automatically the right architecture.

## Architecture review board questions

1. Can untrusted retrieved text influence tool parameters or approval routing?
2. Who issues the agent credential, for which audience, tenant, action, and duration?
3. What proves the human saw the final exact action, not an earlier draft?
4. Which failures are fail-closed and which enter degraded read-only mode?
5. How are false refusal, harmful completion, and unauthorized-action rates measured?

## Follow-up changes

- If all actions are read-only and data is public, simplify approval but retain injection and cost controls.
- If the action is safety-critical or irreversible, require dual control or prohibit agent execution entirely.
