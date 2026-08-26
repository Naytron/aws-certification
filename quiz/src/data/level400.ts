import type { QuizQuestion } from '../domain/quiz'

export const level400Questions: QuizQuestion[] = [
  {
    id: 'l400-001',
    level: 400,
    topic: 'Organizational governance',
    type: 'single',
    prompt:
      'A group is consolidating 140 accounts while preserving product autonomy. Production, sandbox, acquisitions, suspended accounts, and six-month Region exceptions need different controls. Reorganizations are frequent. Which structure best satisfies the hard governance requirements with the lowest long-term policy risk?',
    options: [
      {
        id: 'a',
        text: 'Create OUs by policy intent and lifecycle, delegate supported administration, and use a governed exceptions OU with owners, compensating controls, and expiry.',
      },
      {
        id: 'b',
        text: 'Mirror the current reporting hierarchy as OUs and move accounts whenever business leaders reorganize.',
      },
      {
        id: 'c',
        text: 'Place every workload in one OU and use resource tags as the only isolation and exception mechanism.',
      },
      {
        id: 'd',
        text: 'Host shared production services in the Organizations management account to simplify organization-wide access.',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Policy-intent OUs preserve durable inheritance through reorganizations, isolate lifecycle states, and make exceptions reviewable. Delegated administration also limits routine management-account use while product teams retain permissions inside centrally constrained boundaries.',
    strongestDistractor:
      'Mirroring the reporting hierarchy is attractive for ownership visibility, but frequent reorganizations would repeatedly change inherited controls and create avoidable policy drift.',
    whenToUse:
      'Use OUs for shared policy intent and account lifecycle; keep changing ownership metadata in tags and inventory rather than encoding the org chart in the control hierarchy.',
    featureSelection: true,
    reference: {
      label: 'Domain 1 - Organizational Complexity',
      path: 'modules/400-professional-architecture/domain-1-organizational-complexity.md',
    },
  },
  {
    id: 'l400-002',
    level: 400,
    topic: 'Effective permissions',
    type: 'single',
    prompt:
      'A platform team attaches an SCP that allows read access to approved S3 buckets, but a newly federated analyst still receives AccessDenied. The analyst must receive only the required read access without weakening organization guardrails. What should the architect change?',
    options: [
      {
        id: 'a',
        text: 'Add the required S3 allow to the analyst permission set and verify that no SCP, boundary, session policy, bucket policy, or explicit deny blocks it.',
      },
      {
        id: 'b',
        text: 'Replace the allow-list SCP with FullAWSAccess because an SCP must grant the analyst permission.',
      },
      {
        id: 'c',
        text: 'Add the analyst directly to the bucket ACL and remove federation from the access path.',
      },
      {
        id: 'd',
        text: 'Create a long-lived IAM user in each account so organization policy evaluation is bypassed.',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'An SCP defines the maximum available permission and does not grant an action. The principal still needs an applicable identity or resource allow, and that allow must survive every permissions boundary, session policy, SCP, and explicit deny.',
    strongestDistractor:
      'Replacing the SCP with FullAWSAccess does not grant the analyst access; it only stops that SCP from restricting permissions and needlessly removes a governance boundary.',
    whenToUse:
      'Use SCPs to prevent member-account actions at organization scope; use permission sets, roles, and resource policies to grant least-privilege access.',
    featureSelection: true,
    reference: {
      label: 'Landing-Zone Capstone',
      path: 'capstones/04-landing-zone/README.md',
    },
  },
  {
    id: 'l400-003',
    level: 400,
    topic: 'Evidence custody',
    type: 'single',
    prompt:
      'Regulators require seven years of immutable audit evidence. Security investigators need query access, application operators must not alter evidence, and a compromise of the security tooling account must not permit log deletion. Which operating model best meets these requirements?',
    options: [
      {
        id: 'a',
        text: 'Deliver organization audit data to a separately administered log archive with retention controls; give investigators read access and keep retention administration separate from workload and security tooling roles.',
      },
      {
        id: 'b',
        text: 'Store logs in each workload account and grant its administrators full access so incidents can be resolved quickly.',
      },
      {
        id: 'c',
        text: 'Centralize logs in the security tooling account and grant the incident-response administrator permission to change retention and delete objects.',
      },
      {
        id: 'd',
        text: 'Export monthly log summaries to an operations wiki and delete detailed records after ninety days.',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Separate archive custody protects integrity from both workload subjects and investigation tooling. Retention controls, limited write paths, monitored read access, and distinct administrative roles create defensible evidence without preventing analysis.',
    strongestDistractor:
      'Centralizing logs in the security tooling account improves visibility, but allowing the same incident-response administrator to delete evidence violates the required custody separation.',
    whenToUse:
      'Use a separately controlled archive when evidence must survive compromise or investigation of workload and security administration; separate custody, investigation, and response authority.',
    featureSelection: true,
    reference: {
      label: 'Final Architecture Review Board',
      path: 'capstones/07-architecture-review-board/README.md',
    },
  },
  {
    id: 'l400-004',
    level: 400,
    topic: 'Hybrid network resilience',
    type: 'multiple',
    prompt:
      'A Tier 1 hybrid service must survive a circuit, location, or edge-device failure. Sensitive traffic requires encryption, and stateful inspection must remain symmetric during convergence. Which TWO design actions address the hard requirements?',
    options: [
      {
        id: 'a',
        text: 'Terminate diverse Direct Connect paths at separate locations and devices, with independently tested Site-to-Site VPN backup where its capacity is sufficient.',
      },
      {
        id: 'b',
        text: 'Define BGP preference and prefix filters plus matched forward and return routing through the same inspection path in normal and degraded states.',
      },
      {
        id: 'c',
        text: 'Increase the bandwidth of the existing circuit while retaining its current location and edge device.',
      },
      {
        id: 'd',
        text: 'Treat Direct Connect as encrypted by default and omit an overlay encryption mechanism.',
      },
      {
        id: 'e',
        text: 'Allow every learned on-premises prefix to propagate so the network can choose any available transit path.',
      },
    ],
    correctOptionIds: ['a', 'b'],
    explanation:
      'Physical and logical diversity removes correlated path failures, while explicit BGP policy and symmetric route design preserve deterministic inspection during convergence. Encryption must be supplied by an appropriate mechanism rather than inferred from dedicated connectivity.',
    strongestDistractor:
      'A larger existing circuit may improve throughput, but it preserves the same location and device failure domains and therefore cannot meet the resilience requirement.',
    whenToUse:
      'Use diverse Direct Connect paths for predictable high-volume hybrid traffic, add tested VPN diversity where it meets recovery capacity, and model both directions through stateful controls.',
    featureSelection: true,
    reference: {
      label: 'Hybrid Network and Identity Capstone',
      path: 'capstones/05-hybrid-network/README.md',
    },
  },
  {
    id: 'l400-005',
    level: 400,
    topic: 'Overlapping networks',
    type: 'single',
    prompt:
      'An acquisition uses an overlapping CIDR and cannot renumber for six months. It needs private consumer access to one internal HTTPS service, but must not gain broad transitive reachability into production. Which interim design has the smallest routing and security consequence?',
    options: [
      {
        id: 'a',
        text: 'Publish the specific service through PrivateLink, constrain endpoint access, and keep the acquisition routing domain isolated while renumbering proceeds.',
      },
      {
        id: 'b',
        text: 'Attach both networks to the same Transit Gateway route table and rely on longest-prefix routing to resolve identical CIDRs.',
      },
      {
        id: 'c',
        text: 'Create VPC peering and use a production VPC as transit to all other VPCs.',
      },
      {
        id: 'd',
        text: 'Publish the service private address in public DNS and rely on security groups to resolve the overlap.',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'PrivateLink exposes a specific supported service through consumer-initiated endpoints without requiring broad routability between overlapping networks. Isolation remains explicit, and renumbering can retire the temporary publication later.',
    strongestDistractor:
      'Attaching both networks to one Transit Gateway route table does not disambiguate identical destination prefixes and creates unintended reachability rather than solving overlap.',
    whenToUse:
      'Use PrivateLink for narrowly scoped private service consumption when broad routing is unnecessary or CIDRs overlap; avoid it when the required protocol or bidirectional network access is unsupported.',
    featureSelection: true,
    reference: {
      label: 'Domain 1 - Organizational Complexity',
      path: 'modules/400-professional-architecture/domain-1-organizational-complexity.md',
    },
  },
  {
    id: 'l400-006',
    level: 400,
    topic: 'Hybrid identity',
    type: 'single',
    prompt:
      'Workforce access is federated through a corporate IdP, but incident responders must retain controlled privileged access during a four-hour IdP outage. The design must avoid permanent broad privilege. What should be implemented?',
    options: [
      {
        id: 'a',
        text: 'Maintain separately secured break-glass identities with narrowly defined emergency roles, strong authentication, monitoring, periodic tests, and mandatory post-use review.',
      },
      {
        id: 'b',
        text: 'Give all administrators persistent AdministratorAccess permission sets so their sessions are likely to remain active.',
      },
      {
        id: 'c',
        text: 'Create shared root credentials in a team password manager and use them for every outage.',
      },
      {
        id: 'd',
        text: 'Depend exclusively on the IdP because adding an alternate access path always weakens security.',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'A tested emergency path addresses identity-provider failure without normalizing standing privilege. Independent custody, scoped roles, strong authentication, alerts, expiry, and review make its use attributable and exceptional.',
    strongestDistractor:
      'Persistent AdministratorAccess permission sets may appear operationally simple, but they create standing broad privilege and do not ensure access after federation or existing sessions fail.',
    whenToUse:
      'Use break glass only for defined identity or control-plane emergencies, keep it independent enough to survive the failure, and test and audit it as a recovery mechanism.',
    featureSelection: true,
    reference: {
      label: 'Hybrid Network and Identity Capstone',
      path: 'capstones/05-hybrid-network/README.md',
    },
  },
  {
    id: 'l400-007',
    level: 400,
    topic: 'Multi-Region continuity',
    type: 'single',
    prompt:
      'An ordering API requires regional recovery within 20 minutes and at most two minutes of acknowledged-write loss. Its relational store cannot safely accept unconstrained multi-Region writers, and cost is minimized only after correctness and recovery targets. Which strategy is most defensible?',
    options: [
      {
        id: 'a',
        text: 'Use warm standby with continuous replication, explicit single-writer authority, writer fencing, pre-provisioned recovery dependencies, and tested scale-up and traffic shift.',
      },
      {
        id: 'b',
        text: 'Use nightly backup and restore because it has the lowest steady-state infrastructure cost.',
      },
      {
        id: 'c',
        text: 'Use full active-active writes with last-writer-wins conflict resolution for all order records.',
      },
      {
        id: 'd',
        text: 'Add another Availability Zone in the current Region and treat the regional requirement as satisfied.',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Warm standby can preposition the complete recovery path for the numeric objectives while retaining singular data authority. Fencing, idempotency, capacity tests, independent artifacts and roles, and reconciliation address correctness and operational recovery consequences.',
    strongestDistractor:
      'Nightly backup and restore is cheaper at steady state, but it can lose nearly a day of writes and restore plus validation is not credible within twenty minutes.',
    whenToUse:
      'Use warm standby when RTO and RPO require prepositioned regional capacity but the data model or cost does not justify safe full multi-site operation.',
    featureSelection: true,
    reference: {
      label: 'Multi-Region DR Capstone',
      path: 'capstones/03-multi-region-dr/README.md',
    },
  },
  {
    id: 'l400-008',
    level: 400,
    topic: 'Multi-Region data authority',
    type: 'multiple',
    prompt:
      'A payment service fails over to a recovery Region after the primary becomes unreachable. Duplicate approval is forbidden, and a network partition could leave the former writer alive. Which TWO controls are essential to preserve monetary correctness?',
    options: [
      {
        id: 'a',
        text: 'Fence the former writer before promotion and record the authoritative Region explicitly in every lifecycle state.',
      },
      {
        id: 'b',
        text: 'Persist a merchant-scoped idempotency key and its outcome in the same durable transaction boundary as the authorization.',
      },
      {
        id: 'c',
        text: 'Generate a new request identifier whenever a client retries in the recovery Region.',
      },
      {
        id: 'd',
        text: 'Allow both Regions to accept writes and select the record with the latest local timestamp.',
      },
      {
        id: 'e',
        text: 'Delay DNS changes until replication dashboards report green, without changing writer authority.',
      },
    ],
    correctOptionIds: ['a', 'b'],
    explanation:
      'Writer fencing prevents split authority, while a stable business idempotency key makes retries return the already committed outcome across network and Region boundaries. Both controls are needed because routing alone neither stops stale writes nor identifies one business operation.',
    strongestDistractor:
      'Waiting for a green replication dashboard may reduce lag risk, but it does not fence the former writer or prevent a retry from becoming a second authorization.',
    whenToUse:
      'Use single-writer authority and fencing when updates cannot be conflict-free; pair them with transactionally durable business idempotency for externally retried operations.',
    featureSelection: true,
    reference: {
      label: 'Global Payments Analysis',
      path: 'modules/400-professional-architecture/case-studies/set-01-global-payments-analysis.md',
    },
  },
  {
    id: 'l400-009',
    level: 400,
    topic: 'Measured recovery objectives',
    type: 'single',
    prompt:
      'A quarterly DR report claims a 12-minute RTO and zero RPO because replication stayed healthy and infrastructure was ready. Customers could not submit orders for 27 minutes, and reconciliation later found one acknowledged order missing. How should the metrics be corrected?',
    options: [
      {
        id: 'a',
        text: 'Measure RTO from customer-path failure until end-to-end order acceptance passes, and measure RPO from acknowledged source business records versus durable recovered target records.',
      },
      {
        id: 'b',
        text: 'Keep the report because infrastructure readiness is the only recovery objective controlled by the cloud team.',
      },
      {
        id: 'c',
        text: 'Measure RTO from the incident declaration and infer RPO from average replication lag.',
      },
      {
        id: 'd',
        text: 'Exclude dependency and reconciliation time because those activities occur outside database promotion.',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Recovery objectives describe business service and durable data outcomes. The critical path includes routing, identity, dependencies, capacity, validation, and reconciliation; a healthy replication metric is supporting evidence, not proof of restored service or retained writes.',
    strongestDistractor:
      'Starting RTO at incident declaration hides detection and decision delay, while average replication lag cannot prove that every acknowledged business record survived.',
    whenToUse:
      'Measure RTO at the customer boundary and RPO with business record checkpoints whenever recovery claims must be auditable and end to end.',
    featureSelection: false,
    reference: {
      label: 'SAP Readiness Review',
      path: 'assessments/sap-readiness.md',
    },
  },
  {
    id: 'l400-010',
    level: 400,
    topic: 'Asynchronous decoupling',
    type: 'single',
    prompt:
      'Order acceptance must respond within 300 ms, but a tax provider may be unavailable for 30 minutes and the business permits tax completion after acceptance. Requests can be retried, and poison records must not block the stream. Which design best fits?',
    options: [
      {
        id: 'a',
        text: 'Accept the order durably, publish an idempotent tax task to a queue, bound retries, isolate poison messages, monitor age, and reconcile the asynchronous result.',
      },
      {
        id: 'b',
        text: 'Call the tax provider synchronously with a thirty-minute client timeout so ordering remains simple.',
      },
      {
        id: 'c',
        text: 'Place a queue between services but keep the API request open until the consumer sends a result to the same message.',
      },
      {
        id: 'd',
        text: 'Cache the last tax response as authoritative for every customer until the provider returns.',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The business explicitly tolerates asynchronous tax completion, so durable decoupling removes the provider from the acceptance latency and availability path. Idempotency, bounded retries, poison handling, age alarms, and reconciliation cover the operational consequences.',
    strongestDistractor:
      'Keeping the API request open while a queued consumer works preserves the dependency in the customer critical path and does not meet the latency or thirty-minute outage requirement.',
    whenToUse:
      'Use a queue when completion can be asynchronous and burst absorption or dependency isolation matters; avoid it as a cosmetic wrapper around a synchronous response requirement.',
    featureSelection: true,
    reference: {
      label: 'Domain 2 - New Solutions',
      path: 'modules/400-professional-architecture/domain-2-new-solutions.md',
    },
  },
  {
    id: 'l400-011',
    level: 400,
    topic: 'Progressive delivery',
    type: 'single',
    prompt:
      'A team needs reversible application releases, but its next version replaces a required database column in place. Restoring the database would discard unrelated valid writes. Which release approach preserves rollback while minimizing customer risk?',
    options: [
      {
        id: 'a',
        text: 'Use expand-and-contract schema changes, cross-version application compatibility, validated backfill, progressive traffic gates, and delay removal until the rollback window closes.',
      },
      {
        id: 'b',
        text: 'Use blue/green application fleets and perform the destructive schema replacement before sending any traffic.',
      },
      {
        id: 'c',
        text: 'Deploy in place to every instance and restore the full database snapshot if validation fails.',
      },
      {
        id: 'd',
        text: 'Keep both application fleets but let each use an incompatible schema version against the same table.',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Expand-and-contract separates additive, compatible changes from later destruction. Old and new code can coexist during canary or blue/green traffic shifts, and application rollback does not require erasing valid database writes.',
    strongestDistractor:
      'Blue/green fleets alone do not make an in-place destructive schema change reversible; the old fleet cannot safely resume after its required column is removed.',
    whenToUse:
      'Use blue/green or canary delivery only when state and schema remain compatible through the rollback window; sequence database changes with expand-and-contract.',
    featureSelection: true,
    reference: {
      label: 'Media Improvement Analysis',
      path: 'modules/400-professional-architecture/case-studies/set-04-media-improvement-analysis.md',
    },
  },
  {
    id: 'l400-012',
    level: 400,
    topic: 'Continuous improvement',
    type: 'multiple',
    prompt:
      'A streaming platform has high p99 startup latency after a viral event. Average CPU is 45%, costs rose 65% after blanket resizing, and two major events are approaching. Which TWO actions should lead the improvement program?',
    options: [
      {
        id: 'a',
        text: 'Define customer SLIs and an error budget, then correlate traces with cache, connection, lock, stream-lag, throttle, saturation, quota, and cost signals.',
      },
      {
        id: 'b',
        text: 'Reproduce representative 10x demand including hot-key skew and cold-cache behavior, then release the smallest reversible remediation through canaries.',
      },
      {
        id: 'c',
        text: 'Double every resource again and buy three-year commitments for the new event peak.',
      },
      {
        id: 'd',
        text: 'Rewrite the database, cache, streaming system, and applications simultaneously before the next event.',
      },
      {
        id: 'e',
        text: 'Add dashboards for every metric without assigning alarm ownership or rollback authority.',
      },
    ],
    correctOptionIds: ['a', 'b'],
    explanation:
      'Customer-focused measurements and representative load establish attribution before change. A small, reversible canary can then prove whether the limiting constraint, SLO, and unit cost improved without combining unrelated failure sources.',
    strongestDistractor:
      'Doubling resources and buying three-year commitments may mask a bottleneck temporarily, but it repeats an unmeasured cost increase and commits to a seasonal peak before finding the constraint.',
    whenToUse:
      'Use a measured improvement loop for existing systems: baseline, isolate the limiting exposure, test a reversible change, compare evidence, and only then scale or commit.',
    featureSelection: false,
    reference: {
      label: 'Domain 3 - Continuous Improvement',
      path: 'modules/400-professional-architecture/domain-3-continuous-improvement.md',
    },
  },
  {
    id: 'l400-013',
    level: 400,
    topic: 'Caching strategy',
    type: 'single',
    prompt:
      'A media origin is overloaded during live events. Some objects are public and immutable, while manifests vary by authorization and update every few seconds. The goal is higher cache efficiency without exposing personalized content or serving stale live state. What should the architect do?',
    options: [
      {
        id: 'a',
        text: 'Define CloudFront cache behaviors by content semantics, include required authorization and variant dimensions in cache keys, set appropriate TTLs, and test negative isolation cases.',
      },
      {
        id: 'b',
        text: 'Cache every response for one day and remove authorization headers from cache keys to maximize hit ratio.',
      },
      {
        id: 'c',
        text: 'Disable edge caching and replace the origin with one larger single-AZ database.',
      },
      {
        id: 'd',
        text: 'Use the cache as the authoritative store and rebuild the database from cached responses after failures.',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Cache behavior must preserve authorization, mutability, and variant correctness. Separate policies let immutable public objects receive long caching while rapidly changing or personalized content uses safe keys and shorter lifetimes.',
    strongestDistractor:
      'Removing authorization context and caching every response for one day raises hit ratio by violating data isolation and freshness, which are hard correctness requirements.',
    whenToUse:
      'Use CloudFront when edge delivery can reduce latency and origin load with well-defined cache semantics; avoid broad caching when safe identity, variation, or freshness keys cannot be expressed.',
    featureSelection: true,
    reference: {
      label: 'Media Improvement Case Study',
      path: 'modules/400-professional-architecture/case-studies/set-04-media-improvement.md',
    },
  },
  {
    id: 'l400-014',
    level: 400,
    topic: 'Event processing',
    type: 'single',
    prompt:
      'A live-event pipeline must preserve ordering within each channel, scale unevenly across popular channels, and replay after consumer failure without duplicate side effects. Which design satisfies the complete behavior?',
    options: [
      {
        id: 'a',
        text: 'Partition by channel, use stable event identities, make consumers idempotent with durable outcome tracking, and test skew, replay, lag, and poison handling.',
      },
      {
        id: 'b',
        text: 'Randomize every event across partitions and reconstruct channel order from producer timestamps.',
      },
      {
        id: 'c',
        text: 'Use one partition for the entire platform so global ordering is guaranteed regardless of peak throughput.',
      },
      {
        id: 'd',
        text: 'Disable replay and acknowledge events before side effects so duplicates cannot occur.',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'A channel key keeps related events in one ordered partition while allowing different channels to scale independently. Stable identities and durable idempotency protect side effects under retries and replay; skew tests expose hot-channel limits.',
    strongestDistractor:
      'Random partitioning improves distribution, but timestamps cannot reconstruct causal channel order under concurrency, clock skew, retry, and delayed delivery.',
    whenToUse:
      'Use keyed partitioning when ordering is required within an entity or stream; combine it with idempotent consumers because ordered delivery does not eliminate retries.',
    featureSelection: true,
    reference: {
      label: 'Media Improvement Analysis',
      path: 'modules/400-professional-architecture/case-studies/set-04-media-improvement-analysis.md',
    },
  },
  {
    id: 'l400-015',
    level: 400,
    topic: 'Cost commitments',
    type: 'single',
    prompt:
      'After migration, demand is highly seasonal and modernization will change compute shape over the next quarter. Finance wants immediate maximum discounts, while the board requires lower three-year TCO without stranded commitments. What commitment strategy should the architect recommend?',
    options: [
      {
        id: 'a',
        text: 'Measure the post-migration minimum stable baseline, cover only that durable usage with suitable commitments, and leave peaks elastic while reviewing utilization and coverage.',
      },
      {
        id: 'b',
        text: 'Purchase three-year commitments for the forecast event peak before modernization begins.',
      },
      {
        id: 'c',
        text: 'Avoid all commitments permanently because variable demand makes every commitment uneconomic.',
      },
      {
        id: 'd',
        text: 'Choose commitments from average pre-migration CPU and exclude licensing, transfer, support, and engineering labor from TCO.',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'A stable minimum limits stranded exposure while retaining elasticity for seasonal peaks and architecture change. The decision should follow measured demand and include the full operating and transition cost, not only instance price.',
    strongestDistractor:
      'Committing to the event peak offers a larger nominal discount, but highly seasonal usage and pending modernization would leave expensive unused coverage for most of the term.',
    whenToUse:
      'Use commitments for durable, measured baseline consumption after migrations and major optimizations stabilize; avoid covering uncertain growth, temporary parallel run, or event peaks.',
    featureSelection: true,
    reference: {
      label: 'Migration Portfolio Capstone',
      path: 'capstones/06-migration-portfolio/README.md',
    },
  },
  {
    id: 'l400-016',
    level: 400,
    topic: 'Migration portfolio planning',
    type: 'multiple',
    prompt:
      'A company must exit a data center in 18 months. Automated discovery is disputed by 20% of owners, several applications share hidden identity and file dependencies, and production scale cannot begin before cloud foundations are ready. Which TWO planning actions most reduce portfolio execution risk?',
    options: [
      {
        id: 'a',
        text: 'Validate tool discovery with owners, traffic, contracts, CMDB, and finance, and record confidence and unresolved dependency assumptions.',
      },
      {
        id: 'b',
        text: 'Gate production waves on identity, network, DNS, logging, backup, security, support, and migration-factory readiness.',
      },
      {
        id: 'c',
        text: 'Sort servers into equal-size waves so each team receives the same number of machines.',
      },
      {
        id: 'd',
        text: 'Require every application to be refactored before any production migration begins.',
      },
      {
        id: 'e',
        text: 'Move all databases first and let applications use them across the WAN until later waves.',
      },
    ],
    correctOptionIds: ['a', 'b'],
    explanation:
      'Validated dependency evidence prevents false wave closure, and foundation gates stop migration from outrunning governance and operations. Together they protect business services and create an executable path to the deadline without requiring maximum change first.',
    strongestDistractor:
      'Equal-size server waves appear easy to schedule, but machine count ignores service dependencies, business calendars, and foundation readiness, so a completed wave may not deliver a usable capability.',
    whenToUse:
      'Use dependency-led waves with explicit confidence and readiness gates for portfolio migrations; do not group solely by inventory size or reporting ownership.',
    featureSelection: false,
    reference: {
      label: 'Domain 4 - Migration and Modernization',
      path: 'modules/400-professional-architecture/domain-4-migration-modernization.md',
    },
  },
  {
    id: 'l400-017',
    level: 400,
    topic: 'Data migration',
    type: 'single',
    prompt:
      'A migration includes 1.6 PB of Windows engineering files, a 3 TB daily change rate, a constrained WAN, and a fixed exit date. SMB locking and ACLs must be preserved, and the cutover cannot omit changes made after the initial copy. Which approach best meets these requirements?',
    options: [
      {
        id: 'a',
        text: 'Seed the large dataset with an offline transfer where lead time permits, continuously synchronize deltas, select an FSx target from SMB semantics, and validate ACLs, locks, checksums, throughput, and final change backlog.',
      },
      {
        id: 'b',
        text: 'Ship one offline copy, make no delta transfer, and cut over several months later.',
      },
      {
        id: 'c',
        text: 'Copy each share independently over the public internet using permanent domain administrator credentials.',
      },
      {
        id: 'd',
        text: 'Convert all files to S3 objects because object storage preserves Windows file locking automatically.',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Offline seeding reduces initial WAN duration, while repeated delta synchronization closes the change gap. The destination is chosen from required Windows semantics rather than storage price, and validation proves security and usability before cutover.',
    strongestDistractor:
      'A single offline copy handles initial volume but has no mechanism for months of subsequent changes, so it cannot produce a complete cutover dataset.',
    whenToUse:
      'Use Snow Family for large offline seeds when lead time and custody fit, then use DataSync-style deltas for supported changing files; choose FSx when Windows protocol semantics are mandatory.',
    featureSelection: true,
    reference: {
      label: 'Manufacturing Migration Analysis',
      path: 'modules/400-professional-architecture/case-studies/set-03-manufacturing-migration-analysis.md',
    },
  },
  {
    id: 'l400-018',
    level: 400,
    topic: 'Database migration',
    type: 'single',
    prompt:
      'An ERP database must cut over with less than two hours of outage and less than five minutes of data loss. The preferred managed engine does not support six critical extensions, and row-level reconciliation is mandatory. Which decision best balances the deadline and correctness?',
    options: [
      {
        id: 'a',
        text: 'Test DMS full load and change data capture plus schema and object compatibility; choose an alternate or self-managed target for unsupported semantics and define reconciliation and rollback before cutover.',
      },
      {
        id: 'b',
        text: 'Use DMS to migrate directly to the preferred engine because continuous replication automatically converts every extension.',
      },
      {
        id: 'c',
        text: 'Restore the most recent nightly backup to the preferred engine and accept any unsupported objects.',
      },
      {
        id: 'd',
        text: 'Refactor the complete ERP data model before beginning migration, even if the exit deadline is missed.',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Continuous migration can support the outage and loss targets only after schema, data type, object, and workload compatibility are proven. Unsupported business semantics require a different target or staged modernization, with explicit validation and rollback.',
    strongestDistractor:
      'DMS can move and transform supported data, but it does not guarantee conversion of database extensions or preserve untested semantics merely because change data capture is enabled.',
    whenToUse:
      'Use DMS for supported online database migrations after compatibility and validation tests; avoid forcing a managed target when unsupported objects change required behavior.',
    featureSelection: true,
    reference: {
      label: 'Migration Portfolio Capstone',
      path: 'capstones/06-migration-portfolio/README.md',
    },
  },
  {
    id: 'l400-019',
    level: 400,
    topic: 'Migration rollback',
    type: 'single',
    prompt:
      'An ERP cutover completes and the target accepts production writes for 25 minutes. Business validation then exceeds the approved error threshold. The source database is intact but has been fenced. What must the rollback plan do before routing users back?',
    options: [
      {
        id: 'a',
        text: 'Invoke a pretested reverse synchronization or business reconciliation process for target-side writes, validate authority and consistency, then deliberately re-enable the source.',
      },
      {
        id: 'b',
        text: 'Point DNS back immediately because the source still contains all data that existed before cutover.',
      },
      {
        id: 'c',
        text: 'Restore both databases from the pre-cutover backup so their contents match.',
      },
      {
        id: 'd',
        text: 'Leave both databases writable and resolve differences later by the latest timestamp.',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Once the target accepts writes, rollback is a data-authority transition rather than a routing reversal. Target changes must be preserved or explicitly reconciled, consistency validated, and only one writer enabled through the transition.',
    strongestDistractor:
      'Pointing DNS back is fast but loses or strands the twenty-five minutes of target-side business writes and does not safely transfer writer authority.',
    whenToUse:
      'Use reverse synchronization or governed reconciliation when rollback can occur after target writes; define a no-return point if safe reverse movement is impossible.',
    featureSelection: false,
    reference: {
      label: 'Manufacturing Migration Case Study',
      path: 'modules/400-professional-architecture/case-studies/set-03-manufacturing-migration.md',
    },
  },
  {
    id: 'l400-020',
    level: 400,
    topic: 'Evidence and recovery testing',
    type: 'multiple',
    prompt:
      'A board asks for defensible proof that a regional recovery plan meets a 20-minute RTO and two-minute RPO without relying on the failed Region. Which TWO evidence activities provide the strongest proof?',
    options: [
      {
        id: 'a',
        text: 'Run a controlled customer-path failover using pre-provisioned target roles and artifacts, recording detection, approval, scaling, dependency recovery, validation, and failback times.',
      },
      {
        id: 'b',
        text: 'Reconcile synthetic business IDs from the last acknowledged source write to the newest durable target write and retain sanitized results under separate custody.',
      },
      {
        id: 'c',
        text: 'Capture a screenshot of a healthy replication dashboard during normal operation.',
      },
      {
        id: 'd',
        text: 'Ask the architecture owner to attest that every diagram shows two Regions.',
      },
      {
        id: 'e',
        text: 'Record only database promotion time and exclude DNS, identity, capacity, and third-party dependencies.',
      },
    ],
    correctOptionIds: ['a', 'b'],
    explanation:
      'A controlled end-to-end exercise measures actual customer restoration and proves recovery control-plane independence. Business-record reconciliation measures durable loss and duplicates, while separated retention preserves the integrity of the result.',
    strongestDistractor:
      'A healthy replication screenshot shows transport status at one moment, but it does not prove promotion, dependency recovery, customer restoration, data correctness, or failback within the targets.',
    whenToUse:
      'Use controlled failover plus business-record reconciliation to prove RTO and RPO; use replication dashboards as supporting telemetry, never as the acceptance test.',
    featureSelection: false,
    reference: {
      label: 'Multi-Region DR Capstone',
      path: 'capstones/03-multi-region-dr/README.md',
    },
  },
  {
    id: 'l400-021',
    level: 400,
    topic: 'Modernization strategy',
    type: 'single',
    prompt:
      'A data center lease ends in 14 months. Operations is experienced with ECS but has limited Kubernetes administration. Most applications need minimal code change, while one high-value service could benefit from later decomposition. Which portfolio strategy is most supportable?',
    options: [
      {
        id: 'a',
        text: 'Rehost or replatform deadline-bound workloads to suitable managed or ECS targets, stabilize the exit, and schedule the high-value refactor as a separately justified modernization.',
      },
      {
        id: 'b',
        text: 'Require every application to move to EKS before any workload can leave the data center.',
      },
      {
        id: 'c',
        text: 'Retain every application until the entire portfolio can be refactored in one coordinated release.',
      },
      {
        id: 'd',
        text: 'Move only databases and operate all applications over the WAN indefinitely.',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Separating deadline migration from selective modernization reduces schedule and operating risk while preserving later value. Target choices reflect workload requirements and team skills instead of imposing one platform on the portfolio.',
    strongestDistractor:
      'Standardizing every workload on EKS promises portability, but it makes the lease deadline depend on maximum application and operating-model change despite limited cluster skills.',
    whenToUse:
      'Use EKS when Kubernetes APIs, ecosystem control, or portability justify cluster operations; prefer ECS or managed services when those requirements are absent and operational simplicity matters.',
    featureSelection: true,
    reference: {
      label: 'Domain 4 - Migration and Modernization',
      path: 'modules/400-professional-architecture/domain-4-migration-modernization.md',
    },
  },
  {
    id: 'l400-022',
    level: 400,
    topic: 'Operating models',
    type: 'single',
    prompt:
      'A platform team wants fully automatic remediation across 140 accounts. Security requires rapid containment, but changing database authority or organization policies can create a broad outage. Which operating model best balances response speed and blast radius?',
    options: [
      {
        id: 'a',
        text: 'Automate deterministic low-risk actions with bounded scope and rollback; gather evidence automatically but require named approval and stop conditions for authority changes or organization-wide controls.',
      },
      {
        id: 'b',
        text: 'Allow every high-severity alarm to execute any remediation with organization administrator permissions.',
      },
      {
        id: 'c',
        text: 'Forbid all automation and require a quarterly board vote for routine instance replacement.',
      },
      {
        id: 'd',
        text: 'Let each application team define its own emergency authority without a central incident RACI.',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Automation fits repetitive, deterministic, reversible work. High-blast-radius or ambiguous decisions need explicit incident authority, evidence, bounded execution, stop criteria, and rollback so automation cannot amplify the incident.',
    strongestDistractor:
      'Unrestricted automated organization administration may react fastest, but a bad signal or policy can propagate the incident across every account with no controlled decision boundary.',
    whenToUse:
      'Automate when the trigger and safe action are deterministic, scoped, observable, and reversible; require human authority for ambiguous risk acceptance and data or governance authority changes.',
    featureSelection: false,
    reference: {
      label: 'Final Architecture Review Board',
      path: 'capstones/07-architecture-review-board/README.md',
    },
  },
  {
    id: 'l400-023',
    level: 400,
    topic: 'Cost allocation',
    type: 'single',
    prompt:
      'A multi-account platform must allocate direct workload cost and shared transit, inspection, logging, security, and support cost. Several shared services are not meaningfully taggable, and every anomaly needs an accountable owner. Which model is most actionable?',
    options: [
      {
        id: 'a',
        text: 'Use accounts as primary allocation boundaries, mandatory business tags where supported, cost categories for mapping, and documented shared-cost drivers with product anomaly owners and response SLAs.',
      },
      {
        id: 'b',
        text: 'Require tags on all resources and leave every untaggable shared charge permanently unallocated.',
      },
      {
        id: 'c',
        text: 'Divide every shared charge equally among accounts regardless of usage or benefit and assign anomalies to central finance.',
      },
      {
        id: 'd',
        text: 'Move all workloads into one account so the consolidated bill no longer needs allocation rules.',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Account boundaries make ownership durable, tags enrich supported resources, and cost categories map business structure. Transparent drivers such as bytes, account count, or direct spend allocate shared services, while named owners turn anomalies into action.',
    strongestDistractor:
      'Tag-only allocation sounds uniform, but untaggable transit, support, and shared platform charges would remain invisible and undermine total product cost.',
    whenToUse:
      'Use accounts for strong ownership boundaries, tags for resource context, and explicit allocation drivers for shared or untaggable cost; tie every anomaly to an operating owner.',
    featureSelection: true,
    reference: {
      label: 'Regulated Landing Zone Analysis',
      path: 'modules/400-professional-architecture/case-studies/set-02-regulated-landing-zone-analysis.md',
    },
  },
  {
    id: 'l400-024',
    level: 400,
    topic: 'Architecture governance',
    type: 'multiple',
    prompt:
      'An architecture review board is deciding whether to approve a regional scheduling design. The proposal meets latency and budget targets, but writer fencing has not been tested and the seven-year evidence archive has no owner. Which TWO board actions are required before approval can be valid?',
    options: [
      {
        id: 'a',
        text: 'Record an unresolved Block for the unproven writer-fencing requirement and require traceable test evidence before closure.',
      },
      {
        id: 'b',
        text: 'Assign evidence custody, retention administration, investigation access, and closure dates to accountable roles.',
      },
      {
        id: 'c',
        text: 'Approve because favorable latency and cost compensate for gaps in correctness and compliance.',
      },
      {
        id: 'd',
        text: 'Convert both gaps to non-blocking suggestions because they are operational details.',
      },
      {
        id: 'e',
        text: 'Approve conditionally without an owner or due date and revisit after production launch.',
      },
    ],
    correctOptionIds: ['a', 'b'],
    explanation:
      'Untested writer fencing threatens duplicate appointments, and unowned evidence custody violates a mandatory compliance outcome. Hard requirements require evidence and ownership; favorable lower-priority qualities cannot compensate for either gap.',
    strongestDistractor:
      'Conditional approval without an owner or due date appears pragmatic, but it provides no accountable path to close mandatory correctness and retention gaps before exposure.',
    whenToUse:
      'Use Block for a hard-requirement violation or unowned critical risk; use a condition only when named evidence, owner, and due date make approval safe and enforceable.',
    featureSelection: false,
    reference: {
      label: 'Final Architecture Review Board',
      path: 'capstones/07-architecture-review-board/README.md',
    },
  },
  {
    id: 'l400-025',
    level: 400,
    topic: 'Migration decommissioning',
    type: 'single',
    prompt:
      'A migrated application has passed technical smoke tests and receives production traffic. The source still contains regulated records, an unknown monthly batch dependency may exist, and its commercial license renews next week. When should the source be decommissioned?',
    options: [
      {
        id: 'a',
        text: 'After the stabilization window, owner and business sign-off, dependency monitoring, backup and restore validation, retention and audit disposition, license release approval, and the documented no-return gate.',
      },
      {
        id: 'b',
        text: 'Immediately after traffic cutover to guarantee the license renewal is avoided.',
      },
      {
        id: 'c',
        text: 'Keep it running indefinitely as an undocumented rollback environment.',
      },
      {
        id: 'd',
        text: 'Delete the source data after smoke tests and retain only the old DNS record for rollback.',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Traffic cutover is not migration completion. Stabilization, dependency closure, recoverability, business validation, regulatory disposition, and an approved no-return point protect service and evidence while allowing the license and source risk to end deliberately.',
    strongestDistractor:
      'Immediate decommission may avoid renewal cost, but it risks breaking the unresolved monthly dependency and destroying regulated or rollback evidence before authorized disposition.',
    whenToUse:
      'Decommission only after technical, business, dependency, recovery, retention, audit, and commercial exit gates are satisfied; do not retain sources indefinitely without ownership and cost.',
    featureSelection: false,
    reference: {
      label: 'Migration Portfolio Capstone',
      path: 'capstones/06-migration-portfolio/README.md',
    },
  },
]
