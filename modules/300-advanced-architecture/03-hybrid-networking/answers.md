# Answer key: Hybrid Networking, Routing, DNS, and Segmentation

## 1. B

Bidirectional route and security proof is required; asymmetric inspection can still break an apparently valid path.

## 2. C

PrivateLink provides service connectivity without broad routed adjacency or CIDR compatibility.

## 3. D

Private transport is not equivalent to encryption. MACsec/IPsec applicability must be assessed.

## 4. D

Association selects the TGW route table consulted for ingress from the attachment; propagation populates routes.

## 5. C

Redundancy must remove common physical and administrative failure domains.

## 6. C

Authority and conditional forwarding rules must terminate, not form a cycle.

## 7. D

Each processing hop and AZ boundary can create charges and capacity dependencies.

## 8. B

The listed enterprise network services can be expensive and are explicitly design-only here.

## 9. A

Association, propagation, static, and blackhole routes implement segmentation; monitoring alone does not block.

## 10. C

A numeric RTO must include detection, convergence, capacity, and validation across independent paths.

## Review method

For each miss, write the governing requirement, the decision rule, why your option failed, and one changed fact that would make it correct.
