# Answer Key: AWS Global Infrastructure and Well-Architected

**Level:** 100 | **Cost:** `DESIGN-ONLY`

## 1. B

**B. Availability Zone**

An AZ contains one or more discrete data centers with independent infrastructure.
## 2. B

**B. Compliance, latency, service availability, and resilience**

Hard business and technical constraints precede price.
## 3. C

**C. No; it addresses AZ failures**

A second Region is needed when the requirement covers a Regional disruption.
## 4. B

**B. IAM is primarily global**

IAM is primarily global, while VPC and EC2 are Regional.
## 5. A

**A. AZ letters can map differently by account**

AZ names are account-relative; AZ IDs identify the same physical AZ across accounts.
## 6. A

**A. Reliability**

Reliability includes recovery and dynamic resource acquisition.
## 7. B

**B. The customer**

AWS secures the cloud; customers secure their identities and configurations in the cloud.
## 8. B

**B. When explicit RTO/RPO, sovereignty, or latency requirements demand it**

Multi-Region adds cost and complexity and should answer a requirement.

## Review rule

A missed item is closed only after you can state the decision rule from memory, apply it to a new scenario, and reject the strongest distractor using a stated requirement.
