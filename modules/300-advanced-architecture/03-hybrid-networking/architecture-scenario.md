# Architecture scenario: Connect an overlapping acquisition to a regulated platform

## Business context

An enterprise must give an acquired application access to two payment APIs within 30 days. Its address space overlaps production, and enterprise policy prohibits route-level access to the payment VPC.

## Requirements

- Expose only two TLS services.
- No broad production routes reach the acquisition.
- Preserve client identity needed for authorization and audit.
- Meet 99.9% connectivity and a 30-minute restoration target.
- Provide a path to eventual network integration.

## Constraints

- Renumbering needs nine months.
- Transit Gateway and PrivateLink are design-only/paid.
- The acquisition DNS namespace conflicts with an internal suffix.

## Candidate approaches

### Approach A - full TGW propagation

Attach both VPCs and propagate all routes despite overlap.

### Approach B - PrivateLink service boundary

Publish the APIs through endpoint services, use explicit DNS names and application identity, and avoid routed adjacency.

### Approach C - internet allow list

Expose payment APIs publicly and rely only on acquisition egress IP allow lists.

## Decision

Choose B. PrivateLink provides service-level connectivity without exchanging overlapping routes. Preserve application identity at TLS/API layers, design multi-AZ endpoints, and maintain a separate renumbering roadmap.

## Tradeoff defense

- Endpoint and data-processing charges buy smaller network blast radius.
- Private DNS must be designed explicitly because conflicting names can misdirect clients.
- PrivateLink is not a replacement for application authorization or end-to-end observability.

## Distractor analysis

For each rejected option, cite the exact hard requirement it violates or the needless fixed cost, coupling, or operator burden it adds. A familiar service is not automatically the right architecture.

## Architecture review board questions

1. How is client/workload identity carried when network source addresses change?
2. Which components are zonal, Regional, or on premises?
3. How is endpoint capacity and health measured?
4. What is the failback path after DNS or endpoint failure?
5. When does continued endpoint cost exceed renumbering cost?

## Follow-up changes

- If broad east-west protocols are required, use translation/proxying as a bridge and prioritize renumbering.
- If the API can be public by policy, compare CloudFront/API Gateway with strong identity and WAF rather than IP allow lists alone.
