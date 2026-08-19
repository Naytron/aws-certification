# Domain 1 - Design Secure Architectures (30%)

## What the domain tests

1. Secure access to AWS resources.
2. Secure workloads and applications.
3. Appropriate data security controls.

## Must-know facts

- Prefer federation, temporary credentials, roles, MFA, and least privilege over long-lived IAM user keys.
- Identity policies answer what a principal may do; resource policies answer who may access a resource. An explicit deny wins.
- An IAM role has no long-term credentials. AWS STS issues temporary credentials.
- SCPs set permission guardrails; they do not grant permissions. Avoid Organizations in the course Free plan because joining it upgrades the plan.
- Security groups are stateful and attach to resources; network ACLs are stateless subnet controls with ordered allow and deny rules.
- A public subnet has a route to an internet gateway. A public IP alone does not create a route, and a route alone does not grant access.
- Keep databases and application instances private. Expose only the intended entry point, normally CloudFront, API Gateway, or a load balancer.
- Use VPC endpoints for private service access when the requirement forbids internet traversal. Gateway endpoints cover S3 and DynamoDB; interface endpoints use PrivateLink.
- Use ACM certificates for supported integrated services and TLS in transit. Use KMS-backed encryption and restrictive key policies where key control or auditability is required.
- S3 Block Public Access, bucket policies, Object Ownership, versioning, and lifecycle rules solve different requirements.
- Secrets Manager fits managed secret rotation; Systems Manager Parameter Store fits configuration and secure strings when rotation is not required.
- WAF filters application-layer requests. Shield protects against DDoS; Shield Standard is included. GuardDuty detects suspicious activity; Macie discovers sensitive S3 data.
- Cognito provides application-user identity. IAM controls AWS API access.
- CloudTrail records API activity; CloudWatch supplies metrics, logs, alarms, and operational response.
- Backups must also be encrypted, access controlled, retained, and tested.

## Decision reasoning

1. Identify the principal: workforce, workload, customer, AWS service, or another account.
2. Identify the resource and trust boundary.
3. Grant only required actions, resources, conditions, and duration.
4. Select network reachability independently from authorization.
5. Select encryption ownership: AWS owned, AWS managed, or customer managed.
6. Add detective controls and recoverability.

## Plausible alternatives that fail

| Requirement | Best direction | Plausible failure |
| --- | --- | --- |
| EC2 reads one bucket without stored keys | Instance role plus scoped bucket access | IAM user access keys create rotation and exposure risk |
| Private S3 access | S3 gateway endpoint and endpoint/bucket policies | NAT reaches S3 but violates private-path and adds cost |
| Rotate database credentials | Secrets Manager rotation | An encrypted environment variable is still static |
| Block one SQL injection pattern | WAF rule | A network ACL cannot inspect HTTP request content |
| Cross-account delegated access | Role trust policy plus caller permission | Copying credentials loses attribution and temporary scope |

## Retrieval checks

Explain without notes:

1. Why an SCP cannot grant access.
2. Why a private subnet is not a security control by itself.
3. When a customer-managed KMS key is justified.
4. Why encryption does not replace authorization.

## Official references

- [SAA-C03 Domain 1](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain1.html)
- [IAM best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [VPC security groups](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html)
- [Protecting S3 data](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html)
