# Architecture Diagram Standard

A useful diagram explains a decision. It is not a collection of service icons.

## Required boundaries

Show when relevant:

- User, partner, and external-system boundaries
- AWS account and organizational-unit boundaries
- Region and Availability Zone boundaries
- VPC, subnet, and routing boundaries
- Public and private endpoints
- Identity and trust boundaries
- Data stores and data classification
- Synchronous, asynchronous, and management paths
- Failure and recovery boundaries

## Required annotations

Label:

- Protocol and port for important network paths
- Encryption in transit and at rest
- Authentication and authorization point
- Data direction
- Health checks and failover control
- RTO/RPO mechanism
- Scaling unit
- Logging and audit destination

## Separate views

Do not force all detail into one diagram. Use:

1. Context view - users, systems, and business flow
2. Deployment view - accounts, Regions, AZs, VPCs, and services
3. Request/data-flow view - protocol, trust, and data movement
4. Operations view - deployment, telemetry, response, and recovery

## Review questions

- Can a reviewer find the largest blast radius?
- Can a reviewer trace an authenticated request?
- Can a reviewer see where state survives a failure?
- Can a reviewer see which component initiates failover?
- Can a reviewer identify cross-AZ, cross-Region, and internet data paths?
- Can a reviewer connect every hard requirement to an architecture element?
