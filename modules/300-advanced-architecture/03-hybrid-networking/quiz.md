# Quiz: Hybrid Networking, Routing, DNS, and Segmentation

Closed-book. Select the best answer. Questions are original and scenario based.

## 1. What must be true for routed connectivity to work reliably?

A. Only a forward route exists
B. Forward and return paths, policy, and stateful inspection are coherent
C. DNS resolves somewhere
D. The VPCs use the same CIDR

## 2. Which pattern best exposes one service to an overlapping VPC?

A. Default route to production
B. Full route propagation
C. PrivateLink service endpoint
D. Larger peering mesh

## 3. Is Direct Connect encrypted by default?

A. Only for DNS
B. Only with one VIF
C. Yes, always
D. No; add an appropriate encryption control when required

## 4. What does a TGW attachment association control?

A. The VPC DNS suffix
B. KMS key rotation
C. BGP encryption
D. Which one TGW route table is used to route traffic entering from that attachment

## 5. Which is true path diversity?

A. Two VIFs on one physical DX connection
B. Two tunnels on one customer router only
C. Independent devices, facilities/providers, and paths with tested convergence
D. Two route-table entries

## 6. What commonly causes hybrid DNS loops?

A. BGP ASNs
B. Too many tags
C. Both sides forward the same namespace back to each other
D. Using private IPs

## 7. Why can centralized inspection increase cost?

A. It makes CIDRs larger
B. It removes logs
C. It disables budgets
D. Hairpin paths can add TGW processing and cross-AZ transfer

## 8. What is safest in the Free-plan course account?

A. Order Direct Connect
B. Perform local route/DNS/cost simulations
C. Create persistent endpoints
D. Deploy TGW and NAT Gateways

## 9. Which control prevents a propagated prefix from reaching a segment?

A. Intentional TGW route-table segmentation or blackhole where appropriate
B. A bucket policy
C. A larger ASN
D. A CloudWatch dashboard

## 10. For a five-minute connectivity RTO, what is essential?

A. Manual ticket escalation only
B. A diagram only
C. Independent paths, monitored health, automatic/operable convergence, and tests
D. One DX circuit

## Score

- 8/10 or better: pass, then explain every distractor you considered.
- Below 8/10: update the error log and retake with different challenge assumptions.
