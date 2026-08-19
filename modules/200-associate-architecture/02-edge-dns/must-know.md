# Must Know - Edge and DNS Architecture

## Service boundaries

| Need | Service or feature | Decision note |
| --- | --- | --- |
| Authoritative DNS and health-aware answers | Route 53 | DNS answers are cached; TTL affects convergence |
| Cache HTTP content near viewers | CloudFront | Cache key and origin behavior determine hit ratio and correctness |
| Static anycast IPs for non-HTTP or rapid endpoint failover | Global Accelerator | `OPTIONAL PAID/SANDBOX`; not a CDN cache |
| Edge filtering | AWS WAF on CloudFront | Rules can block valid traffic; observe before tightening |
| Public TLS for CloudFront custom name | ACM certificate in `us-east-1` | A custom domain is not required in this module |

Route 53 weighted routing distributes answers by configured weight, latency routing selects the lowest-latency AWS Region, failover routing uses health, and geolocation uses user location. Geoproximity is a separate policy with bias controls.

## CloudFront decisions

- Forward only headers, cookies, and query strings required by the origin. Forwarded values usually become cache-key dimensions and reduce hit ratio.
- Use Origin Access Control (OAC), block S3 public access, and permit only the distribution to read the bucket.
- Signed URLs/cookies control private viewer access; OAC controls CloudFront-to-origin access.
- Invalidations propagate changes but cost and operations favor versioned object names for frequent releases.
- CloudFront error caching can make a repaired object appear broken until TTL or invalidation.

## Distractors and failures

- **Route 53 replaces an ALB:** DNS chooses endpoints, not targets per request.
- **CloudFront for UDP:** use Global Accelerator when static anycast IP and non-HTTP acceleration are required.
- **Alias equals CNAME:** alias records can target selected AWS resources and work at the zone apex.
- **Low TTL guarantees instant failover:** recursive resolvers and clients still cache.
- **Public S3 website origin plus OAC:** OAC applies to S3 REST origins, not website endpoints.

## Official references

- [Route 53 routing policies](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html)
- [CloudFront cache content](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ConfiguringCaching.html)
- [Restricting S3 access with OAC](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html)
