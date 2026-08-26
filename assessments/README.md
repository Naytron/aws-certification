# Assessments

Assessments measure decision quality, not file completion.

## Interactive quiz

Use the **[AWS Architecture Quiz](https://naytron.github.io/aws-certification/)**
for Level 100-400 practice or a mixed 100-question attempt. It supports optional
timing, single-choice and multiple-response questions, flags, local resume,
post-submit explanations, history, and JSON export.

Quiz data remains in the learner's browser. Because the application is static,
answers can be inspected in downloaded JavaScript; treat scores as self-assessment
evidence rather than a proctored or authoritative certification result.

## Rules

- Take quizzes and scenario sets closed-book first.
- Mark uncertain correct answers as uncertain; lucky guesses are not mastery.
- Keep an error log using `templates/error-log-template.md`.
- Never copy proprietary practice-exam questions into the repository.
- Reattempt concepts with a new scenario, not immediate memorization of the old answer.
- Track SAA and SAP domains separately.

## Error taxonomy

| Type | Meaning | Remedy |
| --- | --- | --- |
| Knowledge | You did not know a service fact or boundary | Review official docs and create a decision rule |
| Requirement | You missed a hard requirement | Highlight verbs, constraints, and priorities |
| Distractor | A plausible option added cost or violated one detail | State the exact rejection reason |
| Scope | You chose a service that cannot meet scale, Region, protocol, or consistency needs | Compare service boundaries |
| Operations | You ignored support burden, deployment, recovery, or observability | Add lifecycle and runbook analysis |
| Time | You understood the problem but spent too long | Practice requirement extraction and elimination |

## Fresh-set rule

A score is useful only when:

- You have not memorized the questions.
- You complete the set under exam-like constraints.
- You review uncertain answers as well as misses.
- You can explain why every rejected option is wrong.
