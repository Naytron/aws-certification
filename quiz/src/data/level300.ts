import type { QuizQuestion } from '../domain/quiz'

export const level300Questions: QuizQuestion[] = [
  {
    id: 'l300-001',
    level: 300,
    topic: 'Multi-account governance',
    type: 'single',
    prompt:
      'A developer role allows an API action, but an SCP attached to the account OU does not allow that action. No explicit deny applies. What is the result?',
    options: [
      { id: 'a', text: 'The action is allowed because the role policy grants it' },
      { id: 'b', text: 'The action is denied because the SCP sets a maximum permission boundary and does not grant access' },
      { id: 'c', text: 'The action is allowed after the account root user approves it' },
      { id: 'd', text: 'The action is allowed because only explicit denies in SCPs affect permissions' },
    ],
    correctOptionIds: ['b'],
    explanation:
      'Effective access requires both an applicable SCP allow and authorization from identity or resource policies. An SCP limits available permissions; it never grants the action by itself.',
    strongestDistractor:
      'Treating the absence of an explicit SCP deny as permission fails because the action still needs an applicable SCP allow as well as identity or resource authorization.',
    whenToUse:
      'Use SCPs for organization-wide maximum-permission guardrails, and use IAM or resource policies to grant required access.',
    featureSelection: true,
    reference: {
      label: 'Multi-account governance - SCP evaluation',
      path: 'modules/300-advanced-architecture/01-multi-account-governance/must-know.md',
    },
  },
  {
    id: 'l300-002',
    level: 300,
    topic: 'Multi-account governance',
    type: 'single',
    prompt:
      'A security team must administer organization-wide security services without making the management account a daily operations hub. Which design best fits?',
    options: [
      { id: 'a', text: 'Run all security tooling and analyst sessions in the management account' },
      { id: 'b', text: 'Create IAM users with administrator access in every workload account' },
      { id: 'c', text: 'Register a dedicated security account as delegated administrator and keep scoped response roles in member accounts' },
      { id: 'd', text: 'Place all workloads and security services in one account to simplify access' },
    ],
    correctOptionIds: ['c'],
    explanation:
      'Delegated administration moves routine service ownership to a dedicated security boundary while preserving workload-local containment paths. The management account remains restricted to organization-only duties.',
    strongestDistractor:
      'Running routine security operations in the management account expands its blast radius and violates the requirement to reserve it for organization-only duties.',
    whenToUse:
      'Use delegated administrator support when a central team owns a supported AWS service across many accounts; avoid routine operational workloads in the management account.',
    featureSelection: true,
    reference: {
      label: 'Multi-account governance - delegated administration',
      path: 'modules/300-advanced-architecture/01-multi-account-governance/must-know.md',
    },
  },
  {
    id: 'l300-003',
    level: 300,
    topic: 'Multi-account governance',
    type: 'multiple',
    prompt:
      'A company will roll out a restrictive Region SCP to production OUs. Which TWO actions most reduce rollout risk? Select TWO.',
    options: [
      { id: 'a', text: 'Inventory required APIs and global services before writing exemptions' },
      { id: 'b', text: 'Attach the policy at the organization root first to ensure consistency' },
      { id: 'c', text: 'Canary the policy on a representative OU with monitoring and a named rollback owner' },
      { id: 'd', text: 'Grant administrator access to every workload role before deployment' },
      { id: 'e', text: 'Disable detective controls until the rollout is complete' },
    ],
    correctOptionIds: ['a', 'c'],
    explanation:
      'A policy change is a deployment. An API and global-service inventory exposes required exceptions, while a monitored canary and explicit rollback authority limit the blast radius before expansion.',
    strongestDistractor:
      'Attaching the policy at the organization root first bypasses the required canary, observation, and rollback stages and exposes every account to an untested denial.',
    whenToUse:
      'Use staged SCP deployment for new preventive controls; avoid broad first deployment when service usage and exception needs are not proven.',
    featureSelection: true,
    reference: {
      label: 'Multi-account governance - guardrail rollout',
      path: 'modules/300-advanced-architecture/01-multi-account-governance/must-know.md',
    },
  },
  {
    id: 'l300-004',
    level: 300,
    topic: 'Federation and central security',
    type: 'single',
    prompt:
      'An enterprise wants employees to use its existing identity provider across hundreds of AWS accounts without per-account IAM users. Which approach is most appropriate?',
    options: [
      { id: 'a', text: 'IAM Identity Center integrated with the external identity provider and account permission sets' },
      { id: 'b', text: 'One shared IAM administrator user distributed through a password vault' },
      { id: 'c', text: 'Long-lived access keys generated in each account for every employee' },
      { id: 'd', text: 'A public resource policy that trusts any authenticated user' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'IAM Identity Center can map workforce identity from an external provider into temporary AWS sessions and consistently assign account access through permission sets.',
    strongestDistractor:
      'A shared administrator user preserves long-lived credentials, weakens individual attribution, and fails the requirement for centrally governed temporary workforce sessions.',
    whenToUse:
      'Use workforce federation for centrally managed human access at enterprise scale; avoid creating long-lived IAM identities in each account.',
    featureSelection: true,
    reference: {
      label: 'Federation and central security - workforce federation',
      path: 'modules/300-advanced-architecture/02-federation-central-security/must-know.md',
    },
  },
  {
    id: 'l300-005',
    level: 300,
    topic: 'Federation and central security',
    type: 'single',
    prompt:
      'A SaaS provider assumes a customer role to collect inventory. How should the customer most directly reduce confused-deputy risk?',
    options: [
      { id: 'a', text: 'Trust the provider account root with no conditions because the provider authenticates its users' },
      { id: 'b', text: 'Require a customer-specific external ID and exact provider principal in the role trust policy' },
      { id: 'c', text: 'Treat the external ID as a password and reuse it for every customer' },
      { id: 'd', text: 'Attach an SCP that grants the provider read permissions' },
    ],
    correctOptionIds: ['b'],
    explanation:
      'An exact principal constrains who can call the role, and a customer-specific external ID lets the provider prove which customer authorized the request. Caller and role permissions must still be scoped.',
    strongestDistractor:
      'Trusting the provider account without conditions does not bind role assumption to the intended customer, leaving the confused-deputy path the design must prevent.',
    whenToUse:
      'Use an external ID when a third party assumes roles on behalf of multiple customers; do not treat it as the sole credential or permission grant.',
    featureSelection: true,
    reference: {
      label: 'Federation and central security - third-party trust',
      path: 'modules/300-advanced-architecture/02-federation-central-security/must-know.md',
    },
  },
  {
    id: 'l300-006',
    level: 300,
    topic: 'Hybrid networking',
    type: 'multiple',
    prompt:
      'A Transit Gateway connects production, development, and inspection VPCs. Which TWO controls are required to prevent development from receiving direct routes to production? Select TWO.',
    options: [
      { id: 'a', text: 'Associate development attachments with a route table that lacks direct production routes' },
      { id: 'b', text: 'Propagate every attachment into every Transit Gateway route table' },
      { id: 'c', text: 'Control propagation and add blackhole routes where a more-specific block is required' },
      { id: 'd', text: 'Use one shared security group as the only segmentation control' },
      { id: 'e', text: 'Enable DNS hostnames on all connected VPCs' },
    ],
    correctOptionIds: ['a', 'c'],
    explanation:
      'An attachment uses its associated route table for ingress routing, while controlled propagation determines which destinations that table learns. Blackhole routes can enforce explicit route-level isolation.',
    strongestDistractor:
      'Using a security group alone does not stop Transit Gateway route propagation or remove reachability, so it fails the required route-level segmentation.',
    whenToUse:
      'Use multiple Transit Gateway route tables for routed segment isolation; avoid universal propagation when trust zones must remain separate.',
    featureSelection: true,
    reference: {
      label: 'Hybrid networking - Transit Gateway segmentation',
      path: 'modules/300-advanced-architecture/03-hybrid-networking/must-know.md',
    },
  },
  {
    id: 'l300-007',
    level: 300,
    topic: 'Hybrid networking',
    type: 'single',
    prompt:
      'Two business units use overlapping CIDRs. Consumers need private access to one provider API, but neither side should gain general network reachability. What should the architect select?',
    options: [
      { id: 'a', text: 'Transit Gateway with full route propagation between both VPCs' },
      { id: 'b', text: 'VPC peering with routes for both complete CIDR ranges' },
      { id: 'c', text: 'AWS PrivateLink endpoint service exposed through consumer interface endpoints' },
      { id: 'd', text: 'A larger shared VPC that preserves both overlapping address ranges' },
    ],
    correctOptionIds: ['c'],
    explanation:
      'PrivateLink exposes a specific service through endpoint interfaces without establishing broad routed adjacency, which also avoids the overlapping-CIDR routing problem.',
    strongestDistractor:
      'Full Transit Gateway route propagation creates broad network adjacency and cannot route overlapping CIDRs, violating both isolation and addressing requirements.',
    whenToUse:
      'Use PrivateLink for private service consumption across trust or address boundaries; use routed connectivity when consumers genuinely need network-wide reachability.',
    featureSelection: true,
    reference: {
      label: 'Hybrid networking - PrivateLink versus routing',
      path: 'modules/300-advanced-architecture/03-hybrid-networking/must-know.md',
    },
  },
  {
    id: 'l300-008',
    level: 300,
    topic: 'Hybrid networking',
    type: 'single',
    prompt:
      'A factory needs predictable private bandwidth to AWS and requires resilience from a provider or facility failure. Which connectivity design is strongest?',
    options: [
      { id: 'a', text: 'Two virtual interfaces on one Direct Connect physical connection' },
      { id: 'b', text: 'Redundant Direct Connect paths through independent devices and locations, with tested VPN backup where required' },
      { id: 'c', text: 'One Direct Connect connection with two BGP sessions on the same router' },
      { id: 'd', text: 'A single Site-to-Site VPN tunnel with static routing' },
    ],
    correctOptionIds: ['b'],
    explanation:
      'Resilience requires independent failure domains, not merely multiple logical sessions on one circuit or device. A tested VPN path can cover additional failure and provisioning scenarios.',
    strongestDistractor:
      'Two virtual interfaces on one physical Direct Connect connection share the same device and circuit failure domains, so they do not provide the required independent paths.',
    whenToUse:
      'Use Direct Connect for predictable private bandwidth, but design physical and operational diversity; use VPN alone when internet-based encrypted connectivity meets capacity and availability needs.',
    featureSelection: true,
    reference: {
      label: 'Hybrid networking - Direct Connect resilience',
      path: 'modules/300-advanced-architecture/03-hybrid-networking/must-know.md',
    },
  },
  {
    id: 'l300-009',
    level: 300,
    topic: 'Hybrid networking',
    type: 'single',
    prompt:
      'A regulated workload sends sensitive traffic over Direct Connect. The compliance team requires encryption in transit. What should the architect conclude?',
    options: [
      { id: 'a', text: 'Direct Connect encrypts every virtual interface by default' },
      { id: 'b', text: 'Private addressing alone satisfies encryption requirements' },
      { id: 'c', text: 'Add MACsec where supported or an appropriate IPsec pattern because Direct Connect is not encrypted by default' },
      { id: 'd', text: 'BGP route authentication encrypts application payloads' },
    ],
    correctOptionIds: ['c'],
    explanation:
      'Direct Connect supplies private connectivity but does not inherently encrypt payloads. MACsec availability and IPsec design depend on the connection type, path, and required encryption boundary.',
    strongestDistractor:
      'Assuming Direct Connect encrypts traffic by default mistakes private transport for encrypted transport and leaves the explicit confidentiality requirement unmet.',
    whenToUse:
      'Use an explicit encryption layer whenever policy requires confidentiality over Direct Connect; do not equate a private circuit with encrypted transport.',
    featureSelection: true,
    reference: {
      label: 'Hybrid networking - Direct Connect encryption',
      path: 'modules/300-advanced-architecture/03-hybrid-networking/must-know.md',
    },
  },
  {
    id: 'l300-010',
    level: 300,
    topic: 'Hybrid networking',
    type: 'multiple',
    prompt:
      'Applications in VPCs must resolve on-premises corp.example names, and on-premises clients must resolve AWS private zones. Which TWO components support this design? Select TWO.',
    options: [
      { id: 'a', text: 'Route 53 Resolver outbound endpoints and forwarding rules for corp.example' },
      { id: 'b', text: 'Route 53 Resolver inbound endpoints for queries entering the VPC resolver' },
      { id: 'c', text: 'Mutual forwarding of every namespace in both directions' },
      { id: 'd', text: 'A public hosted zone containing private service addresses' },
      { id: 'e', text: 'Transit Gateway route propagation without any DNS resolver endpoints' },
    ],
    correctOptionIds: ['a', 'b'],
    explanation:
      'Outbound endpoints forward selected VPC-originated namespaces to on-premises DNS, while inbound endpoints accept on-premises queries for names authoritative in AWS. Explicit namespace authority avoids loops.',
    strongestDistractor:
      'Forwarding every namespace in both directions creates ambiguous DNS authority and forwarding loops, violating the requirement for explicit per-namespace ownership.',
    whenToUse:
      'Use Route 53 Resolver endpoints and rules for governed hybrid DNS; avoid bidirectional forwarding of the same namespace.',
    featureSelection: true,
    reference: {
      label: 'Hybrid networking - hybrid DNS',
      path: 'modules/300-advanced-architecture/03-hybrid-networking/must-know.md',
    },
  },
  {
    id: 'l300-011',
    level: 300,
    topic: 'Multi-Region disaster recovery',
    type: 'single',
    prompt:
      'A reporting system can lose up to 24 hours of data and may remain unavailable for two days. Which DR pattern is the most economical starting point?',
    options: [
      { id: 'a', text: 'Active-active compute and synchronous multi-writer data in two Regions' },
      { id: 'b', text: 'Warm standby sized for immediate production traffic' },
      { id: 'c', text: 'Verified backup and restore into an independent recovery boundary' },
      { id: 'd', text: 'Pilot light with continuously running application servers' },
    ],
    correctOptionIds: ['c'],
    explanation:
      'A long RTO and RPO permit reconstruction from protected backups. Paying for continuously running duplicate capacity would not be justified unless another requirement demands it.',
    strongestDistractor:
      'Pilot light keeps additional recovery components running and operated even though the two-day RTO permits a lower-cost verified restore, adding unjustified standing burden.',
    whenToUse:
      'Use backup and restore for tolerant recovery objectives and low change rates; choose pilot light, warm standby, or active-active as RTO and RPO tighten.',
    featureSelection: true,
    reference: {
      label: 'Multi-Region DR - pattern selection by RTO and RPO',
      path: 'modules/300-advanced-architecture/04-multi-region-dr/must-know.md',
    },
  },
  {
    id: 'l300-012',
    level: 300,
    topic: 'Multi-Region disaster recovery',
    type: 'single',
    prompt:
      'An order service requires recovery within minutes, has predictable demand, and accepts a small nonzero RPO. Which DR strategy best aligns with those objectives?',
    options: [
      { id: 'a', text: 'Backup and restore with infrastructure created after declaration' },
      { id: 'b', text: 'Warm standby with tested scaling and asynchronous replication' },
      { id: 'c', text: 'Active-active multi-writer operation with no conflict design' },
      { id: 'd', text: 'Pilot light with a manual, undocumented application rebuild' },
    ],
    correctOptionIds: ['b'],
    explanation:
      'Warm standby keeps a functioning reduced-capacity environment that can scale within a minutes-level RTO. Asynchronous replication is consistent with a declared nonzero RPO when lag is monitored and tested.',
    strongestDistractor:
      'Active-active without conflict semantics introduces concurrent-write and reconciliation risk while exceeding the stated minutes-level RTO and nonzero-RPO requirement.',
    whenToUse:
      'Use warm standby for minutes-level recovery with understood demand; avoid active-active unless near-zero objectives justify conflict and operating complexity.',
    featureSelection: true,
    reference: {
      label: 'Multi-Region DR - warm standby',
      path: 'modules/300-advanced-architecture/04-multi-region-dr/must-know.md',
    },
  },
  {
    id: 'l300-013',
    level: 300,
    topic: 'Multi-Region disaster recovery',
    type: 'single',
    prompt:
      'During regional failover, what must happen before a secondary database accepts writes to avoid split brain?',
    options: [
      { id: 'a', text: 'Lower the DNS TTL and immediately enable both writers' },
      { id: 'b', text: 'Fence the former writer and establish a single declared write authority before promotion' },
      { id: 'c', text: 'Increase replica lag so changes cannot conflict' },
      { id: 'd', text: 'Delete the old Region before validating the recovery Region' },
    ],
    correctOptionIds: ['b'],
    explanation:
      'Failover changes data authority. The old writer must be isolated through fencing, leases, or another proven mechanism before the secondary is promoted, followed by reconciliation and controlled failback.',
    strongestDistractor:
      'Lowering DNS TTL redirects clients but does not fence the former writer, so it cannot satisfy the single-authority requirement or prevent split brain.',
    whenToUse:
      'Use explicit writer fencing for single-writer multi-Region systems; use multi-writer only with defined conflict ownership and reconciliation semantics.',
    featureSelection: false,
    reference: {
      label: 'Multi-Region DR - data authority',
      path: 'modules/300-advanced-architecture/04-multi-region-dr/must-know.md',
    },
  },
  {
    id: 'l300-014',
    level: 300,
    topic: 'Observability and incident response',
    type: 'multiple',
    prompt:
      'A workload account may be fully compromised. Which THREE design choices best preserve investigation evidence? Select THREE.',
    options: [
      { id: 'a', text: 'Deliver organization audit logs to a separate log archive account' },
      { id: 'b', text: 'Separate log deletion, KMS administration, and query access duties' },
      { id: 'c', text: 'Apply protected retention controls that workload administrators cannot change' },
      { id: 'd', text: 'Let each workload administrator overwrite centralized logs to correct errors' },
      { id: 'e', text: 'Store the only audit copy on instances in the workload account' },
    ],
    correctOptionIds: ['a', 'b', 'c'],
    explanation:
      'Independent custody, separated key and access duties, and protected retention keep evidence available when a workload principal is hostile. Evidence controlled by that same principal is not a durable audit record.',
    strongestDistractor:
      'Allowing workload administrators to overwrite central logs gives a potentially compromised principal control of evidence, violating independent custody and retention requirements.',
    whenToUse:
      'Use a separated log archive for centralized evidence custody across accounts; retain local operational context without giving workloads control of the authoritative copy.',
    featureSelection: true,
    reference: {
      label: 'Observability and incident response - centralized evidence custody',
      path: 'modules/300-advanced-architecture/05-observability-incident-response/must-know.md',
    },
  },
  {
    id: 'l300-015',
    level: 300,
    topic: 'Observability and incident response',
    type: 'single',
    prompt:
      'A team wants automation to isolate instances when a well-understood malware signal fires. Which implementation is safest?',
    options: [
      { id: 'a', text: 'A universal administrator function triggered by any security alarm' },
      { id: 'b', text: 'A bounded, idempotent runbook with evidence capture, stop conditions, rollback, and manual override' },
      { id: 'c', text: 'Immediate account deletion without preserving telemetry' },
      { id: 'd', text: 'No automation under any circumstances, even for a tested reversible action' },
    ],
    correctOptionIds: ['b'],
    explanation:
      'Known reversible responses can be pre-authorized when scope and stop conditions are explicit. Idempotency, evidence, rollback, and override prevent repeated or incorrect signals from expanding impact.',
    strongestDistractor:
      'Rejecting all automation adds avoidable containment delay even for a tested reversible action and ignores the requirement for bounded, pre-authorized response.',
    whenToUse:
      'Use response automation for tested, reversible, narrowly scoped actions; retain human incident command for unknown or high-impact conditions.',
    featureSelection: true,
    reference: {
      label: 'Observability and incident response - safe automation',
      path: 'modules/300-advanced-architecture/05-observability-incident-response/must-know.md',
    },
  },
  {
    id: 'l300-016',
    level: 300,
    topic: 'Data platforms and streaming',
    type: 'single',
    prompt:
      'A company needs open historical storage queried by several analytics engines, with lifecycle control and cross-account governance. Which foundation is the best fit?',
    options: [
      { id: 'a', text: 'An S3 data lake using columnar formats, a catalog, and governed access controls' },
      { id: 'b', text: 'One production relational database shared by every analytics workload' },
      { id: 'c', text: 'Uncompressed JSON copied into a separate bucket for each query' },
      { id: 'd', text: 'A continuously provisioned Kafka cluster used as permanent historical storage' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'S3 provides open durable storage, while columnar layout, cataloging, lifecycle, and governed access support multiple engines. Storage alone is not governance, so ownership, quality, lineage, and policy remain required.',
    strongestDistractor:
      'Sharing the production relational database with every analytics workload couples operational and analytical demand and fails the multi-engine historical-access requirement.',
    whenToUse:
      'Use a data lake for multi-engine historical data and decoupled storage; use a warehouse when governed SQL concurrency and workload economics dominate.',
    featureSelection: true,
    reference: {
      label: 'Data platforms - lake and governance selection',
      path: 'modules/300-advanced-architecture/06-data-platforms/must-know.md',
    },
  },
  {
    id: 'l300-017',
    level: 300,
    topic: 'Data platforms and streaming',
    type: 'single',
    prompt:
      'A small team needs managed event ingestion and replay but has no Kafka compatibility requirement. Which choice should be preferred?',
    options: [
      { id: 'a', text: 'Amazon MSK because Kafka is always the lowest-operating-cost option' },
      { id: 'b', text: 'Kinesis Data Streams when its partitioning, retention, and delivery semantics meet the workload' },
      { id: 'c', text: 'A fleet of self-managed Kafka brokers in one Availability Zone' },
      { id: 'd', text: 'Amazon S3 event notifications as a total replacement for an ordered stream' },
    ],
    correctOptionIds: ['b'],
    explanation:
      'Kinesis Data Streams is a managed ingestion choice when its semantics fit. MSK is justified by Kafka ecosystem, protocol, or portability requirements that outweigh its fixed and operational costs.',
    strongestDistractor:
      'Choosing MSK without a Kafka compatibility requirement adds persistent capacity and operational burden that the small team and managed-ingestion requirement do not justify.',
    whenToUse:
      'Use Kinesis for managed AWS-native streaming requirements; choose MSK when Kafka compatibility is a documented constraint rather than a default preference.',
    featureSelection: true,
    reference: {
      label: 'Data platforms - Kinesis versus MSK',
      path: 'modules/300-advanced-architecture/06-data-platforms/must-know.md',
    },
  },
  {
    id: 'l300-018',
    level: 300,
    topic: 'Migration and modernization',
    type: 'multiple',
    prompt:
      'A data center closes in six months. A critical legacy application is poorly documented and a supported SaaS product could replace it later. Which TWO portfolio decisions best control near-term risk? Select TWO.',
    options: [
      { id: 'a', text: 'Rehost or replatform the application first if that meets the exit deadline with limited change' },
      { id: 'b', text: 'Refactor the entire application during the exit regardless of dependency uncertainty' },
      { id: 'c', text: 'Evaluate repurchase as a separate business and process migration after stabilization' },
      { id: 'd', text: 'Retire the application immediately without owner or retention evidence' },
      { id: 'e', text: 'Retain it in the closing data center with no funded exception' },
    ],
    correctOptionIds: ['a', 'c'],
    explanation:
      'The 7Rs can differ by phase. A low-change rehost or replatform can meet the fixed exit, while repurchase can proceed later with its own process, data, contract, and adoption plan.',
    strongestDistractor:
      'A full refactor during the fixed six-month exit combines migration and architectural change, violating the low-change deadline and making rollback materially harder.',
    whenToUse:
      'Use phased 7R decisions when deadline and modernization risk conflict; avoid combining infrastructure exit and major rewrite without a justified rollback strategy.',
    featureSelection: true,
    reference: {
      label: 'Migration and modernization - 7R selection',
      path: 'modules/300-advanced-architecture/07-migration-modernization/must-know.md',
    },
  },
  {
    id: 'l300-019',
    level: 300,
    topic: 'Migration and modernization',
    type: 'single',
    prompt:
      'A portfolio inventory contains servers but misses runtime dependencies and business owners. What should determine production migration waves?',
    options: [
      { id: 'a', text: 'Alphabetical server names so every wave is easy to audit' },
      { id: 'b', text: 'Dependency closure, business calendar, risk, and operational readiness' },
      { id: 'c', text: 'Organization chart reporting lines regardless of application calls' },
      { id: 'd', text: 'Instance size, with the largest hosts moved first' },
    ],
    correctOptionIds: ['b'],
    explanation:
      'Waves must keep coupled components and migration-time dependencies coherent while respecting business windows and support capability. Inventory without observed dependencies and accountable owners is not actionable.',
    strongestDistractor:
      'Waving by organization chart ignores runtime dependency closure, so coupled systems can be separated despite the requirement for technically coherent cutovers.',
    whenToUse:
      'Use dependency-based waves for portfolio migration; split tightly coupled systems only after tested decoupling changes the dependency graph.',
    featureSelection: false,
    reference: {
      label: 'Migration and modernization - dependency waves',
      path: 'modules/300-advanced-architecture/07-migration-modernization/must-know.md',
    },
  },
  {
    id: 'l300-020',
    level: 300,
    topic: 'Migration and modernization',
    type: 'single',
    prompt:
      'A database migration has a strict downtime window and a high update rate. Which approach best supports a controlled cutover?',
    options: [
      { id: 'a', text: 'One untested bulk export started when the outage window begins' },
      { id: 'b', text: 'CDC with lag monitoring, rehearsed validation, a final authority switch, and rollback triggers' },
      { id: 'c', text: 'Permanent bidirectional replication with no conflict ownership' },
      { id: 'd', text: 'A DNS update without data reconciliation' },
    ],
    correctOptionIds: ['b'],
    explanation:
      'Change data capture can reduce downtime, but cutover still needs compatibility checks, monitored lag, reconciliation, a declared final writer, decision deadlines, and a rehearsed rollback.',
    strongestDistractor:
      'Permanent bidirectional replication adds conflict and dual-write risk without declaring final authority, violating the requirement for a controlled migration cutover.',
    whenToUse:
      'Use CDC for low-downtime database moves when ordering, schema, validation, and authority risks are controlled; use bulk transfer when the outage window permits simpler execution.',
    featureSelection: true,
    reference: {
      label: 'Migration and modernization - CDC cutover',
      path: 'modules/300-advanced-architecture/07-migration-modernization/must-know.md',
    },
  },
  {
    id: 'l300-021',
    level: 300,
    topic: 'FinOps and quotas',
    type: 'single',
    prompt:
      'A product is entering a volatile market while its architecture may change within nine months. How should compute commitment purchasing be handled?',
    options: [
      { id: 'a', text: 'Commit to the forecast peak for the longest available term' },
      { id: 'b', text: 'Buy inflexible reservations for all current instances before rightsizing' },
      { id: 'c', text: 'Keep uncertain demand flexible and commit only a defensible stable baseline after downside analysis' },
      { id: 'd', text: 'Assume On-Demand usage has no need for budgets or anomaly detection' },
    ],
    correctOptionIds: ['c'],
    explanation:
      'Commitments exchange flexibility for rate reduction. A stable normalized baseline may justify commitment, but speculative growth and near-term architecture change increase utilization and lock-in risk.',
    strongestDistractor:
      'Committing to forecast peak converts uncertain growth into long-term utilization risk and ignores the requirement to commit only a defensible stable baseline.',
    whenToUse:
      'Use Savings Plans or reservations for durable baseline usage after coverage, utilization, and change-risk analysis; retain flexibility for uncertain or spiky demand.',
    featureSelection: true,
    reference: {
      label: 'FinOps and quotas - commitments under uncertainty',
      path: 'modules/300-advanced-architecture/08-finops-quotas/must-know.md',
    },
  },
  {
    id: 'l300-022',
    level: 300,
    topic: 'FinOps and quotas',
    type: 'single',
    prompt:
      'Infrastructure templates for the DR Region pass validation, but no recovery capacity test has run. What should the architect do before claiming the RTO is achievable?',
    options: [
      { id: 'a', text: 'Assume templates reserve the required regional capacity' },
      { id: 'b', text: 'Maintain a quota register, request headroom early, and test growth and failover capacity' },
      { id: 'c', text: 'Rely on the primary Region quota because quotas are globally pooled' },
      { id: 'd', text: 'Reduce observability retention to create compute quota' },
    ],
    correctOptionIds: ['b'],
    explanation:
      'Templates describe desired resources but do not guarantee service quota or physical capacity. Recovery planning must account for regional limits, request lead time, alarms, and event-time demand.',
    strongestDistractor:
      'Valid templates express desired infrastructure but reserve neither regional quota nor physical capacity, so they cannot prove the required recovery RTO.',
    whenToUse:
      'Use Service Quotas and capacity testing as DR dependencies; pre-provision critical capacity when provisioning delay or scarcity threatens the RTO.',
    featureSelection: true,
    reference: {
      label: 'FinOps and quotas - recovery capacity',
      path: 'modules/300-advanced-architecture/08-finops-quotas/must-know.md',
    },
  },
  {
    id: 'l300-023',
    level: 300,
    topic: 'Responsible AI controls',
    type: 'multiple',
    prompt:
      'An AI assistant can draft refunds but must not issue unauthorized payments. Which THREE controls are required for a defensible design? Select THREE.',
    options: [
      { id: 'a', text: 'Bedrock Guardrails for configured content and sensitive-information safeguards' },
      { id: 'b', text: 'Deterministic tool authorization that checks caller, tenant, action, and amount' },
      { id: 'c', text: 'Authenticated human approval for high-impact refunds with the exact action and expiry shown' },
      { id: 'd', text: 'A prompt telling the model to approve only legitimate refunds' },
      { id: 'e', text: 'One broad payment role shared by every agent and tenant' },
    ],
    correctOptionIds: ['a', 'b', 'c'],
    explanation:
      'Guardrails address model input and output safety, not payment authorization. Deterministic policy enforces tool boundaries, and meaningful human approval governs high-impact actions without allowing the model to approve itself.',
    strongestDistractor:
      'A prompt asking the model to behave is probabilistic and supplies no enforceable payment authorization, violating the deterministic tool-boundary requirement.',
    whenToUse:
      'Use Guardrails as one safety layer, deterministic authorization at every tool boundary, and human approval for irreversible, financial, destructive, or privilege-changing actions.',
    featureSelection: true,
    reference: {
      label: 'Responsible AI controls - Guardrails and authorization',
      path: 'modules/300-advanced-architecture/09-responsible-ai-controls/must-know.md',
    },
  },
  {
    id: 'l300-024',
    level: 300,
    topic: 'Responsible AI controls',
    type: 'single',
    prompt:
      'A multi-tenant agent calls customer-specific APIs. Which credential design best limits cross-tenant impact?',
    options: [
      { id: 'a', text: 'Embed one administrator API key in the agent system prompt' },
      { id: 'b', text: 'Issue short-lived credentials scoped to the exact audience, tenant, tool, and action with attributable delegation' },
      { id: 'c', text: 'Let retrieved documents provide credentials and choose authorization scope' },
      { id: 'd', text: 'Reuse the human developer session for all production agent calls' },
    ],
    correctOptionIds: ['b'],
    explanation:
      'A distinct workload identity with short duration and exact tenant, audience, tool, and action scope limits credential replay and cross-tenant blast radius while preserving attribution.',
    strongestDistractor:
      'Reusing a developer session mixes human and workload identity and lacks exact tenant, audience, tool, action, duration, and delegation attribution controls.',
    whenToUse:
      'Use scoped workload identity and delegated credentials for agent tool calls; avoid shared embedded secrets and broad roles spanning tools or tenants.',
    featureSelection: true,
    reference: {
      label: 'Responsible AI controls - agent identity',
      path: 'modules/300-advanced-architecture/09-responsible-ai-controls/must-know.md',
    },
  },
  {
    id: 'l300-025',
    level: 300,
    topic: 'Responsible AI controls',
    type: 'single',
    prompt:
      'A retrieved document instructs an agent to ignore policy and export a customer record. What is the strongest architectural response?',
    options: [
      { id: 'a', text: 'Trust the document because retrieval restricted it to an internal index' },
      { id: 'b', text: 'Add a stronger system prompt and let the model decide whether export is authorized' },
      { id: 'c', text: 'Treat retrieved text as untrusted, enforce authorized retrieval and deterministic export policy, and evaluate injection behavior' },
      { id: 'd', text: 'Disable all logging so the malicious instruction is not retained' },
    ],
    correctOptionIds: ['c'],
    explanation:
      'Indirect prompt injection can arrive through trusted-looking retrieval. Retrieved content must not set policy or tool scope; authorization remains deterministic and independent of model instructions.',
    strongestDistractor:
      'A stronger prompt still lets probabilistic model behavior decide authorization, violating the requirement that untrusted retrieval cannot set export policy or tool scope.',
    whenToUse:
      'Use trust classification, metadata-filtered retrieval, output controls, and deterministic policy for sensitive RAG systems; never use prompt instructions as the authorization boundary.',
    featureSelection: true,
    reference: {
      label: 'Responsible AI controls - indirect prompt injection',
      path: 'modules/300-advanced-architecture/09-responsible-ai-controls/must-know.md',
    },
  },
]
