# CLI and CloudFormation Safety

Use CloudShell for early labs so commands use temporary console-session credentials.

## Preflight

Run before every lab:

```powershell
aws sts get-caller-identity
aws configure get region
$env:AWS_REGION
$env:AWS_DEFAULT_REGION
```

Do not paste identity output into public notes.

If both Region environment variables are empty, pass `--region` explicitly or configure the course home Region before continuing.

## Prefer explicit names

Safe commands identify one known resource:

```powershell
aws cloudformation describe-stacks --stack-name course-storage-100 --region us-east-1
aws cloudformation delete-stack --stack-name course-storage-100 --region us-east-1
aws cloudformation wait stack-delete-complete --stack-name course-storage-100 --region us-east-1
```

Do not turn example names into broad loops that delete every resource in an account.

## Preview infrastructure changes

For meaningful CloudFormation updates:

1. Create a change set.
2. Inspect replacements, IAM changes, and removals.
3. Confirm the account and Region.
4. Execute only after understanding the change.

Use `CAPABILITY_NAMED_IAM` only when the template intentionally creates named IAM resources and you have reviewed them.

## Tag deployments

Pass course tags where the deployment command supports them:

```powershell
$Owner = 'learner'
$ExpiresAt = (Get-Date).ToUniversalTime().AddDays(1).ToString('yyyy-MM-dd')

aws cloudformation deploy `
  --template-file .\infrastructure\s3-secure-baseline.yaml `
  --stack-name course-storage-100 `
  --region us-east-1 `
  --parameter-overrides OwnerTag=$Owner ExpiresAtTag=$ExpiresAt `
  --tags Course=aws-solutions-architect Module=100-storage `
    Owner=$Owner ExpiresAt=$ExpiresAt `
  --no-cli-pager
```

Use a future `ExpiresAt` appropriate to the lab; the tag does not delete the resource automatically.

## Validate before deleting a stack

```powershell
aws cloudformation describe-stack-events `
  --stack-name course-storage-100 `
  --region us-east-1 `
  --max-items 20
```

After deletion, check for `DELETE_FAILED` and retained resources. Versioned S3 buckets and some data resources require explicit emptying or retention decisions.

## Credential rules

- Never place access keys in scripts, templates, command history, or repository files.
- Never create root access keys.
- Prefer roles and temporary credentials.
- Treat output containing account IDs, principal ARNs, endpoints, or resource policies as potentially sensitive.
- Redact evidence before storing it.
