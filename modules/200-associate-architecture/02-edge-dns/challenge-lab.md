# Challenge Lab - DNS and cache-policy plan

## Lab profile

**Cost label:** `DESIGN-ONLY`

No resources are created by the core `DESIGN-ONLY` challenge. The required tags `Course`, `Module`, `Owner`, and `ExpiresAt` apply only if an approved optional deployment occurs.

## Preflight

1. Run `aws sts get-caller-identity`; do not record the account ID.
2. Run `aws configure get region` and confirm the course home Region.
3. Confirm the Free-plan/credit status and budget alerts.
4. Read `cleanup.md` before any approved optional deployment.

## Challenge

Without purchasing a domain, design DNS and edge behavior for public assets served from two Regions.

1. Perform identity/Region/budget preflight.
2. Select Route 53 latency, weighted, or failover routing for a staged migration plus health failure; explain whether one or two records/policies are needed.
3. Define a CloudFront cache key for `/catalog` where `language` affects content but tracking parameters do not.
4. Define origin protection, HTTPS, error caching, logging, and deployment versioning.
5. Simulate a stale object and a failed primary endpoint on paper.
6. Provide exact cleanup for any optional console-created private hosted zone; otherwise create nothing.

Pass when DNS caching, CloudFront caching, viewer authorization, and origin authorization are treated as separate controls.

## Validate

Confirm every stated pass condition with a diagram, decision table, or observable inventory result. Verify that no AWS resources were created for the core challenge and that any optional deployment uses the four required tags.

## Cleanup

No cloud resources were created. Run the module inventory checks and leave all pre-existing resources unchanged.

## Official references

- [Route 53 routing policies](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html)
- [CloudFront cache content](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ConfiguringCaching.html)
- [Restricting S3 access with OAC](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html)
