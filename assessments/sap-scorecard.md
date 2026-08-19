# SAP-C02 Objective Scorecard

Use this scorecard for fresh, closed-book work. Do not copy proprietary
questions into the repository. Summarize concepts in your own words.

## Exam baseline

SAP-C02 has 75 total questions: 65 scored and 10 unscored, which are not
identified. The appointment is 180 minutes. The minimum passing scaled score is
750 on a 100-1,000 scale. Unanswered questions are incorrect, and the official
exam guide confirms there is no penalty for guessing.

## Practice-set record

Record at least four fresh full-length or equivalently balanced sets completed
under a 180-minute total constraint. If using smaller original sets, preserve
the official domain weighting and combine them before counting one result.

| Date | Source/set ID | Overall | D1 26% | D2 29% | D3 25% | D4 20% | Minutes | Blank | Uncertain |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| | | | | | | | | | |
| | | | | | | | | | |
| | | | | | | | | | |
| | | | | | | | | | |

Do not count a repeated or memorized set as fresh. Mark a correct answer
uncertain if its rationale was guessed.

## Objective gates

Every gate must be true.

| Gate | Pass condition | Evidence | Pass |
| --- | --- | --- | --- |
| Fresh scores | At least 4 qualifying sets; most recent 3 are >=80% | Table above | [ ] |
| Domain floor | No domain below 75% on either of the latest 2 sets | Domain results | [ ] |
| Confidence | >=75% of correct responses are confident and explained | Confidence log | [ ] |
| Timing | Two sets completed in <=170 minutes with 0 blank answers | Timed record | [ ] |
| Requirement parsing | >=90% of reviewed items identify the governing hard constraint | Review sample of 30 | [ ] |
| Distractor rejection | For the same sample, reject each plausible alternative against an exact requirement | Review notes | [ ] |
| Original cases | All four professional case-study sets score >=80% | Case rubrics | [ ] |
| Capstones | Capstones 03-07 each meet their rubric gate | Board records | [ ] |
| Recovery | RTO/RPO evidence includes measured start/end, data checkpoint, failback, and residual risk | Capstone 03 | [ ] |
| Governance | OU/account, identity, logging, controls, exception, and cost models are defensible | Capstone 04 | [ ] |
| Hybrid | Routing, DNS, identity, encryption, failure, and overlap decisions are defensible | Capstone 05 | [ ] |
| Migration | Portfolio, 7Rs, waves, cutover, rollback, validation, and decommission are complete | Capstone 06 | [ ] |
| Board defense | Overall >=80, no critical criterion below 3/5, no unresolved hard-requirement failure | Capstone 07 | [ ] |
| Error closure | Every high-frequency error class has a fresh successful reattempt | Error log | [ ] |
| Experience | Experience review below is complete and honestly supports readiness | Experience record | [ ] |

## Weighted domain calculation

For a balanced practice result:

```text
weighted score =
  (D1 percent * 0.26) +
  (D2 percent * 0.29) +
  (D3 percent * 0.25) +
  (D4 percent * 0.20)
```

This is a learning metric, not a prediction or conversion to AWS scaled scoring.

## Error trend

| Error class | Last 3 sets | Fresh reattempt result | Closed |
| --- | ---: | --- | --- |
| Knowledge | | | [ ] |
| Requirement | | | [ ] |
| Distractor | | | [ ] |
| Scope/service boundary | | | [ ] |
| Operations/lifecycle | | | [ ] |
| Time | | | [ ] |

An error is closed only when the learner can state the rule, apply it to a
different scenario, and reject a plausible alternative.

## Experience record

AWS describes the target candidate as having two or more years of experience
using AWS services to design and implement cloud solutions, including guidance
across multiple applications and projects in a complex organization.

| Area | Production example and role | Recency | Independent reviewer |
| --- | --- | --- | --- |
| Multi-account governance and identity | | | |
| Hybrid or complex networking | | | |
| Security and audit design | | | |
| Reliability and tested recovery | | | |
| Performance and cost optimization | | | |
| Migration or modernization | | | |
| Incident/change operations | | | |

Course labs and design simulations build skill but do not replace production
experience. If the experience evidence is thin, continue supervised real-world
practice even when practice scores are high.

## Decision

- [ ] `Ready`: every gate is true, evidence is current, and experience is
  appropriate.
- [ ] `Nearly ready`: technical gates are close; list exact remediation and
  recheck date.
- [ ] `Not ready`: one or more hard gates or the experience expectation is not
  met.

Reviewer:

Date:

Next action:

## Official references

- [SAP-C02 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.html)
- [Official SAP certification page](https://aws.amazon.com/certification/certified-solutions-architect-professional/)
