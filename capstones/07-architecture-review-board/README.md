# Capstone 07: Final Professional Architecture Review Board

## Profile

| Field | Value |
| --- | --- |
| Level | 400 |
| Cost label | `DESIGN-ONLY` |
| Deployment | None |
| SAP-C02 emphasis | All four domains |
| Time box | 18-24 hours plus a 60-minute board |

This capstone is the final integration gate. It evaluates decision quality,
traceability, lifecycle design, evidence, and defense under challenge. It does
not reward the largest service list.

## Scenario

Atlas Health is acquiring a European provider while replacing two expiring data
centers. It operates patient scheduling, clinical documents, billing, analytics,
contact-center, and partner integration systems. The current estate has 210
applications, mixed identities, overlapping networks, manual deployments,
inconsistent recovery, and weak cost allocation.

The target must support US and EU business units, private partner integration,
regional continuity for patient scheduling, a governed migration, and product
team autonomy. The board includes a CIO, CISO, finance lead, operations lead,
data protection officer, network lead, application owner, and migration lead.

## Requirements

### Business and organization

- Complete data center exit within 20 months.
- Vend a governed product account in four business hours.
- Preserve product autonomy inside centrally enforced control boundaries.
- Integrate the acquisition without an enterprise-wide cutover.
- Assign owners for service, risk, cost, data, recovery, and exceptions.

### Security and compliance

- Keep regulated EU personal data in approved EU Regions.
- Use workforce federation with MFA, lifecycle, time-bound elevation, and tested
  break glass.
- Use temporary workload credentials and least-privilege cross-account access.
- Encrypt sensitive data in transit and at rest with explicit key ownership.
- Retain immutable audit evidence for seven years under separate custody.
- Define preventive, detective, responsive, and recovery controls and exception
  expiry.

### Reliability and performance

- Patient scheduling: RTO 20 minutes, RPO 2 minutes, no duplicate appointments.
- Clinical document retrieval: RTO 4 hours, RPO 24 hours.
- Billing: RTO 8 hours, RPO 1 hour.
- Scheduling API p99 below 300 ms at 5x current peak.
- Operate through an AZ failure automatically and a Region failure by approved
  recovery action.
- Prove quotas, standby capacity, data authority, failback, and dependency
  recovery.

### Network and identity

- Use resilient hybrid connectivity without single circuit/location/device
  failure on Tier 1 paths.
- Keep production, non-production, sandbox, shared, and acquisition routing
  domains deterministic.
- Preserve symmetric inspection and safe hybrid DNS.
- Isolate overlapping acquisition CIDRs during a six-month renumber program.
- Continue controlled privileged access during a four-hour IdP outage.

### Migration and modernization

- Use validated dependencies and 7R decisions.
- Establish foundation controls before production waves.
- Rehearse Tier 1 cutover, rollback, reconciliation, and business validation.
- Do not make the exit depend on refactoring every workload.
- Modernize selected systems where measurable value exceeds transition risk.
- Decommission sources only after stabilization and audit evidence.

### Operations and cost

- Use versioned IaC, progressive delivery, compatible data changes, monitoring,
  runbooks, and named incident authority.
- Improve cost per completed appointment by 20% after stabilization.
- Include transfer, logs, security, support, licensing, parallel run, training,
  and labor in TCO.
- Buy commitments only against a stable minimum baseline.

## Constraints

- The learner uses a Free-plan account; enterprise services remain design-only.
- The scheduling database cannot safely accept unconstrained multi-Region
  writers.
- One clinical system uses an unsupported database extension.
- Two partner links cannot change protocol for 12 months.
- The operations team supports ECS but has limited EKS experience.
- The acquisition IdP cannot federate for 90 days.
- A restricted-Region exception expires in six months.
- The board funds only one major application refactor before data center exit.

## Prior capstone inputs

Bring forward and reconcile, rather than blindly concatenate:

- [multi-Region DR](../03-multi-region-dr/README.md);
- [landing-zone simulation](../04-landing-zone/README.md);
- [hybrid network and identity](../05-hybrid-network/README.md);
- [migration portfolio](../06-migration-portfolio/README.md).

Resolve conflicts in assumptions, ownership, RTO/RPO, account/Region naming,
cost, and migration order.

## Required deliverables

### 1. Board paper

Maximum 12 pages excluding appendices:

