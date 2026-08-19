# Shared CloudFormation baselines

These templates are small learning examples, not production landing-zone
templates. Review every resource before deployment.

## Cost and safety profile

| Template | Cost label | Creates | Intentionally omitted |
| --- | --- | --- | --- |
| `s3-secure-baseline.yaml` | `FREE-PLAN SAFE` for an empty learning bucket, subject to account limits | One encrypted S3 bucket and one deny-only bucket policy | Access logging, replication, KMS customer managed keys |
| `vpc-network-baseline.yaml` | `FREE-PLAN SAFE` for the network objects alone | One VPC, two subnets, route tables, and an internet gateway | NAT gateways, endpoints, compute, flow logs |

S3 requests, stored data, data transfer, and resources later placed in the VPC
can incur charges. A cost label is not a billing guarantee.

Both templates require the course tags `Course`, `Module`, `Owner`, and
`ExpiresAt`. `OwnerTag` and `ExpiresAtTag` have no defaults so that a learner
must choose them deliberately. `ExpiresAt` is tracking metadata; it does not
delete resources.

## PowerShell workflow

Run preflight before deployment:

```powershell
$Region = 'us-west-2'
$Owner = 'learner'
$ExpiresAt = (Get-Date).AddDays(7).ToString('yyyy-MM-dd')
& .\scripts\Invoke-CoursePreflight.ps1 -Region $Region
```

Validate a template with AWS after preflight:

```powershell
$TemplatePath = (Resolve-Path .\infrastructure\s3-secure-baseline.yaml).Path
aws cloudformation validate-template `
  --template-body "file://$TemplatePath" `
  --region $Region `
  --no-cli-pager
```

Deploy only after reviewing the change set or console preview. This example
uses an exact stack name and the required tracking values:

```powershell
aws cloudformation deploy `
  --stack-name aws-cert-s3-baseline `
  --template-file .\infrastructure\s3-secure-baseline.yaml `
  --parameter-overrides OwnerTag=$Owner ExpiresAtTag=$ExpiresAt `
  --tags Course=aws-solutions-architect Module=shared-tooling `
    Owner=$Owner ExpiresAt=$ExpiresAt `
  --region $Region `
  --no-cli-pager
```

For the VPC example, replace the template and stack names. Its public subnet
has an internet route but does not automatically assign public IPv4 addresses.
Its private subnet has no internet route.

## Cleanup discipline

Deletion is intentionally not automated here. Review the exact stack and its
resources, follow the lab cleanup instructions, and delete only that named
stack. Then run the read-only verification:

```powershell
& .\scripts\Test-CourseCleanup.ps1 `
  -Region $Region `
  -ModuleTag shared-tooling
```

The tagging API does not cover every billable resource. Also check the
CloudFormation console, service consoles used by the lab, and billing or usage
views. Do not paste account IDs or full resource ARNs into course evidence.
