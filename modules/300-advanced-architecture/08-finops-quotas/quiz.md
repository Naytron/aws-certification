# Quiz: FinOps, Quotas, Commitments, and Portfolio Governance

Closed-book. Select the best answer. Questions are original and scenario based.

## 1. Which metric best normalizes useful business growth?

A. Total monthly spend only
B. Cost per successful business transaction
C. Number of accounts
D. Average discount

## 2. What should commitments usually cover?

A. DR maximum automatically
B. Forecast peak
C. Defensible stable baseline after known changes
D. All current usage before optimization

## 3. Why is average CPU insufficient for rightsizing?

A. AWS hides CPU
B. Only tags matter
C. CPU has no cost
D. Memory, network, storage, tail latency, queues, seasonality, and failover also constrain capacity

## 4. Are AWS Budgets hard real-time caps?

A. No, data/alerts can be delayed and do not automatically stop usage
B. Only for EC2
C. Only on Paid plans
D. Yes

## 5. What is a fair shared-cost driver?

A. Whatever is easiest
B. A measurable causal factor such as processed GB or requests
C. Equal split always
D. No allocation disclosure

## 6. When should rate optimization occur?

A. Never
B. Before understanding usage
C. After eliminating waste and choosing the target architecture, while modeling uncertainty
D. Only after an outage

## 7. Why include DR Region quotas?

A. Quotas affect only billing
B. They reserve capacity automatically
C. Quotas are identical everywhere
D. Recovery can fail if target Region lacks headroom despite valid templates

## 8. What should happen during a cost anomaly tied to a security event?

A. Coordinate security containment, preserve evidence, stop unsafe growth, and verify root cause
B. Ignore until invoice
C. Disable logging
D. Delete everything immediately

## 9. What cost can centralized inspection add?

A. Only licenses
B. Processing, cross-AZ, NAT/TGW, and hairpin transfer
C. No network cost
D. Only support plan

## 10. What makes a saving realized?

A. Resources are tagged
B. A recommendation exists
C. Change is deployed, SLOs validated, and normalized billing evidence confirms it
D. A dashboard turns green

## Score

- 8/10 or better: pass, then explain every distractor you considered.
- Below 8/10: update the error log and retake with different challenge assumptions.
