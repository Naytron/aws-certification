# Answer Key: IAM, KMS, and Secrets

**Level:** 100 | **Cost:** `DESIGN-ONLY`

## 1. B

**B. Instance role**

An instance role supplies rotating temporary credentials.
## 2. B

**B. The explicit deny**

An explicit deny overrides applicable allows.
## 3. B

**B. Sets the maximum permissions an identity policy can grant**

A boundary limits effective permissions but does not grant them.
## 4. B

**B. Secrets Manager**

Secrets Manager supports rotation workflows and integrations.
## 5. B

**B. Key policy or grant may not permit the operation**

KMS authorization also depends on the key policy and grants.
## 6. B

**B. A temporary learning-account exception with MFA and no access key**

The account baseline explicitly does not normalize broad IAM admin as production practice.
## 7. B

**B. STS session variables**

Temporary credentials should not remain in the environment beyond the task.
## 8. B

**B. Exposure of underlying stored media/data without authorization**

Authorization remains necessary; encryption is one control layer.

## Review rule

A missed item is closed only after you can state the decision rule from memory, apply it to a new scenario, and reject the strongest distractor using a stated requirement.
