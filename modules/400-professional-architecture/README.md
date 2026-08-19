# SAP-C02 Professional Architecture Integration

This module integrates the four SAP-C02 domains through requirement parsing,
cross-domain decisions, long scenarios, and architecture defense. It is original
course content. It does not reproduce AWS or third-party exam questions.

## Level and exam mapping

- Level: 400
- Exam: AWS Certified Solutions Architect - Professional (SAP-C02)
- Cost label: `DESIGN-ONLY`
- Prerequisite: complete the level 300-400 enterprise architecture track and its
  final gate

| Domain | Weight | Guide |
| --- | ---: | --- |
| Design Solutions for Organizational Complexity | 26% | [Domain 1](domain-1-organizational-complexity.md) |
| Design for New Solutions | 29% | [Domain 2](domain-2-new-solutions.md) |
| Continuous Improvement for Existing Solutions | 25% | [Domain 3](domain-3-continuous-improvement.md) |
| Accelerate Workload Migration and Modernization | 20% | [Domain 4](domain-4-migration-modernization.md) |

## Exam facts

The current official exam guide describes 65 scored questions and 10 unscored
questions, for 75 total. Unscored questions are not identified. The appointment
is 180 minutes. Results use a 100-1,000 scaled score, and the minimum passing
score is 750. Unanswered questions are incorrect, and the official guide
explicitly confirms there is no penalty for guessing.

Read [exam format and strategy](exam-format-strategy.md) before timed work.

## Outcomes

After this module, you can:

1. Convert a long narrative into hard requirements, priorities, assumptions,
   risks, and measurable acceptance tests.
2. Select an architecture that balances security, reliability, performance,
   operations, cost, organization, and migration rather than optimizing one
   dimension in isolation.
3. Reject plausible distractors against an exact requirement.
4. Produce ADRs, risk registers, migration waves, rollback gates, RTO/RPO
   evidence, and a concise executive defense.
5. Work through professional scenarios at a sustainable exam pace.

## Workflow

1. Read [requirements and time management](requirements-and-time-management.md).
2. Review the four domain guides and state each decision rule without notes.
3. Complete each [original case study](case-studies/README.md) before opening its
   analysis.
4. Record misses and uncertain answers with
   [the error-log template](../../templates/error-log-template.md).
5. Complete professional capstones 03-07 in order.
6. Apply the objective gates in
   [SAP readiness](../../assessments/sap-readiness.md) and
   [SAP scorecard](../../assessments/sap-scorecard.md).

## Safety and cost posture

All work in this module is `DESIGN-ONLY`. The learner uses an AWS Free-plan
account. Do not join AWS Organizations or enable AWS Control Tower: either action
automatically upgrades that account to a Paid plan. Direct Connect, Transit
Gateway, Network Firewall, persistent multi-Region databases, migration fleet
tools, and other expensive enterprise services are also design-only here.

An optional deployment is allowed only when its capstone labels it
`OPTIONAL PAID/SANDBOX`, the learner has a separately governed sandbox, a budget
owner has accepted the cost, and the learner follows named-resource cleanup.

## Completion gate

The module is complete only when:

- all four fresh case-study attempts score at least 80%, with no domain below
  70%;
- every answer includes the governing requirement and one explicit rejection;
- all five professional capstones meet their rubric gates;
- RTO/RPO, risk, rollback, operations, and cost evidence is internally
  consistent;
- the final board defense survives the required challenge questions; and
- the SAP readiness assessment says `Ready`, including its experience caveat.

## Official references

- [SAP-C02 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.html)
- [AWS Certified Solutions Architect - Professional](https://aws.amazon.com/certification/certified-solutions-architect-professional/)
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
- [AWS Free Tier plans](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html)
