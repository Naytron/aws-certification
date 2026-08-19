# Course PowerShell tools

These scripts support Windows PowerShell 5.1 and PowerShell 7. They do not
install tools, create resources, or delete resources.

| File | Purpose | AWS API behavior |
| --- | --- | --- |
| `Invoke-CoursePreflight.ps1` | Resolve and display the active CLI, identity, profile, and Region | Read-only STS call |
| `Get-CourseResourceInventory.ps1` | List resources carrying the course tags in one Region | Read-only Resource Groups Tagging API call |
| `Test-CourseCleanup.ps1` | Verify that no matching tagged resources or active course stacks remain | Read-only tagging and CloudFormation calls |
| `Test-CourseStructure.ps1` | Check shared files, module shape, lab conventions, links, and ASCII Markdown | Offline; AWS CLI is not needed |
| `CourseAwsContext.psm1` | Shared AWS CLI invocation and context helpers | Used by the AWS-facing scripts |

## Examples

```powershell
& .\scripts\Invoke-CoursePreflight.ps1 -Region us-west-2

& .\scripts\Get-CourseResourceInventory.ps1 `
  -Region us-west-2 `
  -ModuleTag shared-tooling

& .\scripts\Test-CourseCleanup.ps1 `
  -Region us-west-2 `
  -ModuleTag shared-tooling

& .\scripts\Test-CourseStructure.ps1
& .\scripts\Test-CourseStructure.ps1 -Strict
```

Add `-Profile profile-name` to an AWS-facing command when needed. If `-Region`
is omitted, the scripts check `AWS_REGION`, `AWS_DEFAULT_REGION`, and then the
selected AWS CLI profile. They stop with a clear error when AWS CLI, identity,
or Region cannot be resolved.

The inventory is deliberately tag-scoped. It does not prove that an account
has no billable resources. Cleanup verification never performs a delete and
fails when matching resources remain so that they must be reviewed by a
person.