1. decision requested and business outcomes;
2. requirements, assumptions, and explicit non-goals;
3. current-state risks and target-state summary;
4. organization, account, identity, and control model;
5. network, DNS, hybrid, and security architecture;
6. workload, data, performance, and recovery architecture;
7. migration waves, modernization choice, and rollback;
8. operating model, SLOs, incidents, change, and evidence;
9. three-year TCO, unit economics, and sensitivities;
10. top risks, residual risk, decisions, and next gates.

### 2. Architecture pack

- Context, container/service, trust, network, data, and failure-domain diagrams.
- Normal, degraded, recovery, rollback, and failback state diagrams.
- OU/account, identity, effective-permission, control, logging, and RACI models.
- Traffic, route, DNS, encryption, data classification, and dependency matrices.
- Capacity, quota, latency, availability, RTO/RPO, and cost calculations.

### 3. Decision records

At least eight ADRs:

1. account/OU model;
2. workforce and workload identity;
3. transit/inspection and overlap;
4. hybrid DNS;
5. scheduling data authority and DR strategy;
6. target compute/data platform;
7. migration/modernization sequence;
8. evidence custody and operating model.

Each ADR states status, context, hard drivers, decision, alternatives, explicit
rejections, consequences, owner, and review trigger.

### 4. Risk register

At least 15 risks across security, reliability, performance, operations, cost,
organization, network/identity, and migration. Include likelihood, impact,
trigger, preventive/detective/recovery control, mitigation, contingency, owner,
due date, and residual risk. The board must accept or assign every high residual
risk.

### 5. Migration and rollback pack

- Representative portfolio and 7R rationale.
- Dependency-led waves with entry/exit, cutover, validation, rollback,
  stabilization, and decommission.
- One major refactor selection with value/risk comparison.
- Scheduling cutover and writer-fencing plan.
- Target-side-write reconciliation and no-return point.
- Regulatory, license, partner, and acquisition transition handling.

### 6. RTO/RPO evidence pack

For each tier define:

- customer-path failure and restoration event;
- acknowledged source record checkpoint;
- recovered target checkpoint;
- replication/backup mechanism and corruption boundary;
- dependency recovery sequence;
- capacity and quota verification;
- measured exercise timeline and exception;
- failback/reconciliation result;
- residual risk and owner.

Replication status alone is not recovery evidence.

### 7. Presentation

Prepare:

- 10-minute executive opening;
- 15-minute architecture walkthrough;
- 10-minute migration, operations, and cost case;
- 20-minute challenge period;
- 5-minute decision and actions close.

## Board process

### Pre-read gate

Distribute sanitized artifacts at least 48 hours before the mock board. Reviewers
mark:

- `Block`: violates a hard requirement or has unowned critical risk.
- `Condition`: acceptable only after named evidence/remediation.
- `Question`: requires clarification.
- `Suggestion`: non-blocking improvement.

### Meeting roles

- Chair controls scope, time, decision, and actions.
- Presenter owns the recommendation and acknowledges uncertainty.
- Scribe records decisions, conditions, owners, and dates.
- Reviewers challenge from their assigned stakeholder lens.

### Decision states

- `Approved`
- `Approved with conditions`
- `Return for rework`
- `Rejected`

No approval is valid if a hard requirement lacks traceable evidence or owner.

## Validation and review criteria

### Completeness

- Every requirement maps to architecture, evidence, owner, and validation.
- Every critical dependency appears in normal and recovery paths.
- Assumptions and non-goals are explicit and testable.
- Links and terms are internally consistent across the pack.

### Technical integrity

- Effective permissions, SCP behavior, route paths, DNS authority, encryption,
  data authority, replication, quotas, and service boundaries are correct.
- Scheduling prevents duplicate appointments across retry and failover.
- RTO/RPO includes complete dependency restoration and measured business data.
- Performance claims have a representative load model and bottleneck evidence.

### Lifecycle and operations

- Deployment, cutover, recovery, rollback, failback, and decommission are
  executable and owned.
- Monitoring uses actionable SLO/customer signals with response authority.
- Automation has stop conditions and does not amplify high-blast-radius failure.
- Break glass, incident response, and recovery are tested.

### Business and cost

- The design distinguishes mandatory resilience/security cost from optional
  optimization.
- TCO and cost per appointment include shared and transition costs.
- Migration order delivers value within 20 months and handles constraints.
- Commitments are tied to a stable measured baseline.

### Decision quality

- ADRs reject plausible alternatives against exact requirements.
- Risks expose residual uncertainty rather than declaring it eliminated.
- The presenter can change the design coherently when one requirement changes.
- Answers are concise, evidence-based, and acknowledge tradeoffs.

