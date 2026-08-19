# Cleanup and Account Closure

## Cleanup is part of every lab

A lab is incomplete until its resources are removed and the account returns to the expected baseline.

## Standard deletion order

Delete dependents before dependencies. A common application order is:

1. Test data, object versions, and incomplete multipart uploads
2. Application deployments and event-source mappings
3. CloudFront distributions, API stages, and load balancer listeners
4. Auto Scaling groups, services, tasks, functions, and instances
5. Load balancers, target groups, and Elastic IP addresses
6. Databases, caches, and retained snapshots
7. EBS volumes, EFS file systems, S3 buckets, and log groups
8. NAT Gateways and VPC endpoints
9. Route tables, network interfaces, security groups, subnets, and VPCs
10. IAM roles and policies created only for the lab
11. CloudFormation stacks after retained or failed resources are handled

The exact order varies by service. Follow the module cleanup file.

## Prefer stack deletion

When a lab uses CloudFormation:

1. Empty resources that CloudFormation cannot delete automatically, such as non-empty versioned S3 buckets.
2. Delete the stack.
3. Wait for `DELETE_COMPLETE`.
4. Inspect any `DELETE_FAILED` event and remove the blocker.
5. Verify retained resources explicitly.

Never assume a failed stack deletion removed everything.

## Multi-Region sweep

The console Region selector can hide resources. After each lab:

- Check the course home Region.
- Check every additional Region named in the lab.
- Check global services such as IAM, Route 53, CloudFront, and S3.
- Inspect service-specific resources that often survive a workload:
  - EBS volumes and snapshots
  - Elastic IP addresses
  - NAT Gateways
  - Load balancers
  - RDS snapshots
  - CloudWatch log groups
  - Secrets
  - S3 object versions

Use the repository's read-only inventory script when available. It reports candidates; it does not delete resources.

## Test the cleanup process

After the infrastructure examples are present:

1. Deploy the smallest secure S3 baseline stack.
2. Validate the bucket configuration.
3. Remove any test objects and versions.
4. Delete the stack.
5. Confirm the bucket and stack no longer exist.
6. Recheck Billing and Free Tier usage.

Record the evidence with `templates/lab-evidence-template.md`.

## Free-plan end behavior

AWS currently states:

- The Free plan ends after six months or when credits are depleted, whichever comes first.
- The account closes automatically at that point unless upgraded.
- AWS retains content for 90 days before permanent deletion.
- Upgrading within the retention window restores access and applies remaining credits where eligible.

Do not use the learning account as the only home for code, diagrams, data, or certificates. Keep durable learning artifacts locally and keep secrets out of them.

## Deliberate upgrade decision

Before upgrading to a Paid plan:

1. Remove all unexpected resources.
2. Decide a personal monthly cost ceiling.
3. Confirm budgets and notifications.
4. Review services that were blocked on the Free plan.
5. Understand that pay-as-you-go charges can occur after credits are exhausted or where credits do not apply.
6. Record why the upgrade is needed.

Do not upgrade only to complete one risky lab. Prefer an AWS-managed sandbox when available.

## Closing the account manually

If you decide to close the account:

1. Export learning evidence that contains no secrets.
2. Delete workloads, data, snapshots, and custom domains.
3. Review every used Region and global service.
4. Review final bills and credits.
5. Follow the current AWS account-closure procedure while signed in with the required root credentials.
6. Keep access to the root email during the retention period.

## Completion gate

- You can explain dependency-safe deletion.
- You know which resources commonly survive a lab.
- You can find resources across Regions and global services.
- You know the Free-plan closure and retention behavior.
- A test deployment has been removed and verified.

## Official references

- [Closing an AWS account](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/close-account.html)
- [Choosing an AWS Free Tier plan](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html)
- [CloudFormation stack deletion](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-delete-stack.html)
