# Architecture scenario: Govern a regulated acquisition without an outage

## Business context

A retailer acquires a payment company with 40 AWS accounts in a separate organization. The board wants consolidated governance in 90 days, but payment authorization cannot tolerate a policy-caused outage.

## Requirements

- Preserve 99.99% authorization availability.
- Keep cardholder workloads in approved EU Regions.
- Centralize security findings with local incident ownership.
- Reduce management-account use and preserve evidence for seven years.
- Onboard unknown accounts only after dependency discovery.

## Constraints

- Different identity providers and billing contracts remain for six months.
- Several legacy pipelines use undocumented APIs.
- The course exercise cannot create Organizations or Control Tower.

## Candidate approaches

### Approach A - immediate move

Move every account into one production OU and attach final restrictive SCPs on day one.

### Approach B - staged federation and quarantine

Establish read-only evidence sharing, inventory calls, move canary accounts into a transition OU, then progressively attach guardrails and delegate services.

### Approach C - permanent separate organizations

Keep all accounts separate forever and manually duplicate every control without an integration plan.

## Decision

Choose B. Treat account moves and inherited policies as production changes. Use a transition OU with minimal guardrails, verify dependencies and telemetry, then promote by workload wave. Preserve separate authority until contractual and technical gates pass.

## Tradeoff defense

- Slower consolidation reduces policy blast radius and preserves rollback.
- Temporary duplication costs more but maintains legal and identity boundaries.
- Transition OUs must not become permanent exception zones; attach exit dates and executive owners.

## Distractor analysis

For each rejected option, cite the exact hard requirement it violates or the needless fixed cost, coupling, or operator burden it adds. A familiar service is not automatically the right architecture.

## Architecture review board questions

1. How is an account recovered if its normal identity provider is unavailable?
2. Which APIs must the Region guardrail exempt, and how is that list tested?
3. Who can change root-level SCPs and how is that action detected?
4. What proves every account is producing immutable audit evidence?
5. What is the rollback point after an account move?

## Follow-up changes

- If legal separation is permanent, use two organizations with cross-organization evidence exchange and explicit trust.
- If all pipelines are fully inventoried, shorten but do not remove the canary window.
