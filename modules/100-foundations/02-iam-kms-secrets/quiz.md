# Quiz: IAM, KMS, and Secrets

**Level:** 100 | **SAA-C03:** Design Secure Architectures (primary); all domains

Take this closed-book. These are original retrieval questions, not copied exam items. Choose the best answer for the stated requirement.

## 1. What is preferred for an EC2 workload that calls S3?

A. IAM user access key in a file
B. Instance role
C. Root key
D. Shared password
## 2. What wins when one applicable policy explicitly denies an action?

A. Any allow
B. The explicit deny
C. The oldest policy
D. The resource tag
## 3. What does a permissions boundary do?

A. Grants administrator access
B. Sets the maximum permissions an identity policy can grant
C. Encrypts credentials
D. Rotates secrets
## 4. Which service is purpose-built for managed secret rotation?

A. KMS
B. Secrets Manager
C. CloudTrail
D. IAM Access Analyzer
## 5. Why can KMS still return AccessDenied after an IAM allow?

A. KMS is global
B. Key policy or grant may not permit the operation
C. Encryption is disabled
D. The AZ is wrong
## 6. What is the constrained bootstrap admin in this course?

A. Production standard
B. A temporary learning-account exception with MFA and no access key
C. Root daily access
D. Anonymous access
## 7. Which credential should be removed from shell state after role testing?

A. Region
B. STS session variables
C. Tag keys
D. Account alias
## 8. Encryption at rest primarily protects against what?

A. Every unauthorized API call
B. Exposure of underlying stored media/data without authorization
C. SQL injection
D. Missing MFA

## Scoring

Score one point each. Target 7/8 before continuing. For every miss, explain why your answer failed and why the best distractor is still wrong. Review [answers.md](answers.md) only after committing your choices.
