import type { QuizQuestion } from '../domain/quiz'

export const level100Questions: QuizQuestion[] = [
  {
    id: 'l100-001',
    level: 100,
    topic: 'Global infrastructure and Well-Architected',
    type: 'single',
    prompt:
      'A company must keep customer data in a specific country and needs low latency for users there. What should drive its AWS Region choice first?',
    options: [
      {
        id: 'region-hard-requirements',
        text: 'Data residency, user latency, and required service availability',
      },
      {
        id: 'region-lowest-price',
        text: 'The lowest advertised compute price in any Region',
      },
      {
        id: 'region-most-azs',
        text: 'The Region with the largest number of Availability Zones',
      },
      {
        id: 'region-default-console',
        text: 'Whichever Region the AWS console selects by default',
      },
    ],
    correctOptionIds: ['region-hard-requirements'],
    explanation:
      'Hard constraints such as legal residency, latency, and service availability must be satisfied before cost and convenience are optimized.',
    strongestDistractor:
      'The lowest-price Region may reduce one cost but can violate residency, latency, or service requirements.',
    whenToUse:
      'Use a nearby compliant Region that offers the required services; add other Regions only when explicit recovery or global latency goals justify them.',
    featureSelection: true,
    reference: {
      label: 'Global infrastructure decision rules',
      path: 'modules/100-foundations/01-global-infrastructure/must-know.md',
    },
  },
  {
    id: 'l100-002',
    level: 100,
    topic: 'Global infrastructure and Well-Architected',
    type: 'single',
    prompt:
      'A web service must continue operating if one data center fails, but it does not require protection from a full Regional outage. Which design is appropriate?',
    options: [
      {
        id: 'multi-az-capacity',
        text: 'Run independent application capacity across at least two Availability Zones',
      },
      {
        id: 'single-az-large-instance',
        text: 'Run one larger instance in a single Availability Zone',
      },
      {
        id: 'edge-location-origin',
        text: 'Run the application origin on an edge location',
      },
      {
        id: 'multi-region-required',
        text: 'Deploy a complete active-active stack in every AWS Region',
      },
    ],
    correctOptionIds: ['multi-az-capacity'],
    explanation:
      'Availability Zones are isolated failure domains within a Region. Independent capacity in multiple AZs addresses an AZ failure without unnecessary multi-Region complexity.',
    strongestDistractor:
      'A multi-Region design can cover a wider failure scope, but it adds cost and operations that the stated requirement does not justify.',
    whenToUse:
      'Use Multi-AZ designs for Regional high availability; evaluate multiple Regions only for Regional disaster recovery, sovereignty, or global latency requirements.',
    featureSelection: true,
    reference: {
      label: 'Availability Zone failure isolation',
      path: 'modules/100-foundations/01-global-infrastructure/must-know.md',
    },
  },
  {
    id: 'l100-003',
    level: 100,
    topic: 'Global infrastructure and Well-Architected',
    type: 'multiple',
    prompt:
      'Which two statements correctly apply AWS infrastructure scope and the Shared Responsibility Model? Select two options.',
    options: [
      {
        id: 'customer-configures-access',
        text: 'The customer remains responsible for configuring access to its data',
      },
      {
        id: 'az-inside-region',
        text: 'An Availability Zone is an isolated failure domain inside a Region',
      },
      {
        id: 'aws-secures-customer-data-policy',
        text: 'AWS automatically creates least-privilege data policies for every customer workload',
      },
      {
        id: 'edge-is-customer-az',
        text: 'An edge location is an Availability Zone where customers launch EC2 instances',
      },
      {
        id: 'multi-az-is-multi-region',
        text: 'Using multiple Availability Zones also protects against every full Regional outage',
      },
    ],
    correctOptionIds: ['customer-configures-access', 'az-inside-region'],
    explanation:
      'AWS secures the underlying cloud infrastructure, while customers configure identities, permissions, and data protection. AZs provide failure isolation within, not across, Regions.',
    strongestDistractor:
      'AWS supplies secure service capabilities but does not design each customer workload policy or make it least privilege automatically.',
    whenToUse:
      'Use service scope and shared-responsibility boundaries to assign controls and choose failure domains before selecting products.',
    featureSelection: false,
    reference: {
      label: 'Infrastructure and responsibility boundaries',
      path: 'modules/100-foundations/01-global-infrastructure/must-know.md',
    },
  },
  {
    id: 'l100-004',
    level: 100,
    topic: 'IAM, KMS, and secrets',
    type: 'single',
    prompt:
      'An application on EC2 needs to read objects from one S3 bucket. Which credential approach should be used?',
    options: [
      {
        id: 'ec2-instance-role',
        text: 'Attach a least-privilege IAM role to the EC2 instance',
      },
      {
        id: 'embedded-access-key',
        text: 'Embed an IAM user access key in the application configuration',
      },
      {
        id: 'shared-root-key',
        text: 'Store root user access keys on the instance',
      },
      {
        id: 'developer-personal-key',
        text: 'Copy a developer personal access key to the instance',
      },
    ],
    correctOptionIds: ['ec2-instance-role'],
    explanation:
      'An instance role supplies automatically rotating temporary credentials and can be scoped to the required bucket actions and resources.',
    strongestDistractor:
      'An embedded IAM user key may work but creates a long-lived secret that must be distributed, protected, and rotated manually.',
    whenToUse:
      'Use IAM roles for AWS workloads and federation or IAM Identity Center for human workforce access; avoid long-term access keys when temporary credentials are available.',
    featureSelection: true,
    reference: {
      label: 'IAM role decision rule',
      path: 'modules/100-foundations/02-iam-kms-secrets/must-know.md',
    },
  },
  {
    id: 'l100-005',
    level: 100,
    topic: 'IAM, KMS, and secrets',
    type: 'single',
    prompt:
      'An identity policy allows s3:DeleteObject, but an applicable bucket policy explicitly denies that action. What is the result?',
    options: [
      {
        id: 'explicit-deny-wins',
        text: 'The request is denied because an explicit deny overrides an allow',
      },
      {
        id: 'identity-allow-wins',
        text: 'The request is allowed because identity policies take precedence',
      },
      {
        id: 'policies-cancel-out',
        text: 'The request is allowed because the two statements cancel each other out',
      },
      {
        id: 'new-role-required',
        text: 'The request is allowed only after the identity assumes a new role',
      },
    ],
    correctOptionIds: ['explicit-deny-wins'],
    explanation:
      'AWS policy evaluation starts with implicit deny, allows requests with an applicable allow, and still denies any request matched by an applicable explicit deny.',
    strongestDistractor:
      'An identity-based allow contributes permission but cannot override an explicit deny in another applicable policy.',
    whenToUse:
      'Trace all applicable identity, resource, organization, boundary, session, and key controls when diagnosing authorization rather than inspecting one policy in isolation.',
    featureSelection: false,
    reference: {
      label: 'IAM policy evaluation fundamentals',
      path: 'modules/100-foundations/02-iam-kms-secrets/must-know.md',
    },
  },
  {
    id: 'l100-006',
    level: 100,
    topic: 'IAM, KMS, and secrets',
    type: 'multiple',
    prompt:
      'A team is choosing between Secrets Manager, Parameter Store, and KMS. Which two choices fit the stated requirement? Select two options.',
    options: [
      {
        id: 'secrets-manager-rotation',
        text: 'Use Secrets Manager for a database password that needs managed rotation',
      },
      {
        id: 'parameter-store-config',
        text: 'Use Parameter Store for hierarchical application configuration without a managed rotation requirement',
      },
      {
        id: 'kms-secret-database',
        text: 'Use KMS as the database that stores and versions application passwords',
      },
      {
        id: 'parameter-store-auto-rotation',
        text: 'Use Parameter Store because it provides the same managed secret rotation as Secrets Manager',
      },
      {
        id: 'secrets-manager-encryption-only',
        text: 'Use Secrets Manager solely to create and administer cryptographic keys',
      },
    ],
    correctOptionIds: ['secrets-manager-rotation', 'parameter-store-config'],
    explanation:
      'Secrets Manager is purpose-built for secret storage and rotation integrations. Parameter Store suits hierarchical configuration and simple SecureString values; KMS manages cryptographic keys and operations.',
    strongestDistractor:
      'KMS can encrypt secret material but is not a general secret-value database or rotation workflow.',
    whenToUse:
      'Use Secrets Manager when secret lifecycle and rotation matter, Parameter Store for simpler configuration, and KMS when control of encryption keys is the actual requirement.',
    featureSelection: true,
    reference: {
      label: 'Secrets and key management boundaries',
      path: 'modules/100-foundations/02-iam-kms-secrets/must-know.md',
    },
  },
  {
    id: 'l100-007',
    level: 100,
    topic: 'IAM, KMS, and secrets',
    type: 'single',
    prompt:
      'A workload requires control over its encryption key policy and permitted cross-account key use. Which KMS option is the best fit?',
    options: [
      {
        id: 'customer-managed-key',
        text: 'A customer managed KMS key with a reviewed key policy',
      },
      {
        id: 'aws-owned-key',
        text: 'An AWS owned key shared across service-managed resources',
      },
      {
        id: 'plain-parameter',
        text: 'A plaintext Parameter Store parameter',
      },
      {
        id: 'iam-access-key',
        text: 'An IAM user access key used as encryption material',
      },
    ],
    correctOptionIds: ['customer-managed-key'],
    explanation:
      'A customer managed KMS key provides customer-controlled key policy, lifecycle settings, grants, and supported cross-account use, with added cost and administration.',
    strongestDistractor:
      'AWS owned keys reduce administration but do not provide the customer policy control required by the scenario.',
    whenToUse:
      'Use a customer managed KMS key when policy, lifecycle, audit, or cross-account requirements demand control; otherwise prefer simpler service-managed encryption.',
    featureSelection: true,
    reference: {
      label: 'Customer managed KMS key decision',
      path: 'modules/100-foundations/02-iam-kms-secrets/must-know.md',
    },
  },
  {
    id: 'l100-008',
    level: 100,
    topic: 'Compute and elasticity',
    type: 'single',
    prompt:
      'A stateless web application needs HTTP host-based and path-based routing to different target groups. Which load balancer should it use?',
    options: [
      {
        id: 'application-load-balancer',
        text: 'Application Load Balancer',
      },
      {
        id: 'network-load-balancer',
        text: 'Network Load Balancer',
      },
      {
        id: 'route53-only',
        text: 'Route 53 without a load balancer',
      },
      {
        id: 'nat-gateway',
        text: 'NAT Gateway',
      },
    ],
    correctOptionIds: ['application-load-balancer'],
    explanation:
      'An Application Load Balancer operates at Layer 7 and understands HTTP host and path rules for routing requests to target groups.',
    strongestDistractor:
      'A Network Load Balancer is appropriate for Layer 4 TCP/UDP, static IP, or extreme network performance, but it does not provide HTTP path routing.',
    whenToUse:
      'Use an ALB for HTTP-aware routing, an NLB for Layer 4 or static-IP requirements, and no load balancer when distribution and health routing are unnecessary.',
    featureSelection: true,
    reference: {
      label: 'Load balancer selection',
      path: 'modules/100-foundations/03-compute-elasticity/must-know.md',
    },
  },
  {
    id: 'l100-009',
    level: 100,
    topic: 'Compute and elasticity',
    type: 'single',
    prompt:
      'A fault-tolerant batch processing fleet can checkpoint work and retry after interruption. Which EC2 purchasing option can reduce compute cost?',
    options: [
      {
        id: 'spot-instances',
        text: 'Spot Instances',
      },
      {
        id: 'dedicated-hosts',
        text: 'Dedicated Hosts',
      },
      {
        id: 'on-demand-only',
        text: 'On-Demand Instances only',
      },
      {
        id: 'reserved-capacity-singleton',
        text: 'A single reserved-capacity instance with no retry design',
      },
    ],
    correctOptionIds: ['spot-instances'],
    explanation:
      'Spot Instances offer discounted spare capacity and can be interrupted, which fits work that checkpoints, retries, and tolerates replacement.',
    strongestDistractor:
      'On-Demand capacity avoids commitment and interruption assumptions but gives up the cost opportunity supported by this workload.',
    whenToUse:
      'Use Spot for flexible interruption-tolerant work; avoid it for a non-redundant, non-interruptible singleton.',
    featureSelection: true,
    reference: {
      label: 'EC2 purchasing decision rules',
      path: 'modules/100-foundations/03-compute-elasticity/must-know.md',
    },
  },
  {
    id: 'l100-010',
    level: 100,
    topic: 'Compute and elasticity',
    type: 'multiple',
    prompt:
      'Which two design choices make an EC2 web tier more resilient to instance and Availability Zone failures? Select two options.',
    options: [
      {
        id: 'asg-multiple-azs',
        text: 'Configure an Auto Scaling group with subnets in multiple Availability Zones',
      },
      {
        id: 'externalize-state',
        text: 'Store sessions and durable files outside individual instances',
      },
      {
        id: 'single-instance-state',
        text: 'Keep all session state on one large instance',
      },
      {
        id: 'asg-one-min-one-az',
        text: 'Set minimum capacity to one and use only one Availability Zone',
      },
      {
        id: 'infrastructure-health-only',
        text: 'Ignore application health and replace instances only after hardware failure',
      },
    ],
    correctOptionIds: ['asg-multiple-azs', 'externalize-state'],
    explanation:
      'Multi-AZ Auto Scaling can replace failed capacity across failure domains, while external state lets replacement instances serve users without losing sessions or durable data.',
    strongestDistractor:
      'An Auto Scaling group confined to one AZ and one minimum instance still has an AZ-level single point of failure.',
    whenToUse:
      'Use Auto Scaling for replaceable horizontal capacity, but pair it with application-aware health checks, multiple AZs, and externalized state.',
    featureSelection: true,
    reference: {
      label: 'Auto Scaling boundaries and failure modes',
      path: 'modules/100-foundations/03-compute-elasticity/must-know.md',
    },
  },
  {
    id: 'l100-011',
    level: 100,
    topic: 'Compute and elasticity',
    type: 'single',
    prompt:
      'An EC2 database needs low-latency durable block storage that can persist after the instance is stopped. Which service fits?',
    options: [
      {
        id: 'ebs-volume',
        text: 'Amazon EBS volume',
      },
      {
        id: 'instance-store',
        text: 'EC2 instance store only',
      },
      {
        id: 's3-bucket-mount',
        text: 'An S3 bucket treated as a boot block device',
      },
      {
        id: 'cloudfront-cache',
        text: 'A CloudFront cache',
      },
    ],
    correctOptionIds: ['ebs-volume'],
    explanation:
      'EBS provides persistent block storage for EC2 within an Availability Zone. The volume can outlive an instance when deletion settings preserve it.',
    strongestDistractor:
      'Instance store offers temporary local block storage, but its data is not durable across instance loss.',
    whenToUse:
      'Use EBS for EC2 boot and low-latency block workloads; use snapshots for Regional backup and recovery workflows.',
    featureSelection: true,
    reference: {
      label: 'EBS persistence and scope',
      path: 'modules/100-foundations/03-compute-elasticity/must-know.md',
    },
  },
  {
    id: 'l100-012',
    level: 100,
    topic: 'Storage',
    type: 'single',
    prompt:
      'A service stores millions of images that clients retrieve through HTTP object APIs. The data does not need a mounted file system. Which storage service is the best fit?',
    options: [
      {
        id: 's3-object-storage',
        text: 'Amazon S3',
      },
      {
        id: 'ebs-block-volume',
        text: 'Amazon EBS',
      },
      {
        id: 'efs-nfs',
        text: 'Amazon EFS',
      },
      {
        id: 'ec2-instance-store',
        text: 'EC2 instance store',
      },
    ],
    correctOptionIds: ['s3-object-storage'],
    explanation:
      'S3 is massively scalable object storage accessed through object APIs, matching independent image objects and HTTP-oriented application access.',
    strongestDistractor:
      'EFS offers shared POSIX file semantics, which are unnecessary here and are not the default choice for object access at massive scale.',
    whenToUse:
      'Use S3 for object APIs, EBS for AZ-scoped block devices, and EFS for a shared Linux file system.',
    featureSelection: true,
    reference: {
      label: 'Object, block, and file storage selection',
      path: 'modules/100-foundations/04-storage/must-know.md',
    },
  },
  {
    id: 'l100-013',
    level: 100,
    topic: 'Storage',
    type: 'single',
    prompt:
      'Several Linux EC2 instances in different Availability Zones need concurrent access to the same managed POSIX file system. Which service should they use?',
    options: [
      {
        id: 'efs-shared-files',
        text: 'Amazon EFS',
      },
      {
        id: 'ebs-single-volume',
        text: 'One ordinary EBS volume attached as a general shared file system',
      },
      {
        id: 's3-posix-volume',
        text: 'Amazon S3 as a native POSIX volume',
      },
      {
        id: 'instance-store-copy',
        text: 'Separate instance store disks with manual copying',
      },
    ],
    correctOptionIds: ['efs-shared-files'],
    explanation:
      'EFS is a Regional managed NFS service designed for shared file access from multiple Linux clients, including clients across AZs.',
    strongestDistractor:
      'EBS is normally an AZ-scoped block device and is not a general replacement for a concurrently shared managed file system.',
    whenToUse:
      'Use EFS when multiple Linux systems require shared file semantics; avoid it when object APIs or one-host block semantics are the actual need.',
    featureSelection: true,
    reference: {
      label: 'EFS shared file decision rule',
      path: 'modules/100-foundations/04-storage/must-know.md',
    },
  },
  {
    id: 'l100-014',
    level: 100,
    topic: 'Storage',
    type: 'multiple',
    prompt:
      'An S3 bucket must support recovery from accidental overwrites while controlling the cost of old object versions. Which two features should be combined? Select two options.',
    options: [
      {
        id: 'enable-versioning',
        text: 'Enable S3 Versioning',
      },
      {
        id: 'noncurrent-lifecycle',
        text: 'Add a reviewed lifecycle rule for noncurrent versions',
      },
      {
        id: 'disable-block-public-access',
        text: 'Disable S3 Block Public Access',
      },
      {
        id: 'standard-ia-all-current',
        text: 'Move every new object immediately to Standard-IA regardless of access pattern',
      },
      {
        id: 'versioning-is-backup',
        text: 'Treat versioning alone as a complete immutable backup policy',
      },
    ],
    correctOptionIds: ['enable-versioning', 'noncurrent-lifecycle'],
    explanation:
      'Versioning retains prior object versions for recovery, while a deliberate lifecycle rule transitions or expires noncurrent versions to manage accumulation and cost.',
    strongestDistractor:
      'Versioning improves recoverability but alone does not provide immutable retention or a complete backup policy.',
    whenToUse:
      'Use versioning for overwrite and deletion recovery, then add lifecycle and any separate backup or Object Lock controls required by retention goals.',
    featureSelection: true,
    reference: {
      label: 'S3 protection and lifecycle',
      path: 'modules/100-foundations/04-storage/must-know.md',
    },
  },
  {
    id: 'l100-015',
    level: 100,
    topic: 'VPC networking and DNS',
    type: 'single',
    prompt:
      'What makes a VPC subnet public?',
    options: [
      {
        id: 'route-to-internet-gateway',
        text: 'Its route table has a route to an internet gateway',
      },
      {
        id: 'public-name',
        text: 'Its Name tag contains the word public',
      },
      {
        id: 'large-cidr',
        text: 'Its CIDR block contains enough public-looking addresses',
      },
      {
        id: 'allowing-security-group',
        text: 'A security group permits outbound HTTPS',
      },
    ],
    correctOptionIds: ['route-to-internet-gateway'],
    explanation:
      'Subnet classification comes from routing. Internet reachability for a resource also depends on an appropriate public address and security controls.',
    strongestDistractor:
      'A security group can permit traffic but does not create a network path or make the subnet public.',
    whenToUse:
      'Use route tables to establish network paths, then separately configure addresses and traffic controls to meet the intended exposure.',
    featureSelection: false,
    reference: {
      label: 'Public subnet routing',
      path: 'modules/100-foundations/05-vpc-networking/must-know.md',
    },
  },
  {
    id: 'l100-016',
    level: 100,
    topic: 'VPC networking and DNS',
    type: 'single',
    prompt:
      'A team needs a resource-level allowlist for traffic between application and database instances, with automatic allowance for return traffic. Which control should it use?',
    options: [
      {
        id: 'security-group',
        text: 'Security groups',
      },
      {
        id: 'network-acl',
        text: 'Network ACLs',
      },
      {
        id: 'route-table',
        text: 'Route tables',
      },
      {
        id: 'route53-health-check',
        text: 'Route 53 health checks',
      },
    ],
    correctOptionIds: ['security-group'],
    explanation:
      'Security groups are stateful, resource-level, allow-only controls. Return traffic for an allowed connection is automatically permitted.',
    strongestDistractor:
      'Network ACLs filter at the subnet boundary and are stateless, so both request and return directions must be allowed.',
    whenToUse:
      'Use security groups for primary resource-level allowlisting; use NACLs when subnet-level stateless allow or explicit deny rules are required.',
    featureSelection: true,
    reference: {
      label: 'Security group and NACL selection',
      path: 'modules/100-foundations/05-vpc-networking/must-know.md',
    },
  },
  {
    id: 'l100-017',
    level: 100,
    topic: 'VPC networking and DNS',
    type: 'single',
    prompt:
      'A network ACL allows inbound HTTPS responses but omits the matching outbound ephemeral-port path. What is the likely result?',
    options: [
      {
        id: 'return-traffic-fails',
        text: 'Connections can fail because NACLs require rules for both traffic directions',
      },
      {
        id: 'stateful-return-allowed',
        text: 'Return traffic succeeds automatically because NACLs are stateful',
      },
      {
        id: 'route-created',
        text: 'The NACL automatically creates the missing route',
      },
      {
        id: 'security-group-deny-added',
        text: 'A security group explicit deny is generated',
      },
    ],
    correctOptionIds: ['return-traffic-fails'],
    explanation:
      'Network ACLs are stateless. A valid connection needs applicable inbound and outbound rules, including the relevant return and ephemeral-port traffic.',
    strongestDistractor:
      'Automatic return-traffic handling describes stateful security groups, not stateless NACLs.',
    whenToUse:
      'When using NACLs, model both directions and rule order; do not use them as if they tracked connection state.',
    featureSelection: false,
    reference: {
      label: 'Stateless NACL behavior',
      path: 'modules/100-foundations/05-vpc-networking/must-know.md',
    },
  },
  {
    id: 'l100-018',
    level: 100,
    topic: 'VPC networking and DNS',
    type: 'multiple',
    prompt:
      'Which two networking choices correctly satisfy the stated requirement? Select two options.',
    options: [
      {
        id: 'private-hosted-zone',
        text: 'Use a Route 53 private hosted zone for names resolvable only from associated VPCs',
      },
      {
        id: 'nacl-explicit-deny',
        text: 'Use a network ACL when a subnet-level explicit deny is required',
      },
      {
        id: 'security-group-deny',
        text: 'Add an explicit deny rule to a security group',
      },
      {
        id: 'route53-packet-balancer',
        text: 'Use Route 53 as a packet-level load balancer inside a VPC',
      },
      {
        id: 'peering-transitive',
        text: 'Rely on VPC peering to route transitively through a third VPC',
      },
    ],
    correctOptionIds: ['private-hosted-zone', 'nacl-explicit-deny'],
    explanation:
      'Private hosted zones provide VPC-associated DNS namespaces. NACLs support subnet-level allow and deny rules, unlike allow-only security groups.',
    strongestDistractor:
      'Security groups are allow-only, so an explicit deny requirement cannot be implemented by adding a deny rule to one.',
    whenToUse:
      'Use Route 53 for authoritative DNS decisions and NACLs only when subnet-level stateless controls add a required boundary.',
    featureSelection: true,
    reference: {
      label: 'DNS and network control decision rules',
      path: 'modules/100-foundations/05-vpc-networking/must-know.md',
    },
  },
  {
    id: 'l100-019',
    level: 100,
    topic: 'VPC networking and DNS',
    type: 'single',
    prompt:
      'Private EC2 instances need private access to a supported AWS service without sending traffic through the public internet. What should the architect evaluate first?',
    options: [
      {
        id: 'vpc-endpoint',
        text: 'A VPC endpoint for the service',
      },
      {
        id: 'public-ip-each-instance',
        text: 'Public IP addresses on every private instance',
      },
      {
        id: 'internet-gateway-direct',
        text: 'A direct route from the private subnet to an internet gateway',
      },
      {
        id: 'open-admin-ingress',
        text: 'Open inbound administration ports to the internet',
      },
    ],
    correctOptionIds: ['vpc-endpoint'],
    explanation:
      'A supported VPC endpoint provides a deliberate private path to the service and can avoid public addressing or internet egress for that traffic.',
    strongestDistractor:
      'Giving each instance a public address changes the exposure model and does not satisfy the private-access requirement.',
    whenToUse:
      'Use VPC endpoints for supported service access that should remain private; add general internet egress only when workloads actually require it.',
    featureSelection: true,
    reference: {
      label: 'Private service paths',
      path: 'modules/100-foundations/05-vpc-networking/must-know.md',
    },
  },
  {
    id: 'l100-020',
    level: 100,
    topic: 'Databases',
    type: 'single',
    prompt:
      'An order system requires SQL transactions, relational constraints, and joins across several tables. Which database family is the best fit?',
    options: [
      {
        id: 'rds-or-aurora',
        text: 'Amazon RDS or Amazon Aurora',
      },
      {
        id: 'dynamodb',
        text: 'Amazon DynamoDB',
      },
      {
        id: 's3-csv',
        text: 'CSV objects in Amazon S3 as the transactional database',
      },
      {
        id: 'cloudwatch-logs',
        text: 'CloudWatch Logs',
      },
    ],
    correctOptionIds: ['rds-or-aurora'],
    explanation:
      'RDS and Aurora are managed relational database services that preserve SQL, transaction, constraint, and join semantics.',
    strongestDistractor:
      'DynamoDB is strong for key-value and document workloads with known access patterns, but it is not selected for general relational joins.',
    whenToUse:
      'Use RDS or Aurora for relational semantics; use DynamoDB when key-based access patterns and horizontal managed scale fit the data model.',
    featureSelection: true,
    reference: {
      label: 'Relational and key-value database selection',
      path: 'modules/100-foundations/06-databases/must-know.md',
    },
  },
  {
    id: 'l100-021',
    level: 100,
    topic: 'Databases',
    type: 'single',
    prompt:
      'A shopping-cart service has simple key-based access, unpredictable traffic spikes, and no need for relational joins. Which choice best minimizes initial capacity planning?',
    options: [
      {
        id: 'dynamodb-on-demand',
        text: 'DynamoDB with on-demand capacity',
      },
      {
        id: 'rds-single-instance',
        text: 'A fixed-size single-instance RDS database',
      },
      {
        id: 'dynamodb-scan',
        text: 'DynamoDB with every request implemented as a table Scan',
      },
      {
        id: 'aurora-read-replica-only',
        text: 'An Aurora read replica without a writer',
      },
    ],
    correctOptionIds: ['dynamodb-on-demand'],
    explanation:
      'DynamoDB on-demand capacity fits unpredictable key-value traffic by charging per request without requiring an initial provisioned-throughput estimate.',
    strongestDistractor:
      'A fixed RDS instance can host data but retains capacity sizing and relational overhead that this access pattern does not require.',
    whenToUse:
      'Use DynamoDB on-demand for unknown or spiky key-value demand; still design partition keys and queries to avoid hot keys and broad scans.',
    featureSelection: true,
    reference: {
      label: 'DynamoDB access and capacity decisions',
      path: 'modules/100-foundations/06-databases/must-know.md',
    },
  },
  {
    id: 'l100-022',
    level: 100,
    topic: 'Databases',
    type: 'single',
    prompt:
      'A production RDS database needs automatic failover for an infrastructure failure. The main goal is availability, not read scaling. Which feature should be selected?',
    options: [
      {
        id: 'rds-multi-az',
        text: 'RDS Multi-AZ deployment',
      },
      {
        id: 'read-replica-only',
        text: 'An asynchronous read replica used as if it were synchronous standby capacity',
      },
      {
        id: 'manual-snapshot-only',
        text: 'A manual snapshot taken once',
      },
      {
        id: 'dynamodb-gsi',
        text: 'A DynamoDB global secondary index',
      },
    ],
    correctOptionIds: ['rds-multi-az'],
    explanation:
      'RDS Multi-AZ maintains standby capacity and supports managed failover. Read replicas primarily scale reads and may lag.',
    strongestDistractor:
      'A read replica can improve read throughput, but its asynchronous replication and promotion model are not the primary Multi-AZ availability mechanism.',
    whenToUse:
      'Use Multi-AZ for RDS high availability and read replicas for read scaling; combine them only when both requirements exist.',
    featureSelection: true,
    reference: {
      label: 'RDS availability and read scaling',
      path: 'modules/100-foundations/06-databases/must-know.md',
    },
  },
  {
    id: 'l100-023',
    level: 100,
    topic: 'Observability and governance',
    type: 'single',
    prompt:
      'An operator needs an alert when EC2 CPU utilization remains high for ten minutes. Which service directly provides the metric and alarm?',
    options: [
      {
        id: 'cloudwatch-alarm',
        text: 'Amazon CloudWatch',
      },
      {
        id: 'cloudtrail-events',
        text: 'AWS CloudTrail',
      },
      {
        id: 'aws-config-history',
        text: 'AWS Config',
      },
      {
        id: 'route53-record',
        text: 'Amazon Route 53',
      },
    ],
    correctOptionIds: ['cloudwatch-alarm'],
    explanation:
      'CloudWatch stores operational time-series metrics and evaluates alarms against metric thresholds over configured periods.',
    strongestDistractor:
      'CloudTrail records supported AWS API activity for auditing; it is not the source for continuous EC2 CPU metrics.',
    whenToUse:
      'Use CloudWatch for metrics, logs, dashboards, and alarms tied to actionable operational symptoms.',
    featureSelection: true,
    reference: {
      label: 'CloudWatch metric and alarm selection',
      path: 'modules/100-foundations/07-observability/must-know.md',
    },
  },
  {
    id: 'l100-024',
    level: 100,
    topic: 'Observability and governance',
    type: 'single',
    prompt:
      'A security analyst asks who changed a security group through an AWS API and when the call occurred. Which service should the analyst query first?',
    options: [
      {
        id: 'cloudtrail-audit',
        text: 'AWS CloudTrail',
      },
      {
        id: 'cloudwatch-cpu',
        text: 'A CloudWatch CPU utilization metric',
      },
      {
        id: 'config-compliance-only',
        text: 'Only an AWS Config compliance rule result',
      },
      {
        id: 'alb-access-log',
        text: 'An Application Load Balancer access log',
      },
    ],
    correctOptionIds: ['cloudtrail-audit'],
    explanation:
      'CloudTrail records supported account API activity, including the caller identity, event time, action, and request context needed for audit questions.',
    strongestDistractor:
      'AWS Config can show resource configuration history and compliance, but CloudTrail is the direct source for who made an API call and when.',
    whenToUse:
      'Use CloudTrail for control-plane audit questions; configure a durable trail or lake when bounded event history is insufficient.',
    featureSelection: true,
    reference: {
      label: 'CloudTrail audit-plane decision rule',
      path: 'modules/100-foundations/07-observability/must-know.md',
    },
  },
  {
    id: 'l100-025',
    level: 100,
    topic: 'Observability and governance',
    type: 'multiple',
    prompt:
      'A team must detect an EC2 performance problem and also identify resources that drift from an approved configuration. Which two service uses are correct? Select two options.',
    options: [
      {
        id: 'cloudwatch-performance',
        text: 'Use CloudWatch metrics and alarms for the EC2 performance signal',
      },
      {
        id: 'config-drift',
        text: 'Use AWS Config configuration history and rules for drift and compliance',
      },
      {
        id: 'cloudtrail-performance',
        text: 'Use CloudTrail as the primary source of continuous CPU utilization',
      },
      {
        id: 'config-application-logs',
        text: 'Use AWS Config as the application request log store',
      },
      {
        id: 'dashboard-pages',
        text: 'Assume a CloudWatch dashboard automatically pages an operator without an alarm action',
      },
    ],
    correctOptionIds: ['cloudwatch-performance', 'config-drift'],
    explanation:
      'CloudWatch handles operational metrics and alarms. AWS Config records supported resource configurations and evaluates them against desired-state rules for compliance.',
    strongestDistractor:
      'CloudTrail can reveal API activity related to a change, but it does not provide continuous host performance metrics.',
    whenToUse:
      'Use CloudWatch for runtime signals, CloudTrail for API auditing, and AWS Config for resource configuration history and compliance evaluation.',
    featureSelection: true,
    reference: {
      label: 'Observability signal selection',
      path: 'modules/100-foundations/07-observability/must-know.md',
    },
  },
]
