# Remediation Guidance

## Error taxonomy

Use exactly one primary code and optional secondary codes:

- `K` - knowledge gap: service capability or limit unknown.
- `R` - requirement extraction: missed a hard constraint or qualifier.
- `D` - distractor discrimination: knew facts but chose a plausible mismatch.
- `A` - architecture reasoning: misunderstood interaction or failure boundary.
- `T` - time management: rushed, stalled, or left blank.
- `M` - multiple-response control: wrong count or incomplete combination.
- `C` - careless execution: misread negative wording or changed without evidence.
- `G` - guessed correctly: correct result without defensible reasoning.

## Repair loop

1. Summarize the scenario in one original sentence.
2. Identify the decisive requirement.
3. Write the missing decision rule.
4. Verify it in official AWS documentation.
5. Explain why the selected distractor fails.
6. Create a different scenario that uses the same rule.
7. Re-answer after 24-72 hours, then again after 7 days.

Close an error only after both delayed attempts are correct and the explanation names a rejected alternative.

## Remediation by code

| Code | Action |
| --- | --- |
| K | Build a five-row comparison table and perform service decision drills |
| R | Rewrite requirements as protocol, scale, RTO/RPO, security, operations, cost |
| D | Produce two rejection sentences for near-neighbor services |
| A | Draw request, data, trust, and failure boundaries; inject one fault |
| T | Practice ten questions with a 90-second first-pass cap |
| M | Restate required selection count and test each option independently |
| C | Add a final qualifier check before submission |
| G | Treat as wrong until explained closed-book |

## Escalation

- Three open errors on one competency: revisit its prerequisite module and repeat a related challenge lab.
- Domain below 75% on a fresh set: pause full simulations and remediate that domain.
- Same rule missed twice: perform a hands-on or design-only experiment, not more passive reading.
- Capstone defense failure: revise the architecture decision record and repeat validation.

## Return-to-test gate

Resume fresh timed sets only when all high-frequency errors have a decision rule, a delayed correct transfer item, and no open safety or foundational gaps.
