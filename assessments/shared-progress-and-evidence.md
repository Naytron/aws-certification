# Shared progress and evidence guidance

Use this guidance for every module, challenge, scenario, and capstone. Progress
means that a result is repeatable and explainable, not that a file was opened.

## Progress states

| State | Meaning |
| --- | --- |
| Not started | No attempt has been made. |
| In progress | Work has started, but required validation or explanation is incomplete. |
| Evidence complete | Required evidence exists and contains no sensitive values. |
| Verified | The learner repeated the result, met the rubric gate, and completed cleanup. |
| Needs revisit | Recall, implementation, troubleshooting, or explanation is below the gate. |

Use [the progress scorecard](../templates/progress-scorecard.md) at the end of
each learning unit. Mark a unit `Verified` only when every gate condition is
true.

## Minimum evidence

Complete [the lab evidence template](../templates/lab-evidence-template.md) and
include:

1. The module, lab, date, and Region.
2. An architecture diagram showing trust, network, failure, and data-flow
   boundaries.
3. A non-sensitive resource inventory with purpose, cost label, and removal
   state.
4. Commands or observations that prove function, security, failure behavior,
   logs or metrics, and required tags.
5. One controlled failure with symptom, evidence, root cause, fix, and
   prevention.
6. One architecture decision and one plausible alternative rejected against a
   stated requirement.
7. Cleanup confirmation from exact service checks and the read-only cleanup
   helper.
8. Five facts recalled without notes and one question to revisit.

Screenshots alone are weak evidence. Pair them with the requirement being
proved and a short explanation of the observed value.

## Sensitive-data rule

Never record passwords, access keys, session tokens, account numbers, complete
principal ARNs, full resource ARNs, private endpoints, customer data, or secret
values. Redact identifiers while preserving the service type, Region, status,
and relevant configuration. AWS account IDs are not authentication secrets,
but they are excluded from course evidence to reduce unnecessary exposure.

Store evidence only in the learner's approved location. Do not commit local
AWS configuration or credential files.

## Validation and cleanup rule

Run `scripts\Invoke-CoursePreflight.ps1` before cloud work. Confirm the account,
principal, and Region on screen, but do not copy those identifiers into
evidence.

After the lab:

1. Follow the lab's dependency-safe cleanup steps for exact named resources.
2. Run `scripts\Test-CourseCleanup.ps1` with the same Region and Module tag. The
   default `Course` tag is `aws-solutions-architect`; override `-CourseTag` only
   when the deployed resources intentionally use a different value.
3. Check the relevant service consoles and billing or usage views because tag
   inventory is not exhaustive.
4. Record a redacted result and any unexpected resource.

An expiration tag is a review reminder, not an automatic deletion mechanism.
Never claim cleanup is complete while the helper reports matching resources.

## Review cadence

- After each lab: score the unit and update the error log.
- Weekly: revisit every score below 2 and repeat one challenge without notes.
- At a phase gate: sample evidence from multiple modules and require a fresh
  explanation or implementation.
- Before an exam: use the assessment scorecards as well as this evidence. A
  high completion percentage by itself is not an exam-readiness signal.
