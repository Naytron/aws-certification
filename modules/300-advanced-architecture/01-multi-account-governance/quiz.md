# Quiz: Multi-Account Governance and Landing Zones

Closed-book. Select the best answer. Questions are original and scenario based.

## 1. A role allows s3:PutObject, but a parent OU SCP explicitly denies it. What is the result?

A. Allowed because identity policies grant it
B. Denied because an applicable explicit deny wins
C. Allowed if FullAWSAccess is attached
D. Allowed to the account root

## 2. What is the strongest reason to place unrelated production workloads in separate accounts?

A. Tags stop all cross-workload access
B. Accounts make all services cheaper
C. Accounts are authorization, quota, billing, and API blast-radius boundaries
D. OUs cannot contain VPCs

## 3. Where should routine delegated security administration occur?

A. A delegated security account
B. A public tooling account
C. The management account
D. Every workload root user

## 4. What does an SCP do?

A. Sets maximum available permissions in member accounts
B. Encrypts organization data
C. Replaces resource policies
D. Grants permissions to a role

## 5. What is safest before attaching a restrictive SCP broadly?

A. Apply at root immediately
B. Delete existing automation
C. Inventory APIs, simulate, canary, observe, then expand
D. Rely on the console warning

## 6. Which statement about OUs is correct?

A. They provide separate billing authority
B. They are runtime network boundaries
C. They should mirror every management reorganization
D. They group accounts for inherited policy and lifecycle

## 7. A Region-deny SCP blocks IAM. What was likely missed?

A. SCPs do not support denies
B. IAM only works in us-west-2
C. IAM is a global service needing an exception pattern
D. IAM requires a NAT Gateway

## 8. What makes a governance exception defensible?

A. Approver, scope, compensating control, evidence, and expiry
B. A broader allow SCP
C. Moving the account to root
D. A permanent administrator note

## 9. Why not enroll the course account in Control Tower?

A. It has no governance features
B. It automatically upgrades the Free plan and introduces managed resources/cost
C. It cannot use multiple accounts
D. It disables CloudTrail

## 10. Which acquisition sequence best limits blast radius?

A. Share root credentials
B. Move all accounts then discover
C. Inventory, transition OU, canary move, observe, promote by wave
D. Attach final denies before access exists

## Score

- 8/10 or better: pass, then explain every distractor you considered.
- Below 8/10: update the error log and retake with different challenge assumptions.
