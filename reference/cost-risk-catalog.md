# Lab Cost-Risk Catalog

This catalog identifies common learning-account surprises. Pricing and Free Tier eligibility vary by Region and can change; always use the AWS Pricing pages and Billing console for current values.

| Resource or behavior | Why it is risky | Course default |
| --- | --- | --- |
| NAT Gateway | Hourly and data-processing charges continue while provisioned | Design-only unless a managed sandbox is used |
| Idle EC2 instance | Compute hours continue even if unused | Stop or terminate in the same session |
| Unattached EBS volume | Storage continues after an instance is terminated | Delete after checking data |
| Elastic IP address | Charges can apply depending on allocation/use | Release after the lab |
| Load balancer | Hourly/capacity charges continue | Ephemeral, then delete |
| RDS instance | Runs until stopped/deleted; storage and backups persist | Small ephemeral lab or design-only |
| RDS snapshot | Retained storage survives database deletion | Delete when evidence is complete |
| EKS cluster | Control-plane charges independent of worker use | Design-only or AWS-managed sandbox |
| OpenSearch domain | Persistent nodes and storage | Design-only or sandbox |
| MSK cluster | Persistent broker capacity | Design-only or sandbox |
| Transit Gateway | Attachment and data-processing costs | Route-table simulation by default |
| VPC interface endpoint | Per-AZ hourly and data charges | Create only when a lab explicitly budgets it |
| CloudWatch logs | Ingestion and retention can grow silently | Short retention and explicit log-group cleanup |
| S3 versioning | Old versions remain after normal deletion | Empty all versions before bucket removal |
| Data transfer | Cross-AZ, cross-Region, internet, and service paths differ | Trace data path before deployment |
| Route 53 hosted zone/domain | Hosted-zone and registration charges | No purchased domain required |
| Secrets Manager secret | Per-secret and API usage can continue | Delete with the intended recovery behavior |

## Pre-deployment questions

1. Does the service charge while idle?
2. Which dependent resources survive deletion?
3. Is data transfer chargeable on this path?
4. Is the feature available to the Free plan?
5. Can the concept be learned through a smaller or design-only exercise?
6. What exact observation proves cleanup?
