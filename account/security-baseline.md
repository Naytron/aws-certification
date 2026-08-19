# Security Baseline

## Goal

Protect the root user, stop using it for daily work, and establish a learning workflow that does not expose long-term credentials.

## 1. Protect the root user

Sign in as root only for this bootstrap and tasks that require root.

1. Set a strong unique password.
2. Register MFA. Prefer a passkey or FIDO2 security key; an authenticator app is the fallback.
3. Confirm account recovery email and phone access.
4. Add current security, operations, and billing alternate contacts.
5. Open the root security credentials page and confirm there are **no root access keys**.
6. Sign out when bootstrap is complete.

Never create root access keys for course work.

## 2. Create the daily administrative identity

AWS recommends federation and temporary credentials for human access. A standalone Free-plan learning account cannot use an organization-wide identity design without changing the account model. Use this constrained bootstrap pattern:

1. Create an IAM group named `CourseAdministrators`.
2. Attach the AWS managed `AdministratorAccess` policy to the group.
3. Create one named IAM user for yourself with console access.
4. Add the user to `CourseAdministrators`.
5. Do **not** create access keys for this user.
6. Register MFA for the user.
7. Create an account alias so the non-root sign-in URL is recognizable.
8. Sign out as root and verify the IAM user can sign in with MFA.

`AdministratorAccess` is intentionally broad for a temporary single-user lab account. It is not the production pattern. The IAM module replaces broad daily permissions with scoped roles, policy conditions, and least-privilege analysis.

## 3. Use temporary credentials for command-line work

Use AWS CloudShell from the authenticated console for early labs:

- CloudShell receives temporary credentials for the signed-in identity.
- No access key needs to be stored on the local computer.
- Confirm identity before every lab:

```powershell
aws sts get-caller-identity
aws configure get region
```

Do not paste the output into public notes because it contains the account ID and principal ARN.

If you later configure the local AWS CLI, use a temporary-credential or federation method taught in the IAM module. Do not create a long-term administrator access key merely for convenience.

## 4. Activate billing access deliberately

Some billing settings require root bootstrap:

1. As root, enable IAM access to Billing and Cost Management.
2. Sign out as root.
3. Verify the daily administrative user can reach the Billing console.

The daily user should perform normal budget and usage checks after bootstrap.

## 5. Define the course tagging standard

Every resource that supports tags must include:

| Key | Example | Purpose |
| --- | --- | --- |
| `Course` | `aws-solutions-architect` | Identifies course resources |
| `Module` | `100-ec2` | Connects the resource to a module |
| `Owner` | A non-sensitive alias | Establishes responsibility |
| `ExpiresAt` | A near-future UTC timestamp | Records intended removal |

Do not put email addresses, account numbers, secrets, or customer data in tags.

## 6. Set session rules

For every lab:

1. Confirm the signed-in identity.
2. Confirm the Region.
3. Read the cost label.
4. Read cleanup before deployment.
5. Apply required tags.
6. Keep secrets in purpose-built secret stores, never code or shell history.
7. Remove resources in the same study session unless the lab explicitly continues.
8. Recheck inventory and Billing after cleanup.

## 7. Optional security hardening

After the IAM module, add:

- A least-privilege course role for each service family
- IAM Access Analyzer policy validation
- Conditions restricting Regions and resource tags where supported
- A break-glass process for the bootstrap administrator
- Removal of unused permissions and credentials

Do not apply an untested deny policy to the only administrator.

## Completion gate

- Root MFA is enabled.
- No root access keys exist.
- Root is not used for daily work.
- The named daily user has MFA and no access keys.
- CloudShell can call `sts:GetCallerIdentity`.
- IAM access to billing is enabled.
- Required tags and session rules are recorded.

## Official references

- [AWS account root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html)
- [Security best practices in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [Tasks that require root user credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#root-user-tasks)
