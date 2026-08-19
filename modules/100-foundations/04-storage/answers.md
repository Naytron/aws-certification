# Answer Key: Storage

**Level:** 100 | **Cost:** `DESIGN-ONLY`

## 1. A

**A. S3**

S3 stores and retrieves objects through APIs.
## 2. B

**B. EFS**

EFS provides managed shared file semantics.
## 3. A

**A. Accidental overwrite or deletion**

Prior versions and delete markers can be used for recovery.
## 4. A

**A. It changes storage handling, while recovery copies and isolation require separate design**

Transition/expiration policy does not alone satisfy backup isolation and recovery.
## 5. A

**A. S3 Block Public Access**

Block Public Access reduces accidental public exposure.
## 6. A

**A. Retrieval time and minimum storage duration**

Archive economics include retrieval and duration constraints.
## 7. B

**B. No; it is AZ-scoped**

EBS volumes reside in one AZ.
## 8. B

**B. All versions and delete markers**

A versioned bucket is not empty until versions and delete markers are removed.

## Review rule

A missed item is closed only after you can state the decision rule from memory, apply it to a new scenario, and reject the strongest distractor using a stated requirement.
