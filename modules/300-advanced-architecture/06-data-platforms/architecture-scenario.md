# Architecture scenario: Modernize a fragmented regulated analytics estate

## Business context

Ten business units copy customer data into separate warehouses and spreadsheets. Definitions conflict, access reviews are manual, and a privacy deletion can take 90 days.

## Requirements

- Provide governed cross-domain analytics.
- Keep domain accountability for meaning and quality.
- Complete normal erasure in 30 days with legal-hold exceptions.
- Reduce scanned bytes and duplicate storage by 50%.
- Support replay and auditable financial restatement.

## Constraints

- Two domains cannot share row-level personal data.
- Some consumers support only daily batch.
- A central platform team has six engineers.

## Candidate approaches

### Approach A - centralize all ownership

Move every source and semantic definition to the six-person platform team.

### Approach B - governed data products

Domains own versioned products and quality; a central platform supplies catalog, policy, lineage, interoperability, and cost guardrails.

### Approach C - keep copies

Retain independent warehouses and add a spreadsheet inventory.

## Decision

Choose B. Federate semantic ownership while centralizing enforceable platform controls and evidence. Publish purpose-limited products, tokenized joins, compatibility contracts, and deletion lineage.

## Tradeoff defense

- Federation reduces the central bottleneck but requires enforceable interoperability standards.
- Curated duplication can improve performance; it must have owner, lineage, retention, and unit cost.
- Batch consumers can coexist with streams if facts and correction semantics remain consistent.

## Distractor analysis

For each rejected option, cite the exact hard requirement it violates or the needless fixed cost, coupling, or operator burden it adds. A familiar service is not automatically the right architecture.

## Architecture review board questions

1. Who is accountable when a metric definition changes?
2. How is a deletion proven across derived copies and exports?
3. Can replay alter a closed financial period?
4. Which workload controls prevent one analyst from exhausting shared capacity?
5. How is a poisoned or breaking event isolated?

## Follow-up changes

- If all data is non-personal and low sensitivity, simplify fine-grained controls but retain ownership and quality.
- If sub-second operational response is required, add a purpose-built serving store rather than querying the lake directly.
