# SAA-C03 Scorecard

Use this scorecard for original course sets and authorized practice only. Never copy proprietary question text; record the concept and decision rule.

## Exam baseline

- 65 total questions: 50 scored and 15 unscored.
- 130 minutes.
- Minimum scaled score: 720 on a 100-1,000 scale.
- No penalty for guessing; unanswered questions are incorrect.
- Official scored-content weights: Secure 30%, Resilient 26%, High-Performing 24%, Cost-Optimized 20%.

A raw practice percentage is not an AWS scaled score. The course thresholds below are conservative readiness evidence, not a prediction or guarantee.

## Competency gates

Mark a gate complete only with dated evidence.

| Gate | Objective evidence | Status |
| --- | --- | --- |
| Exam mechanics | State all baseline facts above from memory | |
| Secure | At least 75% on each of the last two fresh sets and explain IAM/resource policy, network, encryption, secret, and detective-control decisions | |
| Resilient | At least 75% on each of the last two fresh sets and defend scaling, decoupling, HA, backup, RTO, and RPO choices | |
| High-performing | At least 75% on each of the last two fresh sets and select storage, compute, database, network, and ingestion from quantified access patterns | |
| Cost-optimized | At least 75% on each of the last two fresh sets and compare total storage, compute, database, and network cost without violating requirements | |
| Overall fresh scores | At least 80% on two fresh 65-question timed sets, each completed in 130 minutes, at least 48 hours apart | |
| Confidence calibration | No more than 5% of a set is correct by unsupported guessing (`G`) | |
| Scenario reasoning | For 10 sampled answers, identify decisive requirement and reject one plausible alternative; at least 9 are sound | |
| Hands-on | Both associate capstones meet at least 80% of rubric points with no critical security, cleanup, or observability failure | |
| Cleanup | Evidence confirms expected baseline in every used Region and global services | |
| Error closure | No repeated open error and no high-frequency rule awaiting delayed transfer checks | |

## Fresh-set rules

A result counts as fresh only when:

1. The learner has not seen its questions, answer key, explanations, or close paraphrases.
2. It is taken closed-book, uninterrupted, and under the stated time limit.
3. It has not been attempted before.
4. Answers are not selected from memory of a discussion or leaked content.
5. Domain labels and answer explanations remain hidden until submission.
6. The source is original course content, official AWS practice, or another authorized source.

Retakes and near-duplicate sets are useful remediation but do not satisfy fresh-score gates. Start another fresh set only after current errors are classified and repaired.

## Attempt log

| Date | Set/source | Fresh? | Questions | Minutes | Overall | Secure | Resilient | High-performing | Cost | Guess rate | Gate result |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| | | | | | | | | | | | |

For mixed-domain questions, assign the primary tested decision once before calculating domain accuracy. Do not move missed questions between domains to improve results.

## Error taxonomy

| Code | Meaning | Closure evidence |
| --- | --- | --- |
| K | Knowledge gap | Correct rule stated from memory and verified in official docs |
| R | Requirement extraction | Hard constraint and qualifier correctly identified on two new items |
| D | Distractor discrimination | Precise rejection of two plausible alternatives |
| A | Architecture reasoning | Correct boundary diagram plus successful changed-requirement decision |
| T | Time management | Timed drill completed with no stall or blank |
| M | Multiple-response control | Correct selection count and independent option evaluation |
| C | Careless execution | Two delayed items correct using final qualifier check |
| G | Unsupported correct guess | Same concept solved and explained twice without choices |

Track every incorrect and low-confidence correct response:

| Date | Domain | Concept summary | Code | Missed requirement | Why choice failed | Decision rule | 24-72h | 7d | Closed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | | | |

## Capstone record

| Capstone | Score | Critical failures | Failure exercise passed | Cleanup verified | Defense passed |
| --- | ---: | --- | --- | --- | --- |
| Three-tier | | | | | |
| Event-driven orders | | | | | |

## Decision

- `READY`: every competency gate is complete.
- `NOT YET`: any gate is incomplete, stale, or unsupported.

Use [SAA readiness](saa-readiness.md) for the final review.

## Official references

- [SAA-C03 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html)
- [AWS Certified Solutions Architect - Associate](https://aws.amazon.com/certification/certified-solutions-architect-associate/)
