# AWS Solutions Architect: Hands-On Certification Path

This course takes you from new-to-AWS fundamentals through:

1. AWS Certified Solutions Architect - Associate (SAA-C03)
2. Advanced, level 400 architecture practice
3. AWS Certified Solutions Architect - Professional (SAP-C02)

The course is built around doing the work, not watching long lectures. Expect roughly:

- 70% labs, build/break/fix exercises, and capstones
- 20% architecture scenarios and exam decision practice
- 10% concise must-know facts and retrieval quizzes

AWS recommends at least one year of hands-on design experience for SAA and two or more years for SAP. This course builds structured practice and measurable readiness, but it does not claim that a lab curriculum replaces production experience.

## Start here

1. Read [the course map](course-map.md).
2. Take the [baseline diagnostic](assessments/baseline-diagnostic.md).
3. Create and secure the learning account using [account/free-plan-signup.md](account/free-plan-signup.md).
4. Complete every item in [account/security-baseline.md](account/security-baseline.md).
5. Configure [budgets and alerts](account/budgets-and-alerts.md).
6. Use the [study method](reference/study-method.md) and complete modules in course-map order.
7. Record evidence using [the lab evidence template](templates/lab-evidence-template.md).

Do not deploy a lab before reading its cost label and cleanup section.

## Recommended study cycle

For an 8-10 hour study week, use one repeatable cycle:

| Activity | Typical time | Purpose |
| --- | ---: | --- |
| Recall and preview | 30 minutes | Retrieve prior facts before reading new material |
| Must-know facts | 60 minutes | Learn only the facts needed to make architecture decisions |
| Guided lab | 2.5-3 hours | Build the supported path and inspect what AWS creates |
| Challenge lab | 2 hours | Rebuild or extend the solution without click-by-click help |
| Architecture scenario | 60 minutes | Compare plausible solutions and reject distractors |
| Validation and cleanup | 30-60 minutes | Prove the result, remove resources, and record evidence |
| Quiz and error log | 30-60 minutes | Measure retention and classify mistakes |

Stop at a phase gate until you can perform the work and explain the tradeoffs. Completing files is not the same as mastering them.

Use the [diagram standard](reference/diagram-standard.md) and [architecture review checklist](reference/architecture-review-checklist.md) for challenge labs and capstones.

## Cost labels

Every deployable lab uses one of these labels:

| Label | Meaning |
| --- | --- |
| `FREE-PLAN SAFE` | Designed for the current AWS Free account plan when limits are followed |
| `USES CREDITS` | Can consume promotional credits; inspect and remove resources promptly |
| `OPTIONAL PAID/SANDBOX` | Do not run in the Free-plan account unless you intentionally accept billing |
| `DESIGN-ONLY` | No cloud deployment; use diagrams, policies, templates, or calculations |

The current AWS Free plan can automatically upgrade to a Paid plan if you enable AWS Organizations or Control Tower. The course never asks you to do that without an explicit warning.

## Learning method

Each module contains:

- `README.md`: outcomes, prerequisites, and exam mapping
- `must-know.md`: concise facts, limits, decision tables, and traps
- `guided-lab.md`: a supported implementation
- `challenge-lab.md`: the same skill with reduced guidance
- `architecture-scenario.md`: requirement and tradeoff analysis
- `validation.md`: observable completion criteria
- `cleanup.md`: exact teardown checks
- `quiz.md` and `answers.md`: retrieval practice

Console-first introductions are repeated with AWS CLI, CloudShell, or CloudFormation where practical. CloudFormation is the primary infrastructure-as-code tool because it is AWS-native and directly relevant to both exams.

## Readiness rules

Do not schedule an exam because you reached the end of a folder. Use the scorecards in `assessments/`.

SAA readiness requires:

- Multiple fresh practice sets above the documented threshold
- No persistently weak SAA domain
- Successful challenge labs without step-by-step instructions
- Clear explanations of why distractors fail a stated requirement

SAP readiness additionally requires:

- Strong performance on long, ambiguous professional scenarios
- Defensible organization, network, migration, security, resilience, and cost decisions
- Completed level 400 capstones and architecture defenses
- Appropriate real-world AWS design and implementation experience

## Official sources

- [AWS Free Tier plans](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html)
- [AWS Certified Solutions Architect - Associate exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html)
- [AWS Certified Solutions Architect - Professional exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.html)
- [AWS Certification preparation](https://aws.amazon.com/certification/certification-prep/)
- [AWS Skill Builder](https://skillbuilder.aws/)