## Evidence

Retain:

- versioned, sanitized pre-read and diagrams;
- requirement traceability and reviewer comments;
- synthetic policy, route, DNS, load, failure, recovery, and migration results;
- calculated RTO/RPO and unit-cost sheets;
- ADR/risk approvals;
- board decision, conditions, action owners, dates, and closure evidence.

Do not retain account IDs, full ARNs, credentials, real identities, patient
data, internal hostnames/CIDRs, private endpoints, contracts, or secret values.

## Rubric

Score each 0-5.

| Criterion | Weight |
| --- | ---: |
| Requirement traceability and executive framing | 10 |
| Organization, governance, identity, and security | 15 |
| Network, DNS, hybrid resilience, and inspection | 10 |
| Workload/data design, performance, and correctness | 15 |
| RTO/RPO, recovery, failback, and evidence | 15 |
| Migration waves, rollback, modernization, and exit | 15 |
| Operations, observability, change, and ownership | 10 |
| TCO, unit economics, quotas, and commitments | 5 |
| ADRs, risks, presentation, and challenge defense | 5 |

Weighted score is `sum(score / 5 * weight)`.

Pass requires:

- total score >=80;
- no score below 3/5 in security, network, workload/data, RTO/RPO, migration, or
  operations;
- zero unresolved `Block` findings;
- every approval condition has owner and due date;
- no safety violation or deployment in the Free-plan account.

## Required challenge questions

### Organization and security

1. Why are the proposed account and OU boundaries durable through reorganization?
2. Show an effective allow and deny across identity policy, resource policy,
   boundary, session policy, and SCP.
3. Who can alter evidence, investigate, deploy, and authorize recovery?
4. How does acquisition identity work during the first 90 days and then retire?
5. How does the restricted-Region exception expire safely?

### Network and identity

6. Trace a production packet and return path through hybrid inspection.
7. What happens when a Direct Connect location and an IdP fail together?
8. How are DNS loops, route leaks, overlap, and asymmetric flows prevented?
9. Where is traffic encrypted, and who owns certificates/keys?

### Workload and recovery

10. Why is scheduling not uncontrolled active-active?
11. What fences the former writer, prevents duplicate appointments, and proves
    two-minute RPO?
12. How do identity, DNS, artifacts, secrets, keys, and partners recover?
13. What happens if replication carries logical corruption?
14. How does failback preserve recovery-Region writes?

### Migration, operations, and cost

15. Which application receives the one pre-exit refactor, and why?
16. What exact condition triggers migration rollback after target writes?
17. When can a source be decommissioned?
18. Which alarm is actionable by whom, and what prevents automated harm?
19. What cost grows under the worst case, and what decision changes?
20. Which stable baseline justifies a commitment?

### Requirement-change drills

The board chooses two:

- RTO changes from 20 minutes to 2 minutes.
- EU data cannot leave one named Region.
- The IdP outage target increases from 4 to 24 hours.
- Budget is cut 25% without changing mandatory controls.
- Data center exit moves forward six months.
- Scheduling becomes safe for conflict-free multi-writer data.

The presenter gets two minutes to describe architecture, cost, migration, and
risk changes.

## Cleanup

This capstone is strictly design-only. It creates no AWS resources. Remove local
scratch material containing sensitive or unapproved details and retain only the
sanitized evidence pack and board record.

If an instructor uses an external paid sandbox to demonstrate a component, that
component remains governed by its own named-resource cleanup and account reset.
The board capstone itself never authorizes Organizations, Control Tower, Direct
Connect, Transit Gateway, migration fleets, or multi-Region data services in the
course Free-plan account. Never use destructive wildcard commands.

## Completion record

- Board decision:
- Weighted score:
- Block findings:
- Conditions, owner, and due date:
- High residual risks accepted by:
- Evidence location:
- Reviewer names/roles:
- Date:
- Re-review date:

Apply the result to
[SAP readiness](../../assessments/sap-readiness.md) and
[the SAP scorecard](../../assessments/sap-scorecard.md).

## Official references

- [SAP-C02 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.html)
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
- [AWS Security Reference Architecture](https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/welcome.html)
- [Designing a Control Tower landing zone](https://docs.aws.amazon.com/prescriptive-guidance/latest/designing-control-tower-landing-zone/introduction.html)
- [AWS VPC connectivity options](https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/welcome.html)
- [AWS migration process](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-migration/overview.html)
