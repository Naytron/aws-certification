import type { QuizQuestion } from '../domain/quiz'

export const level200Questions: QuizQuestion[] = [
  {
    id: 'l200-001',
    level: 200,
    topic: 'High availability and failure isolation',
    type: 'single',
    prompt:
      'An order database must remain available after an Availability Zone failure. Read traffic is modest, and the application needs automatic database failover without changing its connection endpoint. Which design best meets the requirement?',
    options: [
      {
        id: 'multi-az',
        text: 'Use an RDS Multi-AZ deployment and connect through the RDS endpoint.',
      },
      {
        id: 'read-replica',
        text: 'Create one cross-AZ read replica and direct all traffic to the replica.',
      },
      {
        id: 'snapshots',
        text: 'Take hourly RDS snapshots and restore the newest snapshot after a failure.',
      },
      {
        id: 'larger-instance',
        text: 'Move the database to a larger instance in its current Availability Zone.',
      },
    ],
    correctOptionIds: ['multi-az'],
    explanation:
      'RDS Multi-AZ is designed for high availability and managed failover to a standby in another Availability Zone while retaining the database endpoint. Read replicas primarily scale reads and are not a substitute for the synchronous standby behavior required here.',
    strongestDistractor:
      'A cross-AZ read replica sounds resilient, but replication is asynchronous and promotion is a separate recovery action rather than the requested automatic Multi-AZ failover.',
    whenToUse:
      'Use RDS Multi-AZ when a relational workload needs zonal failure protection and managed failover; use read replicas when the primary requirement is read scaling.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - High availability and failure isolation',
      path: 'modules/200-associate-architecture/01-ha-failure-isolation/must-know.md',
    },
  },
  {
    id: 'l200-002',
    level: 200,
    topic: 'High availability and failure isolation',
    type: 'single',
    prompt:
      'A stateless web tier runs six EC2 instances in one Availability Zone behind an Application Load Balancer. The business requires the tier to tolerate loss of that zone. What should the architect change?',
    options: [
      {
        id: 'multi-az-asg',
        text: 'Place an Auto Scaling group across at least two Availability Zones and register its instances with the load balancer.',
      },
      {
        id: 'single-az-scale',
        text: 'Increase the Auto Scaling group maximum size while keeping every instance in the current zone.',
      },
      {
        id: 'dns-instances',
        text: 'Create Route 53 records for each individual instance and remove the load balancer.',
      },
      {
        id: 'daily-ami',
        text: 'Create a daily AMI of every instance and launch replacements after an outage.',
      },
    ],
    correctOptionIds: ['multi-az-asg'],
    explanation:
      'Spreading stateless capacity across independent Availability Zones removes the single-zone failure domain. The load balancer can stop routing to unhealthy targets, while Auto Scaling maintains desired healthy capacity.',
    strongestDistractor:
      'Adding more instances in one Availability Zone increases capacity but leaves all instances exposed to the same zonal failure.',
    whenToUse:
      'Use a multi-AZ Auto Scaling group behind a load balancer for stateless regional services that must continue through an Availability Zone failure.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - High availability and failure isolation',
      path: 'modules/200-associate-architecture/01-ha-failure-isolation/must-know.md',
    },
  },
  {
    id: 'l200-003',
    level: 200,
    topic: 'High availability and failure isolation',
    type: 'multiple',
    prompt:
      'A two-tier application must remain available during the loss of one Availability Zone in its home Region. Select exactly TWO design choices that directly address this requirement.',
    options: [
      {
        id: 'alb-multi-az',
        text: 'Run stateless application capacity in at least two Availability Zones behind an Application Load Balancer.',
      },
      {
        id: 'rds-multi-az',
        text: 'Use an RDS Multi-AZ deployment for the relational database.',
      },
      {
        id: 'single-az-large',
        text: 'Use fewer, larger application instances in one Availability Zone.',
      },
      {
        id: 'read-replica-only',
        text: 'Use only an asynchronous read replica and send writes to it if the primary fails.',
      },
      {
        id: 'cross-region-required',
        text: 'Create an active-active deployment in every AWS Region.',
      },
    ],
    correctOptionIds: ['alb-multi-az', 'rds-multi-az'],
    explanation:
      'A multi-AZ application fleet and an RDS Multi-AZ database isolate both tiers from a single Availability Zone failure. Multi-Region active-active is unnecessary for a zonal requirement and adds consistency, routing, and cost complexity.',
    strongestDistractor:
      'An asynchronous read replica can help with read scaling or a planned promotion, but it does not provide the managed synchronous failover behavior of RDS Multi-AZ.',
    whenToUse:
      'Use multi-AZ resources for zonal availability; introduce multi-Region recovery only when the stated failure scope and RTO/RPO require Regional continuity.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - High availability and failure isolation',
      path: 'modules/200-associate-architecture/01-ha-failure-isolation/must-know.md',
    },
  },
  {
    id: 'l200-004',
    level: 200,
    topic: 'Edge and DNS',
    type: 'single',
    prompt:
      'A global gaming service uses TCP and UDP, needs two static anycast IP addresses, and must quickly shift users between healthy Regional endpoints. It does not need content caching. Which service should it use?',
    options: [
      {
        id: 'global-accelerator',
        text: 'AWS Global Accelerator',
      },
      {
        id: 'cloudfront',
        text: 'Amazon CloudFront',
      },
      {
        id: 'route53-weighted',
        text: 'Route 53 weighted routing with a long TTL',
      },
      {
        id: 's3-transfer',
        text: 'S3 Transfer Acceleration',
      },
    ],
    correctOptionIds: ['global-accelerator'],
    explanation:
      'Global Accelerator provides static anycast IP addresses, supports TCP and UDP listeners, and routes traffic over the AWS global network to healthy endpoints. CloudFront is an HTTP content delivery network and is not a general UDP accelerator.',
    strongestDistractor:
      'CloudFront accelerates and caches HTTP-based content, but it does not satisfy the UDP listener or static anycast endpoint requirement.',
    whenToUse:
      'Use Global Accelerator for static anycast IPs, non-HTTP acceleration, and rapid endpoint health failover; use CloudFront when edge caching and HTTP delivery are central.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - Edge and DNS',
      path: 'modules/200-associate-architecture/02-edge-dns/must-know.md',
    },
  },
  {
    id: 'l200-005',
    level: 200,
    topic: 'Edge and DNS',
    type: 'single',
    prompt:
      'A company has a primary public application endpoint in one Region and a standby endpoint in another. It wants DNS to return the standby only when health checks mark the primary unhealthy. Which Route 53 routing policy fits?',
    options: [
      {
        id: 'failover',
        text: 'Failover routing',
      },
      {
        id: 'weighted',
        text: 'Weighted routing',
      },
      {
        id: 'geolocation',
        text: 'Geolocation routing',
      },
      {
        id: 'multivalue',
        text: 'Multivalue answer routing',
      },
    ],
    correctOptionIds: ['failover'],
    explanation:
      'Failover routing models primary and secondary endpoints and uses health evaluation to decide when the secondary answer should be returned. DNS caching still means recovery time is influenced by TTLs and client behavior.',
    strongestDistractor:
      'Weighted routing distributes DNS answers according to configured weights; it does not by itself express a primary-standby relationship.',
    whenToUse:
      'Use Route 53 failover routing for DNS-level active-passive endpoint selection, while accounting for resolver caching in the recovery design.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - Edge and DNS',
      path: 'modules/200-associate-architecture/02-edge-dns/must-know.md',
    },
  },
  {
    id: 'l200-006',
    level: 200,
    topic: 'Edge and DNS',
    type: 'multiple',
    prompt:
      'A team serves private static assets from an S3 bucket through CloudFront and wants strong origin isolation plus efficient caching. Select exactly TWO appropriate design choices.',
    options: [
      {
        id: 'oac-private-bucket',
        text: 'Block S3 public access and use CloudFront Origin Access Control with a bucket policy that permits the distribution.',
      },
      {
        id: 'minimal-cache-key',
        text: 'Forward only the headers, cookies, and query strings that the origin actually requires.',
      },
      {
        id: 'public-website-oac',
        text: 'Make the S3 website endpoint public and attach Origin Access Control to that website endpoint.',
      },
      {
        id: 'forward-all',
        text: 'Forward every viewer header and cookie to maximize the CloudFront cache hit ratio.',
      },
      {
        id: 'route53-private-assets',
        text: 'Replace CloudFront with Route 53 because DNS records can authorize access to S3 objects.',
      },
    ],
    correctOptionIds: ['oac-private-bucket', 'minimal-cache-key'],
    explanation:
      'Origin Access Control works with an S3 REST origin so the bucket can remain private, and a narrowly defined cache key improves cache reuse without mixing responses that must differ. S3 website endpoints do not support Origin Access Control.',
    strongestDistractor:
      'A public S3 website endpoint may serve content, but pairing it with Origin Access Control is invalid and forfeits the intended private-origin boundary.',
    whenToUse:
      'Use CloudFront with a private S3 REST origin and Origin Access Control for controlled global object delivery; avoid forwarding request dimensions that do not affect the response.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - Edge and DNS',
      path: 'modules/200-associate-architecture/02-edge-dns/must-know.md',
    },
  },
  {
    id: 'l200-007',
    level: 200,
    topic: 'Serverless API architecture',
    type: 'single',
    prompt:
      'A startup needs a low-cost API Gateway endpoint backed by Lambda. It needs JWT authorization and standard HTTP routing, but not API keys, usage plans, request validation, or complex transformations. Which API type is the best fit?',
    options: [
      {
        id: 'http-api',
        text: 'API Gateway HTTP API',
      },
      {
        id: 'rest-api',
        text: 'API Gateway REST API',
      },
      {
        id: 'websocket-api',
        text: 'API Gateway WebSocket API',
      },
      {
        id: 'alb-ec2',
        text: 'Application Load Balancer with a permanently running EC2 proxy',
      },
    ],
    correctOptionIds: ['http-api'],
    explanation:
      'HTTP APIs support the required routing and JWT authorization with fewer features and generally lower cost than REST APIs. The richer REST API feature set is unnecessary for this scenario.',
    strongestDistractor:
      'A REST API can satisfy the functional requirements, but paying for its richer feature set is not justified when none of those features is needed.',
    whenToUse:
      'Use API Gateway HTTP APIs for straightforward, cost-sensitive HTTP endpoints; choose REST APIs when features such as usage plans, request validation, or advanced transformations are required.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - Serverless API architecture',
      path: 'modules/200-associate-architecture/03-serverless-api/must-know.md',
    },
  },
  {
    id: 'l200-008',
    level: 200,
    topic: 'Serverless API architecture',
    type: 'single',
    prompt:
      'An API request starts video analysis that normally takes 12 minutes and can be retried safely. Clients need a response within two seconds. Which architecture is most appropriate?',
    options: [
      {
        id: 'async-queue',
        text: 'Validate the request, enqueue a job, return HTTP 202 with a job identifier, and process the job asynchronously.',
      },
      {
        id: 'sync-lambda',
        text: 'Keep the API request open while one Lambda invocation completes all analysis.',
      },
      {
        id: 'api-timeout',
        text: 'Increase only the API Gateway integration timeout to 20 minutes.',
      },
      {
        id: 'client-retry',
        text: 'Return an error immediately and ask every client to retry the full analysis request.',
      },
    ],
    correctOptionIds: ['async-queue'],
    explanation:
      'A durable asynchronous job boundary separates the short API response from long processing and allows controlled retries and scaling. A synchronous Lambda/API invocation should not own a human-scale workflow.',
    strongestDistractor:
      'A long synchronous Lambda invocation conflicts with the response-time requirement and couples client availability to the entire processing duration.',
    whenToUse:
      'Use an asynchronous queue or workflow when work outlives an interactive request; reserve synchronous Lambda integrations for bounded work that fits end-to-end latency and timeout limits.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - Serverless API architecture',
      path: 'modules/200-associate-architecture/03-serverless-api/must-know.md',
    },
  },
  {
    id: 'l200-009',
    level: 200,
    topic: 'Serverless API architecture',
    type: 'single',
    prompt:
      'A Lambda function reads only from DynamoDB and calls a public third-party API. A reviewer proposes placing it in private VPC subnets to improve security. The VPC has no NAT gateway or relevant endpoints. What is the best response?',
    options: [
      {
        id: 'stay-outside-vpc',
        text: 'Keep the function outside the VPC unless it needs private VPC resources, and enforce least privilege with its execution role.',
      },
      {
        id: 'private-subnet-internet',
        text: 'Place it in private subnets because Lambda automatically receives internet access there.',
      },
      {
        id: 'public-subnet-ip',
        text: 'Place it in a public subnet because Lambda automatically receives a public IP address.',
      },
      {
        id: 'open-role',
        text: 'Place it in the VPC and grant its execution role administrator permissions to restore connectivity.',
      },
    ],
    correctOptionIds: ['stay-outside-vpc'],
    explanation:
      'VPC attachment is needed when a function must reach private VPC resources. Subnet placement alone does not give Lambda a public IP or internet route, so this change would break the third-party call without adding NAT or another deliberate egress path.',
    strongestDistractor:
      'Private subnet placement sounds more secure, but it does not automatically provide internet access and would introduce networking cost and complexity without a private-resource requirement.',
    whenToUse:
      'Attach Lambda to a VPC for required private connectivity; avoid doing so as a generic security control when managed-service and public endpoint access already meets the design.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - Serverless API architecture',
      path: 'modules/200-associate-architecture/03-serverless-api/must-know.md',
    },
  },
  {
    id: 'l200-010',
    level: 200,
    topic: 'Messaging and workflows',
    type: 'single',
    prompt:
      'A checkout service must absorb bursts of fulfillment jobs. Any available worker may process each job, workers need durable buffering during outages, and duplicate delivery is acceptable if workers are idempotent. Which service is the best foundation?',
    options: [
      {
        id: 'sqs-standard',
        text: 'Amazon SQS Standard queue',
      },
      {
        id: 'sns-only',
        text: 'One Amazon SNS topic with direct HTTP subscriptions only',
      },
      {
        id: 'eventbridge-schedule',
        text: 'An EventBridge scheduled rule that polls the checkout database',
      },
      {
        id: 'step-functions-queue',
        text: 'A Step Functions state machine used as a general-purpose competing-consumer queue',
      },
    ],
    correctOptionIds: ['sqs-standard'],
    explanation:
      'SQS provides durable buffering and competing-consumer delivery so workers can scale independently from producers. Standard queues are at-least-once, so idempotent processing is part of the design.',
    strongestDistractor:
      'SNS provides push-based fan-out, but direct HTTP subscriptions do not provide the same durable competing-consumer buffer for offline workers.',
    whenToUse:
      'Use SQS to buffer work for pull-based competing consumers; use SNS when one publication must be pushed to multiple subscribers.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - Messaging and workflows',
      path: 'modules/200-associate-architecture/04-messaging-workflows/must-know.md',
    },
  },
  {
    id: 'l200-011',
    level: 200,
    topic: 'Messaging and workflows',
    type: 'multiple',
    prompt:
      'An online store emits an OrderPlaced event. Billing and fulfillment each require independent durable backpressure, while an audit target should receive only events whose total exceeds a threshold using content-based rules. Select exactly TWO design choices.',
    options: [
      {
        id: 'sns-sqs-fanout',
        text: 'Publish to SNS and subscribe a separate SQS queue for billing and for fulfillment.',
      },
      {
        id: 'eventbridge-filter',
        text: 'Send events to EventBridge and use an event pattern to route high-value orders to the audit target.',
      },
      {
        id: 'one-shared-queue',
        text: 'Put every event in one SQS queue consumed competitively by billing, fulfillment, and audit.',
      },
      {
        id: 'sns-offline-http',
        text: 'Use only direct SNS HTTP subscriptions and assume SNS buffers each unavailable subscriber indefinitely.',
      },
      {
        id: 'step-functions-bus',
        text: 'Use a Step Functions state machine as the shared event bus for all producers.',
      },
    ],
    correctOptionIds: ['sns-sqs-fanout', 'eventbridge-filter'],
    explanation:
      'SNS fan-out to separate queues gives billing and fulfillment isolated retries and backpressure. EventBridge event patterns provide content-based routing for the audit requirement. A single competing-consumer queue would deliver each message to only one consumer path.',
    strongestDistractor:
      'One shared SQS queue provides durable buffering, but competing consumers divide messages rather than giving each business function its own copy.',
    whenToUse:
      'Use SNS for pub-sub fan-out, SQS for durable consumer isolation, and EventBridge when routing events by content across loosely coupled producers and targets.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - Messaging and workflows',
      path: 'modules/200-associate-architecture/04-messaging-workflows/must-know.md',
    },
  },
  {
    id: 'l200-012',
    level: 200,
    topic: 'Messaging and workflows',
    type: 'single',
    prompt:
      'A claims process must call several services in sequence, branch on results, wait up to three days for human approval, retry transient failures, and preserve an execution history. Which service best coordinates the process?',
    options: [
      {
        id: 'sfn-standard',
        text: 'AWS Step Functions Standard Workflows',
      },
      {
        id: 'sqs-delay',
        text: 'A single SQS delay queue with no workflow state store',
      },
      {
        id: 'sns-chain',
        text: 'A chain of SNS topics whose subscribers infer the current step',
      },
      {
        id: 'lambda-loop',
        text: 'One Lambda invocation that sleeps while awaiting human approval',
      },
    ],
    correctOptionIds: ['sfn-standard'],
    explanation:
      'Step Functions Standard Workflows coordinate durable, auditable, long-running state transitions with branching, waits, retries, and error handling. A queue transports work but does not by itself model the complete workflow state.',
    strongestDistractor:
      'SQS can decouple individual steps, but one queue alone does not provide the explicit branching, multi-day wait state, or end-to-end execution history requested.',
    whenToUse:
      'Use Step Functions Standard for durable orchestration with long waits and execution history; use queues to buffer independent units of work rather than represent the whole process.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - Messaging and workflows',
      path: 'modules/200-associate-architecture/04-messaging-workflows/must-know.md',
    },
  },
  {
    id: 'l200-013',
    level: 200,
    topic: 'Container architecture',
    type: 'single',
    prompt:
      'A small team has several long-running Linux containers, wants AWS-native orchestration, and does not want to patch or scale container hosts. It has no Kubernetes requirement. Which platform best fits?',
    options: [
      {
        id: 'ecs-fargate',
        text: 'Amazon ECS services on AWS Fargate',
      },
      {
        id: 'eks-ec2',
        text: 'Amazon EKS with self-managed EC2 worker nodes',
      },
      {
        id: 'ecs-ec2',
        text: 'Amazon ECS on a fixed EC2 cluster managed by the team',
      },
      {
        id: 'lambda-image',
        text: 'Lambda container images for continuously running processes',
      },
    ],
    correctOptionIds: ['ecs-fargate'],
    explanation:
      'ECS on Fargate provides AWS-native container orchestration without requiring the team to manage EC2 hosts. EKS adds Kubernetes control-plane and operational complexity that the requirements do not justify.',
    strongestDistractor:
      'EKS can run the containers, but Kubernetes is not a requirement and its additional platform cost and operations conflict with the request for simplicity.',
    whenToUse:
      'Use ECS on Fargate for managed, long-running containers without host administration; choose EKS only when Kubernetes APIs or ecosystem compatibility are real requirements.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - Container architecture and selection',
      path: 'modules/200-associate-architecture/05-containers/must-know.md',
    },
  },
  {
    id: 'l200-014',
    level: 200,
    topic: 'Container architecture',
    type: 'single',
    prompt:
      'A platform team must deploy an existing application that depends on Kubernetes custom resource definitions, admission controllers, and standard Kubernetes tooling. Which AWS service is the most direct fit?',
    options: [
      {
        id: 'eks',
        text: 'Amazon EKS',
      },
      {
        id: 'ecs',
        text: 'Amazon ECS because every container workload should avoid Kubernetes',
      },
      {
        id: 'lambda',
        text: 'AWS Lambda because a container image can be used as a function package',
      },
      {
        id: 'app-runner',
        text: 'AWS App Runner with no changes to the Kubernetes resources',
      },
    ],
    correctOptionIds: ['eks'],
    explanation:
      'EKS provides managed Kubernetes control planes and compatibility with Kubernetes APIs needed by the existing custom resources and tooling. The requirement justifies the added Kubernetes operational responsibility.',
    strongestDistractor:
      'ECS is simpler for AWS-native orchestration, but it does not execute Kubernetes custom resources or admission controllers.',
    whenToUse:
      'Use EKS when Kubernetes compatibility is a hard requirement; avoid selecting it merely because the workload is packaged in containers.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - Container architecture and selection',
      path: 'modules/200-associate-architecture/05-containers/must-know.md',
    },
  },
  {
    id: 'l200-015',
    level: 200,
    topic: 'Container architecture',
    type: 'multiple',
    prompt:
      'An ECS service on Fargate pulls a private image from ECR, sends logs to CloudWatch, and the application reads one secret from Secrets Manager at runtime. Select exactly TWO correct IAM design choices.',
    options: [
      {
        id: 'execution-role',
        text: 'Grant the task execution role the permissions needed by the ECS agent to pull the image and deliver logs.',
      },
      {
        id: 'task-role',
        text: 'Grant the task role narrowly scoped permission for the application to read the required secret.',
      },
      {
        id: 'one-admin-role',
        text: 'Use one administrator role for both the ECS agent and application code.',
      },
      {
        id: 'bake-secret',
        text: 'Store the secret in the container image so no runtime permission is needed.',
      },
      {
        id: 'host-profile',
        text: 'Attach an EC2 instance profile to each Fargate task.',
      },
    ],
    correctOptionIds: ['execution-role', 'task-role'],
    explanation:
      'The execution role serves ECS agent operations such as image pulls and log delivery, while the task role supplies application code with AWS permissions. Separating them preserves least privilege and the correct trust boundary.',
    strongestDistractor:
      'A single administrator role may make both paths work, but it combines distinct responsibilities and grants far more access than either path needs.',
    whenToUse:
      'Use separate ECS execution and task roles, granting each only the control-plane or application permissions it requires.',
    featureSelection: false,
    reference: {
      label: 'Level 200 - Container architecture and selection',
      path: 'modules/200-associate-architecture/05-containers/must-know.md',
    },
  },
  {
    id: 'l200-016',
    level: 200,
    topic: 'Database and storage decisions',
    type: 'single',
    prompt:
      'A commerce system requires multi-row transactions, relational constraints, and frequent joins across customer, order, and payment records. Traffic is predictable. Which data service is the strongest starting point?',
    options: [
      {
        id: 'rds-aurora',
        text: 'Amazon RDS or Amazon Aurora with a suitable relational engine',
      },
      {
        id: 'dynamodb',
        text: 'Amazon DynamoDB without redesigning the relational access patterns',
      },
      {
        id: 's3-json',
        text: 'JSON documents in Amazon S3 as the transactional system of record',
      },
      {
        id: 'elasticache',
        text: 'Amazon ElastiCache as the only durable data store',
      },
    ],
    correctOptionIds: ['rds-aurora'],
    explanation:
      'A relational database directly supports the required transactions, joins, and constraints. DynamoDB is a strong key-value and document choice when access patterns are modeled for it, not a drop-in substitute chosen only to avoid database administration.',
    strongestDistractor:
      'DynamoDB can support transactions and high scale, but this scenario is dominated by relational joins and constraints and provides no access-pattern reason to remodel for DynamoDB.',
    whenToUse:
      'Use RDS or Aurora for relational semantics and joins; use DynamoDB for known key-based access patterns that benefit from managed horizontal scale.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - Database, analytics, and storage decisions',
      path: 'modules/200-associate-architecture/06-data-decisions/must-know.md',
    },
  },
  {
    id: 'l200-017',
    level: 200,
    topic: 'Database and storage decisions',
    type: 'single',
    prompt:
      'A fleet of Linux EC2 instances across multiple Availability Zones must concurrently mount the same shared directory using POSIX file-system semantics. Which storage service is the best fit?',
    options: [
      {
        id: 'efs',
        text: 'Amazon EFS',
      },
      {
        id: 'ebs',
        text: 'One Amazon EBS volume attached to every instance across Availability Zones',
      },
      {
        id: 's3',
        text: 'Amazon S3 treated as a drop-in POSIX file system',
      },
      {
        id: 'instance-store',
        text: 'EC2 instance store synchronized only when instances terminate',
      },
    ],
    correctOptionIds: ['efs'],
    explanation:
      'EFS is a managed shared file system that supports concurrent NFS access from compute across Availability Zones in a Region. S3 provides object semantics, while EBS is block storage and is generally tied to an Availability Zone.',
    strongestDistractor:
      'S3 is highly durable and shared, but its object API does not provide the required POSIX file-system semantics.',
    whenToUse:
      'Use EFS for shared file access, EBS for low-latency block storage, and S3 for durable object storage and data lakes.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - Database, analytics, and storage decisions',
      path: 'modules/200-associate-architecture/06-data-decisions/must-know.md',
    },
  },
  {
    id: 'l200-018',
    level: 200,
    topic: 'Database and analytics decisions',
    type: 'multiple',
    prompt:
      'Analysts run occasional Athena queries over several terabytes of application logs in S3. The team wants to reduce bytes scanned without operating a persistent cluster. Select exactly TWO changes that usually help.',
    options: [
      {
        id: 'columnar-compressed',
        text: 'Convert the data to a compressed columnar format such as Parquet.',
      },
      {
        id: 'partition',
        text: 'Partition data by fields commonly used to limit queries, such as date.',
      },
      {
        id: 'select-star',
        text: 'Rewrite every query to select all columns.',
      },
      {
        id: 'single-file',
        text: 'Combine all years and sources into one unpartitioned text object.',
      },
      {
        id: 'redshift-required',
        text: 'Move immediately to a continuously provisioned warehouse solely because the data is in terabytes.',
      },
    ],
    correctOptionIds: ['columnar-compressed', 'partition'],
    explanation:
      'Compressed columnar formats let Athena read fewer relevant bytes, and effective partitioning prunes data outside query filters. These optimizations preserve the serverless query model for occasional analysis.',
    strongestDistractor:
      'A provisioned warehouse may suit sustained analytic workloads, but data volume alone does not justify persistent capacity when queries are occasional and Athena can be optimized.',
    whenToUse:
      'Use Athena for ad hoc SQL over S3 and optimize file format, compression, partitions, and selected columns; consider a warehouse for sustained workloads needing its performance and management features.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - Database, analytics, and storage decisions',
      path: 'modules/200-associate-architecture/06-data-decisions/must-know.md',
    },
  },
  {
    id: 'l200-019',
    level: 200,
    topic: 'Storage cost decisions',
    type: 'single',
    prompt:
      'A company stores millions of small objects for 20 days. Most objects are read several times during the first two weeks and then deleted. What should the architect do before adding an S3 lifecycle transition to a colder class?',
    options: [
      {
        id: 'evaluate-economics',
        text: 'Compare access frequency, object size, retrieval charges, transition requests, and minimum storage duration for candidate classes.',
      },
      {
        id: 'deep-archive-day-one',
        text: 'Move every object to S3 Glacier Deep Archive on creation because it has the lowest storage rate.',
      },
      {
        id: 'transition-daily',
        text: 'Transition each object through every colder storage class once per day.',
      },
      {
        id: 'ebs-snapshot',
        text: 'Copy the objects into EBS snapshots so retrieval is always free.',
      },
    ],
    correctOptionIds: ['evaluate-economics'],
    explanation:
      'Storage class economics depend on more than the monthly storage rate. Frequent retrieval, small objects, transition requests, and minimum storage duration charges can make a colder class more expensive for short-lived, actively read data.',
    strongestDistractor:
      'Deep Archive has a low storage rate, but retrieval constraints and minimum-duration economics conflict with frequent access and deletion after only 20 days.',
    whenToUse:
      'Use S3 lifecycle transitions only after matching access frequency, retrieval requirements, object size, and retention duration to the target storage class.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - Database, analytics, and storage decisions',
      path: 'modules/200-associate-architecture/06-data-decisions/must-know.md',
    },
  },
  {
    id: 'l200-020',
    level: 200,
    topic: 'Backup and disaster recovery',
    type: 'single',
    prompt:
      'A noncritical internal reporting application can lose up to 24 hours of data and may remain unavailable for eight hours after a Regional disaster. The company wants the lowest standing recovery cost. Which strategy best fits?',
    options: [
      {
        id: 'backup-restore',
        text: 'Backup and restore with tested cross-Region copies and infrastructure automation',
      },
      {
        id: 'warm-standby',
        text: 'A continuously functional warm standby environment sized for rapid scaling',
      },
      {
        id: 'active-active',
        text: 'A full-capacity multi-Region active-active deployment',
      },
      {
        id: 'multi-az-only',
        text: 'A Multi-AZ deployment in only the original Region with no recoverable copy elsewhere',
      },
    ],
    correctOptionIds: ['backup-restore'],
    explanation:
      'Backup and restore has the lowest standing cost and can satisfy long RTO and RPO objectives when backups, infrastructure, dependencies, and restoration are tested. Warm standby and active-active spend more to achieve faster recovery than required.',
    strongestDistractor:
      'Warm standby offers a shorter RTO, but its continuously running secondary environment adds cost that this eight-hour objective does not justify.',
    whenToUse:
      'Use backup and restore for cost-sensitive workloads with hours-level recovery objectives; use standby or active-active approaches when shorter RTO demands ongoing readiness.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - Backup and disaster recovery',
      path: 'modules/200-associate-architecture/07-backup-dr/must-know.md',
    },
  },
  {
    id: 'l200-021',
    level: 200,
    topic: 'Backup and disaster recovery',
    type: 'multiple',
    prompt:
      'A business requires an RPO of 15 minutes and an RTO of two hours for a critical application. Select exactly TWO statements that correctly interpret these objectives.',
    options: [
      {
        id: 'rpo-loss',
        text: 'The protection design should limit acceptable data loss to at most about 15 minutes.',
      },
      {
        id: 'rto-restore',
        text: 'The complete service, including dependencies, should be restored and validated within two hours.',
      },
      {
        id: 'rpo-repair',
        text: 'The application must be repaired within 15 minutes.',
      },
      {
        id: 'rto-backup-frequency',
        text: 'A full backup must run exactly every two hours.',
      },
      {
        id: 'multi-az-proves-dr',
        text: 'Enabling Multi-AZ alone proves both objectives for any Regional disaster.',
      },
    ],
    correctOptionIds: ['rpo-loss', 'rto-restore'],
    explanation:
      'RPO expresses maximum acceptable data loss measured in time, while RTO expresses maximum acceptable restoration time for the service. Meeting them requires validating the whole recovery path, not merely configuring a database feature.',
    strongestDistractor:
      'Multi-AZ improves zonal availability, but it does not by itself provide Regional disaster recovery or prove that application dependencies meet the stated objectives.',
    whenToUse:
      'Use business-defined RPO and RTO to select backup frequency, replication, recovery strategy, and testing scope.',
    featureSelection: false,
    reference: {
      label: 'Level 200 - Backup and disaster recovery',
      path: 'modules/200-associate-architecture/07-backup-dr/must-know.md',
    },
  },
  {
    id: 'l200-022',
    level: 200,
    topic: 'Backup and disaster recovery',
    type: 'single',
    prompt:
      'A database is synchronously replicated for availability, but an operator accidentally deletes important records and the deletion reaches the replica. Which additional control best addresses this threat?',
    options: [
      {
        id: 'isolated-backups',
        text: 'Maintain versioned, access-controlled backups in an isolated vault and regularly test restores.',
      },
      {
        id: 'more-replicas',
        text: 'Add more live replicas that receive the same database changes.',
      },
      {
        id: 'longer-dns-ttl',
        text: 'Increase the application DNS TTL.',
      },
      {
        id: 'larger-primary',
        text: 'Increase the primary database instance size.',
      },
    ],
    correctOptionIds: ['isolated-backups'],
    explanation:
      'Live replication can copy corruption or accidental deletion. Isolated, versioned, access-controlled backups preserve a separate recovery point, and restore tests verify that it can meet the recovery objective.',
    strongestDistractor:
      'More live replicas improve read capacity or availability, but they can all receive the same destructive change and therefore do not create an isolated recovery point.',
    whenToUse:
      'Use replication for availability and isolated tested backups for recovery from corruption, deletion, compromise, and other failures replicated systems can propagate.',
    featureSelection: false,
    reference: {
      label: 'Level 200 - Backup and disaster recovery',
      path: 'modules/200-associate-architecture/07-backup-dr/must-know.md',
    },
  },
  {
    id: 'l200-023',
    level: 200,
    topic: 'Cost optimization',
    type: 'single',
    prompt:
      'A company has measured a steady baseline of compute usage across EC2, Fargate, and Lambda, but expects instance families and Regions to change. It can commit to a conservative amount of hourly compute spend. Which pricing option offers the most relevant flexibility?',
    options: [
      {
        id: 'compute-savings-plan',
        text: 'Compute Savings Plans',
      },
      {
        id: 'spot-only',
        text: 'Spot Instances for the entire baseline regardless of interruption tolerance',
      },
      {
        id: 'on-demand-only',
        text: 'On-Demand pricing for the entire measured baseline forever',
      },
      {
        id: 'instance-sp-specific',
        text: 'An EC2 Instance Savings Plan tied to one instance family and Region',
      },
    ],
    correctOptionIds: ['compute-savings-plan'],
    explanation:
      'Compute Savings Plans apply a spend commitment with flexibility across eligible EC2 usage, Fargate, and Lambda. They fit a measured stable baseline when the exact compute service, family, or Region may change.',
    strongestDistractor:
      'An EC2 Instance Savings Plan may offer value for a stable specific footprint, but its narrower family and Region scope conflicts with the expected changes.',
    whenToUse:
      'Use Compute Savings Plans for a measured, stable compute-spend baseline needing broad flexibility; retain On-Demand for uncertain demand and Spot for interruption-tolerant capacity.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - Cost-optimized architecture',
      path: 'modules/200-associate-architecture/08-cost-optimization/must-know.md',
    },
  },
  {
    id: 'l200-024',
    level: 200,
    topic: 'Cost optimization',
    type: 'multiple',
    prompt:
      'A nightly rendering workload consists of independent jobs that checkpoint progress and can retry after interruption. Arrival volume varies, and some jobs have firm deadlines. Select exactly TWO cost-aware capacity choices.',
    options: [
      {
        id: 'spot-flexible',
        text: 'Use diversified Spot capacity for the interruption-tolerant portion of the workload.',
      },
      {
        id: 'on-demand-deadline',
        text: 'Use On-Demand capacity as a reliable supplement for deadline-sensitive or unmatched demand.',
      },
      {
        id: 'spot-singleton',
        text: 'Run the non-checkpointed scheduler as a singleton on Spot with no recovery mechanism.',
      },
      {
        id: 'commit-peak',
        text: 'Buy a long commitment for the highest observed nightly peak before measuring a stable baseline.',
      },
      {
        id: 'largest-instance',
        text: 'Choose the largest instance type solely because its hourly price is highest.',
      },
    ],
    correctOptionIds: ['spot-flexible', 'on-demand-deadline'],
    explanation:
      'Checkpointed, retryable rendering jobs are well suited to discounted Spot capacity, while On-Demand capacity can cover jobs whose deadlines cannot tolerate interruptions or unavailable Spot pools. Diversification reduces dependence on one capacity pool.',
    strongestDistractor:
      'Committing to peak demand can leave paid capacity idle because the nightly volume varies and no stable peak baseline has been established.',
    whenToUse:
      'Use Spot for fault-tolerant interruptible work, On-Demand for uncertain or interruption-sensitive demand, and commitments only for a measured conservative baseline.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - Cost-optimized architecture',
      path: 'modules/200-associate-architecture/08-cost-optimization/must-know.md',
    },
  },
  {
    id: 'l200-025',
    level: 200,
    topic: 'Compute and cost decisions',
    type: 'single',
    prompt:
      'A thumbnail service receives unpredictable bursts, each request finishes in under two seconds, and there is no need for a long-running process, custom host, or Kubernetes API. Which compute approach is the best starting point?',
    options: [
      {
        id: 'lambda',
        text: 'An event-driven Lambda function with appropriately configured concurrency and downstream protections',
      },
      {
        id: 'eks',
        text: 'A continuously running EKS cluster sized for the largest possible burst',
      },
      {
        id: 'ecs-ec2',
        text: 'A fixed ECS on EC2 fleet with no scaling',
      },
      {
        id: 'reserved-ec2',
        text: 'One Reserved Instance that serially processes every request',
      },
    ],
    correctOptionIds: ['lambda'],
    explanation:
      'Short, bursty, event-driven work fits Lambda constraints and avoids paying for idle container or instance capacity. The design must still account for concurrency, retries, and downstream limits rather than assuming unlimited scaling.',
    strongestDistractor:
      'A fixed container fleet can process thumbnails, but it creates idle cost and scaling operations without a long-running container requirement.',
    whenToUse:
      'Use Lambda for short event-driven work within its runtime constraints; use containers when workloads need long-lived processes, specialized runtimes, host control, or orchestration features.',
    featureSelection: true,
    reference: {
      label: 'Level 200 - Serverless API architecture',
      path: 'modules/200-associate-architecture/03-serverless-api/must-know.md',
    },
  },
]
