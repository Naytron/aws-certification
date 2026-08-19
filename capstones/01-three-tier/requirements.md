# Requirements

## Business context

A small retailer needs a product-catalog and order-status application. Public users read products; authenticated support staff update order status. The production system must support growth without redesign.

## Hard requirements

| Area | Requirement |
| --- | --- |
| Availability | Production request path continues through loss of one Availability Zone |
| Recovery | Target RTO 30 minutes and RPO 5 minutes for the production design |
| Scale | Stateless web/application tiers scale horizontally; read pressure can scale separately |
| Security | TLS, least privilege, private application/data tiers, no stored AWS keys, protected secrets, public access only through intended edge |
| Data | Relational integrity for production orders; encryption at rest and in transit; tested backups |
| Operations | Metrics, logs, alarms, health checks, deployment rollback, and traceable changes |
| Cost | Meet requirements with the fewest managed components; non-production capacity may scale to zero where supported |
| Governance | One home Region and required course tags |
| Cleanup | Every deployed resource is identifiable and removable without wildcard deletion |

## Production load assumptions

- 300 requests/second normal, 1,500 requests/second for 15-minute promotions.
- 90% reads.
- 2 TB database after three years.
- Static assets are globally consumed and cacheable.
- One Region is sufficient; multi-Region active-active is not justified by the RTO/RPO.

## Scaled-lab acceptance

The lab uses synthetic products only and no authentication secret. It must:

- Write and read one product through API Gateway -> Lambda -> DynamoDB.
- Return an application health response.
- Emit logs and Lambda error metrics.
- Demonstrate a reversible data-tier configuration fault.
- Apply required tags and short log retention.
- Be fully removed in the same session.

## Out of scope

- Payment data, customer PII, production DNS, email/SMS, Organizations, Control Tower, and real production traffic.
- Claiming that a single successful request proves production capacity or disaster recovery.
